<script setup lang="ts">
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import PlatformSection from '@/components/sections/PlatformSection.vue'
import ProductsSection from '@/components/sections/ProductsSection.vue'
import SolutionsSection from '@/components/sections/SolutionsSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'

/**
 * 根组件：只负责区块编排，不放任何样式与文案
 *
 * 页面结构（与原型导航一一对应）：
 *   首页 #home → 平台架构 #platform → 产品矩阵 #products → 解决方案 #solutions → 关于我们 #about
 * 各区块的文案在 src/config/site.ts，样式在各自组件或 ui/ 下的公共组件。
 */
</script>

<template>
  <!-- 固定顶栏：高度 h-16 / lg:h-20，由组件自身管理 -->
  <SiteHeader />

  <!-- 主内容区：pt-16 / lg:pt-20 与顶栏高度严格一致，避免首屏被固定导航遮住 -->
  <main class="pt-16 lg:pt-20">
    <HeroSection />
    <PlatformSection />
    <ProductsSection />
    <SolutionsSection />
    <AboutSection />
  </main>

  <SiteFooter />
</template>
