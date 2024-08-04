## overview

The most basic rendering class. All types of rendering modules inherit from this class when rendering schema.

* `__renderContent` is the rendering entry of the entire page

* `__createVirtualDom` is used to convert the model structure to react Element

* `__renderComp` is the children's rendering entry

* `let Comp = components[schema.componentName] || this.props.__container?.components?.[schema.componentName];` used to get the component

* `__getHOCWrappedComponent`, wrap the component with a HOC Leaf(`leafWrapper`, in `packages/renderer-core/src/hoc/leaf.tsx`) in **design**(`this.__designModeIsDesign`) mode to support self-responsive rendering when the internal props of the component change.
