## overview

Entry file of the entire designer, which will mount `schema`, `ComponentMetasMap`, etc.

* `createSettingEntry`, used in `packages/editor-skeleton/src/components/settings/main.ts`.
* Get the parameters provided to the simulator via `@computed get projectSimulatorProps()`, and obtain monitor instance after simulator UI initialization through `onMount` hook.
* All `ComponentMeta` are created and managed by the designer, for details on ComponentMeta, please refer to the official docs [ComponentMeta](<https://lowcode-engine.cn/site/docs/guide/design/editor#%E7%BB%84%E4%BB%B6%E6%8F%8F%E8%BF%B0%E6%A8%A1%E5%9E%8Bcomponentmeta>)
