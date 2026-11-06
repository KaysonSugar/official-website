/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 站点内容类型定义
 */

/**
 * config 的类型总装。
 *
 * 这里只放两样东西：跨模块共用的导航 / 首屏类型（NavChild / NavItem / PageIntro），
 * 以及把 7 个模块文件的区块类型拼成的整站 SiteConfig。
 * 各区块自己的字段形状跟数据放在一起（brand.ts / home.ts / support.ts 等），
 * 改某个区块的字段就去那个模块文件，不用在这找。
 *
 * 这里和各模块是双向引用的（模块要用 NavItem 等共享类型，这里要用各模块的区块类型），
 * 全部是 `import type`，编译后整句擦除，打包产物里不存在循环依赖。
 */

import type { BrandInfo, ContactInfo, CtaConfig, FooterConfig } from './brand'
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
} from './home'
import type { SupportConfig } from './support'
import type { AboutConfig } from './about'
import type { ChemicalConfig } from './chemical'
import type { LogisticsConfig } from './logistics'
import type { DriverConfig } from './driver'

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

/**
 * 站点整体配置
 *
 * 键的顺序与 site.ts 的拼装顺序一致。每个字段的类型来自对应模块文件，
 * 少写一个键、多写一个键都会在 typecheck 时报红。
 */
export interface SiteConfig {
  /** 品牌信息：导航栏与页脚共用 */
  brand: BrandInfo
  /** 联系方式与主行动按钮（导航栏右侧） */
  contact: ContactInfo
  /** 顶部导航：数组顺序即展示顺序 */
  navItems: NavItem[]
  /** 各页面首屏文案（首页除外，首页文案在 hero 里） */
  pages: PageIntro[]
  /** 首页首屏 Hero（定稿原型 01：左文案 + 右后台看板） */
  hero: HomeHero
  /** 首页第二屏：行业背景与法规驱动（定稿原型 02） */
  industry: HomeIndustry
  /** 首页第三屏：轻量化平台（定稿原型 03） */
  lightweight: HomeLightweight
  /** 首页第四屏：平台功能结构（定稿原型 04，暗色分层架构图） */
  architecture: HomeArchitecture
  /** 首页第五屏：三端业务运转模式（定稿原型 05） */
  matrix: HomeMatrix
  /** 首页第六屏：核心功能详解（定稿原型 06） */
  capabilities: HomeCapabilities
  /** 首页第七屏：生产主流程图（定稿原型 07） */
  workflow: HomeWorkflow
  /** 首页第八屏：运输协同（原型 08，环形图里带字） */
  collab: HomeCollab
  /** 首页第九屏：全链路一体化优势（原型 08-S8） */
  advantage: HomeAdvantage
  /** 首页第十屏：降本增效（原型 09） */
  costEfficiency: HomeCostEfficiency
  /** 首页第十一屏：我们的服务（原型 10） */
  service: HomeService
  /** 服务支持页 /solutions（原型 Service Hero + S1~S4） */
  support: SupportConfig
  /** 关于我们页 /about（原型 About Hero + S1~S3） */
  about: AboutConfig
  /** 化工生产页 /products/chemical（原型 Product Hero + P 三条主线） */
  chemical: ChemicalConfig
  /** 物流调度页 /products/logistics（原型 Logistics Hero + B 免费货源广场） */
  logistics: LogisticsConfig
  /** 司机作业页 /products/driver（原型 Driver Hero + B~F 五屏） */
  driver: DriverConfig
  /** 页面底部的行动号召区（首页与全部内页共用，对应原型 CTA Card） */
  cta: CtaConfig
  /** 页脚（对应原型底部的深色收尾区，1440 画板下高 343） */
  footer: FooterConfig
}
