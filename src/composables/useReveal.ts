import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * 滚动进场动效
 *
 * 原理：用 IntersectionObserver 监听元素是否进入视口，进入后把返回的 visible 置为 true，
 * 由调用方把 visible 绑定到 Tailwind 过渡类上（opacity + translate-y）实现淡入上移。
 *
 * 无障碍：若用户在系统中开启了"减弱动效"（prefers-reduced-motion: reduce），
 * 则直接置为 true，不做任何动画，保证内容一定可见。
 *
 * 用法：
 *   const boxEl = useTemplateRef<HTMLElement>('box')
 *   const visible = useReveal(boxEl)
 *   <section ref="box" :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'">
 */
export interface RevealOptions {
  /** 元素露出多少比例才触发，默认 0.15（露出 15%） */
  threshold?: number
  /** 视口边缘收缩，负值表示延后触发，默认底部内缩 10% 让动效更自然 */
  rootMargin?: string
}

/**
 * @param target 由 useTemplateRef 取得的元素引用
 * @returns visible 是否已进入视口（供模板绑定过渡类）
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  target: Ref<T | null>,
  options: RevealOptions = {},
) {
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const node = target.value
    if (!node) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 减弱动效或浏览器不支持时直接显示，避免内容一直处于不可见状态
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      visible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true
            // 只触发一次，触发后立即断开监听，避免来回滚动时反复切换
            observer?.disconnect()
          }
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -10% 0px',
      },
    )

    observer.observe(node)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return visible
}
