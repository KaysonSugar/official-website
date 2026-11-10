<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 服务支持第三屏：实施流程
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 第三屏：七个节点，从需求调研到转入维保（原型 S2）。
 * 桌面端一条灰绿到绿的横轴，单数卡挂上方、双数挂下方，07 是深绿卡，轴末右下角一个「验收之后」浅绿盒；
 * lg 以下退化为竖向时间线：点在左、卡在右，顺序不变。
 * 轴上的橙 #f5821f 比品牌橙深一档，照原型采的色，别混用。
 *
 * 动效只动 transform / opacity：轴用 clip-path 揭显（scaleX 会把渐变压扁再弹开，看着脏）；
 * 光点做成 9px 小白点——3px 细轴上拉宽光带会糊成一团，还把轴「啃断」。
 */
const { process } = siteConfig.support

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 深绿卡和白卡的底色别写在一起：bg-white 和 bg-[#13322a] 同时挂上去，生效哪个看样式表顺序，
// 不可靠，所以底色整个走三目
const cardBg = (dark?: boolean) => (dark ? 'bg-[#13322a]' : 'bg-white')

// 进场节奏：轴线 240ms 起画、1s 画完；圆点 280ms 起跟着线头逐站弹出，每站 +160ms。
// 卡片和竖线再比同列圆点晚 100ms 升起
const DOT_BASE = 280
const DOT_STEP = 160

// 圆点点亮时刻：光点 7s 一轮里 3.2s 走完整根轴，7 个点从 7% 到 93% 均匀分布，
// 换算成毫秒各减 210ms（keyframes 3% 处才最亮）；整体再 +1500ms 给进场序列让路，
// 不然信号珠跑在一根还没画出来的线上。数值是对着轴宽调出来的，改光点速度要一起看
const dotWave = [1500, 1950, 2450, 2900, 3350, 3800, 4250]
</script>

<template>
  <!-- 区块：浅灰绿底，跟前后两屏的白底隔开层次；上下留白各 96px -->
  <section ref="root" class="bg-[#f4f8f5] py-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ process.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ process.title }}
      </h2>

      <!-- 说明：mt-[24px] 与标题间距 24px，max-w 820px 一行不超 820px；14px/24px、ink-600 -->
      <p
        class="reveal mt-[24px] max-w-[820px] text-[14px] leading-[24px] text-ink-600"
        style="--d: 160ms"
      >
        {{ process.desc }}
      </p>

      <!-- 桌面端（lg 起）：横向交错时间轴，mt-[56px] 与说明间距 56px -->
      <div class="relative mt-[56px] hidden lg:block">
        <!-- 横轴：top-[153px] 落在圆点中线上、h-[3px] 全圆角、左右贴满容器；
             左灰右绿渐变在 55% 处过渡，z-0 压在圆点下面 -->
        <div
          class="proc-axis absolute left-0 right-0 top-[153px] z-0 h-[3px] rounded-full bg-gradient-to-r from-[#dfe0d4] via-[#c4e4d5] via-55% to-[#2fb188]"
          aria-hidden="true"
        />
        <!-- 光点轨道：top-[145px] 跟轴同层、19px 高的小窗口，overflow-hidden 把点裁在轴附近 -->
        <div
          class="pointer-events-none absolute left-0 right-0 top-[145px] z-0 h-[19px] overflow-hidden"
          aria-hidden="true"
        >
          <!-- 轨道内层：track 管位移（自身宽度 0→100%），bead 只管显隐，拆两层各用各的曲线 -->
          <div class="proc-track relative h-full w-full">
            <!-- 光点：9×9 白底 + 1.5px 绿描边，left-1/2 与 -translate-x-1/2 把点对准轴头 -->
            <span
              class="proc-bead absolute left-0 top-1/2 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgba(19,50,42,0.22)] ring-[1.5px] ring-[#2fb188]"
            />
          </div>
        </div>

        <!-- 轴末箭头：16×15 三角贴右端 -14px，只敢伸这么多，再往外 lg 临界宽度会出横向滚动条 -->
        <svg
          class="proc-arrow absolute right-[-14px] top-[147px] z-0 h-[15px] w-[16px]"
          viewBox="0 0 16 15"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 7.5h11M11 7.5 6.8 2.4M11 7.5l-4.2 5.1"
            stroke="#2fb188"
            stroke-width="2.4"
            stroke-linecap="round"
          />
        </svg>

        <!-- 七列栅格：gap 14px，每列 = 上槽卡 + 圆点 + 下槽卡；items-center 让圆点落在列中线上 -->
        <div class="grid grid-cols-7 gap-[14px]">
          <div v-for="(step, i) in process.steps" :key="step.no" class="flex flex-col items-center">
            <!-- 上槽：固定 140px 高、justify-end 让卡贴住轴线，空槽也占高保持上下对称 -->
            <div class="flex h-[140px] w-full flex-col items-center justify-end">
              <template v-if="i % 2 === 0">
                <!-- 单数节点的卡：rounded 14px、内边距 16px，比同列圆点晚 100ms 升起 -->
                <article
                  class="reveal w-full rounded-[14px] p-[16px]"
                  :class="cardBg(step.dark)"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 100}ms` }"
                >
                  <!-- 序号：14px/18px 加粗、字距 0.04em；深绿卡用绿字，白卡用深橙字 -->
                  <p
                    class="text-[14px] font-bold leading-[18px] tracking-[0.04em]"
                    :class="step.dark ? 'text-[#2fb188]' : 'text-[#f5821f]'"
                  >
                    {{ step.no }}
                  </p>
                  <!-- 节点标题：mt-[8px] 与序号间距 8px；16px/22px 加粗 -->
                  <h3
                    class="mt-[8px] text-[16px] font-bold leading-[22px]"
                    :class="step.dark ? 'text-white' : 'text-ink-900'"
                  >
                    {{ step.title }}
                  </h3>
                  <!-- 节点说明：mt-[6px] 与标题间距 6px；13px/19px，深绿卡用灰绿字 -->
                  <p
                    class="mt-[6px] text-[13px] leading-[19px]"
                    :class="step.dark ? 'text-[#9db2a9]' : 'text-[#7a8a82]'"
                  >
                    {{ step.desc }}
                  </p>
                </article>
                <!-- 连接短线：卡底到圆点，14px 长 1px 宽，跟卡片同拍淡入 -->
                <span
                  class="proc-link h-[14px] w-px shrink-0 bg-[#d2e1d7]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 100}ms` }"
                  aria-hidden="true"
                />
              </template>
            </div>

            <!-- 圆点：28×28，01-06 白底橙字、07 深绿底白字，白底把轴线盖断；
                 外层只管弹出，内层（proc-dot）单独做点亮脉冲，两个 animation 写同一元素会互相覆盖 -->
            <span class="proc-pop z-10 shrink-0" :style="{ '--d': `${DOT_BASE + i * DOT_STEP}ms` }">
              <span
                class="proc-dot flex h-[28px] w-[28px] items-center justify-center rounded-full text-[11px] font-bold"
                :class="step.dark ? 'text-white' : 'text-[#f5821f]'"
                :style="{
                  '--wd': `${dotWave[i] ?? 0}ms`,
                  '--dot-bg': step.dark ? '#13322a' : '#ffffff',
                  '--dot-on': step.dark ? '#2f8a72' : '#bfe8d3',
                }"
              >
                {{ step.no }}
              </span>
            </span>

            <!-- 下槽：固定 140px 高、justify-start 让卡贴住轴线；双数节点在这层 -->
            <div class="flex h-[140px] w-full flex-col items-center justify-start">
              <template v-if="i % 2 === 1">
                <span
                  class="proc-link h-[14px] w-px shrink-0 bg-[#d2e1d7]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 100}ms` }"
                  aria-hidden="true"
                />
                <!-- 双数节点的卡：一律白卡，规格同上槽 -->
                <article
                  class="reveal w-full rounded-[14px] bg-white p-[16px]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 100}ms` }"
                >
                  <p class="text-[14px] font-bold leading-[18px] tracking-[0.04em] text-[#f5821f]">
                    {{ step.no }}
                  </p>
                  <h3 class="mt-[8px] text-[16px] font-bold leading-[22px] text-ink-900">
                    {{ step.title }}
                  </h3>
                  <p class="mt-[6px] text-[13px] leading-[19px] text-[#7a8a82]">{{ step.desc }}</p>
                </article>
              </template>
              <!-- 最后一列（07 是单数，卡在上槽）：下槽放「验收之后」浅绿盒，再晚 160ms 出现 -->
              <template v-else-if="i === process.steps.length - 1">
                <span
                  class="proc-link h-[14px] w-px shrink-0 bg-[#d2e1d7]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 260}ms` }"
                  aria-hidden="true"
                />
                <!-- 绿盒：浅绿底 #e7f3ec + 墨绿字，无边框，靠底色跟白卡区分 -->
                <div
                  class="reveal w-full rounded-[14px] bg-[#e7f3ec] p-[16px]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 260}ms` }"
                >
                  <p class="text-[13px] font-bold leading-[18px] text-[#2fb188]">
                    {{ process.afterLabel }}
                  </p>
                  <p class="mt-[8px] text-[13px] leading-[20px] text-[#3f6b5a]">
                    {{ process.afterText }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- 窄屏（lg 以下）：竖向时间线，mt-[40px] 与说明间距 40px -->
      <ol class="relative mt-[40px] lg:hidden">
        <!-- 贯穿竖线：left 13px 对圆点中心，top 8px / bottom 16px 两端各留一点，压在圆点层下面 -->
        <span class="absolute bottom-4 left-[13px] top-2 w-px bg-[#d2e1d7]" aria-hidden="true" />
        <li
          v-for="(step, i) in process.steps"
          :key="step.no"
          class="reveal relative flex gap-[16px] pb-[20px] pl-0"
          :style="{ '--d': `${240 + i * 70}ms` }"
        >
          <!-- 圆点：27×27，07 深绿底白字；mt-[2px] 跟卡片顶边对齐 -->
          <span
            class="z-10 mt-[2px] flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
            :class="step.dark ? 'bg-[#13322a] text-white' : 'bg-white text-[#f5821f]'"
          >
            {{ step.no }}
          </span>
          <!-- 卡片：flex-1 撑满剩余宽度，rounded 14px、内边距 16px -->
          <article class="flex-1 rounded-[14px] p-[16px]" :class="cardBg(step.dark)">
            <p
              class="text-[13px] font-bold leading-[17px] tracking-[0.04em]"
              :class="step.dark ? 'text-[#2fb188]' : 'text-[#f5821f]'"
            >
              {{ step.no }}
            </p>
            <h3
              class="mt-[6px] text-[16px] font-bold leading-[22px]"
              :class="step.dark ? 'text-white' : 'text-ink-900'"
            >
              {{ step.title }}
            </h3>
            <p
              class="mt-[4px] text-[13px] leading-[19px]"
              :class="step.dark ? 'text-[#9db2a9]' : 'text-[#7a8a82]'"
            >
              {{ step.desc }}
            </p>
          </article>
        </li>
        <!-- 验收之后：竖线末尾追加一个绿盒，圆点位置留同尺寸浅绿圆占位 -->
        <li
          class="reveal relative flex gap-[16px]"
          :style="{ '--d': `${240 + process.steps.length * 70}ms` }"
        >
          <span
            class="z-10 mt-[2px] h-[27px] w-[27px] shrink-0 rounded-full bg-[#e7f3ec]"
            aria-hidden="true"
          />
          <div class="flex-1 rounded-[14px] bg-[#e7f3ec] p-[16px]">
            <p class="text-[13px] font-bold leading-[18px] text-[#2fb188]">
              {{ process.afterLabel }}
            </p>
            <p class="mt-[6px] text-[13px] leading-[20px] text-[#3f6b5a]">
              {{ process.afterText }}
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.proc-axis {
  clip-path: inset(0 100% 0 0);
}

.in .proc-axis {
  animation: proc-draw 1000ms cubic-bezier(0.22, 1, 0.36, 1) 240ms both;
}

@keyframes proc-draw {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

.proc-pop {
  transform: scale(0);
}

.in .proc-pop {
  animation: proc-pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) var(--d, 0ms) both;
}

@keyframes proc-pop {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

.proc-link {
  opacity: 0;
}

.in .proc-link {
  animation: proc-fade 200ms ease var(--d, 0ms) both;
}

@keyframes proc-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.proc-arrow {
  transform: scale(0);
  transform-origin: left center;
}

.in .proc-arrow {
  animation: proc-pop 400ms cubic-bezier(0.34, 1.56, 0.64, 1) 1240ms both;
}

.proc-track {
  animation: proc-track 7s linear infinite;
  animation-delay: 1500ms;
  animation-fill-mode: backwards;
  animation-play-state: paused;
}

.in .proc-track {
  animation-play-state: running;
}

@keyframes proc-track {
  0% {
    transform: translateX(0);
  }
  46%,
  100% {
    transform: translateX(100%);
  }
}

.proc-bead {
  animation: proc-bead 7s ease-in-out infinite;
  animation-delay: 1500ms;
  animation-fill-mode: backwards;
  animation-play-state: paused;
}

.in .proc-bead {
  animation-play-state: running;
}

@keyframes proc-bead {
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

.proc-dot {
  background-color: var(--dot-bg);
  animation: proc-dot 7s ease-in-out infinite;
  animation-delay: var(--wd, 0ms);
  animation-fill-mode: backwards;
  animation-play-state: paused;
}

.in .proc-dot {
  animation-play-state: running;
}

@keyframes proc-dot {
  0%,
  100% {
    background-color: var(--dot-bg);
  }
  3% {
    background-color: var(--dot-on);
  }
  9% {
    background-color: var(--dot-bg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .proc-track,
  .proc-bead,
  .proc-dot {
    animation: none;
  }

  .proc-bead {
    opacity: 0;
  }
}
</style>
