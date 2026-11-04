<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第九屏：全链路一体化优势
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 第九屏：全链路一体化优势（原型 S8）。
 * 暗底纯文字无图标：上半是「参与方 × 核心痛点 × 解决方案」三行对照表，
 * 左列橙色渐变，痛点白标题、方案薄荷绿标题；下半三张支撑卡（01/03 橙、02 绿）
 * 加一条核心观点横条。所有颜色都从原型图上采的，不是目测。
 */
const { advantage } = siteConfig

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="adv-bg relative overflow-hidden pb-[64px] pt-[136px]">
    <div class="container-page">
      <!-- 眉题：跟第四屏暗底同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ advantage.eyebrow }}
      </p>

      <!-- 板块标题：原型字号偏小（22px），比第四屏的 32px 收一档，白字 -->
      <h2
        class="reveal mt-[24px] text-[22px] font-bold leading-[32px] text-white"
        style="--d: 80ms"
      >
        {{ advantage.title }}
      </h2>

      <!-- 三行对照表：整块圆角细边框，表头深绿，行间细分隔线。
           窄屏横向滚动（三列压不下），880px 是三列不换行的最小宽 -->
      <div
        class="reveal mt-[36px] overflow-hidden rounded-2xl border border-white/10"
        style="--d: 160ms"
      >
        <div class="overflow-x-auto">
          <div class="min-w-[880px]">
            <!-- 表头：参与方格橙底白字，其余两格深绿底 -->
            <div class="grid grid-cols-[150px_1fr_1fr] sm:grid-cols-[185px_1fr_1fr]">
              <div
                class="flex h-[44px] items-center bg-[#ff7b33] pl-[22px] text-[13px] font-medium text-white"
              >
                参与方
              </div>
              <div
                class="flex h-[44px] items-center bg-[#1e332a] pl-[45px] text-[13px] font-medium text-white"
              >
                核心痛点
              </div>
              <div
                class="flex h-[44px] items-center bg-[#1e332a] text-[13px] font-medium text-white"
              >
                威易达解决方案
              </div>
            </div>

            <!-- 三行参与方；左列每行独立的橙渐变（上浅下深，原型逐行重起）。
                 分隔线只压在痛点/方案两列：原型里参与方橙列从表头到行内容是
                 无线平滑衔接的（#ff7b33 直接接 #ff8a4a），首行橙列不能有线 -->
            <div
              v-for="(row, i) in advantage.rows"
              :key="row.name"
              class="grid grid-cols-[150px_1fr_1fr] sm:grid-cols-[185px_1fr_1fr]"
              :class="i > 0 ? 'border-t border-white/10' : ''"
            >
              <!-- 参与方名称：橙渐变格里垂直居中 -->
              <div
                class="flex items-center justify-center bg-[linear-gradient(180deg,#ff8a4a_0%,#f05c14_100%)] px-[12px] text-[16px] font-medium text-white"
              >
                {{ row.name }}
              </div>

              <!-- 核心痛点：白标题 + 灰绿描述；化工企业这行只有两条，顶对齐。
                   首行补一条上边线，跟深绿表头分界（橙列不需要） -->
              <div
                class="py-[24px] pl-[45px] pr-[32px]"
                :class="i === 0 ? 'border-t border-white/10' : ''"
              >
                <div
                  v-for="(pain, pi) in row.pains"
                  :key="pain.title"
                  :class="pi > 0 ? 'mt-[18px]' : ''"
                >
                  <h3 class="text-[15px] font-semibold leading-[20px] text-white">
                    {{ pain.title }}
                  </h3>
                  <p class="mt-[4px] text-[12px] leading-[18px] text-[#a3b6b0]">{{ pain.desc }}</p>
                </div>
              </div>

              <!-- 解决方案：标题换薄荷绿，其余同痛点列 -->
              <div class="py-[24px] pr-[40px]" :class="i === 0 ? 'border-t border-white/10' : ''">
                <div
                  v-for="(sol, si) in row.solutions"
                  :key="sol.title"
                  :class="si > 0 ? 'mt-[18px]' : ''"
                >
                  <h3 class="text-[15px] font-semibold leading-[20px] text-[#98d3bd]">
                    {{ sol.title }}
                  </h3>
                  <p class="mt-[4px] text-[12px] leading-[18px] text-[#a3b6b0]">{{ sol.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 平台层支撑能力：居中小标题 + 三张卡 -->
      <h3
        class="reveal mt-[40px] text-center text-[16px] font-semibold leading-[24px] text-white"
        style="--d: 240ms"
      >
        平台层的三项支撑能力
      </h3>

      <div class="mt-[36px] grid grid-cols-1 gap-[24px] sm:grid-cols-3">
        <div
          v-for="(card, ci) in advantage.supports"
          :key="card.no"
          class="reveal rounded-xl border border-[#2a413b] bg-[#172e28] p-[32px]"
          :style="{ '--d': `${320 + ci * 80}ms` }"
        >
          <!-- 编号：01/03 橙 02 绿，颜色从原型采的 -->
          <p
            class="text-[20px] font-bold leading-none"
            :class="card.tone === 'orange' ? 'text-[#ff8a55]' : 'text-[#36bd92]'"
          >
            {{ card.no }}
          </p>
          <h4 class="mt-[30px] text-[16px] font-bold leading-[24px] text-white">
            {{ card.title }}
          </h4>
          <p class="mt-[10px] text-[12px] leading-[20px] text-[#a3b6b0]">{{ card.desc }}</p>
        </div>
      </div>

      <!-- 核心观点条：橙标签开头，比卡片带更暗一层 -->
      <div
        class="reveal mt-[24px] flex flex-col gap-[6px] rounded-[10px] border border-[#284239] bg-[#12271f] px-[24px] py-[16px] sm:flex-row sm:items-center sm:gap-[16px]"
        style="--d: 560ms"
      >
        <span class="shrink-0 text-[13px] font-semibold leading-[20px] text-brand-500">
          {{ advantage.noteTag }}
        </span>
        <p class="text-[13px] leading-[22px] text-[#a3b6b0]">{{ advantage.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 暗底：比第四屏的 #0f211b 略偏绿，右下角渐亮（原型四角采色：左上暗右下亮） */
.adv-bg {
  background: linear-gradient(135deg, #10251e 0%, #11271f 55%, #142e25 100%);
}
</style>
