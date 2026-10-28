<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionShell from '@/components/ui/SectionShell.vue'
import { siteConfig } from '@/config/site'

/** 关于我们区块：对应导航「关于我们」，锚点 #about；纯文字区，用窄容器控制行长 */
</script>

<template>
  <!-- width="narrow" 内容宽 768px，避免长段落一行铺满导致阅读疲劳；
       tone="white" 与前一个白底区块衔接，页脚的浅灰底作为整页收尾 -->
  <SectionShell
    id="about"
    :heading="siteConfig.about.heading"
    :desc="siteConfig.about.desc"
    tone="white"
    width="narrow"
  >
    <!-- 区块内的行动区：mt-8 与描述拉开 2rem；flex 居中排列；gap-3 间距 0.75rem -->
    <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <!-- 主行动按钮：沿用站点统一的 CTA 文案与跳转地址 -->
      <BaseButton :href="siteConfig.contact.ctaHref" size="md" class="w-full sm:w-auto">
        {{ siteConfig.contact.ctaLabel }}
      </BaseButton>
      <!-- 电话按钮：描边样式，作为次选行动路径（不想留资的访客可直接打）
           移动端 phone 文案与号码拼接，宽屏只显示号码 -->
      <BaseButton
        :href="siteConfig.contact.phoneHref"
        variant="outline"
        size="md"
        class="w-full sm:w-auto"
      >
        {{ siteConfig.contact.phone }}
      </BaseButton>
    </div>
  </SectionShell>
</template>
