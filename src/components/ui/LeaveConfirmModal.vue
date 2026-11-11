<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 外链确认弹层：全站共用，由 useLeaveConfirm 唤起，确认后新标签打开目标地址
-->
<script setup lang="ts">
import { watch } from 'vue'
import { siteConfig } from '@/config/site'
import { useLeaveConfirm, confirmLeave } from '@/composables/useLeaveConfirm'

const { visible, url, desc, closeLeaveConfirm } = useLeaveConfirm()
const { leaveConfirm } = siteConfig

// Esc 关闭；关闭时解锁 body 滚动
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeLeaveConfirm()
}

watch(visible, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
  }
})
</script>

<template>
  <!-- 全站唯一外链确认层：Teleport 到 body，避开各 section 的 overflow-hidden 与层级；
       fixed inset-0 满屏遮罩，z-[100]，点遮罩空白处或 Esc 关闭，确认后才开新标签 -->
  <Teleport to="body">
    <Transition name="leave-tip">
      <div
        v-if="visible"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/40 px-[20px] backdrop-blur-[3px]"
        @click.self="closeLeaveConfirm"
      >
        <!-- 弹窗卡片：宽上限 440px、内边距 32px、圆角 20px，跟预约弹层同一套尺子 -->
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="leave-tip-title"
          class="w-full max-w-[440px] rounded-[20px] bg-white p-[32px] shadow-[0_40px_100px_-32px_rgba(26,26,26,0.45)]"
        >
          <!-- 头部：44px 浅橙圆角托住跳出图标，标题 20px、说明 13px 中灰，顶部对齐 -->
          <div class="flex items-start gap-[14px]">
            <span
              class="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[13px] bg-[#fff1e8]"
              aria-hidden="true"
            >
              <!-- 跳出图标：24px 见方，1.8px 品牌橙描边，方框开口 + 右上箭头表示新标签打开 -->
              <svg
                class="h-[22px] w-[22px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e9611f"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M15 3h6v6" />
                <path d="M10 15 21 4" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
            </span>
            <!-- 文字区：min-w-0 允许收缩，长说明不会把弹窗撑宽 -->
            <div class="min-w-0">
              <h3
                id="leave-tip-title"
                class="text-[20px] font-semibold leading-[28px] text-ink-900"
              >
                {{ leaveConfirm.title }}
              </h3>
              <!-- 说明：13px、行高 22px，mt-[6px] 跟标题贴合；文案由调用方传入 -->
              <p class="mt-[6px] text-[13px] leading-[22px] text-ink-500">
                {{ desc }}
              </p>
            </div>
          </div>

          <!-- 链接框：mt-[24px]，浅灰底 10px 圆角；等宽小字，break-all 让长链接强制折行不撑宽弹窗 -->
          <p
            class="mt-[24px] rounded-[10px] bg-[#f6f7f6] px-[14px] py-[10px] font-mono text-[12px] leading-[18px] break-all text-ink-500"
          >
            {{ url }}
          </p>

          <!-- 页脚：mt-[24px] + pt-[22px]，顶部分割线，按钮右对齐、统一 42px 高 -->
          <div
            class="mt-[24px] flex items-center justify-end gap-[10px] border-t border-ink-100 pt-[22px]"
          >
            <button
              type="button"
              class="h-[42px] min-w-[80px] rounded-[10px] border border-ink-200 px-[20px] text-sm font-medium text-ink-700 transition-colors duration-200 hover:border-ink-300 hover:bg-ink-50 hover:text-ink-900"
              @click="closeLeaveConfirm"
            >
              {{ leaveConfirm.cancel }}
            </button>
            <button
              type="button"
              class="h-[42px] min-w-[112px] rounded-[10px] bg-brand-500 px-[22px] text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(233,97,31,0.6)] transition-colors duration-200 hover:bg-brand-600"
              @click="confirmLeave"
            >
              {{ leaveConfirm.confirm }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.leave-tip-enter-active,
.leave-tip-leave-active {
  transition: opacity 200ms ease;
}

.leave-tip-enter-from,
.leave-tip-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .leave-tip-enter-active,
  .leave-tip-leave-active {
    transition: none;
  }
}
</style>
