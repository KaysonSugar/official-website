// 外链确认弹层的全局开关：任意组件调用 openLeaveConfirm 都会唤起 App.vue 挂载的
// LeaveConfirmModal，确认后新标签打开目标地址（noopener 防止新页面拿到 window.opener）
import { ref } from 'vue'

const visible = ref(false)
const url = ref('')
const desc = ref('')

export function useLeaveConfirm() {
  return { visible, url, desc, openLeaveConfirm, closeLeaveConfirm }
}

function openLeaveConfirm(target: string, tip: string) {
  url.value = target
  desc.value = tip
  visible.value = true
}

function closeLeaveConfirm() {
  visible.value = false
}

export function confirmLeave() {
  const target = url.value
  visible.value = false
  window.open(target, '_blank', 'noopener')
}
