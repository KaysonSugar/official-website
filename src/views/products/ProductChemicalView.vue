<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 化工生产页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import ProductChemicalHero from '@/components/sections/products/chemical/ProductChemicalHero.vue'
import ProductChainsSection from '@/components/sections/products/chemical/ProductChainsSection.vue'
import ProductReportSection from '@/components/sections/products/chemical/ProductReportSection.vue'
import ProductTourSection from '@/components/sections/products/chemical/ProductTourSection.vue'

// 化工生产 /products/chemical（/products 也重定向到这里）。
// 首屏：浅橙渐变 + 资金流水演示卡；第二屏：三条主线 + 订单驱动流程面板；
// 第三屏：界面展示四行图文交替；第四屏：报表中心四维度卡。后面的屏等画板
</script>

<template>
  <ProductChemicalHero />
  <ProductChainsSection />
  <ProductTourSection />
  <ProductReportSection />
  <!-- TODO: 本页其余区块，等后续画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
