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
  <!-- 区块：白底；pt-[96px] 上留白 96px、pb-[64px] 下留白 64px -->
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ service.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ service.title }}
      </h2>

      <!-- 说明：mt-[24px] 与标题间距 24px；14px/24px、ink-600 -->
      <p class="reveal mt-[24px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ service.desc }}
      </p>

      <!-- 服务卡栅格：mt-[36px] 与说明间距 36px、gap-[18px]；
           手机 1 列 → md 3 列，逐张错峰 80ms 浮入。浅灰细边框 #efefef 白卡 -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
        <article
          v-for="(card, i) in service.cards"
          :key="card.title"
          class="reveal card-lift rounded-[16px] border border-[#efefef] bg-white p-[28px]"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- 图标：固定 46×46，素材自带浅色圆角底（跟第六屏功能卡同规格）；
               hover 卡片时放大到 1.06（写在末尾 style 里） -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="h-[46px] w-[46px] select-none"
          />

          <!-- 卡标题：mt-[20px] 与图标间距 20px；16px/24px 加粗 -->
          <h3 class="mt-[20px] text-[16px] font-bold leading-[24px] text-ink-900">
            {{ card.title }}
          </h3>

          <!-- 小圆点列表：space-y-[10px] 行距；点 3×3 灰（ink-400）跟文字基线对齐；
               正文 13px/22px、ink-600 -->
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
