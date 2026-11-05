<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 关于我们：企业理念
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconInnovation from '@/assets/about/icons/phil-innovation.webp'
import iconPersist from '@/assets/about/icons/phil-persist.webp'
import iconExecute from '@/assets/about/icons/phil-execute.webp'
import iconExcel from '@/assets/about/icons/phil-excel.webp'

/**
 * 企业理念（原型 S2）：浅绿底 #f5faf7，四个圆底图标横排 + 下方标签。
 * 图标素材自带白色圆底（原 560px 转 webp），显示 120px；标签黑字跟标题同色。
 */
const { philosophy } = siteConfig.about

const iconMap = {
  innovation: iconInnovation,
  persist: iconPersist,
  execute: iconExecute,
  excel: iconExcel,
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-[#f5faf7] pb-[64px] pt-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-700 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ philosophy.eyebrow }}
      </p>

      <h2 class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900" style="--d: 80ms">
        {{ philosophy.title }}
      </h2>

      <!-- 四个理念：grid 四列（手机两列），图标居中 + 标签居中 -->
      <div class="mt-[40px] grid grid-cols-2 gap-y-[32px] sm:grid-cols-4">
        <figure
          v-for="(item, i) in philosophy.items"
          :key="item.label"
          class="reveal flex flex-col items-center"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[item.icon]"
            alt=""
            aria-hidden="true"
            class="h-[104px] w-[104px] select-none md:h-[120px] md:w-[120px]"
          />
          <figcaption class="mt-[18px] text-[14px] font-medium leading-[20px] text-ink-900">
            {{ item.label }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
