<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 关于我们页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

// 关于我们 /about。原型还没这张板，首屏文案先占位，出图后改 site.ts 里 /about 那条
const page = getPage('/about')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 首屏下面的区块，等画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
