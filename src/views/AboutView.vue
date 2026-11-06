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
  <AboutHero />
  <AboutText :eyebrow="about.intro.eyebrow" :title="about.intro.title" :paras="about.intro.paras" />
  <AboutPhilosophy />
  <AboutText
    :eyebrow="about.mission.eyebrow"
    :title="about.mission.title"
    :paras="about.mission.paras"
  />

  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
