<script setup lang="ts">
import CardItem from '@/components/ui/CardItem.vue'
import type { CardItem as CardData } from '@/config/site'

/**
 * 卡片栅格
 *
 * 平台架构 / 产品矩阵 / 解决方案三个区块的卡片排布完全一致，抽到这里统一维护。
 * 以后调整列数、间距、错峰延迟，只改这一个文件。
 */
interface Props {
  /** 卡片数据，来自 config/site.ts */
  items: CardData[]
}

const props = defineProps<Props>()
</script>

<template>
  <!-- mt-10 与标题区拉开 2.5rem（sm:mt-12 为 3rem）；
       grid 网格布局；grid-cols-1 手机单列，sm:grid-cols-2 平板两列，lg:grid-cols-3 桌面三列；
       gap-4 手机间距 1rem，sm:gap-6 为 1.5rem -->
  <ul class="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
    <!-- 逐项渲染卡片；index 既作 v-for 的 key 备份，也用于显示序号与计算错峰延迟 -->
    <CardItem
      v-for="(item, index) in props.items"
      :key="item.title"
      :title="item.title"
      :desc="item.desc"
      :index="index"
      :delay="index * 100"
    />
  </ul>
</template>
