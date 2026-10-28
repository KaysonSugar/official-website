# 威易达化工官网（wyd-official-website）

威易达化工官方网站前端项目，基于 Vue 3 + Vite 8 + TypeScript + Tailwind CSS v4 构建的现代化单页官网。

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

组件按「品牌 / 布局 / 区块 / 通用 UI」四层组织，新增页面模块时按层归位，不要在 `components/` 根目录堆文件。

```
wyd-official-website/
├── index.html                  # HTML 入口（含 SEO / 分享卡元信息 / favicon）
├── vite.config.ts              # Vite 配置（Vue + Tailwind 插件、@ 别名）
├── tsconfig.json               # TS 项目引用配置
├── tsconfig.app.json           # 应用代码 TS 配置（严格模式）
├── tsconfig.node.json          # Node 层（vite.config.ts）TS 配置
├── eslint.config.js            # ESLint flat config（Vue + TS 规则）
├── .prettierrc.json            # Prettier 格式化规则
├── public/
│   ├── favicon.png             # 站点图标（由 assets/logo.webp 导出）
│   └── apple-touch-icon.png    # iOS 添加到主屏图标
└── src/
    ├── main.ts                 # 应用入口，挂载 #app 并引入全局样式
    ├── App.vue                 # 根组件，只负责区块编排（无样式、无文案）
    ├── style.css               # 全局样式入口 + 设计 token（@theme）+ 基础样式
    ├── vite-env.d.ts           # Vite 类型声明
    ├── assets/
    │   ├── logo.webp           # 品牌图形 mark（259×260，导航栏使用）
    │   └── logo-text.webp      # 完整组合标（图形+中文+英文，页脚使用）
    ├── config/
    │   └── site.ts             # 站点唯一数据源：品牌、导航、各区块文案
    ├── composables/
    │   ├── useReveal.ts        # 滚动进场动效（IntersectionObserver，只触发一次）
    │   └── useActiveSection.ts # 导航高亮（scroll spy，判断当前浏览区块）
    └── components/
        ├── brand/
        │   └── BrandLogo.vue   # 品牌标识：图形 + 中文 + 英文（对应原型左上角）
        ├── layout/
        │   ├── SiteHeader.vue  # 固定顶栏：品牌 / 导航 / 电话 / 预约演示 / 汉堡菜单
        │   └── SiteFooter.vue  # 页脚：组合标 / 快速导航 / 联系方式 / 版权
        ├── sections/
        │   ├── HeroSection.vue      # 首页首屏（#home）
        │   ├── PlatformSection.vue  # 平台架构（#platform）
        │   ├── ProductsSection.vue  # 产品矩阵（#products）
        │   ├── SolutionsSection.vue # 解决方案（#solutions）
        │   └── AboutSection.vue     # 关于我们（#about）
        └── ui/
            ├── BaseButton.vue   # 通用按钮（primary / outline / ghost，渲染为 <a>）
            ├── SectionShell.vue # 区块外壳：锚点 + 留白 + 标题区 + 进场动效
            ├── CardGrid.vue     # 卡片栅格（三列响应式 + 错峰延迟）
            └── CardItem.vue     # 单张卡片（序号 + 标题 + 描述）
```

### 分层职责

| 层 | 职责 | 不该做的事 |
| --- | --- | --- |
| `sections/` | 组装某一屏的内容，从 `config/site.ts` 取数据 | 不写容器宽度、间距、进场动效（交给 `SectionShell`） |
| `ui/` | 与业务无关的可复用件，全部走 props | 不直接 import `siteConfig` |
| `layout/` | 全站骨架（顶栏、页脚） | 不含页面内容区块 |
| `brand/` | 品牌相关视觉资产 | 不处理业务逻辑 |

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

## 页面结构

单页布局，导航锚点与各区块一一对应（`config/site.ts` 的 `navItems` 必须与 section 的 `id` 一致）：

