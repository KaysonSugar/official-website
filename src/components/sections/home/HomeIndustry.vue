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
import shieldIcon from '@/assets/home/icons/shield.webp'
import chipIcon from '@/assets/home/icons/chip.webp'
import banIcon from '@/assets/home/icons/ban.webp'
import pinIcon from '@/assets/home/icons/pin.webp'

const { industry } = siteConfig

// icon 名 → 素材。配置里存短名，素材换图只动这里
const iconMap = { shield: shieldIcon, chip: chipIcon, ban: banIcon, pin: pinIcon }

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：bg-[linear-gradient] 白到浅灰绿（180deg，#ffffff → #fafbfa）；
       pt-[96px] 上留白 96px、pb-[64px] 下留白 64px -->
  <section
    ref="root"
    class="bg-[linear-gradient(180deg,#ffffff_0%,#fafbfa_100%)] pb-[64px] pt-[96px]"
  >
    <div class="container-page">
      <!-- 眉题：reveal 走入场；mt-[46px] 与区块顶间距 46px；11px/16px 加粗，
           字距 tracking 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal mt-[46px] text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ industry.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ industry.title }}
      </h2>

      <!-- 说明：mt-[46px] 与标题间距 46px；14px/22px、ink-600 弱灰 -->
      <p class="reveal mt-[46px] text-[14px] leading-[22px] text-ink-600" style="--d: 160ms">
        {{ industry.desc }}
      </p>

      <!-- 卡片栅格：mt-[44px] 与说明间距 44px；gap-[20px]；
           手机 grid-cols-1 → sm 2 列 → lg 4 列，卡片宽约 305px -->
      <div class="mt-[44px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(card, i) in industry.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] border border-ink-100 bg-white p-[24px]"
          :style="{ '--d': `${200 + i * 100}ms` }"
        >
          <!-- 图标：固定 42×42（h-[42px] w-[42px]），素材自带圆角浅底；
               hover 卡片时放大到 1.06（scale 写在末尾 style 里） -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[42px] w-[42px] select-none"
          />

          <!-- 条款号：mt-[18px] 与图标间距 18px；11px/16px 加粗、
               字距 0.05em、brand-700 深橙 -->
          <p
            class="mt-[18px] text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-700"
          >
            {{ card.label }}
          </p>

          <!-- 卡标题：mt-[14px] 与条款号间距 14px；16px/24px 加粗 -->
          <h3 class="mt-[14px] text-[16px] font-bold leading-[24px] text-ink-900">
            {{ card.title }}
          </h3>

          <!-- 卡正文：mt-[6px] 与标题间距 6px；13px/22px、ink-600 -->
          <p class="mt-[6px] text-[13px] leading-[22px] text-ink-600">
            {{ card.desc }}
          </p>
        </article>
      </div>

      <!-- 提示条：mt-[46px] 与卡片间距 46px；h-[72px] 定高、flex 垂直居中、
           gap-[16px]；px-[24px] 左右内边距、rounded-[12px] 圆角、#fff6ef 浅橙底 -->
      <div
        class="reveal mt-[46px] flex h-[72px] items-center gap-[16px] rounded-[12px] bg-[#fff6ef] px-[24px]"
        style="--d: 600ms"
      >
        <!-- 竖条：w-[3px] h-[36px]，shrink-0 不被文字挤压，rounded-full 全圆角、brand-400 -->
        <span class="h-[36px] w-[3px] shrink-0 rounded-full bg-brand-400" aria-hidden="true" />
        <!-- 提示文字：13px/22px、#6b5138 暖棕 -->
        <p class="text-[13px] leading-[22px] text-[#6b5138]">{{ industry.note }}</p>
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
