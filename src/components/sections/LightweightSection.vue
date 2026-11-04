<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页第三屏：轻量化平台
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { siteConfig } from '@/config/site'
import checkIcon from '@/assets/home/icons/check-circle.png'
import tagErp from '@/assets/home/icons/tag-erp.png'
import tagInvest from '@/assets/home/icons/tag-invest.png'
import tagSpeed from '@/assets/home/icons/tag-speed.png'
import tagLaunch from '@/assets/home/icons/tag-launch.png'
import painPrice from '@/assets/home/icons/pain-price.png'
import painStaff from '@/assets/home/icons/pain-staff.png'
import painCompliance from '@/assets/home/icons/pain-compliance.png'
import lightInvest from '@/assets/home/icons/light-invest.png'
import lightOperate from '@/assets/home/icons/light-operate.png'
import lightMaintain from '@/assets/home/icons/light-maintain.png'
import lightDeploy from '@/assets/home/icons/light-deploy.png'
import capProduction from '@/assets/home/icons/cap-production.png'
import capDispatch from '@/assets/home/icons/cap-dispatch.png'
import capTrace from '@/assets/home/icons/cap-trace.png'
import capFinance from '@/assets/home/icons/cap-finance.png'

/**
 * 第三屏：轻量化平台（原型 03）。
 * 这屏内容最多：四个卖点胶囊、痛点面板、两组卡片、底部绿条。
 * 图标素材自带圆角底 tile，直接当图片用。
 */
const { lightweight } = siteConfig

// icon 名 → 素材。配置里存文件名，换图只动这里
const iconMap: Record<string, string> = {
  'tag-erp': tagErp,
  'tag-invest': tagInvest,
  'tag-speed': tagSpeed,
  'tag-launch': tagLaunch,
  'pain-price': painPrice,
  'pain-staff': painStaff,
  'pain-compliance': painCompliance,
  'light-invest': lightInvest,
  'light-operate': lightOperate,
  'light-maintain': lightMaintain,
  'light-deploy': lightDeploy,
  'cap-production': capProduction,
  'cap-dispatch': capDispatch,
  'cap-trace': capTrace,
  'cap-finance': capFinance,
}

// 和第二屏同一套：IntersectionObserver 滚进来才播入场
const root = ref<HTMLElement>()

onMounted(() => {
  const el = root.value
  if (!el) return
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    el.classList.add('in')
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.classList.add('in')
        io.disconnect()
      }
    },
    { threshold: 0.15 },
  )
  io.observe(el)
})
</script>

