<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 物流第三屏：运输链核心功能 + 调度台实录
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import dashConsole from '@/assets/products/logistics/images/dash-console.webp'
import dashConsoleSm from '@/assets/products/logistics/images/dash-console-sm.webp'

/**
 * 三张能力卡 + 调度台实录大图。
 * 大图是产品界面截图（调度台截图区.png 裁掉画框和烘焙注释行出的 webp），
 * 跟化工界面实录同理直接用图片；注释行那小字烘焙在图里必糊，改成 DOM 文字放图下面。
 */
const { capability } = siteConfig.logistics

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题 / 标题 / 描述 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-[#2fae85] sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ capability.eyebrow }}
      </p>
      <h2 class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-ink-900" style="--d: 80ms">
        {{ capability.title }}
      </h2>
      <p class="reveal mt-[14px] max-w-[720px] text-[14px] leading-[24px] text-[#5e7169]" style="--d: 160ms">
        {{ capability.desc }}
      </p>

      <!-- 三张能力卡：浅绿灰底、无边框（原型就是色块不描边） -->
      <div class="mt-[40px] grid gap-[24px] md:grid-cols-3">
        <article
          v-for="(card, i) in capability.cards"
          :key="card.title"
          class="reveal rounded-[16px] bg-[#f7fbfa] p-[28px]"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <h3 class="text-[17px] font-bold leading-[24px] text-[#13322a]">{{ card.title }}</h3>
          <p class="mt-[12px] text-[13px] leading-[22px] text-[#5e7169]">{{ card.body }}</p>
          <!-- 绿色小结行：前缀加粗，色比正文绿深一档 -->
          <p class="mt-[14px] text-[12px] leading-[20px] text-[#1c8a66]">
            <span class="font-bold">{{ card.noteTag }}：</span>{{ card.note }}
          </p>
        </article>
      </div>

      <!-- 调度台实录大图：圆角和投影已烘焙在图里，铺满容器宽即可。
           srcset 两档 1320/2640，sizes 封顶 1320（容器最大宽） -->
      <img
        loading="lazy"
        decoding="async"
        :src="dashConsole"
        :srcset="`${dashConsoleSm} 1320w, ${dashConsole} 2640w`"
        :sizes="'(min-width: 1440px) min(calc(100vw - 160px), 1320px), calc(100vw - 48px)'"
        :alt="capability.console.alt"
        :style="{ aspectRatio: '2640 / 1294' }"
        class="reveal mt-[48px] w-full select-none"
        style="--d: 240ms"
      />
      <!-- 图下说明：原型里烘焙在图内，裁出来改 DOM 小字 -->
      <p class="reveal mt-[16px] text-[12px] leading-[20px] text-[#8aa094]" style="--d: 320ms">
        {{ capability.console.caption }}
      </p>
    </div>
  </section>
</template>
