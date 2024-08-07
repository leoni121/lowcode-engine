import { ReactInstance, Fragment, Component, createElement } from 'react';
import { Router, Route, Switch } from 'react-router';
import cn from 'classnames';
import { Node } from '@alilc/lowcode-designer';
import LowCodeRenderer from '@alilc/lowcode-react-renderer';
import { observer } from 'mobx-react';
import { getClosestNode, isFromVC, isReactComponent } from '@alilc/lowcode-utils';
import { GlobalEvent } from '@alilc/lowcode-types';
import { SimulatorRendererContainer, DocumentInstance } from './renderer';
import { host } from './host';
import { isRendererDetached } from './utils/misc';
import './renderer.less';
import { createIntl } from './locale';

// patch cloneElement avoid lost keyProps
const originCloneElement = window.React.cloneElement;
(window as any).React.cloneElement = (child: any, { _leaf, ...props }: any = {}, ...rest: any[]) => {
  if (child.ref && props.ref) {
    const dRef = props.ref;
    const cRef = child.ref;
    props.ref = (x: any) => {
      if (cRef) {
        if (typeof cRef === 'function') {
          cRef(x);
        } else {
          try {
            cRef.current = x;
          } catch (e) {
            console.error(e);
          }
        }
      }
      if (dRef) {
        if (typeof dRef === 'function') {
          dRef(x);
        } else {
          try {
            dRef.current = x;
          } catch (e) {
            console.error(e);
          }
        }
      }
    };
  }
  return originCloneElement(child, props, ...rest);
};

export default class SimulatorRendererView extends Component<{ rendererContainer: SimulatorRendererContainer }> {
  render() {
    const { rendererContainer } = this.props;
    return (
      <Router history={rendererContainer.history}>
        <Layout rendererContainer={rendererContainer}>
          <Routes rendererContainer={rendererContainer} />
        </Layout>
      </Router>
    );
  }
}

@observer
export class Routes extends Component<{ rendererContainer: SimulatorRendererContainer }> {
  render() {
    const { rendererContainer } = this.props;
    return (
      <Switch>
        {rendererContainer.documentInstances.map((instance) => {
          return (
            <Route
              path={instance.path}
              key={instance.id}
              render={(routeProps) => <Renderer documentInstance={instance} rendererContainer={rendererContainer} {...routeProps} />}
            />
          );
        })}
      </Switch>
    );
  }
}
function ucfirst(s: string) {
  return s.charAt(0).toUpperCase() + s.substring(1);
}
function getDeviceView(view: any, device: string, mode: string) {
  if (!view || typeof view === 'string') {
    return view;
  }

  // compatible vision Mobile | Preview
  device = ucfirst(device);
  if (device === 'Mobile' && view.hasOwnProperty(device)) {
    view = view[device];
  }
  mode = ucfirst(mode);
  if (mode === 'Preview' && view.hasOwnProperty(mode)) {
    view = view[mode];
  }
  return view;
}

@observer
class Layout extends Component<{ rendererContainer: SimulatorRendererContainer }> {
  render() {
    const { rendererContainer, children } = this.props;
    const { layout } = rendererContainer;
    if (layout) {
      const { Component, props, componentName } = layout;
      if (Component) {
        return <Component key="layout" props={props}>{children}</Component>;
      }
      if (componentName && rendererContainer.getComponent(componentName)) {
        return createElement(
          rendererContainer.getComponent(componentName),
          {
            ...props,
            rendererContainer,
            key: 'layout',
          },
          [children],
        );
      }
    }

    return <Fragment>{children}</Fragment>;
  }
}

