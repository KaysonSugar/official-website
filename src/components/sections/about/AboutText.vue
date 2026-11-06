<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 关于我们：简介 / 公司使命（同构文字屏）
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'

/**
 * 简介屏（原型 S1）和公司使命屏（原型 S3）结构一模一样：
 * 橙眉题 + 黑标题 + 灰绿正文若干段，白底——抽成一个组件传 props。
 * 正文 #5e7169、标题 #12211b 都是从原型采的。
 */
defineProps<{
  eyebrow: string
  title: string
  paras: string[]
}>()

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ eyebrow }}
      </p>

      <h2 class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900" style="--d: 80ms">
        {{ title }}
      </h2>

      <!-- 正文：多段时用段间距分隔，左对齐限宽防长文拉满屏 -->
      <div class="mt-[24px] max-w-[1080px] space-y-[20px]">
        <p
          v-for="(para, i) in paras"
          :key="i"
          class="reveal text-[14px] leading-[30px] text-[#5e7169]"
          :style="{ '--d': `${160 + i * 80}ms` }"
        >
          {{ para }}
        </p>
      </div>
    </div>
  </section>
</template>
