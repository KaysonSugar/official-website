<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 服务支持页
-->
<script setup lang="ts">
import CtaBanner from '@/components/sections/common/CtaBanner.vue'
import PageHero from '@/components/sections/common/PageHero.vue'
import SupportCommitmentSection from '@/components/sections/support/SupportCommitmentSection.vue'
import SupportPricingSection from '@/components/sections/support/SupportPricingSection.vue'
import SupportProcessSection from '@/components/sections/support/SupportProcessSection.vue'
import SupportScopeSection from '@/components/sections/support/SupportScopeSection.vue'
import SupportTimeline from '@/components/sections/support/SupportTimeline.vue'
import { getPage, siteConfig } from '@/config/site'

// 服务支持 /solutions。定稿版把「解决方案」改名叫「服务支持」，路由没动。
// 首屏：左文案（按钮 + 四个服务方式胶囊）+ 右「典型项目节奏」卡；
// 第二屏：八项交付内容；第三屏：七节点实施流程；第四屏：实施方式与计费；
// 第五屏：四项交付准则（深绿屏）。
// 后面的屏等画板
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
  <SupportScopeSection />
  <SupportProcessSection />
  <SupportPricingSection />
  <SupportCommitmentSection />
  <!-- TODO: 本页其余区块，等「服务支持」后续画板 -->
  <!-- 底部行动号召：内页共用 -->
  <CtaBanner />
</template>
