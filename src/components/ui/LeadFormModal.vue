<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 预约产品演示表单弹层（全站唯一实例，挂在 App.vue）
-->
<script setup lang="ts">
import { nextTick, onBeforeUnmount, reactive, ref, useTemplateRef, watch } from 'vue'
import { submitLead, type LeadPayload } from '@/api/lead'
import { useLeadForm } from '@/composables/useLeadForm'
import { siteConfig } from '@/config/site'
import logoMark from '@/assets/brand/logo.webp'

const { open, closeLeadForm } = useLeadForm()

// 产品线选项：和导航三条业务线对齐，最后一项兜「都看看」的客户
const INTERESTS = ['化工生产', '物流调度', '司机端', '整体方案']

const form = reactive<LeadPayload>({
  name: '',
  company: '',
  phone: '',
  interest: '',
  note: '',
})

const errors = reactive<{ name?: string; company?: string; phone?: string }>({})
const status = ref<'idle' | 'submitting' | 'done'>('idle')
const submitError = ref('')
const nameEl = useTemplateRef<HTMLInputElement>('nameEl')

// 只在提交时校验，填的过程中不打断；四段手机号：1 开头、第二位 3-9、共 11 位
const validate = () => {
  errors.name = form.name.trim() ? undefined : '请填写联系人姓名'
  errors.company = form.company.trim() ? undefined : '请填写公司名称'
  errors.phone = /^1[3-9]\d{9}$/.test(form.phone.trim()) ? undefined : '请填写 11 位手机号'
  return !errors.name && !errors.company && !errors.phone
}

const reset = () => {
  form.name = ''
  form.company = ''
  form.phone = ''
  form.interest = ''
  form.note = ''
  errors.name = undefined
  errors.company = undefined
  errors.phone = undefined
  submitError.value = ''
  status.value = 'idle'
}

