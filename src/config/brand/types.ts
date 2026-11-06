/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 品牌与全局字段形状
 */

/**
 * 品牌与全局的内容形状。改字段来这里。
 *
 * 这里只声明类型，具体文案在 ./data.ts；组件不直接引本文件，统一走 @/config/site。
 */

/** 品牌信息：导航栏与页脚共用 */
export interface BrandInfo {
  /** 中文品牌名 */
  name: string
  /** 英文品牌名，导航栏中显示为小字 + 宽字距 */
  nameEn: string
}

/** 联系方式与主行动按钮（导航栏右侧） */
export interface ContactInfo {
  /** 电话号码（展示用，保留连字符便于阅读） */
  phone: string
  /** 拨号链接（tel: 协议，去掉连字符） */
  phoneHref: string
  /** 主按钮文案 */
  ctaLabel: string
  /** 主按钮跳转地址：当前直接拨号，后续接表单页或企微客服时改这里即可 */
  ctaHref: string
}

/** 页面底部的行动号召区（首页与全部内页共用同一份文案，对应原型 CTA Card） */
export interface CtaConfig {
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
export interface FooterConfig {
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
