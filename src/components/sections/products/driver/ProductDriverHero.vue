<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端首屏：附近货源手机演示
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import HeroCta from '@/components/ui/HeroCta.vue'
import { getPage, siteConfig } from '@/config/site'
import glowMint from '@/assets/products/driver/images/glow-mint.webp'
import glowWarm from '@/assets/products/driver/images/glow-warm.webp'
import ringOuter from '@/assets/products/driver/images/ring-outer.webp'

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

// 浮动徽标位置：顶部那枚整体悬在手机顶上方（设计稿里底边刚好贴住手机顶，不压屏幕），
// 左边两枚一上一下错开、压着手机左缘；手机端列距屏边只有 30px，探出收到 -16/-20 不被视口裁掉
const chipPos = {
  top: '-top-[36px] right-[12px]',
  left: 'top-[104px] left-[-16px] sm:left-[-64px]',
  bottom: 'bottom-[168px] left-[-20px] sm:left-[-88px]',
} as const
</script>

<template>
  <section
    ref="root"
    class="relative overflow-hidden bg-gradient-to-b from-[#fdf6f0] via-[#fefaf6] to-white pb-[72px] pt-[64px]"
  >
    <!-- 背景装饰照原型：左半底色是暖奶油橙（渐变给出）。
         橙光晕按原型量：直径约 540、圆心在视口 39%（1440 下 ~560，落在"回程"药丸右下），
         竖直方向下半团沉到 hero 底边外被裁，顶边离 hero 顶约 118 —— 靠下才像从页面底下透上来的光 -->
    <img
      :src="glowWarm"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute bottom-[-162px] left-[287px] hidden w-[540px] select-none opacity-80 lg:block"
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

          <p
            class="reveal mt-[20px] max-w-[520px] text-[15px] leading-[28px] text-[#5e7169]"
            style="--d: 160ms"
          >
            {{ page.desc }}
          </p>

          <div class="reveal mt-[32px]" style="--d: 240ms">
            <HeroCta :label="siteConfig.driver.ctaLabel" />
          </div>

          <!-- 三枚药丸标签：跟首页首屏的 feature-pill 同款——白底半透明 + 细描边 + 绿色线条勾，
               hover 上浮 2px 出投影（样式在本文件 scoped 里） -->
          <div class="reveal mt-[28px] flex flex-wrap gap-[10px]" style="--d: 320ms">
            <span
              v-for="pill in hero.pills"
              :key="pill"
              class="feature-pill flex items-center gap-[8px] rounded-full border border-ink-100 bg-white/80 py-[7px] pl-[12px] pr-[14px] text-sm font-medium text-ink-700"
            >
              <svg
                class="h-[14px] w-[14px] shrink-0"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7.4 5.6 10.4 11.5 3.9"
                  stroke="#2f9e6e"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ pill }}
            </span>
          </div>
        </div>

        <!-- 右列：手机演示，整屏 DOM 重建。鼠标进入上浮 8px（8×1.25=10 物理像素，整数不糊） -->
        <div class="reveal relative mx-auto w-[330px] pb-[24px]" style="--d: 200ms">
          <!-- 薄荷光晕：照原型量直径约 520（=1.58 倍手机宽），左侧露出约 0.36 卡宽
               （圆心比手机中心左 35、竖直中心在卡高 44% 处），圆顶比卡顶高 8。
               max-w-none 必须带：preflight 给 img 的 max-width:100% 会把它钳到 330 列宽，
               之前 570 一直没生效就是这个原因，画面上只剩圆环在撑。
               挂在这一列里跟着手机走 —— 早先按视口写死 right 定位，窗口一变卡就漂，左右露出的宽度对不上 -->
          <img
            :src="glowMint"
            alt=""
            aria-hidden="true"
            class="pointer-events-none absolute left-[calc(50%-35px)] top-[-8px] hidden w-[520px] max-w-none -translate-x-1/2 select-none lg:block"
          />
          <!-- 细圆环：照原型量直径 1.48 倍手机宽（330→490）、圆心正对手机中线（原型环心 x
               与一键接单按钮中心只差 1px，不要偏移）、竖直中心在卡高 43% 处——
               顶弧出卡顶 ~10px，底弧藏在卡后（距卡底还差 ~20px），整圈只露上半圈，
               之前 574 + 底部下垂的画法整圈都露，视觉比原型大一圈。
               手机端视口只有 390，用 min 收到屏宽内（留 24px 边距）不被裁；
               外层 span 定位，里层 img 只跑 scale 呼吸动画，transform 分层不互相覆盖 -->
          <span
            aria-hidden="true"
            class="pointer-events-none absolute left-1/2 top-[-10px] w-[min(490px,calc(100vw-24px))] -translate-x-1/2"
          >
            <img :src="ringOuter" alt="" class="drv-breathe w-full select-none" />
          </span>
          <!-- 浮动徽标：白底圆角矩形 + 彩点，DOM 重建（位图版已删）。圆角 10px 不用 rounded-full：
               原型是三块"小卡片"不是胶囊，全圆角会让它看着像标签条 -->
          <span
            v-for="chip in hero.chips"
            :key="chip.label"
            class="absolute z-10 flex items-center gap-[8px] rounded-[10px] bg-white px-[16px] py-[9px] text-[12px] font-semibold leading-[17px] text-ink-900 shadow-[0_10px_28px_-10px_rgba(19,50,42,0.28)]"
            :class="chipPos[chip.pos]"
          >
            <span
              class="h-[7px] w-[7px] rounded-full"
              :class="chip.dot === 'orange' ? 'bg-brand-500' : 'bg-[#2fae85]'"
              aria-hidden="true"
            />
            {{ chip.label }}
          </span>

          <!-- 手机：白壳大圆角，内容全部明文假数据。
               relative 不能省：细圆环是 absolute，非定位元素会被它整条画穿（环压到卡上就成穿帮） -->
          <article
            class="relative overflow-hidden rounded-[36px] bg-white p-[22px] shadow-[0_32px_80px_-32px_rgba(19,50,42,0.35)] ring-1 ring-black/5 transition-transform duration-500 ease-out hover:-translate-y-2"
          >
            <!-- 状态栏 -->
            <div class="flex items-center justify-between">
              <span class="text-[13px] font-bold leading-[18px] text-ink-900">{{
                hero.phone.statusLeft
              }}</span>
              <span class="text-[11px] leading-[16px] text-[#9aa8a1]">{{
                hero.phone.statusRight
              }}</span>
            </div>

            <h3 class="mt-[16px] text-[20px] font-bold leading-[28px] text-ink-900">
              {{ hero.phone.title }}
            </h3>

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
                    {{ order.from }} <span class="mx-[2px] text-[13px]" aria-hidden="true">→</span>
                    {{ order.to }}
                  </span>
                  <span
                    class="text-[15px] font-bold leading-[21px]"
                    :class="orderTone[order.tone].price"
                    >{{ order.price }}</span
                  >
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
                <span class="text-[20px] font-bold leading-[28px] tabular-nums text-[#1e9e74]">{{
                  hero.phone.income.value
                }}</span>
                <span class="text-[14px] font-bold leading-[20px] text-[#1e9e74]">{{
                  hero.phone.income.delta
                }}</span>
              </p>
            </div>

            <!-- 禁配提示条 -->
            <div
              class="mt-[12px] flex items-center gap-[8px] rounded-[10px] bg-[#fdf1e8] px-[12px] py-[9px]"
            >
              <span class="h-[6px] w-[6px] shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              <p class="text-[11px] leading-[16px] text-[#c2571a]">{{ hero.phone.notice }}</p>
            </div>

            <!-- 底部导航：圆点分隔 -->
            <p
              class="mt-[16px] flex items-center justify-center gap-[10px] text-[11px] leading-[16px] text-[#9aa8a1]"
            >
              <template v-for="(tab, i) in hero.phone.tabs" :key="tab">
                <span
                  v-if="i > 0"
                  class="h-[3px] w-[3px] rounded-full bg-[#c6d2cc]"
                  aria-hidden="true"
                />
                <span>{{ tab }}</span>
              </template>
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 药丸 hover：跟首页 HomeHero 的 .feature-pill 一字不差地抄过来（scoped 样式不跨组件，
   换个页面就得带一份）。上浮 2px + 投影用 ::after 淡入，不动布局 */
.feature-pill {
  position: relative;
  transition:
    transform 260ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 260ms ease,
    background-color 260ms ease;
}

.feature-pill::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit; /* 跟胶囊圆角走 */
  box-shadow: 0 8px 18px -6px rgba(33, 50, 43, 0.3);
  opacity: 0;
  transition: opacity 260ms ease;
  pointer-events: none;
}

.feature-pill:hover {
  transform: translateY(-2px);
  border-color: var(--color-brand-300);
  background-color: #fff;
}

.feature-pill:hover::after {
  opacity: 1;
}

/* 关了动效就别浮了：位移本身也是"动"，只留颜色变化 */
@media (prefers-reduced-motion: reduce) {
  .feature-pill,
  .feature-pill::after {
    transition: none;
  }

  .feature-pill:hover {
    transform: none;
  }
}

/* 圆环呼吸：跟首页 hero 同款，4s 一个来回放大 3.5%。
   infinite 动画必须自己关 reduced-motion，全局规则会把它压成 0.01ms 疯狂空转 */
@keyframes drv-breathe {
  to {
    transform: scale(1.035);
  }
}

.drv-breathe {
  animation: drv-breathe 4s ease-in-out infinite alternate;
}

@media (prefers-reduced-motion: reduce) {
  .drv-breathe {
    animation: none;
  }
}
</style>