const onSubmit = async () => {
  if (status.value === 'submitting' || !validate()) return
  status.value = 'submitting'
  submitError.value = ''
  try {
    await submitLead({ ...form, name: form.name.trim(), company: form.company.trim(), phone: form.phone.trim() })
    status.value = 'done'
  } catch (err) {
    submitError.value = err instanceof Error ? err.message : '提交失败，请稍后重试'
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
      <!-- 遮罩：fixed inset-0 满屏，z-[110] 压过外链确认层（z-100），点空白处关闭 -->
      <div
        v-if="open"
        class="fixed inset-0 z-[110] flex items-center justify-center bg-ink-900/50 px-[20px] py-[40px] backdrop-blur-[2px]"
        @click.self="closeLeadForm"
      >
        <!-- 弹窗：宽上限 600px，内边距 32px，圆角 16px；内容超高时自身滚动 -->
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-title"
          class="max-h-full w-full max-w-[600px] overflow-y-auto rounded-2xl bg-white p-[32px] shadow-[0_40px_90px_-30px_rgba(26,26,26,0.55)]"
        >
          <!-- 标题区：品牌标 + 标题说明在左侧，右侧只留 32px 关闭按钮 -->
          <div class="flex items-start justify-between gap-[16px]">
            <!-- 品牌标：32px 见方，纯标识不带文字（弹窗里放全称会挤），与标题间距 12 -->
            <div class="flex min-w-0 items-center gap-[12px]">
              <img :src="logoMark" alt="" aria-hidden="true" class="h-[32px] w-[32px] shrink-0 select-none object-contain" />
              <div>
                <h3 id="lead-title" class="text-[18px] font-semibold leading-[26px] text-ink-900">
                  预约产品演示
                </h3>
                <p class="mt-[6px] text-[13px] leading-[22px] text-ink-600">
                  留下联系方式，顾问将在 1 个工作日内与您联系。
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="关闭"
              class="-mr-[6px] -mt-[4px] flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors duration-200 hover:bg-ink-50 hover:text-ink-700"
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

          <!-- 成功态：对勾 + 文案 + 关闭；不再显示表单 -->
          <div v-if="status === 'done'" class="pt-[32px] pb-[8px] text-center">
            <span
              class="mx-auto flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#eaf7f1]"
            >
              <svg class="h-[26px] w-[26px]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="m5 12.5 4.6 4.6L19 7.5"
                  stroke="#2f9e6e"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <p class="mt-[16px] text-[16px] font-semibold text-ink-900">提交成功</p>
            <p class="mt-[8px] text-[13px] leading-[22px] text-ink-600">
              我们已收到您的预约，顾问会尽快与您联系。
            </p>
            <button
              type="button"
              class="mt-[24px] rounded-lg bg-brand-500 px-[24px] py-[10px] text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-600"
              @click="closeLeadForm"
            >
              完成
            </button>
          </div>

          <!-- 表单：手机单列，≥640 姓名和公司并排；各项间距 16px -->
          <form v-else class="mt-[24px]" @submit.prevent="onSubmit">
            <div class="grid gap-[16px] sm:grid-cols-2">
              <!-- 名称两项：标签 13px，输入框高 44px、圆角 8px，聚焦时品牌橙描边 -->
              <label class="block">
                <span class="text-[13px] font-medium text-ink-700">姓名 <em class="not-italic text-[#d9534f]">*</em></span>
                <input
                  ref="nameEl"
                  v-model="form.name"
                  type="text"
                  maxlength="20"
                  placeholder="您的称呼"
                  :class="[
                    'mt-[6px] h-[44px] w-full rounded-lg border bg-white px-[12px] text-sm text-ink-900 outline-none transition-colors duration-200 placeholder:text-ink-400 focus:border-brand-500',
                    errors.name ? 'border-[#e05b3f]' : 'border-ink-200 hover:border-ink-300',
                  ]"
                />
                <span v-if="errors.name" class="mt-[4px] block text-[12px] text-[#d9534f]">{{ errors.name }}</span>
              </label>

              <label class="block">
                <span class="text-[13px] font-medium text-ink-700">公司 <em class="not-italic text-[#d9534f]">*</em></span>
                <input
                  v-model="form.company"
                  type="text"
                  maxlength="40"
                  placeholder="公司全称"
                  :class="[
                    'mt-[6px] h-[44px] w-full rounded-lg border bg-white px-[12px] text-sm text-ink-900 outline-none transition-colors duration-200 placeholder:text-ink-400 focus:border-brand-500',
                    errors.company ? 'border-[#e05b3f]' : 'border-ink-200 hover:border-ink-300',
                  ]"
                />
                <span v-if="errors.company" class="mt-[4px] block text-[12px] text-[#d9534f]">{{ errors.company }}</span>
              </label>
            </div>

            <!-- 手机号：单独一行，type=tel 唤起数字键盘，inputmode 数字 -->
            <label class="mt-[16px] block">
              <span class="text-[13px] font-medium text-ink-700">手机号 <em class="not-italic text-[#d9534f]">*</em></span>
              <input
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                maxlength="11"
                placeholder="便于顾问与您联系"
                :class="[
                  'mt-[6px] h-[44px] w-full rounded-lg border bg-white px-[12px] text-sm text-ink-900 outline-none transition-colors duration-200 placeholder:text-ink-400 focus:border-brand-500',
                  errors.phone ? 'border-[#e05b3f]' : 'border-ink-200 hover:border-ink-300',
                ]"
              />
              <span v-if="errors.phone" class="mt-[4px] block text-[12px] text-[#d9534f]">{{ errors.phone }}</span>
            </label>

            <!-- 关注产品：单选胶囊，选中品牌橙描边 + 浅橙底；不选也能提交 -->
            <div class="mt-[16px]">
              <span class="text-[13px] font-medium text-ink-700">想了解的产品</span>
              <div class="mt-[8px] flex flex-wrap gap-[8px]">
                <button
                  v-for="item in INTERESTS"
                  :key="item"
                  type="button"
                  :class="[
                    'rounded-full border px-[14px] py-[6px] text-[13px] leading-none transition-colors duration-200',
                    form.interest === item
                      ? 'border-brand-500 bg-[#fff1e8] font-medium text-[#c4520f]'
                      : 'border-ink-200 text-ink-600 hover:border-ink-300 hover:text-ink-900',
                  ]"
                  @click="form.interest = form.interest === item ? '' : item"
                >
                  {{ item }}
                </button>
              </div>
            </div>

            <!-- 备注：选填，三行高，右下角字数提示 -->
            <label class="mt-[16px] block">
              <span class="text-[13px] font-medium text-ink-700">需求备注 <span class="font-normal text-ink-400">（选填）</span></span>
              <textarea
                v-model="form.note"
                rows="3"
                maxlength="200"
                placeholder="简单描述您的场景或想看的模块"
                class="mt-[6px] w-full resize-none rounded-lg border border-ink-200 bg-white px-[12px] py-[10px] text-sm leading-[22px] text-ink-900 outline-none transition-colors duration-200 placeholder:text-ink-400 hover:border-ink-300 focus:border-brand-500"
              />
            </label>

            <p v-if="submitError" class="mt-[12px] text-[13px] text-[#d9534f]">{{ submitError }}</p>

            <!-- 页脚：左侧电话兜底，右侧取消 + 提交；分割线上留 24 -->
            <div class="mt-[24px] flex flex-wrap items-center justify-between gap-[12px] border-t border-ink-100 pt-[20px]">
              <a
                :href="siteConfig.contact.phoneHref"
                class="text-[13px] text-ink-500 transition-colors duration-200 hover:text-brand-500"
              >
                或直接致电 {{ siteConfig.contact.phone }}
              </a>
              <div class="flex items-center gap-[12px]">
                <button
                  type="button"
                  class="rounded-lg border border-ink-200 px-[20px] py-[9px] text-sm font-medium text-ink-700 transition-colors duration-200 hover:border-ink-300 hover:bg-ink-50 hover:text-ink-900"
                  @click="closeLeadForm"
                >
                  取消
                </button>
                <button
                  type="submit"
                  :disabled="status === 'submitting'"
                  class="rounded-lg bg-brand-500 px-[20px] py-[9px] text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(233,97,31,0.55)] transition-colors duration-200 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {{ status === 'submitting' ? '提交中…' : '提交预约' }}
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
