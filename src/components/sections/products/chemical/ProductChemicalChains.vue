<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 化工生产第二屏：三条主线与订单驱动流程
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconProduction from '@/assets/products/chemical/icons/chain-production.webp'
import iconMaterial from '@/assets/products/chemical/icons/chain-material.webp'
import iconFinance from '@/assets/products/chemical/icons/chain-finance.webp'

/**
 * 三条主线（原型 Chain Rows.png + Flow Panel.png）：左边三张链路卡，
 * 右边 FLOW 订单驱动全流程面板。
 *
 * 链路卡底色照原型采的极淡三色：暖白 #fff9f5 / 绿白 #f7fbf9 / 灰白 #fbfcfb，
 * 层次感全靠图标自带的色底和标题色，卡片本身接近白。
 * hover 跟首页同一套 card-lift：卡片不动，只有伪元素投影浮起来
 * （不要用 hover:-translate-y-2，transform 过渡会进合成层，13~16px 中文发虚）。
 *
 * FLOW 面板整体 DOM+SVG 重建（Flow Panel.png 是烘焙文字参考图，已删）。
 * 连接线（竖线、分叉肘线、跨支虚线、全部箭头）收进一张固定坐标的 SVG，
 * 节点是绝对定位的 DOM——之前用 span + calc 百分比拼线，渲染时隐时现；
 * 现在画布固定 480×478，改节点数量/文案要同步改 SVG 里的坐标。
 */
const { chains } = siteConfig.chemical

const iconMap = {
  production: iconProduction,
  material: iconMaterial,
  finance: iconFinance,
}

// tone → 卡底 / 编号标题色 / 描述与链路行色（照 Chain Rows.png 采样）
const toneClass = {
  orange: {
    card: 'bg-[#fff9f5]',
    head: 'text-[#c4520f]',
    desc: 'text-[#6b7d75]',
    chain: 'text-[#8a6a56]',
  },
  green: {
    card: 'bg-[#f7fbf9]',
    head: 'text-[#17795c]',
    desc: 'text-[#6b7d75]',
    chain: 'text-[#4e6f62]',
  },
  plain: {
    card: 'bg-[#fbfcfb]',
    head: 'text-[#16261f]',
    desc: 'text-[#6b7d75]',
    chain: 'text-[#6b7d75]',
  },
} as const

// 主链节点配色（Flow Panel.png 采样）：销售订单橙、生产计划/物料清单绿
const mainTone = {
  orange: 'bg-[#fbeedf] text-[#b05a15]',
  green: 'bg-[#e4f4ea] text-[#1c6b4d]',
} as const

// ---- FLOW 画布固定几何（与模板里 SVG 路径一一对应，改一处必改另一处）----
const FLOW_W = 480
const FLOW_H = 478
const COL_W = 216 // 分支列宽
const COL_GAP = 48 // 两列间隙（虚线回流走这里）
const LEFT_CX = COL_W / 2 // 108，左列中心
const RIGHT_CX = COL_W + COL_GAP + COL_W / 2 // 372，右列中心
const MAIN_TOPS = [0, 60, 120] // 主链三节点 top（节点高 34）
const DIAMOND_TOP = 184 // 菱形 150×76，底尖 260
const BRANCH_TOP = 292 // 两支首节点 top（节点高 36，间隔 14 → 步进 50）

// 主链节点绝对定位样式：水平居中
function mainStyle(i: number) {
  return { top: `${MAIN_TOPS[i]}px` }
}

