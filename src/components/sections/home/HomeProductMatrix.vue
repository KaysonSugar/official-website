<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 首页第五屏：三端业务运转模式
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import MatrixFlowDiagram from './MatrixFlowDiagram.vue'
import logoChemical from '@/assets/home/images/brand-chemical.webp'
import logoLogistics from '@/assets/home/images/brand-logistics.webp'
import logoDriver from '@/assets/home/images/brand-driver.webp'
import glowOrange from '@/assets/home/images/card-glow-orange.webp'
import glowMint from '@/assets/home/images/card-glow-mint.webp'
import glowGreen from '@/assets/home/images/card-glow-green.webp'
import ringOrange from '@/assets/home/images/card-ring-orange.webp'
import ringMint from '@/assets/home/images/card-ring-mint.webp'
import ringGreen from '@/assets/home/images/card-ring-green.webp'

const { matrix } = siteConfig

// icon 名 → 素材。光斑 / 圆环按卡片顺序取用：化工橙、物流浅绿、司机深绿
const iconMap = { chemical: logoChemical, logistics: logoLogistics, driver: logoDriver }
const glowMap = [glowOrange, glowMint, glowGreen]
const ringMap = [ringOrange, ringMint, ringGreen]

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)

// 流程图入场单独触发：区块太高，跟着根的 .in 会在标题探头时就播完，
// 滚到流程图露出 35% 才点亮（与第四屏架构图同一套门控）
const flowPanel = useTemplateRef<HTMLElement>('flowPanel')
useReveal(flowPanel, 0.12)
</script>

