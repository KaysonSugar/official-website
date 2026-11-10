# 威易达化工官网

威易达化工官方网站前端，Vue 3 + Vite 8 + TypeScript + Tailwind CSS v4。纯静态站点，无后端，构建产物丢到静态服务器即可。

## 技术栈

| 技术        | 版本 | 说明                                    |
| ----------- | ---- | --------------------------------------- |
| Vue         | ^3.5 | 全部用 `<script setup>` 组合式 API      |
| Vite        | ^8.3 | 开发与构建                              |
| TypeScript  | ~5.9 | 严格模式                                |
| Tailwind v4 | ^4.3 | 走 `@tailwindcss/vite` 插件，无配置文件 |
| Vue Router  | ^4   | History 模式                            |
| ESLint      | ^10  | flat config + Vue/TS 规则               |
| Prettier    | ^3.9 | 无分号、单引号、行宽 100                |

> TypeScript 锁在 5.9：TS 7 是 Go 原生编译器，vue-tsc 还不支持。

## 环境要求

Node.js ≥ 20.19（Vite 8 要求），npm ≥ 10。

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 开发，http://localhost:5173
npm run build      # 类型检查 + 构建到 dist/
npm run preview    # 预览构建产物
npm run typecheck  # 只跑类型检查
npm run lint       # ESLint，加 :fix 自动修
npm run format     # Prettier 格式化 src
```

## 页面路由

| 路由                  | 页面          |
| --------------------- | ------------- |
| `/`                   | 首页（11 屏） |
| `/platform`           | 平台架构      |
| `/products/chemical`  | 化工生产      |
| `/products/logistics` | 物流调度      |
| `/products/driver`    | 司机作业      |
| `/solutions`          | 服务支持      |
| `/about`              | 关于我们      |

`/products` 重定向到化工生产，未知路径回首页。导航数据源是 `config/brand/data.ts` 的 `navItems`，`to` 必须和 `router/index.ts` 的 `path` 一致。

## 目录结构

```
├── index.html            # 入口，含 SEO / 分享卡 / 首帧防闪烁内联脚本
├── vite.config.ts        # Vue + Tailwind 插件、@ 别名
├── eslint.config.js      # flat config
├── public/               # favicon、iOS 图标、自托管字体
└── src/
    ├── main.ts           # 入口，等路由就绪再挂载
    ├── App.vue           # 顶栏 + RouterView + 页脚
    ├── style.css         # 全局样式 + 设计 token（@theme）
    ├── assets/           # brand/ 放全局素材，其余按导航层级分目录
    ├── config/           # 内容数据，每个模块 types.ts 放形状、data.ts 放文案
    ├── components/
    │   ├── layout/       # 顶栏、页脚
    │   ├── sections/     # 各页区块，按页面分目录（home / support / about / products/*）
    │   └── ui/           # 按钮、弹层、回到顶部
    ├── composables/      # useReveal / useCountUp / useLeadForm 等
    ├── router/           # 路由表
    └── views/            # 页面组装，一级页平铺，/products/* 收进子目录
```

分层职责：`views` 只排区块顺序，`sections` 组装单屏内容并从 `config` 取数据，`ui` 是与业务无关的可复用件。

## 开发约定

- 文案全部进 `src/config`：组件里不写中文，模板只取 `siteConfig.xxx`，统一从 `@/config/site` 引。
- 注释只写一行，讲重点。`config/` 只保留文件头注释，`<style scoped>` 零注释。
- 设计稿还原的区块，间距和尺寸写 px 字面值（`mt-[28px]`），不写 rem 档位。
- 布局、间距、字号、颜色用 Tailwind；动画、伪元素、第三方覆盖写 `<style scoped>`。
- 同组类名重复三次以上就抽组件，不用 `@apply`。
- 图片统一 webp，图标和二维码走无损；文件名小写 kebab-case。
- 装饰性大图记得加 `max-w-none`，Tailwind preflight 会把 img 钳到 100%。
- 动效只动 transform 和 opacity，无限动画和 `<Transition>` 要自己处理 `prefers-reduced-motion`。

## 提交规范

Conventional Commits，描述用中文，如 `refactor(common): 内页首屏尺寸改 px 字面值`。
