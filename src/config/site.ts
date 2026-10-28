/**
 * 站点内容配置（唯一数据源）
 *
 * 页面上的品牌信息、导航、各页面首屏文案全部集中在这里。
 * 改文案只改本文件，不需要进组件里翻 DOM；字段写错会在 npm run typecheck 时报错。
 */

/** 二级导航项（悬停下拉里的子项） */
export interface NavChild {
  /** 显示文字 */
  label: string
  /** 一行补充说明，下拉里显示为标题下方的小字，可不填 */
  desc?: string
  /** 路由路径，必须与 src/router/index.ts 中注册的 path 一致 */
  to: string
}

/** 顶部导航项 */
export interface NavItem {
  /** 导航显示文字 */
  label: string
  /** 路由路径，必须与 src/router/index.ts 中注册的 path 完全一致，否则点击 404 */
  to: string
  /** 二级子项：有该字段时，桌面端鼠标悬停展开下拉面板，移动端在菜单里缩进展示 */
  children?: NavChild[]
}

/** 页面首屏文案 */
export interface PageIntro {
  /** 路由路径 */
  to: string
  /** 页面名称，一级页同时作为导航文字 */
  label: string
  /** 主标题上方的小标签 */
  eyebrow: string
  /** 页面主标题（有原型画板的直接取画板标题） */
  title: string
  /** 标题下的一句话说明 */
  desc: string
  /** 文字对齐：left 左对齐（原型左侧文案 + 右侧示意卡片）/ center 居中（纯文字页） */
  align: 'left' | 'center'
}

/** 站点整体配置 */
export interface SiteConfig {
  /** 品牌信息：导航栏与页脚共用 */
  brand: {
    /** 中文品牌名 */
    name: string
    /** 英文品牌名，导航栏中显示为小字 + 宽字距 */
    nameEn: string
  }
  /** 联系方式与主行动按钮（导航栏右侧） */
  contact: {
    /** 电话号码（展示用，保留连字符便于阅读） */
    phone: string
    /** 拨号链接（tel: 协议，去掉连字符） */
    phoneHref: string
    /** 主按钮文案 */
    ctaLabel: string
    /** 主按钮跳转地址：当前直接拨号，后续接表单页或企微客服时改这里即可 */
    ctaHref: string
  }
  /** 顶部导航：数组顺序即展示顺序 */
  navItems: NavItem[]
  /** 各页面首屏文案（首页除外，首页文案在 hero 里） */
  pages: PageIntro[]
  /** 首页首屏 Hero */
  hero: {
    /** 主标题 */
    title: string
    /** 一句话价值主张 */
    tagline: string
    /** 主按钮文案 */
    primaryCta: string
    /** 次按钮文案 */
    secondaryCta: string
    /** 次按钮跳转的路由 */
    secondaryCtaTo: string
  }
  /** 页面底部的行动号召区（首页与全部内页共用同一份文案） */
  cta: {
    /** 主标题 */
    title: string
    /** 一句话说明 */
    desc: string
  }
  /** 页脚 */
  footer: {
    /** 版权声明，年份建议写死避免每次构建变化 */
    copyright: string
    /** 公司地址 */
    address: string
  }
}

/**
 * 各页面首屏文案
 *
 * 有原型画板的直接用画板标题（威易达化工：生产与经营管理 / 威易达物流：调度与合规 /
 * 威易达司机：接单与作业 / 按角色区分的解决方案）；
 * 平台架构、产品矩阵、关于我们三页的原型尚未提供，标题与描述为占位，上线前替换。
 */
const pages: PageIntro[] = [
  {
    to: '/platform',
    label: '平台架构',
    eyebrow: '平台能力',
    title: '平台架构',
    desc: '一套统一底座 + 模块化业务能力，让化工、物流、司机三条业务线共用同一份数据。',
    align: 'left',
  },
  {
    to: '/products',
    label: '产品矩阵',
    eyebrow: '三条业务线',
    title: '产品矩阵',
    desc: '化工生产、物流调度、司机作业各自独立成端，数据在三条线之间直接流转，不用二次录入。',
    align: 'left',
  },
  {
    to: '/products/chemical',
    label: '化工生产',
    eyebrow: '产品线 01',
    title: '威易达化工：生产与经营管理',
    desc: '从原料入库到成品出库，把产线、批次、质检与成本串成一条可追溯的经营链路。',
    align: 'left',
  },
  {
    to: '/products/logistics',
    label: '物流调度',
    eyebrow: '产品线 02',
    title: '威易达物流：调度与合规',
    desc: '车辆、线路、单据在同一个调度台上闭环，让每一趟运输都合规可查。',
    align: 'left',
  },
  {
    to: '/products/driver',
    label: '司机作业',
    eyebrow: '产品线 03',
    title: '威易达司机：接单与作业',
    desc: '司机端轻量接单，装货、在途、签收步步留痕，回单自动归集。',
    align: 'left',
  },
  {
    to: '/solutions',
    label: '解决方案',
    eyebrow: '角色化方案',
    title: '按角色区分的解决方案',
    desc: '把老板、调度、司机各自的问题拆开，用同一套数据回答不同的关切。',
    align: 'center',
  },
  {
    to: '/about',
    label: '关于我们',
    eyebrow: '关于威易达',
    title: '关于我们',
    desc: '威易达化工专注化工行业数字化建设，为生产企业提供从规划到落地的整体服务。',
    align: 'left',
  },
]

/** 产品矩阵下挂的三条业务线（与导航下拉同源，改这里两处一起变） */
const productLines: NavChild[] = [
  { label: '化工生产', desc: '生产与经营管理', to: '/products/chemical' },
  { label: '物流调度', desc: '调度与合规', to: '/products/logistics' },
  { label: '司机作业', desc: '接单与作业', to: '/products/driver' },
]

/** 实际内容（当前为占位文案，上线前替换） */
export const siteConfig: SiteConfig = {
  brand: {
    name: '威易达化工',
    nameEn: 'WEIYIDA HUAGONG',
  },
  contact: {
    phone: '400-001-8355',
    phoneHref: 'tel:4000018355',
    ctaLabel: '预约演示',
    ctaHref: 'tel:4000018355',
  },
  // 一级导航五项目；「产品矩阵」带下拉，化工 / 物流 / 司机是它的二级项，不是一级导航
  navItems: [
    { label: '首页', to: '/' },
    { label: '平台架构', to: '/platform' },
    { label: '产品矩阵', to: '/products', children: productLines },
    { label: '解决方案', to: '/solutions' },
    { label: '关于我们', to: '/about' },
  ],
  pages,
  hero: {
    title: '用数字化平台重构化工生产效率',
    tagline: '从原料到成品全链路在线，让每一条产线的数据都能被看见、被追溯、被优化。',
    primaryCta: '预约演示',
    secondaryCta: '了解平台架构',
    secondaryCtaTo: '/platform',
  },
  cta: {
    title: '约一次 30 分钟的线上演示',
    desc: '按你的产线、仓库与运输线路走一遍实际操作，看完再判断值不值得推进。',
  },
  footer: {
    copyright: '© 2026 威易达化工 版权所有',
    address: '公司地址占位，上线前替换',
  },
}

/**
 * 按路由路径取页面首屏配置
 *
 * 各 View 用它拿文案，写错路径会在开发时立刻抛错，而不是渲染出一片空白。
 */
export function getPage(to: string): PageIntro {
  const page = siteConfig.pages.find((item) => item.to === to)
  if (!page) {
    throw new Error(`config/site.ts 中缺少路径为 ${to} 的页面配置`)
  }
  return page
}
