<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第七屏：生产主流程图
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '@/config/site'

/**
 * 第七屏：生产主流程图（原型 07）。
 * 纯文字流程图，零图标素材：顶部四节点 → 菱形判断（CSS 旋转方块）
 * → 左右两条分支各四个条目 → 底部汇合提示条。
 */
const { workflow } = siteConfig

// 顶部节点：底色极淡（原型 #fff8f2 / #f1faf5），边框是同色系浅一档；
// BOM 节点白底但边框按用户要求统一橙色
const nodeClass: Record<string, string> = {
  orange: 'border-[#fbe2dd] bg-[#fff8f2] text-[#b0602f]',
  green: 'border-[#dcebe6] bg-[#f1faf5] text-[#2f8a5f]',
  plain: 'border-[#f0d5c4] bg-white text-ink-800',
}

// 分支名条 / 浅色收尾条：比顶部节点深一档，边框跟着重一点
const branchClass: Record<string, string> = {
  orange: 'border-[#f0d5c4] bg-[#fff1e8] text-[#b0602f]',
  green: 'border-[#d0e5de] bg-[#e9f6ef] text-[#2f8a5f]',
  solid: 'border-transparent bg-[#2f9e66] text-white',
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
  <section ref="root" class="bg-[#f1faf5] pb-[80px] pt-[100px]">
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
      <p class="reveal mt-[32px] max-w-[860px] text-[14px] leading-[22px] text-ink-600" style="--d: 160ms">
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
            <!-- 箭头：最后一个节点后面没有；窄屏隐藏（竖排时箭头没意义） -->
            <span
              v-if="node.arrow"
              class="hidden shrink-0 px-[6px] text-[16px] text-[#82bda2] lg:block"
              aria-hidden="true"
              >→</span
            >
          </template>
        </div>

        <!-- 判断菱形：原型是扁长的（约 176×94，比高宽两倍），用 clip-path 裁
             方块旋转只能在正方形时才等边，非等比会连圆角一起拉变形 -->
        <div class="reveal mt-[6px] flex flex-col items-center" style="--d: 580ms">
          <span class="text-[16px] leading-[20px] text-[#82bda2]" aria-hidden="true">↓</span>
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
            <!-- 每条分支自己的 ↓，窄屏隐藏（叠放时上不去） -->
            <span
              class="mb-[8px] hidden text-center text-[16px] leading-[20px] text-[#82bda2] md:block"
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

            <!-- 中间步骤：白底 + 极淡暖灰边框，条目之间一条 ↓ -->
            <template v-for="(step, s) in branch.steps" :key="step">
              <span class="my-[5px] text-center text-[16px] leading-[18px] text-[#82bda2]" aria-hidden="true">↓</span>
              <div
                class="reveal flex h-[36px] items-center justify-center rounded-[8px] border border-[#f0d5c4] bg-white text-[13px] leading-[18px] text-ink-700"
                :style="{ '--d': `${680 + b * 80 + s * 60}ms` }"
              >
                {{ step }}
              </div>
            </template>

            <!-- 收尾条：tinted 沿用所在分支的色调（左浅橙 / 右深绿实心） -->
            <span class="my-[5px] text-center text-[16px] leading-[18px] text-[#82bda2]" aria-hidden="true">↓</span>
            <div
              class="reveal flex h-[36px] items-center justify-center rounded-[8px] border text-[13px] font-semibold leading-[18px]"
              :class="branchClass[branch.tail.tone === 'tinted' ? branch.tone : branch.tail.tone]"
              :style="{ '--d': `${880 + b * 80}ms` }"
            >
              {{ branch.tail.text }}
            </div>
          </div>
        </div>

        <!-- 底部汇合提示：浅灰绿条 + 绿点开头 -->
        <div
          class="reveal mt-[24px] flex items-center gap-[12px] rounded-[10px] bg-[#f2f5f3] px-[20px] py-[14px] lg:h-[48px] lg:py-0"
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

/* 入场跟前几屏同一套：.in 触发一次性动画，延迟走行内 --d */
.reveal {
  opacity: 0;
}

.in .reveal {
  opacity: 1;
  animation: wf-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes wf-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
  }

  .in .reveal {
    animation: none;
  }
}
</style>
