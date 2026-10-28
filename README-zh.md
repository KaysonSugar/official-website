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
| [ESLint](https://eslint.org/) | ^10 | 代码质量检查（flat config + Vue/TS 规则） |
| [Prettier](https://prettier.io/) | ^3.9 | 代码格式化（无分号、单引号、行宽 100） |

> ⚠️ TypeScript 固定在 5.9 稳定线：TS 7（Go 原生编译器）暂未被 vue-tsc 支持，待兼容后可升级。

## 目录结构

```
wyd-official-website/
├── index.html              # HTML 入口（含 SEO / 分享卡元信息）
├── vite.config.ts          # Vite 配置（Vue + Tailwind 插件、@ 别名）
├── tsconfig.json           # TS 项目引用配置
├── tsconfig.app.json       # 应用代码 TS 配置（严格模式）
├── tsconfig.node.json      # Node 层（vite.config.ts）TS 配置
├── eslint.config.js        # ESLint flat config（Vue + TS 规则）
├── .prettierrc.json        # Prettier 格式化规则
├── public/
│   └── favicon.svg         # 站点图标（构建时原样拷贝到 dist 根目录）
└── src/
    ├── main.ts             # 应用入口，挂载 #app 并引入全局样式
    ├── App.vue             # 根组件，负责页面区块编排
    ├── style.css           # 全局样式入口 + 设计 token（@theme）+ 基础样式
    ├── vite-env.d.ts       # Vite 类型声明
    ├── config/
    │   └── site.ts         # 站点文案与导航配置（改文案只改这里）
    ├── composables/
    │   └── useReveal.ts    # 滚动进场动效（IntersectionObserver）
    └── components/
        ├── SiteHeader.vue  # 顶部导航（含移动端汉堡菜单、滚动态变化）
        ├── HeroSection.vue # 首屏 Hero
        ├── FeatureCard.vue # 能力卡片
        └── SiteFooter.vue  # 页脚
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

# 代码检查（ESLint）
npm run lint

# 代码检查并自动修复
npm run lint:fix

# 格式化源码（Prettier）
npm run format
```

## 响应式断点

采用移动优先策略，三档主要断点：

| 断点 | 宽度 | 卡片列数 | 导航形态 |
| --- | --- | --- | --- |
| 默认 | < 640px（如 375） | 1 列 | 汉堡菜单 |
| `sm:` | ≥ 640px | 2 列 | 汉堡菜单（< 768） |
| `md:` | ≥ 768px | 2 列 | 横向导航 |
| `lg:` | ≥ 1024px（如 1440 视口下生效） | 3 列 | 横向导航 |

已在 375 / 768 / 1440 三档实测：无横向溢出（`scrollWidth === clientWidth`），顶栏高度 56px / 64px 与 `scroll-padding-top` 对齐。

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

### 样式写法（三条规范）

1. **布局、间距、字号、颜色、响应式 → 一律用 Tailwind 工具类**
   例：`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`、`text-2xl sm:text-3xl`。

2. **动画、伪元素、第三方组件样式覆盖 → 用组件内的 `<style scoped>` 写原生 CSS**
   Tailwind 不擅长 `@keyframes`、`::before/::after`、`:nth-child`、`clip-path` 等场景，不要硬凑任意值。

3. **同一组类名重复出现 3 次以上 → 抽成组件，不要复制粘贴**
   例如能力卡片已抽为 `FeatureCard.vue`；抽组件优先于使用 `@apply`。

> 判据：当一个元素上的类名超过 10 个、或需要大量 `[]` 任意值才能表达时，就该抽组件或改用 CSS。

### 注释规范

- **所有 Tailwind 样式必须在其上方加中文注释**，说明类名含义与关键数值（如 `p-8` = 2rem、`gap-6` = 1.5rem），并写明设计意图（为什么限制行长、为什么预留偏移等）。
- 新增或修改样式时同步更新注释，避免注释与实现不一致。
- 配置文件（`vite.config.ts`、`tsconfig.*.json`、`src/config/site.ts`）同样需要注释说明每一项的作用。

### 其他约定

- **路径别名**：`@` 指向 `src/` 目录（`vite.config.ts` 与 `tsconfig.app.json` 已同步配置）
- **设计 token**：品牌色 `brand-*`（50~900）与文字色 `ink-*` 定义在 `src/style.css` 的 `@theme` 中，业务代码统一使用语义化类名（如 `text-brand-600`），不写死色值
- **文案配置化**：所有页面文案集中在 `src/config/site.ts`，修改内容无需改动组件
- **锚点偏移**：固定顶栏高 4rem，已通过 `scroll-padding-top` 与各区块 `scroll-mt-16` 修正跳转遮挡
- **滚动动效**：`src/composables/useReveal.ts` 用 IntersectionObserver 实现进场淡入，只触发一次；卡片通过 `delay` 错峰 100ms
- **动效无障碍**：全局尊重 `prefers-reduced-motion`，系统开启减弱动效时自动关闭过渡并直接显示内容
- **SEO**：`index.html` 内含 title / description / canonical / Open Graph / Twitter 卡片 / theme-color；上线前需替换 `example.com` 域名与分享封面图 `og-cover.png`（建议 1200×630）
- **Tailwind v4**：无需 `tailwind.config.js`，主题扩展使用 CSS 的 `@theme` 指令（在 `src/style.css` 中）
- **TypeScript**：新组件统一使用 `<script setup lang="ts">`，数据结构优先定义 `interface` 并导出复用
- **构建产物**：输出至 `dist/`，已通过 `.gitignore` 排除版本管理

## Git 提交规范

提交信息遵循 Conventional Commits 格式：`feat: | fix: | docs: | style: | refactor: | chore:`
