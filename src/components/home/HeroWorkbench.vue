<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 首页首屏右侧工作台演示看板（DOM 绘制）
-->
<script setup lang="ts">
import { siteConfig } from '@/config/site'
import logoMark from '@/assets/brand/logo.webp'

/**
 * 工作台看板原来是 workbench-body*.webp 三档位图，缩放屏上文字必糊，整卡 DOM 重建。
 * 尺寸体系：根节点 container-type: inline-size，内部全部用 cqw（1cqw = 看板宽的 1%），
 * 设计基准 600px 宽——换算口诀 px ÷ 6 = cqw。这样看板在 360~830px 宽之间等比缩放，
 * 和原来图片的行为一致，但文字是浏览器渲染的真字体，任何尺寸都锐利。
 * 演示数据在 siteConfig.hero.workbench，照位图逐字转录。
 */
const wb = siteConfig.hero.workbench

// 侧栏菜单的装饰图标：跟 menus 按序号一一对位，单 path 线条画法，示意就行
const menuPaths = [
  'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  'M3 4h2.5l2.2 10.5h11L21.5 7H6.5M9 20.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm8.5 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z',
  'M2.5 6.5h11.5v9H2.5zM14 10h4l3 3v2.5h-7zM7 18.5a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8zm10.5 0a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z',
  'M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z',
  'M6 8h12l-1.2 12H7.2zM9 8V6a3 3 0 0 1 6 0v2',
  'M4 12.5h7v7H4zM13 12.5h7v7h-7zM8.5 4.5h7v5.5h-7z',
  'M4 20v-7M9.5 20V6M15 20V10M20.5 20v-4M2.5 20h19',
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12.5l2.8 2.7 5.7-6.2',
  'M12 3 5 6v5c0 5 3.2 8.4 7 10 3.8-1.6 7-5 7-10V6zM9 11.5l2.2 2.2 4-4.4',
  'M7 3h7l4 4v14H7zM14 3v4h4M10.5 12h5M10.5 16h5',
]

// 四张统计卡的 tone 配色：卡底 / 图标 tile 底 / 图标颜色
const toneCls = {
  orange: { card: 'bg-[#fdece1]', tile: 'bg-[#fbd8c2]', icon: 'text-[#f4772a]' },
  mint: { card: 'bg-[#e7f4ec]', tile: 'bg-[#c8e8d6]', icon: 'text-[#2f9e6e]' },
  gray: { card: 'bg-[#eef1f0]', tile: 'bg-[#dfe5e2]', icon: 'text-[#5e7169]' },
  amber: { card: 'bg-[#fdf1d9]', tile: 'bg-[#f9e2b4]', icon: 'text-[#d9a410]' },
} as const

// 圆环弧线颜色（第三个「其他」在原型里是一小段浅绿）
const arcColor = { orange: '#f4772a', green: '#2f9e6e', gray: '#8fd0b0' } as const

// 生产状态标签
const statusCls = {
  orange: 'bg-[#fdece1] text-[#e97b1f]',
  amber: 'bg-[#fdf3dc] text-[#d9a410]',
  green: 'bg-[#e6f4ec] text-[#2e9e6e]',
} as const

// 趋势图三个白心圆点的横向落点（纵向贴绿线平缓段，约 71% 高）
const dotLeft = ['3.5%', '38%', '62%']
</script>

