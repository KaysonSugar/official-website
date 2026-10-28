<script setup lang="ts">
import CardGrid from '@/components/ui/CardGrid.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import { siteConfig } from '@/config/site'

/** 平台架构区块：对应导航「平台架构」，锚点 #platform */
</script>

<template>
  <SectionShell
    id="platform"
    :heading="siteConfig.platform.heading"
    :desc="siteConfig.platform.desc"
    tone="white"
  >
    <CardGrid :items="siteConfig.platform.items" />
  </SectionShell>
</template>
