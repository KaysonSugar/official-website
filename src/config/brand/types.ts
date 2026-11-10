/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 品牌与全局字段形状
 */

export interface BrandInfo {
  name: string
  nameEn: string
}

export interface ContactInfo {
  phone: string
  phoneHref: string
  ctaLabel: string
}

export interface LeaveConfirmConfig {
  title: string
  cancel: string
  confirm: string
}

export interface LeadFormConfig {
  title: string
  desc: string
  interests: string[]
  labels: {
    name: string
    company: string
    phone: string
    interests: string
    note: string
  }
  placeholders: {
    name: string
    company: string
    phone: string
  }
  notePlaceholder: string
  optionalTip: string
  errors: {
    name: string
    company: string
    phone: string
    submit: string
  }
  submitLabel: string
  submittingLabel: string
  cancelLabel: string
  doneLabel: string
  closeLabel: string
  successTitle: string
  successDesc: string
  phoneTip: string
}

export interface CtaConfig {
  title: string
  desc: string
  button: string
  phoneNote: string
}

export interface FooterConfig {
  desc: string[]
  slogan: string[]
  linkGroups: {
    title: string
    items: { label: string; to: string }[]
  }[]
  copyright: string
  tagline: string
}
