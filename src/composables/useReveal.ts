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
 * 用法：<section ref="root">…</section> + useReveal(useTemplateRef('root'))
 */
export function useReveal(target: Readonly<ShallowRef<HTMLElement | null>>, threshold = 0.15) {
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

    observer = new IntersectionObserver(
      (entries) => {
        // 播一次就断开，省得来回滚反复触发
        if (!entries.some((e) => e.isIntersecting)) return
        el.classList.add('in')
        observer?.disconnect()
      },
      { threshold },
    )
    observer.observe(el)
  })

  // 还没滚到就切路由，记得解绑，不然 observer 一直挂着整个 DOM
  onUnmounted(() => observer?.disconnect())
}
