/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 首页字段形状
 */

export interface HomeHero {
  badge: string
  badgeHint: string
  leaveTip: string
  floats: {
    compliance: { title: string; desc: string }
    transit: { title: string; desc: string }
  }
  title: string
  titleAccent: string
  desc: string
  primaryCta: string
  features: string[]
  stats: { value: string; label: string; noCount?: boolean }[]
  workbench: {
    brand: { name: string; sub: string }
    menus: string[]
    top: { title: string; search: string; date: string }
    greet: { hello: string; sub: string; scope: string }
    stats: {
      label: string
      value: string
      unit: string
      tone: 'orange' | 'mint' | 'gray' | 'amber'
    }[]
    trend: { title: string; tag: string }
    donut: {
      title: string
      items: { label: string; percent: number; tone: 'orange' | 'green' | 'gray' }[]
      total: string
    }
    production: {
      title: string
      note: string
      headers: [string, string, string, string]
      rows: {
        no: string
        product: string
        qty: string
        status: string
        tone: 'orange' | 'amber' | 'green'
      }[]
    }
  }
}

export interface HomeIndustry {
  eyebrow: string
  title: string
  desc: string
  cards: { icon: 'shield' | 'chip' | 'ban' | 'pin'; label: string; title: string; desc: string }[]
  note: string
}

export interface HomeLightweight {
  eyebrow: string
  title: string
  desc: string
  tags: { icon: 'tag-erp' | 'tag-invest' | 'tag-speed' | 'tag-launch'; text: string }[]
  pain: {
    title: string
    cards: {
      icon: 'pain-price' | 'pain-staff' | 'pain-compliance'
      no: string
      title: string
      desc: string
    }[]
  }
  groups: {
    title: string
    cols: 4 | 2
    cards: {
      icon: string
      title: string
      desc: string
    }[]
  }[]
  notes: string[]
}

export interface HomeArchitecture {
  eyebrow: string
  title: string
  desc: string
  layers: {
    label: string
    highlight?: boolean
    blocks?: string[]
    modules?: { title: string; desc: string }[]
  }[]
  note: string
}

export interface FlowNode {
  id: 'chemical' | 'shipper' | 'partner' | 'hub' | 'driver' | 'national' | 'own'
  label: string
  tone: 'orange' | 'green'
  icon: 'factory' | 'fleet' | 'warehouse' | 'airlift' | 'truck'
}

export interface FlowLink {
  id:
    | 'order'
    | 'compare'
    | 'quote'
    | 'bid'
    | 'transfer'
    | 'status'
    | 'source'
    | 'accept'
    | 'encrypt'
    | 'dispatch'
  label: string
  labelPos: 'above' | 'below' | 'right'
}

export interface HomeFlow {
  alt: string
  nodes: FlowNode[]
  links: FlowLink[]
}

export interface HomeMatrix {
  eyebrow: string
  title: string
  desc: string
  flow: HomeFlow
  linkPrefix: string
  linkArrow: string
  cards: {
    icon: 'chemical' | 'logistics' | 'driver'
    tone: 'orange' | 'green'
    label: string
    title: string
    desc: string
    tags: string[]
    to: string
  }[]
}

export interface HomeCapabilities {
  eyebrow: string
  title: string
  desc: string
  cards: {
    icon: 'order' | 'bom' | 'stock' | 'purchase' | 'process' | 'sales'
    title: string
    desc: string
  }[]
}

export interface HomeWorkflow {
  eyebrow: string
  title: string
  desc: string
  topNodes: { text: string; tone: 'orange' | 'green' | 'plain'; arrow: boolean }[]
  judge: string
  branches: {
    head: string
    tone: 'orange' | 'green'
    steps: string[]
    tail: { text: string; tone: 'tinted' | 'solid' }
  }[]
  note: string
}

export interface HomeCollab {
  eyebrow: string
  title: string
  desc: string
  center: { title: string; sub: string; note: string }
  nodes: {
    name: string
    sub: string
    tone: 'light' | 'orange' | 'green'
    x: number
    y: number
  }[]
  flows: { text: string; x: number; y: number }[]
  asides: {
    title: string
    tone: 'green' | 'orange'
    items: { title: string; desc: string }[]
  }[]
}

export interface HomeAdvantage {
  eyebrow: string
  title: string
  tableHead: { party: string; pain: string; solution: string }
  rows: {
    name: string
    pains: { title: string; desc: string }[]
    solutions: { title: string; desc: string }[]
  }[]
  supportsTitle: string
  supports: { no: string; tone: 'orange' | 'green'; title: string; desc: string }[]
  noteTag: string
  note: string
}

export interface HomeCostEfficiency {
  eyebrow: string
  title: string
  desc: string
  risks: { title: string; penalty: string; guard: string }[]
  gains: { tone: 'orange' | 'green'; title: string; desc: string }[]
}

export interface HomeService {
  eyebrow: string
  title: string
  desc: string
  cards: { icon: 'implement' | 'custom' | 'support'; title: string; items: string[] }[]
}
