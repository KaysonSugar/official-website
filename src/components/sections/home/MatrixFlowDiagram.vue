<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 首页第五屏流程图：三端业务运转（DOM/SVG 绘制，替代原 matrix-flow.webp 位图）
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'
import iconFactory from '@/assets/home/images/flow-icon-factory.webp'
import iconFleet from '@/assets/home/images/flow-icon-fleet.webp'
import iconWarehouse from '@/assets/home/images/flow-icon-warehouse.webp'
import iconAirlift from '@/assets/home/images/flow-icon-airlift.webp'
import iconTruck from '@/assets/home/images/flow-icon-truck.webp'

const { matrix } = siteConfig
const flow = matrix.flow

// 六边形节点几何（viewBox 1920×956，量自原位图）：中心坐标 + 六边形宽高
const NODE_GEO: Record<string, { x: number; y: number }> = {
  chemical: { x: 152, y: 159 },
  shipper: { x: 725, y: 159 },
  partner: { x: 152, y: 455 },
  hub: { x: 725, y: 455 },
  driver: { x: 1255, y: 455 },
  national: { x: 1750, y: 457 },
  own: { x: 726, y: 752 },
}
const HEX_W = 152
const HEX_H = 172

// 连线几何：端点统一收在外圈六边形外 ~8px（外圈 1.16 倍，横向半宽 88），箭头不被节点遮住；
// 绿色 = 正向流转（箭头指向 to 端），橙色 = 回程/调度
const LINES: {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  tone: 'green' | 'orange'
}[] = [
  { id: 'order', x1: 246, y1: 142, x2: 615, y2: 142, tone: 'green' },
  { id: 'compare', x1: 646, y1: 176, x2: 288, y2: 176, tone: 'orange' },
  { id: 'return', x1: 712, y1: 372, x2: 712, y2: 276, tone: 'orange' },
  { id: 'encrypt', x1: 746, y1: 256, x2: 746, y2: 346, tone: 'green' },
  { id: 'quote', x1: 246, y1: 453, x2: 615, y2: 453, tone: 'green' },
  { id: 'bid', x1: 646, y1: 487, x2: 288, y2: 487, tone: 'orange' },
  { id: 'transfer', x1: 830, y1: 453, x2: 1145, y2: 453, tone: 'green' },
  { id: 'status', x1: 1176, y1: 487, x2: 792, y2: 487, tone: 'orange' },
  { id: 'source', x1: 1360, y1: 453, x2: 1640, y2: 453, tone: 'green' },
  { id: 'accept', x1: 1670, y1: 487, x2: 1322, y2: 487, tone: 'orange' },
  { id: 'dispatch', x1: 727, y1: 564, x2: 727, y2: 631, tone: 'orange' },
]

// 线上文字的锚点（x/y 为基线位置）：above 线上方 26、below 线下方 34、right 竖线右侧
const LABEL_POS: Record<string, { x: number; y: number; anchor: 'middle' | 'start' }> = {
  order: { x: 436, y: 116, anchor: 'middle' },
  compare: { x: 436, y: 210, anchor: 'middle' },
  encrypt: { x: 782, y: 334, anchor: 'start' },
  quote: { x: 436, y: 427, anchor: 'middle' },
  bid: { x: 436, y: 521, anchor: 'middle' },
  transfer: { x: 985, y: 427, anchor: 'middle' },
  status: { x: 985, y: 521, anchor: 'middle' },
  source: { x: 1490, y: 427, anchor: 'middle' },
  accept: { x: 1490, y: 521, anchor: 'middle' },
  dispatch: { x: 762, y: 612, anchor: 'start' },
}

// 配置 link id → 线上文字（含 labelPos）；组件几何里多一条 return 回程线，无文字
const linkMap = Object.fromEntries(flow.links.map((l) => [l.id, l]))

// icon 名 → 抠好的白色图标素材（透明底，像素级还原原位图）
const iconMap = {
  factory: iconFactory,
  fleet: iconFleet,
  warehouse: iconWarehouse,
  airlift: iconAirlift,
  truck: iconTruck,
}

// tone → 六边形实底 / 外圈描边色
const TONE: Record<string, { base: string; ring: string }> = {
  orange: { base: '#ef8249', ring: 'rgba(239, 130, 73, 0.42)' },
  green: { base: '#00ab81', ring: 'rgba(0, 171, 129, 0.42)' },
}

const root = useTemplateRef<HTMLElement>('root')
// 入场触发点挂流程图自己：整屏太高，挂根上会在标题探头时就播完，滚到这就看不到了
useReveal(root, 0.35)

// 尖顶六边形顶点串（cx,cy 中心；w 宽 h 高）
function hexPoints(cx: number, cy: number, w: number, h: number): string {
  const hx = w / 2
  const hy = h / 2
  const qy = h / 4
  return [
    [cx, cy - hy],
    [cx + hx, cy - qy],
    [cx + hx, cy + qy],
    [cx, cy + hy],
    [cx - hx, cy + qy],
    [cx - hx, cy - qy],
  ]
    .map((p) => p.join(','))
    .join(' ')
}

