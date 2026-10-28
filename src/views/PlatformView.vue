<script setup lang="ts">
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

/**
 * 平台架构 /platform
 *
 * 原型暂未提供这一页的画板（5 张板只覆盖了首页 + 三条业务线 + 解决方案），
 * 首屏文案先按占位写，等设计出板后替换 site.ts 里 /platform 那一条即可。
 */
const page = getPage('/platform')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 平台架构页其余区块（等原型画板） -->
</template>
