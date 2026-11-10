<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页首屏
-->
<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import HeroCta from '@/components/ui/HeroCta.vue'
import { useCountUp } from '@/composables/useCountUp'
import { useLeaveConfirm } from '@/composables/useLeaveConfirm'
import { siteConfig } from '@/config/site'
import HomeWorkbench from './HomeWorkbench.vue'
import truckIcon from '@/assets/home/images/hero-truck.webp'
import checkIcon from '@/assets/home/images/hero-check.webp'
import ringsImg from '@/assets/home/images/rings.webp'
import ringsSm from '@/assets/home/images/rings-950.webp'
import dividerImg from '@/assets/home/images/hero-bottom-divider.webp'

// 法规外链与离开确认：胶囊点击先弹全站确认层（App.vue 挂的 LeaveConfirmModal），
// 确认后才开新标签，避免用户误点跳出官网
const LAW_URL = 'https://www.12371.cn/2025/12/28/ARTI1766892782459341.shtml'
const { openLeaveConfirm } = useLeaveConfirm()

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
  <!-- 首屏：relative 给装饰元素定位，overflow-hidden 裁掉探出视口的圆环，背景渐变见末尾 .hero-bg -->
  <section id="home" class="hero-bg relative overflow-hidden">
    <!-- container-page：内容宽度上限 + 左右留白，和顶栏同一条基准线 -->
    <div class="container-page relative">
      <!-- 栅格：手机单列 gap 56px；lg(≥1024) 分两栏 11:10、列距 24px、上留白 67px -->
      <div
        class="grid items-start gap-[56px] pt-[40px] sm:pt-[48px] lg:grid-cols-[11fr_10fr] lg:gap-[24px] lg:pt-[67px]"
      >
        <!-- 左列：lg 下整体下移 10px（lg:mt-[10px]），让左列底和看板底齐平 -->
        <div class="lg:mt-[10px]">
          <!-- 胶囊容器：relative inline-block 收窄到内容宽，右侧提示靠它定位；
               group 供子元素用 group-hover 联动 -->
          <div class="rise group relative inline-block" :style="{ animationDelay: '0ms' }">
            <!-- 胶囊：inline-flex 横排，h-8 高 32px，gap 8px 圆点与文字间距，rounded-full 全圆角，
                 pl 12 / pr 14 内边距，13px 字号；hover 描边、底色各深一档 -->
            <a
              :href="LAW_URL"
              class="inline-flex h-8 items-center gap-[8px] rounded-full border border-[#ffd8bf] bg-[#fff1e8] pl-[12px] pr-[14px] text-[13px] font-medium leading-none text-[#c4520f] transition-colors duration-200 hover:border-[#f2a25c] hover:bg-[#ffeadb]"
              @click.prevent="openLeaveConfirm(LAW_URL, siteConfig.hero.leaveTip)"
            >
              <span class="h-[6px] w-[6px] rounded-full bg-[#2fb188]" aria-hidden="true" />
              {{ siteConfig.hero.badge }}
            </a>

            <!-- 提示字：absolute 定位到胶囊右外 10px，top-1/2 + -translate-y-1/2 垂直居中，
                 11px 灰字；pointer-events-none 不挡点击，group-hover 变品牌橙 -->
            <span
              class="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 inline-flex -translate-y-1/2 items-center gap-[3px] whitespace-nowrap text-[11px] leading-none text-ink-400 transition-colors duration-200 group-hover:text-brand-500"
              aria-hidden="true"
            >
              {{ siteConfig.hero.badgeHint }}
              <svg class="h-[9px] w-[9px]" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2.5 7.5 7.2 2.8M7.2 2.8H3.6M7.2 2.8v3.6"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </div>

          <!-- 标题：手机 28px/1.35，sm 36px，lg 48px/1.5；mt-[30px] 与胶囊间距 30px -->
          <h1
            class="rise mt-[30px] text-[28px] font-bold leading-[1.35] text-ink-900 sm:text-4xl lg:text-[48px] lg:leading-[1.5]"
            :style="{ animationDelay: '70ms' }"
          >
            {{ siteConfig.hero.title }}
            <!-- 第二行：block 独占一行，mt-[5px] 两行间距 5px，brand-600 橙（对比度 3.06 达标） -->
            <span class="block mt-[5px] text-brand-600">{{ siteConfig.hero.titleAccent }}</span>
          </h1>

          <!-- 说明：mt-[40px] 与标题间距 40px，max-w-[592px] 一行最宽 592px，15px/1.65（lg 16px） -->
          <p
            class="rise mt-[40px] max-w-[592px] text-[15px] leading-relaxed text-ink-600 lg:text-base lg:leading-[1.65]"
            :style="{ animationDelay: '140ms' }"
          >
            {{ siteConfig.hero.desc }}
          </p>

          <!-- 主按钮：mt-[30px] 与说明间距 30px -->
          <div class="rise mt-[30px]" :style="{ animationDelay: '210ms' }">
            <HeroCta :label="siteConfig.hero.primaryCta" />
          </div>

          <!-- 卖点列表：mt-[36px] 与按钮间距 36px，flex-wrap 换行，gap-[10px] 胶囊间距；
               li 白底 80%、ink-100 描边，py 7 / pl 12 / pr 14，hover 规格写在 .feature-pill -->
          <ul class="rise mt-[36px] flex flex-wrap gap-[10px]" :style="{ animationDelay: '280ms' }">
            <li
              v-for="feature in siteConfig.hero.features"
              :key="feature"
              class="feature-pill flex items-center gap-[8px] rounded-full border border-ink-100 bg-white/80 py-[7px] pl-[12px] pr-[14px] text-sm font-medium text-ink-700"
            >
              <!-- 对勾：14px 见方，shrink-0 不被文字挤压 -->
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

        <!-- 右列：relative 给两张浮层卡定位；mx-auto 居中，max-w 手机 544 / sm 608，lg 不限宽；
             整块是示意图，aria-hidden 对读屏隐藏 -->
        <div
          class="relative mx-auto w-full max-w-[544px] sm:max-w-[608px] lg:mt-0 lg:max-w-none"
          aria-hidden="true"
        >
          <!-- 同心圆：absolute + 百分比（left -16.9%、top -37.1%、宽 134.2%）跟着看板等比缩放；
               max-w-none 抵消 preflight 的 img max-width:100%，否则会被钳到列宽。
               桌面最大显示 832px、手机约 470px；1x 和手机 2x 都吃 950w 那份（64KB），
               只有桌面 2x 才下 1660w 原图 -->
          <img
            :src="ringsSm"
            :srcset="`${ringsSm} 950w, ${ringsImg} 1660w`"
            sizes="(min-width:1024px) 832px, 470px"
            alt=""
            aria-hidden="true"
            class="breathe pointer-events-none absolute left-[-16.9%] top-[-37.1%] w-[134.2%] max-w-none select-none"
          />

          <!-- 合规卡：手机贴看板左上（left 10 / top -14），lg 探出左外 59px、上 47px；
               h 63 / w 188 固定尺寸，rounded 10px，pl 10，ring-1 一圈 5% 黑描边 -->
          <div
            class="pop-in absolute left-[10px] top-[-14px] z-10 flex h-[63px] w-[188px] items-center rounded-[10px] bg-white pl-[10px] shadow-[0_18px_36px_-18px_rgba(26,26,26,0.3)] ring-1 ring-black/5 lg:left-[-59px] lg:top-[-47px]"
            :style="{ '--pop-d': '450ms' }"
          >
            <img
              :src="checkIcon"
              alt=""
              aria-hidden="true"
              class="h-[38px] w-[38px] shrink-0 select-none"
            />
            <div class="ml-[10px] min-w-0 whitespace-nowrap">
              <p class="text-[13px] font-semibold leading-none text-ink-900">
                {{ siteConfig.hero.floats.compliance.title }}
              </p>
              <p class="mt-[7px] text-[10px] leading-none text-ink-400">
                {{ siteConfig.hero.floats.compliance.desc }}
              </p>
            </div>
          </div>

          <!-- 看板卡片：relative 让卡片压住圆环（圆环是 absolute）；rounded-xl/2xl 圆角 +
               overflow-hidden 裁内部（HomeWorkbench 用 rounded-[inherit] 跟随）；
               transition-transform 500ms，hover:-translate-y-2 上浮 8px（6px 是半像素会糊字）；
               不加 will-change，10~13px 小字常驻合成层会变灰 -->
          <div
            class="slide-in relative w-full overflow-hidden rounded-xl bg-[#eef2ef] shadow-[0_28px_70px_-24px_rgba(26,26,26,0.28)] transition-transform duration-500 ease-out hover:-translate-y-2 lg:rounded-2xl"
            :style="{ animationDelay: '150ms' }"
          >
            <HomeWorkbench />
          </div>

          <!-- 在途卡：手机 bottom 8 / left 10 贴看板左下，lg 探出左外 120px 并贴底；h 63 / w 160 -->
          <div
            class="pop-in absolute bottom-[8px] left-[10px] z-10 flex h-[63px] w-[160px] items-center rounded-[10px] bg-white pl-[10px] shadow-[0_18px_36px_-18px_rgba(26,26,26,0.3)] ring-1 ring-black/5 lg:bottom-0 lg:left-[-120px]"
            :style="{ '--pop-d': '550ms' }"
          >
            <img
              :src="truckIcon"
              alt=""
              aria-hidden="true"
              class="h-[38px] w-[38px] shrink-0 select-none"
            />
            <div class="ml-[10px] min-w-0 whitespace-nowrap">
              <p class="text-[13px] font-semibold leading-none text-ink-900">
                {{ siteConfig.hero.floats.transit.title }}
              </p>
              <p class="mt-[7px] text-[10px] leading-none text-ink-400">
                {{ siteConfig.hero.floats.transit.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 下半段：手机 pb 40px；lg 距看板 34px、底部留 50px；分隔线 h-[2px] 通栏 -->
      <div class="pb-[40px] lg:mt-[34px] lg:pb-[50px]">
        <img :src="dividerImg" alt="" aria-hidden="true" class="h-[2px] w-full" />

        <!-- 数字条：手机两列、行距 24px；sm 起 flex 一行 justify-between 两端对齐；
             tabular-nums 等宽数字，递增时不左右抖 -->
        <dl
          ref="statsEl"
          class="rise mt-[32px] grid grid-cols-2 gap-y-[24px] sm:mt-[48px] sm:flex sm:flex-wrap sm:justify-between sm:gap-x-[32px] sm:gap-y-[24px] lg:mt-[38px] [font-variant-numeric:tabular-nums]"
          :style="{ animationDelay: '350ms' }"
        >
          <!-- 每项：flex-col-reverse 让数值排在标签上方（dl 里 dt 必须写在前面） -->
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse">
            <!-- 标签：13px ink-400，mt-[10px] 与数值间距 10px -->
            <dt class="mt-[10px] text-[13px] text-ink-400">{{ stat.label }}</dt>
            <!-- 数值：text-2xl 即 24px、加粗、无行距；data-* 给 useCountUp 传目标值和尾巴 -->
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
  animation: hero-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) var(--pop-d, 0ms) backwards;
}

.pop-in::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 22px 44px -16px rgba(26, 26, 26, 0.35);
  opacity: 0.45;
  animation: hero-shadow 4s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes hero-shadow {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pop-in::after {
    animation: none;
  }
}

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

.hero-bg {
  background:
    radial-gradient(960px 512px at 88% -8%, rgba(255, 131, 63, 0.26), transparent 68%),
    radial-gradient(880px 480px at 0% 108%, rgba(47, 158, 110, 0.16), transparent 70%),
    linear-gradient(180deg, #fff1e6 0%, #fffbf7 45%, #fdfdfb 100%);
}
</style>
