<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 物流调度第二屏：免费货源广场
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useCountUp } from '@/composables/useCountUp'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 免费货源广场（原型 B 免费货源广场）：浅灰绿整屏底 + 四统计 + 货源表格卡。
 * 表格卡 DOM 重建（用户给的 Cargo Card.png 是烘焙文字位图，已删）：
 * 标题两枚徽标、筛选行假输入框、双数行浅绿斑马底、电话列绿字。
 * 四个统计数字滚进视口从 0 数上去（useCountUp，与首页/司机招募同款）。
 */
const cargo = siteConfig.logistics.cargo

// 拆数字和尾巴：「5,000+」→ num 5000 / rest「+」/ 千位分组，「100%」→ 100 /「%」。
// 原值里本来就带逗号的才标 group，不然「1500+」会被数成「1,500+」改了文案
const statsView = cargo.stats.map((stat) => {
  const m = /^([\d,]+)(.*)$/.exec(stat.value)
  if (!m) return { num: null, rest: stat.value, group: false }
  return {
    num: m[1].replace(/,/g, ''),
    rest: m[2],
    group: m[1].includes(','),
  }
})

const root = useTemplateRef<HTMLElement>('root')
const statsEl = useTemplateRef<HTMLElement>('stats')
useReveal(root)
useCountUp(statsEl)

// 徽标配色沿用站点既有绿/橙两档浅底
const badgeTone = {
  green: 'bg-[#e2f3ea] text-[#1c8a66]',
  orange: 'bg-[#ffeede] text-[#e9611f]',
} as const
</script>

