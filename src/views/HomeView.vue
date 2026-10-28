<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import PlatformSection from '@/components/sections/PlatformSection.vue'
import ProductsSection from '@/components/sections/ProductsSection.vue'
import SolutionsSection from '@/components/sections/SolutionsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'

/**
 * 首页 /
 *
 * ⚠️ 当前是过渡态：原型「01 首页」是一张 1440×约 10600 的长画板，内含 16 个区块
 * （Hero / 六项硬性要求 / 六类架构对照表 / 三个客户端一套 ERP / 智能订单协同 /
 *  全生产链 / 多维风控 / 数据驱动 / 安全环保运维 / CTA / 页脚 …）。
 * 这 16 个区块还没拆分实现，先沿用改造前的 4 个通用区块占位，
 * 保证首页看起来是完整的；后续按原型逐块替换（届时再删掉这 4 个占位组件）。
 */
</script>

<template>
  <HeroSection />
  <!-- ↓ 以下 4 块为临时占位，按原型重建首页时逐块替换 -->
  <PlatformSection />
  <ProductsSection />
  <SolutionsSection />
  <AboutSection />
</template>
