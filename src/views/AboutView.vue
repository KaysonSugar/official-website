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

const { about } = siteConfig
</script>

<template>
  <!-- 首屏：矮横条，右侧服务器云插画，文案从 brand/data.ts 的 pages 里取 -->
  <AboutHero />

  <!-- 正文三屏：简介（白）→ 企业理念（浅绿）→ 公司使命（白）；
       简介与使命结构相同，共用 AboutText，只换数据 -->
  <AboutText :eyebrow="about.intro.eyebrow" :title="about.intro.title" :paras="about.intro.paras" />
  <AboutPhilosophy />
  <AboutText
    :eyebrow="about.mission.eyebrow"
    :title="about.mission.title"
    :paras="about.mission.paras"
  />

  <!-- 结尾：全站统一 CTA 横幅 -->
  <CtaBanner />
</template>
