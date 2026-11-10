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
import icon01 from '@/assets/products/logistics/icons/icon-box-01.webp'
import icon02 from '@/assets/products/logistics/icons/icon-box-02.webp'
import icon03 from '@/assets/products/logistics/icons/icon-box-03.webp'
import texture from '@/assets/products/logistics/images/texture-dots.webp'

/**
 * 奶油底三卡。图标是现成的 Icon Box PNG（浅绿圆角盒 + 深绿线性图形，192px）。
 * Texture 02 是稀疏浅绿点弧纹理（本身够淡），铺右上角当装饰，压在卡片下面。
 * hover 时卡片只浮投影、图标放大 6%——两级反馈，跟首页服务卡同一套。
 */
const { ledger } = siteConfig.logistics

// icon 短名 → 素材，换图只动这里；键名跟 config 里的 icon 一一对应
const iconMap: Record<(typeof ledger.cards)[number]['icon'], string> = {
  '01': icon01,
  '02': icon02,
  '03': icon03,
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：奶油底 #fff9f5（原型采的暖色），上下留白各 96px；overflow-hidden 裁掉探出去的纹理 -->
  <section ref="root" class="relative overflow-hidden bg-[#fff9f5] pb-[96px] pt-[96px]">
    <!-- 装饰纹理：右上角 640px 宽、右探 -60px、下压 36px，lg 以上才显示；
         pointer-events-none 防挡交互，loading=lazy 不占首屏带宽 -->
    <img
      :src="texture"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -right-[60px] top-[36px] hidden w-[640px] lg:block"
      loading="lazy"
      decoding="async"
    />

    <div class="container-page relative">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ ledger.eyebrow }}
      </p>
      <!-- 标题：mt-[20px] 与眉题间距 20px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ ledger.title }}
      </h2>
      <!-- 说明：mt-[14px] 与标题间距 14px，max-w 760px；14px/24px 灰绿 -->
      <p
        class="reveal mt-[14px] max-w-[760px] text-[14px] leading-[24px] text-[#5e7169]"
        style="--d: 160ms"
      >
        {{ ledger.desc }}
      </p>

      <!-- 三张白卡：mt-[40px] 与说明间距 40px、gap 24px，手机单列 → md 三列，每张错峰 90ms；
           暖色细描边 #f3e9e0 + 轻投影，跟奶油底同族 -->
      <div class="mt-[40px] grid gap-[24px] md:grid-cols-3">
        <article
          v-for="(card, i) in ledger.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] border border-[#f3e9e0] bg-white p-[28px] shadow-[0_18px_44px_-30px_rgba(120,80,40,0.25)]"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <!-- 卡头：46×46 图标跟标题横排 gap 14px；hover 时图标放大 1.06（样式见末尾） -->
          <div class="flex items-center gap-[14px]">
            <img
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="h-[46px] w-[46px] shrink-0"
              loading="lazy"
              decoding="async"
            />
            <!-- 卡标题：17px/24px 加粗 -->
            <h3 class="text-[17px] font-bold leading-[24px] text-[#13322a]">{{ card.title }}</h3>
          </div>
          <!-- 卡正文：mt-[14px] 与标题行间距 14px；13px/22px 灰绿 -->
          <p class="mt-[14px] text-[13px] leading-[22px] text-[#5e7169]">{{ card.body }}</p>
        </article>
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
