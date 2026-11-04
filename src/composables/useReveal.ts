/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 滚动进场工具
 */
import { onMounted, onUnmounted, type ShallowRef } from 'vue'

/**
 * 区块的滚动进场：根元素露头才加 .in，子元素带 .reveal 依次浮上来。
 *
 * 为什么不用纯 CSS：首屏以下的区块页面一打开就在视口外，动画会提前播完，
 * 用户滚下来只看到静止画面。所以得等 IntersectionObserver 说「进来了」才开播。
 *
 * 动画本体在 style.css 的全局 .reveal，各屏别再各写一份 keyframes——
 * 之前 11 个组件写了 11 遍，调一次节奏要改 11 个文件。
 *
 * 用法：
 *   const root = useTemplateRef<HTMLElement>('root')
 *   useReveal(root)
 *   <section ref="root"> <p class="reveal" style="--d: 80ms">…</p> </section>
 *
 * @param target useTemplateRef 拿到的根元素
 * @param threshold 露出多少比例就开播，默认 0.15（整块进视口太磨叽）
 */
export function useReveal(target: Readonly<ShallowRef<HTMLElement | null>>, threshold = 0.15) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = target.value
    if (!el) return

    // 系统开了「减弱动效」或者浏览器太老，直接显示，别把内容锁在透明态
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      el.classList.add('in')
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        // 播一次就够，断开省得来回滚反复触发
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('in')
          observer?.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
  })

  // 还没滚到就被销毁（切路由），记得解绑，不然 observer 挂着整个 DOM 不放
  onUnmounted(() => observer?.disconnect())
}
