<script setup lang="ts">
import CtaBanner from '@/components/sections/CtaBanner.vue'
import HeroSection from '@/components/sections/HeroSection.vue'

/**
 * 首页 /
 *
 * ⚠️ 当前是**结构骨架态**，不是内容完成态。
 *
 * 原型「01 首页」是一张 1440×约 10600 的长画板，含 16 个区块：
 *   1 导航 · 2 Hero（左文 + 右看板卡片）· 3 六项硬性要求 · 4 系统/ERP 合规 ·
 *   5 能力点睛 · 6 场景列表 · 7 六类架构（深色大对照表）· 8 三个客户端一套 ERP ·
 *   9 智能订单协同 · 10 全生产链 · 11 多维风控 · 12 全链条一体化（深色）·
 *   13 数据驱动/人工智能 · 14 安全环保运维 · 15 橙色 CTA · 16 页脚
 *
 * 这 16 块尚未拆分实现。这里刻意**只留 Hero + CTA**，不放临时占位区块：
 * 改造前那 4 个通用区块（平台架构 / 产品矩阵 / 解决方案 / 关于我们）在切页结构下
 * 与内页内容重复、锚点也无人使用，留着只会在铺内容时混淆归属，已整体删除。
 */
</script>

<template>
  <!-- 首屏：待按原型改为「左侧文案 + 右侧智慧报表/仪表盘卡片」两栏 -->
  <HeroSection />
  <!-- 底部行动号召：原型第 15 区块，首页与内页共用 -->
  <CtaBanner />
</template>
