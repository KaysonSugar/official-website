<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 服务支持第四屏：实施方式与计费
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconRemote from '@/assets/support/icons/price-remote.webp'
import iconOnsite from '@/assets/support/icons/price-onsite.webp'
import iconPlus from '@/assets/support/icons/price-plus.webp'

/**
 * 第四屏：线上远程与线下上门，按方式分别计费（原型 S3）。
 * 三张卡：白卡两张（细边框），线下上门那张是暖橙卡——浅橙底无边框，
 * 列表文字和小点都是暖棕（#5a4636），底部小字也偏暖（#b08a6a），
 * 跟白卡的灰绿（#4a5a52 / #8fa8a0）刻意区分开，都是原图采的色。
 */
const { pricing } = siteConfig.support

// icon 短名 → 素材
const iconMap = {
  remote: iconRemote,
  onsite: iconOnsite,
  plus: iconPlus,
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[96px] pt-[88px]">
    <div class="container-page">
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ pricing.eyebrow }}
      </p>

      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ pricing.title }}
      </h2>

      <p class="reveal mt-[24px] max-w-[820px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ pricing.desc }}
      </p>

      <!-- 三张卡：md 起三列，手机单列 -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
        <article
          v-for="(card, i) in pricing.cards"
          :key="card.title"
          class="reveal card-lift rounded-[14px] p-[28px]"
          :class="card.warm ? 'bg-[#fff8f1]' : 'border border-[#efefef] bg-white'"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- 图标素材自带浅绿/浅橙圆角底，44px 跟上一屏的八卡一致 -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[44px] w-[44px] select-none"
          />
          <h3 class="mt-[20px] text-[18px] font-bold leading-[26px] text-ink-900">{{ card.title }}</h3>

          <!-- 计费规则列表：小圆点跟文字同色，暖卡是暖棕、白卡是灰绿 -->
          <ul class="mt-[16px] space-y-[12px]">
            <li
              v-for="item in card.items"
              :key="item"
              class="flex gap-[10px] text-[13px] leading-[22px]"
              :class="card.warm ? 'text-[#5a4636]' : 'text-[#4a5a52]'"
            >
              <span
                class="mt-[9px] h-[4px] w-[4px] shrink-0 rounded-full"
                :class="card.warm ? 'bg-[#5a4636]' : 'bg-[#4a5a52]'"
              />
              <span>{{ item }}</span>
            </li>
          </ul>

          <!-- 底部适用范围 / 报价说明 -->
          <p class="mt-[20px] text-[13px] leading-[20px]" :class="card.warm ? 'text-[#b08a6a]' : 'text-[#8fa8a0]'">
            {{ card.foot }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
