<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 服务支持第四屏：实施方式与计费
-->
<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconRemote from '@/assets/support/icons/price-remote.webp'
import iconOnsite from '@/assets/support/icons/price-onsite.webp'
import iconPlus from '@/assets/support/icons/price-plus.webp'

/**
 * 第四屏：线上远程与线下上门，按方式分别计费（原型 S3）。
 * 三张卡：两张白卡（细边框），线下上门那张是暖橙卡——浅橙底无边框，
 * 列表文字和小点都是暖棕（#5a4636），底部小字也偏暖（#b08a6a），
 * 跟白卡的灰绿（#4a5a52 / #8fa8a0）刻意区分，色值都从原图采样。
 */
const { pricing } = siteConfig.support

// icon 短名 → 素材，换图只动这里；键名跟 config 里的 icon 一一对应
const iconMap: Record<(typeof pricing.cards)[number]['icon'], string> = {
  remote: iconRemote,
  onsite: iconOnsite,
  plus: iconPlus,
}

// 暖卡 / 白卡两套配色收成一张表，模板里取 card.tone.xxx 就行，不用写三处三目
const toneMap = {
  warm: {
    card: 'bg-[#fff8f1]',
    item: 'text-[#5a4636]',
    dot: 'bg-[#5a4636]',
    foot: 'text-[#b08a6a]',
  },
  plain: {
    card: 'border border-[#efefef] bg-white',
    item: 'text-[#4a5a52]',
    dot: 'bg-[#4a5a52]',
    foot: 'text-[#8fa8a0]',
  },
}

// 每张卡先把配色挂上去，模板里少算一遍
const cards = computed(() =>
  pricing.cards.map((card) => ({ ...card, tone: card.warm ? toneMap.warm : toneMap.plain })),
)

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：白底，上留白 88px、下 96px（下面接深绿底的服务承诺屏） -->
  <section ref="root" class="bg-white pb-[96px] pt-[88px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ pricing.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ pricing.title }}
      </h2>

      <!-- 说明：mt-[24px] 与标题间距 24px，max-w 820px 一行不超 820px；14px/24px、ink-600 -->
      <p
        class="reveal mt-[24px] max-w-[820px] text-[14px] leading-[24px] text-ink-600"
        style="--d: 160ms"
      >
        {{ pricing.desc }}
      </p>

      <!-- 三张卡：mt-[36px] 与说明间距 36px、gap 18px；手机 1 列 → md 3 列，每张错峰 80ms -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
        <article
          v-for="(card, i) in cards"
          :key="card.title"
          class="reveal card-lift rounded-[14px] p-[28px]"
          :class="card.tone.card"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- 图标：44×44 跟上一屏八卡同规格，素材自带浅绿 / 浅橙圆角底 -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[44px] w-[44px] select-none"
          />
          <!-- 卡标题：mt-[20px] 与图标间距 20px；18px/26px 加粗 -->
          <h3 class="mt-[20px] text-[18px] font-bold leading-[26px] text-ink-900">
            {{ card.title }}
          </h3>

          <!-- 计费条目：mt-[16px] 与标题间距 16px，行间 space-y-[12px]；小点跟文字同色 -->
          <ul class="mt-[16px] space-y-[12px]">
            <li
              v-for="item in card.items"
              :key="item"
              class="flex gap-[10px] text-[13px] leading-[22px]"
              :class="card.tone.item"
            >
              <!-- 4×4 圆点，mt-[9px] 压到第一行文字的中线 -->
              <span class="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full" :class="card.tone.dot" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- 底部适用范围 / 报价说明：mt-[20px] 与列表间距 20px，13px/20px -->
          <p class="mt-[20px] text-[13px] leading-[20px]" :class="card.tone.foot">
            {{ card.foot }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
