<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 平台架构页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import PageHero from '@/components/sections/common/PageHero.vue'
import { getPage } from '@/config/site'

const page = getPage('/platform')
</script>

<template>
  <!-- 首屏：标题 + 说明 + 主按钮 -->
  <PageHero :eyebrow="page.eyebrow" :title="page.title" :desc="page.desc" :align="page.align" />
  <!-- 结尾：底部行动号召 -->
  <CtaBanner />
</template>
