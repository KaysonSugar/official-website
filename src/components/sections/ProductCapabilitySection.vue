<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 物流第三屏：运输链核心功能 + 调度台演示窗口
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 三张能力卡 + 调度台演示窗口。配色/布局全部对照 wyd-h5-carrier 调度台源码还原：
 * 面板渐变 #f0fdff→#fff、运单卡 #e0fafa→#fff、选中 #d8ffff + #21e3a5 边框、
 * 数据格 #fffdfc→#fff1e8 + #ffc19d 边框、按钮 #2fb188。数据是编造的明文假数据。
 * 窗口内容约 1150px 起，手机端套 overflow-x-auto 横滚。
 */
const { capability } = siteConfig.logistics
const consoleData = capability.console

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题 / 标题 / 描述 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-[#2fae85] sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ capability.eyebrow }}
      </p>
      <h2 class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-ink-900" style="--d: 80ms">
        {{ capability.title }}
      </h2>
      <p class="reveal mt-[14px] max-w-[720px] text-[14px] leading-[24px] text-[#5e7169]" style="--d: 160ms">
        {{ capability.desc }}
      </p>

      <!-- 三张能力卡：浅绿灰底、无边框（原型就是色块不描边） -->
      <div class="mt-[40px] grid gap-[24px] md:grid-cols-3">
        <article
          v-for="(card, i) in capability.cards"
          :key="card.title"
          class="reveal rounded-[16px] bg-[#f7fbfa] p-[28px]"
          :style="{ '--d': `${240 + i * 90}ms` }"
        >
          <h3 class="text-[17px] font-bold leading-[24px] text-[#13322a]">{{ card.title }}</h3>
          <p class="mt-[12px] text-[13px] leading-[22px] text-[#5e7169]">{{ card.body }}</p>
          <p class="mt-[14px] text-[12px] leading-[20px] text-[#1c8a66]">
            <span class="font-bold">{{ card.noteTag }}：</span>{{ card.note }}
          </p>
        </article>
      </div>

      <!-- 调度台窗口：手机横滚（滚动条隐藏，桌面不露条）。窗口底色 #f5f5f5（面板间缝隙色） -->
      <div class="reveal hide-scrollbar mt-[48px] overflow-x-auto" style="--d: 240ms">
        <div
          class="min-w-[1180px] overflow-hidden rounded-[14px] bg-[#f5f5f5] p-[10px] shadow-[0_28px_70px_-30px_rgba(19,50,42,0.35)] ring-1 ring-black/5"
        >
          <!-- 窗口顶栏：mac 三点 + 标题 + 时间；底部多留空隙跟面板隔开 -->
          <div class="flex items-center gap-[10px] px-[10px] pb-[12px] pt-[6px]">
            <!-- mac 三点：经典红黄绿 -->
            <span class="flex gap-[6px]" aria-hidden="true">
              <span class="h-[9px] w-[9px] rounded-full bg-[#ff5f57]" />
              <span class="h-[9px] w-[9px] rounded-full bg-[#febc2e]" />
              <span class="h-[9px] w-[9px] rounded-full bg-[#28c840]" />
            </span>
            <span class="ml-[4px] text-[13px] font-semibold leading-[18px] text-[#3a4f46]">{{ consoleData.title }}</span>
            <!-- 时间挨着标题，不靠右 -->
            <span class="ml-[10px] text-[12px] leading-[16px] text-[#7d948a]">{{ consoleData.time }}</span>
          </div>

          <!-- 三面板：渐变底 #f0fdff→#fff（源码三个 scss 同款）。行高定死 640：源码高度就是 JS 算的，
               定高才能让左栏第五张卡照原型被底边裁掉、中栏网格等分撑满 -->
          <div class="flex h-[640px] items-stretch gap-[10px]">
            <!-- 左：待调度运单，列表超出裁掉 -->
            <div class="panel flex w-[262px] shrink-0 flex-col overflow-hidden">
              <div class="flex items-center gap-[8px] px-[14px] pb-[6px] pt-[12px]">
                <svg viewBox="0 0 24 24" class="h-[16px] w-[16px]" fill="none" aria-hidden="true">
                  <rect x="4" y="3" width="16" height="18" rx="2" fill="#2fb188" />
                  <path d="M8 8h8M8 12h8M8 16h5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" />
                </svg>
                <span class="text-[15px] font-bold leading-[21px] text-black">{{ consoleData.orders.title }}</span>
              </div>

              <div class="flex min-h-0 flex-1 flex-col gap-[12px] overflow-hidden px-[10px] pb-[10px] pt-[4px]">
                <article
                  v-for="order in consoleData.orders.cards"
                  :key="order.orderNo"
                  class="relative shrink-0 rounded-[10px] p-[12px_10px]"
                  :class="
                    order.active
                      ? 'border border-[#21e3a5] bg-gradient-to-b from-[#d8ffff] to-white shadow-[0_5px_10px_rgba(33,227,165,0.6)]'
                      : 'border border-[#e0fafa] bg-gradient-to-b from-[#e0fafa] to-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                  "
                >
                  <!-- 选中卡右上角的绿色问号提示圆点（源码 tip / why 图标） -->
                  <span
                    v-if="order.active"
                    class="absolute right-[8px] top-[8px] flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#2fb188] text-[9px] font-bold leading-none text-white"
                    aria-hidden="true"
                  >
                    ?
                  </span>
                  <!-- 路线头：城市 17px 加粗居中 + 绿色路径小图标 -->
                  <p class="flex items-center justify-center gap-[8px] text-[14px] font-bold leading-[20px] text-black">
                    {{ order.from }}
                    <svg viewBox="0 0 33 13" class="h-[10px] w-[26px]" fill="none" aria-hidden="true">
                      <path d="M1 11c6-7 16-7 24-7" stroke="#7ad6b8" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 4" />
                      <path d="m23 1 5 3-5 3" fill="#2fb188" />
                    </svg>
                    {{ order.to }}
                  </p>
                  <!-- 运单编号：蓝色复制图标照源码 #1890ff -->
                  <p class="mt-[8px] flex items-center">
                    <span class="w-[56px] shrink-0 text-[10px] leading-[15px] text-black">运单编号：</span>
                    <svg viewBox="0 0 24 24" class="h-[11px] w-[11px] shrink-0" fill="none" aria-hidden="true">
                      <rect x="8" y="8" width="12" height="12" rx="2" stroke="#1890ff" stroke-width="1.8" />
                      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="#1890ff" stroke-width="1.8" />
                    </svg>
                    <span class="min-w-0 truncate text-[10px] leading-[15px] text-black">{{ order.orderNo }}</span>
                  </p>
                  <!-- 字段两列铺（源码 info-grid 1fr 1fr gap 10px） -->
                  <div class="mt-[6px] grid grid-cols-2 gap-x-[8px] gap-y-[5px]">
                    <p class="flex items-center overflow-hidden">
                      <span class="w-[56px] shrink-0 text-[10px] leading-[15px] text-black">货物类别：</span>
                      <span class="truncate text-[10px] leading-[15px] text-black">{{ order.category }}</span>
                    </p>
                    <p class="flex items-center overflow-hidden">
                      <span class="w-[56px] shrink-0 text-[10px] leading-[15px] text-black">货物总重：</span>
                      <span class="truncate text-[10px] leading-[15px] text-black">{{ order.weight }}</span>
                    </p>
                    <p class="flex items-center overflow-hidden">
                      <span class="w-[56px] shrink-0 text-[10px] leading-[15px] text-black">车辆类型：</span>
                      <span class="truncate text-[10px] leading-[15px] text-black">{{ order.vehicleType }}</span>
                    </p>
                    <p class="flex items-center overflow-hidden">
                      <span class="w-[56px] shrink-0 text-[10px] leading-[15px] text-black">运输里程：</span>
                      <span class="truncate text-[10px] leading-[15px] text-black">{{ order.mileage }}</span>
                    </p>
                  </div>
                  <p class="mt-[5px] flex items-center overflow-hidden">
                    <span class="w-[56px] shrink-0 text-[10px] leading-[15px] text-black">装货时间：</span>
                    <span class="truncate text-[10px] leading-[15px] text-black">{{ order.loadTime }}</span>
                  </p>
                </article>
              </div>
            </div>

            <!-- 中：车辆排班表 -->
            <div class="panel flex min-w-0 flex-1 flex-col overflow-hidden">
              <!-- 面板头：« 标题+全屏 » -->
              <div class="flex items-center px-[10px] pt-[8px]">
                <span class="text-[15px] leading-[20px] text-[#444]" aria-hidden="true">«</span>
                <span class="mx-auto flex items-center gap-[7px]">
                  <svg viewBox="0 0 24 24" class="h-[16px] w-[16px]" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" fill="#2fb188" />
                    <path d="M3 10h18" stroke="#fff" stroke-width="1.6" />
                    <path d="M8 2v5M16 2v5" stroke="#2fb188" stroke-width="2" stroke-linecap="round" />
                  </svg>
                  <span class="text-[15px] font-bold leading-[21px] text-black">{{ consoleData.board.title }}</span>
                  <svg viewBox="0 0 24 24" class="h-[13px] w-[13px]" fill="none" aria-hidden="true">
                    <path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4" stroke="#444" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                </span>
                <span class="text-[15px] leading-[20px] text-[#444]" aria-hidden="true">»</span>
              </div>

              <!-- 筛选两行：源码 search 自然宽度左对齐（gap 20px），下拉不拉伸；label 全部带冒号 -->
              <div class="mt-[4px] flex flex-wrap items-center gap-x-[10px] gap-y-[6px] px-[14px] pb-[6px]">
                <span class="fake-field">发货地：<span class="fake-select w-[68px]">请选择</span>省<span class="fake-select w-[68px]">请选择</span>市</span>
                <span class="fake-field">卸货地：<span class="fake-select w-[68px]">请选择</span>省<span class="fake-select w-[68px]">请选择</span>市</span>
                <span class="fake-field">经营范围：<span class="fake-select w-[108px]">请选择</span></span>
              </div>
              <div class="flex flex-nowrap items-center gap-[10px] px-[14px] pb-[4px]">
                <span class="fake-field">车辆类型：<span class="fake-select w-[108px]">请选择</span></span>
                <span class="fake-field">车牌：<span class="fake-input w-[108px]">请输入</span></span>
                <span class="fake-btn-solid">🔍 搜索</span>
                <span class="fake-btn-line">⟳ 重置</span>
              </div>

              <!-- 可拼单栏（源码 pagination）：图例方块 #73f2db + 绿字，中 Tag，右上一周/下一周 -->
              <div class="mx-[14px] mt-[2px] flex h-[38px] items-center border-b border-[#f0f0f0]">
                <span class="flex items-center gap-[6px]">
                  <span class="h-[13px] w-[13px] rounded-[3px] bg-[#73f2db]" aria-hidden="true" />
                  <span class="text-[13px] font-bold leading-[18px] text-[#2fc797]">可拼单 : {{ consoleData.board.pinCount }}</span>
                </span>
                <span
                  class="mx-auto flex items-center gap-[4px] rounded-[4px] border border-[#2fb188] bg-[#e6f7f3] px-[10px] py-[3px] text-[11px] font-semibold leading-[15px] text-[#2fb188]"
                >
                  {{ consoleData.board.routeFrom }}
                  <svg viewBox="0 0 33 13" class="h-[7px] w-[18px]" fill="none" aria-hidden="true">
                    <path d="M1 11c6-7 16-7 24-7" stroke="#7ad6b8" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 4" />
                    <path d="m23 1 5 3-5 3" fill="#2fb188" />
                  </svg>
                  {{ consoleData.board.routeTo }}
                </span>
                <span class="flex items-center rounded-[4px] border border-[#bacedb] py-[3px] text-[10px] leading-[14px] text-[#979797]">
                  <!-- 源码 btn-group 是 el-icon-arrow 实心折线箭头 -->
                  <span class="flex items-center gap-[3px] px-[8px]">上一周
                    <svg viewBox="0 0 24 24" class="h-[11px] w-[11px]" fill="#979797" aria-hidden="true">
                      <path d="M15 4 7 12l8 8 1.8-1.8L10.6 12l6.2-6.2z" />
                    </svg>
                  </span>
                  <span class="h-[10px] w-[2px] bg-[#cfcfcf]" aria-hidden="true" />
                  <span class="flex items-center gap-[3px] px-[8px]">
                    <svg viewBox="0 0 24 24" class="h-[11px] w-[11px]" fill="#979797" aria-hidden="true">
                      <path d="M9 4l8 8-8 8-1.8-1.8L13.4 12 7.2 5.8z" />
                    </svg>
                    下一周
                  </span>
                </span>
              </div>

              <!-- 排班网格：左列 168 + 7 天；表头行 auto、数据行 1fr 等分撑满面板 -->
              <div
                class="mt-[8px] grid flex-1 gap-[7px] px-[10px] pb-[10px]"
                :style="{
                  gridTemplateColumns: '168px repeat(7, minmax(0, 1fr))',
                  gridTemplateRows: `auto repeat(${consoleData.board.vehicles.length}, minmax(0, 1fr))`,
                }"
              >
                <!-- 表头：青色渐变加粗（源码 header-vehicle / header-date） -->
                <div class="cal-head font-bold">车辆信息</div>
                <div v-for="day in consoleData.board.days" :key="day" class="cal-head text-center font-bold">
                  {{ day }}
                </div>

                <template v-for="(vehicle, vi) in consoleData.board.vehicles" :key="vehicle.plate">
                  <!-- 车辆格：#e0fafa→#fff 渐变 + #e4ffff 边框；选中行 #c5ffff + 可拼单水印 -->
                  <div
                    class="relative flex flex-col justify-center overflow-hidden rounded-[8px] p-[10px_9px]"
                    :class="
                      vehicle.active
                        ? 'border border-[rgba(47,224,181,0.85)] bg-gradient-to-b from-[#c5ffff] to-white'
                        : 'border border-[#e4ffff] bg-gradient-to-b from-[#e0fafa] to-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                    "
                  >
                    <!-- 可拼单水印：源码 has-combine-watermark::before，22px 斜 -25° 半透明绿 -->
                    <span
                      v-if="vehicle.active"
                      class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[25deg] text-[17px] font-bold tracking-[2px] text-[rgba(49,202,154,0.55)]"
                      aria-hidden="true"
                    >
                      可拼单
                    </span>
                    <p class="relative flex items-center overflow-hidden">
                      <span class="cal-label">车牌</span>
                      <span class="cal-colon">：</span>
                      <span class="min-w-0 flex-1 truncate text-[10px] font-semibold leading-[15px] text-black">{{ vehicle.plate }}</span>
                    </p>
                    <p class="mt-[4px] flex items-center overflow-hidden">
                      <span class="cal-label">载重</span>
                      <span class="cal-colon">：</span>
                      <span class="truncate text-[10px] font-semibold leading-[15px] text-black">{{ vehicle.weight }}</span>
                    </p>
                    <p class="mt-[4px] flex items-center overflow-hidden">
                      <span class="cal-label">经营范围</span>
                      <span class="cal-colon">：</span>
                      <span class="min-w-0 flex-1 truncate text-[10px] font-semibold leading-[15px] text-black">{{ vehicle.scope }}</span>
                    </p>
                    <p class="mt-[7px] flex justify-end">
                      <span class="assign-btn">☝ 指派</span>
                    </p>
                  </div>

                  <!-- 七个日期格：空格白底 #bacedb 边框；有数据橙渐变 #fff1e8 + #ffc19d -->
                  <template v-for="(cell, di) in vehicle.cells" :key="`${vi}-${di}`">
                    <div v-if="cell" class="relative flex flex-col items-center justify-center gap-[3px] overflow-hidden rounded-[8px] border border-[#ffc19d] bg-gradient-to-b from-[#fffdfc] to-[#fff1e8] px-[4px] py-[6px] text-center">
                      <p class="flex w-full items-center justify-center gap-[2px]">
                        <svg viewBox="0 0 24 24" class="h-[9px] w-[9px] shrink-0" fill="none" aria-hidden="true">
                          <rect x="8" y="8" width="12" height="12" rx="2" stroke="#1890ff" stroke-width="2" />
                          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="#1890ff" stroke-width="2" />
                        </svg>
                        <span class="min-w-0 truncate text-[9px] font-semibold leading-[13px] text-black">{{ cell.orderNo }}</span>
                      </p>
                      <!-- 城市行照原型绿字 -->
                      <p class="flex w-full items-center justify-center gap-[2px] text-[9px] leading-[13px] text-[#2fb188]">
                        <span class="min-w-0 truncate">{{ cell.from }}</span>
                        <span class="shrink-0" aria-hidden="true">→</span>
                        <span class="min-w-0 truncate">{{ cell.to }}</span>
                      </p>
                      <p class="max-w-full truncate text-[9px] leading-[13px] text-[#6b8077]">{{ cell.cls }}</p>
                      <p class="text-[10px] font-bold leading-[14px] text-black">{{ cell.weight }}</p>
                      <!-- 底部翻页：源码 arrow 是 el-icon-caret 实心三角，左右贴边 -->
                      <p class="absolute inset-x-0 bottom-[3px] flex items-center justify-between px-[6px] text-[9px] leading-[12px] text-[#949494]">
                        <svg viewBox="0 0 24 24" class="h-[12px] w-[12px]" fill="#949494" aria-hidden="true">
                          <path d="M15.5 4.5 7 12l8.5 7.5z" />
                        </svg>
                        <span>{{ cell.frac }}</span>
                        <svg viewBox="0 0 24 24" class="h-[12px] w-[12px]" fill="#949494" aria-hidden="true">
                          <path d="M8.5 4.5 17 12l-8.5 7.5z" />
                        </svg>
                      </p>
                    </div>
                    <div v-else class="rounded-[8px] border border-[#bacedb] bg-white" aria-hidden="true" />
                  </template>
                </template>
              </div>
            </div>

            <!-- 右：空闲车辆 -->
            <div class="panel flex w-[240px] shrink-0 flex-col overflow-hidden">
              <div class="flex items-center gap-[8px] px-[14px] pb-[6px] pt-[12px]">
                <svg viewBox="0 0 24 24" class="h-[16px] w-[16px]" fill="none" aria-hidden="true">
                  <path d="M3 8h10v8H3z" fill="#2fb188" />
                  <path d="M13 10h5l3 3v3h-8z" fill="#7ad6b8" />
                  <circle cx="7" cy="17.5" r="1.8" fill="#2fb188" />
                  <circle cx="16.5" cy="17.5" r="1.8" fill="#2fb188" />
                </svg>
                <span class="text-[15px] font-bold leading-[21px] text-black">{{ consoleData.idle.title }}</span>
              </div>

              <!-- 筛选（源码 free-vehicle .search：label 55px + select 100px / input 82px），label 带冒号 -->
              <div class="mt-[2px] flex flex-col gap-[8px] px-[12px]">
                <div class="flex flex-nowrap items-center gap-[6px]">
                  <span class="shrink-0 text-[10px] leading-[15px] text-black">车辆类型：</span>
                  <span class="fake-select min-w-0 flex-1">请选择</span>
                  <span class="shrink-0 text-[10px] leading-[15px] text-black">前车牌：</span>
                  <span class="fake-input min-w-0 flex-1">请输入</span>
                </div>
                <div class="flex flex-nowrap items-center gap-[6px]">
                  <span class="shrink-0 text-[10px] leading-[15px] text-black">载重范围：</span>
                  <span class="fake-select min-w-0 flex-1">请选择</span>
                  <span class="fake-btn-solid shrink-0">🔍 搜索</span>
                  <span class="fake-btn-line shrink-0">⟳ 重置</span>
                </div>
                <span class="fake-select mt-[2px] w-[110px]">装货地优先</span>
              </div>

              <!-- 车卡：free-card 渐变 + #b1d6dc 阴影 -->
              <div
                v-for="card in consoleData.idle.cards"
                :key="card.plate"
                class="mx-[12px] mt-[14px] rounded-[8px] border border-[#e0fafa] bg-gradient-to-b from-[#e0fafa] to-white p-[12px] shadow-[0_2px_4px_#b1d6dc]"
              >
                <p class="flex items-center">
                  <span class="w-[52px] shrink-0 text-[11px] font-bold leading-[16px] text-black">车牌</span>
                  <span class="text-[11px] font-bold leading-[16px] text-black">：</span>
                  <span class="min-w-0 flex-1 truncate text-[11px] font-bold leading-[16px] text-black">{{ card.plate }}</span>
                  <span class="ml-auto flex shrink-0 items-center gap-[2px] text-[11px] font-bold leading-[16px] text-black">
                    <svg viewBox="0 0 24 24" class="h-[11px] w-[11px]" fill="none" aria-hidden="true">
                      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" fill="#2fb188" />
                      <circle cx="12" cy="10" r="2.2" fill="#fff" />
                    </svg>
                    {{ card.city }}
                  </span>
                </p>
                <p class="mt-[9px] flex items-center overflow-hidden">
                  <span class="w-[52px] shrink-0 text-[11px] leading-[16px] text-black">载&emsp;重</span>
                  <span class="text-[11px] leading-[16px] text-black">：</span>
                  <span class="truncate text-[11px] leading-[16px] text-black">{{ card.weight }}</span>
                </p>
                <p class="mt-[7px] flex items-center overflow-hidden">
                  <span class="w-[52px] shrink-0 text-[11px] leading-[16px] text-black">联系电话</span>
                  <span class="text-[11px] leading-[16px] text-black">：</span>
                  <span class="truncate text-[11px] leading-[16px] text-black">{{ card.phone }}</span>
                </p>
                <p class="mt-[7px] flex items-center overflow-hidden">
                  <span class="w-[52px] shrink-0 text-[11px] leading-[16px] text-black">经营范围</span>
                  <span class="text-[11px] leading-[16px] text-black">：</span>
                  <span class="truncate text-[11px] leading-[16px] text-black">{{ card.scope }}</span>
                </p>
                <p class="mt-[10px] flex justify-end">
                  <span class="assign-btn">☝ 指派</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 图下说明 -->
      <p class="reveal mt-[16px] text-[12px] leading-[20px] text-[#8aa094]" style="--d: 320ms">
        {{ consoleData.caption }}
      </p>
    </div>
  </section>
