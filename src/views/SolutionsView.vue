<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 服务支持页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

// 服务支持 /solutions。定稿版把「解决方案」改名叫「服务支持」，路由没动。
// 首屏文案在 site.ts 的 pages 里，占位；下面几屏等首页铺完再回来补，区块组件是复用的
const page = getPage('/solutions')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 本页其余区块，等「服务支持」画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
