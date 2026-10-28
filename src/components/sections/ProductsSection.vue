<script setup lang="ts">
import CardGrid from '@/components/ui/CardGrid.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import { siteConfig } from '@/config/site'

/** 产品矩阵区块：对应导航「产品矩阵」，锚点 #products；浅灰底与相邻区块交替 */
</script>

<template>
  <SectionShell
    id="products"
    :heading="siteConfig.products.heading"
    :desc="siteConfig.products.desc"
    tone="muted"
  >
    <CardGrid :items="siteConfig.products.items" />
  </SectionShell>
</template>
