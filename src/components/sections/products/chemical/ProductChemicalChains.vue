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

const { chains } = siteConfig.chemical

// icon 短名 → 素材，换图只动这里；键名跟 config 里的 icon 一一对应
const iconMap: Record<(typeof chains.cards)[number]['icon'], string> = {
  production: iconProduction,
  material: iconMaterial,
  finance: iconFinance,
}

// tone → 卡底 / 编号标题色 / 描述与链路行色（照 Chain Rows.png 采样）。
// 卡底极淡接近白，各配一圈同色系略深的细边框把轮廓托出来
type CardTone = (typeof chains.cards)[number]['tone']

const toneClass: Record<CardTone, { card: string; head: string; desc: string; chain: string }> = {
  orange: {
    card: 'border border-[#f4e8dd] bg-[#fff9f5]',
    head: 'text-[#c4520f]',
    desc: 'text-[#6b7d75]',
    chain: 'text-[#8a6a56]',
  },
  green: {
    card: 'border border-[#e6f0ea] bg-[#f7fbf9]',
    head: 'text-[#17795c]',
    desc: 'text-[#6b7d75]',
    chain: 'text-[#4e6f62]',
  },
  plain: {
    card: 'border border-[#edf1ef] bg-[#fbfcfb]',
    head: 'text-[#16261f]',
    desc: 'text-[#6b7d75]',
    chain: 'text-[#6b7d75]',
  },
}

// 主链节点配色（Flow Panel.png 采样）：销售订单橙、生产计划/物料清单绿
type MainTone = (typeof chains.flow.main)[number]['tone']

const mainTone: Record<MainTone, string> = {
  orange: 'bg-[#fbeedf] text-[#b05a15]',
  green: 'bg-[#e4f4ea] text-[#1c6b4d]',
}

// FLOW 画布几何：垂直坐标写死，水平坐标全部等比（viewBox 480 宽 → 容器实际宽度）。
// SVG 加 preserveAspectRatio="none" 横向拉伸，节点用百分比定位，卡片能铺满右列；
// 改节点数量或文案要同步改 SVG 里的路径坐标（单位：480×478 画布）
const FLOW_W = 480
const FLOW_H = 478
const LEFT_CX = '22.5%' // 左列中心（列宽 45% 的一半）
const RIGHT_CX = '77.5%' // 右列中心（右列从 55% 起）
const MAIN_TOPS = [0, 60, 120] // 主链三节点 top（节点高 34）
const DIAMOND_TOP = 184 // 菱形 150×76，底尖 260
const BRANCH_TOP = 292 // 两支首节点 top（节点高 36，间隔 14 → 步进 50）

// 主链节点点亮配色：静息底色必须跟 mainTone 的 Tailwind 类一字不差，
// 不然 delay 窗口（fill-mode: backwards 压 0% 帧）和关动画时会跳色
const nodePulse: Record<MainTone, { bg: string; on: string; ring: string }> = {
  orange: { bg: '#fbeedf', on: '#f7e0c2', ring: 'rgba(176, 90, 21, 0.4)' },
  green: { bg: '#e4f4ea', on: '#d1ebdc', ring: 'rgba(28, 107, 77, 0.4)' },
}

// 主链节点绝对定位样式：水平居中；顺带捎上波次变量——
// --nd 是波到它的时刻（0/450/900ms），--nd-* 是点亮配色（keyframes 里 var() 取）
function mainStyle(i: number) {
  const p = nodePulse[chains.flow.main[i].tone]
  return {
    top: `${MAIN_TOPS[i]}px`,
    '--nd': `${i * 450}ms`,
    '--nd-bg': p.bg,
    '--nd-on': p.on,
    '--nd-ring': p.ring,
  }
}

