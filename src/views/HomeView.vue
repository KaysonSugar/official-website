<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import IndustrySection from '@/components/sections/IndustrySection.vue'
import LightweightSection from '@/components/sections/LightweightSection.vue'
import PlatformArchitectureSection from '@/components/sections/PlatformArchitectureSection.vue'
import ProductMatrixSection from '@/components/sections/ProductMatrixSection.vue'
import CoreCapabilitiesSection from '@/components/sections/CoreCapabilitiesSection.vue'
import ProductionFlowSection from '@/components/sections/ProductionFlowSection.vue'
import TransportCollabSection from '@/components/sections/TransportCollabSection.vue'
import AdvantageSection from '@/components/sections/AdvantageSection.vue'
import CostEfficiencySection from '@/components/sections/CostEfficiencySection.vue'
import ServiceSection from '@/components/sections/ServiceSection.vue'

// 首页 11 个内容模块全齐（首屏到服务屏），底下接预约演示横幅；
// 页脚不在首页里，在 App.vue 挂的 SiteFooter
</script>

<template>
  <!-- 模块一：首屏，左文案 + 右看板，底下一排数字 -->
  <HeroSection />
  <!-- 模块二：行业背景与法规驱动，四张新法条款卡 -->
  <IndustrySection />
  <!-- 模块三：轻量化平台，胶囊 + 痛点面板 + 两组卡片 -->
  <LightweightSection />
  <!-- 模块四：平台功能结构，暗色六层架构图 -->
  <PlatformArchitectureSection />
  <!-- 模块五：三端业务运转模式，流程图 + 三张业务线卡 -->
  <ProductMatrixSection />
  <!-- 模块六：核心功能详解，六张功能卡 -->
  <CoreCapabilitiesSection />
  <!-- 模块七：生产主流程图，四节点 → 菱形判断 → 双分支 -->
  <ProductionFlowSection />
  <!-- 模块八：运输协同，环形闭环图 -->
  <TransportCollabSection />
  <!-- 模块九：全链路一体化优势，暗色三行对照表 + 三张支撑卡 -->
  <AdvantageSection />
  <!-- 模块十：降本增效，四张违规风险卡 + 四列收益宽卡 -->
  <CostEfficiencySection />
  <!-- 模块十一：我们的服务，三张服务卡 -->
  <ServiceSection />
  <!-- 预约演示横幅：首页和内页共用一份文案，不算进 11 个模块 -->
  <CtaBanner />
</template>
