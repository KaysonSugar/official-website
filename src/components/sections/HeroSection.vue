<script setup lang="ts">
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
 * 实测基准（1440 稿）：文案区 660×426、看板 596×462、合规卡 189×63、在途卡 160×63、
 * 数字条 1280×62；两列列距 24px，看板右缘贴容器右边线。
 * 浮层卡素材自带透明边距（上 55 / 左右 15 / 下 15 @2x），定位时已按显示尺寸折算。
 */
</script>

<template>
  <!-- 首屏：relative 给装饰同心圆定位；overflow-hidden 裁掉超出视口的圆环。
       背景多层渐变见下方 .hero-bg（顶部暖橙 → 中段近白 → 左下薄荷绿），取自设计稿取色 -->
  <section id="home" class="hero-bg relative overflow-hidden">
    <!-- 右上装饰同心圆：设计稿导出的大图，纯装饰不进无障碍树。
         实测圆心约在 (1250, 370)、外圈半径约 550 → 图宽 1088、圆心对位偏移 right/-top 各负值 -->
    <img
      :src="ringsImg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 right-[-14rem] w-[52rem] max-w-none select-none lg:-top-[10.9rem] lg:right-[-22rem] lg:w-[68rem]"
    />

    <!-- 内容容器：与顶栏同一条左右基准线 -->
    <div class="container-page relative">
      <!-- 两栏：实测 660:596 ≈ 11:10，列距 24px；看板顶 y=77 → 顶部留白 76px；
           <1024px 上下堆叠（文案在前、看板在后） -->
      <div
        class="grid items-start gap-14 pt-10 sm:pt-12 lg:grid-cols-[11fr_10fr] lg:gap-6 lg:pt-[4.75rem]"
      >
        <!-- 左列：胶囊 → 标题 → 说明 → 主按钮 → 三个卖点（整块 660×426）。
             顶部比看板低 8px（实测 84 vs 77），用 mt-2 补齐 -->
        <div class="lg:mt-2">
          <!-- 法规对标胶囊：素材 924×128，显示高 32px 时宽 231 ≈ 实测 236 -->
          <img :src="badgeImg" alt="对标 2026 版《危险化学品安全法》" class="h-8 w-auto" />

          <!-- 主标题：实测字号 48px（单字格高 45）、行距 73px → leading-[1.5]；
               第二行品牌橙 -->
          <h1
            class="mt-7 text-[28px] font-bold leading-[1.35] text-ink-900 sm:text-4xl lg:text-[48px] lg:leading-[1.5]"
          >
            {{ siteConfig.hero.title }}
            <span class="block text-brand-500">{{ siteConfig.hero.titleAccent }}</span>
          </h1>

          <!-- 说明：实测行宽约 590px（max-w-[37rem]）、行距 26px → leading-[1.65] -->
          <p
            class="mt-6 max-w-[37rem] text-[15px] leading-relaxed text-ink-600 lg:text-base lg:leading-[1.65]"
          >
            {{ siteConfig.hero.desc }}
          </p>

          <!-- 主按钮：实测 358×50 → 宽 22.5rem、高 3.125rem（覆盖 lg 尺寸的 py） -->
          <div class="mt-7">
            <BaseButton
              :href="siteConfig.contact.ctaHref"
              size="lg"
              class="w-full sm:w-auto lg:h-[3.125rem] lg:w-[22.5rem]"
            >
              {{ siteConfig.hero.primaryCta }}
            </BaseButton>
          </div>

          <!-- 三个卖点胶囊：白底半透明 + 细描边，绿色对勾用内联 SVG（跟品牌橙区分开） -->
          <ul class="mt-7 flex flex-wrap gap-2.5">
            <li
              v-for="feature in siteConfig.hero.features"
              :key="feature"
              class="flex items-center gap-2 rounded-full border border-ink-100 bg-white/80 py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-ink-700"
            >
              <!-- 对勾：绿色圆底 + 白色勾，h-5 w-5 与 13px 文字视觉重心齐平 -->
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2f9e6e]"
                aria-hidden="true"
              >
                <svg class="h-3 w-3" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6.2 4.8 8.5 9.5 3.8"
                    stroke="white"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              {{ feature }}
            </li>
          </ul>
        </div>

        <!-- 右列：看板整图（596×462）+ 两张浮层。
             整块是装饰性界面示意图，对读屏隐藏，避免念一堆表格数字 -->
        <div
          class="relative mx-auto w-full max-w-[34rem] sm:max-w-[38rem] lg:mt-0 lg:max-w-none"
          aria-hidden="true"
        >
          <!-- 「合规校验通过」浮层：实测 189×63，左探看板 66px、底边贴看板顶边。
               素材 980×516（内容 950×446，上边距 55@2x）→ 显示宽 195px，
               定位再外扩内容边距：left -69、top -76 -->
          <img
            :src="complianceImg"
            alt=""
            class="absolute -left-2 -top-6 z-10 w-32 select-none sm:w-40 lg:-left-[4.3rem] lg:-top-[4.75rem] lg:w-[195px]"
          />

          <!-- 看板整图：圆角 + 大范围柔和投影，浮起来但不抢文案的注意力 -->
          <img
            :src="workbenchImg"
            alt="威易达化工一体化平台工作台界面"
            class="w-full rounded-xl shadow-[0_28px_70px_-24px_rgba(26,26,26,0.28)] lg:rounded-2xl"
          />

          <!-- 「在途运输」浮层：实测 160×63，左探看板 126px、底边与看板底对齐。
               素材 864×516（内容 834×446）→ 显示宽 166px，left -128、bottom -2 -->
          <img
            :src="onTheWayImg"
            alt=""
            class="absolute -left-2 bottom-2 z-10 w-28 select-none sm:w-36 lg:-left-32 lg:-bottom-0.5 lg:w-[166px]"
          />
        </div>
      </div>

      <!-- 分隔线：距看板底约 4px；下方数字条与分隔线间距实测约 60px -->
      <div class="pb-10 lg:mt-1 lg:pb-10">
        <img :src="dividerImg" alt="" aria-hidden="true" class="h-[2px] w-full" />

        <!-- 四条数字：实测整块 1280×62，两端对齐（首列贴左、末列贴右）；
             手机两列网格，≥640px 转一行 flex 两端对齐 -->
        <dl
          class="mt-8 grid grid-cols-2 gap-y-6 sm:mt-12 sm:flex sm:flex-wrap sm:justify-between sm:gap-x-8 sm:gap-y-6 lg:mt-[3.75rem]"
        >
          <div v-for="stat in siteConfig.hero.stats" :key="stat.label">
            <!-- 数值：实测字格高 18 → 字号 24px 加粗 -->
            <dd class="text-2xl font-bold leading-none text-ink-900">{{ stat.value }}</dd>
            <!-- 标签：13px 弱化灰，与数值拉开层级 -->
            <dt class="mt-2.5 text-[13px] text-ink-400">{{ stat.label }}</dt>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 首屏背景：三层叠加，颜色从设计稿像素取样。
   顺序 = 上层到下层：右上浓橙光晕 → 左下薄荷绿光晕 → 纵向暖橙到近白的底色。
   写原生 CSS 而不是 Tailwind，是因为多层 radial-gradient 用工具类表达会很长，也不好读出意图 */
.hero-bg {
  background:
    radial-gradient(60rem 32rem at 88% -8%, rgba(255, 131, 63, 0.26), transparent 68%),
    radial-gradient(55rem 30rem at 0% 108%, rgba(47, 158, 110, 0.16), transparent 70%),
    linear-gradient(180deg, #fff1e6 0%, #fffbf7 45%, #fdfdfb 100%);
}
</style>
