/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.11
 * @Name: 弹层滚动锁
 */
import { onBeforeUnmount, watch, type Ref } from 'vue'

// 顶栏菜单、预约弹层、外链确认层都要锁 body，各自直接写 style.overflow 会互相顶掉：
// 两层一起开着时先关的那个把 overflow 还原成 ''，背景就在剩下那层底下滑起来了。
// 改成计数：谁最后关谁还原，开头记下原值，别把别的样式冲掉。
let locks = 0
let saved = ''

function lock() {
  if (locks++ === 0) {
    saved = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
}

function unlock() {
  if (locks === 0) return
  if (--locks === 0) document.body.style.overflow = saved
}

/** 传入开关状态，开着锁滚动、关掉解锁；组件卸载时自动还回去 */
export function useScrollLock(open: Ref<boolean>) {
  let held = false

  const sync = (on: boolean) => {
    if (on === held) return
    held = on
    if (on) lock()
    else unlock()
  }

  watch(open, sync, { immediate: true })
  onBeforeUnmount(() => sync(false))
}
