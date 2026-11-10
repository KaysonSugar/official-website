<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第七屏：生产主流程图
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

const { workflow } = siteConfig

// 顶部节点：tone → 底色/边框/文字色。橙 #fff8f2 / 绿 #f1faf5 都是原型取的极淡底，
// 边框同色系浅一档；plain 是白底节点，边框跟「生产计划」取同一个绿
const nodeClass: Record<string, string> = {
  orange: 'border-[#fbe2dd] bg-[#fff8f2] text-[#b0602f]',
  green: 'border-[#dcebe6] bg-[#f1faf5] text-[#2f8a5f]',
  plain: 'border-[#dcebe6] bg-white text-ink-800',
}

// 分支名条 / 收尾条：比顶部节点深一档，边框跟着重一点；solid 是绿色实心收尾
const branchClass: Record<string, string> = {
  orange: 'border-[#f0d5c4] bg-[#fff1e8] text-[#b0602f]',
  green: 'border-[#d0e5de] bg-[#e9f6ef] text-[#2f8a5f]',
  solid: 'border-transparent bg-[#2f9e66] text-white',
}

// 中间步骤：白底，边框按分支换色（采购暖边 / 生产绿边）
const stepClass: Record<string, string> = {
  orange: 'border-[#f0d5c4] bg-white text-ink-700',
  green: 'border-[#dcebe6] bg-white text-ink-700',
}

