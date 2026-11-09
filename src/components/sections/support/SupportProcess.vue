<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 服务支持第三屏：实施流程
-->
<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

/**
 * 第三屏：七个节点，从需求调研到转入维保（原型 S2）。
 * 桌面端：一条从灰绿渐变到绿的横轴，单数节点白卡挂上方、双数挂下方，
 * 07 是深绿卡，轴末端右下角一个「验收之后」浅绿盒。
 * 轴上的橙是 #f5821f，比全站品牌橙 #ff833f 深一档，照原型采的色，别混用。
 * 窄屏（lg 以下）退化为竖向时间线：点在左、卡在右，顺序不变。
 *
 * 进场序列（2026-11-09 升级）：轴线画开 → 圆点跟线头逐站弹出 → 卡片随站升起 →
 * 箭头收尾 → 光点循环再开跑。触发盯轴区自己（.play，露 40% 才演）——
 * 不用整屏 .in（露头 15% 就跑，用户看到轴时早播完了）。
 */
const { process } = siteConfig.support

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 深绿卡和白卡的底色别写在一起：bg-white 和 bg-[#13322a] 同时挂在元素上，
// 生效哪个看样式表顺序，不可靠，所以底色整个走三目
const cardBg = (dark?: boolean) => (dark ? 'bg-[#13322a]' : 'bg-white')

// ---- 进场序列节奏 ----
// 轴线 240ms 起画 1s 画完；圆点跟着线头逐站弹出，01 在 280ms、每站 +160ms
const DOT_BASE = 280
const DOT_STEP = 160

/**
 * 圆点点亮时刻（光点循环扫过用）：光点 3.2s 走完整根轴，7 个点从 7% 到 93% 均匀分布，
 * 换算成毫秒再各减 210ms（keyframes 3% 处才最亮）。整体 +1500ms 是给进场序列让路——
 * 轴画完、圆点弹完（~1.7s）光点循环才开跑，不然信号珠跑在一根还没画出来的线上。
 * 写死成数组而不是算的：数值是对着轴宽调出来的，改光点速度时要一起看。
 */
const dotWave = [1500, 1950, 2450, 2900, 3350, 3800, 4250]

// 序列动画开关：盯桌面轴区（竖屏时间线还是跟整屏 .in 的逐条 reveal）
const stageEl = useTemplateRef<HTMLElement>('stage')
let stageObserver: IntersectionObserver | null = null

onMounted(() => {
  const el = stageEl.value
  if (!el) return
  // 关动效 / 老浏览器：直接加 .play，全局 0.01ms 规则把动画压成瞬间完成，内容不锁在透明态
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    el.classList.add('play')
    return
  }
  stageObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.classList.add('play')
        stageObserver?.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  stageObserver.observe(el)
})

onUnmounted(() => stageObserver?.disconnect())
</script>

