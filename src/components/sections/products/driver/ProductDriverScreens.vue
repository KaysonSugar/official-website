<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端第四屏：核心界面一览
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import DriverScreenMock from './DriverScreenMock.vue'

const { screens } = siteConfig.driver

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.08em] text-brand-500"
        style="--d: 0ms"
      >
        {{ screens.eyebrow }}
      </p>
      <h2
        class="reveal mt-[16px] text-[30px] font-bold leading-[40px] text-ink-900"
        style="--d: 80ms"
      >
        {{ screens.title }}
      </h2>
      <p class="reveal mt-[12px] text-[14px] leading-[24px] text-[#6b6b6b]" style="--d: 160ms">
        {{ screens.desc }}
      </p>

      <!-- 四列手机界面：编号橙色小字 + 场景名 + DOM 画的界面。
           卡片直接铺满列宽（列宽 338，之前收 6% 只有 274）——里面是手机界面小字，
           图越小字越难认，这里把空间全给图；列间距 24→20 也是为了让四张图更大 -->
      <div class="mt-[36px] grid gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        <figure
          v-for="(item, i) in screens.items"
          :key="item.no"
          class="reveal"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <figcaption class="flex items-baseline gap-[8px]">
            <span class="text-[12px] font-bold leading-[17px] tabular-nums text-brand-500">{{
              item.no
            }}</span>
            <span class="text-[15px] font-bold leading-[21px] text-ink-900">{{ item.label }}</span>
          </figcaption>
          <!-- 界面用 DOM 画（DriverScreenMock）：固定 610×822 画布按列宽缩放，字形永远是矢量。
               标题跟截图同一条左缘（figure 不再缩进，都在列左边缘）。
               hover 由组件内的 card-lift 接管（投影浮现、卡片不动），跟本页其他卡片同一套 -->
          <DriverScreenMock :kind="item.img" class="mt-[14px]" />
        </figure>
      </div>
    </div>
  </section>
</template>