// 箭头波（keyframes 见末尾 style）：全部 ↓/→ 按流程顺序用 --wd 延迟点亮，
// 静息色 #82bda2 波峰闪成 #2f9e66，一道从上往下扫的「业务在流动」光波。
// 一轮 7s = 波走 3.2s + 静息 3.8s，别一直闪。动 color 不动 opacity——
// 16px 小箭头差 30% 的 opacity 肉眼看不出来；重绘面积不到 6000px² 可忽略
const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：#f1faf5 浅绿底；pt-[96px] 上留白 96px、pb-[64px] 下留白 64px -->
  <section ref="root" class="bg-[#f1faf5] pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ workflow.eyebrow }}
      </p>

      <!-- 标题：mt-[24px] 与眉题间距 24px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 50ms"
      >
        {{ workflow.title }}
      </h2>

      <!-- 说明：mt-[32px] 与标题间距 32px；max-w-[860px] 限宽、14px/22px、ink-600 -->
      <p
        class="reveal mt-[32px] max-w-[860px] text-[14px] leading-[22px] text-ink-600"
        style="--d: 100ms"
      >
        {{ workflow.desc }}
      </p>

      <!-- 流程图面板：mt-[36px] 与说明间距 36px；rounded-[16px] 圆角、
           border-ink-100 描边、白底、p-[24px]（sm 起 32px）、极淡投影 -->
      <div
        class="reveal mt-[36px] rounded-[16px] border border-ink-100 bg-white p-[24px] shadow-[0_18px_40px_-30px_rgba(26,26,26,0.12)] sm:p-[32px]"
        style="--d: 150ms"
      >
        <!-- 顶部主流程：lg:flex-row 一行排开（手机竖排 flex-col、gap-[8px]）；
             节点 h-[48px] flex-1 等宽、rounded-[8px]、13px/18px -->
        <div class="flex flex-col gap-[8px] lg:flex-row lg:items-center">
          <template v-for="(node, i) in workflow.topNodes" :key="node.text">
            <div
              class="reveal flex h-[48px] flex-1 items-center justify-center rounded-[8px] border px-[12px] text-center text-[13px] leading-[18px] font-medium"
              :class="nodeClass[node.tone]"
              :style="{ '--d': `${180 + i * 35}ms` }"
            >
              {{ node.text }}
            </div>
            <!-- 箭头：→ 字符、#82bda2 浅绿；lg:block 显示（手机竖排时 hidden）；
                 --wd 是箭头波的点亮延迟，按流程顺序递增，见末尾 style 的 keyframes -->
            <span
              v-if="node.arrow"
              class="flow-arrow hidden shrink-0 px-[6px] text-[16px] text-[#82bda2] lg:block"
              :style="{ '--wd': `${i * 400}ms` }"
              aria-hidden="true"
              >→</span
            >
          </template>
        </div>

        <!-- 判断菱形：原型量出来 176×94（宽是高的一倍多）；
             用 clip-path 直接裁四边形——rotate 方块在非等比时会连角一起拉变形 -->
        <div class="reveal mt-[6px] flex flex-col items-center" style="--d: 300ms">
          <span
            class="flow-arrow text-[16px] leading-[20px] text-[#82bda2]"
            :style="{ '--wd': '1200ms' }"
            aria-hidden="true"
            >↓</span
          >
          <div class="diamond mt-[14px] flex items-center justify-center">
            <span class="text-[13px] font-semibold text-white">{{ workflow.judge }}</span>
          </div>
        </div>

        <!-- 两条分支：md:grid-cols-2 并排（手机 1 列先左后右叠放）、md:gap-[32px] -->
        <div class="mt-[8px] grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[32px]">
          <div
            v-for="(branch, b) in workflow.branches"
            :key="branch.head"
            class="flex flex-col items-stretch"
          >
            <!-- 分支头 ↓：md:block 显示（叠放时上不去）。两条分支 --wd 相同——
                 采购和生产本来并行，波不该有先后 -->
            <span
              class="flow-arrow mb-[8px] hidden text-center text-[16px] leading-[20px] text-[#82bda2] md:block"
              :style="{ '--wd': '1600ms' }"
              aria-hidden="true"
              >↓</span
            >

            <!-- 分支名条：h-[36px]、rounded-[8px]、13px/18px 加粗，色板见 script branchClass -->
            <div
              class="reveal flex h-[36px] items-center justify-center rounded-[8px] border text-[13px] font-semibold leading-[18px]"
              :class="branchClass[branch.tone]"
              :style="{ '--d': `${330 + b * 50}ms` }"
            >
              {{ branch.head }}
            </div>

            <!-- 中间步骤：h-[36px]、rounded-[8px]、白底，边框色见 script stepClass -->
            <template v-for="(step, s) in branch.steps" :key="step">
              <span
                class="flow-arrow my-[5px] text-center text-[16px] leading-[18px] text-[#82bda2]"
                :style="{ '--wd': `${2000 + s * 400}ms` }"
                aria-hidden="true"
                >↓</span
              >
              <div
                class="reveal flex h-[36px] items-center justify-center rounded-[8px] border text-[13px] leading-[18px]"
                :class="stepClass[branch.tone]"
                :style="{ '--d': `${360 + b * 50 + s * 35}ms` }"
              >
                {{ step }}
              </div>
            </template>

            <!-- 收尾条：tail.tone 为 tinted 时沿用分支色调（左浅橙 / 右绿实心） -->
            <span
              class="flow-arrow my-[5px] text-center text-[16px] leading-[18px] text-[#82bda2]"
              :style="{ '--wd': '3200ms' }"
              aria-hidden="true"
              >↓</span
            >
            <div
              class="reveal flex h-[36px] items-center justify-center rounded-[8px] border text-[13px] font-semibold leading-[18px]"
              :class="branchClass[branch.tail.tone === 'tinted' ? branch.tone : branch.tail.tone]"
              :style="{ '--d': `${460 + b * 50}ms` }"
            >
              {{ branch.tail.text }}
            </div>
          </div>
        </div>

        <!-- 底部汇合提示：rounded-[10px]、border #dcebe6 / 底 #f1faf5（跟生产计划同套绿）；
             px-[20px] py-[14px]（lg 起 h-[48px] 定高垂直居中）；绿点 w-[6px] h-[6px] 开头 -->
        <div
          class="reveal mt-[24px] flex items-center gap-[12px] rounded-[10px] border border-[#dcebe6] bg-[#f1faf5] px-[20px] py-[14px] lg:h-[48px] lg:py-0"
          style="--d: 560ms"
        >
          <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-[#57d193]" aria-hidden="true" />
          <p class="text-[13px] leading-[22px] text-[#4b5b52]">{{ workflow.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.diamond {
  width: 176px;
  height: 94px;
  background: #13322a;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.flow-arrow {
  animation: flow-pulse 7s ease-in-out infinite;
  animation-delay: var(--wd, 0ms);
  animation-play-state: paused;
}

@keyframes flow-pulse {
  0%,
  100% {
    color: #82bda2;
  }
  5% {
    color: #2f9e66;
  }
  13% {
    color: #82bda2;
  }
}

.in .flow-arrow {
  animation-play-state: running;
}

@media (prefers-reduced-motion: reduce) {
  .flow-arrow {
    animation: none;
  }
}
</style>