@observer
class Renderer extends Component<{
  rendererContainer: SimulatorRendererContainer;
  documentInstance: DocumentInstance;
}> {
  startTime: number | null = null;
  schemaChangedSymbol = false;

  componentDidUpdate() {
    this.recordTime();
  }

  recordTime() {
    if (this.startTime) {
      const time = Date.now() - this.startTime;
      const nodeCount = host.designer.currentDocument?.getNodeCount?.();
      host.designer.editor?.eventBus.emit(GlobalEvent.Node.Rerender, {
        componentName: 'Renderer',
        type: 'All',
        time,
        nodeCount,
      });
    }
  }

  componentDidMount() {
    this.recordTime();
  }

  getSchemaChangedSymbol = () => {
    return this.schemaChangedSymbol;
  };

  setSchemaChangedSymbol = (symbol: boolean) => {
    this.schemaChangedSymbol = symbol;
  };

  render() {
    const { documentInstance, rendererContainer: renderer } = this.props;
    console.log("🚀 ~ Renderer ~ render ~ documentInstance:", documentInstance.schema)
    const { container, document } = documentInstance;
    const { designMode, device, locale } = container;
    const messages = container.context?.utils?.i18n?.messages || {};
    this.startTime = Date.now();
    this.schemaChangedSymbol = false;

    if (!container.autoRender || isRendererDetached()) {
      return null;
    }

    const { intl } = createIntl(locale);

    return (
      <LowCodeRenderer
        locale={locale}
        messages={messages}
        schema={documentInstance.schema}
        components={container.components}
        appHelper={container.context}
        designMode={designMode}
        device={device}
        documentId={document.id}
        suspended={renderer.suspended}
        self={renderer.scope}
        getSchemaChangedSymbol={this.getSchemaChangedSymbol}
        setSchemaChangedSymbol={this.setSchemaChangedSymbol}
        getNode={(id: string) => documentInstance.getNode(id) as Node}
        rendererName="PageRenderer"
        thisRequiredInJSE={host.thisRequiredInJSE}
        notFoundComponent={host.notFoundComponent}
        faultComponent={host.faultComponent}
        faultComponentMap={host.faultComponentMap}
        customCreateElement={(Component: any, props: any, children: any) => {
          const { __id, ...viewProps } = props;
          viewProps.componentId = __id;
          const leaf = documentInstance.getNode(__id) as Node;
          if (isFromVC(leaf?.componentMeta)) {
            viewProps._leaf = leaf.internalToShellNode();
          }
          viewProps._componentName = leaf?.componentName;
          // 如果是容器 && 无children && 高宽为空 增加一个占位容器，方便拖动
          if (
            !viewProps.dataSource &&
            leaf?.isContainer() &&
            (children == null || (Array.isArray(children) && !children.length)) &&
            (!viewProps.style || Object.keys(viewProps.style).length === 0)
          ) {
            let defaultPlaceholder = intl('Drag and drop components or templates here');
            const lockedNode = getClosestNode(leaf, (node) => {
              return node?.getExtraProp('isLocked')?.getValue() === true;
            });
            if (lockedNode) {
              defaultPlaceholder = intl('Locked elements and child elements cannot be edited');
            }
            children = (
              <div className={cn('lc-container-placeholder', { 'lc-container-locked': !!lockedNode })} style={viewProps.placeholderStyle}>
                {viewProps.placeholder || defaultPlaceholder}
              </div>
            );
          }
          if (viewProps._componentName === 'a') {
            delete viewProps.href;
          }
          // FIXME: 渲染仍有问题
          if (viewProps._componentName === 'Menu') {
            Object.assign(viewProps, {
              _componentName: 'Menu',
              className: '_css_pesudo_menu_kbrzyh0f',
              context: { VE: (window as any).VisualEngine },
              direction: undefined,
              events: { ignored: true },
              fieldId: 'menu_kbrzyh0f',
              footer: '',
              header: '',
              mode: 'inline',
              onItemClick: { ignored: true },
              onSelect: { ignored: true },
              popupAlign: 'follow',
              selectMode: false,
              triggerType: 'click',
            });
          }

          if (!isReactComponent(Component)) {
            console.error(`${viewProps._componentName} is not a react component!`);
            return null;
          }

          return createElement(
            getDeviceView(Component, device, designMode),
            viewProps,
            leaf?.isContainer() ? (children == null ? [] : Array.isArray(children) ? children : [children]) : children,
          );
        }}
        __host={host}
        __container={container}
        onCompGetRef={(schema: any, ref: ReactInstance | null) => {
          documentInstance.mountInstance(schema.id, ref);
        }}
        enableStrictNotFoundMode={host.enableStrictNotFoundMode}
      />
    );
  }
}
