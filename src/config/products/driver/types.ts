/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 司机作业页字段形状
 */

/**
 * 司机作业页的内容形状。改字段来这里。
 *
 * 这里只声明类型，具体文案在 ./data.ts；组件不直接引本文件，统一走 @/config/site。
 */

/** 司机作业页 /products/driver（原型 Driver Hero + B~F 五屏）。主色是品牌橙，绿只做点缀 */
export interface DriverConfig {
  /** 首屏按钮文案（原型「下载司机端」，橙色按钮） */
  ctaLabel: string
  /** 第一屏：左文案 + 右手机演示（Phone Mock.png 是烘焙文字位图已删，整屏 DOM 重建） */
  hero: {
    /** 按钮下三枚薄荷绿药丸标签 */
    pills: string[]
    /** 手机屏幕内容，数据是编造的明文假数据 */
    phone: {
      statusLeft: string
      statusRight: string
      title: string
      /** 两张货源卡：tone 决定卡片底色（原型第一张浅橙、第二张浅薄荷） */
      orders: { from: string; to: string; price: string; meta: string; tone: 'orange' | 'green' }[]
      acceptLabel: string
      income: { label: string; value: string; delta: string }
      notice: string
      /** 底部导航三项，圆点分隔 */
      tabs: string[]
    }
    /** 三枚浮动徽标：pos 决定绝对定位位置（top 右上 / left 左中 / bottom 左下） */
    chips: { label: string; dot: 'orange' | 'green'; pos: 'top' | 'left' | 'bottom' }[]
  }
  /** 第二屏「平台优势」：四枚圆形插画图标（icons/source-direct 等四张） */
  advantage: {
    eyebrow: string
    items: {
      icon: 'source-direct' | 'roundtrip' | 'safer' | 'earn-more'
      title: string
      desc: string
    }[]
  }
  /** 第三屏「接单作业四步」：四张步骤卡 + 深绿横幅 */
  workflow: {
    eyebrow: string
    title: string
    desc: string
    /** tone 决定卡片底色与编号色（原型 01 浅橙/橙号、04 浅薄荷/绿号、02/03 白卡） */
    steps: { no: string; title: string; body: string; tone: 'orange' | 'plain' | 'green' }[]
    /** 深绿横幅三列 */
    banner: { title: string; desc: string }[]
  }
  /** 第四屏「核心界面一览」：四张真机截图（screen-*.png，真实界面截图才留图） */
  screens: {
    eyebrow: string
    title: string
    desc: string
    items: { no: string; label: string; img: 'workbench' | 'market' | 'load' | 'route' }[]
  }
  /** 第五屏「司机招募」：薄荷绿大圆角容器 + 左文案右插画 */
  recruit: {
    eyebrow: string
    title: string
    desc: string
    stats: { value: string; label: string }[]
    qr: { title: string; desc: string }
  }
}
