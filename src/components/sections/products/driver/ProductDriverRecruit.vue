<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.05
 * @Name: 司机端第五屏：司机招募
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useCountUp } from '@/composables/useCountUp'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import recruitTruck from '@/assets/products/driver/images/recruit-truck.webp'
import qrDownload from '@/assets/products/driver/images/qr-download.png'

/**
 * 司机招募（原型 F）：薄荷绿大圆角容器，左文案右插画。
 * 三个统计数字是品牌绿，二维码直接裸放（白卡描边去掉后不裹壳）。
 * 进场动画：容器不做整体 reveal，内部按眉标→标题→描述→统计→二维码逐层递进 ~80ms；
 * 统计数字滚到视口再从 0 数上去（useCountUp，与首页 hero 同节奏）。
 */
const { recruit } = siteConfig.driver

// 拆数字和尾巴：「1500+」→ num 1500 / rest「+」，「0 元」→ num 0 / rest「 元」。
// 拆不动的（纯文字）直接原样渲染，不进 count-up
const statsView = recruit.stats.map((stat) => {
  const m = /^(\d+)(.*)$/.exec(stat.value)
  return m
    ? { num: m[1], rest: m[2], label: stat.label }
    : { num: null, rest: stat.value, label: stat.label }
})

const root = useTemplateRef<HTMLElement>('root')
const statsEl = useTemplateRef<HTMLElement>('stats')
useReveal(root)
useCountUp(statsEl)
</script>

<template>
  <section ref="root" class="bg-white pb-[96px]">
    <div class="container-page">
      <!-- 薄荷绿大容器：不做整体 reveal，进场交给内部元素逐层浮（容器先动整体会糊成一块） -->
      <div
        class="grid items-center gap-[40px] rounded-[24px] bg-[#e9f5ef] p-[40px] md:p-[56px] lg:grid-cols-[1fr_460px]"
      >
        <!-- 左列：文案 + 统计 + 二维码 -->
        <div>
          <p
            class="reveal text-[12px] font-semibold leading-[18px] tracking-[0.08em] text-brand-500"
            style="--d: 0ms"
          >
            {{ recruit.eyebrow }}
          </p>
          <h2
            class="reveal mt-[16px] text-[28px] font-bold leading-[38px] text-ink-900 md:text-[32px] md:leading-[42px]"
            style="--d: 80ms"
          >
            {{ recruit.title }}
          </h2>
          <p
            class="reveal mt-[14px] max-w-[480px] text-[14px] leading-[24px] text-[#5e7169]"
            style="--d: 160ms"
          >
            {{ recruit.desc }}
          </p>

          <!-- 三个统计：数字品牌绿加粗，滚进视口从 0 数上去（ref 只为挂 IO，无布局作用） -->
          <div
            ref="stats"
            class="reveal mt-[28px] flex flex-wrap gap-x-[56px] gap-y-[20px]"
            style="--d: 240ms"
          >
            <div v-for="stat in statsView" :key="stat.label">
              <!-- 能拆出数字的初始渲染 0+尾巴，避免「先闪终值再跳回 0」的视觉抖动 -->
              <p
                v-if="stat.num !== null"
                class="text-[28px] font-bold leading-[36px] tabular-nums text-mint-600"
                :data-num="stat.num"
                :data-rest="stat.rest"
              >
                0{{ stat.rest }}
              </p>
              <p v-else class="text-[28px] font-bold leading-[36px] tabular-nums text-mint-600">
                {{ stat.rest }}
              </p>
              <p class="mt-[4px] text-[13px] leading-[19px] text-[#5e7169]">{{ stat.label }}</p>
            </div>
          </div>

          <!-- 二维码块：裸二维码 + 右侧说明（白卡描边按反馈去掉，图本身白底不缺衬托） -->
          <div class="reveal mt-[32px] flex items-center gap-[18px]" style="--d: 320ms">
            <img
              :src="qrDownload"
              alt="司机端下载二维码"
              class="w-[104px] shrink-0 select-none"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p class="text-[15px] font-bold leading-[21px] text-ink-900">
                {{ recruit.qr.title }}
              </p>
              <p class="mt-[5px] text-[13px] leading-[20px] text-[#5e7169]">
                {{ recruit.qr.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- 右列：罐车 + 司机插画，跟左列统计同时浮起来 -->
        <img
          :src="recruitTruck"
          alt="威易达司机与危化品运输车"
          width="1760"
          height="1280"
          class="reveal w-full select-none rounded-[16px] shadow-[0_20px_50px_-24px_rgba(19,50,42,0.35)]"
          style="--d: 240ms"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>