| 区块 | 锚点 | 组件 |
| --- | --- | --- |
| 顶部导航 | — | `layout/SiteHeader.vue` |
| 首页 | `#home` | `sections/HeroSection.vue` |
| 平台架构 | `#platform` | `sections/PlatformSection.vue` |
| 产品矩阵 | `#products` | `sections/ProductsSection.vue` |
| 解决方案 | `#solutions` | `sections/SolutionsSection.vue` |
| 关于我们 | `#about` | `sections/AboutSection.vue` |
| 页脚 | — | `layout/SiteFooter.vue` |

## 响应式断点

移动优先策略，三档主要断点：

| 断点 | 宽度 | 卡片列数 | 导航形态 | 顶栏高度 |
| --- | --- | --- | --- | --- |
| 默认 | < 640px（如 375） | 1 列 | 汉堡菜单 | 64px |
| `sm:` | ≥ 640px（如 768） | 2 列 | 汉堡菜单 | 64px |
| `lg:` | ≥ 1024px（如 1440） | 3 列 | 横向导航 | 84px |

> 导航在 768~1023px 仍用汉堡：5 个导航项 + 电话 + 按钮在该区间会互相挤压，
> 因此完整导航从 `lg`（1024px）才展开，不降到 `md`。

已在 375 / 768 / 1440 三档实测：无横向溢出（`scrollWidth === clientWidth`），
顶栏高度与 `scroll-padding-top`、各区块 `scroll-mt-*` 严格对齐。

## 设计 token

定义在 `src/style.css` 的 `@theme` 中（Tailwind v4 无需 `tailwind.config.js`）：

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--color-brand-50` ~ `900` | `#fff7f2` → `#7d300b` | 品牌橙，取自 logo 渐变中间值 `#FF833F`（对应 `brand-500`） |
| `--color-ink-50` ~ `900` | `#fafafa` → `#1a1a1a` | 中性文字与底色 |

业务代码统一使用语义化类名（`bg-brand-500`、`text-ink-600`），**不写死色值**；换品牌色只改 `@theme` 一处。

## 开发约定

### 布局基准：`container-page`

原型稿按 **1440 × 84** 出图（宽 1440、顶栏高 84），内容区宽度 **1280px**，即左右各留 **80px**。这个基准由 `src/style.css` 中的 `.container-page` 统一提供，**顶栏、首屏、各内容区块、页脚都必须套这一层**，保证 logo 左边缘、首屏标题左边缘、卡片左边缘落在同一条垂直线上。

```
断点：  <640px  16px   |   ≥640px  24px  |  ≥1024px  48px  |  ≥1440px  80px
容器：  max-width: 1920px（120rem），1440 视口下内容区 = 1440 - 80×2 = 1280px
顶栏：  <1024px  h-16 (64px)  |  ≥1024px  h-[84px]
```

> ⚠️ 容器最大宽**不设 1440**。设成 1440 后，在 1920 / 2K 屏上内容会被锁死在 1280 并居中，
> 两侧各多出 240px 以上空白，页面看起来非常松散，与设计稿「内容贴边」的观感正好相反。
> 上限取 1920px：常规宽屏内容随视口伸展、左右恒为 80px，1440 视口下依然精确等于 1280 内容宽。

### 顶栏元素尺寸（设计稿标定值）

| 元素 | 尺寸 / 字号 | 实现位置 |
| --- | --- | --- |
| logo 图形 | 36 × 36 | `BrandLogo.vue` → `lg:h-9 lg:w-9` |
| 品牌中文名 | 19px / 行高 28 / 宽 95 | `BrandLogo.vue` → `lg:text-[19px] lg:leading-[28px]` |
| 品牌英文名 | 8px / 宽 95（`tracking-[0.135em]` 调校值） | `BrandLogo.vue` |
| 导航项 | 15px | `SiteHeader.vue` → `text-[15px]` |
| 电话号码 | 14px | `SiteHeader.vue` → `lg:text-[14px]` |
| 「预约演示」按钮 | 104 × 44 | `BaseButton.vue` → `size="md"` |
| 电话 ↔ 按钮间距 | 24px | `SiteHeader.vue` → `lg:gap-6` |

