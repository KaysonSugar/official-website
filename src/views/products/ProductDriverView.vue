<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机作业页：五屏组装
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
  <ProductDriverHero />
  <ProductDriverAdvantage />
  <ProductDriverWorkflow />
  <ProductDriverScreens />
  <ProductDriverRecruit />
  <CtaBanner />
</template>
