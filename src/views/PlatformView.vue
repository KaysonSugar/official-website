<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 平台架构页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

// 平台架构 /platform。这页已经从导航里撤了，但路由留着。
// 原型没给画板，首屏文案先占位，出图后改 site.ts 里 /platform 那条
const page = getPage('/platform')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 首屏下面的区块，等画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
