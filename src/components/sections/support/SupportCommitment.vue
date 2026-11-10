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
 * 「闭环售后」的循环箭头没素材，按原型内联 SVG 画，tile 用采样的 #2a3f38 补齐。
 */
const { commitment } = siteConfig.support

// icon 短名 → 素材；loop 没有素材，走模板里的内联 SVG，这里留空占位
const iconMap: Record<(typeof commitment.cards)[number]['icon'], string> = {
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
  <!-- 区块：深绿对角渐变 #0f241d→#0b1a15，上留白 88px、下 96px -->
  <section ref="root" class="bg-gradient-to-br from-[#0f241d] to-[#0b1a15] pb-[96px] pt-[88px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙，深底上照样用品牌橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ commitment.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗，深底用纯白 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-white"
        style="--d: 80ms"
      >
        {{ commitment.title }}
      </h2>

      <!-- 说明：mt-[24px] 与标题间距 24px，max-w 820px；14px/24px，深底用 #b1c5bc 灰绿 -->
      <p
        class="reveal mt-[24px] max-w-[820px] text-[14px] leading-[24px] text-[#b1c5bc]"
        style="--d: 160ms"
      >
        {{ commitment.desc }}
      </p>

      <!-- 四张准则卡：mt-[36px] 与说明间距 36px、gap 18px；
           手机 1 列 → sm 2 列 → lg 4 列，每张错峰 80ms。
           卡底 #17322b 无边框，靠底色差分层；border-transparent 常留 1px 透明边，
           hover 才显 #33544a（直接加 border 会挤掉 1px 内容宽度，文字跳一下），投影走 .card-lift-dark -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(card, i) in commitment.cards"
          :key="card.title"
          class="cmt-card reveal card-lift card-lift-dark rounded-[12px] border border-transparent bg-[#17322b] p-[20px]"
          :style="{ '--d': `${240 + i * 80}ms` }"
        >
          <!-- 闭环售后的循环箭头：SVG 照原型画，tile 40×40 底色采自 PNG 图标的圆角块 -->
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
          <!-- 其余三张：40×40 PNG，素材自带深绿圆角底；hover 卡片时图标放大到 1.06 -->
          <img
            v-else
            loading="lazy"
            decoding="async"
            :src="iconMap[card.icon]"
            alt=""
            aria-hidden="true"
            class="cmt-icon h-[40px] w-[40px] select-none"
          />

          <!-- 卡标题：mt-[16px] 与图标间距 16px；15px/22px 加粗纯白 -->
          <h3 class="mt-[16px] text-[15px] font-bold leading-[22px] text-white">
            {{ card.title }}
          </h3>
          <!-- 卡正文：mt-[10px] 与标题间距 10px；13px/22px，#afc8c2 浅灰绿 -->
          <p class="mt-[10px] text-[13px] leading-[22px] text-[#afc8c2]">{{ card.desc }}</p>
        </article>
      </div>

      <!-- 指标区：mt-[44px] 与卡片间距 44px，1px 分隔线 #2f423c，pt-[32px] 后开始 -->
      <div class="reveal mt-[44px] border-t border-[#2f423c] pt-[32px]" style="--d: 560ms">
        <!-- 指标栅格：手机 2 列、lg 4 列，行距 24px；tabular-nums 等宽数字，递增时不左右抖 -->
        <dl ref="stats" class="grid grid-cols-2 gap-y-[24px] lg:grid-cols-4">
          <div v-for="stat in statsView" :key="stat.label">
            <!-- 标签给读屏用（视觉上是 dd 下方那行），所以这里 sr-only -->
            <dt class="sr-only">{{ stat.label }}</dt>
            <!-- 数值：22px/30px 加粗纯白，data-* 给 useCountUp 传目标值和尾巴 -->
            <dd
              class="text-[22px] font-bold leading-[30px] tabular-nums text-white"
              :data-num="stat.num"
              :data-rest="stat.rest"
            >
              <!-- 初始渲染 0+尾巴，防「先闪终值再跳回 0」；拆不出数字的原样渲染 -->
              {{ stat.num !== null ? `0${stat.rest}` : stat.rest }}
            </dd>
            <!-- 指标名：mt-[6px] 与数值间距 6px；12px/18px，#a8b9b1 -->
            <p class="mt-[6px] text-[12px] leading-[18px] text-[#a8b9b1]">{{ stat.label }}</p>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cmt-card {
  transition: border-color 240ms ease;
}

.cmt-card:hover {
  border-color: #33544a;
}

.cmt-icon {
  transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
}

.cmt-card:hover .cmt-icon {
  transform: scale(1.06);
}

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