// 箭头三角：沿 (x1,y1)→(x2,y2) 方向，尖端超出终点 13，底边宽 24
function arrowPoints(l: { x1: number; y1: number; x2: number; y2: number }): string {
  const dx = l.x2 - l.x1
  const dy = l.y2 - l.y1
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const nx = -uy
  const ny = ux
  const tipX = l.x2 + ux * 13
  const tipY = l.y2 + uy * 13
  const baseX = l.x2 - ux * 2
  const baseY = l.y2 - uy * 2
  return `${tipX},${tipY} ${baseX + nx * 12},${baseY + ny * 12} ${baseX - nx * 12},${baseY - ny * 12}`
}

// 节点入场顺序 = 配置 nodes 顺序，每颗 +110ms
function nodeDelay(id: string): string {
  const idx = flow.nodes.findIndex((n) => n.id === id)
  return `${idx * 110}ms`
}

// 连线入场：节点基本亮完后依次浮现（900ms 起，每条 +55ms）
function lineDelay(i: number): string {
  return `${900 + i * 55}ms`
}
</script>

<template>
  <!-- 画布：viewBox 1920×956 等比缩放；role=img + aria-label 读屏描述 -->
  <svg class="flow-svg" viewBox="0 0 1920 956" role="img" :aria-label="flow.alt">
    <!-- 连线层：虚线 + 箭头，先入场再虚线流动（两段 animation，见 style） -->
    <g v-for="(l, i) in LINES" :key="l.id" class="flow-line" :style="{ '--d': lineDelay(i) }">
      <line
        :x1="l.x1"
        :y1="l.y1"
        :x2="l.x2"
        :y2="l.y2"
        :stroke="TONE[l.tone].base"
        stroke-width="5"
        stroke-dasharray="22 24"
        stroke-linecap="round"
      />
      <polygon :points="arrowPoints(l)" :fill="TONE[l.tone].base" />
    </g>

    <!-- 节点层：外圈淡色实底六边形（直接贴着实底边缘，无白缝）+ 实底六边形 + 白色图标 + 下方名称 -->
    <g v-for="n in flow.nodes" :key="n.id" class="flow-node" :style="{ '--d': nodeDelay(n.id) }">
      <!-- 外圈：1.16 倍六边形、42% 透明同色填充，画在实底下面只露出 ~12px 的贴边色带 -->
      <polygon
        :points="hexPoints(NODE_GEO[n.id].x, NODE_GEO[n.id].y, HEX_W * 1.16, HEX_H * 1.16)"
        :fill="TONE[n.tone].ring"
      />
      <polygon
        :points="hexPoints(NODE_GEO[n.id].x, NODE_GEO[n.id].y, HEX_W, HEX_H)"
        :fill="TONE[n.tone].base"
      />
      <!-- 图标：90×99 裁切框居中（约为六边形宽的 6 成，留出呼吸空隙） -->
      <image
        :href="iconMap[n.icon]"
        :x="NODE_GEO[n.id].x - 45"
        :y="NODE_GEO[n.id].y - 49.5"
        width="90"
        height="99"
      />
      <text
        class="flow-node-label"
        :x="NODE_GEO[n.id].x"
        :y="NODE_GEO[n.id].y + HEX_H / 2 + 46"
        text-anchor="middle"
      >
        {{ n.label }}
      </text>
    </g>

    <!-- 线上文字层：跟随各自连线入场 -->
    <text
      v-for="(l, i) in LINES"
      v-show="linkMap[l.id]?.label"
      :key="'label-' + l.id"
      class="flow-edge-label"
      :style="{ '--d': lineDelay(i) }"
      :x="LABEL_POS[l.id]?.x"
      :y="LABEL_POS[l.id]?.y"
      :text-anchor="LABEL_POS[l.id]?.anchor ?? 'middle'"
    >
      {{ linkMap[l.id]?.label }}
    </text>
  </svg>
</template>

<style scoped>
.flow-svg {
  display: block;
  width: 100%;
  min-width: 960px;
}

.flow-node {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}

.in .flow-node {
  opacity: 1;
  animation: flow-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
  animation-delay: var(--d, 0ms);
}

@keyframes flow-pop {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
}

.flow-line {
  opacity: 0;
}

.in .flow-line {
  opacity: 1;
  animation:
    flow-fade 0.4s ease backwards,
    flow-dash 1.4s 1.5s linear infinite;
  animation-delay: var(--d, 0ms), calc(var(--d, 0ms) + 1.5s);
}

@keyframes flow-fade {
  from {
    opacity: 0;
  }
}

@keyframes flow-dash {
  to {
    stroke-dashoffset: -46;
  }
}

.flow-edge-label {
  opacity: 0;
}

.in .flow-edge-label {
  opacity: 1;
  animation: flow-fade 0.4s ease backwards;
  animation-delay: var(--d, 0ms);
}

.flow-node-label {
  font-size: 27px;
  font-weight: 700;
  fill: #221a16;
}

.flow-edge-label {
  font-size: 23px;
  fill: #221a16;
}

@media (prefers-reduced-motion: reduce) {
  .flow-node,
  .flow-line,
  .flow-edge-label {
    opacity: 1;
    animation: none;
  }
}
</style>
