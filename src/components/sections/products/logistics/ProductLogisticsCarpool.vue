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

const { carpool } = siteConfig.logistics

// 圆点弹出节奏：线 420ms 起画（0.75s 画完），每站间隔 130ms 差不多贴着线头走
const DOT_BASE = 480
const DOT_STEP = 130

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：深绿纵向渐变 #0d1c17→#12211a，上下留白各 96px -->
  <section ref="root" class="bg-gradient-to-b from-[#0d1c17] to-[#12211a] pb-[96px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、深底上仍用品牌橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ carpool.eyebrow }}
      </p>
      <!-- 标题：mt-[20px] 与眉题间距 20px；32px/42px 加粗纯白 -->
      <h2
        class="reveal mt-[20px] text-[32px] font-bold leading-[42px] text-white"
        style="--d: 80ms"
      >
        {{ carpool.title }}
      </h2>
      <!-- 说明：mt-[14px] 与标题间距 14px，max-w 760px；14px/24px 浅灰绿 -->
      <p
        class="reveal mt-[14px] max-w-[760px] text-[14px] leading-[24px] text-[#bacec5]"
        style="--d: 160ms"
      >
        {{ carpool.desc }}
      </p>

      <!-- 两栏：mt-[56px] 与说明间距 56px；手机单列 gap 36px，lg 起 4:7、列距 64px -->
      <div
        class="reveal mt-[56px] grid items-center gap-[36px] lg:grid-cols-[4fr_7fr] lg:gap-[64px]"
        style="--d: 240ms"
      >
        <!-- 左列：橙色小标签 + 说明段 -->
        <div>
          <!-- 小标签：深橙底 #3f2313 + 浅橙字 #f2a25c，rounded 10px、px 18 / py 8，外圈半透明橙描边 -->
          <span
            class="inline-block rounded-[10px] bg-[#3f2313] px-[18px] py-[8px] text-[14px] font-bold leading-[20px] text-[#f2a25c] ring-1 ring-[#8a4f26]/50"
          >
            {{ carpool.tag }}
          </span>
          <!-- 说明段：mt-[22px] 与标签间距 22px；14px/26px 浅灰绿 -->
          <p class="mt-[22px] text-[14px] leading-[26px] text-[#bacec5]">{{ carpool.detail }}</p>
        </div>

        <!-- 右列：拼车方案卡，min-w 760px 保证六列不挤，窄屏靠这层 overflow-x-auto 横滚 -->
        <div class="overflow-x-auto pb-[6px]">
          <div
            class="min-w-[760px] rounded-[16px] bg-white p-[28px] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.55)]"
          >
            <!-- 卡头：方案名 + 起终点 + 绿徽标 + 汇总，横排换行 gap-x 14px；300ms 前先淡入 -->
            <div
              class="carpool-head flex flex-wrap items-center gap-x-[14px] gap-y-[8px]"
              style="--d: 320ms"
            >
              <span class="text-[16px] font-bold text-[#13322a]">{{ carpool.card.plan }}</span>
              <span class="text-[15px] font-bold text-[#13322a]">
                {{ carpool.card.from }} → {{ carpool.card.to }}
              </span>
              <!-- 徽标：浅绿底 #eaf7f0 + 深绿字，rounded 6px、px 9 / py 3 -->
              <span
                class="rounded-[6px] bg-[#eaf7f0] px-[9px] py-[3px] text-[12px] font-medium leading-[17px] text-[#3d8f74]"
              >
                {{ carpool.card.badge }}
              </span>
              <span class="text-[13px] text-[#8aa094]">{{ carpool.card.summary }}</span>
            </div>

            <!-- 时间轴：mt-[28px] 与卡头间距 28px；城市 / 事件 / 圆点 / 货物四行都用同一个六列 grid 对齐 -->
            <div class="mt-[28px]">
              <div class="grid grid-cols-6">
                <p
                  v-for="(stop, i) in carpool.card.stops"
                  :key="`city-${stop.city}`"
                  class="carpool-cell text-center text-[15px] font-bold leading-[22px] text-[#13322a]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 40}ms` }"
                >
                  {{ stop.city }}
                </p>
              </div>
              <div class="mt-[6px] grid grid-cols-6">
                <p
                  v-for="(stop, i) in carpool.card.stops"
                  :key="`event-${stop.city}`"
                  class="carpool-cell flex h-[34px] items-start justify-center text-center text-[11px] leading-[16px] text-[#8aa094]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 80}ms` }"
                >
                  {{ stop.event }}
                </p>
              </div>
              <!-- 圆点行：mt-[6px] 与事件行间距 6px；连线 absolute 压底，首尾各缩进半列（1/12 ≈ 8.33%） -->
              <div class="relative mt-[6px] grid grid-cols-6">
                <span
                  class="carpool-line absolute left-[8.33%] right-[8.33%] top-1/2 h-[2px] -translate-y-1/2 bg-[#f6c9a6]"
                  aria-hidden="true"
                />
                <!-- 光点：白点橙描边沿线滑行。track 同层 100% 宽、位移用自身宽度百分比（0→100%），
                     跟线实际宽度无关；外壳 overflow-hidden 裁掉滑出线两端的部分，z 夹在线和圆点（z-10）之间 -->
                <div
                  class="pointer-events-none absolute left-[8.33%] right-[8.33%] top-1/2 z-[5] h-[19px] -translate-y-1/2 overflow-hidden"
                  aria-hidden="true"
                >
                  <div class="carpool-bead-track relative h-full w-full">
                    <!-- 9px 白点 + 1.5px 橙描边：别用模糊辉光，2px 细线旁一团糊光就是污渍 -->
                    <span
                      class="carpool-bead absolute left-0 top-1/2 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgba(19,50,42,0.22)] ring-[1.5px] ring-[#f5823c]"
                    />
                  </div>
                </div>
                <!-- 站点圆点：13px 橙点 + 3px 白圈，逐站回弹弹出 -->
                <span
                  v-for="(stop, i) in carpool.card.stops"
                  :key="`dot-${stop.city}`"
                  class="relative z-10 flex justify-center"
                >
                  <span
                    class="carpool-dot h-[13px] w-[13px] rounded-full bg-[#f5823c] ring-[3px] ring-white"
                    :style="{ '--d': `${DOT_BASE + i * DOT_STEP}ms` }"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <!-- 货物行：mt-[10px] 与圆点行间距 10px；12px/18px 灰绿
                   （下面紧跟的货物行同理，跟圆点错 120ms 浮现） -->
              <div class="mt-[10px] grid grid-cols-6">
                <p
                  v-for="(stop, i) in carpool.card.stops"
                  :key="`cargo-${stop.city}`"
                  class="carpool-cell text-center text-[12px] leading-[18px] text-[#5e7169]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 120}ms` }"
                >
                  {{ stop.cargo }}
                </p>
              </div>
            </div>

            <!-- 底部橙条：mt-[24px] 与时间轴间距 24px；浅橙底 #fff4ec，引子加粗 + 路线 13px，1450ms 回弹落定 -->
            <div
              class="carpool-strip mt-[24px] flex flex-wrap items-center gap-x-[16px] rounded-[10px] bg-[#fff4ec] px-[20px] py-[12px]"
            >
              <span class="text-[14px] font-bold leading-[20px] text-[#b65a20]">{{
                carpool.card.stripLead
              }}</span>
              <span class="text-[13px] leading-[20px] text-[#c4703a]">{{
                carpool.card.stripRoute
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carpool-head,
.carpool-cell {
  opacity: 0;
  transform: translateY(-6px);
}

.in .carpool-head,
.in .carpool-cell {
  animation: carpool-fade 220ms ease var(--d, 0ms) both;
}

@keyframes carpool-fade {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.carpool-line {
  transform: scaleX(0);
  transform-origin: left center;
}

.in .carpool-line {
  animation: carpool-draw 750ms cubic-bezier(0.22, 1, 0.36, 1) 420ms both;
}

@keyframes carpool-draw {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.carpool-dot {
  transform: scale(0);
}

.in .carpool-dot {
  animation: carpool-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms) both;
}

@keyframes carpool-pop {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.carpool-strip {
  opacity: 0;
}

.in .carpool-strip {
  animation: carpool-strip-in 500ms cubic-bezier(0.34, 1.56, 0.64, 1) 1450ms both;
}

@keyframes carpool-strip-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.carpool-bead-track {
  animation: carpool-slide 7s linear infinite;
  animation-delay: 2s;
  animation-fill-mode: backwards;
  animation-play-state: paused;
}

.in .carpool-bead-track {
  animation-play-state: running;
}

@keyframes carpool-slide {
  0% {
    transform: translateX(0);
  }
  46%,
  100% {
    transform: translateX(100%);
  }
}

.carpool-bead {
  animation: carpool-bead-fade 7s ease-in-out infinite;
  animation-delay: 2s;
  animation-fill-mode: backwards;
  animation-play-state: paused;
}

.in .carpool-bead {
  animation-play-state: running;
}

@keyframes carpool-bead-fade {
  0% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  43% {
    opacity: 1;
  }
  46%,
  100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carpool-bead-track,
  .carpool-bead {
    animation: none;
  }

  .carpool-bead {
    opacity: 0;
  }
}
</style>
