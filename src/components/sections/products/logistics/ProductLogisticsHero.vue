<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 物流调度首屏：调度台演示卡
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import HeroCta from '@/components/ui/HeroCta.vue'
import { getPage, siteConfig } from '@/config/site'
import glowWarm from '@/assets/products/logistics/images/glow-warm.webp'
import ringOuter from '@/assets/products/logistics/images/ring-outer.webp'
import logoMark from '@/assets/products/logistics/icons/logo-mark.webp'

/**
 * 物流调度首屏（原型 Logistics Hero）：浅薄荷绿渐变背景 + 左文案 + 右调度台。
 * 右卡整体 DOM 重建（用户给的 Dispatch Mock.png 是烘焙文字位图，已删）：
 * 绿渐变侧栏（第一项白底选中态、货源广场挂 VIP）+ 主区五张白卡。
 * 徽标沿用站点既有绿/橙/灰三档浅底色。
 */
const page = getPage('/products/logistics')
const dash = siteConfig.logistics.heroDash

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 待办卡三枚计数徽标：绿 / 橙 / 灰，与待办行尾徽标共用这一套
type BadgeTone = (typeof dash.todo.badges)[number]['tone']

const badgeTone: Record<BadgeTone, string> = {
  green: 'bg-[#e2f3ea] text-[#1c8a66]',
  orange: 'bg-[#ffeede] text-[#e9611f]',
  gray: 'bg-[#f1f3f2] text-[#6b8077]',
}
</script>