// 分支节点定位：左列贴 0，右列从 COL_W+COL_GAP 起
function branchStyle(i: number, side: 'left' | 'right') {
  return {
    top: `${BRANCH_TOP + i * 50}px`,
    left: side === 'left' ? '0' : `${COL_W + COL_GAP}px`,
    width: `${COL_W}px`,
  }
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ chains.eyebrow }}
      </p>

      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ chains.title }}
      </h2>

      <!-- 左右按原型比例 696:560 分配宽度（右面板内容固定 528px，窄屏横向滚动） -->
      <div class="mt-[36px] flex flex-col gap-[20px] lg:flex-row lg:items-stretch lg:gap-[24px]">
        <!-- 左列：三张链路卡，hover 用全局 card-lift（只浮投影，卡片不动） -->
        <div class="flex min-w-0 flex-1 flex-col gap-[16px] lg:flex-[696]">
          <article
            v-for="(card, i) in chains.cards"
            :key="card.no"
            class="reveal card-lift rounded-[12px] p-[22px] lg:flex lg:flex-1 lg:gap-[18px]"
            :class="toneClass[card.tone].card"
            :style="{ '--d': `${240 + i * 90}ms` }"
          >
            <!-- 图标素材自带浅色圆角底 -->
            <img
              loading="lazy"
              decoding="async"
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="h-[52px] w-[52px] shrink-0 select-none"
            />
            <div class="mt-[14px] lg:mt-0">
              <h3 class="text-[16px] font-bold leading-[24px]" :class="toneClass[card.tone].head">
                <span class="mr-[10px] tabular-nums">{{ card.no }}</span
                >{{ card.title }}
              </h3>
              <p class="mt-[10px] text-[13px] leading-[22px]" :class="toneClass[card.tone].desc">
                {{ card.desc }}
              </p>
              <!-- 链路行：步骤用 → 串联 -->
              <p class="mt-[10px] text-[12px] leading-[20px]" :class="toneClass[card.tone].chain">
                {{ card.steps.join(' → ') }}
              </p>
            </div>
          </article>
        </div>

        <!-- 右列：FLOW 流程面板。内容固定 528px（480 画布 + 2×24 内边距），
             lg 以下靠外层 overflow-x-auto 横向滚动，不做响应式挤压——流程图挤压会断线 -->
        <div
          class="reveal overflow-x-auto pb-[4px] lg:min-w-0 lg:flex-[560] lg:overflow-visible"
          style="--d: 400ms"
        >
          <div
            class="w-[528px] rounded-[16px] border border-[#e2ebe4] bg-white p-[24px] shadow-[0_24px_60px_-28px_rgba(36,63,49,0.22)]"
          >
            <p class="text-[12px] font-semibold leading-[18px] text-[#1f6e4e]">
              {{ chains.flow.label }}
            </p>

            <!-- 画布：一张 SVG 画全部连接线（竖线/肘线/虚线/箭头），DOM 节点绝对定位其上 -->
            <div class="relative mx-auto mt-[16px] h-[478px] w-[480px]">
              <svg
                class="absolute inset-0"
                :width="FLOW_W"
                :height="FLOW_H"
                :viewBox="`0 0 ${FLOW_W} ${FLOW_H}`"
                fill="none"
                aria-hidden="true"
              >
                <!-- 主链三条竖线 + 实心三角箭头（线止于节点上沿 6px 处，三角尖正好点到节点） -->
                <path d="M240 34V54" stroke="#a9c0b2" stroke-width="1.5" />
                <polygon points="236,54 244,54 240,60" fill="#a9c0b2" />
                <path d="M240 94V114" stroke="#a9c0b2" stroke-width="1.5" />
                <polygon points="236,114 244,114 240,120" fill="#a9c0b2" />
                <path d="M240 154V178" stroke="#a9c0b2" stroke-width="1.5" />
                <polygon points="236,178 244,178 240,184" fill="#a9c0b2" />

                <!-- 分叉：菱形底尖垂下 → 横线展开到两列中心 → 各自垂到首节点 -->
                <path
                  d="M240 260V278M108 278H372M108 278V286M372 278V286"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                />
                <polygon points="104,286 112,286 108,292" fill="#a9c0b2" />
                <polygon points="368,286 376,286 372,292" fill="#a9c0b2" />

                <!-- 分支内部连线：节点间隙 14px（328→342 / 378→392 / 428→442），按左 3 右 4 个节点手写 -->
                <path d="M108 328V336M108 378V386" stroke="#a9c0b2" stroke-width="1.5" />
                <polygon points="104,336 112,336 108,342" fill="#a9c0b2" />
                <polygon points="104,386 112,386 108,392" fill="#a9c0b2" />
                <path
                  d="M372 328V336M372 378V386M372 428V436"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                />
                <polygon points="368,336 376,336 372,342" fill="#a9c0b2" />
                <polygon points="368,386 376,386 372,392" fill="#a9c0b2" />
                <polygon points="368,436 376,436 372,442" fill="#a9c0b2" />

                <!-- 跨支虚线：物料入库右缘 → 中缝上行 → 汇入生成领料单左缘 -->
                <path
                  d="M216 410H240V310H258"
                  stroke="#c0d5c7"
                  stroke-width="1.5"
                  stroke-dasharray="4 4"
                />
                <polygon points="258,306 258,314 264,310" fill="#c0d5c7" />
              </svg>

              <!-- 主链节点（绝对定位，水平居中）+ 线旁小字 -->
              <template v-for="(node, i) in chains.flow.main" :key="node.text">
                <div
                  class="absolute left-1/2 flex h-[34px] -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-[7px] px-[14px] text-[13px] font-semibold leading-[20px]"
                  :class="mainTone[node.tone]"
                  :style="mainStyle(i)"
                >
                  {{ node.text }}
                </div>
                <span
                  v-if="node.note"
                  class="absolute left-[248px] whitespace-nowrap text-[10px] leading-[14px] text-[#9aab9f]"
                  :style="{ top: `${MAIN_TOPS[i] + 34 + 7}px` }"
                >
                  {{ node.note }}
                </span>
              </template>

              <!-- 分支标签：骑在肘线上方，跟各列中心对齐 -->
              <span
                class="absolute -translate-x-1/2 whitespace-nowrap text-[11px] leading-[14px] text-[#c26116]"
                :style="{ left: `${LEFT_CX}px`, top: '261px' }"
              >
                {{ chains.flow.branchLeft.label }}
              </span>
              <span
                class="absolute -translate-x-1/2 whitespace-nowrap text-[11px] leading-[14px] text-[#2b6950]"
                :style="{ left: `${RIGHT_CX}px`, top: '261px' }"
              >
                {{ chains.flow.branchRight.label }}
              </span>

              <!-- 菱形判断：SVG 压扁菱形 + 绝对居中文字 -->
              <div
                class="absolute left-1/2 h-[76px] w-[150px] -translate-x-1/2"
                :style="{ top: `${DIAMOND_TOP}px` }"
              >
                <svg viewBox="0 0 150 76" class="absolute inset-0 h-full w-full" aria-hidden="true">
                  <polygon points="75,0 150,38 75,76 0,38" fill="#14332a" />
                </svg>
                <span
                  class="relative flex h-full items-center justify-center text-[13px] font-semibold leading-[18px] text-white"
                >
                  {{ chains.flow.decision }}
                </span>
              </div>

              <!-- 左支：浅橙节点；第一段连线旁挂小字 -->
              <template v-for="(node, i) in chains.flow.branchLeft.nodes" :key="node.text">
                <div
                  class="absolute flex h-[36px] items-center justify-center rounded-[7px] bg-[#fceadd] text-[13px] font-semibold text-[#b9540f]"
                  :style="branchStyle(i, 'left')"
                >
                  {{ node.text }}
                </div>
                <span
                  v-if="node.note"
                  class="absolute whitespace-nowrap text-[10px] leading-[14px] text-[#9aab9f]"
                  :style="{ left: `${LEFT_CX + 8}px`, top: `${BRANCH_TOP + i * 50 + 36}px` }"
                >
                  {{ node.note }}
                </span>
              </template>

              <!-- 右支：白底绿边节点 -->
              <div
                v-for="(text, i) in chains.flow.branchRight.nodes"
                :key="text"
                class="absolute flex h-[36px] items-center justify-center rounded-[7px] bg-white text-[13px] font-semibold text-[#1c6b4d] ring-1 ring-[#d9e6dd]"
                :style="branchStyle(i, 'right')"
              >
                {{ text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
