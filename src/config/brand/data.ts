/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 品牌与全局内容数据
 */

import type {
  BrandInfo,
  ContactInfo,
  CtaConfig,
  FooterConfig,
  LeaveConfirmConfig,
  LeadFormConfig,
} from './types'
import type { NavChild, NavItem, PageIntro } from '../types'

export const brand: BrandInfo = {
  name: '威易达化工',
  nameEn: 'WEIYIDA HUAGONG',
}

export const contact: ContactInfo = {
  phone: '400-001-8355',
  phoneHref: 'tel:4000018355',
  ctaLabel: '预约演示',
}

export const leaveConfirm: LeaveConfirmConfig = {
  title: '即将前往外部网站',
  cancel: '取消',
  confirm: '继续访问',
}

export const leadForm: LeadFormConfig = {
  title: '预约产品演示',
  desc: '留下联系方式，顾问将在 3 个工作日内与您联系。',
  labels: {
    name: '姓名',
    company: '公司',
    region: '地区',
    phone: '手机号',
    note: '需求备注',
  },
  placeholders: {
    name: '您的称呼',
    company: '公司全称',
    region: '如：江苏 苏州',
    phone: '便于顾问与您联系',
  },
  notePlaceholder: '简单描述您的场景或想看的模块',
  optionalTip: '（选填）',
  errors: {
    name: '请填写联系人姓名',
    phone: '请填写 11 位手机号',
    submit: '提交失败，请稍后重试',
  },
  submitLabel: '提交预约',
  submittingLabel: '提交中…',
  cancelLabel: '取消',
  doneLabel: '完成',
  closeLabel: '关闭',
  successTitle: '提交成功',
  successDesc: '我们已收到您的预约，顾问会尽快与您联系。',
  phoneTip: '或直接致电',
}

const productLines: NavChild[] = [
  { label: '化工生产', desc: '生产与经营管理', to: '/products/chemical' },
  { label: '物流调度', desc: '调度与合规', to: '/products/logistics' },
  { label: '司机作业', desc: '接单与作业', to: '/products/driver' },
]

export const navItems: NavItem[] = [
  { label: '首页', to: '/' },
  { label: '产品矩阵', to: '/products', children: productLines },
  { label: '服务支持', to: '/solutions' },
  { label: '关于我们', to: '/about' },
]

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

export const cta: CtaConfig = {
  title: '约一次演示，用你的单据跑一遍',
  desc: '演示会基于你所在行业的 BOM 结构和实际运输场景，从接单、排产、出入库到发运、回单逐环节走一遍，约 40 分钟。',
  button: '预约产品演示',
  phoneNote: '或致电 400-828-1988（工作日 9:00-18:00）',
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

        { label: '联系我们', to: 'tel:4000018355' },
      ],
    },
  ],
  copyright: '2026 苏州翔瑞成信息科技有限公司　版权所有',
  tagline: '威易达化工 · 化工生产与危化运输一体化平台',
}
