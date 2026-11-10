<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 服务支持第二屏：服务内容
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconSurvey from '@/assets/support/icons/scope-survey.webp'
import iconInit from '@/assets/support/icons/scope-init.webp'
import iconMigrate from '@/assets/support/icons/scope-migrate.webp'
import iconTraining from '@/assets/support/icons/scope-training.webp'
import iconLaunch from '@/assets/support/icons/scope-launch.webp'
import iconAccept from '@/assets/support/icons/scope-accept.webp'
import iconAftercare from '@/assets/support/icons/scope-aftercare.webp'
import iconPlus from '@/assets/support/icons/scope-plus.webp'

/**
 * 第二屏：实施交付包含八项内容（原型 S1）。
 * 纯白底卡片网格，图标素材自带浅绿圆角底（176px 原图，44px 展示）。
 * 卡片文案比首页服务卡长不少，四列只在 xl 开，md 先两列保证不挤。
 */
const { scope } = siteConfig.support

// icon 短名 → 素材，换图只动这里；键名跟 config 里的 icon 一一对应，少写一个编译就报错
const iconMap: Record<(typeof scope.cards)[number]['icon'], string> = {
  survey: iconSurvey,
  init: iconInit,
  migrate: iconMigrate,
  training: iconTraining,
  launch: iconLaunch,
  accept: iconAccept,
  aftercare: iconAftercare,
  plus: iconPlus,
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：白底，上留白 88px、下 96px（下面接浅灰绿底的流程屏） -->
  <section ref="root" class="bg-white pb-[96px] pt-[88px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ scope.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ scope.title }}
      </h2>

      <!-- 说明：mt-[24px] 与标题间距 24px；14px/24px、ink-600，不限宽让它自然占满一行 -->
      <p class="reveal mt-[24px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ scope.desc }}
      </p>

      <!-- 卡片栅格：mt-[36px] 与说明间距 36px、gap 18px；
           手机 1 列 → sm 2 列 → xl 4 列，每张错峰 60ms 浮入 -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(card, i) in scope.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] border border-[#efefef] bg-white p-[24px]"
          :style="{ '--d': `${240 + i * 60}ms` }"
        >
          <!-- 图标：44×44，素材自带浅绿圆角底，八张同色系不交替 -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[44px] w-[44px] select-none"
          />
          <!-- 卡标题：mt-[18px] 与图标间距 18px；16px/24px 加粗 -->
          <h3 class="mt-[18px] text-[16px] font-bold leading-[24px] text-ink-900">
            {{ card.title }}
          </h3>
          <!-- 正文：mt-[10px] 与标题间距 10px；13px/22px、ink-600 -->
          <p class="mt-[10px] text-[13px] leading-[22px] text-ink-600">{{ card.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
