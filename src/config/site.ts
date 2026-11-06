/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 站点内容配置
 */

/**
 * 站点内容的唯一出口。
 *
 * 文案按页面拆在同级模块文件里：brand（品牌/导航/首屏/CTA/页脚）、home（首页 11 屏）、
 * support、about、chemical、logistics、driver。这里只做拼装，不写内容。
 *
 * 组件统一从 '@/config/site' 引 siteConfig / getPage，不要直接引模块文件——
 * 整站形状（少一个模块就报红）由 types.ts 的 SiteConfig 保证。
 * 改文案去对应模块文件；改字段形状去那个模块自己的 interface。
 */

import type { PageIntro, SiteConfig } from './types'
import { brand, contact, cta, footer, navItems, pages } from './brand'
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
} from './home'
import { support } from './support'
import { about } from './about'
import { chemical } from './chemical'
import { logistics } from './logistics'
import { driver } from './driver'

/** 实际内容（当前为占位文案，上线前替换） */
export const siteConfig: SiteConfig = {
  brand,
  contact,
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
    throw new Error(`config/brand.ts 中缺少路径为 ${to} 的页面配置`)
  }
  return page
}
