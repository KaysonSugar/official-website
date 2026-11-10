<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 关于我们：企业理念
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconInnovation from '@/assets/about/icons/phil-innovation.webp'
import iconPersist from '@/assets/about/icons/phil-persist.webp'
import iconExecute from '@/assets/about/icons/phil-execute.webp'
import iconExcel from '@/assets/about/icons/phil-excel.webp'

/**
 * 企业理念（原型 S2）：浅绿底 #f5faf7，四个圆底图标横排 + 下方标签。
 * 图标素材自带白色圆底（原图 560px 转的 webp），桌面显示 120px、手机 104px；
 * hover 时图标放大 6%——这四个没有卡片外壳，只放大图片本身，不动文字。
 */
const { philosophy } = siteConfig.about

// icon 短名 → 素材，换图只动这里；键名跟 config 里的 icon 一一对应，少写一个编译就报错
const iconMap: Record<(typeof philosophy.items)[number]['icon'], string> = {
  innovation: iconInnovation,
  persist: iconPersist,
  execute: iconExecute,
  excel: iconExcel,
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：浅绿底 #f5faf7，上留白 96px、下 64px -->
  <section ref="root" class="bg-[#f5faf7] pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ philosophy.eyebrow }}
      </p>

      <!-- 标题：mt-[24px] 与眉题间距 24px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ philosophy.title }}
      </h2>

      <!-- 四个理念：mt-[40px] 与标题间距 40px、行距 32px；
           手机 2 列 → sm 4 列，每项错峰 80ms，图标和标签都居中 -->
      <div class="mt-[40px] grid grid-cols-2 gap-y-[32px] sm:grid-cols-4">
        <figure
          v-for="(item, i) in philosophy.items"
          :key="item.label"
          class="phil-item reveal flex flex-col items-center"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- 图标：手机 104×104、md 起 120×120，素材自带白圆底；放大 7px 也碰不到邻居 -->
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[item.icon]"
            alt=""
            aria-hidden="true"
            class="phil-icon h-[104px] w-[104px] select-none md:h-[120px] md:w-[120px]"
          />
          <!-- 标签：mt-[18px] 与图标间距 18px；14px/20px 中黑、跟标题同色 -->
          <figcaption class="mt-[18px] text-[14px] font-medium leading-[20px] text-ink-900">
            {{ item.label }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phil-icon {
  transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
}

.phil-item:hover .phil-icon {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .phil-icon {
    transition: none;
  }

  .phil-item:hover .phil-icon {
    transform: none;
  }
}
</style>
