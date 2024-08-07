## overview ❤️

* export class BuiltinSimulatorHost

  ``` ts
    // wait 准备 iframe 内容、依赖库注入
    const renderer = await createSimulator(this, iframe, vendors);
  ```

* setup Drag And Click

* Create a Simulator and inject dependencies

* setupDragAndClick 中完成拖拽设定和元素选中高亮（checkSelect）,通过监听事件捕获实现

* `createSimulator(this, iframe, vendors)` return the `BuiltinSimulatorRenderer` instance. `vendors` is the list of dependencies that need to be injected, including assets(`packages`) and react-simulator-renderer `https://uipaas-assets.com/prod/npm/@alilc/lowcode-engine/1.3.3-beta.0/dist/js/react-simulator-renderer.js`

* `getNodeInstanceFromElement`: get the node instance from the frames by `e.target`
