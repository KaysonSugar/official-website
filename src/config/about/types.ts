/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 关于我们页字段形状
 */

/**
 * 关于我们页的内容形状。改字段来这里。
 *
 * 这里只声明类型，具体文案在 ./data.ts；组件不直接引本文件，统一走 @/config/site。
 */

/** 关于我们页（原型 About Hero + S1~S3）：首屏插画背景、简介、企业理念、公司使命 */
export interface AboutConfig {
  /** 第二屏「简介」与第四屏「公司使命」同构：橙眉题 + 黑标题 + 若干段落，共用一个组件 */
  intro: { eyebrow: string; title: string; paras: string[] }
  mission: { eyebrow: string; title: string; paras: string[] }
  /** 第三屏「企业理念」：四个圆底图标横排 */
  philosophy: {
    eyebrow: string
    title: string
    items: { icon: 'innovation' | 'persist' | 'execute' | 'excel'; label: string }[]
  }
}
