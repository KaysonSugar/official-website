<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 底部行动号召
-->
<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

// 底部行动号召（原型第 15 块），八个页面共用 siteConfig.cta 的文案。
// 底色取 brand-700 不用 brand-500：白字压在 500 上对比度只有 2.6:1，看着发虚。
</script>

<template>
  <!-- 外层白底：给上面区块留条干净的过渡带，不管前面是白底还是浅灰都不撞 -->
  <section class="bg-white py-14 sm:py-16 lg:py-20">
    <div class="container-page">
      <!-- 横幅：relative 给装饰圆定位，overflow-hidden 把圆裁成弧边；
           rounded-3xl 大圆角；px/py 手机上 24/48，桌面 64/64 -->
      <div
        class="relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16"
      >
        <!-- 两枚 10% 白圆，只在右边露一段弧，给纯色块加点纵深，不抢文字 -->
        <div
          class="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -bottom-28 right-24 h-52 w-52 rounded-full bg-white/10"
          aria-hidden="true"
        />

        <!-- 文案区：max-w-2xl 限一下换行宽度，标题别横贯整条横幅 -->
        <div class="relative max-w-2xl">
          <!-- 标题：24px → 30px → 36px 逐级放大，leading-tight 收紧行高，两行也不散 -->
          <h2
            class="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl"
          >
            {{ siteConfig.cta.title }}
          </h2>

          <!-- 说明：纯白，不加不透明度 —— 一降对比度就不达标了 -->
          <p class="mt-3 text-sm leading-relaxed text-white sm:mt-4 sm:text-base">
            {{ siteConfig.cta.desc }}
          </p>

          <!-- 动作区：手机竖排 gap-3，≥640 横排并垂直居中 -->
          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <!-- 主按钮：白底深橙字（light 变体），在橙底上对比最高 -->
            <BaseButton
              :href="siteConfig.contact.ctaHref"
              variant="light"
              size="lg"
              class="w-full sm:w-auto"
            >
              {{ siteConfig.contact.ctaLabel }}
            </BaseButton>

            <!-- 电话：白描边白字，和主按钮分主次；hover 描边变实、底色盖一层白 10% -->
            <a
              :href="siteConfig.contact.phoneHref"
              class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto lg:px-8 lg:py-3.5 lg:text-lg"
            >
              <!-- 听筒：16×16 线性图标，stroke 用 currentColor 跟着文字白 -->
              <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M14 11.2v1.6a1.1 1.1 0 0 1-1.2 1.1 10.9 10.9 0 0 1-4.7-1.7 10.7 10.7 0 0 1-3.3-3.3A10.9 10.9 0 0 1 3.1 4.2 1.1 1.1 0 0 1 4.2 3h1.6a1.1 1.1 0 0 1 1.1.9c.07.5.2.99.37 1.46a1.1 1.1 0 0 1-.25 1.16l-.68.68a8.8 8.8 0 0 0 3.3 3.3l.68-.68a1.1 1.1 0 0 1 1.16-.25c.47.17.96.3 1.46.37a1.1 1.1 0 0 1 .96 1.16Z"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ siteConfig.contact.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
