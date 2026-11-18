/*
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.18
 * @Name: 首屏等比缩放指令
*/
import type { Directive } from 'vue'

// 超宽屏首屏等比放大：1920 及以下不动；以上按 视口宽/1920 缩放，
// 与根字号 clamp(16px, 100vw/120, 32px) 的曲线一致（1920→1，3840→2）。
// 首屏文字、样机都是 px 字面值，只有 zoom 整体放大才能跟容器一起铺满、中间不留空白。
const els = new Set<HTMLElement>()

const sync = () => {
  const scale = Math.min(2, Math.max(1, window.innerWidth / 1920))
  els.forEach((el) => {
    el.style.zoom = scale > 1 ? String(scale) : ''
  })
}

let listening = false

const attach = (el: HTMLElement) => {
  els.add(el)
  if (!listening) {
    listening = true
    window.addEventListener('resize', sync)
  }
  sync()
}

const detach = (el: HTMLElement) => {
  els.delete(el)
  el.style.zoom = ''
}

// binding 传 false 时（如 PageHero 没有右侧插槽）不缩放
export const vHeroZoom: Directive<HTMLElement, boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value !== false) attach(el)
  },
  updated(el, binding) {
    if (binding.value === false) detach(el)
    else attach(el)
  },
  unmounted: detach,
}
