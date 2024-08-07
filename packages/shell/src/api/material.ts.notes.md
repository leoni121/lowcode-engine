## Overview

The `Material` class implements the `IPublicApiMaterial` interface and provides a comprehensive API for managing components, assets, and actions within engine.

* **Editor Access**: Provides access to the editor instance, either from the workspace or directly.
* **Component Management**:
  * **componentsMap**: Retrieves a map of components.
  * **getComponentMeta**: Gets metadata for a specific component.
  * **createComponentMeta**: Creates metadata for a component.
  * **getComponentMetasMap**: Retrieves a map of all registered component metadata.
  * **isComponentMeta**: Checks if an object is a ComponentMeta instance.
* **Asset Management**:
  * **setAssets**: Sets the assets structure, assets will be mounted on the `editor`.
  * **getAssets**: Retrieves the assets structure.
  * **loadIncrementalAssets**: Loads incremental assets and merges them with existing ones.
  * **onChangeAssets**: Listens for changes in assets.
* **Metadata Transducers**:
  * **registerMetadataTransducer**: Registers a metadata transducer function.
  * **getRegisteredMetadataTransducers**: Retrieves all registered metadata transducers.
* **Component Actions**:
  * **addBuiltinComponentAction**: Adds a built-in component action.
  * **removeBuiltinComponentAction**: Removes a built-in component action.
  * **modifyBuiltinComponentAction**: Modifies a built-in component action.
* **Context Menu Management**:
  * **addContextMenuOption**: Adds an option to the context menu.
  * **removeContextMenuOption**: Removes an option from the context menu.
  * **adjustContextMenuLayout**: Adjusts the layout of the context menu.
