<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 预约产品演示表单弹层（全站唯一实例，挂在 App.vue）
-->
<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { LeadApiError, productTypesForRoute, submitLead, type LeadPayload } from '@/api/lead'
import { useLeadForm } from '@/composables/useLeadForm'
import { siteConfig } from '@/config/site'
import logoMark from '@/assets/brand/logo.webp'

const { open, closeLeadForm } = useLeadForm()

// 产品页打开弹窗就带上那条产品线，其余页面按整体方案提交
const route = useRoute()

// 文案和选项都在 config/brand/data.ts 的 leadForm 里，这里不写死
const { leadForm } = siteConfig

const form = reactive<LeadPayload>({
  name: '',
  company: '',
  region: '',
  phone: '',
  note: '',
})

const errors = reactive<{ name?: string; phone?: string }>({})
const status = ref<'idle' | 'submitting' | 'done'>('idle')
const submitError = ref('')
const nameEl = useTemplateRef<HTMLInputElement>('nameEl')

// 四个输入项共用一套皮：12px 圆角、16px 内边距，聚焦亮橙描边 + 3px 淡橙光圈（比只换边框色更抓眼）；
// 高度不写进来，单行框给 48px、备注框自己给高度
const fieldClass =
  'mt-[8px] w-full rounded-[12px] border border-ink-200 bg-white px-[16px] text-sm text-ink-900 outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/15'
const fieldError = 'border-[#e05b3f] focus:border-[#e05b3f] focus:ring-[#e05b3f]/15'

// 只在提交时校验，填的过程中不打断；公司、地区选填不拦。
// 手机号四段：1 开头、第二位 3-9、共 11 位
const validate = () => {
  errors.name = form.name.trim() ? undefined : leadForm.errors.name
  errors.phone = /^1[3-9]\d{9}$/.test(form.phone.trim()) ? undefined : leadForm.errors.phone
  return !errors.name && !errors.phone
}

const reset = () => {
  form.name = ''
  form.company = ''
  form.region = ''
  form.phone = ''
  form.note = ''
  errors.name = undefined
  errors.phone = undefined
  submitError.value = ''
  status.value = 'idle'
}

const onSubmit = async () => {
  if (status.value === 'submitting' || !validate()) return
  status.value = 'submitting'
  submitError.value = ''
  try {
    await submitLead(
      {
        ...form,
        name: form.name.trim(),
        company: form.company.trim(),
        region: form.region.trim(),
        phone: form.phone.trim(),
      },
      productTypesForRoute(route.path),
    )
    status.value = 'done'
  } catch (err) {
    // 后端拒绝优先透出 msg；断网 / 超时 / msg 为空都回落到配置的兜底文案
    submitError.value =
      err instanceof LeadApiError && err.message ? err.message : leadForm.errors.submit
    status.value = 'idle'
  }
}

// 打开时清空上一次的输入并聚焦姓名；关闭时全部复位，下次打开是干净表单
watch(open, (isOpen) => {
  if (isOpen) {
    reset()
    nextTick(() => nameEl.value?.focus())
  }
})

// 弹层打开时锁滚动 + Esc 关闭，关闭时把 body 的 overflow 原样还回去
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeLeadForm()
}

