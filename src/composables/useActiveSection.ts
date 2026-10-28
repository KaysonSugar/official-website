import { onMounted, onUnmounted, ref } from 'vue'

/**
 * 导航高亮（scroll spy）
 *
 * 原理：用 IntersectionObserver 观察所有区块，但把视口上下各裁掉一大半，
 * 只在「视口中线附近很窄的一条带」内判断——落在带内的区块即为当前区块。
 * 这样比监听 scroll 事件计算 scrollTop 更省性能，也不会在滚动时抖动。
 *
 * @param hrefs 导航锚点数组，如 ['#home', '#platform']，顺序需与页面出现顺序一致
 * @returns active 当前区块的锚点，供导航项比较后加高亮样式
 */
export function useActiveSection(hrefs: string[]) {
  const active = ref(hrefs[0] ?? '')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // 老浏览器没有 IntersectionObserver 时直接放弃高亮，不影响页面其他功能
    if (typeof IntersectionObserver === 'undefined') return

    const sections = hrefs
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) return

    observer = new IntersectionObserver(
      (entries) => {
        // 同时有多个区块命中时，取位置最靠上的那个（页面从上往下滚的自然顺序）
        const hits = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (hits.length) active.value = `#${hits[0].target.id}`
      },
      // 上下各收 45%/50%，只在视口中间 5% 的窄带内判定
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer?.observe(section))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return active
}
