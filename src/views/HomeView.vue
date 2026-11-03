<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import HeroSection from '@/components/sections/HeroSection.vue'

// 首页。原型 16 个区块，现在只有首屏和底部 CTA，中间的等设计稿逐块补
</script>

<template>
  <!-- 首屏：左文案 + 右看板，底下一排数字 -->
  <HeroSection />
  <!-- 底部行动号召：首页和内页共用一份文案 -->
  <CtaBanner />
</template>
