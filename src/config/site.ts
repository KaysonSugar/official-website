/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 站点内容配置
 */

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
    /** 首屏底部数字条；noCount 的条目不做递增、直接显示终值 */
    stats: { value: string; label: string; noCount?: boolean }[]
  }
  /** 首页第二屏：行业背景与法规驱动（定稿原型 02，纯文字 + 四张法规卡片） */
  industry: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的一句话说明 */
    desc: string
    /** 四张法规卡片，icon 对应 assets/home/icons 下的素材名 */
    cards: { icon: 'shield' | 'chip' | 'ban' | 'pin'; label: string; title: string; desc: string }[]
    /** 底部「平台响应」提示条 */
    note: string
  }
  /** 首页第三屏：轻量化平台（定稿原型 03，胶囊 + 痛点面板 + 两组卡片 + 底部绿条） */
  lightweight: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的一段说明 */
    desc: string
    /** 标题下四个卖点胶囊，icon 对应 assets/home/icons 下的素材名 */
    tags: { icon: 'tag-erp' | 'tag-invest' | 'tag-speed' | 'tag-launch'; text: string }[]
    /** 痛点面板：浅橙大底内嵌三张白卡 */
    pain: {
      /** 面板左上角的小标题 */
      title: string
      /** 三张痛点卡，编号 01/02/03 显示在卡片右上角 */
      cards: {
        icon: 'pain-price' | 'pain-staff' | 'pain-compliance'
        no: string
        title: string
        desc: string
      }[]
    }
    /** 两组「小标题 + 卡片阵列」，投入轻四卡 4 列、核心能力四卡 2×2 */
    groups: {
      /** 小标题 */
      title: string
      /** 卡片横排列数：4 竖卡一排 / 2 宽卡两排，窄屏自动降列 */
      cols: 4 | 2
      cards: {
        icon: string
        title: string
        desc: string
      }[]
    }[]
    /** 底部绿色提示条里的两条短句（左侧带勾图标） */
    notes: string[]
  }
  /** 首页第四屏：平台功能结构（定稿原型 04，暗色分层架构图，纯文字无图标） */
  architecture: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的一句话说明 */
    desc: string
    /** 六层架构：普通层渲染等宽文字块，业务层渲染带能力清单的模块卡 */
    layers: {
      /** 左侧的层名 */
      label: string
      /** 普通层的文字块，块数即列数 */
      blocks?: string[]
      /** 业务层模块卡：模块名 + 括号里的能力清单 */
      modules?: { title: string; desc: string }[]
    }[]
    /** 底部提示条（绿点开头的一句长文案） */
    note: string
  }
  /** 首页第五屏：三端业务运转模式（定稿原型 05，流程图整图 + 三张业务线卡片） */
  matrix: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的两行说明 */
    desc: string
    /**
     * 三张业务线卡片，顺序决定装饰素材（光斑 / 圆环）的取用
     * href 填外部系统地址（新窗口打开）；司机端未上线则不填，点击提示正在上线
     */
    cards: {
      /** 卡片顶部的品牌图标，对应 assets/home/images 下的素材名 */
      icon: 'chemical' | 'logistics' | 'driver'
      /** 配色：orange 化工卡（暖橙）/ green 物流与司机卡（薄荷绿） */
      tone: 'orange' | 'green'
      /** 标题上方的小胶囊标签 */
      label: string
      /** 卡片标题 */
      title: string
      /** 卡片正文 */
      desc: string
      /** 能力小胶囊，一行放不下自动换行 */
      tags: string[]
      /** 「了解 XX」的跳转地址，不填则点击后提示正在上线 */
      href?: string
    }[]
  }
  /** 首页第六屏：核心功能详解（定稿原型 06，六张功能卡，icon 对应 assets/home/icons 的 fn-* 素材） */
  capabilities: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的两行说明 */
    desc: string
    /** 六张功能卡，顺序即原型从左到右、从上到下 */
    cards: { icon: 'order' | 'bom' | 'stock' | 'purchase' | 'process' | 'sales'; title: string; desc: string }[]
  }
  /** 首页第七屏：生产主流程图（定稿原型 07，纯文字流程图，零图标素材） */
  workflow: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的一句话说明 */
    desc: string
    /** 顶部主流程节点，arrow 表示节点右侧跟一个 → 箭头 */
    topNodes: { text: string; tone: 'orange' | 'green' | 'plain'; arrow: boolean }[]
    /** 菱形判断块的文字 */
    judge: string
    /** 两条分支：head 分支名条，steps 中间步骤，tail 收尾条 */
    branches: {
      head: string
      tone: 'orange' | 'green'
      steps: string[]
      tail: { text: string; tone: 'tinted' | 'solid' }
    }[]
    /** 底部汇合提示条文案 */
    note: string
  }
  // 原型 08：运输协同。环形闭环图直接用设计导出的整图（collab-flow.png），
  // 文字都在图里，这里只留标题区文案；面板背景色晕由组件画
  collab: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的两行说明 */
    desc: string
  }
  /** 首页第九屏：全链路一体化优势（定稿原型 08-S8，暗色三行对照表 + 三张支撑卡，无图标） */
  advantage: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 三行参与方；化工企业痛点只有两条，两组条目各自独立、长度不要求相等 */
    rows: {
      name: string
      pains: { title: string; desc: string }[]
      solutions: { title: string; desc: string }[]
    }[]
    /** 平台层三张支撑卡；tone 决定编号颜色（原型 01/03 橙、02 绿） */
    supports: { no: string; tone: 'orange' | 'green'; title: string; desc: string }[]
    /** 底部核心观点条：左侧小标签 + 正文 */
    noteTag: string
    note: string
  }
  /** 原型 09：降本增效。上排四张违规风险卡 + 下排一张四列收益宽卡 */
  costEfficiency: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的一行说明 */
    desc: string
    /** 违规风险卡：title 黑标题、penalty 橙色处罚行、guard 灰色防控行 */
    risks: { title: string; penalty: string; guard: string }[]
    /** 收益宽卡四列：tone 决定顶部小色条颜色（原型前两列绿、后两列橙） */
    gains: { tone: 'orange' | 'green'; title: string; desc: string }[]
  }
  /** 原型 10：我们的服务。三张服务卡，图标素材自带浅色圆角底 */
  service: {
    /** 标题上方的橙色眉题（英文 / 中文） */
    eyebrow: string
    /** 板块主标题 */
    title: string
    /** 标题下的一行说明 */
    desc: string
    /** 服务卡：icon 对应 icons 目录的短名，items 为小圆点列表 */
    cards: { icon: 'implement' | 'custom' | 'support'; title: string; items: string[] }[]
  }
  /** 页面底部的行动号召区（首页与全部内页共用同一份文案，对应原型 CTA Card） */
  cta: {
    /** 主标题 */
    title: string
    /** 说明（原型两行，讲演示怎么走、要多久） */
    desc: string
    /** 橙卡上的白色主按钮文案（原型「预约产品演示」，跟导航栏的 ctaLabel 不是一回事） */
    button: string
    /** 按钮下方的小字：电话与工作时间 */
    phoneNote: string
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
    primaryCta: '预约产品演示',
    features: ['合规前置校验', '一物一码全链路追溯', '多端协同调度'],
    stats: [
      { value: '10', label: '大业务模块' },
      { value: '1', label: '个数据库' },
      // 这两条不递增：0.9s 动画里会闪过「6 天 / 6×24」，6×24 语义就不对
      { value: '7 天', label: '完成上线部署', noCount: true },
      { value: '7×24', label: '技术支持响应', noCount: true },
    ],
  },
  // 原型 02 的四张卡片按新法条款顺序排，icon 名对应 assets/home/icons/ 下的 png
  industry: {
    eyebrow: 'INDUSTRY & COMPLIANCE / 行业背景与法规驱动',
    title: '行业背景与法规驱动',
    desc: '新法核心要求：信息化建设与危化品全生命周期安全管控',
    cards: [
      {
        icon: 'shield',
        label: '第 6 条 / 第 11 条',
        title: '双重预防 + 信息化管控',
        desc: '强制企业构建风险分级管控与隐患排查双重预防机制，推进安全生产信息化，实现全生命周期追溯。',
      },
      {
        icon: 'chip',
        label: '第 12 条',
        title: '鼓励智能自控与数字化',
        desc: '鼓励采用智能控制系统，实现自动监测、数字化管控等先进适用的安全生产技术。',
      },
      {
        icon: 'ban',
        label: '第 82 条 / 第 83 条',
        title: '严禁混装与违规处罚',
        desc: '严禁危化品混装运输与储存，对违规行为实施高额罚款与行政处罚，彻底压降物理混装风险。',
      },
      {
        icon: 'pin',
        label: '第 69 条',
        title: '运输全流程动态管控',
        desc: '强制对运输车辆、驾驶与押运人员实施动态管控，确保危化品运输轨迹可查、状态可控。',
      },
    ],
    note: '平台响应：对标新法要求，将合规要求内置于系统流程，以全生命周期信息化手段，帮助企业轻松应对监管挑战，实现安全与合规一体化落地。',
  },
  // 原型 03：轻量化平台。icon 名即 assets/home/icons/ 下的文件名（不含 .png）
  lightweight: {
    eyebrow: 'LIGHTWEIGHT PLATFORM / 轻量化平台',
    title: '减负提效，轻量合规',
    desc: '面向预算与信息化人员较为有限的中小化工及运输企业，平台以 SaaS 方式交付，覆盖生产、仓储、运输与合规台账管理。',
    tags: [
      { icon: 'tag-erp', text: '无需重型 ERP 系统' },
      { icon: 'tag-invest', text: '无需大额软硬件投入' },
      { icon: 'tag-speed', text: '基础操作约一小时' },
      { icon: 'tag-launch', text: '七天完成上线部署' },
    ],
    pain: {
      title: '中小企业的三项现实约束',
      cards: [
        {
          icon: 'pain-price',
          no: '01',
          title: '预算有限',
          desc: '重型系统采购与定制开发投入较高，实施周期长。',
        },
        {
          icon: 'pain-staff',
          no: '02',
          title: '落地困难',
          desc: '缺乏专职运维及信息化人员，复杂系统难以推广。',
        },
        {
          icon: 'pain-compliance',
          no: '03',
          title: '合规压力',
          desc: '追溯、人车校验与台账缺乏专人管理，违规处罚金额高。',
        },
      ],
    },
    groups: [
      {
        title: '平台在投入、操作、运维与部署四个方面进行了简化',
        cols: 4,
        cards: [
          { icon: 'light-invest', title: '投入轻', desc: '无需额外实施费用，按需订阅。' },
          { icon: 'light-operate', title: '操作轻', desc: '流程精简，约一小时即可掌握。' },
          { icon: 'light-maintain', title: '运维轻', desc: '无需专职 IT，版本由云端统一升级。' },
          { icon: 'light-deploy', title: '部署轻', desc: 'SaaS 架构，无需本地服务器。' },
        ],
      },
      {
        title: '核心能力覆盖生产、调度、溯源与财务台账',
        cols: 2,
        cards: [
          {
            icon: 'cap-production',
            title: '生产管控',
            desc: '支持简易排产与 BOM 自动拆解，库存、采购及生产环节形成闭环管理。',
          },
          {
            icon: 'cap-dispatch',
            title: '智能调度',
            desc: '运单一键发布，系统自动匹配运力，并校验人车资质与禁配物料。',
          },
          {
            icon: 'cap-trace',
            title: '全链路溯源',
            desc: '采用一物一码追溯，电子台账自动生成并加密存档，监管报表可导出。',
          },
          {
            icon: 'cap-finance',
            title: '财务台账',
            desc: '收付款、报销与资金流水统一统计，报表自动生成，满足日常对账需要。',
          },
        ],
      },
    ],
    notes: [
      '生产、仓储与运输共用同一套系统，无需在多个软件之间切换。',
      '合规校验内置于业务流程之中，对无证作业与混装等违规行为形成事前拦截。',
    ],
  },
  // 原型 04：平台功能结构。暗色分层图，layers 顺序即从上到下；
  // 业务层用 modules（四张棕卡），其余层用 blocks（等宽文字块）
  architecture: {
    eyebrow: 'PLATFORM ARCHITECTURE / 平台架构',
    title: '平台功能结构',
    desc: '从展示层到资源服务层共六层。化工企业的生产合规需求与物流企业的调度合规需求，共用同一套用户体系、数据与算法能力。',
    layers: [
      { label: '展示层', blocks: ['PC', 'APP', '大屏'] },
      { label: '用户层', blocks: ['货主', '货运公司', '司机', '平台管理'] },
      {
        label: '业务层',
        modules: [
          {
            title: '货主模块',
            desc: '销售管理、物流管理、采购管理、库存管理、质量安全、合同资金',
          },
          {
            title: '货运公司模块',
            desc: '运单管理、配载调度、货源推荐、仓储推荐、司机押运员管理、车辆管理',
          },
          {
            title: '司机模块',
            desc: '货源推荐、线上接单、风险预警、应急预案',
          },
          {
            title: '平台管理模块',
            desc: '用户管理、车辆管理、优化配载、运力调度、业务数据分析、风险可控',
          },
        ],
      },
      { label: '算法层', blocks: ['协同过滤算法', '路径算法', 'MRP 物料需求算法'] },
      { label: '数据库', blocks: ['基础数据库', '业务数据库', '危化品数据库'] },
      {
        label: '资源服务层',
        blocks: ['云服务器 ECS', '负载均衡 SLB', '云数据库 RDS MySQL', '弹性公网 IP', '日志服务'],
      },
    ],
    note: '新法的监管逻辑是源头防控、全程监督、智能预警、永久溯源。平台按这项顶层组织功能，生产与运输共用同一套客户、数据与算法。',
  },
  // 原型 05：三端业务运转模式。流程图是一整张透明底素材（matrix-flow.png），
  // 卡片的 href 是三个外部系统入口；司机端还没上线，故意不给 href
  matrix: {
    eyebrow: 'PRODUCT MATRIX / 产品矩阵',
    title: '三端业务运转模式',
    desc: '化工企业用「威易达化工」管生产、合同与资金；货运公司用「威易达物流」管车辆、人员与调度；司机用「威易达司机」接单、报备、回单。三端共用同一套订单与数据。',
    cards: [
      {
        icon: 'chemical',
        tone: 'orange',
        label: '化工生产企业',
        title: '威易达化工',
        desc: '把销售、采购、仓储、合同、资金、生产、质检与安检环节装进一套系统，订单驱动排产，BOM 精准算料，一物一码追溯从原料入厂到成品出库。',
        tags: ['销售管理', '采购管理', '仓储管理', '生产 BOM', '质安检', '报表分析'],
        href: 'https://prod.weihuayunshu.com/producer/',
      },
      {
        icon: 'logistics',
        tone: 'green',
        label: '危化品运输企业',
        title: '威易达物流',
        desc: '把线下调度搬上系统：资质前置校验、智能派单、合规线路规划、在途动态监控全部线上完成，运单全程留痕，可随时导出对账。',
        tags: ['运单调度', '车辆司机', '资质校验', '在途监控', '电子回单', '对账结算'],
        href: 'https://prod.weihuayunshu.com/carrier/',
      },
      {
        icon: 'driver',
        tone: 'green',
        label: '危化品运输司机',
        title: '威易达司机',
        desc: '一手货源看得见：一键接单、在线报备、电子回单、禁配与线路提示，把过去靠电话沟通的环节压缩成几次点击。',
        tags: ['找货接单', '在线报备', '电子回单', '合规提示', '安全培训'],
      },
    ],
  },
  // 原型 06：核心功能详解。六张卡按业务流顺序排（订单 → BOM → 库存 → 采购 → 投产 → 销售），
  // icon 名对应 assets/home/icons/ 下的 fn-*.png（素材自带浅色圆角底，橙绿交替）
  capabilities: {
    eyebrow: 'CORE CAPABILITIES / 核心功能详解',
    title: '业务流程闭环',
    desc: '销售订单确认后，系统依次完成生产计划、BOM 拆解、物料需求计算与库存校验。缺料自动转采购，齐套自动转领料，计划员只需核对系统生成的需求清单。',
    cards: [
      {
        icon: 'order',
        title: '订单驱动，智能排产',
        desc: '多张销售订单自动合并，结合产能与交期生成最优生产计划，减少换线次数。',
      },
      {
        icon: 'bom',
        title: 'BOM 多级展开，物料精准',
        desc: '成品自动拆解到半成品与原材料，按定额与损耗系数计算需求量，杜绝漏算、多算。',
      },
      {
        icon: 'stock',
        title: '库存智能校验，按需触发',
        desc: '对照实时库存自动判定可用量，缺料触发采购，齐套触发领料，采购与车间同步收紧。',
      },
      {
        icon: 'purchase',
        title: '采购—质检—入库闭环',
        desc: '询价、比价、验收、质检、入库逐环节留痕，批次与供应商绑定，物料质量来源可查。',
      },
      {
        icon: 'process',
        title: '工序化投产，过程标准化',
        desc: '投产工单与工序、工时绑定，投料量与实际产出双向核对，生产进度实时可见。',
      },
      {
        icon: 'sales',
        title: '产销衔接，数据互通',
        desc: '成品入库即刻同步可用库存与可承诺量，销售报价与交期承诺有真实数据支撑。',
      },
    ],
  },
  // 原型 07：生产主流程图。纯文字流程图无图标：顶部四节点 → 菱形判断 → 左右两条分支
  workflow: {
    eyebrow: 'WORKFLOW / 生产主流程图',
    title: '生产主流程管理',
    desc: '流程中只有一个判断点：即时库存是否满足。不足生成采购单，齐套生成领料单，两条分支最终都在成品入库与发货环节汇合。',
    // 顶部主流程节点，arrow 前置表示节点右侧跟一个 →
    topNodes: [
      { text: '销售订单', tone: 'orange', arrow: true },
      { text: '生产计划（绑定成品和 BOM）', tone: 'green', arrow: true },
      { text: 'BOM 多级展开', tone: 'plain', arrow: true },
      { text: '物料需求（半成品 / 原料 / 包材）', tone: 'green', arrow: false },
    ],
    judge: '库存可用量',
    // 两条分支：head 分支名条、steps 中间步骤、tail 收尾条（tone=solid 是深绿实心）
    branches: [
      {
        head: '库存不足 → 采购分支',
        tone: 'orange',
        steps: ['生成采购单', '供应商比价 · 送货', '来料质检'],
        tail: { text: '原料入库（批次可追溯）', tone: 'tinted' },
      },
      {
        head: '库存充足 → 生产分支',
        tone: 'green',
        steps: ['生成领料单', '投料生产 · 工序化作业', '成品入库'],
        tail: { text: '发货出库 → 运输调度', tone: 'solid' },
      },
    ],
    note: '两条分支最终都汇入成品入库与发货环节：采购回来的原料进入投料生产，库存充足则直接领料投产 —— 全流程单据与批次数据自动联动，无需二次录入。',
  },
  collab: {
    eyebrow: 'COLLABORATION / 运输协同流程图',
    title: '运输协同',
    desc: '化工企业发布运单，货主端完成比价与合同确认，物流端派车，司机接单承运并回传在途状态。回单与结算数据回流至货主，形成完整闭环。',
  },
  advantage: {
    eyebrow: 'FULL-CHAIN ADVANTAGE / 全链路一体化优势',
    title: '三类参与方的核心痛点与对应方案',
    rows: [
      {
        name: '化工企业',
        pains: [
          { title: '生产混乱', desc: '订单排产无序；BOM 拆解易错，库存与生产脱节。' },
          { title: '管理繁琐', desc: '台账人工记录，全流程溯源难，合规风险高。' },
        ],
        solutions: [
          { title: '生产管控一体化', desc: '订单驱动智能排产，BOM 自动拆解，库存智能校验。' },
          { title: '管理数字化', desc: '自动化台账，一物一ID 全流程溯源，满足合规审计。' },
          { title: '运输资源整合', desc: '多渠道运力入池，透明比价，全程在途监控。' },
        ],
      },
      {
        name: '物流企业',
        pains: [
          { title: '获客难', desc: '优质货源分散，接单渠道单一。' },
          { title: '调度难', desc: '人工派单效率低，运力匹配不合理。' },
          { title: '合规难', desc: '人车资质审核繁琐，货物禁配风险高。' },
        ],
        solutions: [
          { title: '货源信息聚合', desc: '平台汇聚优质货源，拓宽接单渠道。' },
          { title: '智能调度派单', desc: '系统自动匹配最优运力，提升调度效率。' },
          { title: '合规前置校验', desc: '自动核验人车资质，禁配自动检测，规避风险。' },
        ],
      },
      {
        name: '危化司机',
        pains: [
          { title: '找货难', desc: '货源信息杂乱，优质订单匹配效率低。' },
          { title: '流程繁', desc: '接单-报备-回单流程繁琐，沟通成本高。' },
          { title: '风险高', desc: '禁配、路线无指导，违规风险高。' },
        ],
        solutions: [
          { title: '智能订单匹配', desc: '精准推送优质订单，提升接单效率。' },
          { title: '操作流程简化', desc: '一键接单，在线报备、电子回单，简化操作。' },
          { title: '全程合规指导', desc: '智能规划合规路线，禁配风险提前预警。' },
        ],
      },
    ],
    supports: [
      {
        no: '01',
        tone: 'orange',
        title: '数据自动串联',
        desc: '原料入库、生产完工、成品仓储、销售出库、运输签收全链路自动打通，跨系统抄录与二次录入彻底消失。',
      },
      {
        no: '02',
        tone: 'green',
        title: '一物一 ID 贯穿全周期',
        desc: '每一批次、每一包化学品都有唯一身份标识，从生成到使用逐环节记录，随时可追溯、责任可界定。',
      },
      {
        no: '03',
        tone: 'orange',
        title: '契合新法合规要求',
        desc: '完整响应安全生产法对危化品全生命周期信息化管理与跨部门数据共享的要求，从源头规避合规风险。',
      },
    ],
    noteTag: '核心观点',
    note: '全流程记录在一处可查：管理层看得见瓶颈工序，合规岗调得出批次台账，客户查得到货物去向。',
  },
  // 原型 09：降本增效。处罚行按原型保留「处罚 5-50 万元 · 停产整顿」的写法，
  // 连接符用短横线；四张卡文字长短不一，靠栅格等宽对齐
  costEfficiency: {
    eyebrow: 'COST & EFFICIENCY / 为企业降本增效',
    title: '违规风险前置拦截，人工成本逐项下降',
    desc: '四类高频违规由系统在业务发生前拦截，不依赖个人记忆与责任心。重复录入由系统自动完成，同样的人手可以处理更多单据。',
    risks: [
      {
        title: '危化混装 · 瞒报谎报',
        penalty: '处罚 5-50 万元 · 停产整顿',
        guard: '防控：自动禁配校验，从源头杜绝违规配载',
      },
      {
        title: '台账缺失 · 记录不合规',
        penalty: '处罚 10-20 万元 · 责令限期整改',
        guard: '防控：业务数据自动归档，加密云端长期留存',
      },
      {
        title: '无证人车承单运输',
        penalty: '处罚 5-50 万元 · 追究责任人',
        guard: '防控：资质到期自动冻结接单权限',
      },
      {
        title: '剧毒化学品流向未备案',
        penalty: '处罚 2-10 万元 · 构成犯罪追刑责',
        guard: '防控：流向数据自动统计，一键生成备案材料',
      },
    ],
    gains: [
      {
        tone: 'green',
        title: '降低人工成本',
        desc: '自动填报与智能派单替代大量手工操作，省下的都是净利。',
      },
      {
        tone: 'green',
        title: '提升车辆周转率',
        desc: '就近匹配与合规拼单，减少空驶与等货，一趟能多装、一天能多跑。',
      },
      {
        tone: 'orange',
        title: '优化管理决策',
        desc: '全流程数据实时可视化，瓶颈与异常一眼可见，决策有据可依而不是凭经验。',
      },
      {
        tone: 'orange',
        title: '增强客户信任',
        desc: '透明、留痕、可追溯的服务体验，客户问得住，合作自然更稳、更长久。',
      },
    ],
  },
  // 原型 10：我们的服务。图标素材自带浅橙/浅绿圆角底，直接当图片用
  service: {
    eyebrow: 'OUR SERVICE / 我们的服务',
    title: '实施、定制与运维，三类服务内容',
    desc: '面向化工与危化运输业务，提供上线实施、二次开发与日常运维三类服务，均由熟悉行业流程的实施团队负责。',
    cards: [
      {
        icon: 'implement',
        title: '专业实施服务',
        items: [
          '一对一专属顾问，提供全流程上线指导，从需求梳理到落地执行全程跟进',
          '协助历史数据清洗迁移，开展全员操作培训，降低学习成本',
          '遵循标准化实施流程，严控节点与质量，快速部署、平稳上线',
        ],
      },
      {
        icon: 'custom',
        title: '定制化开发支持',
        items: [
          '支持二次表单开发与个性化报表，贴合企业独特业务逻辑',
          '大数据看板定制开发，拒绝数据孤岛，打通业务全链路',
          '对接现有 ERP、MES 等系统，实现多平台数据互联互通',
        ],
      },
      {
        icon: 'support',
        title: '7×24 小时在线答疑',
        items: [
          '专业技术团队全天候实时响应，快速解答系统使用疑问',
          '提供远程协助、视频指导等技术支持，及时排查问题',
          '定期进行系统迭代与优化，持续修复问题、提升性能',
        ],
      },
    ],
  },
  // 原型 CTA Card：文案逐字照原型。注意电话是原型上的 400-828-1988，
  // 与 contact.phone（400-001-8355）不一致，用哪个等用户拍板
  cta: {
    title: '约一次演示，用你的单据跑一遍',
    desc: '演示会基于你所在行业的 BOM 结构和实际运输场景，从接单、排产、出入库到发运、回单逐环节走一遍，约 40 分钟。',
    button: '预约产品演示',
    phoneNote: '或致电 400-828-1988（工作日 9:00-18:00）',
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
