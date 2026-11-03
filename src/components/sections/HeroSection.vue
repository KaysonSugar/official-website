<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'
// 首屏素材全部由设计稿导出（2 倍图），文案与看板内容都烘焙在图里，不再手工还原
import badgeImg from '@/assets/home/images/badge.png'
import workbenchImg from '@/assets/home/images/workbench-body.png'
import complianceImg from '@/assets/home/images/compliance.png'
import onTheWayImg from '@/assets/home/images/on-the-way.png'
import ringsImg from '@/assets/home/images/rings.png'
import dividerImg from '@/assets/home/images/hero-bottom-divider.png'

/**
 * 首屏 Hero（定稿原型 01，1440×704 画板逐项实测还原）
 *
 * 左侧文案用 HTML 写（可改文案、可被搜索引擎读到），右侧看板整块用设计稿导出的图。
 * 实测基准（1440 稿，以 Hero.png 4 倍导出图逐像素校准）：文案区 660 宽、看板 596×461
 * （顶 y=67、左 x=763、右缘贴容器右边线）、合规卡 188×63（左探 59 / 底压看板顶 10）、
 * 在途卡 160×63（左探 120 / 底对齐看板底）、圆环 800×800 圆心 (1062,296)、
 * 分隔线 y=562、数字条顶 y=600；两列列距 24px。
 * 浮层卡定位全部用看板容器的百分比，窄窗口下跟随等比缩放不跑位；
 * 卡素材的 alpha bbox 含投影，折算显示尺寸时按白卡体像素盒子（747×243 / 631×243）计算。
 *
 * 间距约定：本区块的间距/尺寸一律写 px 字面值（如 mt-[28px]），不写 Tailwind 的 rem 档位，
 * 因为数值全部来自设计稿实测，写 px 才能直接对着稿子加减数字。
 * 换算备忘：1rem = 16px，Tailwind 的 mt-8 = 8 × 0.25rem = 32px。 */

/* 数字条 count-up：拆出「前导数字 + 余尾」，余尾不含数字才递增
   （'10'、'7 天' 可以；'7×24' 的余尾带数字，原样显示不递增） */
const statsEl = ref<HTMLDListElement | null>(null)

const stats = computed(() =>
  siteConfig.hero.stats.map((stat) => {
    const m = stat.value.match(/^(\d+)(\D.*)$/)
    return { ...stat, count: m ? { num: Number(m[1]), rest: m[2] } : null }
  }),
)

onMounted(() => {
  // 减弱动效偏好 / 无 IntersectionObserver：保持完整值，不跑递增
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!('IntersectionObserver' in window)) return

  const els = statsEl.value?.querySelectorAll<HTMLElement>('[data-num]')
  if (!els?.length) return

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        io.unobserve(entry.target)
        const el = entry.target as HTMLElement
        const num = Number(el.dataset.num)
        const rest = el.dataset.rest ?? ''
        const t0 = performance.now()
        const DURATION = 900 // 递增 0.9s，easeOutCubic 先快后慢，比匀速自然
        const tick = (t: number) => {
          const p = Math.min((t - t0) / DURATION, 1)
          el.textContent = String(Math.round(num * (1 - Math.pow(1 - p, 3)))) + rest
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    },
    { threshold: 0.5 }, // 数字条露出一半才开始，避免刚露头就跳
  )
  els.forEach((el) => io.observe(el))
})
</script>

