<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端首屏：附近货源手机演示
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import BaseButton from '@/components/ui/BaseButton.vue'
import { getPage, siteConfig } from '@/config/site'
import glowMint from '@/assets/products/driver/images/glow-mint.png'
import glowWarm from '@/assets/products/driver/images/glow-warm.png'
import ringOuter from '@/assets/products/driver/images/ring-outer.png'

/**
 * 司机端首屏（原型 Driver Hero）：左侧文案 + 右侧手机演示。
 * 手机整屏 DOM 重建（Phone Mock.png 是烘焙文字位图，已删），三枚浮动徽标同理
 * （Chip*.png 已删）。司机页主色是品牌橙，薄荷绿只做卡片点缀和背景光晕。
 */
const page = getPage('/products/driver')
const hero = siteConfig.driver.hero

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 两张货源卡的底色：原型第一张浅橙、第二张浅薄荷，价格跟着同色系加深
const orderTone = {
  orange: {
    card: 'bg-[#fdf1e8]',
    price: 'text-[#e9611f]',
  },
  green: {
    card: 'bg-[#ecf6f1]',
    price: 'text-[#1e9e74]',
  },
} as const

// 浮动徽标位置：右上压在手机顶上，左边两枚一上一下错开
const chipPos = {
  top: '-top-[18px] right-[6px]',
  left: 'top-[104px] left-[-64px]',
  bottom: 'bottom-[168px] left-[-88px]',
} as const
</script>

