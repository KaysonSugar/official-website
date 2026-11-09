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

const { advantage } = siteConfig

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：adv-bg 暗绿渐变底（见 style）；overflow-hidden 裁装饰；
       pt-[136px] 上留白 136px、pb-[64px] 下留白 64px -->
  <section ref="root" class="adv-bg relative overflow-hidden pb-[64px] pt-[136px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ advantage.eyebrow }}
      </p>

      <!-- 标题：mt-[24px] 与眉题间距 24px；原型字号偏小，22px/32px 加粗、白字 -->
      <h2
        class="reveal mt-[24px] text-[22px] font-bold leading-[32px] text-white"
        style="--d: 80ms"
      >
        {{ advantage.title }}
      </h2>

      <!-- 对照表外壳：mt-[36px] 与标题间距 36px；rounded-2xl、border-white/10；
           内层 overflow-x-auto 窄屏横滚，min-w-[880px] 三列不换行的最小宽 -->
      <div
        class="reveal mt-[36px] overflow-hidden rounded-2xl border border-white/10"
        style="--d: 160ms"
      >
        <div class="overflow-x-auto">
          <div class="min-w-[880px]">
            <!-- 表头：grid 三列 150px + 两等分（sm 起 185px）；
                 h-[44px] 定高、13px 白字。参与方格 #ff7b33 橙底，其余 #1e332a 深绿底 -->
            <div class="grid grid-cols-[150px_1fr_1fr] sm:grid-cols-[185px_1fr_1fr]">
              <div
                class="flex h-[44px] items-center bg-[#ff7b33] pl-[22px] text-[13px] font-medium text-white"
              >
                {{ advantage.tableHead.party }}
              </div>
              <div
                class="flex h-[44px] items-center bg-[#1e332a] pl-[45px] text-[13px] font-medium text-white"
              >
                {{ advantage.tableHead.pain }}
              </div>
              <div
                class="flex h-[44px] items-center bg-[#1e332a] text-[13px] font-medium text-white"
              >
                {{ advantage.tableHead.solution }}
              </div>
            </div>

            <!-- 三行参与方：左列每行独立橙渐变（上浅 #ff8a4a 下深 #f05c14）。
                 分隔线只压痛点/方案两列——原型里橙列从表头到行内容无线平滑衔接，
                 首行橙列不能有线；行 hover 高亮见 style 的 .adv-row -->
            <div
              v-for="(row, i) in advantage.rows"
              :key="row.name"
              class="adv-row grid grid-cols-[150px_1fr_1fr] sm:grid-cols-[185px_1fr_1fr]"
              :class="i > 0 ? 'border-t border-white/10' : ''"
            >
              <!-- 参与方名称：橙渐变格里垂直居中、16px 白字 -->
              <div
                class="flex items-center justify-center bg-[linear-gradient(180deg,#ff8a4a_0%,#f05c14_100%)] px-[12px] text-[16px] font-medium text-white"
              >
                {{ row.name }}
              </div>

              <!-- 核心痛点：py-[24px]、pl-[45px] pr-[32px]；15px 白标题 + 12px 灰绿描述，
                   多条 mt-[18px] 叠放；首行补上边线跟深绿表头分界 -->
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

              <!-- 解决方案：同痛点列，标题换薄荷绿 #98d3bd；pr-[40px] -->
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

      <!-- 支撑卡组标题：mt-[40px] 与表格间距 40px；16px/24px 居中白字 -->
      <h3
        class="reveal mt-[40px] text-center text-[16px] font-semibold leading-[24px] text-white"
        style="--d: 240ms"
      >
        {{ advantage.supportsTitle }}
      </h3>

      <!-- 支撑卡栅格：mt-[36px] 与标题间距 36px、gap-[24px]；手机 1 列 → sm 3 列。
           暗底卡：border #2a413b + 底 #172e28，hover 描边提亮见 style 的 .adv-card -->
      <div class="mt-[36px] grid grid-cols-1 gap-[24px] sm:grid-cols-3">
        <div
          v-for="(card, ci) in advantage.supports"
          :key="card.no"
          class="adv-card reveal card-lift card-lift-dark rounded-xl border border-[#2a413b] bg-[#172e28] p-[32px]"
          :style="{ '--d': `${320 + ci * 80}ms` }"
        >
          <!-- 编号：20px 加粗，01/03 橙 #ff8a55、02 绿 #36bd92（原型取色） -->
          <p
            class="text-[20px] font-bold leading-none"
            :class="card.tone === 'orange' ? 'text-[#ff8a55]' : 'text-[#36bd92]'"
          >
            {{ card.no }}
          </p>
          <!-- 卡标题：mt-[30px] 与编号间距 30px；16px/24px 白字 -->
          <h4 class="mt-[30px] text-[16px] font-bold leading-[24px] text-white">
            {{ card.title }}
          </h4>
          <!-- 卡正文：mt-[10px]；12px/20px 灰绿 -->
          <p class="mt-[10px] text-[12px] leading-[20px] text-[#a3b6b0]">{{ card.desc }}</p>
        </div>
      </div>

      <!-- 核心观点条：mt-[24px] 与卡片间距 24px；rounded-[10px]、比卡片更暗一档
           （border #284239 / 底 #12271f）；手机竖排 gap-[6px]、sm 起横排居中 gap-[16px] -->
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
.adv-bg {
  background: linear-gradient(135deg, #10251e 0%, #11271f 55%, #142e25 100%);
}

.adv-row {
  transition: background-color 200ms ease;
}

.adv-row:hover {
  background-color: rgba(255, 255, 255, 0.045);
}

.adv-card {
  transition: border-color 240ms ease;
}

.adv-card:hover {
  border-color: #46695d;
}

@media (prefers-reduced-motion: reduce) {
  .adv-card {
    transition: none;
  }
}
</style>
