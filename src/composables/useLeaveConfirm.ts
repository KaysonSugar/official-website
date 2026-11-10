/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 外链确认弹层开关
 */
import { ref } from 'vue'

// 状态放在模块顶层，任意组件都能唤起 App.vue 挂载的 LeaveConfirmModal
const visible = ref(false)
const url = ref('')
const desc = ref('')

function openLeaveConfirm(target: string, tip: string) {
  url.value = target
  desc.value = tip
  visible.value = true
}

function closeLeaveConfirm() {
  visible.value = false
}

// 确认后新标签打开，noopener 防止新页面拿到 window.opener
export function confirmLeave() {
  const target = url.value
  visible.value = false
  window.open(target, '_blank', 'noopener')
}

export function useLeaveConfirm() {
  return { visible, url, desc, openLeaveConfirm, closeLeaveConfirm }
}
