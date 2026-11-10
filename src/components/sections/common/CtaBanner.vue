<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 底部行动号召
-->
<script setup lang="ts">
import { siteConfig } from '@/config/site'
import { useLeadForm } from '@/composables/useLeadForm'

/** 底部行动号召：橙渐变横幅 + 白按钮 + 电话小字，八个页面共用 siteConfig.cta 的文案 */
const { cta } = siteConfig
const { openLeadForm } = useLeadForm()
</script>

<template>
  <!-- 外层白底：给上下区块留过渡带，前面是白底还是浅灰都不撞 -->
  <section class="bg-white py-[56px] sm:py-[64px] lg:py-[80px]">
    <div class="container-page">
      <!-- 橙渐变横幅：几何按 4 倍原型图 ÷4 量，圆角 30px，lg 起左右两栏垂直居中 -->
      <div
        class="cta-card relative overflow-hidden rounded-[30px] px-[32px] py-[44px] sm:px-[44px] sm:py-[52px] lg:flex lg:items-center lg:justify-between lg:gap-[48px] lg:px-[57px] lg:py-[62px]"
      >
        <!-- 文案区：限宽 620px，原型 desc 正好折两行 -->
        <div class="relative max-w-[620px]">
          <!-- 标题：26 / 30 / 32px，行高 38 / 42 -->
          <h2
            class="text-[26px] font-bold leading-[38px] text-white sm:text-[30px] sm:leading-[42px] lg:text-[32px]"
          >
            {{ cta.title }}
          </h2>

          <!-- 说明：14px 纯白，不要半透明白，橙底上对比度不够 -->
          <p class="mt-[16px] text-[14px] leading-[24px] text-white">
            {{ cta.desc }}
          </p>
        </div>

        <!-- 动作区：按钮原型 153×53（15px 字、左右 30 上下 16），下留 14px 给电话小字 -->
        <div class="relative mt-[32px] shrink-0 lg:mt-0">
          <!-- 手写按钮不用 BaseButton：原型圆角 10px、内边距和 lg 档对不上 -->
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-[10px] bg-white px-[30px] py-[16px] text-[15px] font-medium leading-[21px] text-brand-700 transition-colors duration-200 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            @click="openLeadForm"
          >
            {{ cta.button }}
          </button>
          <!-- 电话小字：12px 纯白，与按钮齐左 -->
          <p class="mt-[14px] text-[12px] leading-[18px] text-white">
            {{ cta.phoneNote }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-card {
  background: linear-gradient(135deg, #fa792f 0%, #e65412 48%, #db470b 100%);
  box-shadow: 0 30px 70px -32px rgba(219, 71, 11, 0.5);
}
</style>
