/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 滚动进场
 */
import { onMounted, onUnmounted, type ShallowRef } from 'vue'

/**
 * 区块滚进视口才给根元素加 .in，子元素的 .reveal 依次浮上来。
 * 动画本体在 style.css 的全局 .reveal，各屏别再各写一份 keyframes。
 * 滑出视口再加 .is-idle，把块里的无限动画按暂停（见 style.css）。
 * 用法：<section ref="root">…</section> + useReveal(useTemplateRef('root'))
 */
export function useReveal(target: Readonly<ShallowRef<HTMLElement | null>>, threshold = 0.02) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = target.value
    if (!el) return

    // 关了动效或浏览器太老，直接显示，别把内容锁在透明态
    const noMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    if (noMotion) {
      el.classList.add('in')
      return
    }

    // 一露头就触发，别等整块露出 15%——1000px 高的屏要再滚 150px 才动，看着就是迟钝。
    // 进场后不停观察：滑出去就挂 .is-idle 停动画，滚回来再摘掉。
    // rootMargin 提前 120px 恢复，免得动画在视口边缘才"咔"地重新开始。
    observer = new IntersectionObserver(
      (entries) => {
        const hit = entries[entries.length - 1].isIntersecting
        if (hit) {
          el.classList.remove('is-idle')
          el.classList.add('in')
        } else if (el.classList.contains('in')) {
          el.classList.add('is-idle')
        }
      },
      { threshold, rootMargin: '120px 0px' },
    )
    observer.observe(el)
  })

  onUnmounted(() => observer?.disconnect())
}