<template>
  <section ref="root" class="bg-white pb-[80px] pt-[90px]">
    <div class="container-page">
      <!-- 眉题：跟第二屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ lightweight.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ lightweight.title }}
      </h2>

      <!-- 一行说明：14px 弱化灰 -->
      <p class="reveal mt-[40px] text-[14px] leading-[22px] text-ink-600" style="--d: 160ms">
        {{ lightweight.desc }}
      </p>

      <!-- 四个卖点胶囊：等宽 60 高浅绿底，内容居中（白 tile 图标 + 深绿粗体）；
           窄屏 1 列，sm 起 2 列，lg 四列铺满 -->
      <div class="reveal mt-[30px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4" style="--d: 220ms">
        <div
          v-for="tag in lightweight.tags"
          :key="tag.text"
          class="flex h-[60px] items-center justify-center gap-[12px] rounded-[12px] bg-[#ecf7f1] px-[12px]"
        >
          <img loading="lazy" decoding="async" :src="iconMap[tag.icon]" alt="" class="h-[40px] w-[40px] shrink-0 select-none" />
          <span class="text-[16px] font-bold leading-[24px] text-[#2a5044]">{{ tag.text }}</span>
        </div>
      </div>

      <!-- 痛点面板：浅橙大底，三张白卡横排；卡内上行是图标+标题+右上角编号 -->
      <div
        class="reveal mt-[36px] rounded-[16px] bg-[#fff8f2] p-[24px]"
        style="--d: 460ms"
      >
        <p class="text-[12px] font-semibold leading-[18px] tracking-[0.02em] text-[#a35c30]">
          {{ lightweight.pain.title }}
        </p>

        <div class="mt-[16px] grid grid-cols-1 gap-[20px] md:grid-cols-3">
          <div
            v-for="(card, i) in lightweight.pain.cards"
            :key="card.no"
            class="reveal rounded-[12px] bg-white p-[20px]"
            :style="{ '--d': `${500 + i * 80}ms` }"
          >
            <div class="flex items-center">
              <img loading="lazy" decoding="async" :src="iconMap[card.icon]" alt="" class="h-[40px] w-[40px] shrink-0 select-none" />
              <h3 class="ml-[12px] text-[16px] font-bold leading-[24px] text-[#684023]">
                {{ card.title }}
              </h3>
              <!-- 编号：右上角浅棕 01/02/03 -->
              <span class="ml-auto text-[13px] font-semibold text-[#b5865f]">{{ card.no }}</span>
            </div>
            <p class="mt-[12px] text-[13px] leading-[22px] text-[#726054]">{{ card.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 两组「小标题 + 卡片」：cols=4 竖卡一排（投入轻那组），cols=2 宽卡两排（核心能力） -->
      <template v-for="(group, g) in lightweight.groups" :key="group.title">
        <h3
          class="reveal text-[16px] font-bold leading-[24px] text-ink-900"
          :class="g === 0 ? 'mt-[42px]' : 'mt-[42px]'"
          :style="{ '--d': `${g === 0 ? 740 : 1100}ms` }"
        >
          {{ group.title }}
        </h3>

        <div
          class="mt-[32px] grid grid-cols-1 gap-[24px]"
          :class="group.cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-2'"
        >
          <article
            v-for="(card, i) in group.cards"
            :key="card.title"
            class="reveal card-lift rounded-[16px] border border-ink-100 bg-white"
            :class="group.cols === 4 ? 'p-[24px]' : 'flex items-start gap-[16px] p-[32px]'"
            :style="{ '--d': `${(g === 0 ? 780 : 1140) + i * 80}ms` }"
          >
            <!-- 竖卡（4 列）：图标在上标题在下；宽卡（2 列）：图标标题一行，正文跟标题对齐 -->
            <template v-if="group.cols === 4">
              <img loading="lazy" decoding="async" :src="iconMap[card.icon]" alt="" class="h-[42px] w-[42px] select-none" />
              <h4 class="mt-[18px] text-[16px] font-bold leading-[24px] text-ink-900">
                {{ card.title }}
              </h4>
              <p class="mt-[6px] text-[13px] leading-[22px] text-ink-600">{{ card.desc }}</p>
            </template>
            <template v-else>
              <img loading="lazy" decoding="async" :src="iconMap[card.icon]" alt="" class="h-[64px] w-[64px] shrink-0 select-none" />
              <div class="min-w-0">
                <h4 class="text-[18px] font-bold leading-[26px] text-ink-900">{{ card.title }}</h4>
                <p class="mt-[10px] text-[14px] leading-[24px] text-ink-600">{{ card.desc }}</p>
              </div>
            </template>
          </article>
        </div>
      </template>

      <!-- 底部绿条：两条带勾短句左右排，窄屏上下堆 -->
      <div
        class="reveal mt-[24px] grid grid-cols-1 items-center gap-[12px] rounded-[12px] bg-[#e7f2eb] px-[24px] py-[20px] lg:grid-cols-2 lg:py-0 lg:h-[82px]"
        style="--d: 1420ms"
      >
        <div
          v-for="note in lightweight.notes"
          :key="note"
          class="flex items-center gap-[12px]"
        >
          <img loading="lazy" decoding="async" :src="checkIcon" alt="" class="h-[20px] w-[20px] shrink-0 select-none" />
          <p class="text-[14px] leading-[22px] text-[#2e5445]">{{ note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 入场跟第二屏完全同一套：.in 触发一次性动画，延迟走行内 --d，
   不用 transition-delay（会连 hover 上浮一起拖慢） */
.reveal {
  opacity: 0;
}

.in .reveal {
  opacity: 1;
  animation: lw-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes lw-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
  }

  .in .reveal {
    animation: none;
  }
}
</style>