// 分支节点定位：左列贴 0 占 45%，右列从 55% 起占 45%（中间 10% 是虚线回流的中缝）
function branchStyle(i: number, side: 'left' | 'right') {
  return {
    top: `${BRANCH_TOP + i * 50}px`,
    left: side === 'left' ? '0%' : '55%',
    width: '45%',
  }
}

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：白底，上留白 96px、下 64px（下面接深绿的界面展示屏） -->
  <section ref="root" class="bg-white pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ chains.eyebrow }}
      </p>

      <!-- 标题：mt-[24px] 与眉题间距 24px；32px/42px 加粗 ink-900 -->
      <h2
        class="reveal mt-[24px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ chains.title }}
      </h2>

      <!-- 两栏：mt-[36px] 与标题间距 36px；手机竖排 gap 20px，lg 起横排 gap 24px，
           宽度按原型 696:560 分（右面板内容固定 528px，窄屏横向滚动） -->
      <div class="mt-[36px] flex flex-col gap-[20px] lg:flex-row lg:items-stretch lg:gap-[24px]">
        <!-- 左列：三张链路卡竖排 gap 16px，lg 下 flex-[696] 按比例占宽 -->
        <div class="flex min-w-0 flex-1 flex-col gap-[16px] lg:flex-[696]">
          <article
            v-for="(card, i) in chains.cards"
            :key="card.no"
            class="reveal card-lift rounded-[12px] p-[22px] lg:flex lg:flex-1 lg:gap-[18px]"
            :class="toneClass[card.tone].card"
            :style="{ '--d': `${240 + i * 90}ms` }"
          >
            <!-- 图标：52×52，素材自带浅色圆角底；lg 下跟文字横排，手机竖排 -->
            <img
              loading="lazy"
              decoding="async"
              :src="iconMap[card.icon]"
              alt=""
              aria-hidden="true"
              class="h-[52px] w-[52px] shrink-0 select-none"
            />
            <div class="mt-[14px] lg:mt-0">
              <!-- 卡标题：16px/24px 加粗，编号 mr 10px、等宽数字 -->
              <h3 class="text-[16px] font-bold leading-[24px]" :class="toneClass[card.tone].head">
                <span class="mr-[10px] tabular-nums">{{ card.no }}</span
                >{{ card.title }}
              </h3>
              <!-- 卡描述：mt-[10px] 与标题间距 10px；13px/22px -->
              <p class="mt-[10px] text-[13px] leading-[22px]" :class="toneClass[card.tone].desc">
                {{ card.desc }}
              </p>
              <!-- 链路行：mt-[10px] 与描述间距 10px；12px/20px，步骤用 → 串联 -->
              <p class="mt-[10px] text-[12px] leading-[20px]" :class="toneClass[card.tone].chain">
                {{ card.steps.join(' → ') }}
              </p>
            </div>
          </article>
        </div>

        <!-- 右列：FLOW 面板，lg 下 flex-[560]；卡片铺满列宽，画布水平等比拉伸，
             lg 以下保底 528px 靠这层 overflow-x-auto 横向滚动 -->
        <div
          class="reveal overflow-x-auto pb-[4px] lg:min-w-0 lg:flex-[560] lg:overflow-visible"
          style="--d: 400ms"
        >
          <div
            class="w-full min-w-[528px] rounded-[16px] border border-[#e2ebe4] bg-white p-[24px] shadow-[0_24px_60px_-28px_rgba(36,63,49,0.22)]"
          >
            <!-- 面板小标：12px/18px 加粗深绿 -->
            <p class="text-[12px] font-semibold leading-[18px] text-[#1f6e4e]">
              {{ chains.flow.label }}
            </p>

            <!-- 画布：mt-[16px] 起、478px 固定高；SVG 画全部连接线（竖线 / 肘线 / 虚线 / 箭头），
                 DOM 节点绝对定位压在上面。preserveAspectRatio=none 横向拉伸，
                 vector-effect 让线宽不跟着一起变粗 -->
            <div class="relative mt-[16px] h-[478px] w-full">
              <svg
                class="absolute inset-0 h-full w-full"
                :viewBox="`0 0 ${FLOW_W} ${FLOW_H}`"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <!-- 主链三条竖线 + 实心三角箭头（线止于节点上沿 6px 处，三角尖正好点到节点） -->
                <path
                  d="M240 34V54"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                />
                <polygon points="236,54 244,54 240,60" fill="#a9c0b2" />
                <path
                  d="M240 94V114"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                />
                <polygon points="236,114 244,114 240,120" fill="#a9c0b2" />
                <path
                  d="M240 154V178"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                />
                <polygon points="236,178 244,178 240,184" fill="#a9c0b2" />

                <!-- 分叉：菱形底尖垂下 → 横线展开到两列中心 → 各自垂到首节点 -->
                <path
                  d="M240 260V278M108 278H372M108 278V286M372 278V286"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                />
                <polygon points="104,286 112,286 108,292" fill="#a9c0b2" />
                <polygon points="368,286 376,286 372,292" fill="#a9c0b2" />

                <!-- 分支内部连线：节点间隙 14px（328→342 / 378→392 / 428→442），按左 3 右 4 个节点手写 -->
                <path
                  d="M108 328V336M108 378V386"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                />
                <polygon points="104,336 112,336 108,342" fill="#a9c0b2" />
                <polygon points="104,386 112,386 108,392" fill="#a9c0b2" />
                <path
                  d="M372 328V336M372 378V386M372 428V436"
                  stroke="#a9c0b2"
                  stroke-width="1.5"
                  vector-effect="non-scaling-stroke"
                />
                <polygon points="368,336 376,336 372,342" fill="#a9c0b2" />
                <polygon points="368,386 376,386 372,392" fill="#a9c0b2" />
                <polygon points="368,436 376,436 372,442" fill="#a9c0b2" />

                <!-- 跨支虚线：物料入库右缘 → 中缝上行 → 汇入生成领料单左缘；
                     flow-march 每 1.1s 把 dashoffset 挪 -8（正好 4+4 一个虚线周期）无缝循环，看着就是物料在回流 -->
                <path
                  class="flow-march"
                  d="M216 410H240V310H258"
                  stroke="#c0d5c7"
                  stroke-width="1.5"
                  stroke-dasharray="4 4"
                  vector-effect="non-scaling-stroke"
                />
                <polygon points="258,306 258,314 264,310" fill="#c0d5c7" />
              </svg>

              <!-- 主链节点：绝对定位水平居中，高 34px、px 28；0 / 450 / 900ms 依次点亮（7s 一轮），
                   静息底色走 mainTone 的类，点亮色走行内 --nd-*，两种 tone 共用一份 keyframes -->
              <template v-for="(node, i) in chains.flow.main" :key="node.text">
                <div
                  class="flow-node absolute left-1/2 flex h-[34px] -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-[7px] px-[28px] text-[13px] font-semibold leading-[20px]"
                  :class="mainTone[node.tone]"
                  :style="mainStyle(i)"
                >
                  {{ node.text }}
                </div>
                <span
                  v-if="node.note"
                  class="absolute left-[calc(50%+8px)] whitespace-nowrap text-[10px] leading-[14px] text-[#9aab9f]"
                  :style="{ top: `${MAIN_TOPS[i] + 34 + 7}px` }"
                >
                  {{ node.note }}
                </span>
              </template>

              <!-- 分支标签：骑在肘线上方，跟各列中心（22.5% / 77.5%）对齐 -->
              <span
                class="absolute -translate-x-1/2 whitespace-nowrap text-[11px] leading-[14px] text-[#c26116]"
                :style="{ left: LEFT_CX, top: '261px' }"
              >
                {{ chains.flow.branchLeft.label }}
              </span>
              <span
                class="absolute -translate-x-1/2 whitespace-nowrap text-[11px] leading-[14px] text-[#2b6950]"
                :style="{ left: RIGHT_CX, top: '261px' }"
              >
                {{ chains.flow.branchRight.label }}
              </span>

              <!-- 菱形判断：SVG 压扁菱形 + 绝对居中文字 -->
              <div
                class="absolute left-1/2 h-[76px] w-[150px] -translate-x-1/2"
                :style="{ top: `${DIAMOND_TOP}px` }"
              >
                <svg viewBox="0 0 150 76" class="absolute inset-0 h-full w-full" aria-hidden="true">
                  <!-- flow-diamond：波走完主链最后点亮它，fill 提亮一档 -->
                  <polygon
                    class="flow-diamond"
                    :style="{ '--nd': '1350ms' }"
                    points="75,0 150,38 75,76 0,38"
                    fill="#14332a"
                  />
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
                  :style="{ left: `calc(${LEFT_CX} + 20px)`, top: `${BRANCH_TOP + i * 50 + 36}px` }"
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

<style scoped>
.flow-march {
  animation: flow-march 1.1s linear infinite;
  animation-play-state: paused;
}

.in .flow-march {
  animation-play-state: running;
}

@keyframes flow-march {
  to {
    stroke-dashoffset: -8;
  }
}

.flow-node,
.flow-diamond {
  animation-duration: 7s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
  animation-delay: var(--nd, 0ms);
  animation-play-state: paused;
}

.flow-node {
  animation-name: flow-node;
}

.flow-diamond {
  animation-name: flow-diamond;
}

.in .flow-node,
.in .flow-diamond {
  animation-play-state: running;
}

@keyframes flow-node {
  0%,
  100% {
    background-color: var(--nd-bg);
    box-shadow: 0 0 0 0 transparent;
  }
  4% {
    background-color: var(--nd-on);
    box-shadow: 0 0 0 3px var(--nd-ring);
  }
  11% {
    background-color: var(--nd-bg);
    box-shadow: 0 0 0 0 transparent;
  }
}

@keyframes flow-diamond {
  0%,
  100% {
    fill: #14332a;
  }
  4% {
    fill: #1d5440;
  }
  11% {
    fill: #14332a;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flow-march,
  .flow-node,
  .flow-diamond {
    animation: none;
  }
}
</style>
