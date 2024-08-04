## overview

All settings panels (Props, Styles, Events and Advanced) in the right area are created using this component.

* `createSettingFieldView` is used to create a setting field view, including: `SettingGroupView` and `SettingFieldView`, always used to create setting contents

* `SettingFieldView`, A `createField`(`packages/editor-skeleton/src/components/field/index.ts`) function will be used inside the component to create a `SettingField`

* When the value of the setter changes, it will trigger the `onchange` incident, and set the value of the prop by the `settingField` instance.
