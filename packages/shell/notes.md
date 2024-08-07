## Overview

The **Class** used by the engine-core(`packages/engine/src/engine-core.ts`), will be exported for users to use.

* From the perspective of **schema**  (`packages/shell/src/model`), the model of the low-code engine is divided into node model, prop model, document model and project model, etc.
* From the perspective of engine composition(`packages/shell/src/api`), low-code engines are divided into materials, UI skeleton, simulator, etc.

## Exploring Further

In software architecture, a "Shell Layer" refers to an outer layer that interacts with the core functionality of an application. This layer typically serves as an interface or wrapper that provides additional features or simplifies interactions with the core system. Here are some key aspects of a Shell Layer:

1. **Interface to Core Functionality**:
   * The Shell Layer acts as a **bridge** between the core system and external components or users.
   * It provides a simplified and user-friendly interface to access the core functionalities.

2. **Abstraction**:
   * It abstracts the complexities of the core system, making it easier for developers and users to interact with the system.
   * This abstraction can help in hiding the implementation details and exposing only the necessary functionalities.

3. **Additional Features**:
   * The Shell Layer can add extra features or enhancements that are not part of the core system.
   * These features can include logging, security, error handling, and more.

4. **Modularity**:
   * By separating the core functionality and the Shell Layer, the system becomes more modular.
   * This separation allows for easier maintenance, testing, and updates.

5. **Integration**:
   * The Shell Layer can facilitate the integration of the core system with other systems or services.
   * It can handle communication protocols, data transformation, and other integration tasks.

6. **User Interaction**:
   * In some cases, the Shell Layer can provide a user interface (UI) for interacting with the core system.
   * This UI can be a command-line interface (CLI), graphical user interface (GUI), or web interface.

**Example in Context**

For the "AliLowCodeEngine," the Shell Layer might provide:

* A simplified API for developers to interact with the low-code engine.
* Additional tools and utilities for building and managing low-code applications.
* Integration points for connecting the low-code engine with other services or platforms.
* Enhanced logging and debugging capabilities to help developers troubleshoot issues.

**Visual Representation**

```Shell
+-------------------+
|    Shell Layer    |
|-------------------|
| - Simplified API  |
| - Additional Tools|
| - Integration     |
| - Logging         |
+-------------------+
        |
        v
+-------------------+
|   Core System     |
|-------------------|
| - Core Functions  |
| - Business Logic  |
| - Data Management |
+-------------------+
```

In summary, the Shell Layer in software architecture serves as an outer layer that enhances, simplifies, and provides an interface to the core system, making it more accessible and functional for users and developers.
