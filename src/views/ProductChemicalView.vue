<script setup lang="ts">
import PageHero from '@/components/sections/PageHero.vue'
import { getPage } from '@/config/site'

/**
 * 产品矩阵 → 化工生产（/products/chemical）
 *
 * 对应原型画板「威易达化工：生产与经营管理」。
 * 首屏文案取自 src/config/site.ts 的 pages。
 * ⚠️ 首屏以下的区块尚未按原型实现：该画板原型有 2~4 屏内容
 *    （卡片栅格 / 六类档案对照表 / 电子台账追溯 / 实施路径 / CTA），
 *    与首页复用同一批区块组件，先做首页再回来填这里。
 */
const page = getPage('/products/chemical')
</script>

<template>
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- TODO: 本页其余区块（按原型画板「威易达化工：生产与经营管理」） -->
</template>
