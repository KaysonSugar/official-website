<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import ProductCapabilitySection from '@/components/sections/products/logistics/ProductCapabilitySection.vue'
import ProductCargoSection from '@/components/sections/products/logistics/ProductCargoSection.vue'
import ProductCarpoolSection from '@/components/sections/products/logistics/ProductCarpoolSection.vue'
import ProductLedgerSection from '@/components/sections/products/logistics/ProductLedgerSection.vue'
import ProductLogisticsHero from '@/components/sections/products/logistics/ProductLogisticsHero.vue'

// 物流调度 /products/logistics：首屏调度台卡 → 货源广场 → 核心能力+调度台实录 → 智能拼车 → 车辆及司机管理
</script>

<template>
  <ProductLogisticsHero />
  <ProductCargoSection />
  <ProductCapabilitySection />
  <ProductCarpoolSection />
  <ProductLedgerSection />
  <CtaBanner />
</template>