<template>
  <!-- 看板根：container 查询基准，内部尺寸全用 cqw。深绿主底由主区承担，根只负责圆角裁切 -->
  <div class="relative w-full overflow-hidden rounded-[2cqw] bg-[#eef2ef] [container-type:inline-size]">
    <div class="flex">
      <!-- 侧栏：深绿黑底，宽 14.3%（600 基准下 86px） -->
      <aside class="flex w-[15.6cqw] shrink-0 flex-col items-center bg-[#1f2d27] pb-[3cqw] pt-[3.4cqw]">
        <!-- 品牌：橙色 logo mark + 名称 + 英文副标 -->
        <img :src="logoMark" alt="" aria-hidden="true" class="w-[4.4cqw] select-none" />
        <p class="mt-[1.6cqw] text-[1.83cqw] font-bold leading-none text-white">{{ wb.brand.name }}</p>
        <p class="mt-[1cqw] text-[0.92cqw] leading-none tracking-[0.14em] text-[#8fa39a]">{{ wb.brand.sub }}</p>

        <!-- 菜单：第一项橙底白字选中，其余灰绿；行高 4.4cqw 圆角胶囊 -->
        <nav class="mt-[2.6cqw] flex w-full flex-col gap-[0.5cqw] px-[1.2cqw]">
          <span
            v-for="(menu, mi) in wb.menus"
            :key="menu"
            class="flex items-center gap-[1cqw] rounded-[1.2cqw] px-[1.6cqw] py-[1.15cqw]"
            :class="mi === 0 ? 'bg-brand-500 text-white' : 'text-[#9fb0a8]'"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              class="w-[1.8cqw] shrink-0"
            >
              <path :d="menuPaths[mi]" />
            </svg>
            <span class="whitespace-nowrap text-[1.67cqw] leading-none">{{ menu }}</span>
          </span>
        </nav>
      </aside>

      <!-- 主区 -->
      <div class="min-w-0 flex-1">
        <!-- 顶栏：标题 + 搜索 + 日期/铃铛/头像 -->
        <header class="flex items-center gap-[2cqw] bg-white px-[2.4cqw] py-[1.9cqw]">
          <p class="text-[2.17cqw] font-bold leading-none text-[#21322b]">{{ wb.top.title }}</p>
          <!-- 搜索胶囊 -->
          <span
            class="ml-auto flex h-[4.17cqw] w-[25cqw] items-center gap-[1cqw] rounded-full bg-[#f1f4f2] px-[1.7cqw]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#93aca1" stroke-width="2" stroke-linecap="round" aria-hidden="true" class="w-[1.9cqw]">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m20 20-4.2-4.2" />
            </svg>
            <span class="text-[1.58cqw] leading-none text-[#93aca1]">{{ wb.top.search }}</span>
          </span>
          <span class="text-[1.67cqw] leading-none text-[#5e7169]">{{ wb.top.date }}</span>
          <!-- 铃铛：右上橙点 -->
          <span class="relative">
            <svg viewBox="0 0 24 24" fill="none" stroke="#41544b" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" class="w-[2.2cqw]">
              <path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 15 18 9M10 20a2.2 2.2 0 0 0 4 0" />
            </svg>
            <i class="absolute right-0 top-0 h-[0.8cqw] w-[0.8cqw] rounded-full bg-brand-500" aria-hidden="true" />
          </span>
          <span class="flex h-[3.33cqw] w-[3.33cqw] items-center justify-center rounded-full bg-brand-500 text-[1.5cqw] font-semibold leading-none text-white">王</span>
        </header>

        <div class="px-[2.4cqw] pb-[2.4cqw]">
          <!-- 问候行 + 右侧公司范围胶囊 -->
          <div class="mt-[2.4cqw] flex items-center justify-between">
            <p>
              <span class="text-[2.33cqw] font-bold leading-none text-[#21322b]">{{ wb.greet.hello }}</span>
              <span class="ml-[1.4cqw] text-[1.75cqw] leading-none text-[#93aca1]">{{ wb.greet.sub }}</span>
            </p>
            <span class="rounded-full bg-white px-[1.7cqw] py-[1cqw] text-[1.58cqw] leading-none text-[#41544b]">
              {{ wb.greet.scope }}
            </span>
          </div>

          <!-- 四张统计卡：彩底 + 右上图标 tile，数字深绿黑、单位小字 -->
          <div class="mt-[2cqw] grid grid-cols-4 gap-[1.5cqw]">
            <div
              v-for="s in wb.stats"
              :key="s.label"
              class="rounded-[1.67cqw] p-[1.9cqw]"
              :class="toneCls[s.tone].card"
            >
              <div class="flex items-start justify-between">
                <p class="text-[1.58cqw] leading-none text-[#41544b]">{{ s.label }}</p>
                <span
                  class="flex h-[4.33cqw] w-[4.33cqw] items-center justify-center rounded-[1.2cqw]"
                  :class="toneCls[s.tone].tile"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="w-[2.3cqw]" :class="toneCls[s.tone].icon">
                    <path
                      :d="
                        s.tone === 'orange'
                          ? 'M5.5 3.5 12 11 18.5 3.5M12 11v10M7 13.5h10M7 17h10'
                          : s.tone === 'mint'
                            ? 'M3 4h2.5l2.2 10.5h11L21.5 7H6.5M9 20.5a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm8.5 0a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z'
                            : s.tone === 'gray'
                              ? 'M7 3h7l4 4v14H7zM14 3v4h4M10 13h5M10 17h5'
                              : 'M2.5 6.5h11.5v9H2.5zM14 10h4l3 3v2.5h-7zM7 18.5a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8zm10.5 0a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z'
                      "
                    />
                  </svg>
                </span>
              </div>
              <p class="mt-[2.2cqw] whitespace-nowrap text-[3.17cqw] font-bold leading-none text-[#21322b]">
                {{ s.value }}<span class="ml-[0.4cqw] text-[1.5cqw] font-normal text-[#5e7169]">{{ s.unit }}</span>
              </p>
            </div>
          </div>

          <!-- 趋势图 + 库存占比：两栏 2.05 : 1 -->
          <div class="mt-[1.5cqw] grid grid-cols-[2.05fr_1fr] gap-[1.5cqw]">
            <!-- 产量趋势：白卡 + 双折线 SVG（preserveAspectRatio none 拉伸铺满） -->
            <div class="rounded-[1.67cqw] bg-white p-[2cqw]">
              <div class="flex items-baseline justify-between">
                <p class="text-[2cqw] font-bold leading-none text-[#21322b]">{{ wb.trend.title }}</p>
                <span class="text-[1.58cqw] leading-none text-[#93aca1]">{{ wb.trend.tag }}</span>
              </div>
              <div class="relative mt-[1.8cqw] h-[12.5cqw]">
                <svg viewBox="0 0 300 100" preserveAspectRatio="none" class="absolute inset-0 h-full w-full" aria-hidden="true">
                  <!-- 三条横向网格线：non-scaling-stroke 保证拉伸后仍是 1px -->
                  <path d="M0 25h300M0 50h300M0 75h300" stroke="#e8eeea" stroke-width="1" vector-effect="non-scaling-stroke" />
                  <!-- 橙线（略低于绿线）：平缓 → 尖峰 → 回落 -->
                  <path
                    d="M0 80 100 79 180 78 230 74 262 16 300 70"
                    fill="none"
                    stroke="#f6a45f"
                    stroke-width="2"
                    vector-effect="non-scaling-stroke"
                    stroke-linejoin="round"
                  />
                  <!-- 绿线 -->
                  <path
                    d="M0 72 100 71.5 180 71 230 66 262 9 300 58"
                    fill="none"
                    stroke="#2f9e6e"
                    stroke-width="2"
                    vector-effect="non-scaling-stroke"
                    stroke-linejoin="round"
                  />
                </svg>
                <!-- 三个白心数据点：HTML 定位，躲开 SVG 拉伸把圆压成椭圆的问题 -->
                <span
                  v-for="left in dotLeft"
                  :key="left"
                  class="absolute h-[1.5cqw] w-[1.5cqw] -translate-y-1/2 rounded-full border-[0.35cqw] border-white bg-[#2f9e6e]"
                  :style="{ left, top: '71%' }"
                  aria-hidden="true"
                />
              </div>
            </div>

            <!-- 物料库存占比：三个 SVG 圆环（pathLength=100 + dasharray 按百分比画弧） -->
            <div class="flex flex-col rounded-[1.67cqw] bg-white p-[2cqw]">
              <p class="text-[2cqw] font-bold leading-none text-[#21322b]">{{ wb.donut.title }}</p>
              <div class="mt-[2.2cqw] flex items-start justify-between px-[0.4cqw]">
                <div v-for="d in wb.donut.items" :key="d.label" class="flex flex-col items-center">
                  <svg viewBox="0 0 36 36" class="w-[4.6cqw]" aria-hidden="true">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e3eae6" stroke-width="5.5" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      :stroke="arcColor[d.tone]"
                      stroke-width="5.5"
                      stroke-linecap="round"
                      pathLength="100"
                      :stroke-dasharray="`${d.percent} ${100 - d.percent}`"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <p class="mt-[1.2cqw] text-[1.58cqw] leading-none text-[#5e7169]">{{ d.label }} {{ d.percent }}%</p>
                </div>
              </div>
              <p class="mt-auto pt-[2cqw] text-[1.67cqw] leading-none text-[#93aca1]">{{ wb.donut.total }}</p>
            </div>
          </div>

          <!-- 生产情况表：四列 grid，产量右对齐、状态彩签 -->
          <div class="mt-[1.5cqw] rounded-[1.67cqw] bg-white p-[2cqw]">
            <div class="flex items-baseline justify-between">
              <p class="text-[2cqw] font-bold leading-none text-[#21322b]">{{ wb.production.title }}</p>
              <span class="text-[1.58cqw] leading-none text-[#93aca1]">{{ wb.production.note }}</span>
            </div>
            <!-- 表头 -->
            <div class="mt-[2cqw] grid grid-cols-[1.15fr_2.4fr_0.9fr_0.75fr] text-[1.67cqw] leading-none text-[#93aca1]">
              <span>{{ wb.production.headers[0] }}</span>
              <span>{{ wb.production.headers[1] }}</span>
              <span class="text-right">{{ wb.production.headers[2] }}</span>
              <span class="text-right">{{ wb.production.headers[3] }}</span>
            </div>
            <!-- 数据行 -->
            <div
              v-for="r in wb.production.rows"
              :key="r.no"
              class="mt-[2.2cqw] grid grid-cols-[1.15fr_2.4fr_0.9fr_0.75fr] items-center text-[1.83cqw] leading-none"
            >
              <span class="font-medium text-[#41544b]">{{ r.no }}</span>
              <span class="truncate text-[#41544b]">{{ r.product }}</span>
              <span class="text-right font-bold text-[#21322b]">{{ r.qty }}</span>
              <span class="text-right">
                <span class="inline-block rounded-[0.8cqw] px-[1.2cqw] py-[0.7cqw] text-[1.58cqw] leading-none" :class="statusCls[r.tone]">
                  {{ r.status }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
