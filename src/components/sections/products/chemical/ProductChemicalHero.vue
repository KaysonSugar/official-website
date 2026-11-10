<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 化工生产首屏：资金流水演示卡
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import HeroCta from '@/components/ui/HeroCta.vue'
import { getPage, siteConfig } from '@/config/site'

/**
 * 化工生产首屏（原型 Product Hero）：浅橙白渐变背景 + 左文案 + 右资金流水卡。
 * 右卡整体 DOM 重建（用户给的 Module Card.png 是烘焙文字位图，已删），
 * 统计小卡 / 页签 / 台账 / 合计行全部照原型采的色：
 * 高亮统计卡浅橙底（label #a9611f、数字 #a94f12），普通卡灰绿底 #f8faf9。
 */
const page = getPage('/products/chemical')
const { heroCard, ctaLabel } = siteConfig.chemical

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 首屏：浅橙到白的纵向渐变，上留白 64px、下 72px -->
  <section
    ref="root"
    class="bg-gradient-to-b from-[#fff6f0] via-[#fffbf8] to-white pb-[72px] pt-[64px]"
  >
    <div class="container-page">
      <!-- 两栏：手机单列 gap 48px；lg 起左列自适应、右列固定 660px
           （五张统计小卡要完整放下 15,008,876.00 这类长数字，550px 会溢出） -->
      <div class="grid items-center gap-[48px] lg:grid-cols-[1fr_660px]">
        <div>
          <!-- 眉题：12px/18px 加粗、字距 0.05em（sm 起 0.08em）、brand-500 橙 -->
          <p
            class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.05em] text-brand-500 sm:tracking-[0.08em]"
            style="--d: 0ms"
          >
            {{ page.eyebrow }}
          </p>

          <!-- 标题：mt-[16px] 与眉题间距 16px（md 18px）；手机 32px/44px、md 起 44px/56px -->
          <h1
            class="reveal mt-[16px] text-[32px] font-bold leading-[44px] text-ink-900 md:mt-[18px] md:text-[44px] md:leading-[56px]"
            style="--d: 80ms"
          >
            {{ page.title }}
          </h1>

          <!-- 说明：mt-[20px] 与标题间距 20px，max-w 520px 一行不超 520px；15px/28px 灰绿 -->
          <p
            class="reveal mt-[20px] max-w-[520px] text-[15px] leading-[28px] text-[#5e7169]"
            style="--d: 160ms"
          >
            {{ page.desc }}
          </p>

          <!-- 主按钮：mt-[32px] 与说明间距 32px -->
          <div class="reveal mt-[32px]" style="--d: 240ms">
            <HeroCta :label="ctaLabel" />
          </div>
        </div>

        <!-- 右列：资金流水卡；悬停上浮 8px——不写 6px，6 换算成物理像素是 7.5 的半像素，
             卡内 12~13px 小字会重采样发虚 -->
        <article
          class="reveal rounded-[16px] bg-white p-[24px] shadow-[0_24px_60px_-24px_rgba(63,42,20,0.18)] ring-1 ring-black/5 transition-transform duration-500 ease-out hover:-translate-y-2"
          style="--d: 200ms"
        >
          <!-- 标题行：左标题右「本月」徽标，两端对齐 -->
          <div class="flex items-center justify-between">
            <h2 class="text-[15px] font-bold leading-[22px] text-[#1f3d32]">
              {{ heroCard.title }}
            </h2>
            <!-- 徽标：浅绿底 #e7f3ec + 深绿字，rounded 6px、px 10 / py 4 -->
            <span
              class="rounded-[6px] bg-[#e7f3ec] px-[10px] py-[4px] text-[12px] font-medium leading-[16px] text-[#1c6b4d]"
            >
              {{ heroCard.badge }}
            </span>
          </div>

          <!-- 五张统计小卡：mt-[16px] 与标题行间距 16px、gap 8px；
               第一张浅橙高亮，其余灰绿底；水平内边距压到 8px，配合 660px 卡宽保证长数字不截断 -->
          <div class="mt-[16px] grid grid-cols-5 gap-[8px]">
            <div
              v-for="stat in heroCard.stats"
              :key="stat.label"
              class="rounded-[8px] px-[8px] py-[10px]"
              :class="stat.active ? 'bg-[#fdf3ea]' : 'bg-[#f8faf9]'"
            >
              <!-- 统计名：11px/16px，高亮卡用陶土橙、普通卡用灰绿 -->
              <p
                class="text-[11px] leading-[16px]"
                :class="stat.active ? 'text-[#a9611f]' : 'text-[#8aa094]'"
              >
                {{ stat.label }}
              </p>
              <!-- 数值：mt-[4px] 与统计名间距 4px；13px/18px 加粗，tabular-nums 等宽不抖 -->
              <p
                class="mt-[4px] text-[13px] font-bold leading-[18px] tabular-nums"
                :class="stat.active ? 'text-[#a94f12]' : 'text-[#1f3d32]'"
              >
                {{ stat.value }}
              </p>
            </div>
          </div>

          <!-- 页签：mt-[16px] 起、gap 20px，底边一条 1px 分隔线；激活项深绿字 + 2px 绿下划线 -->
          <div class="mt-[16px] flex gap-[20px] border-b border-[#eef2ef]">
            <span
              v-for="(tab, i) in heroCard.tabs"
              :key="tab"
              class="relative pb-[10px] text-[13px] leading-[18px]"
              :class="i === 0 ? 'font-semibold text-[#13322a]' : 'text-[#7a9488]'"
            >
              {{ tab }}
              <span
                v-if="i === 0"
                class="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[#2fae85]"
              />
            </span>
          </div>

          <!-- 台账表格：mt-[8px] 与页签间距 8px，12px/18px；表头浅绿底、首尾列各切一侧圆角 -->
          <table class="mt-[8px] w-full border-collapse text-[12px] leading-[18px]">
            <thead>
              <tr class="bg-[#f6faf7] text-left">
                <th class="rounded-l-[6px] px-[12px] py-[8px] font-medium text-[#6b8077]">
                  {{ heroCard.columns[0] }}
                </th>
                <th class="px-[12px] py-[8px] font-medium text-[#6b8077]">
                  {{ heroCard.columns[1] }}
                </th>
                <th class="px-[12px] py-[8px] font-medium text-[#6b8077]">
                  {{ heroCard.columns[2] }}
                </th>
                <th class="rounded-r-[6px] px-[12px] py-[8px] font-medium text-[#6b8077]">
                  {{ heroCard.columns[3] }}
                </th>
              </tr>
            </thead>
            <!-- 数据行：py 11px 撑到 40px 行高，行间 1px 淡分隔线 -->
            <tbody>
              <tr
                v-for="row in heroCard.rows"
                :key="row.contract"
                class="border-b border-[#f2f5f3]"
              >
                <td class="px-[12px] py-[11px] font-medium text-[#1f3d32]">{{ row.name }}</td>
                <td class="px-[12px] py-[11px] text-[#7a9488]">{{ row.contract }}</td>
                <td class="px-[12px] py-[11px] tabular-nums text-[#13322a]">{{ row.amount }}</td>
                <td class="px-[12px] py-[11px] text-[#7a9488]">{{ row.date }}</td>
              </tr>
            </tbody>
          </table>

          <!-- 合计行：mt-[12px] 与表格间距 12px，浅绿底 rounded 6px；右值 15px 加粗 + 等宽数字 -->
          <div
            class="mt-[12px] flex items-center justify-between rounded-[6px] bg-[#eef6f1] px-[12px] py-[10px]"
          >
            <span class="text-[13px] leading-[18px] text-[#1c6b4d]">{{ heroCard.totalLabel }}</span>
            <span class="text-[15px] font-bold leading-[20px] tabular-nums text-[#157a52]">{{
              heroCard.totalValue
            }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
