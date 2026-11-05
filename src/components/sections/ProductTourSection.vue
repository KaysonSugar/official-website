<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 化工生产第三屏：界面展示（四行图文交替）
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import imgWarehouse from '@/assets/products/chemical/images/tour-warehouse.webp'
import imgProduction from '@/assets/products/chemical/images/tour-production.webp'
import imgQuality from '@/assets/products/chemical/images/tour-quality.webp'
import imgCustomer from '@/assets/products/chemical/images/tour-customer.webp'

/**
 * 界面展示（原型 P 界面实录）：深绿底、四行图文交替。
 * 图是系统真实界面截图（带烘焙文字但内容本身就是截图，和首页看板图同理直接用图片），
 * 文字列两种形态：01 仓储是「名 + 描述」两栏行，02~04 是绿点列表。
 * 图文比例约 7:5，单数行图在右、双数行图在左（flip 控制），手机端全部退化为上下堆叠。
 */
const { tour } = siteConfig.chemical

const imageMap = {
  warehouse: imgWarehouse,
  production: imgProduction,
  quality: imgQuality,
  customer: imgCustomer,
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 深绿底：顶部更黑一点，往下微亮，都是原图采的色 -->
  <section ref="root" class="bg-gradient-to-b from-[#0d1c17] to-[#12211a] pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题 / 标题 / 描述：深底浅绿 + 白 + 灰绿 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-[#6adbb0] sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ tour.eyebrow }}
      </p>
      <h2 class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-white" style="--d: 80ms">
        {{ tour.title }}
      </h2>
      <p class="reveal mt-[14px] max-w-[720px] text-[14px] leading-[24px] text-[#bacec5]" style="--d: 160ms">
        {{ tour.desc }}
      </p>

      <!-- 四行图文交替：文字列 5 份、图 7 份；flip 时 lg 下图挪到前面 -->
      <div class="mt-[56px] flex flex-col gap-[48px]">
        <div
          v-for="(row, i) in tour.rows"
          :key="row.label"
          class="reveal grid items-center gap-[28px] lg:grid-cols-[5fr_7fr] lg:gap-[56px]"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <!-- 文字列 -->
          <div :class="row.flip ? 'lg:order-2' : ''">
            <p class="text-[13px] font-semibold leading-[18px] text-[#76d4af]">{{ row.label }}</p>

            <!-- 名 + 描述 两栏行（01 仓储） -->
            <div v-if="row.pairs?.length" class="mt-[22px] flex flex-col gap-[18px]">
              <div v-for="pair in row.pairs" :key="pair.name" class="flex gap-[16px] sm:gap-[24px]">
                <span class="w-[7.5em] shrink-0 text-[15px] font-bold leading-[24px] text-[#effef7]">
                  {{ pair.name }}
                </span>
                <span class="text-[13px] leading-[22px] text-[#bacec5]">{{ pair.desc }}</span>
              </div>
            </div>

            <!-- 绿点列表（02~04） -->
            <ul v-else-if="row.bullets?.length" class="mt-[22px] flex flex-col gap-[14px]">
              <li v-for="item in row.bullets" :key="item" class="flex gap-[12px]">
                <span class="mt-[8px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#6adbb0]" aria-hidden="true" />
                <span class="text-[13px] leading-[22px] text-[#bacec5]">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- 界面截图：白底圆角卡，细白描边 + 投影在深底上分层。
               素材是原生 3085px 无损 webp（不缩不压），小字才不发糊；aspect-ratio 提前占位防抖 -->
          <img
            loading="lazy"
            decoding="async"
            :src="imageMap[row.image]"
            :alt="row.label"
            :style="{ aspectRatio: row.ratio }"
            class="w-full select-none rounded-[12px] object-cover shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
            :class="row.flip ? 'lg:order-1' : ''"
          />
        </div>
      </div>
    </div>
  </section>
</template>
