/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 预约演示表单开关
 */
import { ref } from 'vue'

// 状态放在模块顶层，任何组件都唤起 App.vue 里那一个弹层实例
const open = ref(false)

export function useLeadForm() {
  return {
    open,
    openLeadForm: () => {
      open.value = true
    },
    closeLeadForm: () => {
      open.value = false
    },
  }
}
