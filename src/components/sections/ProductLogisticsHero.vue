<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 物流调度首屏：调度台演示卡
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import BaseButton from '@/components/ui/BaseButton.vue'
import { getPage, siteConfig } from '@/config/site'

/**
 * 物流调度首屏（原型 Logistics Hero）：浅薄荷绿渐变背景 + 左文案 + 右调度台。
 * 右卡整体 DOM 重建（用户给的 Dispatch Mock.png 是烘焙文字位图，已删）：
 * 绿渐变侧栏（第一项白底选中态、货源广场挂 VIP）+ 主区五张白卡。
 * 徽标沿用站点既有绿/橙/灰三档浅底色。
 */
const page = getPage('/products/logistics')
const dash = siteConfig.logistics.heroDash

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 待办卡三枚计数徽标：绿 / 橙 / 灰，与待办行尾徽标共用这一套
const badgeTone = {
  green: 'bg-[#e2f3ea] text-[#1c8a66]',
  orange: 'bg-[#ffeede] text-[#e9611f]',
  gray: 'bg-[#f1f3f2] text-[#6b8077]',
} as const
</script>

<template>
  <section ref="root" class="bg-gradient-to-b from-[#e9f7f0] via-[#f4fcf8] to-white pb-[72px] pt-[64px]">
    <div class="container-page">
      <div class="grid items-center gap-[48px] lg:grid-cols-[1fr_640px]">
        <!-- 左列 -->
        <div>
          <p
            class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.05em] text-mint-600 sm:tracking-[0.08em]"
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
            <BaseButton :href="siteConfig.contact.ctaHref" variant="green" size="lg">{{ siteConfig.logistics.ctaLabel }}</BaseButton>
          </div>
        </div>

        <!-- 右列：调度台演示卡，整卡 DOM 重建 -->
        <article
          class="reveal flex overflow-hidden rounded-[16px] bg-white shadow-[0_24px_60px_-24px_rgba(19,50,42,0.28)] ring-1 ring-black/5"
          style="--d: 200ms"
        >
          <!-- 侧栏：绿渐变，窄屏藏掉省空间；宽度按「货源广场 + VIP 徽标」一行放下量的 -->
          <aside class="hidden w-[116px] shrink-0 flex-col bg-gradient-to-b from-[#3ec795] to-[#27a276] px-[10px] py-[16px] sm:flex">
            <!-- 品牌：白色圆角块里画个小货车，块下品牌名 + 副标 -->
            <div class="flex flex-col items-center">
              <span class="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-white">
                <svg viewBox="0 0 24 24" class="h-[20px] w-[20px]" fill="none" aria-hidden="true">
                  <path
                    d="M3 7h9v8H3zM12 10h5l3 3v2h-8z"
                    stroke="#2fae85"
                    stroke-width="1.8"
                    stroke-linejoin="round"
                  />
                  <circle cx="7" cy="17" r="1.8" fill="#2fae85" />
                  <circle cx="16.5" cy="17" r="1.8" fill="#2fae85" />
                </svg>
              </span>
              <p class="mt-[8px] text-[13px] font-bold leading-[18px] text-white">{{ dash.brand }}</p>
              <p class="mt-[2px] text-[10px] leading-[14px] text-white/70">{{ dash.brandSub }}</p>
            </div>

            <!-- 菜单：第一项白底选中态 -->
            <nav class="mt-[18px] flex flex-col gap-[4px]">
              <span
                v-for="(menu, i) in dash.menus"
                :key="menu.label"
                class="flex items-center gap-[7px] rounded-[8px] px-[9px] py-[6px] text-[11px] leading-[16px] whitespace-nowrap"
                :class="i === 0 ? 'bg-white font-semibold text-[#1c8a66] shadow-sm' : 'text-white/85'"
              >
                <span class="h-[6px] w-[6px] shrink-0 rounded-[2px]" :class="i === 0 ? 'bg-[#2fae85]' : 'bg-white/50'" />
                {{ menu.label }}
                <span
                  v-if="menu.vip"
                  class="rounded-[4px] bg-[#ff6a2b] px-[4px] py-[1px] text-[8px] font-bold leading-[11px] text-white"
                >
                  VIP
                </span>
              </span>
            </nav>
          </aside>

          <!-- 主区：浅灰绿底铺五张白卡 -->
          <div class="flex-1 bg-[#f6f8f7] p-[14px]">
            <!-- 顶栏 -->
            <div class="flex items-center justify-between px-[4px]">
              <span class="text-[13px] font-semibold leading-[18px] text-[#13322a]">首页</span>
              <span class="text-[11px] leading-[16px] text-[#8aa094]">{{ dash.topbarRight }}</span>
            </div>

            <!-- 欢迎卡 -->
            <div class="mt-[10px] flex items-center gap-[10px] rounded-[10px] bg-white px-[14px] py-[10px]">
              <span class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7f3ec] text-[13px] font-semibold text-[#1c8a66]">
                张
              </span>
              <div>
                <p class="text-[13px] font-semibold leading-[18px] text-[#13322a]">{{ dash.welcome.name }}</p>
                <p class="mt-[1px] text-[11px] leading-[16px] text-[#8aa094]">{{ dash.welcome.hello }}</p>
              </div>
            </div>

            <!-- 合作运单：四项统计，右上角本月/本年页签 -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-[7px] text-[13px] font-semibold leading-[18px] text-[#13322a]">
                  <span class="h-[8px] w-[8px] rounded-[2px] bg-[#2fae85]" />
                  {{ dash.coop.title }}
                </span>
                <span class="text-[11px] leading-[16px]">
                  <span class="font-medium text-[#1c8a66]">本月</span>
                  <span class="ml-[10px] text-[#8aa094]">本年</span>
                </span>
              </div>
              <div class="mt-[8px] grid grid-cols-4 gap-[8px]">
                <div v-for="stat in dash.coop.stats" :key="stat.label">
                  <p class="text-[11px] leading-[16px] text-[#8aa094]">{{ stat.label }}</p>
                  <p class="mt-[2px] text-[18px] font-bold leading-[24px] tabular-nums text-[#13322a]">{{ stat.value }}</p>
                </div>
              </div>
            </div>

            <!-- 非合作运单：三项统计，点色浅一档区分 -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-[7px] text-[13px] font-semibold leading-[18px] text-[#13322a]">
                  <span class="h-[8px] w-[8px] rounded-[2px] bg-[#86d8b9]" />
                  {{ dash.nonCoop.title }}
                </span>
                <span class="text-[11px] leading-[16px]">
                  <span class="font-medium text-[#1c8a66]">本月</span>
                  <span class="ml-[10px] text-[#8aa094]">本年</span>
                </span>
              </div>
              <div class="mt-[8px] grid grid-cols-3 gap-[8px]">
                <div v-for="stat in dash.nonCoop.stats" :key="stat.label">
                  <p class="text-[11px] leading-[16px] text-[#8aa094]">{{ stat.label }}</p>
                  <p class="mt-[2px] text-[18px] font-bold leading-[24px] tabular-nums text-[#13322a]">{{ stat.value }}</p>
                </div>
              </div>
            </div>

            <!-- 待办：计数徽标 + 两条待办行 -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center gap-[8px]">
                <span class="text-[13px] font-semibold leading-[18px] text-[#13322a]">待办</span>
                <span
                  v-for="badge in dash.todo.badges"
                  :key="badge.label"
                  class="rounded-[6px] px-[8px] py-[2px] text-[10px] leading-[14px]"
                  :class="badgeTone[badge.tone]"
                >
                  {{ badge.label }} {{ badge.count }}
                </span>
              </div>
              <div class="mt-[8px] flex flex-col gap-[6px]">
                <div
                  v-for="row in dash.todo.rows"
                  :key="row.no"
                  class="flex items-center justify-between rounded-[8px] bg-[#f6f9f7] px-[12px] py-[7px]"
                >
                  <div>
                    <p class="text-[12px] font-medium leading-[17px] text-[#13322a]">{{ row.no }}</p>
                    <p class="mt-[1px] text-[10px] leading-[14px] text-[#8aa094]">{{ row.route }}</p>
                  </div>
                  <span class="rounded-[6px] px-[8px] py-[2px] text-[10px] leading-[14px]" :class="badgeTone[row.tone]">
                    {{ row.badge }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 今日货源简讯 -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center justify-between">
                <span class="text-[13px] font-semibold leading-[18px] text-[#13322a]">{{ dash.brief.title }}</span>
                <span class="text-[10px] leading-[14px] text-[#8aa094]">更多 →</span>
              </div>
              <div class="mt-[6px]">
                <div
                  v-for="row in dash.brief.rows"
                  :key="row.route"
                  class="flex items-center justify-between py-[3px]"
                >
                  <span class="text-[11px] leading-[16px] text-[#3d574d]">{{ row.route }}</span>
                  <span class="text-[10px] leading-[14px] text-[#8aa094]">{{ row.meta }}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
