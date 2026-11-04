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

// 首页。原型 16 个区块，做到第 9 屏，后面的等设计稿逐块补
</script>

<template>
  <!-- 首屏：左文案 + 右看板，底下一排数字 -->
  <HeroSection />
  <!-- 第二屏：行业背景与法规驱动，四张新法条款卡 -->
  <IndustrySection />
  <!-- 第三屏：轻量化平台，胶囊 + 痛点面板 + 两组卡片 -->
  <LightweightSection />
  <!-- 第四屏：平台功能结构，暗色六层架构图 -->
  <PlatformArchitectureSection />
  <!-- 第五屏：三端业务运转模式，流程图 + 三张业务线卡 -->
  <ProductMatrixSection />
  <!-- 第六屏：核心功能详解，六张功能卡 -->
  <CoreCapabilitiesSection />
  <!-- 第七屏：生产主流程图，四节点 → 菱形判断 → 双分支 -->
  <ProductionFlowSection />
  <!-- 第八屏：运输协同，环形闭环图 -->
  <TransportCollabSection />
  <!-- 第九屏：全链路一体化优势，暗色三行对照表 + 三张支撑卡 -->
  <AdvantageSection />
  <!-- 底部行动号召：首页和内页共用一份文案 -->
  <CtaBanner />
</template>
