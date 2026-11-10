<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import HomeHero from '@/components/sections/home/HomeHero.vue'
import HomeIndustry from '@/components/sections/home/HomeIndustry.vue'
import HomeLightweight from '@/components/sections/home/HomeLightweight.vue'
import HomePlatformArchitecture from '@/components/sections/home/HomePlatformArchitecture.vue'
import HomeProductMatrix from '@/components/sections/home/HomeProductMatrix.vue'
import HomeCoreCapabilities from '@/components/sections/home/HomeCoreCapabilities.vue'
import HomeProductionFlow from '@/components/sections/home/HomeProductionFlow.vue'
import HomeTransportCollab from '@/components/sections/home/HomeTransportCollab.vue'
import HomeAdvantage from '@/components/sections/home/HomeAdvantage.vue'
import HomeCostEfficiency from '@/components/sections/home/HomeCostEfficiency.vue'
import HomeService from '@/components/sections/home/HomeService.vue'
</script>

<template>
  <!-- 首屏：标题 + 卖点 + 数字条 + 工作台看板 -->
  <HomeHero />
  <!-- 第二屏：行业背景与法规驱动 -->
  <HomeIndustry />
  <!-- 第三屏：轻量化平台 -->
  <HomeLightweight />
  <!-- 第四屏：平台功能结构 -->
  <HomePlatformArchitecture />
  <!-- 第五屏：三端业务运转模式 -->
  <HomeProductMatrix />
  <!-- 第六屏：核心功能详解 -->
  <HomeCoreCapabilities />
  <!-- 第七屏：生产主流程图 -->
  <HomeProductionFlow />
  <!-- 第八屏：运输协同 -->
  <HomeTransportCollab />
  <!-- 第九屏：全链路一体化优势 -->
  <HomeAdvantage />
  <!-- 第十屏：降本增效 -->
  <HomeCostEfficiency />
  <!-- 第十一屏：我们的服务 -->
  <HomeService />
  <!-- 结尾：底部行动号召 -->
  <CtaBanner />
</template>
