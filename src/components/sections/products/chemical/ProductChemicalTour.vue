<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 化工生产第三屏：界面展示（四行图文交替，面板 DOM 绘制）
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 界面展示（原型 P 界面实录）：深绿底、四行图文交替。
 * 四块面板原来是位图截图，按「烘焙文字必糊」的铁律整块 DOM 重建（tour-*.webp 已删），
 * 演示数据在 siteConfig.chemical.tour.rows[].panel，按 kind 可辨识联合分派。
 * 文字列两种形态：01 仓储是「名 + 描述」两栏行，02~04 是绿点列表。
 * 面板在右（默认）、flip 时 lg 下挪到左，手机端全部退化为上下堆叠。
 */
const { tour } = siteConfig.chemical

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：深绿纵向渐变 #0d1c17→#12211a（顶部更黑，往下微亮），上下留白各 96px -->
  <section ref="root" class="bg-gradient-to-b from-[#0d1c17] to-[#12211a] pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、深底上仍用品牌橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ tour.eyebrow }}
      </p>
      <!-- 标题：mt-[20px] 与眉题间距 20px；32px/42px 加粗纯白 -->
      <h2
        class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-white"
        style="--d: 80ms"
      >
        {{ tour.title }}
      </h2>
      <!-- 说明：mt-[14px] 与标题间距 14px，max-w 720px；14px/24px 浅灰绿 #bacec5 -->
      <p
        class="reveal mt-[14px] max-w-[720px] text-[14px] leading-[24px] text-[#bacec5]"
        style="--d: 160ms"
      >
        {{ tour.desc }}
      </p>

      <!-- 四行图文交替：mt-[56px] 与说明间距 56px，行间 gap 48px（lg 56px） -->
      <div class="mt-[56px] flex flex-col gap-[48px]">
        <div
          v-for="(row, i) in tour.rows"
          :key="row.label"
          class="reveal grid items-center gap-[28px] lg:gap-[56px]"
          :class="row.flip ? 'lg:grid-cols-[7fr_5fr]' : 'lg:grid-cols-[5fr_7fr]'"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <!-- 文字列：flip 时 order-2 换到右侧；手机端一律在图上面 -->
          <div :class="row.flip ? 'lg:order-2' : ''">
            <!-- 小标：13px/18px 加粗，亮绿 #76d4af -->
            <p class="text-[13px] font-semibold leading-[18px] text-[#76d4af]">{{ row.label }}</p>

            <!-- 「名 + 描述」两栏行（01 仓储）：mt-[22px] 起、行距 18px；
                 名固定 7.5em 宽，保证四行描述左边缘对齐 -->
            <div v-if="row.pairs?.length" class="mt-[22px] flex flex-col gap-[18px]">
              <div v-for="pair in row.pairs" :key="pair.name" class="flex gap-[16px] sm:gap-[24px]">
                <span
                  class="w-[7.5em] shrink-0 text-[15px] font-bold leading-[24px] text-[#effef7]"
                >
                  {{ pair.name }}
                </span>
                <span class="text-[13px] leading-[22px] text-[#bacec5]">{{ pair.desc }}</span>
              </div>
            </div>

            <!-- 绿点列表（02~04）：mt-[22px] 起、行距 14px；6px 圆点 mt-[8px] 压到首行中线 -->
            <ul v-else-if="row.bullets?.length" class="mt-[22px] flex flex-col gap-[14px]">
              <li v-for="item in row.bullets" :key="item" class="flex gap-[12px]">
                <span
                  class="mt-[8px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#6adbb0]"
                  aria-hidden="true"
                />
                <span class="text-[13px] leading-[22px] text-[#bacec5]">{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- 面板：白底 16px 圆角 + ring-1 白描边 + 大投影，深底上才分得出层级；
               flip 时 order-1 挪到左侧。card-lift 的投影画在卡片外，
               所以横向滚动放在内层——放外层会把 hover 投影一起裁掉 -->
          <div
            class="card-lift min-w-0 rounded-[16px] bg-white shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
            :class="row.flip ? 'lg:order-1' : ''"
          >
            <!-- 内层滚动容器：内边距 20px（sm 26px），min-w 540px 保证表格列不挤成一团 -->
            <div class="overflow-x-auto rounded-[16px] p-[20px] sm:p-[26px]">
              <div class="min-w-[540px]">
                <!-- 01 仓储：仓库详情 -->
                <template v-if="row.panel.kind === 'warehouse'">
                  <!-- 标题行：左标题右「启用」描边小按钮 -->
                  <div class="flex items-center justify-between">
                    <p class="text-[17px] font-bold leading-[24px] text-[#17362b]">
                      {{ row.panel.title }}
                    </p>
                    <span
                      class="rounded-[8px] border border-[#bfe3d0] px-[12px] py-[4px] text-[12px] leading-[17px] text-[#2e9e6b]"
                    >
                      {{ row.panel.badge }}
                    </span>
                  </div>
                  <!-- 元信息行：mt-[10px] 起，仓库编号 / 负责人 / 建库横排换行，gap-x 20px -->
                  <p
                    class="mt-[10px] flex flex-wrap gap-x-[20px] gap-y-[4px] text-[12px] leading-[17px] text-[#8aa39a]"
                  >
                    <span v-for="m in row.panel.meta" :key="m">{{ m }}</span>
                  </p>
                  <!-- 标签页 + 右侧盘入盘出按钮：mt-[14px] 起，页签 gap 20px，激活项 3px 绿下划线 -->
                  <div class="mt-[14px] flex items-center justify-between gap-[12px]">
                    <div class="flex gap-[20px]">
                      <span
                        class="relative pb-[7px] text-[13px] font-semibold leading-[18px] text-[#17362b]"
                      >
                        {{ row.panel.tabs.active }}
                        <i
                          class="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[#2e9e6b]"
                          aria-hidden="true"
                        />
                      </span>
                      <span
                        v-for="t in row.panel.tabs.idle"
                        :key="t"
                        class="pb-[7px] text-[13px] leading-[18px] text-[#8aa39a]"
                      >
                        {{ t }}
                      </span>
                    </div>
                    <span
                      class="shrink-0 rounded-[8px] border border-[#d9e5de] px-[12px] py-[5px] text-[12px] leading-[17px] text-[#5e7169]"
                    >
                      {{ row.panel.action }}
                    </span>
                  </div>
                  <!-- 库存表：mt-[10px] 起，外套 rounded 12px 浅绿容器让斑马行通到边缘；
                         五列全部左对齐（原库存数量列右对齐，跟其他列统一） -->
                  <div
                    class="mt-[10px] overflow-hidden rounded-[12px] bg-[#f6faf8] pb-[4px] pt-[2px]"
                  >
                    <table class="w-full">
                      <thead>
                        <tr class="text-[12px] leading-[30px] text-[#93aca1]">
                          <th class="pl-[14px] text-left font-normal">
                            {{ row.panel.headers[0] }}
                          </th>
                          <th class="text-left font-normal">{{ row.panel.headers[1] }}</th>
                          <th class="text-left font-normal">{{ row.panel.headers[2] }}</th>
                          <th class="text-left font-normal">{{ row.panel.headers[3] }}</th>
                          <th class="pr-[14px] text-left font-normal">
                            {{ row.panel.headers[4] }}
                          </th>
                        </tr>
                      </thead>
                      <!-- 数据行：42px 行高，偶数行浅绿斑马 -->
                      <tbody>
                        <tr
                          v-for="(r, ri) in row.panel.rows"
                          :key="r.name"
                          class="text-[13px] leading-[42px]"
                          :class="ri % 2 === 0 ? 'bg-white' : 'bg-[#f1f7f3]'"
                        >
                          <td class="pl-[14px] font-semibold text-[#26473c]">{{ r.name }}</td>
                          <td>
                            <!-- 状态标签：绿 / 橙两色胶囊 -->
                            <span
                              class="rounded-[6px] px-[8px] py-[2px] text-[11px] leading-[16px]"
                              :class="
                                r.tagTone === 'green'
                                  ? 'bg-[#e6f5ec] text-[#2e9e6b]'
                                  : 'bg-[#fdeee0] text-[#d97a2b]'
                              "
                            >
                              {{ r.tag }}
                            </span>
                          </td>
                          <td class="text-[#5e7169]">{{ r.purity }}</td>
                          <td class="text-[#5e7169]">{{ r.unit }}</td>
                          <td class="pr-[14px] font-bold text-[#17362b]">{{ r.qty }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p class="mt-[12px] text-[11px] leading-[16px] text-[#9ab3a9]">
                    {{ row.panel.footer }}
                  </p>
                </template>

                <!-- 02 生产：生产计划详情 -->
                <template v-else-if="row.panel.kind === 'production'">
                  <!-- 标题行：右侧两个状态徽标，gap 8px -->
                  <div class="flex items-center justify-between gap-[10px]">
                    <p class="text-[17px] font-bold leading-[24px] text-[#17362b]">
                      {{ row.panel.title }}
                    </p>
                    <div class="flex shrink-0 gap-[8px]">
                      <span
                        v-for="b in row.panel.badges"
                        :key="b.text"
                        class="rounded-[8px] px-[10px] py-[4px] text-[12px] leading-[17px]"
                        :class="
                          b.tone === 'green'
                            ? 'bg-[#e6f5ec] text-[#2e9e6b]'
                            : 'bg-[#e9effb] text-[#4a72d4]'
                        "
                      >
                        {{ b.text }}
                      </span>
                    </div>
                  </div>
                  <!-- 计划参数药丸：mt-[12px] 起、gap 8px；label 灰 + value 深色加粗 -->
                  <div class="mt-[12px] flex flex-wrap gap-[8px]">
                    <span
                      v-for="c in row.panel.chips"
                      :key="c.label"
                      class="flex items-center gap-[6px] rounded-[8px] border border-[#e3ebe6] px-[12px] py-[6px] text-[12px] leading-[17px]"
                    >
                      <span class="text-[#8aa39a]">{{ c.label }}</span>
                      <span class="font-semibold text-[#26473c]">{{ c.value }}</span>
                    </span>
                  </div>
                  <!-- 三个标签页：mt-[14px] 起、gap 22px，第一个选中 -->
                  <div class="mt-[14px] flex gap-[22px]">
                    <span
                      v-for="(t, ti) in row.panel.tabs"
                      :key="t"
                      class="relative pb-[7px] text-[13px] leading-[18px]"
                      :class="ti === 0 ? 'font-semibold text-[#17362b]' : 'text-[#8aa39a]'"
                    >
                      {{ t }}
                      <i
                        v-if="ti === 0"
                        class="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-[#2e9e6b]"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <!-- 物料清单表：mt-[10px] 起，斑马行通到容器边缘；
                         损耗率 / 投料量 / 来源全部左对齐（原右对齐） -->
                  <div
                    class="mt-[10px] overflow-hidden rounded-[12px] bg-[#f6faf8] pb-[4px] pt-[2px]"
                  >
                    <table class="w-full">
                      <thead>
                        <tr class="text-[12px] leading-[30px] text-[#93aca1]">
                          <th class="pl-[14px] text-left font-normal">
                            {{ row.panel.headers[0] }}
                          </th>
                          <th class="text-left font-normal">{{ row.panel.headers[1] }}</th>
                          <th class="text-left font-normal">{{ row.panel.headers[2] }}</th>
                          <th class="w-[86px] text-left font-normal">{{ row.panel.headers[3] }}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(r, ri) in row.panel.rows"
                          :key="r.name"
                          class="text-[13px] leading-[42px]"
                          :class="ri % 2 === 0 ? 'bg-white' : 'bg-[#f1f7f3]'"
                        >
                          <td class="pl-[14px] font-semibold text-[#26473c]">{{ r.name }}</td>
                          <td class="text-[#8aa39a]">{{ r.loss }}</td>
                          <td class="font-bold text-[#17362b]">{{ r.amount }}</td>
                          <td class="pr-[14px]">
                            <!-- 来源标签：橙 = 外购，灰 = 自产 -->
                            <span
                              class="rounded-[6px] px-[8px] py-[2px] text-[11px] leading-[16px]"
                              :class="
                                r.tone === 'orange'
                                  ? 'bg-[#fdeee0] text-[#d97a2b]'
                                  : 'bg-[#eef2f0] text-[#5e7169]'
                              "
                            >
                              {{ r.source }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p class="mt-[12px] text-[11px] leading-[16px] text-[#9ab3a9]">
                    {{ row.panel.footer }}
                  </p>
                </template>

                <!-- 03 质量与安全：检测项设置 -->
                <template v-else-if="row.panel.kind === 'quality'">
                  <div class="flex items-center justify-between">
                    <p class="text-[17px] font-bold leading-[24px] text-[#17362b]">
                      {{ row.panel.title }}
                    </p>
                    <span
                      class="rounded-[8px] bg-[#e6f5ec] px-[10px] py-[4px] text-[12px] leading-[17px] text-[#2e9e6b]"
                    >
                      {{ row.panel.badge }}
                    </span>
                  </div>
                  <!-- 元信息：mt-[10px] 起，物料 · 纯度 · 计量单位用中点分隔 -->
                  <p
                    class="mt-[10px] flex flex-wrap items-center gap-x-[10px] gap-y-[4px] text-[12px] leading-[17px] text-[#8aa39a]"
                  >
                    <template v-for="(m, mi) in row.panel.meta" :key="m">
                      <span v-if="mi > 0" aria-hidden="true">·</span>
                      <span>{{ m }}</span>
                    </template>
                  </p>
                  <!-- 表头：mt-[12px] 起，四列 [序号 26px_1.25fr_1fr_0.75fr]，序号列留空 -->
                  <div
                    class="mt-[12px] grid grid-cols-[26px_1.25fr_1fr_0.75fr] gap-x-[10px] text-[12px] leading-[18px] text-[#93aca1]"
                  >
                    <span />
                    <span>{{ row.panel.headers[0] }}</span>
                    <span>{{ row.panel.headers[1] }}</span>
                    <span>{{ row.panel.headers[2] }}</span>
                  </div>
                  <!-- 检测项行：mt-[8px] 起、行距 10px；橙色序号 + 三个描边输入框样式（36px 高） -->
                  <div class="mt-[8px] flex flex-col gap-[10px]">
                    <div
                      v-for="(r, ri) in row.panel.rows"
                      :key="r.item"
                      class="grid grid-cols-[26px_1.25fr_1fr_0.75fr] items-center gap-x-[10px]"
                    >
                      <span
                        class="text-[13px] font-bold leading-[38px] tabular-nums text-[#d97a2b]"
                        >{{ ri + 1 }}</span
                      >
                      <span
                        class="truncate rounded-[10px] border border-[#d9e5de] bg-[#fbfdfc] px-[12px] text-[12px] leading-[36px] text-[#26473c]"
                      >
                        {{ r.item }}
                      </span>
                      <span
                        class="truncate rounded-[10px] border border-[#d9e5de] bg-[#fbfdfc] px-[12px] text-[12px] leading-[36px] text-[#26473c]"
                      >
                        {{ r.desc }}
                      </span>
                      <span
                        class="truncate rounded-[10px] border border-[#d9e5de] bg-[#fbfdfc] px-[12px] text-[12px] leading-[36px] text-[#26473c]"
                      >
                        {{ r.method }}
                      </span>
                    </div>
                  </div>
                  <!-- 检查频率：mt-[14px] 起、gap 10px；选中项 1.5px 绿描边，其余灰描边 -->
                  <div class="mt-[14px] flex flex-wrap items-center gap-[10px]">
                    <span class="text-[12px] leading-[17px] text-[#8aa39a]">{{
                      row.panel.freqLabel
                    }}</span>
                    <span
                      v-for="f in row.panel.freqs"
                      :key="f.text"
                      class="rounded-[8px] px-[14px] py-[6px] text-[12px] leading-[17px]"
                      :class="
                        f.active
                          ? 'border-[1.5px] border-[#2e9e6b] font-semibold text-[#17362b]'
                          : 'border border-[#d9e5de] text-[#5e7169]'
                      "
                    >
                      {{ f.text }}
                    </span>
                  </div>
                </template>

                <!-- 04 客户与供应商：客户管理（联合类型的最后一支，走 v-else） -->
                <template v-else>
                  <div class="flex items-center justify-between gap-[10px]">
                    <p class="text-[17px] font-bold leading-[24px] text-[#17362b]">
                      {{ row.panel.title }}
                    </p>
                    <span
                      class="shrink-0 rounded-[8px] bg-[#eef2f0] px-[10px] py-[4px] text-[12px] leading-[17px] text-[#5e7169]"
                    >
                      {{ row.panel.stat }}
                    </span>
                  </div>
                  <!-- 筛选：mt-[12px] 起、gap 8px；「全部」选中橙描边，其余灰描边 -->
                  <div class="mt-[12px] flex flex-wrap gap-[8px]">
                    <span
                      v-for="f in row.panel.filters"
                      :key="f.text"
                      class="rounded-[8px] px-[14px] py-[6px] text-[12px] leading-[17px]"
                      :class="
                        f.active
                          ? 'border-[1.5px] border-[#eba75f] font-semibold text-[#d97a2b]'
                          : 'border border-[#d9e5de] text-[#5e7169]'
                      "
                    >
                      {{ f.text }}
                    </span>
                  </div>
                  <!-- 客户表：mt-[10px] 起，斑马行通到容器边缘；状态列改左对齐（原右对齐） -->
                  <div
                    class="mt-[10px] overflow-hidden rounded-[12px] bg-[#f6faf8] pb-[4px] pt-[2px]"
                  >
                    <table class="w-full">
                      <thead>
                        <tr class="text-[12px] leading-[30px] text-[#93aca1]">
                          <th class="pl-[14px] text-left font-normal">
                            {{ row.panel.headers[0] }}
                          </th>
                          <th class="text-left font-normal">{{ row.panel.headers[1] }}</th>
                          <th class="text-left font-normal">{{ row.panel.headers[2] }}</th>
                          <th class="pr-[14px] text-left font-normal">
                            {{ row.panel.headers[3] }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(r, ri) in row.panel.rows"
                          :key="r.name"
                          class="text-[13px] leading-[42px]"
                          :class="ri % 2 === 0 ? 'bg-white' : 'bg-[#f1f7f3]'"
                        >
                          <td class="pl-[14px] font-semibold text-[#26473c]">{{ r.name }}</td>
                          <td>
                            <!-- 等级标签：三色胶囊（绿 = 重点客户、橙 = 潜在、灰 = 普通） -->
                            <span
                              class="rounded-[6px] px-[8px] py-[2px] text-[11px] leading-[16px]"
                              :class="{
                                'bg-[#e6f5ec] text-[#2e9e6b]': r.levelTone === 'green',
                                'bg-[#fdeee0] text-[#d97a2b]': r.levelTone === 'orange',
                                'bg-[#eef2f0] text-[#5e7169]': r.levelTone === 'gray',
                              }"
                            >
                              {{ r.level }}
                            </span>
                          </td>
                          <td class="text-[#5e7169]">{{ r.nature }}</td>
                          <td class="pr-[14px] font-bold text-[#2e9e6b]">{{ r.status }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p class="mt-[12px] text-[11px] leading-[16px] text-[#9ab3a9]">
                    {{ row.panel.footer }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
