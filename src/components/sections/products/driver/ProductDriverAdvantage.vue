<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端第二屏：平台优势四枚插画
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconSource from '@/assets/products/driver/icons/source-direct.webp'
import iconRoundtrip from '@/assets/products/driver/icons/roundtrip.webp'
import iconSafer from '@/assets/products/driver/icons/safer.webp'
import iconEarn from '@/assets/products/driver/icons/earn-more.webp'

/**
 * 平台优势（原型 B 平台优势）：眉题右侧一根细线拉通，
 * 下面四列居中排——圆形插画 + 标题 + 一句说明。插画是现成素材图。
 */
const { advantage } = siteConfig.driver

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const iconMap = {
  'source-direct': iconSource,
  roundtrip: iconRoundtrip,
  safer: iconSafer,
  'earn-more': iconEarn,
} as const
</script>

<template>
  <section ref="root" class="bg-white pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题 + 细线拉通 -->
      <div class="reveal flex items-center gap-[20px]">
        <p
          class="shrink-0 text-[12px] font-semibold leading-[18px] tracking-[0.08em] text-brand-500"
        >
          {{ advantage.eyebrow }}
        </p>
        <span class="h-px flex-1 bg-ink-100" aria-hidden="true" />
      </div>

      <!-- 四列：插画 + 标题 + 说明 -->
      <div class="mt-[48px] grid gap-[32px] sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(item, i) in advantage.items"
          :key="item.title"
          class="reveal flex flex-col items-center text-center"
          :style="{ '--d': `${i * 90}ms` }"
        >
          <!-- 插画悬停轻微放大：6% 以内不糊。纯图片没有文字，不需要防合成层，
               也就别加 will-change——那是给有文字的卡片避坑用的反向操作。
               本屏在首屏以下，四张 120px 图标全部懒加载，不跟首屏抢带宽 -->
          <img
            :src="iconMap[item.icon]"
            alt=""
            aria-hidden="true"
            class="h-[120px] w-[120px] select-none transition-transform duration-500 ease-out hover:scale-[1.06]"
            loading="lazy"
            decoding="async"
          />
          <h3 class="mt-[22px] text-[17px] font-bold leading-[24px] text-ink-900">
            {{ item.title }}
          </h3>
          <p class="mt-[10px] max-w-[240px] text-[13px] leading-[22px] text-[#6b6b6b]">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
