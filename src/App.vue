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
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
</script>

<template>
  <SiteHeader />
  <main class="pt-16 lg:pt-[84px]">
    <RouterView />
  </main>
  <SiteFooter />
  <BackToTop />
  <!-- 预约演示表单：全站只挂这一个，各页按钮调 useLeadForm 唤起 -->
  <LeadFormModal />
</template>
