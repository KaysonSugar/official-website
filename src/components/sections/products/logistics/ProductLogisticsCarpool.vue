<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 物流第四屏：智能拼车（深绿屏 + 拼车时间轴卡）
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 深绿屏，左文右卡（约 4:7）。
 * 右侧拼车时间轴卡整卡 DOM 重建（拼车路线图.png 是烘焙文字参考图）：
 * 六列等宽 grid，连线是绝对定位的细线压在圆点行背后，
 * 左右各缩进半列（8.33%）正好从首点到末点，列数变了这段要跟着改。
 * 六列在手机上放不下，整卡套 overflow-x-auto + min-w 横滚，跟货源表格一个处理。
 */
const { carpool } = siteConfig.logistics

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-gradient-to-b from-[#0d1c17] to-[#12211a] pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：品牌橙 #ff833f，全站统一；这屏主题色本身就是拼车橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ carpool.eyebrow }}
      </p>
      <h2 class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-white" style="--d: 80ms">
        {{ carpool.title }}
      </h2>
      <p class="reveal mt-[14px] max-w-[760px] text-[14px] leading-[24px] text-[#bacec5]" style="--d: 160ms">
        {{ carpool.desc }}
      </p>

      <div class="reveal mt-[56px] grid items-center gap-[36px] lg:grid-cols-[4fr_7fr] lg:gap-[64px]" style="--d: 240ms">
        <!-- 左列：橙色小标签 + 说明段 -->
        <div>
          <span
            class="inline-block rounded-[10px] bg-[#3f2313] px-[18px] py-[8px] text-[14px] font-bold leading-[20px] text-[#f2a25c] ring-1 ring-[#8a4f26]/50"
          >
            {{ carpool.tag }}
          </span>
          <p class="mt-[22px] text-[14px] leading-[26px] text-[#bacec5]">{{ carpool.detail }}</p>
        </div>

        <!-- 右侧拼车方案卡：窄屏横滚 -->
        <div class="overflow-x-auto pb-[6px]">
          <div class="min-w-[760px] rounded-[16px] bg-white p-[28px] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)]">
            <!-- 卡头：方案名 + 起终点 + 绿徽标 + 汇总 -->
            <div class="flex flex-wrap items-center gap-x-[14px] gap-y-[8px]">
              <span class="text-[16px] font-bold text-[#13322a]">{{ carpool.card.plan }}</span>
              <span class="text-[15px] font-bold text-[#13322a]">
                {{ carpool.card.from }} → {{ carpool.card.to }}
              </span>
              <span class="rounded-[6px] bg-[#eaf7f0] px-[9px] py-[3px] text-[12px] font-medium leading-[17px] text-[#3d8f74]">
                {{ carpool.card.badge }}
              </span>
              <span class="text-[13px] text-[#8aa094]">{{ carpool.card.summary }}</span>
            </div>

            <!-- 时间轴：城市 / 事件 / 圆点行 / 货物去向，四行都用同一个六列 grid 对齐 -->
            <div class="mt-[28px]">
              <div class="grid grid-cols-6">
                <p
                  v-for="stop in carpool.card.stops"
                  :key="`city-${stop.city}`"
                  class="text-center text-[15px] font-bold leading-[22px] text-[#13322a]"
                >
                  {{ stop.city }}
                </p>
              </div>
              <div class="mt-[6px] grid grid-cols-6">
                <p
                  v-for="stop in carpool.card.stops"
                  :key="`event-${stop.city}`"
                  class="flex h-[34px] items-start justify-center text-center text-[11px] leading-[16px] text-[#8aa094]"
                >
                  {{ stop.event }}
                </p>
              </div>
              <!-- 圆点行：连线 absolute 压底，首尾缩进半列（1/12 ≈ 8.33%） -->
              <div class="relative mt-[6px] grid grid-cols-6">
                <span
                  class="absolute left-[8.33%] right-[8.33%] top-1/2 h-[2px] -translate-y-1/2 bg-[#f6c9a6]"
                  aria-hidden="true"
                />
                <span
                  v-for="stop in carpool.card.stops"
                  :key="`dot-${stop.city}`"
                  class="relative z-10 flex justify-center"
                >
                  <span class="h-[13px] w-[13px] rounded-full bg-[#f5823c] ring-[3px] ring-white" aria-hidden="true" />
                </span>
              </div>
              <div class="mt-[10px] grid grid-cols-6">
                <p
                  v-for="stop in carpool.card.stops"
                  :key="`cargo-${stop.city}`"
                  class="text-center text-[12px] leading-[18px] text-[#5e7169]"
                >
                  {{ stop.cargo }}
                </p>
              </div>
            </div>

            <!-- 底部橙条：加粗引子 + 全程路线 -->
            <div class="mt-[24px] flex flex-wrap items-center gap-x-[16px] rounded-[10px] bg-[#fff4ec] px-[20px] py-[12px]">
              <span class="text-[14px] font-bold leading-[20px] text-[#b65a20]">{{ carpool.card.stripLead }}</span>
              <span class="text-[13px] leading-[20px] text-[#c4703a]">{{ carpool.card.stripRoute }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
