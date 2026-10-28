<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

/**
 * 解决方案页 /solutions
 *
 * 首屏文案取自 src/config/site.ts 的 pages（标题来自原型画板「按角色区分的解决方案」）。
 * ⚠️ 首屏以下的区块尚未按原型实现，等首页 16 个区块铺完后统一补：
 *    每个内页原型都是 2~4 屏内容（卡片栅格 / 对照表 / 流程图 / CTA），
 *    区块组件会复用到首页那批，所以先做首页再回来填这里。
 */
const page = getPage('/solutions')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 本页其余区块（按原型画板「按角色区分的解决方案」） -->
  <!-- 底部行动号召：所有内页共用同一份文案（config/site.ts 的 cta） -->
  <CtaBanner />
</template>
