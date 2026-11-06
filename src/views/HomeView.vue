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
  <!-- 模块一：首屏，左文案 + 右看板，底下一排数字 -->
  <HomeHero />
  <!-- 模块二：行业背景与法规驱动，四张新法条款卡 -->
  <HomeIndustry />
  <!-- 模块三：轻量化平台，胶囊 + 痛点面板 + 两组卡片 -->
  <HomeLightweight />
  <!-- 模块四：平台功能结构，暗色六层架构图 -->
  <HomePlatformArchitecture />
  <!-- 模块五：三端业务运转模式，流程图 + 三张业务线卡 -->
  <HomeProductMatrix />
  <!-- 模块六：核心功能详解，六张功能卡 -->
  <HomeCoreCapabilities />
  <!-- 模块七：生产主流程图，四节点 → 菱形判断 → 双分支 -->
  <HomeProductionFlow />
  <!-- 模块八：运输协同，环形闭环图 -->
  <HomeTransportCollab />
  <!-- 模块九：全链路一体化优势，暗色三行对照表 + 三张支撑卡 -->
  <HomeAdvantage />
  <!-- 模块十：降本增效，四张违规风险卡 + 四列收益宽卡 -->
  <HomeCostEfficiency />
  <!-- 模块十一：我们的服务，三张服务卡 -->
  <HomeService />
  <!-- 预约演示横幅：首页和内页共用一份文案，不算进 11 个模块 -->
  <CtaBanner />
</template>
