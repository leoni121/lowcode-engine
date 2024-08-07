## Overview

The `ComponentActions` class manages a set of predefined actions that can be performed on components. These actions include removing, hiding, copying, locking, and unlocking components.

* Action Management: Methods to add, remove, and modify actions.
* Actions Array: Contains predefined actions with associated icons, titles, and conditions.
  * Remove: Deletes a component.
  * Hide: Makes a component invisible.
  * Copy: Duplicates a component.
  * Lock: Locks a component to prevent modifications.
  * Unlock: Unlocks a component to allow modifications.
* Metadata Transducers: Manages functions that transform component metadata.
* Transducer Registration: Methods to register and retrieve metadata transducers.
