<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 化工生产第四屏：报表中心（四个维度自动成表）
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconMaterial from '@/assets/products/chemical/icons/report-material.png'
import iconFinance from '@/assets/products/chemical/icons/report-finance.png'
import iconPurchase from '@/assets/products/chemical/icons/report-purchase.png'
import iconProduction from '@/assets/products/chemical/icons/report-production.png'

/**
 * 报表中心（原型 P 报表中心）：浅绿底，四张白卡各管一个报表维度。
 * 卡素材自带的圆角 tile 图标直接用；标题与对勾跟 tone 走色——
 * 物资/生产与销售是绿，资金/采购是橙，对勾是浅色圆底 + 彩色勾。
 */
const { report } = siteConfig.chemical

const iconMap = {
  material: iconMaterial,
  finance: iconFinance,
  purchase: iconPurchase,
  production: iconProduction,
}

const toneClass = {
  green: {
    title: 'text-[#17795c]',
    check: 'bg-[#e2f3ea]',
    glyph: '#1c8a66',
  },
  orange: {
    title: 'text-[#ff833f]',
    check: 'bg-[#ffeede]',
    glyph: '#e9611f',
  },
} as const

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 浅绿底，跟企业理念屏同族 -->
  <section ref="root" class="bg-[#f4f8f5] pb-[96px] pt-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-700 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ report.eyebrow }}
      </p>
      <h2 class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900" style="--d: 80ms">
        {{ report.title }}
      </h2>
      <p class="reveal mt-[14px] max-w-[720px] text-[14px] leading-[24px] text-[#5e7169]" style="--d: 160ms">
        {{ report.desc }}
      </p>

      <!-- 四张维度卡：xl 四列 / md 两列 / 手机单列 -->
      <div class="mt-[40px] grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(card, i) in report.cards"
          :key="card.title"
          class="reveal rounded-[14px] border border-[#e3ebe6] bg-white p-[22px] transition-transform duration-500 ease-out will-change-transform hover:-translate-y-2"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <div class="flex items-center gap-[14px]">
            <img
              loading="lazy"
              decoding="async"
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="h-[44px] w-[44px] shrink-0 select-none"
            />
            <h3 class="text-[16px] font-bold leading-[24px]" :class="toneClass[card.tone].title">
              {{ card.title }}
            </h3>
          </div>

          <!-- 报表清单：浅色圆底 + 彩色对勾 -->
          <ul class="mt-[20px] flex flex-col gap-[16px]">
            <li v-for="item in card.items" :key="item" class="flex items-start gap-[12px]">
              <span
                class="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                :class="toneClass[card.tone].check"
                aria-hidden="true"
              >
                <svg class="h-[9px] w-[11px]" viewBox="0 0 11 9" fill="none">
                  <path
                    d="M1.5 4.5 4 7l5.5-5.5"
                    :stroke="toneClass[card.tone].glyph"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="text-[13px] leading-[22px] text-[#5e7169]">{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
