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
       fixed inset-0 满屏遮罩，z-[100] 盖住顶栏，bg-ink-900/50 + 2px backdrop-blur；
       点遮罩空白处或 Esc 关闭，确认后才开新标签 -->
  <Teleport to="body">
    <Transition name="leave-tip">
      <div
        v-if="visible"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/50 px-[20px] backdrop-blur-[2px]"
        @click.self="closeLeaveConfirm"
      >
        <!-- 弹窗卡片：宽上限 460px、内边距 32px、圆角 16px，深投影 -->
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="leave-tip-title"
          class="w-full max-w-[460px] rounded-2xl bg-white p-[32px] shadow-[0_40px_90px_-30px_rgba(26,26,26,0.55)]"
        >
          <!-- 头部：flex 横排，gap-[16px] 图标与文字间距，items-start 顶部对齐 -->
          <div class="flex items-start gap-[16px]">
            <!-- 警示图标：40px 圆形橙底（rounded-full），内含 20px 叹号，shrink-0 不被压缩 -->
            <span
              class="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#fff1e8]"
              aria-hidden="true"
            >
              <svg class="h-[20px] w-[20px]" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 5.2v5.6"
                  stroke="#e06a1f"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <circle cx="10" cy="14.6" r="1.3" fill="#e06a1f" />
              </svg>
            </span>
            <!-- 文字区：min-w-0 允许收缩，长说明不会把弹窗撑宽 -->
            <div class="min-w-0">
              <!-- 标题：18px 半粗，行高 26px -->
              <h3 id="leave-tip-title" class="text-[18px] font-semibold leading-[26px] text-ink-900">
                {{ leaveConfirm.title }}
              </h3>
              <!-- 说明：14px、行高 24px，mt-[8px] 与标题间距 8px；文案由调用方传入 -->
              <p class="mt-[8px] text-sm leading-[24px] text-ink-600">
                {{ desc }}
              </p>
            </div>
          </div>

          <!-- 链接框：mt-[20px]，浅灰底，px 16 / py 12 内边距；等宽字体，
               break-all 让长链接强制折行不撑宽弹窗 -->
          <p
            class="mt-[20px] rounded-lg bg-[#f6f7f6] px-[16px] py-[12px] font-mono text-[13px] leading-[20px] break-all text-ink-500"
          >
            {{ url }}
          </p>

          <!-- 页脚：mt-[28px] + pt-[24px]，border-t 顶部分割线，gap-[12px] 按钮间距，右对齐 -->
          <div class="mt-[28px] flex items-center justify-end gap-[12px] border-t border-ink-100 pt-[24px]">
            <!-- 取消：描边按钮，px 22 / py 9，hover 描边与底色加深 -->
            <button
              type="button"
              class="rounded-lg border border-ink-200 px-[22px] py-[9px] text-sm font-medium text-ink-700 transition-colors duration-200 hover:border-ink-300 hover:bg-ink-50 hover:text-ink-900"
              @click="closeLeaveConfirm"
            >
              {{ leaveConfirm.cancel }}
            </button>
            <!-- 继续访问：品牌橙实底，px 22 / py 9，带橙色投影 -->
            <button
              type="button"
              class="rounded-lg bg-brand-500 px-[22px] py-[9px] text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(233,97,31,0.55)] transition-colors duration-200 hover:bg-brand-600"
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
