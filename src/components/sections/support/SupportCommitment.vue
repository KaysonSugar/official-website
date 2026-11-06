<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 服务支持第五屏：服务承诺
-->
<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useCountUp } from '@/composables/useCountUp'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconSign from '@/assets/support/icons/cmt-sign.webp'
import iconChecklist from '@/assets/support/icons/cmt-checklist.webp'
import iconSchedule from '@/assets/support/icons/cmt-schedule.webp'

/**
 * 第五屏：四项交付准则，写入服务范围（原型 S4）。
 * 深绿屏（对角渐变 #0f241d→#0b1a15，比首页 S8 的深绿更黑一点），
 * 四张准则卡 #17322b 无边框，图标 PNG 自带深绿圆角 tile；
 * 第四卡「闭环售后」的循环箭头用户没给素材，按原型内联 SVG 画，tile 用采样的 #2a3f38 补齐。
 * 底部四个硬指标接公共 useCountUp 滚动（2026-11-06 用户要求）。
 */
const { commitment } = siteConfig.support

const iconMap = {
  sign: iconSign,
  checklist: iconChecklist,
  schedule: iconSchedule,
  loop: '',
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 拆前导数字和尾巴：「7×24」→ 7 + 「×24」，「100%」→ 100 + 「%」。
// 滚动只动前导数字，×24 / 对 1 / –15 这些尾巴保持静止，避免 7×24 数成 6×23 之类的怪值
const statsView = computed(() =>
  commitment.stats.map((stat) => {
    const m = /^(\d+)(.*)$/.exec(stat.value)
    return m
      ? { num: m[1], rest: m[2], label: stat.label }
      : { num: null, rest: stat.value, label: stat.label }
  }),
)

const statsEl = useTemplateRef<HTMLElement>('stats')
useCountUp(statsEl)
</script>

<template>
  <section ref="root" class="bg-gradient-to-br from-[#0f241d] to-[#0b1a15] pb-[96px] pt-[88px]">
    <div class="container-page">
      <!-- 眉题：品牌橙 #ff833f，全站统一（原来这块深底单独用浅绿） -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ commitment.eyebrow }}
      </p>

      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-white"
        style="--d: 80ms"
      >
        {{ commitment.title }}
      </h2>

      <p
        class="reveal mt-[24px] max-w-[820px] text-[14px] leading-[24px] text-[#b1c5bc]"
        style="--d: 160ms"
      >
        {{ commitment.desc }}
      </p>

      <!-- 四张准则卡：md 四列，手机单列；卡底 #17322b，无边框，靠底色差分层 -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(card, i) in commitment.cards"
          :key="card.title"
          class="cmt-card reveal card-lift card-lift-dark rounded-[12px] border border-transparent bg-[#17322b] p-[20px]"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- loop 的循环箭头没素材，SVG 照原型画；tile 底色采自 PNG 图标的圆角块 -->
          <span
            v-if="card.icon === 'loop'"
            class="cmt-icon flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#2a3f38]"
            aria-hidden="true"
          >
            <svg class="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none">
              <path
                d="M18.5 8.5A7.5 7.5 0 0 0 5.6 6.8M5.5 15.5a7.5 7.5 0 0 0 12.9 1.7"
                stroke="#99e2c4"
                stroke-width="2.2"
                stroke-linecap="round"
              />
              <path
                d="M18.8 3.6v5h-5M5.2 20.4v-5h5"
                stroke="#99e2c4"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <img
            v-else
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="cmt-icon h-[40px] w-[40px] select-none"
          />

          <h3 class="mt-[16px] text-[15px] font-bold leading-[22px] text-white">
            {{ card.title }}
          </h3>
          <p class="mt-[10px] text-[13px] leading-[22px] text-[#afc8c2]">{{ card.desc }}</p>
        </article>
      </div>

      <!-- 分隔线 + 硬指标行：数字列与上面四卡对齐，左对齐；滚进视口前导数字从 0 数上去 -->
      <div class="reveal mt-[44px] border-t border-[#2f423c] pt-[32px]" style="--d: 560ms">
        <dl ref="stats" class="grid grid-cols-2 gap-y-[24px] lg:grid-cols-4">
          <div v-for="stat in statsView" :key="stat.label">
            <dt class="sr-only">{{ stat.label }}</dt>
            <dd
              class="text-[22px] font-bold leading-[30px] tabular-nums text-white"
              :data-num="stat.num"
              :data-rest="stat.rest"
            >
              <!-- 初始渲染 0+尾巴，防「闪终值再跳回 0」；拆不动的原样渲染 -->
              {{ stat.num !== null ? `0${stat.rest}` : stat.rest }}
            </dd>
            <p class="mt-[6px] text-[12px] leading-[18px] text-[#a8b9b1]">{{ stat.label }}</p>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 四张准则卡：暗底投影（.card-lift-dark，见 style.css）+ 边框提亮两级。
   卡片本来无边框，常态留 1px 透明边，hover 时才显色——直接加 border 会挤掉 1px 内容宽度，
   从透明起手就没有这个跳动 */
.cmt-card {
  transition: border-color 240ms ease;
}

.cmt-card:hover {
  border-color: #33544a;
}

/* 图标轻放大 6%：只作用在图标元素上（无文字），跟卡片浮起凑成两级反馈。
   曲线 0.4/0/0.2/1 跟首页法规卡、功能卡、服务卡同款 */
.cmt-icon {
  transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
}

.cmt-card:hover .cmt-icon {
  transform: scale(1.06);
}

/* 减弱动效：不缩放不描边，只留卡片自己的投影浮现 */
@media (prefers-reduced-motion: reduce) {
  .cmt-card,
  .cmt-icon {
    transition: none;
  }

  .cmt-card:hover .cmt-icon {
    transform: none;
  }
}
</style>
