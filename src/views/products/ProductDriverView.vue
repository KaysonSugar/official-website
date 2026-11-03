<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

// 司机作业 /products/driver，对应画板「威易达司机：接单与作业」。
// 首屏文案在 site.ts 的 pages；下面还有 2~4 屏没做（卡片栅格、档案对照表、电子台账、实施路径）
const page = getPage('/products/driver')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 本页其余区块，按「威易达司机：接单与作业」画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
