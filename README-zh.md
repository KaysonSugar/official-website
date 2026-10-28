# WYD 官网（wyd-official-website）

WYD 官方网站前端项目，基于 Vue 3 + Vite 8 + TypeScript + Tailwind CSS v4 构建的现代化单页官网。

## 技术栈

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| [Vue](https://vuejs.org/) | ^3.5 | 渐进式前端框架，全部使用 `<script setup>` 组合式 API |
| [Vite](https://vite.dev/) | ^8.3 | 下一代前端构建工具，开发环境秒级热更新 |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9 | 类型安全，严格模式（`strict: true`） |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.3 | 原子化 CSS 框架 v4，通过 `@tailwindcss/vite` 插件集成 |
| [vue-tsc](https://github.com/vuejs/language-tools) | ^3.3 | Vue 单文件组件类型检查 |

> ⚠️ TypeScript 固定在 5.9 稳定线：TS 7（Go 原生编译器）暂未被 vue-tsc 支持，待兼容后可升级。

## 目录结构

```
wyd-official-website/
├── index.html              # HTML 入口
├── vite.config.ts          # Vite 配置（Vue + Tailwind 插件、@ 别名）
├── tsconfig.json           # TS 项目引用配置
├── tsconfig.app.json       # 应用代码 TS 配置（严格模式）
├── tsconfig.node.json      # Node 层（vite.config.ts）TS 配置
└── src/
    ├── main.ts             # 应用入口，挂载 #app 并引入全局样式
    ├── App.vue             # 根组件（导航 / Hero / 能力 / 方案 / 关于 / 页脚）
    ├── style.css           # 全局样式入口，@import "tailwindcss"
    ├── vite-env.d.ts       # Vite 类型声明
    └── components/         # 公共组件目录（预留）
```

## 环境要求

- Node.js ≥ 20.19（Vite 8 要求）
- npm ≥ 10

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173，自动打开浏览器）
npm run dev

# 类型检查
npm run typecheck

# 生产构建（先 vue-tsc 类型检查，再 vite build）
npm run build

# 本地预览生产构建产物
npm run preview
```

## 页面结构

官网当前为单页布局，包含以下区块（锚点导航）：

| 区块 | 锚点 | 说明 |
| --- | --- | --- |
| 顶部导航 | — | 固定顶栏，毛玻璃效果 |
| 首页 Hero | `#home` | 主标题 + 简介，渐变背景 |
| 产品能力 | `#features` | 响应式三列卡片栅格 |
| 解决方案 | `#solutions` | 交替底色区块 |
| 关于我们 | `#about` | 占位内容 |
| 页脚 | — | 版权信息 |

## 开发约定

- **路径别名**：`@` 指向 `src/` 目录（`vite.config.ts` 与 `tsconfig.app.json` 已同步配置）
- **Tailwind v4**：无需 `tailwind.config.js`，主题扩展使用 CSS 的 `@theme` 指令（在 `src/style.css` 中）
- **TypeScript**：新组件统一使用 `<script setup lang="ts">`，数据结构优先定义 `interface` 并导出复用
- **构建产物**：输出至 `dist/`，已通过 `.gitignore` 排除版本管理

## Git 提交规范

提交信息遵循 Conventional Commits 格式：`feat: | fix: | docs: | style: | refactor: | chore:`
