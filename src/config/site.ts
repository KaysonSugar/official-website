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
  /** 首页首屏 Hero（定稿原型 01：左文案 + 右后台看板） */
  hero: {
    /** 标题上方的法规对标胶囊 */
    badge: string
    /** 主标题第一行（黑） */
    title: string
    /** 主标题第二行（品牌橙） */
    titleAccent: string
    /** 标题下的一段说明 */
    desc: string
    /** 主按钮文案 */
    primaryCta: string
    /** 主按钮下方三个卖点胶囊 */
    features: string[]
    /** 首屏底部数字条 */
    stats: { value: string; label: string }[]
  }
  /** 页面底部的行动号召区（首页与全部内页共用同一份文案） */
  cta: {
    /** 主标题 */
    title: string
    /** 一句话说明 */
    desc: string
  }
  /** 页脚（对应原型底部的深色收尾区，1440 画板下高 343） */
  footer: {
    /** 品牌描述：一行一句，最多两句，超出会在左列折行 */
    desc: string[]
    /** 品牌理念短语：页脚中四个短语用「·」连成一行展示 */
    slogan: string[]
    /**
     * 链接分栏
     *
     * 页脚的入口比导航栏更细，便于访客直接落到具体业务。
     * `to` 既可以是路由路径（走 RouterLink，不刷新），也可以是 `tel:` 这类外链（走原生 a）。
     */
    linkGroups: {
      /** 分栏标题 */
      title: string
      /** 条目 */
      items: { label: string; to: string }[]
    }[]
    /** 版权声明（底部左侧） */
    copyright: string
    /** 定位语（底部右侧） */
    tagline: string
  }
}

/**
 * 各页面首屏文案
 *
 * 有原型画板的直接用画板标题（威易达化工：生产与经营管理 / 威易达物流：调度与合规 /
 * 威易达司机：接单与作业 / 服务支持）；
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
    label: '服务支持',
    eyebrow: '服务支持',
    title: '服务支持',
    desc: '从实施交付到培训与售后，全流程跟进保障，让平台在你的产线上真正用起来。',
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
  // 一级导航四项（对应定稿原型 01 首页顶栏）；「产品矩阵」带下拉，
  // 化工 / 物流 / 司机是它的二级项，不是一级导航。
  // 「平台架构」不在导航里了，页面保留（页脚与首页次按钮还链过去）
  navItems: [
    { label: '首页', to: '/' },
    { label: '产品矩阵', to: '/products', children: productLines },
    { label: '服务支持', to: '/solutions' },
    { label: '关于我们', to: '/about' },
  ],
  pages,
  hero: {
    badge: '对标 2026 版《危险化学品安全法》',
    title: '威易达化工生产 + 危化运输',
    titleAccent: '一体化平台',
    desc: '覆盖销售订单、原料入库、工厂投产、成品发货与在途运输的全过程。业务数据一处录入、多处复用，合规记录随流程自动生成。',
    primaryCta: '预约演示',
    features: ['合规前置校验', '一物一码全链路追溯', '多端协同调度'],
    stats: [
      { value: '10', label: '大业务模块' },
      { value: '1', label: '个数据库' },
      { value: '7 天', label: '完成上线部署' },
      { value: '7×24', label: '技术支持响应' },
    ],
  },
  cta: {
    title: '约一次 30 分钟的线上演示',
    desc: '按你的产线、仓库与运输线路走一遍实际操作，看完再判断值不值得推进。',
  },
  footer: {
    desc: ['化工生产 + 危化运输一体化平台，全链路数字化、全流程规范化、全方位安全化。'],
    slogan: ['市场为源', '客户为心', '应用而创', '携手同行'],
    linkGroups: [
      {
        title: '产品',
        items: [
          { label: '威易达化工', to: '/products/chemical' },
          { label: '威易达物流', to: '/products/logistics' },
          { label: '威易达司机', to: '/products/driver' },
          // 报表看板尚无独立页面，先指向平台架构（数据能力所在）；后续补页时改这里
          { label: '报表与数据看板', to: '/platform' },
        ],
      },
      {
        title: '解决方案',
        items: [
          { label: '化工生产管理', to: '/products/chemical' },
          { label: '危化运输调度', to: '/products/logistics' },
          { label: '合规与全程追溯', to: '/solutions' },
          { label: '平台架构', to: '/platform' },
        ],
      },
      {
        title: '关于威易达',
        items: [
          { label: '公司介绍', to: '/about' },
          { label: '实施与服务', to: '/about' },
          // 设计稿为「联系我们」，站内暂无联系页，直接拨号更实用
          { label: '联系我们', to: 'tel:4000018355' },
        ],
      },
    ],
    copyright: '2026 苏州羿瑞成信息科技有限公司　版权所有',
    tagline: '威易达化工 · 化工生产与危化运输一体化平台',
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
