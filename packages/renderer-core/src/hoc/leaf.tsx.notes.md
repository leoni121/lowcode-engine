## overview

Wrap each component with a HOC Leaf to support self-responsive rendering when the internal props of the component change. Define component rendering logic.

* `initOnPropsChangeEvent`, listen to props changes and re-render

* `get leaf() => INode | undefined`, 使用 `baseRenderer.props?.getNode` 获取 node 模型，getNode 是在 `packages/react-simulator-renderer/src/renderer-view.tsx` 文件中被传入的，执行时调用的 `getNode={(id: string) => documentInstance.getNode(id) as Node}`， 其中 `documentInstance ===  host.project.documents`


* `get leaf() => INode | undefined`, use `baseRenderer.props?.getNode` to get the Node Model, `getNode` is passed in the `packages/react-simulator-renderer/src/renderer-view.tsx` file, `getNode={(id: string) => documentInstance.getNode(id) as Node}` will be called during `getNode` execution, where `documentInstance === host.project.documents`