<template>
  <!-- 浅灰绿底，跟白色第二屏和第四屏隔开层次 -->
  <section ref="root" class="bg-[#f4f8f5] py-[96px]">
    <div class="container-page">
      <!-- 眉题：绿色是这一屏的特例 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ process.eyebrow }}
      </p>

      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ process.title }}
      </h2>

      <p
        class="reveal mt-[24px] max-w-[820px] text-[14px] leading-[24px] text-ink-600"
        style="--d: 160ms"
      >
        {{ process.desc }}
      </p>

      <!-- ============ 桌面端：横向交错时间轴（lg 起）；序列动画盯这块，露 40% 才加 .play ============ -->
      <div ref="stage" class="relative mt-[56px] hidden lg:block">
        <!-- 横轴：左灰右绿的渐变，向右伸出容器一点接箭头；z 在圆点之下。
             进场从左往右画开（clip-path 揭显，渐变不被拉伸变形） -->
        <div
          class="proc-axis absolute left-0 right-0 top-[153px] z-0 h-[3px] rounded-full bg-gradient-to-r from-[#dfe0d4] via-[#c4e4d5] via-55% to-[#2fb188]"
          aria-hidden="true"
        />
        <!-- 光点：一颗 7px 的小白点沿轴滑过，只带一圈很浅的绿光。
             千万别做成宽光带：3px 细轴上一条十几厘米的发光段，看着就是一团糊掉的污渍，
             还会把轴"啃断"。小点滑行则像信号在走，不给细线添堵。
             track 是 100% 宽的同层容器，位移用自身宽度百分比（0→100%），跟容器实际宽度无关 -->
        <div
          class="pointer-events-none absolute left-0 right-0 top-[145px] z-0 h-[19px] overflow-hidden"
          aria-hidden="true"
        >
          <div class="proc-track relative h-full w-full">
            <!-- 9px 白点 + 1.5px 绿描边：边缘清晰，1x 屏也看得见；
                 别用大面积模糊辉光，3px 细线旁边一团糊光就成污渍了 -->
            <span
              class="proc-bead absolute left-0 top-1/2 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgba(19,50,42,0.22)] ring-[1.5px] ring-[#2fb188]"
            />
          </div>
        </div>

        <!-- 轴末端箭头：三角形，贴在渐变线右端（只敢伸 14px，lg 临界宽度下再宽就出滚动条）；
             线画到头才回弹出现 -->
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

        <!-- 七列：每列上槽(卡) + 圆点 + 下槽(卡/绿盒) -->
        <div class="grid grid-cols-7 gap-[14px]">
          <div v-for="(step, i) in process.steps" :key="step.no" class="flex flex-col items-center">
            <!-- 上槽：单数节点（i 为偶数）的卡贴着轴线，空槽也占高保持对称。
                 卡片延迟跟同列圆点对齐（圆点弹出后 100ms 卡片升起） -->
            <div class="flex h-[140px] w-full flex-col items-center justify-end">
              <template v-if="i % 2 === 0">
                <article
                  class="proc-card w-full rounded-[14px] p-[16px]"
                  :class="cardBg(step.dark)"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 100}ms` }"
                >
                  <p
                    class="text-[14px] font-bold leading-[18px] tracking-[0.04em]"
                    :class="step.dark ? 'text-[#2fb188]' : 'text-[#f5821f]'"
                  >
                    {{ step.no }}
                  </p>
                  <h3
                    class="mt-[8px] text-[16px] font-bold leading-[22px]"
                    :class="step.dark ? 'text-white' : 'text-ink-900'"
                  >
                    {{ step.title }}
                  </h3>
                  <p
                    class="mt-[6px] text-[13px] leading-[19px]"
                    :class="step.dark ? 'text-[#9db2a9]' : 'text-[#7a8a82]'"
                  >
                    {{ step.desc }}
                  </p>
                </article>
                <!-- 竖向连接短线：卡底到圆点，跟卡片同拍淡入 -->
                <span
                  class="proc-link h-[14px] w-px shrink-0 bg-[#d2e1d7]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 100}ms` }"
                  aria-hidden="true"
                />
              </template>
            </div>

            <!-- 圆点：01-06 白底橙字，07 深绿底白字；白底把轴线盖断。
                 外层只管进场弹出（线画到哪站哪站点冒出来），内层单独做点亮脉冲，
                 两个 animation 写在同一个元素上会互相覆盖 -->
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

            <!-- 下槽：双数节点；第 7 列的下槽放「验收之后」绿盒 -->
            <div class="flex h-[140px] w-full flex-col items-center justify-start">
              <template v-if="i % 2 === 1">
                <span
                  class="proc-link h-[14px] w-px shrink-0 bg-[#d2e1d7]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 100}ms` }"
                  aria-hidden="true"
                />
                <article
                  class="proc-card w-full rounded-[14px] bg-white p-[16px]"
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
              <template v-else-if="i === process.steps.length - 1">
                <span
                  class="proc-link h-[14px] w-px shrink-0 bg-[#d2e1d7]"
                  :style="{ '--d': `${DOT_BASE + i * DOT_STEP + 260}ms` }"
                  aria-hidden="true"
                />
                <div
                  class="proc-card w-full rounded-[14px] bg-[#e7f3ec] p-[16px]"
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

      <!-- ============ 窄屏：竖向时间线 ============ -->
      <ol class="relative mt-[40px] lg:hidden">
        <!-- 贯穿的竖线，压在圆点层下面 -->
        <span class="absolute bottom-4 left-[13px] top-2 w-px bg-[#d2e1d7]" aria-hidden="true" />
        <li
          v-for="(step, i) in process.steps"
          :key="step.no"
          class="reveal relative flex gap-[16px] pb-[20px] pl-0"
          :style="{ '--d': `${240 + i * 70}ms` }"
        >
          <span
            class="z-10 mt-[2px] flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
            :class="step.dark ? 'bg-[#13322a] text-white' : 'bg-white text-[#f5821f]'"
          >
            {{ step.no }}
          </span>
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
        <!-- 验收之后：竖线末尾追加一个绿盒 -->
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
/* ---- 进场序列（一次性，reduced-motion 交给全局 0.01ms 规则）----
   节奏：轴 240ms 起画 1s → 圆点 280ms 起每站 +160ms 跟着线头弹出 → 卡片/竖线
   跟同列圆点错 100ms 升起 → 箭头 1240ms 回弹 → 光点循环延迟 1.5s 再开跑 */

