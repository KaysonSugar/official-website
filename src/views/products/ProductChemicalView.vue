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
  <!-- 首屏：左文案 + 右「资金流水」演示卡 -->
  <ProductChemicalHero />

  <!-- 正文三屏：三条主线（白）→ 界面实录（深绿）→ 报表中心（浅绿），深浅交替隔开层次 -->
  <ProductChemicalChains />
  <ProductChemicalTour />
  <ProductChemicalReport />

  <!-- 结尾：全站统一 CTA 横幅 -->
  <CtaBanner />
</template>
