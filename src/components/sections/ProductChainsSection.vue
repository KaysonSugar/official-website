<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 化工生产第二屏：三条主线与订单驱动流程
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconProduction from '@/assets/products/chemical/icons/chain-production.png'
import iconMaterial from '@/assets/products/chemical/icons/chain-material.png'
import iconFinance from '@/assets/products/chemical/icons/chain-finance.png'

/**
 * 三条主线（原型 P 三条主线）：左边三张链路卡（浅橙 / 浅绿 / 白），
 * 右边 FLOW 订单驱动全流程面板。
 *
 * FLOW 面板整体 DOM+SVG 重建（Flow Panel.png 是烘焙文字参考图，已删）。
 * 为了让菱形分叉线和跨支虚线的坐标算得准，面板内容用固定像素布局（412px 内宽），
 * 小屏放不下时横向滚动，不做响应式挤压——流程图挤压会断线。
 * 每张卡的编号/标题/箭头跟着 tone 变色：橙棕 #a3470f、绿 #137858、白卡黑。
 */
const { chains } = siteConfig.chemical

const iconMap = {
  production: iconProduction,
  material: iconMaterial,
  finance: iconFinance,
}

// tone → 编号标题色 / 描述与链路行色 / 卡底
const toneClass = {
  orange: {
    card: 'bg-[#ffebd8]',
    head: 'text-[#a3470f]',
    desc: 'text-[#5f5b52]',
    chain: 'text-[#8a6a55]',
  },
  green: {
    card: 'bg-[#eef7f1]',
    head: 'text-[#137858]',
    desc: 'text-[#4b5a53]',
    chain: 'text-[#435f54]',
  },
  plain: {
    card: 'bg-white ring-1 ring-[#ececec]',
    head: 'text-ink-900',
    desc: 'text-[#565e58]',
    chain: 'text-[#4a544f]',
  },
} as const

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-700 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ chains.eyebrow }}
      </p>

      <h2 class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900" style="--d: 80ms">
        {{ chains.title }}
      </h2>

      <div class="mt-[36px] flex flex-col gap-[20px] lg:flex-row lg:items-stretch lg:gap-[24px]">
        <!-- 左列：三张链路卡 -->
        <div class="flex min-w-0 flex-1 flex-col gap-[16px]">
          <article
            v-for="(card, i) in chains.cards"
            :key="card.no"
            class="reveal rounded-[12px] p-[22px] lg:flex lg:flex-1 lg:gap-[18px]"
            :class="toneClass[card.tone].card"
            :style="{ '--d': `${240 + i * 90}ms` }"
          >
            <!-- 图标素材自带浅色圆角底 -->
            <img
              loading="lazy"
              decoding="async"
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="h-[52px] w-[52px] shrink-0 select-none"
            />
            <div class="mt-[14px] lg:mt-0">
              <h3 class="text-[16px] font-bold leading-[24px]" :class="toneClass[card.tone].head">
                <span class="mr-[10px] tabular-nums">{{ card.no }}</span>{{ card.title }}
              </h3>
              <p class="mt-[10px] text-[13px] leading-[22px]" :class="toneClass[card.tone].desc">
                {{ card.desc }}
              </p>
              <!-- 链路行：步骤用 → 串联 -->
              <p class="mt-[10px] text-[12px] leading-[20px]" :class="toneClass[card.tone].chain">
                {{ card.steps.join(' → ') }}
              </p>
            </div>
          </article>
        </div>

        <!-- 右列：FLOW 流程面板。520 宽（原型左 736 / 右 520 的比例），小屏横向滚动 -->
        <div class="reveal overflow-x-auto pb-[4px] lg:w-[520px] lg:shrink-0" style="--d: 400ms">
          <div class="min-w-[520px] rounded-[16px] bg-white p-[24px] ring-1 ring-[#e6ecea]">
            <p class="text-[12px] font-semibold leading-[18px] text-[#1f6e4e]">{{ chains.flow.label }}</p>

            <!-- 主链：节点 + 竖向箭头（旁挂小字） -->
            <div class="mt-[16px] flex flex-col items-center">
              <template v-for="(node, i) in chains.flow.main" :key="node.text">
                <div
                  class="rounded-[7px] px-[14px] py-[7px] text-center text-[13px] font-semibold leading-[20px]"
                  :class="node.tone === 'orange' ? 'bg-[#fbeede] text-[#b05a15]' : 'bg-[#e5f4ea] text-[#1c6b4d]'"
                >
                  {{ node.text }}
                </div>
                <div v-if="i < chains.flow.main.length" class="relative flex h-[30px] w-0 flex-col items-center justify-center">
                  <span class="h-full w-[1.5px] bg-[#a9c0b2]" />
                  <svg class="absolute bottom-[-1px] left-[-4px] h-[5px] w-[8px]" viewBox="0 0 8 5" aria-hidden="true">
                    <path d="M0 0l4 5 4-5z" fill="#a9c0b2" />
                  </svg>
                  <span
                    v-if="node.note"
                    class="absolute left-[10px] top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] leading-[14px] text-[#9aab9f]"
                  >
                    {{ node.note }}
                  </span>
                </div>
              </template>

              <!-- 菱形判断：SVG 压扁菱形 + 绝对居中文字 -->
              <div class="relative mt-[2px] flex h-[86px] w-[150px] items-center justify-center">
                <svg viewBox="0 0 150 86" class="absolute inset-0 h-full w-full" aria-hidden="true">
                  <polygon points="75,0 150,43 75,86 0,43" fill="#14332a" />
                </svg>
                <span class="relative text-[13px] font-semibold leading-[18px] text-white">{{ chains.flow.decision }}</span>
              </div>
            </div>

            <!-- 分叉线：菱形底尖 → 水平展开 → 两列中心，分支标签写在线上（内宽 472：中心 236，左列中心 112，右列中心 360） -->
            <svg viewBox="0 0 472 50" class="mt-[4px] h-[50px] w-full" aria-hidden="true">
              <path d="M236 0v16" stroke="#a9c0b2" stroke-width="1.5" fill="none" />
              <path d="M112 16h248" stroke="#a9c0b2" stroke-width="1.5" fill="none" />
              <path d="M112 16v26" stroke="#a9c0b2" stroke-width="1.5" fill="none" />
              <path d="M360 16v26" stroke="#a9c0b2" stroke-width="1.5" fill="none" />
              <path d="M108 40l4 6 4-6z" fill="#a9c0b2" />
              <path d="M356 40l4 6 4-6z" fill="#a9c0b2" />
              <text x="112" y="10" text-anchor="middle" font-size="11" fill="#c26116">{{ chains.flow.branchLeft.label }}</text>
              <text x="360" y="10" text-anchor="middle" font-size="11" fill="#2b6950">{{ chains.flow.branchRight.label }}</text>
            </svg>

            <!-- 两支分支：左支浅橙、右支白底绿边；物料入库到生成领料单有虚线回流 -->
            <div class="relative grid grid-cols-2 gap-[24px]">
              <!-- 虚线回流：从左支末节点（y=114 中心）→ 中缝 → 右支首节点（y=18） -->
              <svg viewBox="0 0 472 132" preserveAspectRatio="none" class="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <path d="M224 114h12V18h8" stroke="#c9d6cd" stroke-width="1.5" fill="none" stroke-dasharray="4 4" />
                <path d="M244 14l4 4-4 4" stroke="#c9d6cd" stroke-width="1.5" fill="none" stroke-dasharray="4 4" />
              </svg>

              <!-- 左支 -->
              <div class="flex flex-col gap-[12px]">
                <template v-for="(node, i) in chains.flow.branchLeft.nodes" :key="node.text">
                  <div class="flex h-[36px] items-center justify-center rounded-[7px] bg-[#fceadd] text-[13px] font-semibold text-[#b9540f]">
                    {{ node.text }}
                  </div>
                  <div v-if="i < chains.flow.branchLeft.nodes.length - 1" class="relative mx-auto flex h-[10px] w-0">
                    <span class="h-full w-[1.5px] bg-[#a9c0b2]" />
                    <svg class="absolute bottom-0 left-[-4px] h-[4px] w-[8px]" viewBox="0 0 8 4" aria-hidden="true">
                      <path d="M0 0l4 4 4-4z" fill="#a9c0b2" />
                    </svg>
                    <span
                      v-if="node.note"
                      class="absolute left-[10px] top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] leading-[14px] text-[#9aab9f]"
                    >
                      {{ node.note }}
                    </span>
                  </div>
                </template>
              </div>

              <!-- 右支 -->
              <div class="flex flex-col gap-[12px]">
                <template v-for="(text, i) in chains.flow.branchRight.nodes" :key="text">
                  <div class="flex h-[36px] items-center justify-center rounded-[7px] bg-white text-[13px] font-semibold text-[#1c6b4d] ring-1 ring-[#d9e6dd]">
                    {{ text }}
                  </div>
                  <div v-if="i < chains.flow.branchRight.nodes.length - 1" class="relative mx-auto flex h-[10px] w-0">
                    <span class="h-full w-[1.5px] bg-[#a9c0b2]" />
                    <svg class="absolute bottom-[-1px] left-[-4px] h-[4px] w-[8px]" viewBox="0 0 8 4" aria-hidden="true">
                      <path d="M0 0l4 4 4-4z" fill="#a9c0b2" />
                    </svg>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
