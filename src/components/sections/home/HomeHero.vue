<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页首屏
-->
<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useCountUp } from '@/composables/useCountUp'
import { siteConfig } from '@/config/site'
import badgeImg from '@/assets/home/images/badge.webp'
import HomeWorkbench from './HomeWorkbench.vue'
import truckIcon from '@/assets/home/images/hero-truck.webp'
import checkIcon from '@/assets/home/images/hero-check.webp'
import ringsImg from '@/assets/home/images/rings.webp'
import dividerImg from '@/assets/home/images/hero-bottom-divider.webp'

// 数字条：拆成「数字 + 尾巴」，尾巴里没有数字才做递增（10、7 天 行，7×24 不行）。
// 递增本体在 useCountUp（从这里的内联实现抽的，司机招募/物流货源广场共用）
const statsEl = useTemplateRef<HTMLElement>('statsEl')

const stats = computed(() =>
  siteConfig.hero.stats.map((stat) => {
    // noCount 的直接给 null，模板走终值分支——中间值说不通的（7 天 / 7×24）
    // 不能递增，0.9s 里「6 天 / 6×24」一闪而过像展示错了
    const m = stat.noCount ? null : stat.value.match(/^(\d+)(\D.*)$/)
    return { ...stat, count: m ? { num: Number(m[1]), rest: m[2] } : null }
  }),
)

// 能递增的条目初始就渲染 0（模板里拼 0 + 尾巴），不然页面先闪终值、
// 动画启动又跳回 0 重数，肉眼看是闪一下「7 天 → 0 天 → …」
// 滚动计数交给 useCountUp：露出一半再数，关动效/老浏览器直接填终值
useCountUp(statsEl)
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
            <!-- 第二行品牌橙强调。48px 大字按 WCAG 要 3:1，brand-500 只有 2.45，
                 用 brand-600（3.06）；再深就成砖色了，观感差 -->
            <span class="block mt-[5px] text-brand-600">{{ siteConfig.hero.titleAccent }}</span>
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

          <!-- 卖点胶囊：白底半透明 + 细描边，间距 10，内边距 上7 左12 右14。
               hover 的规格写在 .feature-pill 里，这里不留 transition 类名 -->
          <ul class="rise mt-[36px] flex flex-wrap gap-[10px]" :style="{ animationDelay: '280ms' }">
            <li
              v-for="feature in siteConfig.hero.features"
              :key="feature"
              class="feature-pill flex items-center gap-[8px] rounded-full border border-ink-100 bg-white/80 py-[7px] pl-[12px] pr-[14px] text-sm font-medium text-ink-700"
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

          <!-- 合规卡：改 DOM——烘焙文字的图片在缩放屏上必糊（4 倍源也救不回来），
               文字走浏览器渲染永远锐利。设计尺寸 188×63，左探 59、卡顶在看板顶上 47
               （= 导航栏下 20）；手机上收进看板左上角，不探出屏幕 -->
          <div
            class="pop-in absolute left-[10px] top-[-14px] z-10 flex h-[63px] w-[188px] items-center rounded-[10px] bg-white pl-[10px] shadow-[0_18px_36px_-18px_rgba(26,26,26,0.3)] ring-1 ring-black/5 lg:left-[-59px] lg:top-[-47px]"
            :style="{ animationDelay: '450ms' }"
          >
            <img
              :src="checkIcon"
              alt=""
              aria-hidden="true"
              class="h-[38px] w-[38px] shrink-0 select-none"
            />
            <div class="ml-[10px] min-w-0 whitespace-nowrap">
              <p class="text-[13px] font-semibold leading-none text-ink-900">合规校验通过</p>
              <p class="mt-[7px] text-[10px] leading-none text-ink-400">危化品运输资质已核验</p>
            </div>
          </div>

          <!-- 看板整卡：DOM 绘制（HomeWorkbench 组件）。
               relative 不能省：圆环是 absolute，普通流元素会被它盖住。
               圆角与投影必须挂在同一个元素上：投影是按这个元素的圆角矩形画的，
               卡片自己再画一个小一点的圆角，拐角外侧就会漏出一道白月牙（右下角那道白边）。
               内部 HomeWorkbench 用 rounded-[inherit] 跟随这里。
               hover 位移用 8px 不用 6px——6×1.25(缩放率)=7.5 物理像素，
               半像素位移会让文字被重采样，动画期间发虚发跳。
               这里不加 will-change：卡片里全是 10~13px 的小字，常驻合成层会让字变灰，
               只在过渡那 0.5s 里临时合成，跑完 Chrome 自己把层丢掉，字回到彩色描边 -->
          <div
            class="slide-in relative w-full overflow-hidden rounded-xl bg-[#eef2ef] shadow-[0_28px_70px_-24px_rgba(26,26,26,0.28)] transition-transform duration-500 ease-out hover:-translate-y-2 lg:rounded-2xl"
            :style="{ animationDelay: '150ms' }"
          >
            <HomeWorkbench />
          </div>

          <!-- 在途卡：同样改 DOM。设计 160×63，左探 120、底边贴看板底；
               手机上收进看板左下角 -->
          <div
            class="pop-in absolute bottom-[8px] left-[10px] z-10 flex h-[63px] w-[160px] items-center rounded-[10px] bg-white pl-[10px] shadow-[0_18px_36px_-18px_rgba(26,26,26,0.3)] ring-1 ring-black/5 lg:bottom-0 lg:left-[-120px]"
            :style="{ animationDelay: '550ms' }"
          >
            <img
              :src="truckIcon"
              alt=""
              aria-hidden="true"
              class="h-[38px] w-[38px] shrink-0 select-none"
            />
            <div class="ml-[10px] min-w-0 whitespace-nowrap">
              <p class="text-[13px] font-semibold leading-none text-ink-900">在途运输 12 辆</p>
              <p class="mt-[7px] text-[10px] leading-none text-ink-400">4 单待签收</p>
            </div>
          </div>
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
                '0' + stat.count.rest
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

