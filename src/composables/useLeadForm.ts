/**
 * @Name: 预约演示表单的全局开关
 * 状态放在模块顶层，任何组件调 openLeadForm 都能唤起 App.vue 里那一个弹层实例。
 */
import { ref } from 'vue'

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
