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
  <PageHero
    :eyebrow="page.eyebrow"
    :title="page.title"
    :desc="page.desc"
    :align="page.align"
    :cta-label="support.ctaLabel"
    :features="support.features"
  >
    <!-- 首屏右侧的项目节奏卡，走 PageHero 的插槽 -->
    <SupportTimeline />
  </PageHero>

  <SupportScope />
  <SupportProcess />
  <SupportPricing />
  <SupportCommitment />

  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
