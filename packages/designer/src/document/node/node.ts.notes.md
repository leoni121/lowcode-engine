## overview

The Node class serves as a fundamental building block within a document's structure, focuses on managing current-level schema, and its functions focus on single-level schema-related operations.

* Properties Management: Get and set properties of the node.
* Children Management: Add, remove, and retrieve child nodes.
* Parent Management: Access and modify the parent node.
* Event Handling: Handle events related to property changes, node addition, and removal.
* Visibility and Selection: Manage the visibility and selection state of the node.
* Schema Handling(`nodeSchema`): Export the node's structure as a schema. It is also the core implementation method for the engine to export schema.

## Methods

* `initBuiltinProps`: Initialize the built-in properties of the node, including `hidden`, `title`, `condition`, etc.

* `componentMeta`:  It calls the getComponentMeta method of `this.document`, which in turn calls the `getComponentMeta method` of `this.designer` and provides a callback function to handle the case when `this.simulator` exists.


