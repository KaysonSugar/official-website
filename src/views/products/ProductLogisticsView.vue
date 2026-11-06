<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import ProductLogisticsCapability from '@/components/sections/products/logistics/ProductLogisticsCapability.vue'
import ProductLogisticsCargo from '@/components/sections/products/logistics/ProductLogisticsCargo.vue'
import ProductLogisticsCarpool from '@/components/sections/products/logistics/ProductLogisticsCarpool.vue'
import ProductLogisticsLedger from '@/components/sections/products/logistics/ProductLogisticsLedger.vue'
import ProductLogisticsHero from '@/components/sections/products/logistics/ProductLogisticsHero.vue'
</script>

<template>
  <ProductLogisticsHero />
  <ProductLogisticsCargo />
  <ProductLogisticsCapability />
  <ProductLogisticsCarpool />
  <ProductLogisticsLedger />
  <CtaBanner />
</template>