<template>
  <!-- 首屏：relative + overflow-hidden（裁掉超出视口的圆环）。
       背景多层渐变见下方 .hero-bg（顶部暖橙 → 中段近白 → 左下薄荷绿），取自设计稿取色 -->
  <section id="home" class="hero-bg relative overflow-hidden">
    <!-- 内容容器：与顶栏同一条左右基准线 -->
    <div class="container-page relative">
      <!-- 两栏：实测 660:596 ≈ 11:10，列距 24px；看板顶 y=67 → 顶部留白 67px；
           <1024px 上下堆叠（文案在前、看板在后） -->
      <div
        class="grid items-start gap-[56px] pt-[40px] sm:pt-[48px] lg:grid-cols-[11fr_10fr] lg:gap-[24px] lg:pt-[67px]"
      >
        <!-- 左列：胶囊 → 标题 → 说明 → 主按钮 → 三个卖点。
             顶部比看板顶低 10px（lg:mt-[10px]）；各段间距在实测值基础上加大过，
             让左列底部与看板底部齐平（实测胶囊底 614 vs 看板底 610，差 4px） -->
        <div class="lg:mt-[10px]">
          <!-- 法规对标胶囊：素材 924×128，显示高 32px 时宽 231 ≈ 实测 236。
               入场编排从它开始，后续元素每 70ms 递进一个 -->
          <img
            :src="badgeImg"
            alt="对标 2026 版《危险化学品安全法》"
            class="rise h-8 w-auto"
            :style="{ animationDelay: '0ms' }"
          />

          <!-- 主标题：实测字号 48px（单字格高 45）、行距 73px → leading-[1.5]；
               第二行品牌橙 -->
          <h1
            class="rise mt-[30px] text-[28px] font-bold leading-[1.35] text-ink-900 sm:text-4xl lg:text-[48px] lg:leading-[1.5]"
            :style="{ animationDelay: '70ms' }"
          >
            {{ siteConfig.hero.title }}
            <span class="block mt-[5px] text-brand-500">{{ siteConfig.hero.titleAccent }}</span>
          </h1>

          <!-- 说明：实测行宽约 590px（max-w-[37rem]）、行距 26px → leading-[1.65] -->
          <p
            class="rise mt-[40px] max-w-[592px] text-[15px] leading-relaxed text-ink-600 lg:text-base lg:leading-[1.65]"
            :style="{ animationDelay: '140ms' }"
          >
            {{ siteConfig.hero.desc }}
          </p>

          <!-- 主按钮：实测 358×50（覆盖 lg 尺寸的 py），下方 36px 接卖点胶囊 -->
          <div class="rise mt-[30px]" :style="{ animationDelay: '210ms' }">
            <BaseButton
              :href="siteConfig.contact.ctaHref"
              size="lg"
              class="w-full sm:w-auto lg:h-[50px] lg:w-[360px]"
            >
              {{ siteConfig.hero.primaryCta }}
            </BaseButton>
          </div>

          <!-- 三个卖点胶囊：白底半透明 + 细描边，对勾是纯线条绿勾（设计稿无圆底）。
               胶囊间距 10px、内边距 上7 左12 右14；hover 描边变品牌浅橙 + 轻微上浮 -->
          <ul class="rise mt-[36px] flex flex-wrap gap-[10px]" :style="{ animationDelay: '280ms' }">
            <li
              v-for="feature in siteConfig.hero.features"
              :key="feature"
              class="flex items-center gap-[8px] rounded-full border border-ink-100 bg-white/80 py-[7px] pl-[12px] pr-[14px] text-sm font-medium text-ink-700 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-300"
            >
              <!-- 对勾：纯线条 #2f9e6e，14px 与文字重心齐平 -->
              <svg
                class="h-[14px] w-[14px] shrink-0"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2.5 7.4 5.6 10.4 11.5 3.9"
                  stroke="#2f9e6e"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- 右列：看板整图（596×462）+ 两张浮层。
             整块是装饰性界面示意图，对读屏隐藏，避免念一堆表格数字 -->
        <div
          class="relative mx-auto w-full max-w-[544px] sm:max-w-[608px] lg:mt-0 lg:max-w-none"
          aria-hidden="true"
        >
          <!-- 右上装饰同心圆：设计稿导出的大图，纯装饰不进无障碍树，压在看板后面。
               实测 800×800、圆心 (1062, 296)。定位/尺寸全部用看板的百分比
               （左探看板 101px→-16.9%、上探 171px→-37.1%、800/596→134.2%），
               窗口放大时跟随看板等比缩放，不会出现"圆环不动、内容拉伸"的错位 -->
          <img
            :src="ringsImg"
            alt=""
            aria-hidden="true"
            class="breathe pointer-events-none absolute left-[-16.9%] top-[-37.1%] w-[134.2%] max-w-none select-none"
          />

          <!-- 「合规校验通过」浮层：实测卡体 188×63，左探看板 59px、底边压看板顶边 10px。
               素材 980×516，白卡体在 (116,116)-(863,359)，按 188 宽折算显示宽 246.6、
               投影边距 L/T 各 29 → left -88、top -82；全部用百分比跟随看板缩放。
               入场 450ms 后弹入（带一点回弹），像卡片落到位 -->
          <img
            :src="complianceImg"
            alt=""
            class="pop-in absolute left-[-11.8%] top-[-14.09%] z-10 w-[34.4%] select-none"
            :style="{ animationDelay: '450ms' }"
          />

          <!-- 看板整图：圆角 + 大范围柔和投影，浮起来但不抢文案的注意力。
               relative 是必须的：圆环是 absolute 定位元素，普通流 img 会被它盖住，
               加 relative 让看板参与定位绘制（DOM 在圆环后 → 画在上层）。
               入场从右侧滑入；hover 轻微抬升（只动 transform，不重排） -->
          <img
            :src="workbenchImg"
            alt="威易达化工一体化平台工作台界面"
            class="slide-in relative w-full rounded-xl shadow-[0_28px_70px_-24px_rgba(26,26,26,0.28)] transition-transform duration-500 ease-out hover:-translate-y-1.5 lg:rounded-2xl"
            :style="{ animationDelay: '150ms' }"
          />

          <!-- 「在途运输」浮层：实测卡体 160×63，左探看板 120px、底边与看板底对齐。
               素材 864×516，白卡体在 (116,116)-(747,359)，按 160 宽折算显示宽 219、
               投影边距 L29 / B40 → left -150、bottom -40。入场比合规卡再晚 100ms -->
          <img
            :src="onTheWayImg"
            alt=""
            class="pop-in absolute bottom-[-7.6%] left-[-22.1%] z-10 w-[30.8%] select-none"
            :style="{ animationDelay: '550ms' }"
          />
        </div>
      </div>

      <!-- 分隔线：看板底(528)→线(562) 间距 34px；线→数字条 38px；数字条→底部 50px -->
      <div class="pb-[40px] lg:mt-[34px] lg:pb-[50px]">
        <img :src="dividerImg" alt="" aria-hidden="true" class="h-[2px] w-full" />

        <!-- 四条数字：实测整块 1280×62，两端对齐（首列贴左、末列贴右）；
             手机两列网格，≥640px 转一行 flex 两端对齐。
             tabular-nums 让递增时数字等宽不抖动；进入视口后 JS 从 0 递增到目标值 -->
        <dl
          ref="statsEl"
          class="rise mt-[32px] grid grid-cols-2 gap-y-[24px] sm:mt-[48px] sm:flex sm:flex-wrap sm:justify-between sm:gap-x-[32px] sm:gap-y-[24px] lg:mt-[38px] [font-variant-numeric:tabular-nums]"
          :style="{ animationDelay: '350ms' }"
        >
          <div v-for="stat in stats" :key="stat.label">
            <!-- 数值：实测字格高 18 → 字号 24px 加粗。
                 符合递增条件的值交给 count-up（data-* 传目标），否则原样渲染 -->
            <dd class="text-2xl font-bold leading-none text-ink-900">
              <span v-if="stat.count" :data-num="stat.count.num" :data-rest="stat.count.rest">{{
                stat.value
              }}</span>
              <template v-else>{{ stat.value }}</template>
            </dd>
            <!-- 标签：13px 弱化灰，与数值拉开层级 -->
            <dt class="mt-[10px] text-[13px] text-ink-400">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── 入场编排 ──
   只动 opacity/transform（GPU 合成，不触发重排重绘）；keyframes 只写 from，
   终态就是元素自然状态；fill-mode 用 backwards：delay 期间保持 from（隐藏），
   动画结束后完全释放，不挡后面的 hover transform（forwards 会一直覆盖）。
   减弱动效偏好由 style.css 的全局规则压到 0.01ms，元素立即到位不会闪。 */
