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
 * 首屏 Hero（定稿原型 01 首页第一屏）
 *
 * 左侧文案用 HTML 写（可改文案、可被搜索引擎读到），右侧看板整块用设计稿导出的图，
 * 两张浮层卡单独叠在图上方——这样阴影和圆角跟设计稿完全一致，不用手画。
 * 底部是四条数字，用分隔线图片与上方内容隔开。
 */
</script>

<template>
  <!-- 首屏：relative 给装饰同心圆定位；overflow-hidden 裁掉超出视口的圆环。
       背景多层渐变见下方 .hero-bg（顶部暖橙 → 中段近白 → 左下薄荷绿），取自设计稿取色 -->
  <section id="home" class="hero-bg relative overflow-hidden">
    <!-- 右上装饰同心圆：设计稿导出的大图，纯装饰不进无障碍树；
         w-[46rem] 固定宽度，max-w-none 让它不被父级压缩，right/top 负值把圆心推到视口外 -->
    <img
      :src="ringsImg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -top-40 right-[-14rem] w-[52rem] max-w-none select-none lg:-top-56 lg:w-[64rem]"
    />

    <!-- 内容容器：与顶栏同一条左右基准线；上方留白给固定顶栏再留呼吸空间 -->
    <div class="container-page relative">
      <!-- 两栏：<1024px 上下堆叠（文案在前、看板在后），≥1024px 左文右图 -->
      <div class="grid items-center gap-14 pt-10 sm:pt-12 lg:grid-cols-2 lg:gap-10 lg:pt-16">
        <!-- 左列：胶囊 → 标题 → 说明 → 主按钮 → 三个卖点 -->
        <div>
          <!-- 法规对标胶囊：设计稿导出的整图（含圆角与描边），h-9 高 2.25rem，宽度随比例 -->
          <img :src="badgeImg" alt="对标 2026 版《危险化学品安全法》" class="h-9 w-auto" />

          <!-- 主标题：两行，第二行品牌橙；text-[40px]/[44px] 按设计稿标定，
               leading-[1.25] 防止大字号行距过松 -->
          <h1
            class="mt-5 text-[28px] font-bold leading-[1.25] tracking-tight text-ink-900 sm:text-4xl lg:text-[40px] xl:text-[44px]"
          >
            {{ siteConfig.hero.title }}
            <span class="block text-brand-500">{{ siteConfig.hero.titleAccent }}</span>
          </h1>

          <!-- 说明：max-w-[30rem] 控制每行约 26 字，读起来不累；ink-600 次级文字色 -->
          <p class="mt-5 max-w-[30rem] text-[15px] leading-relaxed text-ink-600 lg:text-base">
            {{ siteConfig.hero.desc }}
          </p>

          <!-- 主按钮：设计稿实测约 360×49（1440 基准），用固定宽度对齐而不是加内边距，
               避免与 BaseButton 的 lg 尺寸内边距类互相覆盖 -->
          <div class="mt-8">
            <BaseButton
              :href="siteConfig.contact.ctaHref"
              size="lg"
              class="w-full sm:w-auto lg:w-[22.5rem]"
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

        <!-- 右列：看板整图 + 两张浮层。
             整块是装饰性界面示意图，对读屏隐藏，避免念一堆表格数字 -->
        <div
          class="relative mx-auto w-full max-w-[34rem] sm:max-w-[38rem] lg:max-w-none"
          aria-hidden="true"
        >
          <!-- 「合规校验通过」浮层：设计稿实测左探出看板约 92px、上沿悬空约 65px（1440 基准） -->
          <img
            :src="complianceImg"
            alt=""
            class="absolute -left-3 -top-6 z-10 w-32 select-none sm:w-40 lg:-left-[5.75rem] lg:-top-16 lg:w-48"
          />

          <!-- 看板整图：rounded-xl 圆角 + 大范围柔和投影，浮起来但不抢文案的注意力 -->
          <img
            :src="workbenchImg"
            alt="威易达化工一体化平台工作台界面"
            class="w-full rounded-xl shadow-[0_28px_70px_-24px_rgba(26,26,26,0.28)] lg:rounded-2xl"
          />

          <!-- 「在途运输」浮层：设计稿实测左探出看板约 120px，底边与看板底对齐 -->
          <img
            :src="onTheWayImg"
            alt=""
            class="absolute -left-3 bottom-2 z-10 w-28 select-none sm:w-36 lg:-left-[7.5rem] lg:bottom-0 lg:w-44"
          />
        </div>
      </div>

      <!-- 底部数字条：分隔线用设计稿导出的渐变线（2 倍图，显示 2px） -->
      <div class="pb-8 pt-8 lg:pb-10 lg:pt-10">
        <img :src="dividerImg" alt="" aria-hidden="true" class="h-[2px] w-full" />

        <!-- 四列数字：手机两列，≥640px 一行四列；gap-y-6 给两列时留行距 -->
        <dl class="mt-7 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          <div v-for="stat in siteConfig.hero.stats" :key="stat.label">
            <!-- 数值：28px 加粗，7×24 这类短字符也不会显小 -->
            <dd class="text-2xl font-bold leading-none text-ink-900 lg:text-[28px]">
              {{ stat.value }}
            </dd>
            <!-- 标签：弱化灰，与数值拉开层级 -->
            <dt class="mt-2 text-sm text-ink-400">{{ stat.label }}</dt>
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
    radial-gradient(60rem 30rem at 85% -5%, rgba(255, 131, 63, 0.16), transparent 70%),
    radial-gradient(55rem 30rem at 0% 105%, rgba(47, 158, 110, 0.14), transparent 70%),
    linear-gradient(180deg, #fff1e6 0%, #fffbf7 45%, #fdfdfb 100%);
}
</style>
