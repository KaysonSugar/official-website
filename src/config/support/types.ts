/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 服务支持页字段形状
 */

/**
 * 服务支持页的内容形状。改字段来这里。
 *
 * 这里只声明类型，具体文案在 ./data.ts；组件不直接引本文件，统一走 @/config/site。
 */

/** 服务支持页（原型 Service Hero + S1）：首屏胶囊与按钮、项目节奏卡、八项交付内容 */
export interface SupportConfig {
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
    steps: {
      no: string
      tone: 'orange' | 'green' | 'salmon' | 'dark'
      label: string
      desc: string
    }[]
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
