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
 * 用户上传的 Hero Timeline Card.png 是烘焙文字的位图，非整数缩放下必糊
 * （首页首屏两张悬浮卡踩过同一个坑），所以照着图重建成 DOM 卡，
 * 配色逐个从原图采样：序号块三种浅底彩字 + 一种深绿底白字。
 */
const { timeline } = siteConfig.support

// tone → 序号块配色。1 橙 / 2 绿 / 3 橘红是浅底彩字，4 是深绿实底白字
const toneClass: Record<string, string> = {
  orange: 'bg-[#fce3d0] text-[#c2622a]',
  green: 'bg-[#dbf0e5] text-[#1c8a66]',
  salmon: 'bg-[#fae4d9] text-[#c95a34]',
  dark: 'bg-[#13322a] text-white',
}
</script>

<template>
  <!-- 卡体：白底 + 1px 极淡描边 + 大投影柔影，跟首页看板卡一个量级。
       鼠标进入上浮 8px，与首页首屏/化工首屏同一套手感（8px 走整数物理像素，卡内 13px 小字不重采样） -->
  <article
    class="rounded-[16px] bg-white p-[28px] shadow-[0_28px_70px_-24px_rgba(16,37,30,0.2)] ring-1 ring-black/5 transition-transform duration-500 ease-out hover:-translate-y-2"
  >
    <!-- 标题行：左标题右工期徽标 -->
    <div class="flex items-center justify-between gap-4">
      <h3 class="text-[18px] font-bold leading-[26px] text-ink-900">{{ timeline.title }}</h3>
      <!-- 工期徽标：浅橙底 + 陶土橙字，色值从原图采的，比品牌橙灰一档 -->
      <span
        class="shrink-0 rounded-full bg-[#fff0e4] px-[12px] py-[5px] text-[13px] font-semibold leading-[18px] text-[#c2622a]"
      >
        {{ timeline.badge }}
      </span>
    </div>

    <!-- 四行步骤：序号块 44px，右侧小灰字标签 + 加粗正文 -->
    <ol class="mt-[24px] space-y-[22px]">
      <li v-for="step in timeline.steps" :key="step.no" class="flex gap-[14px]">
        <span
          :class="toneClass[step.tone]"
          class="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] text-[16px] font-bold"
        >
          {{ step.no }}
        </span>
        <div class="min-w-0 pt-[1px]">
          <p class="text-[13px] leading-[18px] text-[#8fa8a0]">{{ step.label }}</p>
          <!-- 正文比标签深两档但不到纯黑，照原图的墨绿灰 -->
          <p class="mt-[5px] text-[15px] font-semibold leading-[22px] text-[#3a4a44]">
            {{ step.desc }}
          </p>
        </div>
      </li>
    </ol>

    <!-- 分隔线 + 说明小字：细线用 ink-100，和全站分隔线同款 -->
    <div class="mt-[24px] border-t border-ink-100 pt-[16px]">
      <p class="text-[13px] leading-[20px] text-[#8fa8a0]">{{ timeline.note }}</p>
    </div>
  </article>
</template>
