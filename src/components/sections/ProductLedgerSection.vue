<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 物流第五屏：车辆及司机管理（奶油底三卡）
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import icon01 from '@/assets/products/logistics/icons/Icon Box 01.png'
import icon02 from '@/assets/products/logistics/icons/Icon Box 02.png'
import icon03 from '@/assets/products/logistics/icons/Icon Box 03.png'
import texture from '@/assets/products/logistics/images/Texture 02.png'

/**
 * 奶油底三卡。图标是现成的 Icon Box PNG（浅绿圆角盒 + 深绿线性图形，192px）。
 * Texture 02 是稀疏浅绿点弧纹理（本身够淡），铺右上角当装饰，压在卡片下面。
 */
const { ledger } = siteConfig.logistics

const iconMap = { '01': icon01, '02': icon02, '03': icon03 }

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 奶油底（原型采的 #fff9f5），配物流暖色系 -->
  <section ref="root" class="relative overflow-hidden bg-[#fff9f5] pb-[96px] pt-[96px]">
    <!-- 装饰纹理：右上角露一半，pointer-events-none 防挡交互 -->
    <img
      :src="texture"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -right-[60px] top-[36px] hidden w-[640px] lg:block"
    />

    <div class="container-page relative">
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-[#2fae85] sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ ledger.eyebrow }}
      </p>
      <h2 class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-ink-900" style="--d: 80ms">
        {{ ledger.title }}
      </h2>
      <p class="reveal mt-[14px] max-w-[760px] text-[14px] leading-[24px] text-[#5e7169]" style="--d: 160ms">
        {{ ledger.desc }}
      </p>

      <!-- 三张白卡：图标与标题同行，暖色细描边 -->
      <div class="mt-[40px] grid gap-[24px] md:grid-cols-3">
        <article
          v-for="(card, i) in ledger.cards"
          :key="card.title"
          class="reveal rounded-[16px] border border-[#f3e9e0] bg-white p-[28px] shadow-[0_18px_44px_-30px_rgba(120,80,40,0.25)]"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <div class="flex items-center gap-[14px]">
            <img :src="iconMap[card.icon]" alt="" aria-hidden="true" class="h-[46px] w-[46px] shrink-0" />
            <h3 class="text-[17px] font-bold leading-[24px] text-[#13322a]">{{ card.title }}</h3>
          </div>
          <p class="mt-[14px] text-[13px] leading-[22px] text-[#5e7169]">{{ card.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
