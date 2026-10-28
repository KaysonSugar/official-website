// Vite 客户端类型声明：让 import.meta.env、静态资源导入等具备类型提示
/// <reference types="vite/client" />

// 说明：不再手写 declare module '*.vue'，因为 .vue 文件的类型由 vue-tsc（Volar）直接推导，
// 手写的 DefineComponent<{}, {}, any> 会丢失 props 类型，也会触发 no-explicit-any 规则。
