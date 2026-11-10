/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 司机作业页字段形状
 */

export interface DriverConfig {
  ctaLabel: string
  hero: {
    pills: string[]
    phone: {
      statusLeft: string
      statusRight: string
      title: string
      orders: { from: string; to: string; price: string; meta: string; tone: 'orange' | 'green' }[]
      acceptLabel: string
      income: { label: string; value: string; delta: string }
      notice: string
      tabs: string[]
    }
    chips: { label: string; dot: 'orange' | 'green'; pos: 'top' | 'left' | 'bottom' }[]
  }
  advantage: {
    eyebrow: string
    items: {
      icon: 'source-direct' | 'roundtrip' | 'safer' | 'earn-more'
      title: string
      desc: string
    }[]
  }
  workflow: {
    eyebrow: string
    title: string
    desc: string
    steps: { no: string; title: string; body: string; tone: 'orange' | 'plain' | 'green' }[]
    banner: { title: string; desc: string }[]
  }
  screens: {
    eyebrow: string
    title: string
    desc: string
    items: { no: string; label: string; img: 'workbench' | 'market' | 'load' | 'route' }[]
  }
  recruit: {
    eyebrow: string
    title: string
    desc: string
    stats: { value: string; label: string }[]
    qr: { title: string; desc: string }
  }
}
