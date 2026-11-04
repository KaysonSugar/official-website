<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第八屏：运输协同
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '@/config/site'

/**
 * 第八屏：运输协同（原型 08）。
 * 环形闭环图：中央大圆 + 四节点卡 + SVG 圆环（四段弧带顺时针箭头）+ 左右两组列表。
 * Ring Wrap.png 里的文字是位图不搬（文字按约定进 site.ts），底色彩带用 CSS 渐变重画。
 */
const { collab } = siteConfig

// 节点卡定位：画布 640×560，环心 (320,270) 半径 230，卡压在环的四个基点上
const posClass: Record<string, string> = {
  top: 'left-[225px] top-[8px] h-[64px] w-[190px]',
  right: 'left-[465px] top-[240px] h-[60px] w-[170px]',
  bottom: 'left-[225px] top-[468px] h-[64px] w-[190px]',
  left: 'left-[5px] top-[240px] h-[60px] w-[170px]',
}

// 角标位置：环外四个 45° 角，避开与节点卡重叠
const labelPos = [
  'right-[100px] top-[62px]', // 下单询价（右上）
  'right-[100px] bottom-[62px]', // 转单派车（右下）
  'left-[100px] bottom-[62px]', // 接单承运（左下）
  'left-[100px] top-[62px]', // 回单结算（左上）
]

const cardTone: Record<string, string> = {
  plain: 'border border-ink-100 bg-white text-ink-900 shadow-[0_10px_30px_-14px_rgba(26,26,26,0.14)]',
  orange: 'border border-[#d9762e] bg-[#e8833a] text-white shadow-[0_12px_30px_-14px_rgba(232,131,58,0.55)]',
  green: 'border border-[#298a58] bg-[#2f9e66] text-white shadow-[0_12px_30px_-14px_rgba(47,158,102,0.55)]',
}

// 和前几屏同一套：IntersectionObserver 滚进来才播入场
const root = ref<HTMLElement>()

onMounted(() => {
  const el = root.value
  if (!el) return
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    el.classList.add('in')
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.classList.add('in')
        io.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  io.observe(el)
})
</script>

