<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'

/**
 * 根组件：顶栏 + 路由出口 + 页脚
 *
 * 顶栏与页脚所有页面共用，切换路由不会重建；内容由 RouterView 按路由表渲染。
 */
</script>

<template>
  <!-- 固定顶栏：高度 h-16 / lg:h-[84px]（原型 1440×84），由组件自身管理 -->
  <SiteHeader />

  <!-- 主内容区：pt-16 / lg:pt-[84px] 与顶栏高度严格一致，避免首屏被固定导航遮住 -->
  <main class="pt-16 lg:pt-[84px]">
    <RouterView />
  </main>

  <SiteFooter />
</template>
