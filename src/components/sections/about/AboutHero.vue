<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 关于我们首屏：插画背景横条
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { getPage } from '@/config/site'
import heroImg from '@/assets/about/images/about-hero-1656w.webp'
import heroSm from '@/assets/about/images/about-hero-828w.webp'
import heroLg from '@/assets/about/images/about-hero-2384w.webp'

const page = getPage('/about')

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 首屏：relative 给背景图和遮罩定位，overflow-hidden 裁掉 cover 溢出的图边 -->
  <section ref="root" class="relative overflow-hidden">
    <!-- 背景插画：三档 srcset（828 / 1656 / 2384）、按 100vw 取图；object-right 保住右侧插画主体，
         fetchpriority=high 让它是 LCP 首图，别被后面的卡片图抢了带宽 -->
    <img
      :src="heroImg"
      :srcset="`${heroSm} 828w, ${heroImg} 1656w, ${heroLg} 2384w`"
      sizes="100vw"
      fetchpriority="high"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full select-none object-cover object-right"
    />

    <!-- 可读性遮罩：桌面左侧原图本就偏白，轻扫一层就够；
         手机（max-md）插画主体会跑到文字底下，整体垫到 90% 白才压得住标题 -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent max-md:from-white/90 max-md:via-white/65 max-md:to-white/40"
      aria-hidden="true"
    />

    <!-- 内容容器：跟顶栏同一条基准线；上下留白 手机 56px、md 起 76px（高度全靠它撑） -->
    <div class="container-page relative py-[56px] md:py-[76px]">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ page.eyebrow }}
      </p>

      <!-- 大标题：mt-[18px] 与眉题间距 18px（md 20px）；手机 28px/42px、md 起 40px/52px，比内页 PageHero 大一档 -->
      <h1
        class="reveal mt-[18px] text-[28px] font-bold leading-[42px] text-ink-900 md:mt-[20px] md:text-[40px] md:leading-[52px]"
        style="--d: 80ms"
      >
        {{ page.title }}
      </h1>

      <!-- 副标题：mt-[10px] 与标题间距 10px（md 12px）；14px/22px 灰绿（md 15px），色值采自原型 -->
      <p
        class="reveal mt-[10px] text-[14px] leading-[22px] text-[#5e7169] md:mt-[12px] md:text-[15px]"
        style="--d: 160ms"
      >
        {{ page.desc }}
      </p>
    </div>
  </section>
</template>
