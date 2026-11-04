<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 关于我们页
-->
<script setup lang="ts">
import AboutHeroSection from '@/components/sections/AboutHeroSection.vue'
import AboutPhilosophySection from '@/components/sections/AboutPhilosophySection.vue'
import AboutTextSection from '@/components/sections/AboutTextSection.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import { siteConfig } from '@/config/site'

// 关于我们 /about。首屏：插画背景横条 + 左侧文字（文案在 pages 的 /about 条目）；
// 第二屏简介、第三屏企业理念、第四屏公司使命。简介/使命同构，共用 AboutTextSection。
const { about } = siteConfig
</script>

<template>
  <AboutHeroSection />
  <!-- 简介（原型 S1） -->
  <AboutTextSection
    :eyebrow="about.intro.eyebrow"
    :title="about.intro.title"
    :paras="about.intro.paras"
  />
  <!-- 企业理念（原型 S2）：浅绿底四圆图标 -->
  <AboutPhilosophySection />
  <!-- 公司使命（原型 S3） -->
  <AboutTextSection
    :eyebrow="about.mission.eyebrow"
    :title="about.mission.title"
    :paras="about.mission.paras"
  />
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
