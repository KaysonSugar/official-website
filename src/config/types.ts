/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 站点内容类型定义
 */

import type {
  BrandInfo,
  ContactInfo,
  CtaConfig,
  FooterConfig,
  LeaveConfirmConfig,
  LeadFormConfig,
} from './brand/types'
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

export interface NavChild {
  label: string
  desc?: string
  to: string
}

export interface NavItem {
  label: string
  to: string
  children?: NavChild[]
}

export interface PageIntro {
  to: string
  label: string
  eyebrow: string
  title: string
  desc: string
  align: 'left' | 'center'
}

export interface SiteConfig {
  brand: BrandInfo
  contact: ContactInfo
  leaveConfirm: LeaveConfirmConfig
  leadForm: LeadFormConfig
  navItems: NavItem[]
  pages: PageIntro[]
  hero: HomeHero
  industry: HomeIndustry
  lightweight: HomeLightweight
  architecture: HomeArchitecture
  matrix: HomeMatrix
  capabilities: HomeCapabilities
  workflow: HomeWorkflow
  collab: HomeCollab
  advantage: HomeAdvantage
  costEfficiency: HomeCostEfficiency
  service: HomeService
  support: SupportConfig
  about: AboutConfig
  chemical: ChemicalConfig
  logistics: LogisticsConfig
  driver: DriverConfig
  cta: CtaConfig
  footer: FooterConfig
}
