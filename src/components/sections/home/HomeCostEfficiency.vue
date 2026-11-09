<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.04
 * @Name: 首页第十屏：降本增效
-->
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useReveal } from '@/composables/useReveal'
import { siteConfig } from '@/config/site'

const { costEfficiency } = siteConfig

const root = useTemplateRef<HTMLElement>('root')
useReveal(root)
</script>

<template>
  <!-- 区块：cost-bg 暖白渐变底（顶 #fff7f0 → 近白，见 style）；
       pt-[96px] 上留白 96px、pb-[64px] 下留白 64px -->
  <section ref="root" class="cost-bg relative pb-[64px] pt-[96px]">
    <div class="container-page">
      <!-- 眉题：11px/16px 加粗、字距 0.05em（sm 起 0.2em）、brand-500 橙 -->
      <p
        class="reveal text-[11px] font-semibold leading-[16px] tracking-[0.05em] text-brand-500 sm:tracking-[0.2em]"
        style="--d: 0ms"
      >
        {{ costEfficiency.eyebrow }}
      </p>

      <!-- 标题：mt-[44px] 与眉题间距 44px；32px/42px 加粗、ink-900 -->
      <h2
        class="reveal mt-[44px] text-[32px] font-bold leading-[42px] text-ink-900"
        style="--d: 80ms"
      >
        {{ costEfficiency.title }}
      </h2>

      <!-- 说明：mt-[24px] 与标题间距 24px；14px/24px、ink-600 -->
      <p class="reveal mt-[24px] text-[14px] leading-[24px] text-ink-600" style="--d: 160ms">
        {{ costEfficiency.desc }}
      </p>

      <!-- 风险卡栅格：mt-[36px] 与说明间距 36px、gap-[18px]；
           手机 1 列 → sm 2 列 → lg 4 列。白卡暖调细边框 #eee3da -->
      <div class="mt-[36px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(risk, i) in costEfficiency.risks"
          :key="risk.title"
          class="reveal card-lift rounded-[12px] border border-[#eee3da] bg-white p-[24px]"
          :style="{ '--d': `${240 + i * 70}ms` }"
        >
          <!-- 卡标题：16px/24px 加粗 -->
          <h3 class="text-[16px] font-bold leading-[24px] text-ink-900">{{ risk.title }}</h3>
          <!-- 处罚行：mt-[10px]；13px/20px 加粗、#d24c0f 深橙红（原型最饱和像素取色） -->
          <p class="mt-[10px] text-[13px] font-semibold leading-[20px] text-[#d24c0f]">
            {{ risk.penalty }}
          </p>
          <!-- 防控行：mt-[8px]；12px/20px、ink-600 -->
          <p class="mt-[8px] text-[12px] leading-[20px] text-ink-600">{{ risk.guard }}</p>
        </article>
      </div>

      <!-- 收益宽卡：mt-[24px] 与风险卡间距 24px；rounded-[12px]、白底暖边、
           px-[32px] py-[36px]；内部四列 gap-[32px]（手机 1 列 → sm 2 列 → lg 4 列） -->
      <div
        class="reveal mt-[24px] rounded-[12px] border border-[#eee3da] bg-white px-[32px] py-[36px]"
        style="--d: 560ms"
      >
        <div class="grid grid-cols-1 gap-[32px] sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="gain in costEfficiency.gains" :key="gain.title">
            <!-- 小色条：24×4、rounded-full，绿 #36ad85 / 橙 #f58546（原型取色） -->
            <span
              class="block h-[4px] w-[24px] rounded-full"
              :class="gain.tone === 'green' ? 'bg-[#36ad85]' : 'bg-[#f58546]'"
            />
            <!-- 标题：mt-[16px] 与色条间距 16px；15px/22px 加粗 -->
            <h3 class="mt-[16px] text-[15px] font-bold leading-[22px] text-ink-900">
              {{ gain.title }}
            </h3>
            <!-- 描述：mt-[8px]；13px/22px、ink-600 -->
            <p class="mt-[8px] text-[13px] leading-[22px] text-ink-600">{{ gain.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cost-bg {
  background: linear-gradient(180deg, #fff7f0 0%, #fff9f2 55%, #fffcf9 100%);
}
</style>
