/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 站点内容类型定义
 */

import type { BrandInfo, ContactInfo, CtaConfig, FooterConfig, LeadFormConfig } from './brand/types'
import type {
  HomeAdvantage,
  HomeArchitecture,
  HomeCapabilities,
  HomeCollab,
  HomeCostEfficiency,
  HomeHero,
  HomeIndustry,
  HomeLightweight,
  HomeMatrix,
  HomeService,
  HomeWorkflow,
} from './home/types'
import type { SupportConfig } from './support/types'
import type { AboutConfig } from './about/types'
import type { ChemicalConfig } from './products/chemical/types'
import type { LogisticsConfig } from './products/logistics/types'
import type { DriverConfig } from './products/driver/types'

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
  /** 页面主标题 */
  title: string
  /** 标题下的一句话说明 */
  desc: string
  /** 文字对齐：left 左对齐 */
  align: 'left' | 'center'
}

/**
 * 站点整体配置
 */
export interface SiteConfig {
  /** 品牌信息：导航栏与页脚共用 */
  brand: BrandInfo
  /** 联系方式与主行动按钮 */
  contact: ContactInfo
  /** 预约演示表单弹层的文案与选项 */
  leadForm: LeadFormConfig
  /** 顶部导航：数组顺序即展示顺序 */
  navItems: NavItem[]
  /** 各页面首屏文案 */
  pages: PageIntro[]
  /** 首页首屏 Hero */
  hero: HomeHero
  /** 首页第二屏：行业背景与法规驱动 */
  industry: HomeIndustry
  /** 首页第三屏：轻量化平台 */
  lightweight: HomeLightweight
  /** 首页第四屏：平台功能结构 */
  architecture: HomeArchitecture
  /** 首页第五屏：三端业务运转模式 */
  matrix: HomeMatrix
  /** 首页第六屏：核心功能详解 */
  capabilities: HomeCapabilities
  /** 首页第七屏：生产主流程图 */
  workflow: HomeWorkflow
  /** 首页第八屏：运输协同 */
  collab: HomeCollab
  /** 首页第九屏：全链路一体化优势 */
  advantage: HomeAdvantage
  /** 首页第十屏：降本增效 */
  costEfficiency: HomeCostEfficiency
  /** 首页第十一屏：我们的服务 */
  service: HomeService
  /** 服务支持页 /solutions */
  support: SupportConfig
  /** 关于我们页 /about */
  about: AboutConfig
  /** 化工生产页 /products/chemical */
  chemical: ChemicalConfig
  /** 物流调度页 /products/logistics */
  logistics: LogisticsConfig
  /** 司机作业页 /products/driver */
  driver: DriverConfig
  /** 页面底部的行动号召区 */
  cta: CtaConfig
  /** 页脚 */
  footer: FooterConfig
}
