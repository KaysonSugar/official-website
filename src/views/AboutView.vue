<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 关于我们页
-->
<script setup lang="ts">
import AboutHero from '@/components/sections/about/AboutHero.vue'
import AboutPhilosophy from '@/components/sections/about/AboutPhilosophy.vue'
import AboutText from '@/components/sections/about/AboutText.vue'
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import { siteConfig } from '@/config/site'

// 关于我们 /about。首屏：插画背景横条 + 左侧文字（文案在 pages 的 /about 条目）；
// 第二屏简介、第三屏企业理念、第四屏公司使命。简介/使命同构，共用 AboutText。
const { about } = siteConfig
</script>

<template>
  <AboutHero />
  <!-- 简介（原型 S1） -->
  <AboutText
    :eyebrow="about.intro.eyebrow"
    :title="about.intro.title"
    :paras="about.intro.paras"
  />
  <!-- 企业理念（原型 S2）：浅绿底四圆图标 -->
  <AboutPhilosophy />
  <!-- 公司使命（原型 S3） -->
  <AboutText
    :eyebrow="about.mission.eyebrow"
    :title="about.mission.title"
    :paras="about.mission.paras"
  />
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
