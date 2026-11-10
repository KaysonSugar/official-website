/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 关于我们页字段形状
 */

export interface AboutConfig {
  intro: { eyebrow: string; title: string; paras: string[] }
  mission: { eyebrow: string; title: string; paras: string[] }
  philosophy: {
    eyebrow: string
    title: string
    items: { icon: 'innovation' | 'persist' | 'execute' | 'excel'; label: string }[]
  }
}