@keyframes hero-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

@keyframes hero-slide {
  from {
    opacity: 0;
    transform: translateX(28px);
  }
}

@keyframes hero-pop {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
}

.rise {
  animation: hero-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

.slide-in {
  animation: hero-slide 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

/* 轻微回弹曲线，浮层卡"落位"的手感 */
.pop-in {
  animation: hero-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

/* 圆环呼吸：4s 一个来回、幅度 3.5%，无限 alternate；
   infinite 动画被全局 reduced-motion 压到 0.01ms 会疯狂空转，必须显式关掉 */
@keyframes hero-breathe {
  to {
    transform: scale(1.035);
  }
}

.breathe {
  animation: hero-breathe 4s ease-in-out infinite alternate;
}

@media (prefers-reduced-motion: reduce) {
  .breathe {
    animation: none;
  }
}

/* 首屏背景：三层叠加，颜色从设计稿像素取样。
   顺序 = 上层到下层：右上浓橙光晕 → 左下薄荷绿光晕 → 纵向暖橙到近白的底色。
   写原生 CSS 而不是 Tailwind，是因为多层 radial-gradient 用工具类表达会很长，也不好读出意图 */
/* 光晕尺寸同样写 px：右上橙 960×512 落在 (88%, -8%)，左下绿 880×480 落在 (0%, 108%) */
.hero-bg {
  background:
    radial-gradient(960px 512px at 88% -8%, rgba(255, 131, 63, 0.26), transparent 68%),
    radial-gradient(880px 480px at 0% 108%, rgba(47, 158, 110, 0.16), transparent 70%),
    linear-gradient(180deg, #fff1e6 0%, #fffbf7 45%, #fdfdfb 100%);
}
</style>
