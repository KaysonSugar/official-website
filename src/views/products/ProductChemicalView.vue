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
  <ProductChemicalHero />
  <ProductChemicalChains />
  <ProductChemicalTour />
  <ProductChemicalReport />
  <CtaBanner />
</template>
