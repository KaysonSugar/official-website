/**
 * 站点内容配置（唯一数据源）
 *
 * 页面上的品牌信息、导航、各区块标题与文案全部集中在这里。
 * 改文案只改本文件，不需要进组件里翻 DOM；字段写错会在 npm run typecheck 时报错。
 */

/** 顶部导航项 */
export interface NavItem {
  /** 导航显示文字 */
  label: string
  /** 跳转锚点，必须与页面中某个 section 的 id 完全一致，否则点击无反应 */
  href: string
}

/** 通用区块元信息：标题 + 副标题，五个内容区块共用 */
export interface SectionMeta {
  /** 区块主标题 */
  heading: string
  /** 标题下方的一句话说明 */
  desc: string
}

/** 能力 / 产品卡片 */
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
  /** 顶部导航：数组顺序即展示顺序 */
  navItems: NavItem[]
  /** 首屏 Hero */
  hero: {
    /** 主标题 */
    title: string
    /** 一句话价值主张 */
    tagline: string
    /** 主按钮文案 */
    primaryCta: string
    /** 次按钮文案 */
    secondaryCta: string
  }
  /** 平台架构区块 */
  platform: SectionMeta & { items: CardItem[] }
  /** 产品矩阵区块 */
  products: SectionMeta & { items: CardItem[] }
  /** 解决方案区块 */
  solutions: SectionMeta & { items: CardItem[] }
  /** 关于我们区块 */
  about: SectionMeta
  /** 页脚 */
  footer: {
    /** 版权声明，年份建议写死避免每次构建变化 */
    copyright: string
    /** 公司地址 */
    address: string
  }
}

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
  // 顺序与原型图一致：首页 / 平台架构 / 产品矩阵 / 解决方案 / 关于我们
  navItems: [
    { label: '首页', href: '#home' },
    { label: '平台架构', href: '#platform' },
    { label: '产品矩阵', href: '#products' },
    { label: '解决方案', href: '#solutions' },
    { label: '关于我们', href: '#about' },
  ],
  hero: {
    title: '用数字化平台重构化工生产效率',
    tagline: '从原料到成品全链路在线，让每一条产线的数据都能被看见、被追溯、被优化。',
    primaryCta: '预约演示',
    secondaryCta: '了解平台架构',
  },
  platform: {
    heading: '平台架构',
    desc: '统一的底座与数据中台，支撑上层业务快速扩展。',
    // 卡片数量可增减，栅格会自动按 1/2/3 列响应式排布
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
  footer: {
    copyright: '© 2026 威易达化工 版权所有',
    address: '公司地址占位，上线前替换',
  },
}
