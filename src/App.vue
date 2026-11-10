<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 根组件：顶栏 + 路由出口 + 页脚
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import BackToTop from '@/components/ui/BackToTop.vue'
import LeadFormModal from '@/components/ui/LeadFormModal.vue'
import LeaveConfirmModal from '@/components/ui/LeaveConfirmModal.vue'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>

<template>
  <!-- 顶栏固定，main 用 pt 让出高度（手机 64px / lg 84px） -->
  <SiteHeader />
  <main class="pt-16 lg:pt-[84px]">
    <RouterView />
  </main>
  <SiteFooter />
  <!-- 回到顶部 + 两个全站弹层，都不占布局 -->
  <BackToTop />
  <LeadFormModal />
  <LeaveConfirmModal />
</template>
