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
 * 三张能力卡 + 调度台演示窗口。窗口整窗 DOM 重建（原参考图 调度台截图区.png 已删），
 * 打码字段照原型画成灰色色块。窗口内容约 1060px 起，手机端套 overflow-x-auto 横滚，
 * 左栏运单卡超出高度自然被裁掉——原型里第五张卡就是被底边裁的，照做。
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

      <!-- 调度台窗口：手机横滚，桌面铺满容器 -->
      <div class="reveal mt-[48px] overflow-x-auto pb-[4px]" style="--d: 240ms">
        <div
          class="min-w-[1060px] overflow-hidden rounded-[16px] bg-[#f3f7f4] shadow-[0_28px_70px_-30px_rgba(19,50,42,0.35)] ring-1 ring-black/5"
        >
          <!-- 窗口顶栏 -->
          <div class="flex items-center gap-[10px] border-b border-[#e6ece8] bg-white px-[18px] py-[10px]">
            <span class="flex gap-[5px]" aria-hidden="true">
              <span class="h-[8px] w-[8px] rounded-full bg-[#dfe6e2]" />
              <span class="h-[8px] w-[8px] rounded-full bg-[#dfe6e2]" />
              <span class="h-[8px] w-[8px] rounded-full bg-[#dfe6e2]" />
            </span>
            <span class="ml-[6px] text-[12px] font-bold leading-[17px] text-[#13322a]">{{ consoleData.title }}</span>
            <span class="ml-auto text-[11px] leading-[16px] text-[#8aa094]">{{ consoleData.time }}</span>
          </div>

          <!-- 三面板 -->
          <div class="grid items-stretch gap-[12px] p-[12px] lg:grid-cols-[248px_1fr_236px]">
            <!-- 左：待调度运单。h-0 + min-h-full 让它不把窗口撑高（高度由中栏网格定），
                 超出的第五张卡照原型被底边裁掉 -->
            <div class="flex h-0 min-h-full flex-col overflow-hidden rounded-[10px] bg-white p-[12px]">
              <div class="flex items-center gap-[8px]">
                <span class="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[#e2f3ea]">
                  <svg viewBox="0 0 24 24" class="h-[11px] w-[11px]" fill="none" aria-hidden="true">
                    <path d="M5 5h14v3H5zM5 11h14v3H5zM5 17h9v3H5z" fill="#1c8a66" />
                  </svg>
                </span>
                <span class="text-[13px] font-bold leading-[18px] text-[#13322a]">{{ consoleData.orders.title }}</span>
              </div>

              <div class="mt-[10px] flex flex-col gap-[10px]">
                <article
                  v-for="order in consoleData.orders.cards"
                  :key="`${order.from}-${order.to}`"
                  class="relative rounded-[10px] p-[12px]"
                  :class="
                    order.active
                      ? 'border border-[#2fae85] bg-gradient-to-b from-[#f0faf5] to-[#e4f4ec] shadow-[0_6px_16px_-6px_rgba(47,174,133,0.45)]'
                      : 'border border-[#e2f0e8] bg-[#f4faf7]'
                  "
                >
                  <!-- 高亮卡右上角的绿色小圆标（参考图里有） -->
                  <span
                    v-if="order.active"
                    class="absolute right-[10px] top-[10px] flex h-[13px] w-[13px] items-center justify-center rounded-full bg-[#2fae85] text-[8px] font-bold leading-none text-white"
                    aria-hidden="true"
                  >
                    ?
                  </span>
                  <!-- 路线头：起点 → 终点，中间绿色箭头 -->
                  <p class="flex items-center justify-center gap-[8px] text-[14px] font-bold leading-[20px] text-[#13322a]">
                    {{ order.from }}
                    <svg viewBox="0 0 24 24" class="h-[12px] w-[12px]" fill="none" aria-hidden="true">
                      <path d="M4 12h14m-5-5 5 5-5 5" stroke="#2fae85" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    {{ order.to }}
                  </p>
                  <!-- 字段两列铺，编号/装货时间独占一行 -->
                  <div class="mt-[8px] grid grid-cols-[auto_1fr] gap-x-[14px] gap-y-[4px]">
                    <template v-for="field in order.fields" :key="field.label">
                      <span class="shrink-0 text-[10px] leading-[16px] text-[#7d948a]">{{ field.label }}：</span>
                      <span v-if="field.mask" class="h-[11px] w-[90px] self-center rounded-[3px] bg-[#d8dfd9]" aria-hidden="true" />
                      <span v-else class="text-[11px] font-semibold leading-[16px] text-[#13322a]">{{ field.value }}</span>
                    </template>
                  </div>
                </article>
              </div>
            </div>

            <!-- 中：车辆排班表 -->
            <div class="flex min-w-0 flex-col rounded-[10px] bg-white p-[12px]">
              <!-- 面板头：双箭头 + 标题 + 设置 -->
              <div class="flex items-center">
                <span class="text-[13px] leading-[18px] text-[#9ab0a5]" aria-hidden="true">«</span>
                <span class="mx-auto flex items-center gap-[8px]">
                  <span class="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[#e2f3ea]">
                    <svg viewBox="0 0 24 24" class="h-[11px] w-[11px]" fill="none" aria-hidden="true">
                      <rect x="4" y="5" width="16" height="15" rx="2" fill="#1c8a66" />
                      <path d="M4 10h16" stroke="#fff" stroke-width="1.6" />
                    </svg>
                  </span>
                  <span class="text-[13px] font-bold leading-[18px] text-[#13322a]">{{ consoleData.board.title }}</span>
                  <span class="text-[12px] leading-[16px] text-[#9ab0a5]" aria-hidden="true">⚙</span>
                </span>
                <span class="text-[13px] leading-[18px] text-[#9ab0a5]" aria-hidden="true">»</span>
              </div>

              <!-- 筛选两行：控件的宽度按参考图收窄，保证一行放得下 -->
              <div class="mt-[10px] flex flex-nowrap items-center gap-x-[8px] gap-y-[6px]">
                <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">发货地</span>
                <span class="fake-select w-[64px]">请选择</span>
                <span class="fake-select w-[34px]">省</span>
                <span class="fake-select w-[64px]">请选择</span>
                <span class="fake-select w-[34px]">市</span>
                <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">卸货地</span>
                <span class="fake-select w-[64px]">请选择</span>
                <span class="fake-select w-[34px]">省</span>
                <span class="fake-select w-[64px]">请选择</span>
                <span class="fake-select w-[34px]">市</span>
                <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">经营范围</span>
                <span class="fake-select w-[96px]">请选择</span>
              </div>
              <div class="mt-[6px] flex flex-nowrap items-center gap-[8px]">
                <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">车辆类型</span>
                <span class="fake-select w-[96px]">请选择</span>
                <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">车牌</span>
                <span class="fake-select w-[96px]">请输入</span>
                <span class="fake-btn-solid">🔍 搜索</span>
                <span class="fake-btn-line">⟳ 重置</span>
              </div>

              <!-- 可排单 + 分页 -->
              <div class="mt-[10px] flex items-center">
                <span class="flex items-center gap-[6px] text-[11px] font-bold leading-[16px] text-[#1c8a66]">
                  <svg viewBox="0 0 24 24" class="h-[13px] w-[13px]" fill="none" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="4" fill="#2fae85" />
                    <path d="m9 12 2.2 2.2L15.5 10" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  可排单: 1 辆
                </span>
                <span class="ml-auto flex items-center gap-[6px] text-[10px] leading-[14px] text-[#8aa094]">
                  <span class="rounded-[5px] border border-[#2fae85] bg-[#e9f6f0] px-[10px] py-[3px] text-[11px] font-semibold text-[#1c8a66]">
                    苏州市 → 合肥市
                  </span>
                  上一页
                  <span class="rounded-[4px] border border-[#e3ebe6] px-[7px] py-[2px] text-[#5e7169]">‹ 1 ›</span>
                  下一页
                </span>
              </div>

              <!-- 排班网格：8 列（车辆信息 + 7 天）；表头行 auto、数据行 1fr 等分
                   撑满面板高（左栏运单更高时网格跟着填满，不留白） -->
              <div
                class="mt-[10px] grid flex-1 grid-cols-[minmax(150px,auto)_repeat(7,1fr)] gap-[6px]"
                :style="{ gridTemplateRows: `auto repeat(${consoleData.board.vehicles.length}, minmax(0, 1fr))` }"
              >
                <!-- 表头 -->
                <div class="flex items-center justify-center rounded-[8px] border border-[#e3ebe6] bg-white px-[8px] py-[8px] text-[11px] font-bold text-[#13322a]">
                  车辆信息
                </div>
                <div
                  v-for="day in consoleData.board.days"
                  :key="day"
                  class="rounded-[8px] border border-[#e3ebe6] bg-white py-[8px] text-center text-[11px] font-bold text-[#13322a]"
                >
                  {{ day }}
                </div>

                <!-- 四行车辆 -->
                <template v-for="(vehicle, vi) in consoleData.board.vehicles" :key="vi">
                  <div
                    class="rounded-[8px] p-[8px]"
                    :class="
                      vehicle.active
                        ? 'bg-gradient-to-b from-[#e3f5ec] to-[#d4eee2] shadow-[0_0_0_2px_rgba(47,174,133,0.55)]'
                        : 'border border-[#dcefe5] bg-[#f1f9f5]'
                    "
                  >
                    <p class="flex items-center gap-[6px]">
                      <span class="text-[10px] leading-[15px] text-[#5e7169]">车&emsp;牌：</span>
                      <span class="h-[10px] w-[52px] rounded-[3px] bg-[#cfded4]" aria-hidden="true" />
                      <svg viewBox="0 0 24 24" class="ml-auto h-[12px] w-[12px]" fill="none" aria-hidden="true">
                        <path d="M4 11 8 7h8l4 4v6H4z" stroke="#2fae85" stroke-width="1.8" stroke-linejoin="round" />
                      </svg>
                    </p>
                    <p class="mt-[3px] text-[10px] leading-[15px] text-[#5e7169]">载&emsp;重：{{ vehicle.weight }}</p>
                    <p class="mt-[3px] truncate text-[10px] leading-[15px] text-[#5e7169]">经营范围：{{ vehicle.scope }}</p>
                    <p class="mt-[6px] flex justify-end">
                      <span class="flex items-center gap-[3px] rounded-full bg-[#2fae85] px-[10px] py-[3px] text-[10px] font-semibold leading-[14px] text-white">
                        <svg viewBox="0 0 24 24" class="h-[9px] w-[9px]" fill="none" aria-hidden="true">
                          <path d="M3 7h9v8H3zM12 10h5l3 3v2h-8z" stroke="#fff" stroke-width="1.8" stroke-linejoin="round" />
                        </svg>
                        占用
                      </span>
                    </p>
                  </div>

                  <!-- 七个日期格：cells 里有数据的画橙底卡，没数据的空格 -->
                  <template v-for="(day, di) in consoleData.board.days" :key="`${vi}-${day}`">
                    <div
                      v-if="vehicle.cells.some((cell) => cell.day === di)"
                      class="flex flex-col items-center justify-center gap-[2px] rounded-[8px] border border-[#f2d8bf] bg-[#fdf2ea] px-[4px] py-[6px] text-center"
                    >
                      <p class="w-full truncate text-[10px] font-semibold leading-[14px] text-[#b65a20]">
                        {{ vehicle.cells.find((cell) => cell.day === di)!.route }}
                      </p>
                      <p class="text-[10px] leading-[14px] text-[#c98a5e]">
                        {{ vehicle.cells.find((cell) => cell.day === di)!.cls }}
                      </p>
                      <p class="text-[11px] font-bold leading-[15px] text-[#b65a20]">
                        {{ vehicle.cells.find((cell) => cell.day === di)!.weight }}
                      </p>
                      <p class="mt-[2px] text-[9px] leading-[12px] text-[#c9b8a8]">
                        ‹ {{ vehicle.cells.find((cell) => cell.day === di)!.frac }} ›
                      </p>
                    </div>
                    <div v-else class="h-full min-h-[84px] rounded-[8px] border border-[#e6ece8] bg-white" aria-hidden="true" />
                  </template>
                </template>
              </div>
            </div>

            <!-- 右：空闲车辆 -->
            <div class="flex min-w-0 flex-col rounded-[10px] bg-white p-[12px]">
              <div class="flex items-center gap-[8px]">
                <span class="flex h-[18px] w-[18px] items-center justify-center rounded-[5px] bg-[#e2f3ea]">
                  <svg viewBox="0 0 24 24" class="h-[11px] w-[11px]" fill="none" aria-hidden="true">
                    <path d="M3 8h10v8H3zM13 11h5l3 3v2h-8z" stroke="#1c8a66" stroke-width="1.8" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="text-[13px] font-bold leading-[18px] text-[#13322a]">{{ consoleData.idle.title }}</span>
              </div>

              <!-- 筛选：一行一排布，标签不缩、输入框挤弹性宽 -->
              <div class="mt-[10px] flex flex-col gap-[6px]">
                <div class="flex flex-nowrap items-center gap-[5px]">
                  <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">车辆类型</span>
                  <span class="fake-select min-w-0 flex-1">请选择</span>
                  <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">前车牌</span>
                  <span class="fake-select min-w-0 flex-1">请输入</span>
                </div>
                <div class="flex flex-nowrap items-center gap-[5px]">
                  <span class="shrink-0 text-[10px] leading-[14px] text-[#5e7169]">载重范围</span>
                  <span class="fake-select min-w-0 flex-1">请选择</span>
                  <span class="fake-btn-solid shrink-0">🔍 搜索</span>
                  <span class="fake-btn-line shrink-0">⟳ 重置</span>
                </div>
                <span class="fake-select mt-[4px] w-[62%]">装货地优先</span>
              </div>

              <!-- 车卡 -->
              <div class="mt-[12px] rounded-[10px] border border-[#e2f0e8] bg-gradient-to-b from-[#f2faf6] to-[#e6f4ed] p-[12px]">
                <p class="flex items-center gap-[6px]">
                  <span class="text-[11px] font-semibold leading-[16px] text-[#5e7169]">车&emsp;牌</span>
                  <span class="h-[11px] w-[84px] rounded-[3px] bg-[#d8dfd9]" aria-hidden="true" />
                  <span class="ml-auto flex items-center gap-[3px] text-[11px] font-bold leading-[16px] text-[#13322a]">
                    <svg viewBox="0 0 24 24" class="h-[11px] w-[11px]" fill="none" aria-hidden="true">
                      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" fill="#2fae85" />
                      <circle cx="12" cy="10" r="2.4" fill="#fff" />
                    </svg>
                    {{ consoleData.idle.city }}
                  </span>
                </p>
                <p class="mt-[8px] text-[11px] font-semibold leading-[17px] text-[#13322a]">
                  <span class="text-[#5e7169]">载&emsp;重：</span>{{ consoleData.idle.weight }}
                </p>
                <p class="mt-[6px] flex items-center gap-[6px]">
                  <span class="text-[11px] font-semibold leading-[16px] text-[#5e7169]">司&emsp;机</span>
                  <span class="h-[11px] w-[90px] rounded-[3px] bg-[#d8dfd9]" aria-hidden="true" />
                </p>
                <p class="mt-[6px] flex items-center gap-[6px]">
                  <span class="text-[11px] font-semibold leading-[16px] text-[#5e7169]">联系电话</span>
                  <span class="h-[11px] w-[76px] rounded-[3px] bg-[#d8dfd9]" aria-hidden="true" />
                </p>
                <p class="mt-[6px] text-[11px] font-semibold leading-[17px] text-[#13322a]">
                  <span class="text-[#5e7169]">经营范围：</span>{{ consoleData.idle.scope }}
                </p>
                <p class="mt-[10px] flex justify-end">
                  <span class="flex items-center gap-[4px] rounded-full bg-[#2fae85] px-[12px] py-[4px] text-[11px] font-semibold leading-[15px] text-white">
                    <svg viewBox="0 0 24 24" class="h-[10px] w-[10px]" fill="none" aria-hidden="true">
                      <path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11l5.2 1.4a2 2 0 0 1 1.5 2.2l-.6 3.4a2 2 0 0 1-2 1.7H10l-4-4" stroke="#fff" stroke-width="1.6" stroke-linejoin="round" />
                    </svg>
                    指派
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 图下说明（原型烘焙在图里，这里走 DOM） -->
      <p class="reveal mt-[16px] text-[12px] leading-[20px] text-[#8aa094]" style="--d: 320ms">
        {{ consoleData.caption }}
      </p>
    </div>
  </section>
</template>

<style scoped>
/* 假筛选框/假按钮：窗口里的纯装饰控件，用类复用三处面板。
   real 表单以后真做的时候再换组件，这里只求跟原型像素对齐 */
.fake-select {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e3ebe6;
  border-radius: 6px;
  background: #fff;
  padding: 3px 7px;
  font-size: 10px;
  line-height: 14px;
  color: #9ab0a5;
  white-space: nowrap;
}

.fake-select::after {
  content: '▾';
  margin-left: 6px;
  color: #b9c8bf;
}

.fake-btn-solid {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  background: #2fae85;
  padding: 4px 12px;
  font-size: 10px;
  line-height: 14px;
  font-weight: 600;
  color: #fff;
}

.fake-btn-line {
  display: inline-flex;
  align-items: center;
  border: 1px solid #2fae85;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 10px;
  line-height: 14px;
  font-weight: 600;
  color: #1c8a66;
  background: #fff;
}
</style>
