<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import ProductCapabilitySection from '@/components/sections/ProductCapabilitySection.vue'
import ProductCargoSection from '@/components/sections/ProductCargoSection.vue'
import ProductCarpoolSection from '@/components/sections/ProductCarpoolSection.vue'
import ProductLedgerSection from '@/components/sections/ProductLedgerSection.vue'
import ProductLogisticsHero from '@/components/sections/ProductLogisticsHero.vue'

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
