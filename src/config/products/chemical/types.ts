/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 化工生产页字段形状
 */

/**
 * 化工生产页的内容形状。改字段来这里。
 *
 * 这里只声明类型，具体文案在 ./data.ts；组件不直接引本文件，统一走 @/config/site。
 */

/** 化工生产页 /products/chemical（原型 Product Hero + P 三条主线） */
export interface ChemicalConfig {
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
  /** 第三屏「界面展示」（原型 P 界面实录）：深绿底四行图文交替，面板 DOM 重建（位图已删） */
  tour: {
    eyebrow: string
    title: string
    desc: string
    rows: {
      /** 小标，如「01 · 仓储」 */
      label: string
      /** 面板在右（默认）还是左；原型 1右 2左 3右 4左 */
      flip?: boolean
      /** 01 仓储是「名 + 描述」两栏行；02~04 是圆点列表，二选一 */
      pairs?: { name: string; desc: string }[]
      bullets?: string[]
      /** 面板演示数据：四块面板结构不同，按 kind 可辨识联合分派 */
      panel:
        | {
            kind: 'warehouse'
            title: string
            badge: string
            meta: string[]
            tabs: { active: string; idle: string[] }
            action: string
            headers: [string, string, string, string, string]
            rows: {
              name: string
              tag: string
              tagTone: 'green' | 'orange'
              purity: string
              unit: string
              qty: string
            }[]
            footer: string
          }
        | {
            kind: 'production'
            title: string
            badges: { text: string; tone: 'green' | 'blue' }[]
            chips: { label: string; value: string }[]
            tabs: [string, ...string[]]
            headers: [string, string, string, string]
            rows: {
              name: string
              loss: string
              amount: string
              source: string
              tone: 'orange' | 'gray'
            }[]
            footer: string
          }
        | {
            kind: 'quality'
            title: string
            badge: string
            meta: string[]
            headers: [string, string, string]
            rows: { item: string; desc: string; method: string }[]
            freqLabel: string
            freqs: { text: string; active?: boolean }[]
          }
        | {
            kind: 'customer'
            title: string
            stat: string
            filters: { text: string; active?: boolean }[]
            headers: [string, string, string, string]
            rows: {
              name: string
              level: string
              levelTone: 'green' | 'orange' | 'gray'
              nature: string
              status: string
            }[]
            footer: string
          }
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
