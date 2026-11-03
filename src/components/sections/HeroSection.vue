<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页首屏
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'
// 图都是设计稿导出的 2 倍图，看板和浮层卡里的文字已经烘焙在图里
import badgeImg from '@/assets/home/images/badge.png'
import workbenchImg from '@/assets/home/images/workbench-body.png'
import complianceImg from '@/assets/home/images/compliance.png'
import onTheWayImg from '@/assets/home/images/on-the-way.png'
import ringsImg from '@/assets/home/images/rings.png'
import dividerImg from '@/assets/home/images/hero-bottom-divider.png'

/**
 * 首屏 Hero，按 1440×704 画板量出来的：
 * 文案区 660、看板 596×461（顶 67、左 763）、列距 24；
 * 合规卡 188×63 左探 59，在途卡 160×63 左探 120，圆环 800×800；
 * 分隔线 562，数字条顶 600。
 *
 * 本区块的间距尺寸一律写 px 字面值，方便直接对着稿子改数字（1rem = 16px）。
 */

// 数字条：拆成「数字 + 尾巴」，尾巴里没有数字才做递增（10、7 天 行，7×24 不行）
const statsEl = ref<HTMLDListElement | null>(null)

const stats = computed(() =>
  siteConfig.hero.stats.map((stat) => {
    const m = stat.value.match(/^(\d+)(\D.*)$/)
    return { ...stat, count: m ? { num: Number(m[1]), rest: m[2] } : null }
  }),
)

onMounted(() => {
  // 关了动效或者浏览器太老，就直接显示终值
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
        const DURATION = 900 // 0.9s，easeOutCubic 先快后慢，比匀速看着舒服
        const tick = (t: number) => {
          const p = Math.min((t - t0) / DURATION, 1)
          el.textContent = String(Math.round(num * (1 - Math.pow(1 - p, 3)))) + rest
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    },
    { threshold: 0.5 }, // 露出一半再数，不然刚露头就跳完了
  )
  els.forEach((el) => io.observe(el))
})
</script>

