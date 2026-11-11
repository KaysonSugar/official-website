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
import iconMaterial from '@/assets/products/chemical/icons/report-material.webp'
import iconFinance from '@/assets/products/chemical/icons/report-finance.webp'
import iconPurchase from '@/assets/products/chemical/icons/report-purchase.webp'
import iconProduction from '@/assets/products/chemical/icons/report-production.webp'

const { report } = siteConfig.chemical

// icon 短名 → 素材，换图只动这里；键名跟 config 里的 icon 一一对应
const iconMap: Record<(typeof report.cards)[number]['icon'], string> = {
  material: iconMaterial,
  finance: iconFinance,
  purchase: iconPurchase,
  production: iconProduction,
}

// tone → 标题色 / 对勾圆底色 / 勾线色 / 标题下分隔线色。
// 分隔线比对勾圆底略深一档，托得住但不抢
type ReportTone = (typeof report.cards)[number]['tone']

const toneClass: Record<ReportTone, { title: string; check: string; glyph: string; line: string }> =
  {
    green: {
      title: 'text-[#17795c]',
      check: 'bg-[#e2f3ea]',
      glyph: '#1c8a66',
      line: 'bg-[#d5ebdf]',
    },
    orange: {
      title: 'text-[#ff833f]',
      check: 'bg-[#ffeede]',
      glyph: '#e9611f',
      line: 'bg-[#ffe3cf]',
    },
  }

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：浅绿底 #f4f8f5，跟企业理念屏同族；上下留白各 96px -->
  <section ref="root" class="bg-[#f4f8f5] pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ report.eyebrow }}
      </p>
      <!-- 标题：mt-[24px] 与眉题间距 24px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ report.title }}
      </h2>
      <!-- 说明：mt-[14px] 与标题间距 14px，max-w 720px；14px/24px 灰绿 -->
      <p
        class="reveal mt-[14px] max-w-[720px] text-[14px] leading-[24px] text-[#5e7169]"
        style="--d: 160ms"
      >
        {{ report.desc }}
      </p>

      <!-- 四张维度卡：mt-[40px] 与说明间距 40px、gap 16px；
           手机单列 → md 2 列 → xl 4 列，每张错峰 90ms -->
      <div class="mt-[40px] grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(card, i) in report.cards"
          :key="card.title"
          class="reveal card-lift rounded-[14px] border border-[#e3ebe6] bg-white p-[22px]"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <!-- 卡头：图标跟标题横排 gap 14px；hover 时图标放大 1.06（样式见末尾），
               卡里只有这一张 tile 图，选 .card-lift img 不会误伤别的装饰图 -->
          <div class="flex items-center gap-[14px]">
            <img
              loading="lazy"
              decoding="async"
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="h-[44px] w-[44px] shrink-0 select-none"
            />
            <!-- 标题：16px/24px 加粗，颜色跟 tone 走（物资/生产绿、资金/采购橙） -->
            <h3 class="text-[16px] font-bold leading-[24px]" :class="toneClass[card.tone].title">
              {{ card.title }}
            </h3>
          </div>

          <!-- 标题下分隔线：mt-[14px]，1px 通栏，颜色跟 tone 走 -->
          <div
            class="mt-[14px] h-px w-full"
            :class="toneClass[card.tone].line"
            aria-hidden="true"
          />

          <!-- 报表清单：mt-[18px] 起、行距 16px；18px 浅色圆底 + 彩色对勾 -->
          <ul class="mt-[18px] flex flex-col gap-[16px]">
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
              <!-- 条目文字：13px/22px 灰绿 -->
              <span class="text-[13px] leading-[22px] text-[#5e7169]">{{ item }}</span>
            </li>
          </ul>
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
