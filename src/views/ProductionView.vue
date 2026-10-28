<script setup lang="ts">
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

/**
 * 生产管理页 /production
 *
 * 首屏文案取自 src/config/site.ts 的 pages（标题来自原型画板「威易达化工：生产与经营管理」）。
 * ⚠️ 首屏以下的区块尚未按原型实现，等首页 16 个区块铺完后统一补：
 *    每个内页原型都是 2~4 屏内容（卡片栅格 / 对照表 / 流程图 / CTA），
 *    区块组件会复用到首页那批，所以先做首页再回来填这里。
 */
const page = getPage('/production')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 本页其余区块（按原型画板「威易达化工：生产与经营管理」） -->
</template>
