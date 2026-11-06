<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端第四屏：核心界面一览
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import screenWorkbench from '@/assets/products/driver/images/screen-workbench.webp'
import screenMarket from '@/assets/products/driver/images/screen-market.webp'
import screenLoad from '@/assets/products/driver/images/screen-load.webp'
import screenRoute from '@/assets/products/driver/images/screen-route.webp'

/**
 * 核心界面一览（原型 E）：四列「编号 + 场景名 + 真机截图」。
 * 四张截图是真实界面导出图（text 烘焙在图里但这就是要展示的 App 本身），留图不重画。
 */
const { screens } = siteConfig.driver

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

const imgMap = {
  workbench: screenWorkbench,
  market: screenMarket,
  load: screenLoad,
  route: screenRoute,
} as const
</script>

<template>
  <section ref="root" class="bg-white pb-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.08em] text-brand-500"
        style="--d: 0ms"
      >
        {{ screens.eyebrow }}
      </p>
      <h2
        class="reveal mt-[16px] text-[30px] font-bold leading-[40px] text-ink-900"
        style="--d: 80ms"
      >
        {{ screens.title }}
      </h2>
      <p class="reveal mt-[12px] text-[14px] leading-[24px] text-[#6b6b6b]" style="--d: 160ms">
        {{ screens.desc }}
      </p>

      <!-- 四列截图：编号橙色小字 + 场景名。素材自带透明圆角，直接素图展示，
           不加投影和描边——阴影会从透明圆角里透出来，看着像黑边 -->
      <div class="mt-[36px] grid gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
        <figure
          v-for="(item, i) in screens.items"
          :key="item.no"
          class="reveal"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <figcaption class="flex items-baseline gap-[8px]">
            <span class="text-[12px] font-bold leading-[17px] tabular-nums text-brand-500">{{
              item.no
            }}</span>
            <span class="text-[15px] font-bold leading-[21px] text-ink-900">{{ item.label }}</span>
          </figcaption>
          <!-- 素材自带透明圆角（1220×1644），width/height 声明固有比例防布局抖动。
               hover 放大 2%：透明圆角吃不了矩形投影（会透出来当黑边），
               缩放跟本页优势图标同一类反馈；260ms 起停都缓，跟首页 hover 同节奏 -->
          <img
            :src="imgMap[item.img]"
            :alt="`${item.label}界面截图`"
            width="1220"
            height="1644"
            class="mt-[14px] w-full select-none transition-transform duration-[260ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02]"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  </section>
</template>
