/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 首页字段形状
 */

/**
 * 首页的内容形状。改字段来这里。
 *
 * 这里只声明类型，具体文案在 ./data.ts；组件不直接引本文件，统一走 @/config/site。
 */

/** 首页首屏 Hero（定稿原型 01：左文案 + 右后台看板） */
export interface HomeHero {
  /** 标题上方的法规对标胶囊 */
  badge: string
  /** 法规胶囊右侧的点击提示 */
  badgeHint: string
  /** 点法规胶囊后先弹的离开确认层说明文字（标题/按钮在全局 leaveConfirm 配置） */
  leaveTip: string
  /** 右侧看板上两张浮层卡的文字 */
  floats: {
    /** 左上合规卡；数字直接写在 title 里 */
    compliance: { title: string; desc: string }
    /** 左下在途卡；数字直接写在 title 里 */
    transit: { title: string; desc: string }
  }
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
  /** 右侧工作台演示看板：整卡 DOM 重建（workbench-body*.webp 位图已删），演示数据照截图逐字转录 */
  workbench: {
    /** 侧栏品牌名与英文副标 */
    brand: { name: string; sub: string }
    /** 侧栏菜单文字，第一项为选中态；图标是组件里按序号硬编码的装饰 SVG */
    menus: string[]
    top: { title: string; search: string; date: string }
    greet: { hello: string; sub: string; scope: string }
    /** 四张统计卡；value 主数字、unit 是「万/亿」小尾巴，tone 决定卡底与图标 tile 配色 */
    stats: {
      label: string
      value: string
      unit: string
      tone: 'orange' | 'mint' | 'gray' | 'amber'
    }[]
    trend: { title: string; tag: string }
    /** 三个库存占比圆环，percent 直接驱动 stroke-dasharray */
    donut: {
      title: string
      items: { label: string; percent: number; tone: 'orange' | 'green' | 'gray' }[]
      total: string
    }
    production: {
      title: string
      note: string
      headers: [string, string, string, string]
      rows: {
        no: string
        product: string
        qty: string
        status: string
        tone: 'orange' | 'amber' | 'green'
      }[]
    }
  }
}

