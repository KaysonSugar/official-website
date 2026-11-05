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
 * 桌面端：一条从灰绿渐变到绿的横轴，单数节点白卡挂上方、双数挂下方，
 * 07 是深绿卡，轴末端右下角一个「验收之后」浅绿盒。
 * 轴上的橙是 #f5821f，比全站品牌橙 #ff833f 深一档，照原型采的色，别混用。
 * 窄屏（lg 以下）退化为竖向时间线：点在左、卡在右，顺序不变。
 */
const { process } = siteConfig.support

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 深绿卡和白卡的底色别写在一起：bg-white 和 bg-[#13322a] 同时挂在元素上，
// 生效哪个看样式表顺序，不可靠，所以底色整个走三目
const cardBg = (dark?: boolean) => (dark ? 'bg-[#13322a]' : 'bg-white')
</script>

<template>
  <!-- 浅灰绿底，跟白色第二屏和第四屏隔开层次 -->
  <section ref="root" class="bg-[#f4f8f5] py-[96px]">
    <div class="container-page">
      <!-- 眉题：绿色是这一屏的特例 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-[#2fb188] sm:tracking-[0.2em]"
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

      <p class="reveal mt-[24px] max-w-[820px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ process.desc }}
      </p>

      <!-- ============ 桌面端：横向交错时间轴（lg 起） ============ -->
      <div class="relative mt-[56px] hidden lg:block">
        <!-- 横轴：左灰右绿的渐变，向右伸出容器一点接箭头；z 在圆点之下 -->
        <div
          class="absolute left-0 right-0 top-[153px] z-0 h-[3px] rounded-full bg-gradient-to-r from-[#dfe0d4] via-[#c4e4d5] via-55% to-[#2fb188]"
          aria-hidden="true"
        />
        <!-- 轴末端箭头：三角形，贴在渐变线右端（只敢伸 14px，lg 临界宽度下再宽就出滚动条） -->
        <svg
          class="absolute right-[-14px] top-[147px] z-0 h-[15px] w-[16px]"
          viewBox="0 0 16 15"
          fill="none"
          aria-hidden="true"
        >
          <path d="M0 7.5h11M11 7.5 6.8 2.4M11 7.5l-4.2 5.1" stroke="#2fb188" stroke-width="2.4" stroke-linecap="round" />
        </svg>

        <!-- 七列：每列上槽(卡) + 圆点 + 下槽(卡/绿盒) -->
        <div class="grid grid-cols-7 gap-[14px]">
          <div v-for="(step, i) in process.steps" :key="step.no" class="flex flex-col items-center">
            <!-- 上槽：单数节点（i 为偶数）的卡贴着轴线，空槽也占高保持对称 -->
            <div class="flex h-[140px] w-full flex-col items-center justify-end">
              <template v-if="i % 2 === 0">
                <article
                  class="reveal w-full rounded-[14px] p-[16px]"
                  :class="cardBg(step.dark)"
                  :style="{ '--d': `${240 + i * 70}ms` }"
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
                  <p class="mt-[6px] text-[13px] leading-[19px]" :class="step.dark ? 'text-[#9db2a9]' : 'text-[#7a8a82]'">
                    {{ step.desc }}
                  </p>
                </article>
                <!-- 竖向连接短线：卡底到圆点 -->
                <span class="h-[14px] w-px shrink-0 bg-[#d2e1d7]" aria-hidden="true" />
              </template>
            </div>

            <!-- 圆点：01-06 白底橙字，07 深绿底白字；白底把轴线盖断 -->
            <span
              class="reveal z-10 flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
              :class="step.dark ? 'bg-[#13322a] text-white' : 'bg-white text-[#f5821f]'"
              :style="{ '--d': `${240 + i * 70}ms` }"
            >
              {{ step.no }}
            </span>

            <!-- 下槽：双数节点；第 7 列的下槽放「验收之后」绿盒 -->
            <div class="flex h-[140px] w-full flex-col items-center justify-start">
              <template v-if="i % 2 === 1">
                <span class="h-[14px] w-px shrink-0 bg-[#d2e1d7]" aria-hidden="true" />
                <article
                  class="reveal w-full rounded-[14px] bg-white p-[16px]"
                  :style="{ '--d': `${240 + i * 70}ms` }"
                >
                  <p class="text-[14px] font-bold leading-[18px] tracking-[0.04em] text-[#f5821f]">{{ step.no }}</p>
                  <h3 class="mt-[8px] text-[16px] font-bold leading-[22px] text-ink-900">{{ step.title }}</h3>
                  <p class="mt-[6px] text-[13px] leading-[19px] text-[#7a8a82]">{{ step.desc }}</p>
                </article>
              </template>
              <template v-else-if="i === process.steps.length - 1">
                <span class="h-[14px] w-px shrink-0 bg-[#d2e1d7]" aria-hidden="true" />
                <div
                  class="reveal w-full rounded-[14px] bg-[#e7f3ec] p-[16px]"
                  :style="{ '--d': `${240 + i * 70 + 120}ms` }"
                >
                  <p class="text-[13px] font-bold leading-[18px] text-[#2fb188]">{{ process.afterLabel }}</p>
                  <p class="mt-[8px] text-[13px] leading-[20px] text-[#3f6b5a]">{{ process.afterText }}</p>
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
            <h3 class="mt-[6px] text-[16px] font-bold leading-[22px]" :class="step.dark ? 'text-white' : 'text-ink-900'">
              {{ step.title }}
            </h3>
            <p class="mt-[4px] text-[13px] leading-[19px]" :class="step.dark ? 'text-[#9db2a9]' : 'text-[#7a8a82]'">
              {{ step.desc }}
            </p>
          </article>
        </li>
        <!-- 验收之后：竖线末尾追加一个绿盒 -->
        <li class="reveal relative flex gap-[16px]" :style="{ '--d': `${240 + process.steps.length * 70}ms` }">
          <span class="z-10 mt-[2px] h-[27px] w-[27px] shrink-0 rounded-full bg-[#e7f3ec]" aria-hidden="true" />
          <div class="flex-1 rounded-[14px] bg-[#e7f3ec] p-[16px]">
            <p class="text-[13px] font-bold leading-[18px] text-[#2fb188]">{{ process.afterLabel }}</p>
            <p class="mt-[6px] text-[13px] leading-[20px] text-[#3f6b5a]">{{ process.afterText }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
