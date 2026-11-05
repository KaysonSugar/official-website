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

/**
 * 关于我们首屏（原型 About Hero）：矮横条，右侧服务器云插画，左侧文字。
 * 背景整图无烘焙文字（核对过），文字 DOM 叠加不糊。
 * 原型 1440×324，高度随视口宽走 aspect 比例；手机上压缩高度、插画照常 cover。
 */
const page = getPage('/about')

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="relative overflow-hidden">
    <!-- 背景横条：三档 srcset，显示宽 = 100vw，object-right 保住右侧插画主体 -->
    <img
      :src="heroImg"
      :srcset="`${heroSm} 828w, ${heroImg} 1656w, ${heroLg} 2384w`"
      :sizes="'100vw'"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full select-none object-cover object-right"
    />

    <!-- 可读性遮罩：桌面左侧原图就近白，轻扫一层即可；手机上插画主体跑到文字底下，
         整体垫白保证标题/副标题读得清 -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-white/70 via-white/20 to-transparent max-md:from-white/90 max-md:via-white/65 max-md:to-white/40"
      aria-hidden="true"
    />

    <div class="container-page relative py-[56px] md:py-[76px]">
      <!-- 眉题：橙，同全站 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ page.eyebrow }}
      </p>

      <!-- 大标题 40px，比内页 PageHero 的 32px 大一档（原型如此） -->
      <h1
        class="reveal mt-[18px] text-[28px] font-bold leading-[42px] text-ink-900 md:mt-[20px] md:text-[40px] md:leading-[52px]"
        style="--d: 80ms"
      >
        {{ page.title }}
      </h1>

      <!-- 副标题：公司名，灰绿 -->
      <p class="reveal mt-[10px] text-[14px] leading-[22px] text-[#5e7169] md:mt-[12px] md:text-[15px]" style="--d: 160ms">
        {{ page.desc }}
      </p>
    </div>
  </section>
</template>
