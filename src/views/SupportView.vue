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
  <!-- 首屏：标题 + 服务方式胶囊，右侧项目节奏卡 -->
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
  <!-- 第二屏：服务内容 -->
  <SupportScope />
  <!-- 第三屏：实施流程 -->
  <SupportProcess />
  <!-- 第四屏：实施方式与计费 -->
  <SupportPricing />
  <!-- 第五屏：服务承诺 -->
  <SupportCommitment />
  <!-- 结尾：底部行动号召 -->
  <CtaBanner />
</template>