<template>
  <!-- 区块：bg-[linear-gradient] 白到浅灰绿（180deg，#ffffff → #fafbfa）；
       pt-[96px] 上留白 96px、pb-[64px] 下留白 64px -->
  <section
    ref="root"
    class="bg-[linear-gradient(180deg,#ffffff_0%,#fafbfa_100%)] pb-[64px] pt-[96px]"
  >
    <div class="container-page">
      <!-- 眉题：reveal 走入场；11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ matrix.eyebrow }}
      </p>

      <!-- 标题：mt-[24px] 与眉题间距 24px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ matrix.title }}
      </h2>

      <!-- 说明：mt-[48px] 与标题间距 48px；max-w-[860px] 限宽两行；14px/22px、ink-600 弱灰 -->
      <p
        class="reveal mt-[48px] max-w-[860px] text-[14px] leading-[22px] text-ink-600"
        style="--d: 160ms"
      >
        {{ matrix.desc }}
      </p>

      <!-- 流程图面板：mt-[36px] 与说明间距 36px；overflow-x-auto 窄屏横向滚动看全；
           rounded-[16px] 圆角、px-[40px] py-[28px] 内边距、
           shadow-[0_18px_40px_-30px] 极淡投影；
           flow-panel 自带入场淡入（.in 由面板自己的观察器加，露出 12% 就播） -->
      <div
        ref="flowPanel"
        class="flow-panel mt-[36px] overflow-x-auto rounded-[16px] border border-ink-100 bg-white px-[40px] py-[28px] shadow-[0_18px_40px_-30px_rgba(26,26,26,0.12)]"
      >
        <!-- DOM 流程图：节点/连线几何见 MatrixFlowDiagram.vue，文字在 matrix.flow 配置 -->
        <MatrixFlowDiagram />
      </div>

      <!-- 三卡栅格：mt-[48px] 与面板间距 48px；gap-[18px]；手机 1 列 → md 3 列 -->
      <div class="mt-[48px] grid grid-cols-1 gap-[18px] md:grid-cols-3">
        <article
          v-for="(card, i) in matrix.cards"
          :key="card.title"
          class="reveal card-lift relative flex flex-col rounded-[16px] border border-ink-100 bg-white px-[28px] pb-[28px] pt-[36px] text-center shadow-[0_18px_40px_-30px_rgba(26,26,26,0.12)]"
          :style="{ '--d': `${340 + i * 80}ms` }"
        >
          <!-- 卡：rounded-[16px]、border-ink-100、白底 + 极淡投影；
               px-[28px] 左右、pt-[36px] 上、pb-[28px] 下。
               装饰裁切层：absolute inset-0 + overflow-hidden 负责裁掉探出的光斑圆环
               （卡片本体不能 overflow-hidden，否则 card-lift 的卡外阴影会被一起裁没） -->
          <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
            <!-- 顶部光斑：absolute -top-[130px] left-1/2 -translate-x-1/2 居中探出上沿；
                 w-[380px]、blur-[40px]、opacity-80 -->
            <img
              loading="lazy"
              decoding="async"
              :src="glowMap[i]"
              alt=""
              aria-hidden="true"
              class="pointer-events-none absolute -top-[130px] left-1/2 w-[380px] -translate-x-1/2 select-none opacity-80 blur-[40px]"
            />
            <!-- 右下角装饰：-bottom-[130px] -right-[130px] 钉死不随屏幕缩放，
                 圆心在角外只露四分之一弧；光斑 w-[220px] 垫底 + 圆环 w-[240px] 压线 -->
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
              class="matrix-ring pointer-events-none absolute -bottom-[130px] -right-[130px] w-[240px] select-none opacity-70"
            />
          </div>

          <!-- 内容层：flex-1 撑满卡高 + 竖排 flex，底部链接才能用 mt-auto 钉到同一条线 -->
          <div class="relative flex flex-1 flex-col">
            <!-- 品牌图标：mx-auto 居中、64×64、drop-shadow 轻投影。
                 hover 放大 1.06 挂在 matrix-logo 类上（不能写 .card-lift img，
                 否则光斑圆环装饰图会跟着缩放穿帮） -->
            <img
              loading="lazy"
              decoding="async"
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="matrix-logo mx-auto h-[64px] w-[64px] select-none drop-shadow-[0_6px_14px_rgba(26,26,26,0.08)]"
            />

            <!-- 小胶囊标签：self-center 收成内容宽（父级是 flex 列，不写会被 stretch 拉满一整行）；
                 rounded-full 全圆角、px-[12px] py-[4px]；
                 白底 + shadow-[0_2px_6px] 极淡投影跟白卡分开；文字色按 tone 分橙 / 绿 -->
            <p
              class="mt-[16px] inline-block self-center rounded-full bg-white px-[12px] py-[4px] text-[12px] leading-[18px] shadow-[0_2px_6px_rgba(26,26,26,0.06)]"
              :class="card.tone === 'orange' ? 'text-[#bc6a30]' : 'text-[#2f8f62]'"
            >
              {{ card.label }}
            </p>

            <!-- 卡标题：mt-[12px] 与胶囊间距 12px；20px/28px 加粗、ink-900 -->
            <h3 class="mt-[12px] text-[20px] font-bold leading-[28px] text-ink-900">
              {{ card.title }}
            </h3>

            <!-- 卡正文：mt-[14px] 与标题间距 14px；14px/24px 居中、ink-600 -->
            <p class="mt-[14px] text-[14px] leading-[24px] text-ink-600">{{ card.desc }}</p>

            <!-- 能力胶囊：mt-[18px] 与正文间距 18px；flex-wrap 装不下自动换行、
                 gap-[8px] 间距；单颗 rounded-[8px]、px-[12px] py-[5px]、12px/20px -->
            <div class="mt-[18px] flex flex-wrap justify-center gap-[8px]">
              <span
                v-for="tag in card.tags"
                :key="tag"
                class="rounded-[8px] bg-[#f3f5f4] px-[12px] py-[5px] text-[12px] leading-[20px] text-ink-700"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 底部链接：mt-auto 吃掉剩余高度（胶囊换行多一行也不会把链接顶下去，
                 三张卡的链接始终齐线）、pt-[20px] 与胶囊至少留 20px；
                 self-center 让点击区跟着文字宽度，不铺满整行；
                 13px/20px 加粗，点进对应产品矩阵页 -->
            <RouterLink
              :to="card.to"
              class="mt-auto inline-block self-center pt-[20px] text-[13px] font-semibold leading-[20px]"
              :class="card.tone === 'orange' ? 'text-brand-600' : 'text-[#2f8f62]'"
            >
              {{ matrix.linkPrefix }}{{ card.title }}{{ matrix.linkArrow }}
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flow-panel {
  opacity: 0;
}

.flow-panel.in {
  opacity: 1;
  animation: flow-panel-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) backwards;
}

@keyframes flow-panel-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}

.card-lift .matrix-logo {
  transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-lift:hover .matrix-logo {
  transform: scale(1.06);
}

@media (prefers-reduced-motion: reduce) {
  .flow-panel,
  .flow-panel.in {
    opacity: 1;
    animation: none;
  }

  .card-lift .matrix-logo {
    transition: none;
  }

  .card-lift:hover .matrix-logo {
    transform: none;
  }
}

.matrix-ring {
  animation: matrix-rotate 60s linear infinite;
  animation-play-state: paused;
}

@keyframes matrix-rotate {
  to {
    transform: rotate(360deg);
  }
}

.in .matrix-ring {
  animation-play-state: running;
}

@media (prefers-reduced-motion: reduce) {
  .matrix-ring {
    animation: none;
  }
}
</style>