<template>
  <section ref="root" class="bg-[#f1f7f3] py-[88px]">
    <div class="container-page">
      <!-- 标题区 -->
      <div class="reveal max-w-[900px]">
        <p
          class="text-[12px] font-semibold leading-[18px] tracking-[0.05em] text-brand-500 sm:tracking-[0.08em]"
        >
          {{ cargo.eyebrow }}
        </p>
        <h2
          class="mt-[14px] text-[28px] font-bold leading-[40px] text-ink-900 md:text-[36px] md:leading-[52px]"
        >
          {{ cargo.title }}
          <span class="text-[#f2590c]">{{ cargo.titleAccent }}</span>
          {{ cargo.titleTail }}
        </h2>
        <p class="mt-[16px] text-[15px] leading-[28px] text-[#5e7169]">{{ cargo.desc }}</p>
      </div>

      <!-- 统计行：左四组数字（组间距按原型拉开），右注释与数字行对齐。
           能拆出数字的初始渲染 0+尾巴，滚进视口从 0 数上去 -->
      <div
        ref="stats"
        class="reveal mt-[36px] flex flex-wrap items-end gap-x-[48px] gap-y-[20px] lg:gap-x-[80px]"
        style="--d: 120ms"
      >
        <div v-for="(stat, i) in cargo.stats" :key="stat.label">
          <p
            class="text-[28px] font-bold leading-[36px] tabular-nums md:text-[32px] md:leading-[40px]"
            :class="stat.tone === 'green' ? 'text-[#008c5a]' : 'text-[#f2590c]'"
            v-bind="
              statsView[i].num !== null
                ? {
                    'data-num': statsView[i].num,
                    'data-rest': statsView[i].rest,
                    ...(statsView[i].group ? { 'data-format': 'group' } : {}),
                  }
                : {}
            "
          >
            {{ statsView[i].num !== null ? `0${statsView[i].rest}` : statsView[i].rest }}
          </p>
          <p class="mt-[4px] text-[12px] leading-[18px] text-[#5e7169]">{{ stat.label }}</p>
        </div>
        <!-- 注释：三段分开摆（原型里圆点是独立分隔符），间隔 20→14；
             圆点加重到 16px 加粗深灰，别细得像没有；
             整组往左靠，离「0 元」60（原 120 太远，右边一大片空） -->
        <p
          class="hidden text-[12px] leading-[18px] text-[#8aa094] lg:flex lg:ml-[60px] lg:items-center lg:self-end lg:gap-x-[14px] lg:pb-[24px]"
        >
          <template v-for="(note, i) in cargo.notes" :key="note">
            <span>{{ note }}</span>
            <span
              v-if="i < cargo.notes.length - 1"
              class="text-[16px] font-bold leading-[16px] text-[#5e7169]"
              >·</span
            >
          </template>
        </p>
      </div>

      <!-- 货源表格卡 -->
      <article
        class="reveal mt-[40px] rounded-[16px] border border-[#e3ebe6] bg-white p-[20px] shadow-[0_24px_60px_-28px_rgba(36,63,49,0.22)] md:p-[24px]"
        style="--d: 200ms"
      >
        <!-- 卡头：标题 + 徽标 | 更新时间 + 条数 -->
        <div class="flex flex-wrap items-center gap-x-[16px] gap-y-[8px]">
          <h3 class="text-[16px] font-bold leading-[24px] text-[#13322a]">
            {{ cargo.card.title }}
          </h3>
          <span
            v-for="badge in cargo.card.badges"
            :key="badge.label"
            class="rounded-[6px] px-[9px] py-[3px] text-[11px] leading-[16px] font-medium"
            :class="badgeTone[badge.tone]"
          >
            {{ badge.label }}
          </span>
          <span class="ml-auto text-[12px] leading-[18px] text-[#8aa094]">
            {{ cargo.card.updated }} · {{ cargo.card.count }}
          </span>
        </div>

        <!-- 筛选行：假输入框撑样子，重置/搜索贴右 -->
        <div class="mt-[16px] flex flex-wrap items-center gap-[10px]">
          <label
            v-for="filter in cargo.card.filters"
            :key="filter.label"
            class="flex items-center gap-[8px]"
          >
            <span class="text-[12px] leading-[18px] text-[#5e7169]">{{ filter.label }}</span>
            <span
              class="flex h-[34px] w-[150px] items-center rounded-[8px] border border-[#e3ebe6] px-[10px] text-[12px] leading-[18px] text-[#a9bab1] md:w-[170px]"
            >
              {{ filter.placeholder }}
            </span>
          </label>
          <div class="ml-auto flex items-center gap-[10px]">
            <span
              class="flex h-[34px] cursor-pointer items-center rounded-[8px] border border-[#e3ebe6] bg-white px-[18px] text-[12px] leading-[18px] text-[#5e7169] transition-colors duration-200 hover:bg-[#f3f7f5]"
            >
              重置
            </span>
            <span
              class="flex h-[34px] cursor-pointer items-center rounded-[8px] bg-mint-500 px-[18px] text-[12px] leading-[18px] font-medium text-white transition-colors duration-200 hover:bg-mint-600"
            >
              搜索
            </span>
          </div>
        </div>

        <!-- 货源表：窄屏横向滚动；双数行（0 起数的 1、3）浅绿斑马底 -->
        <div class="mt-[8px] overflow-x-auto">
          <table class="w-full min-w-[880px] border-collapse text-[12px] leading-[18px]">
            <thead>
              <tr class="border-b border-[#eef2ef] text-left">
                <th class="py-[10px] pl-[12px] pr-[8px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[0] }}
                </th>
                <th class="px-[8px] py-[10px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[1] }}
                </th>
                <th class="px-[8px] py-[10px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[2] }}
                </th>
                <th class="px-[8px] py-[10px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[3] }}
                </th>
                <th class="px-[8px] py-[10px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[4] }}
                </th>
                <th class="px-[8px] py-[10px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[5] }}
                </th>
                <th class="px-[8px] py-[10px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[6] }}
                </th>
                <th class="py-[10px] pl-[8px] pr-[12px] font-medium text-[#6b8077]">
                  {{ cargo.card.columns[7] }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in cargo.card.rows"
                :key="row.route"
                class="border-b border-[#f2f5f3] transition-colors duration-200 hover:bg-[#e9f3ed]"
                :class="i % 2 === 1 ? 'bg-[#f3f9f5]' : ''"
              >
                <td class="py-[13px] pl-[12px] pr-[8px] tabular-nums text-[#8aa094]">
                  {{ i + 1 }}
                </td>
                <td class="px-[8px] py-[13px] font-medium text-[#13322a]">{{ row.route }}</td>
                <td class="px-[8px] py-[13px] text-[#5e7169]">{{ row.cls }}</td>
                <td class="px-[8px] py-[13px] text-[#5e7169]">{{ row.truck }}</td>
                <td class="px-[8px] py-[13px] tabular-nums text-[#5e7169]">{{ row.weight }}</td>
                <td class="px-[8px] py-[13px] tabular-nums text-[#5e7169]">{{ row.time }}</td>
                <td class="px-[8px] py-[13px] text-[#5e7169]">{{ row.contact }}</td>
                <td class="py-[13px] pl-[8px] pr-[12px] tabular-nums text-[#1c8a66]">
                  {{ row.phone }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 卡底：合计说明 | 查看全部 -->
        <div class="mt-[14px] flex flex-wrap items-center justify-between gap-[8px]">
          <p class="text-[12px] leading-[18px] text-[#8aa094]">{{ cargo.card.foot }}</p>
          <span class="text-[12px] font-medium leading-[18px] text-[#1c8a66]"
            >{{ cargo.card.more }} →</span
          >
        </div>
      </article>
    </div>
  </section>
</template>
