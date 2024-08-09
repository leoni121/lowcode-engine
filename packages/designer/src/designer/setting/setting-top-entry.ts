import { IPublicTypeCustomView, IPublicModelEditor, IPublicModelSettingTopEntry, IPublicApiSetters } from '@alilc/lowcode-types';
import { isCustomView } from '@alilc/lowcode-utils';
import { computed, IEventBus, createModuleEventBus } from '@alilc/lowcode-editor-core';
import { ISettingEntry } from './setting-entry-type';
import { ISettingField, SettingField } from './setting-field';
import { INode } from '../../document';
import type { IComponentMeta } from '../../component-meta';
import { IDesigner } from '../designer';

function generateSessionId(nodes: INode[]) {
  return nodes
    .map((node) => node.id)
    .sort()
    .join(',');
}

export interface ISettingTopEntry extends ISettingEntry, IPublicModelSettingTopEntry<
  INode,
  ISettingField
> {
  readonly top: ISettingTopEntry;

  readonly parent: ISettingTopEntry;

  readonly path: never[];

  items: Array<ISettingField | IPublicTypeCustomView>;

  componentMeta: IComponentMeta | null;

  purge(): void;

  getExtraPropValue(propName: string): void;

  setExtraPropValue(propName: string, value: any): void;
}

export class SettingTopEntry implements ISettingTopEntry {
  private emitter: IEventBus = createModuleEventBus('SettingTopEntry');

  private _items: Array<SettingField | IPublicTypeCustomView> = [];

  private _componentMeta: IComponentMeta | null = null;

  private _isSame = true;

  private _settingFieldMap: { [prop: string]: ISettingField } = {};

  readonly path = [];

  readonly top = this;

  readonly parent = this;

  get componentMeta() {
    return this._componentMeta;
  }

  get items() {
    return this._items;
  }

  /**
   * 同样的
   */
  get isSameComponent(): boolean {
    return this._isSame;
  }

  /**
   * 一个
   */
  get isSingle(): boolean {
    return this.nodes.length === 1;
  }

  get isLocked(): boolean {
    return this.first.isLocked;
  }

  /**
   * 多个
   */
  get isMultiple(): boolean {
    return this.nodes.length > 1;
  }

  readonly id: string;

  readonly first: INode;

  readonly designer: IDesigner | undefined;

  readonly setters: IPublicApiSetters;

  disposeFunctions: any[] = [];

  constructor(readonly editor: IPublicModelEditor, readonly nodes: INode[]) {
    if (!Array.isArray(nodes) || nodes.length < 1) {
      throw new ReferenceError('nodes should not be empty');
    }
    this.id = generateSessionId(nodes);
    this.first = nodes[0];
    this.designer = this.first.document?.designer;
    this.setters = editor.get('setters') as IPublicApiSetters;

    // setups
    this.setupComponentMeta();

    // clear fields
    this.setupItems();

    this.disposeFunctions.push(this.setupEvents());
  }

  private setupComponentMeta() {
    // todo: enhance compile a temp configure.compiled
    const { first } = this;
    console.log("🚀 ~ SettingTopEntry ~ setupComponentMeta ~ first:", first)
    const meta = first.componentMeta;
    const l = this.nodes.length;
    let theSame = true;
    for (let i = 1; i < l; i++) {
      const other = this.nodes[i];
      if (other.componentMeta !== meta) {
        theSame = false;
        break;
      }
    }
    if (theSame) {
      this._isSame = true;
      this._componentMeta = meta;
    } else {
      this._isSame = false;
      this._componentMeta = null;
    }
  }

  private setupItems() {
    if (this.componentMeta) {
      const settingFieldMap: { [prop: string]: ISettingField } = {};
      const settingFieldCollector = (name: string | number, field: ISettingField) => {
        settingFieldMap[name] = field;
      };
      this._items = this.componentMeta.configure.map((item) => {
        if (isCustomView(item)) {
          return item;
        }
        return new SettingField(this, item as any, settingFieldCollector);
      });
      console.log("🚀 ~ SettingTopEntry ~ this._items=this.componentMeta.configure.map ~ _items:", this._items)

      this._settingFieldMap = settingFieldMap;
    }
  }

  private setupEvents() {
    return this.componentMeta?.onMetadataChange(() => {
      this.setupItems();
    });
  }

  /**
   * 获取当前属性值
   */
  @computed getValue(): any {
    return this.first?.propsData;
  }

  /**
   * 设置当前属性值
   */
  setValue(val: any) {
    this.setProps(val);
    // TODO: emit value change
  }

  /**
   * 获取子项
   */
  get(propName: string | number): ISettingField | null {
    if (!propName) return null;
    return this._settingFieldMap[propName] || (new SettingField(this, { name: propName }));
  }

  /**
   * 设置子级属性值
   */
  setPropValue(propName: string | number, value: any) {
    debugger // step2: 修改 node 的属性值
    this.nodes.forEach((node) => {
      node.setPropValue(propName.toString(), value);
    });
  }

  /**
   * 清除已设置值
   */
  clearPropValue(propName: string | number) {
    this.nodes.forEach((node) => {
      node.clearPropValue(propName.toString());
    });
  }

  /**
   * 获取子级属性值
   */
  getPropValue(propName: string | number): any {
    return this.first.getProp(propName.toString(), true)?.getValue();
  }

  /**
   * 获取顶层附属属性值
   */
  getExtraPropValue(propName: string) {
    return this.first.getExtraProp(propName, false)?.getValue();
  }

  /**
   * 设置顶层附属属性值
   */
  setExtraPropValue(propName: string, value: any) {
    this.nodes.forEach((node) => {
      node.getExtraProp(propName, true)?.setValue(value);
    });
  }

  // 设置多个属性值，替换原有值
  setProps(data: object) {
    this.nodes.forEach((node) => {
      node.setProps(data as any);
    });
  }

  // 设置多个属性值，和原有值合并
  mergeProps(data: object) {
    this.nodes.forEach((node) => {
      node.mergeProps(data as any);
    });
  }

  private disposeItems() {
    this._items.forEach((item) => isPurgeable(item) && item.purge());
    this._items = [];
  }

  purge() {
    this.disposeItems();
    this._settingFieldMap = {};
    this.emitter.removeAllListeners();
    this.disposeFunctions.forEach(f => f());
    this.disposeFunctions = [];
  }

  getProp(propName: string | number) {
    return this.get(propName);
  }

  // ==== copy some Node api =====
  getStatus() {

  }

  setStatus() {

  }

  getChildren() {
    // this.nodes.map()
  }

  getDOMNode() {

  }

  getId() {
    return this.id;
  }

  getPage() {
    return this.first.document;
  }

  /**
   * @deprecated
   */
  get node() {
    return this.getNode();
  }

  getNode() {
    return this.nodes[0];
  }
}

interface Purgeable {
  purge(): void;
}
function isPurgeable(obj: any): obj is Purgeable {
  return obj && obj.purge;
}
