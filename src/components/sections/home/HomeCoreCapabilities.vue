<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第六屏：核心功能详解
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import fnOrder from '@/assets/home/icons/fn-order.webp'
import fnBom from '@/assets/home/icons/fn-bom.webp'
import fnStock from '@/assets/home/icons/fn-stock.webp'
import fnPurchase from '@/assets/home/icons/fn-purchase.webp'
import fnProcess from '@/assets/home/icons/fn-process.webp'
import fnSales from '@/assets/home/icons/fn-sales.webp'

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
        {{ capabilities.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ capabilities.title }}
      </h2>

      <!-- 说明：mt-[48px] 与标题间距 48px；max-w-[880px] 限宽、14px/24px、ink-600 弱灰 -->
      <p
        class="reveal mt-[48px] max-w-[880px] text-[14px] leading-[24px] text-ink-600"
        style="--d: 160ms"
      >
        {{ capabilities.desc }}
      </p>

      <!-- 功能卡栅格：mt-[40px] 与说明间距 40px；gap-[24px]；
           手机 1 列 → sm 2 列 → lg 3 列，卡片逐张错峰 70ms 浮入 -->
      <div class="mt-[40px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(card, i) in capabilities.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] bg-[#fafbfa] p-[24px]"
          :style="{ '--d': `${240 + i * 70}ms` }"
        >
          <!-- 图标：固定 46×46（h-[46px] w-[46px]），素材自带圆角浅底、橙绿交替；
               hover 卡片时放大到 1.06（写在末尾 style 里） -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[46px] w-[46px] select-none"
          />

          <!-- 卡标题：mt-[16px] 与图标间距 16px；16px/24px 加粗 -->
          <h3 class="mt-[16px] text-[16px] font-bold leading-[24px] text-ink-900">
            {{ card.title }}
          </h3>

          <!-- 卡正文：mt-[8px] 与标题间距 8px；13px/22px、ink-600 -->
          <p class="mt-[8px] text-[13px] leading-[22px] text-ink-600">{{ card.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-lift img {
  transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-lift:hover img {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .card-lift img {
    transition: none;
  }

  .card-lift:hover img {
    transform: none;
  }
}
</style>
