<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机作业页：五屏组装
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import ProductDriverHero from '@/components/sections/ProductDriverHero.vue'
import ProductDriverAdvantage from '@/components/sections/ProductDriverAdvantage.vue'
import ProductDriverWorkflow from '@/components/sections/ProductDriverWorkflow.vue'
import ProductDriverScreens from '@/components/sections/ProductDriverScreens.vue'
import ProductDriverRecruit from '@/components/sections/ProductDriverRecruit.vue'

// 司机作业 /products/driver，对应原型 Driver Hero + B 平台优势 + D 接单作业四步
// + E 核心界面一览 + F 司机招募 五屏，文案与数据都在 siteConfig.driver
</script>

<template>
  <ProductDriverHero />
  <ProductDriverAdvantage />
  <ProductDriverWorkflow />
  <ProductDriverScreens />
  <ProductDriverRecruit />
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
