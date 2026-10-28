/**
 * 站点内容配置（唯一数据源）
 *
 * 页面上的品牌信息、导航、各页面首屏文案全部集中在这里。
 * 改文案只改本文件，不需要进组件里翻 DOM；字段写错会在 npm run typecheck 时报错。
 */

/** 顶部导航项 */
export interface NavItem {
  /** 导航显示文字 */
  label: string
  /** 路由路径，必须与 src/router/index.ts 中注册的 path 完全一致，否则点击 404 */
  to: string
}

/** 子页面首屏文案（对应原型里除首页之外的 4 张画板） */
export interface PageIntro {
  /** 路由路径 */
  to: string
  /** 页面名称，同时作为导航文字 */
  label: string
  /** 主标题上方的小标签 */
  eyebrow: string
  /** 页面主标题（取自原型画板标题） */
  title: string
  /** 标题下的一句话说明 */
  desc: string
  /** 文字对齐：left 左对齐（原型左侧文案 + 右侧示意卡片）/ center 居中（纯文字页） */
  align: 'left' | 'center'
}

/** 通用区块元信息：标题 + 副标题（临时占位区块使用） */
export interface SectionMeta {
  /** 区块主标题 */
  heading: string
  /** 标题下方的一句话说明 */
  desc: string
}

/** 能力 / 产品卡片（临时占位区块使用） */
export interface CardItem {
  /** 卡片标题 */
  title: string
  /** 卡片描述，建议控制在 40 字以内，过长会撑高同一行的所有卡片 */
  desc: string
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
  /** 顶部导航：数组顺序即展示顺序，首项固定为首页 */
  navItems: NavItem[]
  /** 4 个子页面的首屏文案，顺序与导航一致 */
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
  /** 页脚 */
  footer: {
    /** 版权声明，年份建议写死避免每次构建变化 */
    copyright: string
    /** 公司地址 */
    address: string
  }
  // ↓ 以下 4 组是首页的临时占位区块文案：原型首页的 16 个区块还没拆完，
  //   先留着让首页不至于只有一屏；按原型重建首页时整组删掉
  /** 临时占位：平台架构区块 */
  platform: SectionMeta & { items: CardItem[] }
  /** 临时占位：产品矩阵区块 */
  products: SectionMeta & { items: CardItem[] }
  /** 临时占位：解决方案区块 */
  solutions: SectionMeta & { items: CardItem[] }
  /** 临时占位：关于我们区块 */
  about: SectionMeta
}

/**
 * 4 个子页面的首屏文案
 *
 * 标题取自原型画板名（威易达化工：生产与经营管理 / 威易达物流：调度与合规 /
 * 威易达司机：接单与作业 / 按角色区分的解决方案），描述文案为占位，上线前替换。
 */
const pages: PageIntro[] = [
  {
    to: '/production',
    label: '生产管理',
    eyebrow: '化工业务',
    title: '威易达化工：生产与经营管理',
    desc: '从原料入库到成品出库，把产线、批次、质检与成本串成一条可追溯的经营链路。',
    align: 'left',
  },
  {
    to: '/dispatch',
    label: '调度合规',
    eyebrow: '物流业务',
    title: '威易达物流：调度与合规',
    desc: '车辆、线路、单据在同一个调度台上闭环，让每一趟运输都合规可查。',
    align: 'left',
  },
  {
    to: '/driver',
    label: '接单作业',
    eyebrow: '司机端',
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
  // 导航与子页面同源：首项固定首页，其余按原型画板顺序展开，避免两处手动维护出现错位
  navItems: [{ label: '首页', to: '/' }, ...pages.map(({ label, to }) => ({ label, to }))],
  pages,
  hero: {
    title: '用数字化平台重构化工生产效率',
    tagline: '从原料到成品全链路在线，让每一条产线的数据都能被看见、被追溯、被优化。',
    primaryCta: '预约演示',
    secondaryCta: '了解平台架构',
    secondaryCtaTo: '/production',
  },
  footer: {
    copyright: '© 2026 威易达化工 版权所有',
    address: '公司地址占位，上线前替换',
  },
  // ↓ 临时占位区块文案（首页用），按原型重建首页时整组删除
  platform: {
    heading: '平台架构',
    desc: '统一的底座与数据中台，支撑上层业务快速扩展。',
    items: [
      { title: '统一数据底座', desc: '打通 ERP、MES、WMS 等系统，形成唯一数据源。' },
      { title: '模块化能力', desc: '按需组合生产、仓储、质量、设备等业务模块。' },
      { title: '开放集成接口', desc: '标准 API 与消息总线，兼容现有系统与第三方平台。' },
    ],
  },
  products: {
    heading: '产品矩阵',
    desc: '覆盖生产执行、质量追溯、供应链协同的完整产品线。',
    items: [
      { title: '生产执行系统', desc: '工单、排程、报工与在制品管理一体化。' },
      { title: '质量追溯系统', desc: '批次级正向反向追溯，异常快速定位。' },
      { title: '供应链协同', desc: '采购、库存、物流全流程在线协同。' },
    ],
  },
  solutions: {
    heading: '解决方案',
    desc: '面向不同规模与工艺场景的落地实践。',
    items: [
      { title: '精细化工', desc: '配方管理、批次管控与合规审计。' },
      { title: '新材料', desc: '研发到量产的数据贯通与工艺沉淀。' },
      { title: '集团多工厂', desc: '多组织协同与跨工厂指标对标。' },
    ],
  },
  about: {
    heading: '关于我们',
    desc: '威易达化工专注化工行业数字化建设，为生产企业提供从规划到落地的整体服务。',
  },
}

/**
 * 按路由路径取子页面配置
 *
 * 各 View 用它拿首屏文案，写错路径会在开发时立刻抛错，而不是渲染出一片空白。
 */
export function getPage(to: string): PageIntro {
  const page = siteConfig.pages.find((item) => item.to === to)
  if (!page) {
    throw new Error(`config/site.ts 中缺少路径为 ${to} 的页面配置`)
  }
  return page
}