/* 横轴：clip-path 从右往左揭显，渐变不被拉伸（scaleX 会把渐变压扁再弹开，看着脏） */
.proc-axis {
  clip-path: inset(0 100% 0 0);
}

.play .proc-axis {
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

/* 圆点进场：线画到哪站哪站弹出，回弹曲线跟浮层弹入同族 */
.proc-pop {
  transform: scale(0);
}

.play .proc-pop {
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

/* 竖向连接短线：跟卡片同拍淡入 */
.proc-link {
  opacity: 0;
}

.play .proc-link {
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

/* 卡片：从站点下方 10px 升起（跟全局 .reveal 拆开——这里要跟轴自己的 .play 同步，
   整屏 .in 露头太早，卡片会跟圆点对不上拍） */
.proc-card {
  opacity: 0;
  transform: translateY(10px);
}

.play .proc-card {
  animation: proc-rise 400ms cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms) both;
}

@keyframes proc-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 末端箭头：线画到头（~1.24s）才冒出来 */
.proc-arrow {
  transform: scale(0);
  transform-origin: left center;
}

.play .proc-arrow {
  animation: proc-pop 400ms cubic-bezier(0.34, 1.56, 0.64, 1) 1240ms both;
}

/* 光点：track 负责位移（0 → 100% 自身宽度 = 整根轴），bead 只管淡入淡出，
   两层拆开是因为位移要 linear 匀速、显隐要缓入缓出，一个 animation 塞不下两种曲线。
   7s 一轮里 3.2s 走完，剩下 3.8s 静息，跟首页流程图箭头波同节奏。
   delay 1500ms 给进场序列让路（跟 dotWave 的整体偏移配套） */
.proc-track {
  animation: proc-track 7s linear infinite;
  animation-delay: 1500ms;
  animation-fill-mode: backwards;
  animation-play-state: paused; /* 视口外不空转，useReveal 加 .in 才开跑 */
}

.play .proc-track {
  animation-play-state: running;
}

@keyframes proc-track {
  0% {
    transform: translateX(0); /* 从轴左端起步 */
  }
  46%,
  100% {
    transform: translateX(100%); /* 走到轴右端（箭头处）就停住等下一轮 */
  }
}

.proc-bead {
  animation: proc-bead 7s ease-in-out infinite;
  animation-delay: 1500ms;
  animation-fill-mode: backwards;
  animation-play-state: paused;
}

.play .proc-bead {
  animation-play-state: running;
}

@keyframes proc-bead {
  0% {
    opacity: 0; /* 一开始不可见，别在左端突然冒出来 */
  }
  3% {
    opacity: 1;
  }
  43% {
    opacity: 1;
  }
  46%,
  100% {
    opacity: 0; /* 抵达箭头后淡出，不留在端点一直亮 */
  }
}

/* 圆点：光点扫到哪个点，哪个点从白底（07 是深绿底）变浅绿底。
   底色走行内的 --dot-bg / --dot-on，01-06 白↔浅绿，07 深绿↔略亮绿，不套白底 */
.proc-dot {
  background-color: var(--dot-bg); /* 动画关掉（reduced-motion）时的兜底底色 */
  animation: proc-dot 7s ease-in-out infinite;
  animation-delay: var(--wd, 0ms); /* 按节点在轴上的位置决定光点何时扫到 */
  animation-fill-mode: backwards; /* delay 窗口里也压到 0% 帧，否则开头是透明的 */
  animation-play-state: paused;
}

.play .proc-dot {
  animation-play-state: running;
}

@keyframes proc-dot {
  0%,
  100% {
    background-color: var(--dot-bg);
  }
  3% {
    background-color: var(--dot-on); /* 210ms 点亮 */
  }
  9% {
    background-color: var(--dot-bg); /* 再 420ms 暗回去，等下一轮 */
  }
}

/* reduced-motion：infinite 动画必须自己关，全局 0.01ms 规则会把它压成疯狂空转；
   关掉后圆点回到原底色、光点彻底隐藏 */
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