watch(open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lead">
      <!-- 遮罩：满屏墨色 40% + 3px 模糊，z-[110] 压过外链确认层（z-100），点空白处关闭 -->
      <div
        v-if="open"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-ink-900/40 px-[20px] py-[40px] backdrop-blur-[3px]"
        @click.self="closeLeadForm"
      >
        <!-- 弹窗：上限 600px、内边距 32px、圆角 20px；两列排布把高度压到 600 以内，比例接近正方形才稳 -->
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-title"
          class="max-h-full w-full max-w-[600px] overflow-y-auto rounded-[20px] bg-white p-[24px] shadow-[0_40px_100px_-32px_rgba(26,26,26,0.45)] sm:p-[32px]"
        >
          <!-- 头部：44px 浅橙圆角托住品牌标，标题 20px、说明 13px 中灰；关闭键贴右上 -->
          <div class="flex items-start justify-between gap-[16px]">
            <div class="flex min-w-0 items-start gap-[14px]">
              <span
                class="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[13px] bg-[#fff1e8]"
                aria-hidden="true"
              >
                <img :src="logoMark" alt="" class="h-[26px] w-[26px] select-none object-contain" />
              </span>
              <div class="min-w-0">
                <h3 id="lead-title" class="text-[20px] font-semibold leading-[28px] text-ink-900">
                  {{ leadForm.title }}
                </h3>
                <p class="mt-[4px] text-[13px] leading-[22px] text-ink-500 sm:mt-[6px]">
                  {{ leadForm.desc }}
                </p>
              </div>
            </div>
            <button
              type="button"
              :aria-label="leadForm.closeLabel"
              class="-mr-[8px] -mt-[4px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[10px] text-ink-400 transition-colors duration-200 hover:bg-ink-50 hover:text-ink-900"
              @click="closeLeadForm"
            >
              <svg class="h-[16px] w-[16px]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="m4 4 8 8M12 4l-8 8"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

          <!-- 成功态：浅绿圆托对勾，标题 20px 跟弹窗标题一级；不再显示表单 -->
          <div v-if="status === 'done'" class="px-[8px] pt-[36px] pb-[8px] text-center">
            <span
              class="mx-auto flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#eaf7f1]"
            >
              <svg class="h-[28px] w-[28px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m5 12.5 4.6 4.6L19 7.5"
                  stroke="#2f9e6e"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p class="mt-[20px] text-[20px] font-semibold leading-[28px] text-ink-900">
              {{ leadForm.successTitle }}
            </p>
            <p class="mt-[8px] text-[13px] leading-[22px] text-ink-500">
              {{ leadForm.successDesc }}
            </p>
            <button
              type="button"
              class="mt-[28px] h-[44px] min-w-[160px] rounded-[12px] bg-brand-500 px-[26px] text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(233,97,31,0.6)] transition-colors duration-200 hover:bg-brand-600"
              @click="closeLeadForm"
            >
              {{ leadForm.doneLabel }}
            </button>
          </div>

          <!-- 表单：手机 mt-[20px] 跟头部拉开（桌面 28px）；手机一行一个，≥640 短字段两列、备注独占整行 -->
          <form v-else class="mt-[18px] sm:mt-[28px]" @submit.prevent="onSubmit">
            <div class="grid gap-[16px] sm:grid-cols-2 sm:gap-[18px]">
              <label class="block">
                <span class="text-[12px] font-medium text-ink-500"
                  >{{ leadForm.labels.name }} <em class="not-italic text-[#d9534f]">*</em></span
                >
                <input
                  ref="nameEl"
                  v-model="form.name"
                  type="text"
                  maxlength="20"
                  :placeholder="leadForm.placeholders.name"
                  :class="[fieldClass, 'h-[48px]', errors.name && fieldError]"
                />
                <span v-if="errors.name" class="mt-[6px] block text-[12px] text-[#d9534f]">{{
                  errors.name
                }}</span>
              </label>

              <!-- 公司：选填，只有姓名和手机号卡提交 -->
              <label class="block">
                <span class="text-[12px] font-medium text-ink-500"
                  >{{ leadForm.labels.company }}
                  <span class="font-normal text-ink-400">{{ leadForm.optionalTip }}</span></span
                >
                <input
                  v-model="form.company"
                  type="text"
                  maxlength="40"
                  :placeholder="leadForm.placeholders.company"
                  :class="[fieldClass, 'h-[48px]']"
                />
              </label>

              <!-- 手机号：type=tel 唤起数字键盘，inputmode 数字 -->
              <label class="block">
                <span class="text-[12px] font-medium text-ink-500"
                  >{{ leadForm.labels.phone }} <em class="not-italic text-[#d9534f]">*</em></span
                >
                <input
                  v-model="form.phone"
                  type="tel"
                  inputmode="numeric"
                  maxlength="11"
                  :placeholder="leadForm.placeholders.phone"
                  :class="[fieldClass, 'h-[48px]', errors.phone && fieldError]"
                />
                <span v-if="errors.phone" class="mt-[6px] block text-[12px] text-[#d9534f]">{{
                  errors.phone
                }}</span>
              </label>

              <!-- 地区：选填，方便顾问就近安排 -->
              <label class="block">
                <span class="text-[12px] font-medium text-ink-500"
                  >{{ leadForm.labels.region }}
                  <span class="font-normal text-ink-400">{{ leadForm.optionalTip }}</span></span
                >
                <input
                  v-model="form.region"
                  type="text"
                  maxlength="30"
                  :placeholder="leadForm.placeholders.region"
                  :class="[fieldClass, 'h-[48px]']"
                />
              </label>
            </div>

            <!-- 备注：mt-[22px] 比字段间距大一档，把「联系方式」和「备注」分成两组；固定 88px 够三行 -->
            <label class="mt-[18px] block sm:mt-[22px]">
              <span class="text-[12px] font-medium text-ink-500"
                >{{ leadForm.labels.note }}
                <span class="font-normal text-ink-400">{{ leadForm.optionalTip }}</span></span
              >
              <textarea
                v-model="form.note"
                maxlength="200"
                :placeholder="leadForm.notePlaceholder"
                :class="[fieldClass, 'h-[88px] resize-none py-[11px] leading-[22px]']"
              />
            </label>

            <p v-if="submitError" class="mt-[12px] text-[12px] text-[#d9534f]">{{ submitError }}</p>

            <!-- 页脚：左边电话兜底，右边取消（纯文字）+ 提交（实心块），只留一个视觉重心。
                 手机把上间距和分割线留白各收一档，整窗才在 844 高的屏里放得下 -->
            <div
              class="mt-[18px] flex flex-wrap items-center justify-between gap-[12px] border-t border-ink-100 pt-[14px] sm:mt-[28px] sm:pt-[22px]"
            >
              <a
                :href="siteConfig.contact.phoneHref"
                class="text-[12px] text-ink-400 transition-colors duration-200 hover:text-brand-500"
              >
                {{ leadForm.phoneTip }} {{ siteConfig.contact.phone }}
              </a>
              <!-- 按钮：手机取消按文字宽度、提交吃掉剩余整行，视觉只有一个重心；桌面都按内容宽度 -->
              <div class="flex w-full items-center justify-end gap-[8px] sm:w-auto">
                <button
                  type="button"
                  class="h-[44px] rounded-[12px] px-[18px] text-sm font-medium text-ink-500 transition-colors duration-200 hover:bg-ink-50 hover:text-ink-900"
                  @click="closeLeadForm"
                >
                  {{ leadForm.cancelLabel }}
                </button>
                <button
                  type="submit"
                  :disabled="status === 'submitting'"
                  class="h-[44px] flex-1 rounded-[12px] bg-brand-500 px-[28px] text-sm font-medium text-white shadow-[0_10px_24px_-10px_rgba(233,97,31,0.6)] transition-colors duration-200 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none sm:min-w-[140px]"
                >
                  {{ status === 'submitting' ? leadForm.submittingLabel : leadForm.submitLabel }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lead-enter-active,
.lead-leave-active {
  transition: opacity 200ms ease;
}

.lead-enter-active > div,
.lead-leave-active > div {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.lead-enter-from,
.lead-leave-to {
  opacity: 0;
}

.lead-enter-from > div,
.lead-leave-to > div {
  transform: translateY(10px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .lead-enter-active,
  .lead-leave-active,
  .lead-enter-active > div,
  .lead-leave-active > div {
    transition: none;
  }
}
</style>
