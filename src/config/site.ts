/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 站点内容配置
 *   brand/                品牌、联系方式、导航、各页首屏文案、CTA、页脚
 *   home/                 首页 11 屏
 *   support/              服务支持
 *   about/                关于我们
 *   products/chemical/    产品线 - 化工生产
 *   products/logistics/   产品线 - 物流调度
 *   products/driver/      产品线 - 司机作业
 */

import type { PageIntro, SiteConfig } from './types'
import { brand, contact, cta, footer, leaveConfirm, leadForm, navItems, pages } from './brand/data'
import {
  advantage,
  architecture,
  capabilities,
  collab,
  costEfficiency,
  hero,
  industry,
  lightweight,
  matrix,
  service,
  workflow,
} from './home/data'
import { support } from './support/data'
import { about } from './about/data'
import { chemical } from './products/chemical/data'
import { logistics } from './products/logistics/data'
import { driver } from './products/driver/data'

/** 实际内容 */
export const siteConfig: SiteConfig = {
  brand,
  contact,
  leaveConfirm,
  leadForm,
  navItems,
  pages,
  hero,
  industry,
  lightweight,
  architecture,
  matrix,
  capabilities,
  workflow,
  collab,
  advantage,
  costEfficiency,
  service,
  support,
  about,
  chemical,
  logistics,
  driver,
  cta,
  footer,
}

/**
 * 按路由路径取页面首屏配置
 *
 * 各 View 用它拿文案，写错路径会在开发时立刻抛错，而不是渲染出一片空白。
 */
export function getPage(to: string): PageIntro {
  const page = siteConfig.pages.find((item) => item.to === to)
  if (!page) {
    throw new Error(`config/brand/data.ts 中缺少路径为 ${to} 的页面配置`)
  }
  return page
}