<template>
  <!-- 首屏：relative 给装饰定位，overflow-hidden 裁掉探出视口的圆环；背景渐变见文件末尾 .hero-bg -->
  <section id="home" class="hero-bg relative overflow-hidden">
    <!-- 内容容器：和顶栏同一条左右基准线 -->
    <div class="container-page relative">
      <!-- 两栏 11:10，列距 24；看板顶 67 所以上留白 67；<1024 上下堆叠（文案在上） -->
      <div
        class="grid items-start gap-[56px] pt-[40px] sm:pt-[48px] lg:grid-cols-[11fr_10fr] lg:gap-[24px] lg:pt-[67px]"
      >
        <!-- 左列：胶囊 → 标题 → 说明 → 按钮 → 卖点。
             比看板顶低 10px，几段间距都加过一点，让左列底部和看板底部齐平 -->
        <div class="lg:mt-[10px]">
          <!-- 法规胶囊：素材 924×128，高 32 时宽 231（稿子 236）；入场动画从这里开始 -->
          <img
            :src="badgeImg"
            alt="对标 2026 版《危险化学品安全法》"
            class="rise h-8 w-auto"
            :style="{ animationDelay: '0ms' }"
          />

          <!-- 标题：48px、行距 73（leading-1.5），第二行品牌橙；手机上降到 28px -->
          <h1
            class="rise mt-[30px] text-[28px] font-bold leading-[1.35] text-ink-900 sm:text-4xl lg:text-[48px] lg:leading-[1.5]"
            :style="{ animationDelay: '70ms' }"
          >
            {{ siteConfig.hero.title }}
            <span class="block mt-[5px] text-brand-500">{{ siteConfig.hero.titleAccent }}</span>
          </h1>

          <!-- 说明：一行最多 592，行距 26（leading-1.65） -->
          <p
            class="rise mt-[40px] max-w-[592px] text-[15px] leading-relaxed text-ink-600 lg:text-base lg:leading-[1.65]"
            :style="{ animationDelay: '140ms' }"
          >
            {{ siteConfig.hero.desc }}
          </p>

          <!-- 主按钮：稿子 358×50，所以用 lg 尺寸又把高度压到 50、宽度定 360 -->
          <div class="rise mt-[30px]" :style="{ animationDelay: '210ms' }">
            <BaseButton
              :href="siteConfig.contact.ctaHref"
              size="lg"
              class="w-full sm:w-auto lg:h-[50px] lg:w-[360px]"
            >
              {{ siteConfig.hero.primaryCta }}
            </BaseButton>
          </div>

          <!-- 卖点胶囊：白底半透明 + 细描边，间距 10，内边距 上7 左12 右14；
               hover 描边转浅橙、上浮 0.5（2px） -->
          <ul class="rise mt-[36px] flex flex-wrap gap-[10px]" :style="{ animationDelay: '280ms' }">
            <li
              v-for="feature in siteConfig.hero.features"
              :key="feature"
              class="flex items-center gap-[8px] rounded-full border border-ink-100 bg-white/80 py-[7px] pl-[12px] pr-[14px] text-sm font-medium text-ink-700 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-300"
            >
              <!-- 对勾：稿子里没有圆底，就是一根 #2f9e6e 的线条勾 -->
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

        <!-- 右列：看板整图 + 两张浮层卡。整块是示意图，对读屏隐藏免得念一堆数字 -->
        <div
          class="relative mx-auto w-full max-w-[544px] sm:max-w-[608px] lg:mt-0 lg:max-w-none"
          aria-hidden="true"
        >
          <!-- 右上同心圆：800×800，圆心 (1062,296)。尺寸位置都按看板的百分比写，
               窗口变宽时跟着看板等比缩放，不然会出现圆环不动、内容拉伸 -->
          <img
            :src="ringsImg"
            alt=""
            aria-hidden="true"
            class="breathe pointer-events-none absolute left-[-16.9%] top-[-37.1%] w-[134.2%] max-w-none select-none"
          />

          <!-- 合规卡：卡体 188×63，左探看板 59。
               top 用 calc 是因为纯百分比的卡会跟着看板一起涨、1920 顶到导航栏，
               px 那部分把它按住，卡顶恒定在导航栏下 20px；宽和左探用 min/max 封顶，
               不然卡变大后底边会压到看板里的六边形 logo。
               素材 980×516，白卡体 (116,116)-(863,359)，下缘投影已裁掉渐隐 -->
          <img
            :src="complianceImg"
            alt=""
            class="pop-in absolute left-[max(-71px,-11.8%)] top-[calc(-47px_-_5.25%)] z-10 w-[min(240px,34.4%)] select-none"
            :style="{ animationDelay: '450ms' }"
          />

          <!-- 看板整图：圆角 + 柔和投影浮起来。
               relative 不能省：圆环是 absolute，普通流元素会被它盖住 -->
          <img
            :src="workbenchImg"
            alt="威易达化工一体化平台工作台界面"
            class="slide-in relative w-full rounded-xl shadow-[0_28px_70px_-24px_rgba(26,26,26,0.28)] transition-transform duration-500 ease-out hover:-translate-y-1.5 lg:rounded-2xl"
            :style="{ animationDelay: '150ms' }"
          />

          <!-- 在途卡：卡体 160×63，左探看板 120、底边贴看板底。
               同样 px 封顶，不然 1920 下会探出看板 49px、压到下面的分隔线 -->
          <img
            :src="onTheWayImg"
            alt=""
            class="pop-in absolute bottom-[max(-35px,-7.6%)] left-[max(-132px,-22.1%)] z-10 w-[min(215px,30.8%)] select-none"
            :style="{ animationDelay: '550ms' }"
          />
        </div>
      </div>

      <!-- 分隔线：看板底 → 线 34，线 → 数字条 38，数字条 → 底 50 -->
      <div class="pb-[40px] lg:mt-[34px] lg:pb-[50px]">
        <img :src="dividerImg" alt="" aria-hidden="true" class="h-[2px] w-full" />

        <!-- 四条数字：整块 1280×62，首末列贴两端；手机两列，≥640 转一行两端对齐。
             tabular-nums 让递增时数字等宽，不然会左右抖 -->
        <dl
          ref="statsEl"
          class="rise mt-[32px] grid grid-cols-2 gap-y-[24px] sm:mt-[48px] sm:flex sm:flex-wrap sm:justify-between sm:gap-x-[32px] sm:gap-y-[24px] lg:mt-[38px] [font-variant-numeric:tabular-nums]"
          :style="{ animationDelay: '350ms' }"
        >
          <!-- dl 规范要求 dt 在前，视觉上数值要在上面，所以面板翻过来排（col-reverse） -->
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse">
            <!-- 标签：13px 弱化灰，离数值 10px -->
            <dt class="mt-[10px] text-[13px] text-ink-400">{{ stat.label }}</dt>
            <!-- 数值：24px 加粗；能递增的交给 count-up，data-* 传目标和尾巴 -->
            <dd class="text-2xl font-bold leading-none text-ink-900">
              <span v-if="stat.count" :data-num="stat.count.num" :data-rest="stat.count.rest">{{
                stat.value
              }}</span>
              <template v-else>{{ stat.value }}</template>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 入场动画：只动 opacity/transform，不重排。
   keyframes 只写 from，终态就是元素本身的样子；fill 用 backwards，
   这样 delay 期间是隐藏的，播完又完全释放，不会压住 hover 的 transform（forwards 会压住） */
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

.pop-in {
  animation: hero-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
}

/* 圆环呼吸：4s 一个来回，放大 3.5%。
   infinite 动画必须自己关掉 reduced-motion —— 全局规则会把它压成 0.01ms，变成疯狂空转 */
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

/* 背景三层：右上橙光晕 960×512 → 左下绿光晕 880×480 → 纵向暖橙到近白。
   颜色是从设计稿取的，多层渐变写成 CSS 比堆工具类清楚 */
.hero-bg {
  background:
    radial-gradient(960px 512px at 88% -8%, rgba(255, 131, 63, 0.26), transparent 68%),
    radial-gradient(880px 480px at 0% 108%, rgba(47, 158, 110, 0.16), transparent 70%),
    linear-gradient(180deg, #fff1e6 0%, #fffbf7 45%, #fdfdfb 100%);
}
</style>
