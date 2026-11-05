/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 站点内容类型定义
 */

/**
 * site.ts 的类型侧。数据长什么样全在这定义，字段写错 typecheck 直接报红；
 * 具体文案改 site.ts，别在这找内容。
 * 导航 / 页面首屏 / 首页各屏 / 服务支持 / CTA / 页脚，一个区块一个字段。
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
  /** 服务支持页（原型 Service Hero + S1）：首屏胶囊与按钮、项目节奏卡、八项交付内容 */
  support: {
    /** 首屏按钮文案（原型「预约实施评估」，和全站默认的「预约产品演示」不是一个词） */
    ctaLabel: string
    /** 首屏按钮下的四个服务方式胶囊 */
    features: string[]
    /** 首屏右侧「典型项目节奏」白卡 */
    timeline: {
      /** 卡片标题 */
      title: string
      /** 右上角的工期徽标 */
      badge: string
      /** 分隔线下的说明小字 */
      note: string
      /** 四行步骤；tone 决定序号块配色（1 橙 / 2 绿 / 3 橘红，均为浅底彩字；4 深绿底白字） */
      steps: { no: string; tone: 'orange' | 'green' | 'salmon' | 'dark'; label: string; desc: string }[]
    }
    /** 第二屏「服务内容」：八张交付内容卡，icon 对应 assets/support/icons 的短名 */
    scope: {
      /** 标题上方的橙色眉题（英文 / 中文） */
      eyebrow: string
      /** 板块主标题 */
      title: string
      /** 标题下的一行说明 */
      desc: string
      cards: {
        icon: 'survey' | 'init' | 'migrate' | 'training' | 'launch' | 'accept' | 'aftercare' | 'plus'
        title: string
        desc: string
      }[]
    }
    /** 第三屏「实施流程」：七个节点上下交错挂在一条渐变轴上（原型 S2） */
    process: {
      /** 眉题（这一屏是绿色，不是全站默认的橙） */
      eyebrow: string
      /** 板块主标题 */
      title: string
      /** 标题下的一行说明 */
      desc: string
      /** 七个节点，顺序即轴上 01-07；dark 的节点（07）用深绿卡，其余白卡 */
      steps: { no: string; title: string; desc: string; dark?: boolean }[]
      /** 轴末端右下角的补充盒 */
      afterLabel: string
      afterText: string
    }
    /** 第四屏「实施方式与计费」：三张卡（原型 S3），icon 对应 assets/support/icons 的短名 */
    pricing: {
      eyebrow: string
      title: string
      desc: string
      cards: {
        icon: 'remote' | 'onsite' | 'plus'
        title: string
        items: string[]
        /** 卡片底部的适用范围 / 报价说明小字 */
        foot: string
        /** 暖橙卡（线下上门那张）：浅橙底、暖棕文字，无边框 */
        warm?: boolean
      }[]
    }
    /** 第五屏「服务承诺」：深绿底四张交付准则卡 + 底部一行四个硬指标（原型 S4） */
    commitment: {
      /** 眉题（绿色，同上一屏） */
      eyebrow: string
      title: string
      desc: string
      /** 四张准则卡；loop（闭环售后）的循环箭头是组件里内联 SVG 画的，其余走 PNG */
      cards: { icon: 'sign' | 'checklist' | 'schedule' | 'loop'; title: string; desc: string }[]
      /** 分隔线下的一行硬指标，直接渲染终值不递增（7×24 这类递增会闪中间值） */
      stats: { value: string; label: string }[]
    }
  }
  /** 关于我们页（原型 About Hero + S1~S3）：首屏插画背景、简介、企业理念、公司使命 */
  about: {
    /** 第二屏「简介」与第四屏「公司使命」同构：橙眉题 + 黑标题 + 若干段落，共用一个组件 */
    intro: { eyebrow: string; title: string; paras: string[] }
    mission: { eyebrow: string; title: string; paras: string[] }
    /** 第三屏「企业理念」：四个圆底图标横排 */
    philosophy: {
      eyebrow: string
      title: string
      items: { icon: 'innovation' | 'persist' | 'execute' | 'excel'; label: string }[]
    }
  }
  /** 化工生产页 /products/chemical（原型 Product Hero + P 三条主线） */
  chemical: {
    /** 首屏按钮文案（原型「立即体验」） */
    ctaLabel: string
    /** 第一屏右侧「资金流水」演示卡：五张统计小卡 + 页签 + 四行台账 + 合计行 */
    heroCard: {
      title: string
      badge: string
      stats: { label: string; value: string; active?: boolean }[]
      tabs: string[]
      columns: string[]
      rows: { name: string; contract: string; amount: string; date: string }[]
      totalLabel: string
      totalValue: string
    }
    /** 第二屏「三条主线」：左侧三张链路卡 + 右侧订单驱动流程面板 */
    chains: {
      eyebrow: string
      title: string
      cards: {
        no: string
        icon: 'production' | 'material' | 'finance'
        title: string
        desc: string
        /** 链路行的步骤文字，组件里用 → 连接 */
        steps: string[]
        /** 配色：orange 浅橙卡 / green 浅绿卡 / plain 白卡带边框，编号标题箭头跟着 tone 走 */
        tone: 'orange' | 'green' | 'plain'
      }[]
      flow: {
        label: string
        /** 主链节点；note 是箭头旁边的小字说明 */
        main: { text: string; tone: 'orange' | 'green'; note?: string }[]
        /** 菱形判断节点 */
        decision: string
        branchLeft: { label: string; nodes: { text: string; note?: string }[] }
        branchRight: { label: string; nodes: string[] }
        /** 左支末节点回流到右支首节点的说明（虚线连接） */
        mergeNote?: string
      }
    }
    /** 第三屏「界面展示」（原型 P 界面实录）：深绿底四行图文交替，图是系统真实界面截图 */
    tour: {
      eyebrow: string
      title: string
      desc: string
      rows: {
        /** 图对应 assets/products/chemical/images 的短名 */
        image: 'warehouse' | 'production' | 'quality' | 'customer'
        /** 小标，如「01 · 仓储」 */
        label: string
        /** 截图宽/高比（CSS aspect-ratio 同款），用来在图片加载前占好位，避免撑动页面 */
        ratio: number
        /** 图在右（默认）还是图在左；原型 1右 2左 3右 4左 */
        flip?: boolean
        /** 01 仓储是「名 + 描述」两栏行；02~04 是圆点列表，二选一 */
        pairs?: { name: string; desc: string }[]
        bullets?: string[]
      }[]
    }
    /** 第四屏「报表中心」（原型 P 报表中心）：浅绿底四张报表维度卡 */
    report: {
      eyebrow: string
      title: string
      desc: string
      cards: {
        icon: 'material' | 'finance' | 'purchase' | 'production'
        title: string
        /** 标题与对勾跟 tone 走色：green 绿 / orange 橙（原型资金、采购两张是橙勾） */
        tone: 'green' | 'orange'
        items: string[]
      }[]
    }
  }
  /** 物流调度页 /products/logistics（原型 Logistics Hero + B 免费货源广场） */
  logistics: {
    /** 首屏按钮文案（原型「预约调度演示」，绿色按钮） */
    ctaLabel: string
    /** 第一屏右侧调度台演示卡：整卡 DOM 重建（Dispatch Mock.png 是烘焙文字位图，已删） */
    heroDash: {
      /** 侧栏品牌名与副标 */
      brand: string
      brandSub: string
      /** 侧栏菜单，第一项渲染为白底选中态；vip 的项挂橙色 VIP 徽标 */
      menus: { label: string; vip?: boolean }[]
      /** 顶栏右侧的「下载中心 + 日期」文字 */
      topbarRight: string
      /** 欢迎卡：用户名与问候语 */
      welcome: { name: string; hello: string }
      /** 合作运单卡：四个统计 */
      coop: { title: string; stats: { label: string; value: string }[] }
      /** 非合作运单卡：三个统计 */
      nonCoop: { title: string; stats: { label: string; value: string }[] }
      /** 待办卡：计数徽标 + 两条待办 */
      todo: {
        badges: { label: string; count: string; tone: 'green' | 'orange' | 'gray' }[]
        rows: { no: string; route: string; badge: string; tone: 'orange' | 'green' }[]
      }
      /** 今日货源简讯卡：右侧「更多 →」组件里写死 */
      brief: { title: string; rows: { route: string; meta: string }[] }
    }
    /** 第二屏「免费货源广场」（原型 B 免费货源广场）：表格卡 DOM 重建（Cargo Card.png 已删） */
    cargo: {
      /** 眉题（绿色） */
      eyebrow: string
      /** 大标题三段：title 黑 + accent 橙（原型橙的是 5,000+）+ tail 黑 */
      title: string
      titleAccent: string
      titleTail: string
      desc: string
      /** 四个统计；tone 决定数字颜色（原型前三个绿、0 元橙） */
      stats: { value: string; label: string; tone: 'green' | 'orange' }[]
      /** 统计行右侧的注释短句，组件里用 · 连接 */
      notes: string[]
      card: {
        title: string
        /** 标题旁的两枚徽标（免费查看绿 / 每日更新橙） */
        badges: { label: string; tone: 'green' | 'orange' }[]
        /** 右上角「数据更新于 … · 当前 … 条」 */
        updated: string
        count: string
        /** 筛选行：label + 输入框占位文字 */
        filters: { label: string; placeholder: string }[]
        columns: string[]
        rows: {
          route: string
          cls: string
          truck: string
          weight: string
          time: string
          contact: string
          phone: string
        }[]
        /** 卡片底部左侧合计说明 */
        foot: string
        /** 右下角「查看全部货源 →」链接文字 */
        more: string
      }
    }
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
