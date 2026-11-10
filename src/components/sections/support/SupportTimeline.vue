<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 服务支持首屏右侧的项目节奏卡
-->
<script setup lang="ts">
import { siteConfig } from '@/config/site'

/**
 * 「典型项目节奏」白卡（原型 Service Hero 右侧）。
 * 原稿是烘焙文字的位图，非整数缩放下必糊（首页首屏两张悬浮卡踩过同一个坑），
 * 所以照着图重建成 DOM，配色逐个从原图采样。
 */
const { timeline } = siteConfig.support

// tone → 序号块配色：1 橙 / 2 绿 / 3 橘红是浅底彩字，4 是深绿实底白字。
// 键用 config 里 tone 的联合类型，写错键名编译就报错
const toneClass: Record<(typeof timeline.steps)[number]['tone'], string> = {
  orange: 'bg-[#fce3d0] text-[#c2622a]',
  green: 'bg-[#dbf0e5] text-[#1c8a66]',
  salmon: 'bg-[#fae4d9] text-[#c95a34]',
  dark: 'bg-[#13322a] text-white',
}
</script>

<template>
  <!-- 卡体：白底 + 1px 淡描边 + 大柔影，rounded 16px、内边距 28px；
       悬停上浮 8px，走整数物理像素，卡内 13px 小字不重采样 -->
  <article
    class="rounded-[16px] bg-white p-[28px] shadow-[0_28px_70px_-24px_rgba(16,37,30,0.2)] ring-1 ring-black/5 transition-transform duration-500 ease-out hover:-translate-y-2"
  >
    <!-- 标题行：两端对齐，gap 16px 防标题过长顶到徽标 -->
    <div class="flex items-center justify-between gap-4">
      <!-- 卡标题：18px/26px 加粗 ink-900 -->
      <h3 class="text-[18px] font-bold leading-[26px] text-ink-900">{{ timeline.title }}</h3>
      <!-- 工期徽标：浅橙底 #fff0e4 + 陶土橙字 #c2622a（比品牌橙灰一档，原图采的），
           px 12 / py 5、13px/18px 加粗，实际高 28px -->
      <span
        class="shrink-0 rounded-full bg-[#fff0e4] px-[12px] py-[5px] text-[13px] font-semibold leading-[18px] text-[#c2622a]"
      >
        {{ timeline.badge }}
      </span>
    </div>

    <!-- 四行步骤：mt-[24px] 与标题行间距 24px，行间 space-y-[22px] -->
    <ol class="mt-[24px] space-y-[22px]">
      <li v-for="step in timeline.steps" :key="step.no" class="flex gap-[14px]">
        <!-- 序号块：44×44、rounded 12px、16px 加粗居中，配色见 script 的 toneClass -->
        <span
          :class="toneClass[step.tone]"
          class="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] text-[16px] font-bold"
        >
          {{ step.no }}
        </span>
        <!-- 右侧文字：pt-[1px] 让标签跟序号块顶边齐平；min-w-0 允许长文案换行 -->
        <div class="min-w-0 pt-[1px]">
          <!-- 步骤标签：13px/18px 浅灰绿 -->
          <p class="text-[13px] leading-[18px] text-[#8fa8a0]">{{ step.label }}</p>
          <!-- 正文：mt-[5px] 与标签间距 5px，15px/22px 加粗深灰绿 -->
          <p class="mt-[5px] text-[15px] font-semibold leading-[22px] text-[#3a4a44]">
            {{ step.desc }}
          </p>
        </div>
      </li>
    </ol>

    <!-- 分隔线 + 说明：mt-[24px] 起线、pt-[16px] 后写 13px/20px 小字，线用全站同款 ink-100 -->
    <div class="mt-[24px] border-t border-ink-100 pt-[16px]">
      <p class="text-[13px] leading-[20px] text-[#8fa8a0]">{{ timeline.note }}</p>
    </div>
  </article>
</template>
