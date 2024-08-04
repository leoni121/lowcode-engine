## overview

core rendering method

* Start rendering use the adapter. The renderers setup of the Adapter is done in the `packages/react-renderer/src/index.ts` file

* `const allComponents = { ...RENDERER_COMPS, ...components };` used to merge the `RENDERER_COMPS` and `components` to get all components

