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

// 六边形节点几何（viewBox 1920×1000）：中心坐标 + 六边形宽高。
// 竖列三颗（货主/物流/自营）间距已加大：中间行整体 455→495，自营 752→832。
// 整体缩了一圈：152×172 → 128×145（约 0.84），外圈同比缩到 ~10px 色带，
// 白图标 90×99 → 76×84；节点名跟着 HEX_H 自动上移 13.5，间距仍是 46 不用另调
const NODE_GEO: Record<string, { x: number; y: number }> = {
  chemical: { x: 152, y: 159 },
  shipper: { x: 725, y: 159 },
  partner: { x: 152, y: 495 },
  hub: { x: 725, y: 495 },
  driver: { x: 1255, y: 495 },
  national: { x: 1750, y: 497 },
  own: { x: 726, y: 832 },
}
const HEX_W = 128
const HEX_H = 145

// 连线几何：箭头尖端统一停在节点外圈外 ~8px（与节点图标距离全图一致）；
// 竖线只占「节点文字下方 ↔ 下一颗六边形外圈上方」的短段，不穿过文字；
// 节点缩圈后两端各朝节点回补 14（横）/ 14~16（竖），间隙保持原样，
// 不然箭头会悬在半空；绿色 = 正向流转，橙色 = 回程/调度
const LINES: {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  tone: 'green' | 'orange'
}[] = [
  { id: 'order', x1: 232, y1: 142, x2: 629, y2: 142, tone: 'green' },
  { id: 'compare', x1: 660, y1: 176, x2: 247, y2: 176, tone: 'orange' },
  { id: 'return', x1: 706, y1: 412, x2: 706, y2: 309, tone: 'orange' },
  { id: 'encrypt', x1: 752, y1: 302, x2: 752, y2: 406, tone: 'green' },
  { id: 'quote', x1: 660, y1: 493, x2: 247, y2: 493, tone: 'green' },
  { id: 'bid', x1: 232, y1: 527, x2: 629, y2: 527, tone: 'orange' },
  { id: 'transfer', x1: 816, y1: 493, x2: 1159, y2: 493, tone: 'green' },
  { id: 'status', x1: 1190, y1: 527, x2: 820, y2: 527, tone: 'orange' },
  { id: 'source', x1: 1346, y1: 493, x2: 1654, y2: 493, tone: 'green' },
  { id: 'accept', x1: 1684, y1: 527, x2: 1350, y2: 527, tone: 'orange' },
  { id: 'dispatch', x1: 727, y1: 630, x2: 727, y2: 727, tone: 'orange' },
]

// 线上文字的锚点（x/y 为基线位置）：above 线上方 26、below 线下方 34、right 竖线右侧
const LABEL_POS: Record<string, { x: number; y: number; anchor: 'middle' | 'start' }> = {
  order: { x: 436, y: 116, anchor: 'middle' },
  compare: { x: 436, y: 210, anchor: 'middle' },
  encrypt: { x: 782, y: 356, anchor: 'start' },
  quote: { x: 436, y: 467, anchor: 'middle' },
  bid: { x: 436, y: 561, anchor: 'middle' },
  transfer: { x: 985, y: 467, anchor: 'middle' },
  status: { x: 985, y: 561, anchor: 'middle' },
  source: { x: 1490, y: 467, anchor: 'middle' },
  accept: { x: 1490, y: 561, anchor: 'middle' },
  dispatch: { x: 800, y: 656, anchor: 'start' },
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
// 入场触发点挂流程图自己（阈值 12%：图顶刚进视口就开播，节点从上往下依次点亮，
// 滚到哪播到哪；阈值高了会出现「要停下等一会才动」的体感）
useReveal(root, 0.12)

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

// 箭头三角：沿 (x1,y1)→(x2,y2) 方向，尖端超出终点 13，底边宽 24 → 20（跟着细线收窄，
// 尖端仍压 13 不动，端点才不用重算）
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
  return `${tipX},${tipY} ${baseX + nx * 10},${baseY + ny * 10} ${baseX - nx * 10},${baseY - ny * 10}`
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
  <!-- 画布：viewBox 1920×1000 等比缩放；role=img + aria-label 读屏描述 -->
  <svg class="flow-svg" viewBox="0 0 1920 1000" role="img" :aria-label="flow.alt">
    <!-- 连线层：虚线 stroke-width 5 → 4（细一圈）、dash 22/24 不变，箭头底边 20；
         先入场再虚线流动（两段 animation，见 style） -->
    <g v-for="(l, i) in LINES" :key="l.id" class="flow-line" :style="{ '--d': lineDelay(i) }">
      <line
        :x1="l.x1"
        :y1="l.y1"
        :x2="l.x2"
        :y2="l.y2"
        :stroke="TONE[l.tone].base"
        stroke-width="4"
        stroke-dasharray="22 24"
        stroke-linecap="round"
      />
      <polygon :points="arrowPoints(l)" :fill="TONE[l.tone].base" />
    </g>

    <!-- 节点层：外圈淡色实底六边形（直接贴着实底边缘，无白缝）+ 实底六边形 + 白色图标 + 下方名称 -->
    <g v-for="n in flow.nodes" :key="n.id" class="flow-node" :style="{ '--d': nodeDelay(n.id) }">
      <!-- 外圈：1.16 倍六边形、42% 透明同色填充，画在实底下面只露出 ~10px 的贴边色带 -->
      <polygon
        :points="hexPoints(NODE_GEO[n.id].x, NODE_GEO[n.id].y, HEX_W * 1.16, HEX_H * 1.16)"
        :fill="TONE[n.tone].ring"
      />
      <polygon
        :points="hexPoints(NODE_GEO[n.id].x, NODE_GEO[n.id].y, HEX_W, HEX_H)"
        :fill="TONE[n.tone].base"
      />
      <!-- 图标：76×84 裁切框居中（仍是六边形宽的 6 成，留一样的呼吸空隙） -->
      <image
        :href="iconMap[n.icon]"
        :x="NODE_GEO[n.id].x - 38"
        :y="NODE_GEO[n.id].y - 42"
        width="76"
        height="84"
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

/* 虚线流动改的是 stroke-dashoffset，动不了合成层，等于整张 1920 宽的图每帧重画一遍。
   窄屏上画布被 overflow-x 裁掉三分之二，效果基本看不见、代价却照付，直接只留淡入。 */
@media (max-width: 1023px) {
  .in .flow-line {
    animation: flow-fade 0.4s ease backwards;
    animation-delay: var(--d, 0ms);
  }
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
