<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第八屏：运输协同
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

const { collab } = siteConfig

// 环形闭环原来是设计导出的整图（文字烧在图里，1x 屏必糊），
// 改成环和箭头走 SVG、节点卡和文字走 HTML，坐标量自设计图按 2480×1195 比例定位
const RING = { cx: 1239, cy: 605, r: 514 }
// 内侧虚线圈比实线小 48px，颜色更淡
const DASH_R = RING.r - 48

// 四个箭头在 45°/135°/225°/315°，全部顺时针，朝切线方向画三角形（鱼叉形）
const ARROW = { len: 56, halfW: 20 }
const arrows = [45, 135, 225, 315].map((deg) => {
  const a = (deg * Math.PI) / 180
  const px = RING.cx + RING.r * Math.cos(a)
  const py = RING.cy - RING.r * Math.sin(a)
  const tx = Math.sin(a) // 顺时针切线（SVG 里 y 轴朝下）
  const ty = Math.cos(a)
  const tipX = px + tx * ARROW.len * 0.35
  const tipY = py + ty * ARROW.len * 0.35
  const baseX = px - tx * ARROW.len * 0.65
  const baseY = py - ty * ARROW.len * 0.65
  const nx = -ty
  const ny = tx
  const p = (n: number) => n.toFixed(1)
  return `M${p(tipX)} ${p(tipY)}L${p(baseX + nx * ARROW.halfW)} ${p(baseY + ny * ARROW.halfW)}L${p(baseX - nx * ARROW.halfW)} ${p(baseY - ny * ARROW.halfW)}Z`
})

// 节点卡三种底色：白卡中性投影，橙卡绿卡带同色投影
const nodeCard: Record<string, string> = {
  light: 'bg-white shadow-[0_11px_25px_-11px_rgba(26,26,26,0.16)]',
  orange: 'bg-[#f4823b] shadow-[0_11px_25px_-11px_rgba(244,130,59,0.45)]',
  green: 'bg-[#2fb188] shadow-[0_11px_25px_-11px_rgba(47,177,136,0.4)]',
}

