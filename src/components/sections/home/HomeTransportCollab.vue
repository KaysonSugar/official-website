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

/**
 * 第八屏：运输协同（原型 08）。
 * 环形闭环图原来是设计导出的 2480×1195 整图（文字都烧在图里，显示宽度只有
 * 1224，图内正文 22px 被压到 11px，1x 屏必糊），现在是 DOM + SVG 重绘：
 * 环和箭头走 SVG（矢量，任何缩放都锐利），节点卡和文字走 HTML（真文本，
 * 带次像素抗锯齿），坐标全部量自设计图，按 2480×1195 的画布比例定位。
 */
const { collab } = siteConfig

/** 圆环几何：圆心 / 半径都按设计图像素写，改一处整环跟着动 */
const RING = { cx: 1239, cy: 605, r: 514 }
/** 内侧虚线圈比实线小 48px，颜色更淡 */
const DASH_R = RING.r - 48

/**
 * 四个箭头：45° / 135° / 225° / 315°，全部顺时针（化工企业 → 化工 → 物流 → 司机 → 回化工企业）。
 * 朝切线方向画三角形，tip 在弧上偏前、底边落后，跟设计图的鱼叉形状一致。
 */
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

/** 节点卡三种底色：白卡靠中性投影浮起，橙卡绿卡带同色投影 */
const nodeCard: Record<string, string> = {
  light: 'bg-white shadow-[0_11px_25px_-11px_rgba(26,26,26,0.16)]',
  orange: 'bg-[#f4823b] shadow-[0_11px_25px_-11px_rgba(244,130,59,0.45)]',
  green: 'bg-[#2fb188] shadow-[0_11px_25px_-11px_rgba(47,177,136,0.4)]',
}

