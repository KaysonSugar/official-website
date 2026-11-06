<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端第三屏：接单作业四步
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 接单作业四步（原型 D）：四张步骤卡 + 深绿横幅。
 * 卡片底色：01 浅橙 / 02 03 白卡描边 / 04 浅薄荷；
 * 编号颜色照原型前两步橙、后两步绿（跟卡片底色不完全对应，别"修"它）。
 */
const { workflow } = siteConfig.driver

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const cardTone = {
  orange: 'bg-[#fdf3ec]',
  plain: 'bg-white ring-1 ring-ink-100',
  green: 'bg-[#eef7f2]',
} as const
</script>

<template>
  <section ref="root" class="bg-white pb-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.08em] text-brand-500"
        style="--d: 0ms"
      >
        {{ workflow.eyebrow }}
      </p>
      <h2
        class="reveal mt-[16px] text-[30px] font-bold leading-[40px] text-ink-900"
        style="--d: 80ms"
      >
        {{ workflow.title }}
      </h2>
      <p class="reveal mt-[12px] text-[14px] leading-[24px] text-[#6b6b6b]" style="--d: 160ms">
        {{ workflow.desc }}
      </p>

      <!-- 四张步骤卡。hover 换全局 card-lift（投影浮现、卡片不动），跟首页同款 -->
      <div class="mt-[36px] grid gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(step, i) in workflow.steps"
          :key="step.no"
          class="reveal card-lift rounded-[16px] p-[24px]"
          :class="cardTone[step.tone]"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <p
            class="text-[20px] font-bold leading-[28px] tabular-nums"
            :class="i < 2 ? 'text-brand-500' : 'text-[#2fae85]'"
          >
            {{ step.no }}
          </p>
          <h3 class="mt-[10px] text-[16px] font-bold leading-[22px] text-ink-900">
            {{ step.title }}
          </h3>
          <p class="mt-[8px] text-[13px] leading-[22px] text-[#6b6b6b]">{{ step.body }}</p>
        </article>
      </div>

      <!-- 深绿横幅三列 -->
      <div
        class="reveal mt-[24px] grid gap-[24px] rounded-[16px] bg-[#1d3a2e] px-[32px] py-[26px] sm:grid-cols-3"
        style="--d: 320ms"
      >
        <div v-for="item in workflow.banner" :key="item.title">
          <h3 class="text-[15px] font-bold leading-[21px] text-white">{{ item.title }}</h3>
          <p class="mt-[6px] text-[12px] leading-[19px] text-white/60">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
