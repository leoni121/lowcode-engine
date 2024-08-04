## Overview

> explanation from [docs](https://lowcode-engine.cn/site/docs/guide/design/editor#%E8%AE%BE%E7%BD%AE%E5%99%A8).

The setter is essentially a React component, but the setting panel will pass in the SettingField instance corresponding to the current configuration item when rendering. SettingField essentially wraps the Prop instance. The internal behavior of the setter and the UI changes are controlled by the setter itself, but when the attribute value changes, the value needs to be modified through the Prop under SettingField, because modifying the Prop instance is equivalent to modifying the schema. On the one hand, after such a setter is set, the saved schema is correct. On the other hand, only when the schema changes can the rendering canvas be triggered to re-render.

zh-CN: 设置器本质上是一个 React 组件，但是设置面板在渲染时会传入当前配置项对应的 SettingField 实例，SettingField 本质上就是包裹了 Prop 实例，设置器内部的行为以及 UI 变化都由设置器自己把控，但当属性值发生变化时需要通过 SettingField 下的 Prop 来修改值，因为修改 Prop 实例就相当于修改了 schema。一方面这样的设置器设置之后，保存的 schema 才是正确的，另外一方面，只有 schema 变化了，才能触发渲染画布重新渲染。


* `SettingField` inherited from `SettingPropEntry`(`packages/designer/src/designer/setting/setting-prop-entry.ts`). When the setter (`packages/editor-skeleton/src/components/settings/settings-pane.tsx`) is changed, and the `SettingPropEntry` instance will be modified by the SettingPropentry instance. Rop (`super.setValue(val, false, false, extraOptions);`)
