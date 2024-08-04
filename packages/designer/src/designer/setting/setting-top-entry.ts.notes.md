## overview

SettingTopEntry is mainly used to manage the implementation module of the setting panel, which contains n SettingFields, and each SettingField corresponds to the setter to be used below. That is, SettingTopEntry is responsible for managing multiple SettingFields, used in `packages/designer/src/designer/designer.ts`.

* `_items` is the list of SettingFields, which is the collection of all SettingFields.
* `_componentMeta` is the componentMeta of the first SettingField in the list or null.


