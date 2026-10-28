<script setup lang="ts">
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

/**
 * 关于我们 /about
 *
 * 原型暂未提供这一页的画板，首屏文案先按占位写，
 * 等设计出板后替换 site.ts 里 /about 那一条即可。
 */
const page = getPage('/about')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 关于我们页其余区块（等原型画板） -->
</template>