<template>
  <section ref="root" class="relative overflow-hidden bg-gradient-to-b from-[#f2faf6] via-[#f7fcf9] to-white pb-[72px] pt-[64px]">
    <!-- 背景装饰：大薄荷光晕垫在手机后面，暖橙光晕沉在左下文字区，细圆环压最右 -->
    <img
      :src="glowMint"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute right-[60px] top-[10px] hidden w-[680px] select-none lg:block"
    />
    <img
      :src="ringOuter"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute right-[-60px] top-[36px] hidden w-[520px] select-none lg:block"
    />
    <img
      :src="glowWarm"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute bottom-[-190px] left-[100px] hidden w-[400px] select-none lg:block"
    />
    <div class="container-page relative">
      <div class="grid items-center gap-[48px] lg:grid-cols-[1fr_480px]">
        <!-- 左列 -->
        <div>
          <p
            class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.05em] text-brand-500 sm:tracking-[0.08em]"
            style="--d: 0ms"
          >
            {{ page.eyebrow }}
          </p>

          <h1
            class="reveal mt-[16px] text-[32px] font-bold leading-[44px] text-ink-900 md:mt-[18px] md:text-[44px] md:leading-[56px]"
            style="--d: 80ms"
          >
            {{ page.title }}
          </h1>

          <p class="reveal mt-[20px] max-w-[520px] text-[15px] leading-[28px] text-[#5e7169]" style="--d: 160ms">
            {{ page.desc }}
          </p>

          <div class="reveal mt-[32px]" style="--d: 240ms">
            <BaseButton :href="siteConfig.contact.ctaHref" variant="primary" size="lg">{{ siteConfig.driver.ctaLabel }}</BaseButton>
          </div>

          <!-- 三枚药丸标签：浅薄荷底 + 绿点，照原型 -->
          <div class="reveal mt-[28px] flex flex-wrap gap-[12px]" style="--d: 320ms">
            <span
              v-for="pill in hero.pills"
              :key="pill"
              class="flex items-center gap-[7px] rounded-full bg-[#e7f5ee] px-[14px] py-[7px] text-[12px] font-medium leading-[17px] text-[#13322a]"
            >
              <span class="h-[6px] w-[6px] rounded-full bg-[#2fae85]" aria-hidden="true" />
              {{ pill }}
            </span>
          </div>
        </div>

        <!-- 右列：手机演示，整屏 DOM 重建。鼠标进入上浮 8px（8×1.25=10 物理像素，整数不糊） -->
        <div class="reveal relative mx-auto w-[330px] pb-[24px]" style="--d: 200ms">
          <!-- 浮动徽标：白底圆角胶囊 + 彩点，DOM 重建（位图版已删） -->
          <span
            v-for="chip in hero.chips"
            :key="chip.label"
            class="absolute z-10 flex items-center gap-[8px] rounded-full bg-white px-[16px] py-[9px] text-[12px] font-semibold leading-[17px] text-ink-900 shadow-[0_10px_28px_-10px_rgba(19,50,42,0.28)]"
            :class="chipPos[chip.pos]"
          >
            <span class="h-[7px] w-[7px] rounded-full" :class="chip.dot === 'orange' ? 'bg-brand-500' : 'bg-[#2fae85]'" aria-hidden="true" />
            {{ chip.label }}
          </span>

          <!-- 手机：白壳大圆角，内容全部明文假数据 -->
          <article
            class="overflow-hidden rounded-[36px] bg-white p-[22px] shadow-[0_32px_80px_-32px_rgba(19,50,42,0.35)] ring-1 ring-black/5 transition-transform duration-500 ease-out will-change-transform hover:-translate-y-2"
          >
            <!-- 状态栏 -->
            <div class="flex items-center justify-between">
              <span class="text-[13px] font-bold leading-[18px] text-ink-900">{{ hero.phone.statusLeft }}</span>
              <span class="text-[11px] leading-[16px] text-[#9aa8a1]">{{ hero.phone.statusRight }}</span>
            </div>

            <h3 class="mt-[16px] text-[20px] font-bold leading-[28px] text-ink-900">{{ hero.phone.title }}</h3>

            <!-- 两张货源卡：浅橙 / 浅薄荷 -->
            <div class="mt-[14px] flex flex-col gap-[12px]">
              <div
                v-for="order in hero.phone.orders"
                :key="order.from"
                class="rounded-[14px] px-[16px] py-[13px]"
                :class="orderTone[order.tone].card"
              >
                <div class="flex items-baseline justify-between">
                  <span class="text-[16px] font-bold leading-[22px] text-ink-900">
                    {{ order.from }} <span class="mx-[2px] text-[13px]" aria-hidden="true">→</span> {{ order.to }}
                  </span>
                  <span class="text-[15px] font-bold leading-[21px]" :class="orderTone[order.tone].price">{{ order.price }}</span>
                </div>
                <p class="mt-[6px] text-[11px] leading-[16px] text-[#7d948a]">{{ order.meta }}</p>
              </div>
            </div>

            <!-- 一键接单：橙渐变大按钮 -->
            <div
              class="mt-[16px] flex h-[44px] items-center justify-center rounded-[12px] bg-gradient-to-b from-[#fb7c36] to-[#f26520] text-[15px] font-bold text-white"
            >
              {{ hero.phone.acceptLabel }}
            </div>

            <!-- 本周收益卡 -->
            <div class="mt-[14px] rounded-[14px] bg-[#f2f6f4] px-[16px] py-[12px]">
              <p class="text-[11px] leading-[16px] text-[#7d948a]">{{ hero.phone.income.label }}</p>
              <p class="mt-[3px] flex items-baseline gap-[10px]">
                <span class="text-[20px] font-bold leading-[28px] tabular-nums text-[#1e9e74]">{{ hero.phone.income.value }}</span>
                <span class="text-[14px] font-bold leading-[20px] text-[#1e9e74]">{{ hero.phone.income.delta }}</span>
              </p>
            </div>

            <!-- 禁配提示条 -->
            <div class="mt-[12px] flex items-center gap-[8px] rounded-[10px] bg-[#fdf1e8] px-[12px] py-[9px]">
              <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              <p class="text-[11px] leading-[16px] text-[#c2571a]">{{ hero.phone.notice }}</p>
            </div>

            <!-- 底部导航：圆点分隔 -->
            <p class="mt-[16px] flex items-center justify-center gap-[10px] text-[11px] leading-[16px] text-[#9aa8a1]">
              <template v-for="(tab, i) in hero.phone.tabs" :key="tab">
                <span v-if="i > 0" class="h-[3px] w-[3px] rounded-full bg-[#c6d2cc]" aria-hidden="true" />
                <span>{{ tab }}</span>
              </template>
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
