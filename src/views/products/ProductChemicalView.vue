<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 化工生产页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import ProductChemicalHero from '@/components/sections/ProductChemicalHero.vue'
import ProductChainsSection from '@/components/sections/ProductChainsSection.vue'

// 化工生产 /products/chemical（/products 也重定向到这里）。
// 首屏：浅橙渐变 + 资金流水演示卡；第二屏：三条主线 + 订单驱动流程面板。
// 后面还有屏（卡片栅格、档案对照表、电子台账、实施路径）等画板
</script>

<template>
  <ProductChemicalHero />
  <ProductChainsSection />
  <!-- TODO: 本页其余区块，等后续画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
