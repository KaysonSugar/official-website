/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 站点全局配置
 */

/**
 * 全站共用的内容：品牌、联系方式、顶部导航、各页首屏文案、CTA 横幅与页脚。
 * 类型定义就在各区块上方；组装出口在 site.ts，组件统一从 '@/config/site' 拿数据，不要直接引本文件。
 */

import type { NavChild, NavItem, PageIntro } from './types'

/** 品牌信息：导航栏与页脚共用 */
export interface BrandInfo {
  /** 中文品牌名 */
  name: string
  /** 英文品牌名，导航栏中显示为小字 + 宽字距 */
  nameEn: string
}

export const brand: BrandInfo = {
  name: '威易达化工',
  nameEn: 'WEIYIDA HUAGONG',
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

export const contact: ContactInfo = {
  phone: '400-001-8355',
  phoneHref: 'tel:4000018355',
  ctaLabel: '预约演示',
  ctaHref: 'tel:4000018355',
}

/** 产品矩阵下挂的三条业务线（与导航下拉同源，改这里两处一起变） */
const productLines: NavChild[] = [
  { label: '化工生产', desc: '生产与经营管理', to: '/products/chemical' },
  { label: '物流调度', desc: '调度与合规', to: '/products/logistics' },
  { label: '司机作业', desc: '接单与作业', to: '/products/driver' },
]

// 一级导航四项（对应定稿原型 01 首页顶栏）；「产品矩阵」带下拉，
// 化工 / 物流 / 司机是它的二级项，不是一级导航。
// 「平台架构」不在导航里了，页面保留（页脚与首页次按钮还链过去）
export const navItems: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '产品矩阵', to: '/products', children: productLines },
  { label: '服务支持', to: '/solutions' },
  { label: '关于我们', to: '/about' },
]

/**
 * 各页面首屏文案
 *
 * 有原型画板的直接用画板标题（威易达化工：生产与经营管理 / 威易达物流：调度与合规 /
 * 威易达司机：接单与作业 / 服务支持）；
 * 平台架构、产品矩阵、关于我们三页的原型尚未提供，标题与描述为占位，上线前替换。
 */
export const pages: PageIntro[] = [
  {
    to: '/platform',
    label: '平台架构',
    eyebrow: '平台能力',
    title: '平台架构',
    desc: '一套统一底座 + 模块化业务能力，让化工、物流、司机三条业务线共用同一份数据。',
    align: 'left',
  },
  {
    to: '/products/chemical',
    label: '化工生产',
    eyebrow: '产品 / 威易达化工',
    title: '威易达化工',
    desc: '轻量级管理平台，覆盖业务：销售、采购、仓储、合同、资金、生产 BOM、质检环与报表分析八个模块，订单、库存、合同与资金使用同一套数据。',
    align: 'left',
  },
  {
    to: '/products/logistics',
    label: '物流调度',
    eyebrow: '产品 / 威易达物流',
    title: '威易达物流',
    desc: '覆盖资质核验、订单派车、线路规划、在途监控与台账导出五项功能。调度员的日常工作从打电话改为在系统里派单。',
    align: 'left',
  },
  {
    to: '/products/driver',
    label: '司机作业',
    eyebrow: '产品 / 威易达司机',
    title: '威易达司机',
    desc: '司机端提供货源查看、一键接单、电子回单与禁配提示四大主要功能，减少电话沟通环节。',
    align: 'left',
  },
  {
    to: '/solutions',
    label: '服务支持',
    eyebrow: 'SERVICE / 实施与服务',
    title: '标准化的服务流程',
    desc: '订阅版包含基础实施与售后运维。从需求调研、系统配置、数据迁移到操作培训、试运行与验收，每个环节都有明确的交付物与确认动作，实施范围在合同附件中逐项列明。',
    align: 'left',
  },
  {
    to: '/about',
    label: '关于我们',
    eyebrow: 'ABOUT US / 关于我们',
    title: '同心图治，坚持创新，追求卓越',
    desc: '苏州翔瑞成信息技术有限公司',
    align: 'left',
  },
]

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

// 原型 CTA Card：文案逐字照原型。注意电话是原型上的 400-828-1988，
// 与 contact.phone（400-001-8355）不一致，用哪个等用户拍板
export const cta: CtaConfig = {
  title: '约一次演示，用你的单据跑一遍',
  desc: '演示会基于你所在行业的 BOM 结构和实际运输场景，从接单、排产、出入库到发运、回单逐环节走一遍，约 40 分钟。',
  button: '预约产品演示',
  phoneNote: '或致电 400-828-1988（工作日 9:00-18:00）',
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

export const footer: FooterConfig = {
  desc: ['化工生产 + 危化运输一体化平台。全链路数字化、全流程规范化、全方位安全化。'],
  slogan: ['市场为源', '客户为心', '应需而创', '携手同行'],
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
  copyright: '2026 苏州翔瑞成信息科技有限公司　版权所有',
  tagline: '威易达化工 · 化工生产与危化运输一体化平台',
}