/** 卡片第二行的字色：白卡用灰绿，彩色卡用半透明白 */
const nodeSub: Record<string, string> = {
  light: 'text-[#86928d]',
  orange: 'text-white/85',
  green: 'text-white/85',
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
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
      <p
        class="reveal mt-[32px] max-w-[880px] text-[14px] leading-[24px] text-ink-600"
        style="--d: 160ms"
      >
        {{ collab.desc }}
      </p>

      <!-- 闭环图面板：色晕按原型逐点采样定的，左绿右暖、峰不在边缘。
           面板只负责底色，图本身在下面的 collab-canvas 里 -->
      <div
        class="collab-bg reveal relative mt-[36px] overflow-hidden rounded-[16px] border border-ink-100 p-[16px] sm:p-[28px]"
        style="--d: 240ms"
      >
        <!-- 窄屏横向滚动兜底：画布固定设计宽度 1240，不跟着视口缩。
             字号锁死在整像素才能清晰，一旦画布缩到 980，卡片相对变宽就会压到两列文字上；
             要让画布缩，字号也得跟着缩回小数，又回到发虚的老问题。宁可横向滚动。
             上下留 16px：卡片投影会往画布外溢出，不留就会被这层滚动容器裁掉 -->
        <div class="overflow-x-auto py-[16px]">
          <!-- 画布：2480×1195 设计稿比例。卡片和文字用整数 px，不能跟着画布 cqw 缩放——
               0.97cqw 在 1240 宽下算出 12.028px 这种非整数字号，Chrome 要重采样字形，
               11~12px 的小字立刻发灰。只有位置走百分比，字号永远落在整像素上 -->
          <div class="collab-canvas relative mx-auto w-[1240px]">
            <!-- 环 + 箭头：一张 SVG 画完，viewBox 直接用设计稿像素，
                 跟下面绝对定位的卡片共用同一坐标系，不需要换算 -->
            <svg
              class="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 2480 1195"
              fill="none"
              aria-hidden="true"
            >
              <!-- 内侧虚线：比实线环淡很多，只是暗示"循环" -->
              <circle
                :cx="RING.cx"
                :cy="RING.cy"
                :r="DASH_R"
                stroke="#e4f4ed"
                stroke-width="3"
                stroke-dasharray="14 13"
              />
              <!-- 主环：卡片会盖住四个正向位置，所以直接画整圆 -->
              <circle :cx="RING.cx" :cy="RING.cy" :r="RING.r" stroke="#2fb188" stroke-width="5" />
              <!-- 四个箭头整组绕圆心匀速转：箭头本来就是按切线方向画的，
                   刚体旋转后朝向自动保持切线，不用逐帧算角度 -->
              <g class="collab-spin">
                <path v-for="(d, i) in arrows" :key="i" :d="d" fill="#2fb188" />
              </g>
            </svg>

            <!-- 中心圆：三行字，主标题黑、副标灰、第三行品牌绿。
                 圆里那三行字全程不动，呼吸感交给底下那层 halo 做——
                 让圆整体 scale 会把字一起缩放，反而重新采样变糊 -->
            <div
              class="absolute left-[49.95%] top-[50.6%] flex aspect-square w-[262px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#eef4f1] bg-white text-center shadow-[0_20px_45px_-25px_rgba(26,26,26,0.16)]"
            >
              <!-- 呼吸光晕：只动 transform / opacity，纯合成，字一个像素都不重绘 -->
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

            <!-- 四个节点卡：宽高由内容撑开，只锁最小宽度，文案变长也不会挤成两行 -->
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

            <!-- 四个流向标签：贴在箭头外侧，细字距的棕橙色小字 -->
            <p
              v-for="flow in collab.flows"
              :key="flow.text"
              class="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-medium leading-[15px] tracking-[0.02em] whitespace-nowrap text-[#c0763c]"
              :style="{ left: `${flow.x}%`, top: `${flow.y}%` }"
            >
              {{ flow.text }}
            </p>

            <!-- 左右两列说明：贴在环的左右两侧，左绿右橙，圆点颜色跟 tone 走 -->
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
/* 面板底色：近白打底，两团径向色晕按原型峰值色 #f0f9f4（绿）/ #fbf7f2（暖）取值 */
.collab-bg {
  background:
    radial-gradient(38% 56% at 27% 52%, rgba(226, 244, 235, 0.55) 0%, rgba(226, 244, 235, 0) 100%),
    radial-gradient(32% 50% at 73% 46%, rgba(250, 238, 224, 0.45) 0%, rgba(250, 238, 224, 0) 100%),
    #fdfefd;
}

/* 画布：锁死设计稿比例，内部位置按百分比定位 */
.collab-canvas {
  aspect-ratio: 2480 / 1195;
}

/* 环上四个箭头绕圆心转。transform-box 让 transform-origin 按 viewBox 坐标算，
   否则默认以元素自身包围盒为基准，一转就甩飞。
   28s 一圈 = 每个箭头 7s 走四分之一环，慢到不抢注意力又能看出方向。
   这一屏在第八屏，滚到之前先按暂停，别让它在视口外白跑 */
.collab-spin {
  transform-box: view-box;
  transform-origin: 1239px 605px;
  animation: collab-spin 28s linear infinite;
  animation-play-state: paused;
  /* 这一组里只有矢量路径、没有文字，单独提层不会触发次像素抗锯齿丢失的问题，
     但能保证旋转时只换矩阵、不重绘整个 SVG */
  will-change: transform;
}

.in .collab-spin {
  animation-play-state: running;
}

@keyframes collab-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 中心圆的呼吸光晕：只动 transform / opacity，走合成不重绘。
   用 box-shadow 而不是 radial-gradient——渐变收边会留下一条能看出来的圆环，
   shadow 的 blur 过渡更软，跟圆自己的投影缝在一起 */
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

/* 关掉动效偏好：两个都是 infinite，全局那条 0.01ms 的规则管不到循环动画 */
@media (prefers-reduced-motion: reduce) {
  .collab-spin,
  .collab-halo {
    animation: none;
  }
}
</style>
