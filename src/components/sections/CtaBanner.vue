<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 底部行动号召
-->
<script setup lang="ts">
import { siteConfig } from '@/config/site'

const { cta, contact } = siteConfig

// 底部行动号召（原型 CTA Card），八个页面共用 siteConfig.cta 的文案。
// 橙渐变 + 白按钮 + 按钮下电话小字，几何全按 4 倍原型图 ÷4 量的：
// 卡 1280×222、圆角 30、左 padding 57、按钮 153×53 距右 129。
</script>

<template>
  <!-- 外层白底：给上面区块留条干净的过渡带，不管前面是白底还是浅灰都不撞 -->
  <section class="bg-white py-14 sm:py-16 lg:py-20">
    <div class="container-page">
      <!-- 橙渐变横幅：原型左上亮右下深（#fa792f→#db470b 对角），投影烘焙在原型里，
           这里用 CSS 柔影还原；lg 起左右两栏垂直居中，窄屏上下堆叠 -->
      <div
        class="cta-card relative overflow-hidden rounded-[30px] px-[32px] py-[44px] sm:px-[44px] sm:py-[52px] lg:flex lg:items-center lg:justify-between lg:gap-[48px] lg:px-[57px] lg:py-[62px]"
      >
        <!-- 文案区：max-w 限住换行宽度，原型 desc 正好折两行 -->
        <div class="relative max-w-[620px]">
          <!-- 标题：原型量出 32px 加粗白字 -->
          <h2
            class="text-[26px] font-bold leading-[38px] text-white sm:text-[30px] sm:leading-[42px] lg:text-[32px]"
          >
            {{ cta.title }}
          </h2>

          <!-- 说明：纯白而不是白 85%。半透明白混深橙底只有 2.9:1，
               14px 正文要 4.5，纯白能到 4.26——橙底压着，这是上限了 -->
          <p class="mt-[16px] text-[14px] leading-[24px] text-white">
            {{ cta.desc }}
          </p>
        </div>

        <!-- 动作区：白底主按钮 + 下方电话小字，右缘距卡右 129 由 lg:px-[57px] 加 justify-between 一起兜住 -->
        <div class="relative mt-[32px] shrink-0 lg:mt-0">
          <!-- 主按钮：白底深橙字（brand-700），原型 153×53 → 15px 字 + 左右 30 上下 16 -->
          <a
            :href="contact.ctaHref"
            class="inline-flex items-center justify-center rounded-[10px] bg-white px-[30px] py-[16px] text-[15px] font-medium leading-[21px] text-brand-700 transition-colors duration-200 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {{ cta.button }}
          </a>
          <!-- 小字：12px 纯白，跟按钮左对齐（原型里就是齐左）。
               别用白 80%——混深橙底只有 2.38:1，小字在强光屏上基本看不清 -->
          <p class="mt-[14px] text-[12px] leading-[18px] text-white">
            {{ cta.phoneNote }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 橙渐变：原型卡内采样，左上 #fa792f → 中段 #e65412 → 右下 #db470b；
   投影用品牌橙压暗，别用中性黑——原型阴影带着橙调 */
.cta-card {
  background: linear-gradient(135deg, #fa792f 0%, #e65412 48%, #db470b 100%);
  box-shadow: 0 30px 70px -32px rgba(219, 71, 11, 0.5);
}
</style>
