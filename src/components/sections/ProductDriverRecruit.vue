<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端第五屏：司机招募
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import recruitTruck from '@/assets/products/driver/images/recruit-truck.webp'
import qrDownload from '@/assets/products/driver/images/qr-download.png'

/**
 * 司机招募（原型 F）：薄荷绿大圆角容器，左文案右插画。
 * 三个统计数字是品牌绿，二维码白卡 + 右侧两行说明。
 */
const { recruit } = siteConfig.driver

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[96px]">
    <div class="container-page">
      <div class="reveal grid items-center gap-[40px] rounded-[24px] bg-[#e9f5ef] p-[40px] md:p-[56px] lg:grid-cols-[1fr_460px]">
        <!-- 左列：文案 + 统计 + 二维码 -->
        <div>
          <p class="text-[12px] font-semibold leading-[18px] tracking-[0.08em] text-brand-500">
            {{ recruit.eyebrow }}
          </p>
          <h2 class="mt-[16px] text-[28px] font-bold leading-[38px] text-ink-900 md:text-[32px] md:leading-[42px]">
            {{ recruit.title }}
          </h2>
          <p class="mt-[14px] max-w-[480px] text-[14px] leading-[24px] text-[#5e7169]">
            {{ recruit.desc }}
          </p>

          <!-- 三个统计：数字品牌绿加粗 -->
          <div class="mt-[28px] flex flex-wrap gap-x-[56px] gap-y-[20px]">
            <div v-for="stat in recruit.stats" :key="stat.label">
              <p class="text-[28px] font-bold leading-[36px] tabular-nums text-mint-600">{{ stat.value }}</p>
              <p class="mt-[4px] text-[13px] leading-[19px] text-[#5e7169]">{{ stat.label }}</p>
            </div>
          </div>

          <!-- 二维码块：白卡 + 右侧说明 -->
          <div class="mt-[32px] flex items-center gap-[18px]">
            <span class="block w-[104px] shrink-0 overflow-hidden rounded-[12px] bg-white p-[8px] shadow-[0_8px_24px_-10px_rgba(19,50,42,0.25)]">
              <img :src="qrDownload" alt="司机端下载二维码" class="w-full select-none" />
            </span>
            <div>
              <p class="text-[15px] font-bold leading-[21px] text-ink-900">{{ recruit.qr.title }}</p>
              <p class="mt-[5px] text-[13px] leading-[20px] text-[#5e7169]">{{ recruit.qr.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 右列：罐车 + 司机插画（960×698，固有尺寸防布局抖动） -->
        <img
          :src="recruitTruck"
          alt="威易达司机与危化品运输车"
          width="960"
          height="698"
          class="w-full select-none rounded-[16px] shadow-[0_20px_50px_-24px_rgba(19,50,42,0.35)]"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>