</template>

<style scoped>
/* 隐藏横向滚动条：手机端横滚能力保留，但视觉上不出条（桌面截图里露底条不好看） */
.hide-scrollbar {
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 面板底：三个面板共用源码里的 linear-gradient(to bottom,#f0fdff,#fff) + 白边 + 绿色淡阴影 */
.panel {
  border: 1px solid #ffffff;
  border-radius: 10px;
  background: linear-gradient(to bottom, #f0fdff, #ffffff);
  box-shadow: 0 4px 12px rgba(47, 177, 136, 0.1);
}

/* 车辆格/表头格的 label：源码 title 定宽 + text-align-last 两端对齐撑开「车 牌」间距，宽度收窄到 46px */
.cal-label {
  width: 46px;
  flex-shrink: 0;
  text-align: justify;
  text-align-last: justify;
  font-size: 10px;
  line-height: 15px;
  color: #000;
}

/* justify 拉开后的冒号：源码 title + 独立「：」span，冒号不参与两端对齐 */
.cal-colon {
  flex-shrink: 0;
  margin-right: 3px;
  font-size: 10px;
  line-height: 15px;
  color: #000;
}

/* 表头格：源码 header-vehicle / header-date 的青色渐变 */
.cal-head {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  border-radius: 8px;
  background: linear-gradient(180deg, #e0fafa 0%, #ffffff 100%);
  font-size: 11px;
  color: #000;
}

/* 指派按钮：源码 .assign-btn #2fb188 圆角 15px padding 5px 16px */
.assign-btn {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  border-radius: 15px;
  background: #2fb188;
  padding: 4px 13px;
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
  color: #fff;
}

/* 假筛选框/输入框/按钮：源码是 el-select mini（高 25px 上下），这里按演示窗口比例缩到 22px */
.fake-select {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e3ebe6;
  border-radius: 5px;
  background: #fff;
  padding: 3px 7px;
  font-size: 10px;
  line-height: 14px;
  color: #a8b8af;
  white-space: nowrap;
}

.fake-select::after {
  content: '▾';
  margin-left: 5px;
  color: #b9c8bf;
}

.fake-input {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e3ebe6;
  border-radius: 5px;
  background: #fff;
  padding: 3px 7px;
  font-size: 10px;
  line-height: 14px;
  color: #a8b8af;
  white-space: nowrap;
}

/* 搜索/重置按钮：源码 btn1 #2fb188 白字、btn2 白底绿字绿边，圆角 10px */
.fake-btn-solid {
  display: inline-flex;
  align-items: center;
  border-radius: 10px;
  background: #2fb188;
  padding: 3px 10px;
  font-size: 10px;
  line-height: 14px;
  color: #fff;
}

.fake-btn-line {
  display: inline-flex;
  align-items: center;
  border: 1px solid #2fb188;
  border-radius: 10px;
  padding: 3px 10px;
  font-size: 10px;
  line-height: 14px;
  color: #2fb188;
  background: #fff;
}

/* 字段行：label 和控件的组合行 */
.fake-field {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  line-height: 14px;
  color: #000;
  white-space: nowrap;
}
</style>
