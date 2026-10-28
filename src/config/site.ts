/**
 * 站点内容配置
 *
 * 作用：把页面上的所有文案（导航、标题、描述、版权）集中到一处管理。
 * 改文案只改这个文件，不需要改动任何组件代码。
 * 所有结构都有 TS 类型约束，写错字段名会在 npm run typecheck 时报错。
 */

/** 顶部导航项：href 使用页面内锚点，需与各 section 的 id 对应 */
export interface NavItem {
  /** 导航显示文字 */
  label: string
  /** 跳转锚点，例如 '#features' */
  href: string
}

/** 产品能力卡片：一张卡片的标题与描述 */
export interface Feature {
  title: string
  desc: string
}

/** 解决方案条目（当前区块仅展示一条占位内容，后续可扩展为列表） */
export interface Solution {
  title: string
  desc: string
}

/** 站点整体配置结构 */
export interface SiteConfig {
  /** 左上角品牌标识文字 */
  brand: string
  /** 首屏 Hero 区域 */
  hero: {
    /** 主标题 */
    title: string
    /** 主标题下方的一句话简介 */
    tagline: string
  }
  /** 顶部导航菜单列表 */
  navItems: NavItem[]
  /** 产品能力区块 */
  features: {
    heading: string
    items: Feature[]
  }
  /** 解决方案区块 */
  solutions: {
    heading: string
    desc: string
  }
  /** 关于我们区块 */
  about: {
    heading: string
    desc: string
  }
  /** 页脚 */
  footer: {
    copyright: string
  }
}

/** 站点实际内容（上线前替换为真实文案） */
export const siteConfig: SiteConfig = {
  // 品牌名：显示在导航栏左侧，替换 LOGO 文字或改为图片组件
  brand: 'LOGO',
  hero: {
    title: '官网标题',
    tagline: '一句话简介，后续替换成真实内容。',
  },
  // 导航顺序即显示顺序；href 必须能在页面中找到同名 id，否则点击无反应
  navItems: [
    { label: '首页', href: '#home' },
    { label: '产品', href: '#features' },
    { label: '方案', href: '#solutions' },
    { label: '关于', href: '#about' },
  ],
  features: {
    heading: '产品能力',
    // 卡片数量可增减，栅格会自动按 1/2/3 列响应式排布
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
