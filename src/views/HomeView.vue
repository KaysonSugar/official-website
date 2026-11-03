<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import HeroSection from '@/components/sections/HeroSection.vue'

/**
 * 首页 /
 *
 * 骨架态：原型共 16 个区块，当前只实现 Hero 与 CTA，其余待按原型拆分。
 */
</script>

<template>
  <!-- 首屏：按定稿原型「左侧文案 + 右侧工作台看板」两栏，含底部数字条 -->
  <HeroSection />
  <!-- 底部行动号召：原型第 15 区块，首页与内页共用 -->
  <CtaBanner />
</template>
