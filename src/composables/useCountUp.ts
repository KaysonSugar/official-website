/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 统计数字滚动
 */
import { onMounted, type ShallowRef } from 'vue'

/**
 * 统计数字滚动：容器滚进视口（露出一半）后，里面带 data-num 的元素从 0 数到目标值。
 * 从首页 hero 的内联实现抽出来的（司机招募、物流货源广场先后都要用，第三处起不抄第三遍）。
 *
 * 用法：
 *   <div ref="stats">
 *     <p data-num="1500" data-rest="+">0+</p>
 *   </div>
 *   useCountUp(stats)
 *
 * - data-rest：数字后面的尾巴（+、%、元），原样拼回
 * - data-format="group"：千位加逗号（5000 → 5,000），原值里本来就带逗号的才加，
 *   别全局开——「1500+」数成「1,500+」就改了 config 的文案
 * - 初始渲染直接写 0+尾巴，不然页面先闪终值、动画启动又跳回 0 重数
 * - 关动效 / 老浏览器直接填终值，别把数字锁在 0
 *
 * @param target 包着统计数字的容器 ref
 * @param threshold 露出多少比例开播，默认 0.5（刚露头就数完看着突兀）
 */
export function useCountUp(target: Readonly<ShallowRef<HTMLElement | null>>, threshold = 0.5) {
  onMounted(() => {
    const root = target.value
    if (!root) return

    // 没走到递增逻辑的条目直接填成终值
    const fillFinal = () => {
      root.querySelectorAll<HTMLElement>('[data-num]').forEach((el) => {
        el.textContent = format(el)
      })
    }

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      fillFinal()
      return
    }

    const els = root.querySelectorAll<HTMLElement>('[data-num]')
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.unobserve(entry.target)
          const el = entry.target as HTMLElement
          const num = Number(el.dataset.num)
          const t0 = performance.now()
          const DURATION = 900 // 0.9s，easeOutCubic 先快后慢，比匀速看着舒服
          const tick = (t: number) => {
            const p = Math.min((t - t0) / DURATION, 1)
            el.textContent = format(el, Math.round(num * (1 - Math.pow(1 - p, 3))))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold },
    )
    els.forEach((el) => io.observe(el))
  })
}

// 终值/每帧文本：按需千位分组，再拼尾巴
function format(el: HTMLElement, n?: number) {
  const v = n ?? Number(el.dataset.num)
  const s = el.dataset.format === 'group' ? v.toLocaleString('en-US') : String(v)
  return s + (el.dataset.rest ?? '')
}