三类高度必须三处同步改，否则锚点跳转会被顶栏挡住：

| 位置 | 文件 |
| --- | --- |
| 顶栏高度 | `layout/SiteHeader.vue` → `h-16 lg:h-[84px]` |
| 内容区顶部让位 | `App.vue` → `main` 的 `pt-16 lg:pt-[84px]` |
| 锚点偏移 | `style.css` 的 `scroll-padding-top` + `SectionShell.vue` 的 `scroll-mt-16 lg:scroll-mt-[84px]` |

> ⚠️ 不要用 `max-w-7xl px-8` 这类组合替代：`max-w-7xl` 是 1280 的**容器**宽，再加 `px-8`(32px) 内边距后，
> 内容实际从 112px 才开始，比原型整体内缩 32px（顶栏 logo 偏右、按钮偏左就是这么来的）。
>
> 纯文字段落需要更窄时，在 `container-page` 上叠 `max-w-3xl` 即可（工具类优先级高于组件层）。

### 样式写法（三条规范）

1. **布局、间距、字号、颜色、响应式 → 一律用 Tailwind 工具类**
   例：`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`、`text-2xl sm:text-3xl`。

2. **动画、伪元素、第三方组件样式覆盖 → 用组件内的 `<style scoped>` 写原生 CSS**
   Tailwind 不擅长 `@keyframes`、`::before/::after`、`:nth-child`、`clip-path` 等场景，不要硬凑任意值。

3. **同一组类名重复出现 3 次以上 → 抽成组件，不要复制粘贴**
   抽组件优先于使用 `@apply`。

> 判据：当一个元素上的类名超过 10 个、或需要大量 `[]` 任意值才能表达时，就该抽组件或改用 CSS。
>
> ⚠️ 踩坑记录：不要给组件的根元素写 `display` 类（如 `inline-flex`）后再用外部的 `hidden` 控制显隐 ——
> 两者同属 `display` 属性，基础类会覆盖 `hidden`。正确做法是用一层 `<div class="hidden sm:block">` 包裹。

### 注释规范

- **所有 Tailwind 样式必须在其上方加中文注释**，说明类名含义与关键数值（如 `p-8` = 2rem、`gap-6` = 1.5rem），并写明设计意图（为什么限制行长、为什么预留偏移等）。
- 新增或修改样式时同步更新注释，避免注释与实现不一致。
- 配置文件（`vite.config.ts`、`tsconfig.*.json`、`src/config/site.ts`）同样需要注释说明每一项的作用。

### 其他约定

- **路径别名**：`@` 指向 `src/` 目录（`vite.config.ts` 与 `tsconfig.app.json` 已同步配置）
- **文案配置化**：所有页面文案集中在 `src/config/site.ts`，修改内容无需改动组件
- **导航高亮**：`useActiveSection` 用 IntersectionObserver 判断当前区块，自动给导航项加粗
- **锚点偏移**：`scroll-padding-top` 与各区块 `scroll-mt-16 / lg:scroll-mt-[84px]` 已与顶栏高度（64 / 84px）对齐
- **滚动动效**：`useReveal` 实现进场淡入，只触发一次；卡片通过 `delay` 错峰 100ms
- **动效无障碍**：全局尊重 `prefers-reduced-motion`，系统开启减弱动效时自动关闭过渡并直接显示内容
- **SEO**：`index.html` 内含 title / description / canonical / Open Graph / Twitter 卡片 / theme-color；上线前需替换 `example.com` 域名与分享封面图 `og-cover.png`（建议 1200×630）
- **TypeScript**：新组件统一使用 `<script setup lang="ts">`，数据结构优先定义 `interface` 并导出复用
- **构建产物**：输出至 `dist/`，已通过 `.gitignore` 排除版本管理

## Git 提交规范

提交信息遵循 Conventional Commits 格式：`feat: | fix: | docs: | style: | refactor: | chore:`
