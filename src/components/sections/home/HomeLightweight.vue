<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页第三屏：轻量化平台
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import checkIcon from '@/assets/home/icons/check-circle.webp'
import tagErp from '@/assets/home/icons/tag-erp.webp'
import tagInvest from '@/assets/home/icons/tag-invest.webp'
import tagSpeed from '@/assets/home/icons/tag-speed.webp'
import tagLaunch from '@/assets/home/icons/tag-launch.webp'
import painPrice from '@/assets/home/icons/pain-price.webp'
import painStaff from '@/assets/home/icons/pain-staff.webp'
import painCompliance from '@/assets/home/icons/pain-compliance.webp'
import lightInvest from '@/assets/home/icons/light-invest.webp'
import lightOperate from '@/assets/home/icons/light-operate.webp'
import lightMaintain from '@/assets/home/icons/light-maintain.webp'
import lightDeploy from '@/assets/home/icons/light-deploy.webp'
import capProduction from '@/assets/home/icons/cap-production.webp'
import capDispatch from '@/assets/home/icons/cap-dispatch.webp'
import capTrace from '@/assets/home/icons/cap-trace.webp'
import capFinance from '@/assets/home/icons/cap-finance.webp'

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

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：bg-white 白底、pt-[96px] 上留白 96px、pb-[64px] 下留白 64px -->
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：reveal 走入场；11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ lightweight.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 50ms"
      >
        {{ lightweight.title }}
      </h2>

      <!-- 说明：mt-[40px] 与标题间距 40px；14px/22px、ink-600 弱灰 -->
      <p class="reveal mt-[40px] text-[14px] leading-[22px] text-ink-600" style="--d: 100ms">
        {{ lightweight.desc }}
      </p>

      <!-- 胶囊栅格：mt-[30px] 与说明间距 30px；gap-[20px]；
           手机 1 列 → sm 2 列 → lg 4 列等宽。
           整屏入场压在 620ms 内：超了用户滚过去还在等，看着像卡住 -->
      <div
        class="reveal mt-[30px] grid grid-cols-1 gap-[20px] sm:grid-cols-2 lg:grid-cols-4"
        style="--d: 140ms"
      >
        <!-- 单颗胶囊：h-[60px] 定高、flex 居中、gap-[12px] 图标与文字间距、
             px-[12px] 左右内边距、rounded-[12px] 圆角、#ecf7f1 浅绿底 -->
        <div
          v-for="tag in lightweight.tags"
          :key="tag.text"
          class="flex h-[60px] items-center justify-center gap-[12px] rounded-[12px] bg-[#ecf7f1] px-[12px]"
        >
          <img
            loading="lazy"
            decoding="async"
            :src="iconMap[tag.icon]"
            alt=""
            aria-hidden="true"
            class="h-[40px] w-[40px] shrink-0 select-none"
          />
          <!-- 胶囊文字：16px/24px 加粗、#2a5044 深绿 -->
          <span class="text-[16px] font-bold leading-[24px] text-[#2a5044]">{{ tag.text }}</span>
        </div>
      </div>

      <!-- 痛点面板：mt-[36px] 与胶囊间距 36px；p-[24px] 内边距、
           rounded-[16px] 圆角、#fff8f2 浅橙底 -->
      <div class="reveal mt-[36px] rounded-[16px] bg-[#fff8f2] p-[24px]" style="--d: 180ms">
        <p class="text-[12px] font-semibold leading-[18px] tracking-[0.02em] text-[#a35c30]">
          {{ lightweight.pain.title }}
        </p>

        <!-- 三卡栅格：mt-[16px] 与小标题间距 16px；gap-[20px]，手机 1 列 → md 3 列 -->
        <div class="mt-[16px] grid grid-cols-1 gap-[20px] md:grid-cols-3">
          <div
            v-for="(card, i) in lightweight.pain.cards"
            :key="card.no"
            class="reveal card-lift rounded-[12px] bg-white p-[20px]"
            :style="{ '--d': `${205 + i * 35}ms` }"
          >
            <div class="flex items-center">
              <!-- 图标：40×40 固定、shrink-0 不参与压缩；hover 卡片时放大到 1.06（见末尾 style） -->
              <img
                loading="lazy"
                decoding="async"
                :src="iconMap[card.icon]"
                alt=""
                aria-hidden="true"
                class="pain-icon h-[40px] w-[40px] shrink-0 select-none"
              />
              <h3 class="ml-[12px] text-[16px] font-bold leading-[24px] text-[#684023]">
                {{ card.title }}
              </h3>
              <!-- 编号：ml-auto 推到最右；13px 加粗、#b5865f 浅棕 -->
              <span class="ml-auto text-[13px] font-semibold text-[#b5865f]">{{ card.no }}</span>
            </div>
            <p class="mt-[12px] text-[13px] leading-[22px] text-[#726054]">{{ card.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 两组「小标题 + 卡片」：group.cols=4 走竖卡，group.cols=2 走宽卡 -->
      <template v-for="(group, g) in lightweight.groups" :key="group.title">
        <!-- 分组小标题：mt-[42px] 与上一组间距 42px；16px/24px 加粗、ink-900 -->
        <h3
          class="reveal mt-[42px] text-[16px] font-bold leading-[24px] text-ink-900"
          :style="{ '--d': `${g === 0 ? 330 : 500}ms` }"
        >
          {{ group.title }}
        </h3>

        <!-- 卡栅格：mt-[32px] 与小标题间距 32px；gap-[24px]；
             手机 1 列，cols=4 → sm 2 列 / lg 4 列，cols=2 → lg 2 列 -->
        <div
          class="mt-[32px] grid grid-cols-1 gap-[24px]"
          :class="group.cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-2'"
        >
          <article
            v-for="(card, i) in group.cards"
            :key="card.title"
            class="reveal card-lift rounded-[16px] border border-ink-100 bg-white"
            :class="group.cols === 4 ? 'p-[24px]' : 'flex items-start gap-[16px] p-[32px]'"
            :style="{ '--d': `${(g === 0 ? 350 : 520) + i * 35}ms` }"
          >
            <!-- 竖卡：图标 42px 在上，mt-[18px] 接 16px 标题；
                 宽卡：64px 图标与文字横排，gap-[16px] 间距 -->
            <template v-if="group.cols === 4">
              <img
                loading="lazy"
                decoding="async"
                :src="iconMap[card.icon]"
                alt=""
                aria-hidden="true"
                class="h-[42px] w-[42px] select-none"
              />
              <h4 class="mt-[18px] text-[16px] font-bold leading-[24px] text-ink-900">
                {{ card.title }}
              </h4>
              <p class="mt-[6px] text-[13px] leading-[22px] text-ink-600">{{ card.desc }}</p>
            </template>
            <template v-else>
              <img
                loading="lazy"
                decoding="async"
                :src="iconMap[card.icon]"
                alt=""
                aria-hidden="true"
                class="h-[64px] w-[64px] shrink-0 select-none"
              />
              <div class="min-w-0">
                <h4 class="text-[18px] font-bold leading-[26px] text-ink-900">{{ card.title }}</h4>
                <p class="mt-[10px] text-[14px] leading-[24px] text-ink-600">{{ card.desc }}</p>
              </div>
            </template>
          </article>
        </div>
      </template>

      <!-- 绿条：mt-[24px] 与上方间距 24px；手机 1 列、lg 2 列；
           px-[24px]，手机 py-[20px]，lg 下 py-0 + h-[82px] 定高 -->
      <div
        class="reveal mt-[24px] grid grid-cols-1 items-center gap-[12px] rounded-[12px] bg-[#e7f2eb] px-[24px] py-[20px] lg:grid-cols-2 lg:py-0 lg:h-[82px]"
        style="--d: 610ms"
      >
        <!-- 单条：flex 横排、gap-[12px] 图标与文字间距 -->
        <div v-for="note in lightweight.notes" :key="note" class="flex items-center gap-[12px]">
          <img
            loading="lazy"
            decoding="async"
            :src="checkIcon"
            alt=""
            aria-hidden="true"
            class="h-[20px] w-[20px] shrink-0 select-none"
          />
          <p class="text-[14px] leading-[22px] text-[#2e5445]">{{ note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pain-icon {
  transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-lift:hover .pain-icon {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .pain-icon {
    transition: none;
  }

  .card-lift:hover .pain-icon {
    transform: none;
  }
}
</style>
