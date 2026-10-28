<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage, siteConfig } from '@/config/site'

/**
 * 产品矩阵 /products
 *
 * 这一页是三条业务线的总览：原型里没有单独画这一张板，
 * 但它必须存在——「产品矩阵」既要能点进一个总览页，又要能下拉直达三条业务线，
 * 否则导航里带箭头却没有落地页会很怪。
 *
 * 卡片数据直接取 navItems 里「产品矩阵」的子项，与下拉面板同源，
 * 改 site.ts 一处，导航下拉和本页卡片同时更新。
 */
const page = getPage('/products')
const productLines = siteConfig.navItems.find((item) => item.to === '/products')?.children ?? []
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />

  <!-- 业务线总览：上方不再重复加内边距——PageHero 本身已有 py-14/16/20 的底部留白，
       两级叠加会空出 160px 的"断层"（实测明显像漏了内容），这里只保留底部留白 -->
  <section class="bg-white pb-14 sm:pb-16 lg:pb-20">
    <div class="container-page">
      <!-- 三列栅格：手机单列、平板两列、桌面三列；gap 逐级放宽 -->
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <li v-for="(line, index) in productLines" :key="line.to">
          <!-- 整卡可点：group 让箭头随悬停右移，给"可进入"的暗示；
               h-full 让同排卡片等高；hover 上浮 1px + 边框转品牌色 -->
          <RouterLink
            :to="line.to"
            class="group flex h-full flex-col rounded-xl border border-ink-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-ink-900/5 sm:p-8"
          >
            <!-- 序号：等宽字体让 01/02/03 对齐；品牌橙作为视觉锚点 -->
            <span class="font-mono text-sm font-medium text-brand-500">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <!-- 业务线名称 -->
            <h2 class="mt-3 text-lg font-semibold text-ink-900">{{ line.label }}</h2>
            <!-- 一句话定位 -->
            <p class="mt-2 text-sm leading-relaxed text-ink-600">{{ line.desc }}</p>
            <!-- 进入提示：mt-auto 推到卡片底部，保证三张卡片的箭头在同一水平线 -->
            <span class="mt-auto flex items-center gap-1 pt-6 text-sm font-medium text-brand-500">
              查看详情
              <!-- 箭头：悬停时右移 2px，配合整卡的 -translate-y-1 形成"推门"感 -->
              <svg
                class="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
