/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 统计数字滚动
 */
import { onMounted, type ShallowRef } from 'vue'

// 0.9s，配合 easeOutCubic 先快后慢，比匀速舒服
const DURATION = 900

/**
 * 统计数字滚动：容器露出 threshold 比例后，带 data-num 的元素从 0 数到目标值。
 * data-rest 是尾巴（+ / % / 元），data-format="group" 才加千位逗号。
 * 用法：<p data-num="1500" data-rest="+">0+</p> + useCountUp(useTemplateRef('stats'))
 */
export function useCountUp(target: Readonly<ShallowRef<HTMLElement | null>>, threshold = 0.5) {
  onMounted(() => {
    const root = target.value
    if (!root) return

    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-num]'))
    if (!els.length) return

    // 关了动效或浏览器太老，直接填终值，别把数字锁在 0
    const noMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    if (noMotion) {
      els.forEach((el) => (el.textContent = format(el)))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.unobserve(entry.target)
          animate(entry.target as HTMLElement)
        }
      },
      { threshold },
    )
    els.forEach((el) => io.observe(el))
  })
}

// 单个数字从 0 数到终值
function animate(el: HTMLElement) {
  const num = Number(el.dataset.num)
  const start = performance.now()

  const tick = (now: number) => {
    const p = Math.min((now - start) / DURATION, 1)
    el.textContent = format(el, Math.round(num * (1 - (1 - p) ** 3)))
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// 终值或每帧文本：按需千位分组，再拼尾巴
function format(el: HTMLElement, n?: number) {
  const v = n ?? Number(el.dataset.num)
  const s = el.dataset.format === 'group' ? v.toLocaleString('en-US') : String(v)
  return s + (el.dataset.rest ?? '')
}