// 卡片第二行字色：白卡灰绿，彩色卡半透明白
const nodeSub: Record<string, string> = {
  light: 'text-[#86928d]',
  orange: 'text-white/85',
  green: 'text-white/85',
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：白底；pt-[96px] 上留白 96px、pb-[64px] 下留白 64px -->
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ collab.eyebrow }}
      </p>

      <!-- 标题：mt-[24px] 与眉题间距 24px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ collab.title }}
      </h2>

      <!-- 说明：mt-[32px] 与标题间距 32px；max-w-[880px] 限宽、14px/24px、ink-600 -->
      <p
        class="reveal mt-[32px] max-w-[880px] text-[14px] leading-[24px] text-ink-600"
        style="--d: 160ms"
      >
        {{ collab.desc }}
      </p>

      <!-- 闭环图面板：mt-[36px] 与说明间距 36px；rounded-[16px]、border-ink-100、
           p-[16px]（sm 起 28px）；底色两团径向色晕（左绿右暖）见末尾 style 的 .collab-bg -->
      <div
        class="collab-bg reveal relative mt-[36px] overflow-hidden rounded-[16px] border border-ink-100 p-[16px] sm:p-[28px]"
        style="--d: 240ms"
      >
        <!-- 横向滚动层：画布锁死 1240px 不缩，窄屏滚着看。
             上下 py-[16px]：卡片投影会溢出画布，不留会被这层裁掉 -->
        <div class="overflow-x-auto py-[16px]">
          <!-- 画布：w-[1240px] 设计稿宽度、比例 2480/1195（见 style）。
               字号全用整像素：跟着 cqw 缩会算出 12.03px 这种小数字号，
               Chrome 重采样字形小字发灰；只有位置走百分比 -->
          <div class="collab-canvas relative mx-auto w-[1240px]">
            <!-- 环 + 箭头 SVG：viewBox 直接用设计稿像素，跟绝对定位卡片共用坐标系；
                 pointer-events-none 不挡卡片交互 -->
            <svg
              class="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 2480 1195"
              fill="none"
              aria-hidden="true"
            >
              <!-- 内侧虚线圈：比实线环小 48px、#e4f4ed 极淡，只暗示「循环」 -->
              <circle
                :cx="RING.cx"
                :cy="RING.cy"
                :r="DASH_R"
                stroke="#e4f4ed"
                stroke-width="3"
                stroke-dasharray="14 13"
              />
              <!-- 主环：#2fb188 绿、5px 粗，卡片会盖住四个正向位置所以直接画整圆 -->
              <circle :cx="RING.cx" :cy="RING.cy" :r="RING.r" stroke="#2fb188" stroke-width="5" />
              <!-- 箭头组：collab-spin 绕圆心匀速转（28s 一圈），箭头按切线方向画，
                   刚体旋转朝向自动保持切线；视口外 paused、.in 才开跑（见 style） -->
              <g class="collab-spin">
                <path v-for="(d, i) in arrows" :key="i" :d="d" fill="#2fb188" />
              </g>
            </svg>

            <!-- 中心圆：left 49.95% / top 50.6% 居中、262×262（aspect-square）；
                 三行字 19px 黑 / 12px 灰 / 12px 绿。字不动，呼吸感交给底下 halo——
                 让圆整体 scale 会把字一起重采样变糊 -->
            <div
              class="absolute left-[49.95%] top-[50.6%] flex aspect-square w-[262px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#eef4f1] bg-white text-center shadow-[0_20px_45px_-25px_rgba(26,26,26,0.16)]"
            >
              <!-- 呼吸光晕：只动 transform/opacity 走合成；用 box-shadow 不用
                   radial-gradient——渐变收边会留一条看得出的圆环（见 style） -->
              <span class="collab-halo" aria-hidden="true" />
              <p class="relative text-[19px] font-bold leading-[25px] text-ink-900">
                {{ collab.center.title }}
              </p>
              <p class="relative mt-[10px] text-[12px] leading-[18px] text-[#929c99]">
                {{ collab.center.sub }}
              </p>
              <p class="relative mt-[7px] text-[12px] font-medium leading-[18px] text-[#2fb188]">
                {{ collab.center.note }}
              </p>
            </div>

            <!-- 四个节点卡：位置 left/top 百分比定位、-translate 居中；
                 min-w-[175px] 只锁最小宽，文案变长不会挤成两行；
                 色板见 script 的 nodeCard/nodeSub -->
            <div
              v-for="node in collab.nodes"
              :key="node.name"
              class="absolute flex min-w-[175px] -translate-x-1/2 -translate-y-1/2 flex-col items-center whitespace-nowrap rounded-[14px] px-[15px] py-[13px] text-center"
              :class="nodeCard[node.tone]"
              :style="{ left: `${node.x}%`, top: `${node.y}%` }"
            >
              <p
                class="text-[15px] font-bold leading-[20px]"
                :class="node.tone === 'light' ? 'text-ink-900' : 'text-white'"
              >
                {{ node.name }}
              </p>
              <p class="mt-[6px] text-[11px] leading-[16px]" :class="nodeSub[node.tone]">
                {{ node.sub }}
              </p>
            </div>

            <!-- 四个流向标签：百分比定位居中、whitespace-nowrap 不折行、#c0763c 棕橙 -->
            <p
              v-for="flow in collab.flows"
              :key="flow.text"
              class="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-medium leading-[15px] tracking-[0.02em] whitespace-nowrap text-[#c0763c]"
              :style="{ left: `${flow.x}%`, top: `${flow.y}%` }"
            >
              {{ flow.text }}
            </p>

            <!-- 左右两列说明：w-[19%] 宽、top-[30.3%]；首项 mt-[33px] 其余 mt-[25px]；
                 圆点 5×5 颜色跟 tone 走（绿 #2fb188 / 橙 #f4823b） -->
            <div
              v-for="(aside, ai) in collab.asides"
              :key="aside.title"
              class="absolute top-[30.3%] w-[19%]"
              :style="{ left: ai === 0 ? '2.2%' : '79.2%' }"
            >
              <p class="text-[11px] leading-[17px] text-[#a6b8b1]">{{ aside.title }}</p>
              <div
                v-for="(item, i) in aside.items"
                :key="item.title"
                :class="i === 0 ? 'mt-[33px]' : 'mt-[25px]'"
              >
                <p
                  class="flex items-center gap-[11px] text-[12px] font-bold leading-[17px] text-ink-900"
                >
                  <span
                    class="h-[5px] w-[5px] shrink-0 rounded-full"
                    :class="aside.tone === 'green' ? 'bg-[#2fb188]' : 'bg-[#f4823b]'"
                  />
                  {{ item.title }}
                </p>
                <p class="mt-[7px] text-[12px] leading-[19px] text-[#9cb1aa]">
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.collab-bg {
  background:
    radial-gradient(38% 56% at 27% 52%, rgba(226, 244, 235, 0.55) 0%, rgba(226, 244, 235, 0) 100%),
    radial-gradient(32% 50% at 73% 46%, rgba(250, 238, 224, 0.45) 0%, rgba(250, 238, 224, 0) 100%),
    #fdfefd;
}

.collab-canvas {
  aspect-ratio: 2480 / 1195;
}

.collab-spin {
  transform-box: view-box;
  transform-origin: 1239px 605px;
  animation: collab-spin 28s linear infinite;
  animation-play-state: paused;
}

.in .collab-spin {
  animation-play-state: running;
}

@keyframes collab-spin {
  to {
    transform: rotate(360deg);
  }
}

.collab-halo {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  box-shadow: 0 0 34px 8px rgba(47, 177, 136, 0.16);
  animation: collab-halo 4.8s ease-in-out infinite;
  animation-play-state: paused;
  pointer-events: none;
}

.in .collab-halo {
  animation-play-state: running;
}

@keyframes collab-halo {
  0%,
  100% {
    transform: scale(0.95);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.02);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .collab-spin,
  .collab-halo {
    animation: none;
  }
}
</style>
