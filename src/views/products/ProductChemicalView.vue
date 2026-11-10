<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 化工生产页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import ProductChemicalHero from '@/components/sections/products/chemical/ProductChemicalHero.vue'
import ProductChemicalChains from '@/components/sections/products/chemical/ProductChemicalChains.vue'
import ProductChemicalReport from '@/components/sections/products/chemical/ProductChemicalReport.vue'
import ProductChemicalTour from '@/components/sections/products/chemical/ProductChemicalTour.vue'
</script>

<template>
  <!-- 首屏：资金流水演示卡 -->
  <ProductChemicalHero />
  <!-- 第二屏：三条业务主线与订单驱动流程 -->
  <ProductChemicalChains />
  <!-- 第三屏：界面展示，四行图文交替 -->
  <ProductChemicalTour />
  <!-- 第四屏：报表中心，四个维度自动成表 -->
  <ProductChemicalReport />
  <!-- 结尾：底部行动号召 -->
  <CtaBanner />
</template>
