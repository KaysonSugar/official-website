<script setup lang="ts">
import CardGrid from '@/components/ui/CardGrid.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import { siteConfig } from '@/config/site'

/** 解决方案区块：对应导航「解决方案」，锚点 #solutions；白底与产品矩阵的浅灰底交替 */
</script>

<template>
  <SectionShell
    id="solutions"
    :heading="siteConfig.solutions.heading"
    :desc="siteConfig.solutions.desc"
    tone="white"
  >
    <CardGrid :items="siteConfig.solutions.items" />
  </SectionShell>
</template>
