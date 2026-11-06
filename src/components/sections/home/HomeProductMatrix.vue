<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页第五屏：三端业务运转模式
-->
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import flowImg from '@/assets/home/images/matrix-flow.webp'
import logoChemical from '@/assets/home/images/brand-chemical.webp'
import logoLogistics from '@/assets/home/images/brand-logistics.webp'
import logoDriver from '@/assets/home/images/brand-driver.webp'
import glowOrange from '@/assets/home/images/card-glow-orange.webp'
import glowMint from '@/assets/home/images/card-glow-mint.webp'
import glowGreen from '@/assets/home/images/card-glow-green.webp'
import ringOrange from '@/assets/home/images/card-ring-orange.webp'
import ringMint from '@/assets/home/images/card-ring-mint.webp'
import ringGreen from '@/assets/home/images/card-ring-green.webp'

/**
 * 第五屏：三端业务运转模式（原型 05）。
 * 上面是流程图整图（设计直接导出的透明底素材，节点箭头都在图里），
 * 下面三张业务线卡：化工暖橙、物流 / 司机薄荷绿，点击跳外部系统。
 */
const { matrix } = siteConfig

// icon 名 → 素材。光斑 / 圆环按卡片顺序取用：化工橙、物流浅绿、司机深绿
const iconMap = { chemical: logoChemical, logistics: logoLogistics, driver: logoDriver }
const glowMap = [glowOrange, glowMint, glowGreen]
const ringMap = [ringOrange, ringMint, ringGreen]

// 司机端没上线：点了链接位就把文案换成「正在上线中」
const comingSoon = ref(false)

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section
    ref="root"
    class="bg-[linear-gradient(180deg,#ffffff_0%,#fafbfa_100%)] pb-[64px] pt-[96px]"
  >
    <div class="container-page">
      <!-- 眉题：跟前几屏同款，11px 橙色宽字距 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ matrix.eyebrow }}
      </p>

      <!-- 板块标题：32px 加粗 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ matrix.title }}
      </h2>

      <!-- 两行说明：14px 弱化灰，限宽防止拉太长 -->
      <p
        class="reveal mt-[48px] max-w-[860px] text-[14px] leading-[22px] text-ink-600"
        style="--d: 160ms"
      >
        {{ matrix.desc }}
      </p>

      <!-- 流程图面板：白底圆角卡，整图缩放放进来；
           图是桌面版式，窄屏横向滚动看全 -->
      <div
        class="reveal mt-[36px] overflow-x-auto rounded-[16px] border border-ink-100 bg-white px-[40px] py-[28px] shadow-[0_18px_40px_-30px_rgba(26,26,26,0.12)]"
        style="--d: 240ms"
      >
        <img
          loading="lazy"
          decoding="async"
          :src="flowImg"
          alt="化工企业、威易达化工、合作物流公司、威易达物流、威易达司机与全国危化物流公司的业务流转关系图"
          class="mx-auto w-full min-w-[960px] max-w-[1200px] select-none"
          draggable="false"
        />
      </div>

      <!-- 三张业务线卡：化工橙、物流 / 司机绿；装饰光斑在图标后面、圆环在右下角裁掉一半 -->
      <div class="mt-[48px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
        <article
          v-for="(card, i) in matrix.cards"
          :key="card.title"
          class="reveal card-lift relative rounded-[16px] border border-ink-100 bg-white px-[28px] pb-[28px] pt-[36px] text-center shadow-[0_18px_40px_-30px_rgba(26,26,26,0.12)]"
          :style="{ '--d': `${340 + i * 80}ms` }"
        >
          <!-- 装饰层：光斑和圆环都往外溢，得靠这层裁掉（卡片本体不能再 overflow-hidden，
               否则 card-lift 画在卡外的阴影会被一起裁没） -->
          <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
            <!-- 光斑：透明底圆盘素材，模糊后只垫在 logo 区域，卡片本体保持白底 -->
            <img
              loading="lazy"
              decoding="async"
              :src="glowMap[i]"
              alt=""
              aria-hidden="true"
              class="pointer-events-none absolute -top-[130px] left-1/2 w-[380px] -translate-x-1/2 select-none opacity-80 blur-[40px]"
            />
            <!-- 右下角装饰：尺寸位置全部钉死（不随屏幕缩放），
                 先一团光斑填充、再压圆环线；圆心在角外，只露四分之一弧 -->
            <img
              loading="lazy"
              decoding="async"
              :src="glowMap[i]"
              alt=""
              aria-hidden="true"
              class="pointer-events-none absolute -bottom-[130px] -right-[130px] w-[220px] select-none opacity-80 blur-[40px]"
            />
            <img
              loading="lazy"
              decoding="async"
              :src="ringMap[i]"
              alt=""
              aria-hidden="true"
              class="pointer-events-none absolute -bottom-[130px] -right-[130px] w-[240px] select-none opacity-70"
            />
          </div>

          <div class="relative">
            <!-- 品牌图标：素材自带白色圆角 tile，直接用 -->
            <img
              loading="lazy"
              decoding="async"
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="mx-auto h-[64px] w-[64px] select-none drop-shadow-[0_6px_14px_rgba(26,26,26,0.08)]"
            />

            <!-- 小胶囊标签：白底浮在卡面上，靠一道极淡投影跟白卡分开，
                 只留文字色区分橙 / 绿（原型里就是白标签 + 彩字） -->
            <p
              class="mt-[16px] inline-block rounded-full bg-white px-[12px] py-[4px] text-[12px] leading-[18px] shadow-[0_2px_6px_rgba(26,26,26,0.06)]"
              :class="card.tone === 'orange' ? 'text-[#bc6a30]' : 'text-[#2f8f62]'"
            >
              {{ card.label }}
            </p>

            <!-- 卡片标题：20px 加粗 -->
            <h3 class="mt-[12px] text-[20px] font-bold leading-[28px] text-ink-900">
              {{ card.title }}
            </h3>

            <!-- 正文：14px 居中，与原型同款换行节奏 -->
            <p class="mt-[14px] text-[14px] leading-[24px] text-ink-600">{{ card.desc }}</p>

            <!-- 能力胶囊：装不下自动换行 -->
            <div class="mt-[18px] flex flex-wrap justify-center gap-[8px]">
              <span
                v-for="tag in card.tags"
                :key="tag"
                class="rounded-[8px] bg-[#f3f5f4] px-[12px] py-[5px] text-[12px] leading-[20px] text-ink-700"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 底部链接：有 href 跳外部系统（新窗口）；
                 司机端未上线，点一下把文案换成「正在上线中」 -->
            <a
              v-if="card.href"
              :href="card.href"
              target="_blank"
              rel="noopener"
              class="mt-[20px] inline-block text-[13px] font-semibold leading-[20px]"
              :class="card.tone === 'orange' ? 'text-brand-600' : 'text-[#2f8f62]'"
            >
              了解{{ card.title }} →
            </a>
            <button
              v-else
              type="button"
              class="mt-[20px] inline-block cursor-pointer text-[13px] font-semibold leading-[20px]"
              :class="comingSoon ? 'text-ink-400' : 'text-[#2f8f62]'"
              @click="comingSoon = true"
            >
              {{ comingSoon ? '正在上线中…' : `了解${card.title} →` }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
