<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import IndustrySection from '@/components/sections/IndustrySection.vue'

// 首页。原型 16 个区块，做到第 2 屏，后面的等设计稿逐块补
</script>

<template>
  <!-- 首屏：左文案 + 右看板，底下一排数字 -->
  <HeroSection />
  <!-- 第二屏：行业背景与法规驱动，四张新法条款卡 -->
  <IndustrySection />
  <!-- 底部行动号召：首页和内页共用一份文案 -->
  <CtaBanner />
</template>