/* pop-in 原来是 scale(0.92)：scale 动画会让 Chrome 按中间状态光栅化图层，
   播完缓存的糊纹理留在屏上（刷新后「先清晰后发糊」就是它）。
   改纯位移 + 淡入，观感接近（回弹曲线带一点落定感），但没有缩放重采样 */
@keyframes hero-pop {
  from {
    opacity: 0;
    transform: translateY(12px);
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

/* 卖点胶囊 hover：上浮 2px + 描边转浅橙 + 底转纯白 + 浮起一圈淡阴影。
   位移只给 2px —— 原来 4px 在 32px 高的胶囊上会把光标"抬"到盒子外面，
   贴边悬停时 hover 反复进出，看着是一跳一跳的。
   曲线用 0.4/0/0.2/1（起停都缓），不用 0.22/1/0.36/1：后者是强调"快出"的入场曲线，
   40ms 就跑完三分之二，小元素上看着像瞬间弹到位，反而是生硬感的来源。
   阴影画在伪元素上只过渡 opacity（和全局 .card-lift 同一套做法）：
   直接 transition box-shadow 每帧都要重绘，鼠标扫过整排时能看出掉帧 */
.feature-pill {
  position: relative;
  transition:
    transform 260ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 260ms ease,
    background-color 260ms ease;
}

.feature-pill::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit; /* 跟胶囊圆角走 */
  box-shadow: 0 8px 18px -6px rgba(33, 50, 43, 0.3);
  opacity: 0;
  transition: opacity 260ms ease;
  pointer-events: none;
}

.feature-pill:hover {
  transform: translateY(-2px);
  border-color: var(--color-brand-300);
  background-color: #fff;
}

.feature-pill:hover::after {
  opacity: 1;
}

/* 关了动效就别浮了：位移本身也是"动"，只留颜色变化 */
@media (prefers-reduced-motion: reduce) {
  .feature-pill,
  .feature-pill::after {
    transition: none;
  }

  .feature-pill:hover {
    transform: none;
  }
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
