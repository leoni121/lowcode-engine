## overview

Define `Editor` class, and inherit EventEmitter

* Set the editor's asstes and context
* Register hooks and lifecycle
* Set the `EngineConfig` instance through the public set method, The EngineConfig class is defined in `./config.ts`
* `Setassets` will be called by the `Material` instance, it has the following functions:
  * **Extract Components**: It extracts the components from the assets.
  * **Categorize Components**: It categorizes components into componentDescriptions and remoteComponentDescriptions based on whether they have exportName and url.
  * Update Assets: It updates the `assets.components` with componentDescriptions and `initializes assets.componentList` if not already present.
  * **Load Remote Components**: If there are remote components, it loads them asynchronously using AssetLoader and updates the AssetsCache.
  * Transform and Notify: Finally, it transforms the assets using assetsTransform, sets them in the context, and notifies that the assets have been updated.