<template>
  <!-- 首屏：薄荷绿到白的纵向渐变，上留白 64px、下 72px；overflow-hidden 裁掉探出去的圆环和光晕 -->
  <section
    ref="root"
    class="relative overflow-hidden bg-gradient-to-b from-[#e9f7f0] via-[#f4fcf8] to-white pb-[72px] pt-[64px]"
  >
    <!-- 背景圆环：右上 600px 宽、上探 -28px，压在调度台卡后面只露上弧；
         4s 一个来回放大 3.5% 做呼吸，lg 以下直接隐藏（infinite 动画由末尾 media query 关掉） -->
    <img
      :src="ringOuter"
      alt=""
      aria-hidden="true"
      class="breathe pointer-events-none absolute right-[140px] top-[-28px] hidden w-[600px] select-none lg:block"
    />
    <!-- 背景光晕：左下 400px 宽、下沉 -190px，暖橙色，垫在文字区底下 -->
    <img
      :src="glowWarm"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute bottom-[-190px] left-[140px] hidden w-[400px] select-none lg:block"
    />
    <div class="container-page relative">
      <!-- 两栏：手机单列 gap 48px；lg 右列 700px、xl 放宽到 780px（调度台五张卡要放得下） -->
      <div class="grid items-center gap-[48px] lg:grid-cols-[1fr_700px] xl:grid-cols-[1fr_780px]">
        <div>
          <!-- 眉题：12px/18px 加粗、字距 0.05em（sm 起 0.08em）、brand-500 橙 -->
          <p
            class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.05em] text-brand-500 sm:tracking-[0.08em]"
            style="--d: 0ms"
          >
            {{ page.eyebrow }}
          </p>

          <!-- 标题：mt-[16px] 与眉题间距 16px（md 18px）；手机 32px/44px、md 起 44px/56px -->
          <h1
            class="reveal mt-[16px] text-[32px] font-bold leading-[44px] text-ink-900 md:mt-[18px] md:text-[44px] md:leading-[56px]"
            style="--d: 80ms"
          >
            {{ page.title }}
          </h1>

          <!-- 说明：mt-[20px] 与标题间距 20px，max-w 520px；15px/28px 灰绿 -->
          <p
            class="reveal mt-[20px] max-w-[520px] text-[15px] leading-[28px] text-[#5e7169]"
            style="--d: 160ms"
          >
            {{ page.desc }}
          </p>

          <!-- 主按钮：mt-[32px] 与说明间距 32px -->
          <div class="reveal mt-[32px]" style="--d: 240ms">
            <HeroCta :label="siteConfig.logistics.ctaLabel" />
          </div>
        </div>

        <!-- 右列：调度台演示卡。悬停上浮 8px——不写 6px，6 换算物理像素是 7.5 的半像素，卡内小字会发虚；
             relative 不能省：细圆环是 absolute，非定位元素会被它画穿 -->
        <article
          class="reveal relative flex overflow-hidden rounded-[16px] bg-white shadow-[0_24px_60px_-24px_rgba(19,50,42,0.28)] ring-1 ring-black/5 transition-transform duration-500 ease-out hover:-translate-y-2"
          style="--d: 200ms"
        >
          <!-- 侧栏：绿渐变 116px 宽，内边距 px 10 / py 16，菜单竖排 gap 4px；
               窄屏（sm 以下）整条藏掉，把宽度让给主区 -->
          <aside
            class="hidden w-[116px] shrink-0 flex-col bg-gradient-to-b from-[#3ec795] to-[#27a276] px-[10px] py-[16px] sm:flex"
          >
            <!-- 品牌区：34×34 白色圆角块放产品 logo（104px 源图缩到 24px 会发虚，铺到 34px 下采样倍数更小更锐），
                 块下产品名 13px + 副标 10px -->
            <div class="flex flex-col items-center">
              <span class="block h-[34px] w-[34px] overflow-hidden rounded-[9px] bg-white">
                <img :src="logoMark" alt="" aria-hidden="true" class="h-full w-full object-cover" />
              </span>
              <p class="mt-[8px] text-[13px] font-bold leading-[18px] text-white">
                {{ dash.brand }}
              </p>
              <p class="mt-[2px] text-[10px] leading-[14px] text-white/70">{{ dash.brandSub }}</p>
            </div>

            <!-- 菜单：mt-[18px] 起、竖排 gap 4px；第一项白底选中态，其余半透明白字 -->
            <nav class="mt-[18px] flex flex-col gap-[4px]">
              <span
                v-for="(menu, i) in dash.menus"
                :key="menu.label"
                class="flex items-center gap-[7px] rounded-[8px] px-[9px] py-[6px] text-[11px] leading-[16px] whitespace-nowrap"
                :class="
                  i === 0 ? 'bg-white font-semibold text-[#1c8a66] shadow-sm' : 'text-white/85'
                "
              >
                <!-- 菜单圆点：6×6、2px 圆角小方块，选中态深绿、其余半透明白 -->
                <span
                  class="h-[6px] w-[6px] shrink-0 rounded-[2px]"
                  :class="i === 0 ? 'bg-[#2fae85]' : 'bg-white/50'"
                />
                {{ menu.label }}
                <!-- VIP 徽标：橙底白字 8px，挂在「货源广场」后面 -->
                <span
                  v-if="menu.vip"
                  class="rounded-[4px] bg-[#ff6a2b] px-[4px] py-[1px] text-[8px] font-bold leading-[11px] text-white"
                >
                  {{ dash.vipLabel }}
                </span>
              </span>
            </nav>
          </aside>

          <!-- 主区：浅灰绿底 #f6f8f7，内边距 14px，里面五张白卡统一 mt-[10px] -->
          <div class="flex-1 bg-[#f6f8f7] p-[14px]">
            <!-- 顶栏：左右两端对齐，左侧标题 13px、右侧小字 11px -->
            <div class="flex items-center justify-between px-[4px]">
              <span class="text-[13px] font-semibold leading-[18px] text-[#13322a]">{{
                dash.topbarLeft
              }}</span>
              <span class="text-[11px] leading-[16px] text-[#8aa094]">{{ dash.topbarRight }}</span>
            </div>

            <!-- 欢迎卡：mt-[10px] 起，34px 浅绿圆底头像 + 姓名 / 问候语两行 -->
            <div
              class="mt-[10px] flex items-center gap-[10px] rounded-[10px] bg-white px-[14px] py-[10px]"
            >
              <span
                class="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7f3ec] text-[13px] font-semibold text-[#1c8a66]"
              >
                {{ dash.welcome.avatar }}
              </span>
              <div>
                <p class="text-[13px] font-semibold leading-[18px] text-[#13322a]">
                  {{ dash.welcome.name }}
                </p>
                <p class="mt-[1px] text-[11px] leading-[16px] text-[#8aa094]">
                  {{ dash.welcome.hello }}
                </p>
              </div>
            </div>

            <!-- 合作运单：mt-[10px] 起，标题前 8px 绿方块；右上「本月 / 本年」页签，四项统计 gap 8px -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center justify-between">
                <span
                  class="flex items-center gap-[7px] text-[13px] font-semibold leading-[18px] text-[#13322a]"
                >
                  <span class="h-[8px] w-[8px] rounded-[2px] bg-[#2fae85]" />
                  {{ dash.coop.title }}
                </span>
                <span class="text-[11px] leading-[16px]">
                  <span class="font-medium text-[#1c8a66]">{{ dash.period.active }}</span>
                  <span class="ml-[10px] text-[#8aa094]">{{ dash.period.idle }}</span>
                </span>
              </div>
              <!-- 统计：mt-[8px] 起、四列；数值 18px/24px 加粗 + 等宽数字 -->
              <div class="mt-[8px] grid grid-cols-4 gap-[8px]">
                <div v-for="stat in dash.coop.stats" :key="stat.label">
                  <p class="text-[11px] leading-[16px] text-[#8aa094]">{{ stat.label }}</p>
                  <p
                    class="mt-[2px] text-[18px] font-bold leading-[24px] tabular-nums text-[#13322a]"
                  >
                    {{ stat.value }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 非合作运单：结构同上，三项统计；标题前的点色浅一档，跟上一张区分 -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center justify-between">
                <span
                  class="flex items-center gap-[7px] text-[13px] font-semibold leading-[18px] text-[#13322a]"
                >
                  <span class="h-[8px] w-[8px] rounded-[2px] bg-[#86d8b9]" />
                  {{ dash.nonCoop.title }}
                </span>
                <span class="text-[11px] leading-[16px]">
                  <span class="font-medium text-[#1c8a66]">{{ dash.period.active }}</span>
                  <span class="ml-[10px] text-[#8aa094]">{{ dash.period.idle }}</span>
                </span>
              </div>
              <div class="mt-[8px] grid grid-cols-3 gap-[8px]">
                <div v-for="stat in dash.nonCoop.stats" :key="stat.label">
                  <p class="text-[11px] leading-[16px] text-[#8aa094]">{{ stat.label }}</p>
                  <p
                    class="mt-[2px] text-[18px] font-bold leading-[24px] tabular-nums text-[#13322a]"
                  >
                    {{ stat.value }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 待办：mt-[10px] 起，标题后跟三枚计数徽标；下面两条待办行，行间 gap 6px -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center gap-[8px]">
                <span class="text-[13px] font-semibold leading-[18px] text-[#13322a]">{{
                  dash.todo.title
                }}</span>
                <!-- 计数徽标：10px/14px，rounded 6px，配色走 badgeTone -->
                <span
                  v-for="badge in dash.todo.badges"
                  :key="badge.label"
                  class="rounded-[6px] px-[8px] py-[2px] text-[10px] leading-[14px]"
                  :class="badgeTone[badge.tone]"
                >
                  {{ badge.label }} {{ badge.count }}
                </span>
              </div>
              <!-- 待办行：mt-[8px] 起，浅绿底 rounded 8px，左单号 + 路线、右状态徽标 -->
              <div class="mt-[8px] flex flex-col gap-[6px]">
                <div
                  v-for="row in dash.todo.rows"
                  :key="row.no"
                  class="flex items-center justify-between rounded-[8px] bg-[#f6f9f7] px-[12px] py-[7px]"
                >
                  <div>
                    <p class="text-[12px] font-medium leading-[17px] text-[#13322a]">
                      {{ row.no }}
                    </p>
                    <p class="mt-[1px] text-[10px] leading-[14px] text-[#8aa094]">
                      {{ row.route }}
                    </p>
                  </div>
                  <span
                    class="rounded-[6px] px-[8px] py-[2px] text-[10px] leading-[14px]"
                    :class="badgeTone[row.tone]"
                  >
                    {{ row.badge }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 今日货源简讯：mt-[10px] 起，右上「更多」链接 10px；两行线路 + 货类吨位，行距 3px -->
            <div class="mt-[10px] rounded-[10px] bg-white px-[14px] py-[12px]">
              <div class="flex items-center justify-between">
                <span class="text-[13px] font-semibold leading-[18px] text-[#13322a]">{{
                  dash.brief.title
                }}</span>
                <span class="text-[10px] leading-[14px] text-[#8aa094]">{{ dash.brief.more }}</span>
              </div>
              <div class="mt-[6px]">
                <div
                  v-for="row in dash.brief.rows"
                  :key="row.route"
                  class="flex items-center justify-between py-[3px]"
                >
                  <span class="text-[11px] leading-[16px] text-[#3d574d]">{{ row.route }}</span>
                  <span class="text-[10px] leading-[14px] text-[#8aa094]">{{ row.meta }}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
</style>
