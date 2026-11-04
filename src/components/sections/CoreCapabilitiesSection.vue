<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第六屏：核心功能详解
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '@/config/site'
import fnOrder from '@/assets/home/icons/fn-order.png'
import fnBom from '@/assets/home/icons/fn-bom.png'
import fnStock from '@/assets/home/icons/fn-stock.png'
import fnPurchase from '@/assets/home/icons/fn-purchase.png'
import fnProcess from '@/assets/home/icons/fn-process.png'
import fnSales from '@/assets/home/icons/fn-sales.png'

/**
 * 第六屏：核心功能详解（原型 06）。
 * 简单的一屏：眉题 + 标题 + 两行说明 + 六张功能卡（2 行 3 列）。
 * 卡片图标素材自带浅色圆角底，橙绿交替，直接当图片用。
 */
const { capabilities } = siteConfig

// icon 名 → 素材。配置里存短名，换图只动这里
const iconMap = {
  order: fnOrder,
  bom: fnBom,
  stock: fnStock,
  purchase: fnPurchase,
  process: fnProcess,
  sales: fnSales,
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
        {{ capabilities.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ capabilities.title }}
      </h2>

      <!-- 两行说明：14px 弱化灰，限宽对齐原型换行位置 -->
      <p class="reveal mt-[48px] max-w-[880px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ capabilities.desc }}
      </p>

      <!-- 六张功能卡：2 行 3 列；浅灰卡底无描边，图标橙绿交替。
           逐张错峰 70ms 浮入，整组一起冒出来看着跟没动画一样 -->
      <div class="mt-[40px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(card, i) in capabilities.cards"
          :key="card.title"
          class="reveal rounded-[16px] bg-[#fafbfa] p-[24px]"
          :style="{ '--d': `${240 + i * 70}ms` }"
        >
          <img :src="iconMap[card.icon]" alt="" class="h-[46px] w-[46px] select-none" />
          <h3 class="mt-[16px] text-[16px] font-bold leading-[24px] text-ink-900">{{ card.title }}</h3>
          <p class="mt-[8px] text-[13px] leading-[22px] text-ink-600">{{ card.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 入场跟前几屏同一套：.in 触发一次性动画，延迟走行内 --d。
   六张卡各自 --d 错峰，网格容器本身不做动画 */
.reveal {
  opacity: 0;
}

.in .reveal {
  opacity: 1;
  animation: cp-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes cp-rise {
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
