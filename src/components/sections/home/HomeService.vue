<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第十一屏：我们的服务
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import svcImplement from '@/assets/home/icons/svc-implement.webp'
import svcCustom from '@/assets/home/icons/svc-custom.webp'
import svcSupport from '@/assets/home/icons/svc-support.webp'

/**
 * 第十一屏：我们的服务（原型 S10）。
 * 纯白底三张服务卡：图标素材自带浅橙/浅绿圆角底，下面标题 + 小圆点列表。
 * 卡片内容长短不一（实施三条最长），靠 grid 等宽对齐。
 */
const { service } = siteConfig

// icon 名 → 素材。配置里存短名，换图只动这里
const iconMap = {
  implement: svcImplement,
  custom: svcCustom,
  support: svcSupport,
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：跟前几屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ service.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ service.title }}
      </h2>

      <!-- 一行说明：14px 弱化灰 -->
      <p class="reveal mt-[24px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ service.desc }}
      </p>

      <!-- 三张服务卡：浅灰细边框白卡。逐张错峰浮入 -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
        <article
          v-for="(card, i) in service.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] border border-[#efefef] bg-white p-[28px]"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- 图标素材自带浅色圆角底，46px 跟第六屏的功能卡一致 -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[46px] w-[46px] select-none"
          />
          <h3 class="mt-[20px] text-[16px] font-bold leading-[24px] text-ink-900">
            {{ card.title }}
          </h3>
          <!-- 小圆点列表：点用 3px 灰点，跟文字基线对齐 -->
          <ul class="mt-[14px] space-y-[10px]">
            <li
              v-for="item in card.items"
              :key="item"
              class="flex gap-[10px] text-[13px] leading-[22px] text-ink-600"
            >
              <span class="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-400" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
