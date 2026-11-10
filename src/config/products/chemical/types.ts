/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 化工生产页字段形状
 */

export interface ChemicalConfig {
  ctaLabel: string
  heroCard: {
    title: string
    badge: string
    stats: { label: string; value: string; active?: boolean }[]
    tabs: string[]
    columns: string[]
    rows: { name: string; contract: string; amount: string; date: string }[]
    totalLabel: string
    totalValue: string
  }
  chains: {
    eyebrow: string
    title: string
    cards: {
      no: string
      icon: 'production' | 'material' | 'finance'
      title: string
      desc: string
      steps: string[]
      tone: 'orange' | 'green' | 'plain'
    }[]
    flow: {
      label: string
      main: { text: string; tone: 'orange' | 'green'; note?: string }[]
      decision: string
      branchLeft: { label: string; nodes: { text: string; note?: string }[] }
      branchRight: { label: string; nodes: string[] }
      mergeNote?: string
    }
  }
  tour: {
    eyebrow: string
    title: string
    desc: string
    rows: {
      label: string
      flip?: boolean
      pairs?: { name: string; desc: string }[]
      bullets?: string[]
      panel:
        | {
            kind: 'warehouse'
            title: string
            badge: string
            meta: string[]
            tabs: { active: string; idle: string[] }
            action: string
            headers: [string, string, string, string, string]
            rows: {
              name: string
              tag: string
              tagTone: 'green' | 'orange'
              purity: string
              unit: string
              qty: string
            }[]
            footer: string
          }
        | {
            kind: 'production'
            title: string
            badges: { text: string; tone: 'green' | 'blue' }[]
            chips: { label: string; value: string }[]
            tabs: [string, ...string[]]
            headers: [string, string, string, string]
            rows: {
              name: string
              loss: string
              amount: string
              source: string
              tone: 'orange' | 'gray'
            }[]
            footer: string
          }
        | {
            kind: 'quality'
            title: string
            badge: string
            meta: string[]
            headers: [string, string, string]
            rows: { item: string; desc: string; method: string }[]
            freqLabel: string
            freqs: { text: string; active?: boolean }[]
          }
        | {
            kind: 'customer'
            title: string
            stat: string
            filters: { text: string; active?: boolean }[]
            headers: [string, string, string, string]
            rows: {
              name: string
              level: string
              levelTone: 'green' | 'orange' | 'gray'
              nature: string
              status: string
            }[]
            footer: string
          }
    }[]
  }
  report: {
    eyebrow: string
    title: string
    desc: string
    cards: {
      icon: 'material' | 'finance' | 'purchase' | 'production'
      title: string
      tone: 'green' | 'orange'
      items: string[]
    }[]
  }
}
