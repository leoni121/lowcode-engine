## overview

The `Project` class manages multiple documents and provides functionality for loading, creating, and manipulating documents within the project. It also handles integration with a simulator for previewing and testing the project.

Some key features and methods of the Project class include:

* Managing documents: The Project class allows you to create, open, and retrieve documents within the project. You can also get the current active document and access a list of all documents in the project.
* Loading and saving: You can **load project data from a schema and save project data to a schema**. This allows you to persist the state of the project.
* Simulator integration: The Project class provides methods for mounting a simulator, setting up event listeners for simulator readiness, and managing the simulator host.
* Configuration and internationalization: You can set and retrieve project configuration and internationalization data using the set and get methods.
* Event handling: The Project class allows you to register event handlers for events such as changes in the current document or simulator readiness.

Overall, the Project class serves as a central hub for managing and manipulating documents.
