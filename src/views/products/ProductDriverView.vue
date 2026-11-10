<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机作业页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import ProductDriverHero from '@/components/sections/products/driver/ProductDriverHero.vue'
import ProductDriverAdvantage from '@/components/sections/products/driver/ProductDriverAdvantage.vue'
import ProductDriverWorkflow from '@/components/sections/products/driver/ProductDriverWorkflow.vue'
import ProductDriverScreens from '@/components/sections/products/driver/ProductDriverScreens.vue'
import ProductDriverRecruit from '@/components/sections/products/driver/ProductDriverRecruit.vue'
</script>

<template>
  <!-- 首屏：附近货源手机演示 -->
  <ProductDriverHero />
  <!-- 第二屏：平台优势四枚插画 -->
  <ProductDriverAdvantage />
  <!-- 第三屏：接单作业四步 -->
  <ProductDriverWorkflow />
  <!-- 第四屏：核心界面一览 -->
  <ProductDriverScreens />
  <!-- 第五屏：司机招募 -->
  <ProductDriverRecruit />
  <!-- 结尾：底部行动号召 -->
  <CtaBanner />
</template>
