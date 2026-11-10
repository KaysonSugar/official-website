/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 服务支持页字段形状
 */

export interface SupportConfig {
  ctaLabel: string
  features: string[]
  timeline: {
    title: string
    badge: string
    note: string
    steps: {
      no: string
      tone: 'orange' | 'green' | 'salmon' | 'dark'
      label: string
      desc: string
    }[]
  }
  scope: {
    eyebrow: string
    title: string
    desc: string
    cards: {
      icon: 'survey' | 'init' | 'migrate' | 'training' | 'launch' | 'accept' | 'aftercare' | 'plus'
      title: string
      desc: string
    }[]
  }
  process: {
    eyebrow: string
    title: string
    desc: string
    steps: { no: string; title: string; desc: string; dark?: boolean }[]
    afterLabel: string
    afterText: string
  }
  pricing: {
    eyebrow: string
    title: string
    desc: string
    cards: {
      icon: 'remote' | 'onsite' | 'plus'
      title: string
      items: string[]
      foot: string
      warm?: boolean
    }[]
  }
  commitment: {
    eyebrow: string
    title: string
    desc: string
    cards: { icon: 'sign' | 'checklist' | 'schedule' | 'loop'; title: string; desc: string }[]
    stats: { value: string; label: string }[]
  }
}