<template>
  <section ref="root" class="bg-white pb-[80px] pt-[100px]">
    <div class="container-page">
      <!-- 眉题：跟前几屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ collab.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ collab.title }}
      </h2>

      <!-- 两行说明：14px 弱化灰 -->
      <p class="reveal mt-[32px] max-w-[880px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ collab.desc }}
      </p>

      <!-- 闭环图面板：白底描边卡，左右两块淡色底（左绿右橙）对应两侧列表的氛围 -->
      <div
        class="reveal relative mt-[36px] overflow-hidden rounded-[16px] border border-ink-100 bg-white p-[24px] sm:p-[40px]"
        style="--d: 240ms"
      >
        <div
          class="pointer-events-none absolute -left-[120px] top-[10%] h-[80%] w-[480px] bg-[linear-gradient(90deg,rgba(233,246,239,0.9)_0%,rgba(233,246,239,0)_100%)]"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -right-[120px] top-[10%] h-[80%] w-[480px] bg-[linear-gradient(270deg,rgba(253,240,231,0.9)_0%,rgba(253,240,231,0)_100%)]"
          aria-hidden="true"
        />

        <div class="relative grid gap-[32px] lg:grid-cols-[200px_1fr_200px] lg:items-center">
          <!-- 左列：闭环如何成立（绿点） -->
          <div>
            <p class="reveal text-[12px] leading-[18px] text-ink-400" style="--d: 480ms">
              {{ collab.left.group }}
            </p>
            <div
              v-for="(item, i) in collab.left.items"
              :key="item.title"
              class="reveal mt-[22px]"
              :style="{ '--d': `${520 + i * 80}ms` }"
            >
              <p class="flex items-center gap-[8px] text-[15px] font-bold leading-[22px] text-ink-900">
                <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-[#2f9e66]" aria-hidden="true" />
                {{ item.title }}
              </p>
              <p class="mt-[4px] pl-[14px] text-[13px] leading-[20px] text-[#84968c]">
                {{ item.desc }}
              </p>
            </div>
          </div>

          <!-- 环形图：固定 640×560 画布，窄屏横向滚动看全 -->
          <div class="overflow-x-auto">
            <div class="relative mx-auto h-[560px] w-[640px] min-w-[640px]">
              <!-- 圆环：四段弧 + 顺时针箭头；虚线装饰圆慢转 -->
              <svg viewBox="0 0 640 560" class="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle
                  class="orbit"
                  cx="320"
                  cy="270"
                  r="265"
                  fill="none"
                  stroke="#dfeee7"
                  stroke-width="1.5"
                  stroke-dasharray="2 10"
                />
                <path class="arc" style="--d: 480ms" d="M 340.05 40.87 A 230 230 0 0 1 549.13 249.95" />
                <path class="arc" style="--d: 560ms" d="M 549.13 290.05 A 230 230 0 0 1 340.05 499.13" />
                <path class="arc" style="--d: 640ms" d="M 299.95 499.13 A 230 230 0 0 1 90.87 290.05" />
                <path class="arc" style="--d: 720ms" d="M 90.87 249.95 A 230 230 0 0 1 299.95 40.87" />
                <polygon class="arc-arrow" style="--d: 900ms" points="0,-4.5 9,0 0,4.5" transform="translate(549.13 249.95) rotate(85)" />
                <polygon class="arc-arrow" style="--d: 960ms" points="0,-4.5 9,0 0,4.5" transform="translate(340.05 499.13) rotate(175)" />
                <polygon class="arc-arrow" style="--d: 1020ms" points="0,-4.5 9,0 0,4.5" transform="translate(90.87 290.05) rotate(265)" />
                <polygon class="arc-arrow" style="--d: 1080ms" points="0,-4.5 9,0 0,4.5" transform="translate(299.95 40.87) rotate(355)" />
              </svg>

              <!-- 流转角标：环外四角，橙色小字 -->
              <p
                v-for="(label, i) in collab.labels"
                :key="label"
                class="reveal absolute text-[12px] font-medium leading-[18px] text-[#bc6a30]"
                :class="labelPos[i]"
                :style="{ '--d': `${860 + i * 60}ms` }"
              >
                {{ label }}
              </p>

              <!-- 中央大圆 -->
              <div
                class="reveal absolute left-[210px] top-[160px] flex h-[220px] w-[220px] flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_24px_60px_-24px_rgba(26,26,26,0.18)]"
                style="--d: 560ms"
              >
                <p class="text-[19px] font-bold leading-[28px] text-ink-900">{{ collab.center.title }}</p>
                <p class="mt-[6px] text-[12px] leading-[18px] text-ink-500">{{ collab.center.sub }}</p>
                <p class="mt-[8px] text-[13px] font-semibold leading-[20px] text-[#2f9e66]">
                  {{ collab.center.highlight }}
                </p>
              </div>

              <!-- 四个节点卡，顺时针依次浮入 -->
              <div
                v-for="(node, i) in collab.nodes"
                :key="node.title"
                class="reveal absolute flex flex-col items-center justify-center rounded-[12px] px-[12px] text-center"
                :class="[posClass[node.pos], cardTone[node.tone]]"
                :style="{ '--d': `${620 + i * 80}ms` }"
              >
                <p class="text-[15px] font-bold leading-[22px]">{{ node.title }}</p>
                <p class="mt-[2px] text-[11px] leading-[16px] opacity-80">{{ node.sub }}</p>
              </div>
            </div>
          </div>

          <!-- 右列：数据流向哪里（橙点） -->
          <div>
            <p class="reveal text-[12px] leading-[18px] text-ink-400" style="--d: 500ms">
              {{ collab.right.group }}
            </p>
            <div
              v-for="(item, i) in collab.right.items"
              :key="item.title"
              class="reveal mt-[22px]"
              :style="{ '--d': `${560 + i * 80}ms` }"
            >
              <p class="flex items-center gap-[8px] text-[15px] font-bold leading-[22px] text-ink-900">
                <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-[#e8833a]" aria-hidden="true" />
                {{ item.title }}
              </p>
              <p class="mt-[4px] pl-[14px] text-[13px] leading-[20px] text-[#99897c]">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 弧线生长：用 dashoffset 从整段弧长收到 0，滚进来才画；
   弧长 = 230 × 80° ≈ 321，dasharray 给 322 留一点余量 */
.arc {
  fill: none;
  stroke: #2f9e66;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 322;
  stroke-dashoffset: 322;
}

.in .arc {
  animation: collab-draw 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--d, 0ms);
}

@keyframes collab-draw {
  to {
    stroke-dashoffset: 0;
  }
}

/* 箭头跟在弧后面淡入 */
.arc-arrow {
  opacity: 0;
}

.in .arc-arrow {
  animation: collab-fade 0.4s ease-out forwards;
  animation-delay: var(--d, 0ms);
}

@keyframes collab-fade {
  to {
    opacity: 1;
  }
}

/* 虚线装饰圆慢转（infinite 动画，reduced-motion 里必须关掉）；
   transform-origin 要用像素值指到环心，百分比在 SVG 里不生效 */
.orbit {
  transform-origin: 320px 270px;
}

.in .orbit {
  animation: collab-spin 90s linear infinite;
}

@keyframes collab-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 入场跟前几屏同一套：.in 触发一次性动画，延迟走行内 --d */
.reveal {
  opacity: 0;
}

.in .reveal {
  opacity: 1;
  animation: collab-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes collab-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .arc {
    stroke-dashoffset: 0;
  }

  .arc-arrow,
  .reveal {
    opacity: 1;
  }

  .in .arc,
  .in .arc-arrow,
  .in .reveal {
    animation: none;
  }

  .in .orbit {
    animation: none;
  }
}
</style>
