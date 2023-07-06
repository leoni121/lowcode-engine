## overview

* In the `fireCallback` function, get the editor instance and trigger the event through eventBus.

    ```ts
    editor?.eventBus.emit('hotkey.callback.call', {
          callback,
          e,
          combo,
          sequence,
          selected,
        });
    ```

* We can activate/deactivate hotkey functionality using the `activate` function of the `Hotkey` instance.
