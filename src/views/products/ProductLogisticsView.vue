<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 物流调度页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import ProductLogisticsCapability from '@/components/sections/products/logistics/ProductLogisticsCapability.vue'
import ProductLogisticsCargo from '@/components/sections/products/logistics/ProductLogisticsCargo.vue'
import ProductLogisticsCarpool from '@/components/sections/products/logistics/ProductLogisticsCarpool.vue'
import ProductLogisticsLedger from '@/components/sections/products/logistics/ProductLogisticsLedger.vue'
import ProductLogisticsHero from '@/components/sections/products/logistics/ProductLogisticsHero.vue'
</script>

<template>
  <!-- 首屏：调度台演示卡 -->
  <ProductLogisticsHero />
  <!-- 第二屏：免费货源广场 -->
  <ProductLogisticsCargo />
  <!-- 第三屏：运输链核心功能 + 调度台窗口 -->
  <ProductLogisticsCapability />
  <!-- 第四屏：智能拼车 -->
  <ProductLogisticsCarpool />
  <!-- 第五屏：车辆及司机管理 -->
  <ProductLogisticsLedger />
  <!-- 结尾：底部行动号召 -->
  <CtaBanner />
</template>
