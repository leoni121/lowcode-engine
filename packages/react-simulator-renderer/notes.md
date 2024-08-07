## overview

工作台模拟器渲染包，未在当前 monorepo 直接通过 import 引用。在 `@alilc/lowcode-designer` 的 `builtin-simulator` 中，通过加载 JS 文件到全局（<https://unpkg.shopee.io/@alilc/lowcode-engine@1.1.7-beta.21/dist/js/react-simulator-renderer.js>），通过 `(window as any).SimulatorRenderer = renderer;` 使用。

通过如下命令复制到了 `@alilc/lowcode-engine` 包下，并被发布：

```bash
cp ./packages/react-simulator-renderer/dist/js/* ./packages/engine/dist/js/
cp ./packages/react-simulator-renderer/dist/css/* ./packages/engine/dist/css/
```

```shell
/^https:\/\/uipaas-assets.com\/prod\/npm\/@alilc\/lowcode-engine\/(.*)\/dist\/js\/engine-core.js/            			    http://localhost:5555/js/AliLowCodeEngine.js
/^https:\/\/uipaas-assets.com\/prod\/npm\/@alilc\/lowcode-engine\/(.*)\/dist\/css\/engine-core.css/           				http://localhost:5555/css/AliLowCodeEngine.css
/^https:\/\/uipaas-assets.com\/prod\/npm\/@alilc\/lowcode-engine\/(.*)\/dist\/js\/react-simulator-renderer.js/              http://localhost:5555/js/ReactSimulatorRenderer.js
/^https:\/\/uipaas-assets.com\/prod\/npm\/@alilc\/lowcode-engine\/(.*)\/dist\/css\/react-simulator-renderer.css/            http://localhost:5555/css/ReactSimulatorRenderer.css
```
