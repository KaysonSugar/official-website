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

/**
 * 第七屏：生产主流程图（原型 07）。
 * 纯文字流程图，零图标素材：顶部四节点 → 菱形判断（CSS 旋转方块）
 * → 左右两条分支各四个条目 → 底部汇合提示条。
 */
const { workflow } = siteConfig

// 顶部节点：底色极淡（原型 #fff8f2 / #f1faf5），边框是同色系浅一档；
// plain 是白底节点，边框跟「生产计划」取同一个绿
const nodeClass: Record<string, string> = {
  orange: 'border-[#fbe2dd] bg-[#fff8f2] text-[#b0602f]',
  green: 'border-[#dcebe6] bg-[#f1faf5] text-[#2f8a5f]',
  plain: 'border-[#dcebe6] bg-white text-ink-800',
}

// 分支名条 / 浅色收尾条：比顶部节点深一档，边框跟着重一点
const branchClass: Record<string, string> = {
  orange: 'border-[#f0d5c4] bg-[#fff1e8] text-[#b0602f]',
  green: 'border-[#d0e5de] bg-[#e9f6ef] text-[#2f8a5f]',
  solid: 'border-transparent bg-[#2f9e66] text-white',
}

// 中间步骤：采购分支白底暖边，生产分支只换边框成生产计划的绿，底仍是白的
const stepClass: Record<string, string> = {
  orange: 'border-[#f0d5c4] bg-white text-ink-700',
  green: 'border-[#dcebe6] bg-white text-ink-700',
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-[#f1faf5] pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：跟前几屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ workflow.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ workflow.title }}
      </h2>

      <!-- 一行说明：14px 弱化灰 -->
      <p
        class="reveal mt-[32px] max-w-[860px] text-[14px] leading-[22px] text-ink-600"
        style="--d: 160ms"
      >
        {{ workflow.desc }}
      </p>

      <!-- 流程图面板：白底描边卡，内部从上到下四段 -->
      <div
        class="reveal mt-[36px] rounded-[16px] border border-ink-100 bg-white p-[24px] shadow-[0_18px_40px_-30px_rgba(26,26,26,0.12)] sm:p-[32px]"
        style="--d: 240ms"
      >
        <!-- 顶部主流程：节点 + → 箭头一行排开；窄屏竖排、箭头隐藏 -->
        <div class="flex flex-col gap-[8px] lg:flex-row lg:items-center">
          <template v-for="(node, i) in workflow.topNodes" :key="node.text">
            <div
              class="reveal flex h-[48px] flex-1 items-center justify-center rounded-[8px] border px-[12px] text-center text-[13px] leading-[18px] font-medium"
              :class="nodeClass[node.tone]"
              :style="{ '--d': `${320 + i * 60}ms` }"
            >
              {{ node.text }}
            </div>
            <!-- 箭头：最后一个节点后面没有；窄屏隐藏（竖排时箭头没意义）。
                 flow-arrow + --wd 是箭头波：按流程顺序延迟点亮，见 scoped 里的 keyframes -->
            <span
              v-if="node.arrow"
              class="flow-arrow hidden shrink-0 px-[6px] text-[16px] text-[#82bda2] lg:block"
              :style="{ '--wd': `${i * 400}ms` }"
              aria-hidden="true"
              >→</span
            >
          </template>
        </div>

        <!-- 判断菱形：原型是扁长的（约 176×94，比高宽两倍），用 clip-path 裁
             方块旋转只能在正方形时才等边，非等比会连圆角一起拉变形 -->
        <div class="reveal mt-[6px] flex flex-col items-center" style="--d: 580ms">
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

        <!-- 两条分支：左右并排，各自带 ↓ 箭头串起条目；窄屏先左后右叠放 -->
        <div class="mt-[8px] grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[32px]">
          <div
            v-for="(branch, b) in workflow.branches"
            :key="branch.head"
            class="flex flex-col items-stretch"
          >
            <!-- 每条分支自己的 ↓，窄屏隐藏（叠放时上不去）。两条分支同一时刻点亮
                 （--wd 相同）：采购和生产本来就是并行的，波不该有先后 -->
            <span
              class="flow-arrow mb-[8px] hidden text-center text-[16px] leading-[20px] text-[#82bda2] md:block"
              :style="{ '--wd': '1600ms' }"
              aria-hidden="true"
              >↓</span
            >

            <!-- 分支名条：比顶部节点深一档的浅底 -->
            <div
              class="reveal flex h-[36px] items-center justify-center rounded-[8px] border text-[13px] font-semibold leading-[18px]"
              :class="branchClass[branch.tone]"
              :style="{ '--d': `${640 + b * 80}ms` }"
            >
              {{ branch.head }}
            </div>

            <!-- 中间步骤：采购分支白底 + 暖灰边框；生产分支跟顶部生产计划同色（绿边浅绿底） -->
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
                :style="{ '--d': `${680 + b * 80 + s * 60}ms` }"
              >
                {{ step }}
              </div>
            </template>

            <!-- 收尾条：tinted 沿用所在分支的色调（左浅橙 / 右深绿实心） -->
            <span
              class="flow-arrow my-[5px] text-center text-[16px] leading-[18px] text-[#82bda2]"
              :style="{ '--wd': '3200ms' }"
              aria-hidden="true"
              >↓</span
            >
            <div
              class="reveal flex h-[36px] items-center justify-center rounded-[8px] border text-[13px] font-semibold leading-[18px]"
              :class="branchClass[branch.tail.tone === 'tinted' ? branch.tone : branch.tail.tone]"
              :style="{ '--d': `${880 + b * 80}ms` }"
            >
              {{ branch.tail.text }}
            </div>
          </div>
        </div>

        <!-- 底部汇合提示：跟顶部生产计划同一套绿（#dcebe6 边框 / #f1faf5 底）+ 绿点开头 -->
        <div
          class="reveal mt-[24px] flex items-center gap-[12px] rounded-[10px] border border-[#dcebe6] bg-[#f1faf5] px-[20px] py-[14px] lg:h-[48px] lg:py-0"
          style="--d: 1040ms"
        >
          <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-[#57d193]" aria-hidden="true" />
          <p class="text-[13px] leading-[22px] text-[#4b5b52]">{{ workflow.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 判断菱形：原型量出来 176×94（宽是高的一倍多点），四边形用 clip-path 直接裁，
   比 rotate 方块更省事——方块非等比旋转会把角拉变形，也留不住尖角 */
.diamond {
  width: 176px;
  height: 94px;
  background: #13322a;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* 箭头波：全部箭头按流程顺序（顶行 → 菱形 → 分支步骤 → 收尾）延迟点亮，
   静息态压到 0.7 透明度，波峰回到 1 —— 一道从上往下的"业务在流动"光波。
   只动 opacity：箭头是文字，动 transform 会在合成层里关次像素 AA，小字发虚 */
.flow-arrow {
  animation: flow-pulse 7s ease-in-out infinite;
  animation-delay: var(--wd, 0ms); /* 每个箭头在流程里的位置决定波到它的时刻 */
  animation-fill-mode: backwards; /* delay 窗口里就压到 0% 帧的 0.7，否则亮着等波才跳暗 */
  animation-play-state: paused; /* 视口外不空转，useReveal 加 .in 才开跑 */
}

/* 一轮 7s：波从头走到尾 3.2s，剩下 3.8s 全静息，别一直闪 */
@keyframes flow-pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  5% {
    opacity: 1; /* 350ms 亮到全亮 */
  }
  13% {
    opacity: 0.7; /* 560ms 内暗回静息 */
  }
}

/* 入场后（root 拿到 .in）箭头波才开跑 */
.in .flow-arrow {
  animation-play-state: running;
}

/* reduced-motion：infinite 动画必须自己关，全局 0.01ms 规则会把它变成疯狂空转；
   关掉后回到默认 opacity 1，跟原型一致 */
@media (prefers-reduced-motion: reduce) {
  .flow-arrow {
    animation: none;
  }
}
</style>
