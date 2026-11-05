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
 * 纯白底四列卡片网格，图标素材自带浅绿圆角底（176px 原图，44px 展示）。
 * 卡片文案比首页服务卡长不少，四列在 xl 才开，md 先两列保证不挤。
 */
const { scope } = siteConfig.support

// icon 短名 → 素材，换图只动这里
const iconMap = {
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
  <section ref="root" class="bg-white pb-[96px] pt-[88px]">
    <div class="container-page">
      <!-- 眉题：全站同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-700 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ scope.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗，跟首页各屏一致 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ scope.title }}
      </h2>

      <!-- 一行说明：14px 弱化灰 -->
      <p class="reveal mt-[24px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ scope.desc }}
      </p>

      <!-- 八张卡：xl 四列 / md 两列 / 手机单列。逐张错峰浮入 -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(card, i) in scope.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] border border-[#efefef] bg-white p-[24px]"
          :style="{ '--d': `${240 + i * 60}ms` }"
        >
          <!-- 图标素材自带浅绿圆角底，44px；八张卡图标同色系，不用交替 -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[44px] w-[44px] select-none"
          />
          <h3 class="mt-[18px] text-[16px] font-bold leading-[24px] text-ink-900">
            {{ card.title }}
          </h3>
          <p class="mt-[10px] text-[13px] leading-[22px] text-ink-600">{{ card.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
