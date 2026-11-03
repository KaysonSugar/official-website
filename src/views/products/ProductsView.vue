<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 产品矩阵页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import { RouterLink } from 'vue-router'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage, siteConfig } from '@/config/site'

/**
 * 产品矩阵 /products：三条业务线的总览。
 * 原型没单独画这张板，但导航里带下拉箭头，得有个能落地的总览页。
 *
 * 卡片数据直接取 navItems 里「产品矩阵」的子项，跟下拉菜单同源，
 * 改 site.ts 一处，导航和这页同时变。
 */
const page = getPage('/products')
const productLines = siteConfig.navItems.find((item) => item.to === '/products')?.children ?? []
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />

  <!-- 总览区：上面不再加内边距 —— PageHero 底部已经有 56/64/80 的留白，
       两级叠起来会空出 160px，看着像漏了内容；这里只留底部 -->
  <section class="bg-white pb-14 sm:pb-16 lg:pb-20">
    <div class="container-page">
      <!-- 栅格：手机一列、≥640 两列、≥1024 三列；间距 16 → 24 -->
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <li v-for="(line, index) in productLines" :key="line.to">
          <!-- 整卡可点：group 让箭头跟着动；h-full 让同排等高；
               hover 上浮 1px、边框转浅橙、加一层很淡的投影（card-lift，全局样式） -->
          <RouterLink
            :to="line.to"
            class="group card-lift flex h-full flex-col rounded-xl border border-ink-100 bg-white p-6 hover:border-brand-200 sm:p-8"
          >
            <!-- 序号：等宽字体让 01/02/03 对齐，品牌橙点一下 -->
            <span class="font-mono text-sm font-medium text-brand-500">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <!-- 业务线名字 -->
            <h2 class="mt-3 text-lg font-semibold text-ink-900">{{ line.label }}</h2>
            <!-- 一句话定位 -->
            <p class="mt-2 text-sm leading-relaxed text-ink-600">{{ line.desc }}</p>
            <!-- 进入提示：mt-auto 顶到卡片底部，三张卡的箭头才能在一条线上 -->
            <span class="mt-auto flex items-center gap-1 pt-6 text-sm font-medium text-brand-500">
              查看详情
              <!-- 箭头：hover 右移 4px（translate-x-1），配合整卡上浮 -->
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
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
