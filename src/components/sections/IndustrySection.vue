<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页第二屏：行业背景与法规驱动
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import shieldIcon from '@/assets/home/icons/shield.png'
import chipIcon from '@/assets/home/icons/chip.png'
import banIcon from '@/assets/home/icons/ban.png'
import pinIcon from '@/assets/home/icons/pin.png'

/**
 * 第二屏：行业背景与法规驱动（原型 02）。
 * 结构很简单：眉题 + 大标题 + 一行说明 + 四张法规卡 + 底部提示条。
 * 卡片图标素材自带浅色圆角底，直接当图片用，不用再套底色。
 */
const { industry } = siteConfig

// icon 名 → 素材。配置里存短名，素材换图只动这里
const iconMap = { shield: shieldIcon, chip: chipIcon, ban: banIcon, pin: pinIcon }

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块底：白到浅灰绿的细微渐变，原型上几乎看不出来的那层；
       内边距在原型基础上加宽：上 90 / 下 80（用户要求上+40 下+30） -->
  <section
    ref="root"
    class="bg-[linear-gradient(180deg,#ffffff_0%,#fafbfa_100%)] pb-[64px] pt-[96px]"
  >
    <div class="container-page">
      <!-- 眉题：11px 橙色小字，宽字距，原型里的「英文 / 中文」一行 -->
      <p
        class="reveal mt-[46px] text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-700 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ industry.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗，比首屏 48px 低一档 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ industry.title }}
      </h2>

      <!-- 一行说明：14px 弱化灰 -->
      <p class="reveal mt-[46px] text-[14px] leading-[22px] text-ink-600" style="--d: 160ms">
        {{ industry.desc }}
      </p>

      <!-- 四张法规卡：间距 20，卡片宽 (1280-60)/4=305；窄屏降 2 列 / 1 列 -->
      <div class="mt-[44px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(card, i) in industry.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] border border-ink-100 bg-white p-[24px]"
          :style="{ '--d': `${200 + i * 100}ms` }"
        >
          <!-- 图标：素材 176×176 自带圆角浅底，显示 42 -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[42px] w-[42px] select-none"
          />

          <!-- 条款号：11px 焦橙，原型里比眉题深一档 -->
          <p
            class="mt-[18px] text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-700"
          >
            {{ card.label }}
          </p>

          <!-- 卡片标题：16px 加粗 -->
          <h3 class="mt-[14px] text-[16px] font-bold leading-[24px] text-ink-900">
            {{ card.title }}
          </h3>

          <!-- 卡片正文：13px / 22 行高，和卡标题贴得近 -->
          <p class="mt-[6px] text-[13px] leading-[22px] text-ink-600">
            {{ card.desc }}
          </p>
        </article>
      </div>

      <!-- 平台响应提示条：72 高浅橙底，左侧 3px 橙竖条，文字暖棕 -->
      <div
        class="reveal mt-[46px] flex h-[72px] items-center gap-[16px] rounded-[12px] bg-[#fff6ef] pl-[24px] pr-[24px]"
        style="--d: 600ms"
      >
        <span class="h-[36px] w-[3px] shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
        <p class="text-[13px] leading-[22px] text-[#6b5138]">{{ industry.note }}</p>
      </div>
    </div>
  </section>
</template>
