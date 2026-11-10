<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 服务支持页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import PageHero from '@/components/sections/common/PageHero.vue'
import SupportCommitment from '@/components/sections/support/SupportCommitment.vue'
import SupportPricing from '@/components/sections/support/SupportPricing.vue'
import SupportProcess from '@/components/sections/support/SupportProcess.vue'
import SupportScope from '@/components/sections/support/SupportScope.vue'
import SupportTimeline from '@/components/sections/support/SupportTimeline.vue'
import { getPage, siteConfig } from '@/config/site'

const page = getPage('/solutions')
const { support } = siteConfig
</script>

<template>
  <!-- 首屏：公共 PageHero，右侧插槽挂「典型项目节奏」白卡 -->
  <PageHero
    :eyebrow="page.eyebrow"
    :title="page.title"
    :desc="page.desc"
    :align="page.align"
    :cta-label="support.ctaLabel"
    :features="support.features"
  >
    <SupportTimeline />
  </PageHero>

  <!-- 正文四屏：服务内容（白）→ 实施流程（浅灰绿）→ 实施计费（白）→ 服务承诺（深绿） -->
  <SupportScope />
  <SupportProcess />
  <SupportPricing />
  <SupportCommitment />

  <!-- 结尾：全站统一 CTA 横幅 -->
  <CtaBanner />
</template>
