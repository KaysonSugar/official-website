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
 * 橙眉题 + 黑标题 + 灰绿正文若干段，纯白底——抽成一个组件，由 AboutView 传两份文案。
 * 正文 #5e7169、标题走全站 ink-900。
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
  <!-- 区块：白底，上留白 96px、下 64px（下面紧接企业理念的浅绿底） -->
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ eyebrow }}
      </p>

      <!-- 标题：mt-[24px] 与眉题间距 24px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ title }}
      </h2>

      <!-- 正文区：mt-[24px] 与标题间距 24px，max-w 1080px 限宽防长文拉满屏；
           space-y-[20px] 段间距 20px，每段再错峰 80ms 浮入 -->
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
