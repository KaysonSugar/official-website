<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 物流调度页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

// 物流调度 /products/logistics，对应画板「威易达物流：调度与合规」。
// 首屏文案在 site.ts 的 pages；下面还有 2~4 屏没做（卡片栅格、档案对照表、电子台账、实施路径）
const page = getPage('/products/logistics')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 本页其余区块，按「威易达物流：调度与合规」画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
