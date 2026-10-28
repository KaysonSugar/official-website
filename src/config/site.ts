export interface NavItem {
  label: string
  href: string
}

export interface Feature {
  title: string
  desc: string
}

export interface Solution {
  title: string
  desc: string
}

export interface SiteConfig {
  brand: string
  hero: {
    title: string
    tagline: string
  }
  navItems: NavItem[]
  features: {
    heading: string
    items: Feature[]
  }
  solutions: {
    heading: string
    desc: string
  }
  about: {
    heading: string
    desc: string
  }
  footer: {
    copyright: string
  }
}

export const siteConfig: SiteConfig = {
  brand: 'LOGO',
  hero: {
    title: '官网标题',
    tagline: '一句话简介，后续替换成真实内容。',
  },
  navItems: [
    { label: '首页', href: '#home' },
    { label: '产品', href: '#features' },
    { label: '方案', href: '#solutions' },
    { label: '关于', href: '#about' },
  ],
  features: {
    heading: '产品能力',
    items: [
      { title: '能力一', desc: '在这里填写功能描述' },
      { title: '能力二', desc: '在这里填写功能描述' },
      { title: '能力三', desc: '在这里填写功能描述' },
    ],
  },
  solutions: {
    heading: '解决方案',
    desc: '占位内容。',
  },
  about: {
    heading: '关于我们',
    desc: '占位内容。',
  },
  footer: {
    copyright: '© 2026 公司名称. All rights reserved.',
  },
}