/** 首页第二屏：行业背景与法规驱动（定稿原型 02，纯文字 + 四张法规卡片） */
export interface HomeIndustry {
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
export interface HomeLightweight {
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
export interface HomeArchitecture {
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
    /** 层名用暖色点出（业务层专用）：跟这层的棕卡配成一组，六层里只有业务层是暖色 */
    highlight?: boolean
    /** 普通层的文字块，块数即列数 */
    blocks?: string[]
    /** 业务层模块卡：模块名 + 括号里的能力清单 */
    modules?: { title: string; desc: string }[]
  }[]
  /** 底部提示条（绿点开头的一句长文案） */
  note: string
}

/** 流程图节点：id 对应组件里的几何坐标表，label 显示在六边形下方 */
export interface FlowNode {
  id: 'chemical' | 'shipper' | 'partner' | 'hub' | 'driver' | 'national' | 'own'
  /** 节点名（六边形下方的加粗文字） */
  label: string
  /** 六边形配色：orange 橙 / green 绿 */
  tone: 'orange' | 'green'
  /** 六边形里的白色图标，对应 assets/home/images/flow-icon-* 素材 */
  icon: 'factory' | 'fleet' | 'warehouse' | 'airlift' | 'truck'
}

/** 流程图连线：id 对应组件里的线段坐标表，label 是线上的说明文字 */
export interface FlowLink {
  id:
    | 'order'
    | 'compare'
    | 'quote'
    | 'bid'
    | 'transfer'
    | 'status'
    | 'source'
    | 'accept'
    | 'encrypt'
    | 'dispatch'
  /** 线上的说明文字；空串表示这条线不配文字（纯视觉连线） */
  label: string
  /** 文字位置：above 线上方 / below 线下方 / right 竖线右侧 */
  labelPos: 'above' | 'below' | 'right'
}

/** 流程图整体配置：文字都在这，几何坐标（节点位置 / 线段端点）在组件里 */
export interface HomeFlow {
  /** 无障碍描述（读屏用，替代原位图 alt） */
  alt: string
  /** 节点顺序 = 入场点亮顺序 */
  nodes: FlowNode[]
  /** 连线与线上文字 */
  links: FlowLink[]
}

/** 首页第五屏：三端业务运转模式（定稿原型 05，DOM 流程图 + 三张业务线卡片） */
export interface HomeMatrix {
  /** 标题上方的橙色眉题（英文 / 中文） */
  eyebrow: string
  /** 板块主标题 */
  title: string
  /** 标题下的两行说明 */
  desc: string
  /** 流程图（DOM 绘制，节点/连线/文字全配置化） */
  flow: HomeFlow
  /** 底部链接前缀，拼在卡片标题前面 */
  linkPrefix: string
  /** 底部链接结尾的箭头 */
  linkArrow: string
  /** 未上线端点击后的提示文案 */
  comingSoonLabel: string
  /** 点卡片链接后弹的外链确认层说明文字（标题/按钮在全局 leaveConfirm 配置） */
  leaveDesc: string
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
export interface HomeCapabilities {
  /** 标题上方的橙色眉题（英文 / 中文） */
  eyebrow: string
  /** 板块主标题 */
  title: string
  /** 标题下的两行说明 */
  desc: string
  /** 六张功能卡，顺序即原型从左到右、从上到下 */
  cards: {
    icon: 'order' | 'bom' | 'stock' | 'purchase' | 'process' | 'sales'
    title: string
    desc: string
  }[]
}

/** 首页第七屏：生产主流程图（定稿原型 07，纯文字流程图，零图标素材） */
export interface HomeWorkflow {
  /** 标题上方的橙色眉题（英文 / 中文） */
  eyebrow: string
  /** 板块主标题 */
  title: string
  /** 标题下的一句话说明 */
  desc: string
  /** 顶部主流程节点，arrow 表示节点右侧跟一个 → 箭头；plain 是白底绿边节点 */
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

// 原型 08：运输协同。环形闭环图用 DOM + SVG 重绘（原来是一张 2480 宽的整图，
// 正文只有 10px，1x 屏必糊）。坐标全部是相对 2480×1195 设计画布的百分比，
// 量自设计图；卡片尺寸由文字内容撑开，只锁 min-width，改文案不用动坐标
export interface HomeCollab {
  /** 标题上方的橙色眉题（英文 / 中文） */
  eyebrow: string
  /** 板块主标题 */
  title: string
  /** 标题下的两行说明 */
  desc: string
  /** 中心圆的三行字：主标题 / 副标（· 分隔）/ 绿色补充句 */
  center: { title: string; sub: string; note: string }
  /** 环上四个节点卡，x/y 是卡片中心在画布里的百分比坐标 */
  nodes: {
    name: string
    sub: string
    /** light=白卡（化工企业 / 司机）、orange=橙卡、green=绿卡 */
    tone: 'light' | 'orange' | 'green'
    x: number
    y: number
  }[]
  /** 环上四个流向标签，跟着箭头走 */
  flows: { text: string; x: number; y: number }[]
  /** 左右两列说明：左绿右橙，圆点颜色跟 tone 走 */
  asides: {
    title: string
    tone: 'green' | 'orange'
    items: { title: string; desc: string }[]
  }[]
}

/** 首页第九屏：全链路一体化优势（定稿原型 08-S8，暗色三行对照表 + 三张支撑卡，无图标） */
export interface HomeAdvantage {
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
export interface HomeCostEfficiency {
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
export interface HomeService {
  /** 标题上方的橙色眉题（英文 / 中文） */
  eyebrow: string
  /** 板块主标题 */
  title: string
  /** 标题下的一行说明 */
  desc: string
  /** 服务卡：icon 对应 icons 目录的短名，items 为小圆点列表 */
  cards: { icon: 'implement' | 'custom' | 'support'; title: string; items: string[] }[]
}
