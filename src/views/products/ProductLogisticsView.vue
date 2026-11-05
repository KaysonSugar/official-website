<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import ProductLogisticsCapability from '@/components/sections/products/logistics/ProductLogisticsCapability.vue'
import ProductLogisticsCargo from '@/components/sections/products/logistics/ProductLogisticsCargo.vue'
import ProductLogisticsCarpool from '@/components/sections/products/logistics/ProductLogisticsCarpool.vue'
import ProductLogisticsLedger from '@/components/sections/products/logistics/ProductLogisticsLedger.vue'
import ProductLogisticsHero from '@/components/sections/products/logistics/ProductLogisticsHero.vue'

// 物流调度 /products/logistics：首屏调度台卡 → 货源广场 → 核心能力+调度台实录 → 智能拼车 → 车辆及司机管理
</script>

<template>
  <ProductLogisticsHero />
  <ProductLogisticsCargo />
  <ProductLogisticsCapability />
  <ProductLogisticsCarpool />
  <ProductLogisticsLedger />
  <CtaBanner />
</template>
