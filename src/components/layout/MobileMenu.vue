<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 移动端导航菜单
-->
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'
import { useLeadForm } from '@/composables/useLeadForm'

defineProps<{ open: boolean }>()

const emit = defineEmits<{ close: [] }>()

const route = useRoute()
const activePath = computed(() => route.path)

// 模板里好几处 @click 都要收菜单，包一层省得重复 emit
const closeMenu = () => emit('close')

const { openLeadForm } = useLeadForm()
// 先收菜单再开弹层，不然两个层叠在一起
const onCta = () => {
  closeMenu()
  openLeadForm()
}
</script>

<template>
  <!-- v-show 切 display，DOM 留着，开关不卡；absolute + top-full 紧贴顶栏下沿，横向铺满；
       ≥1024 隐藏。限高 = 视口减 64（顶栏高度），内容多了内部滚动。
       Transition 包在外面做下滑展开，v-show 还留在 nav 上 -->
  <Transition name="menu">
    <nav
      v-show="open"
      id="mobile-menu"
      class="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-ink-100 bg-white pb-6 pt-2 shadow-lg lg:hidden"
      aria-label="移动端导航"
    >
      <!-- 菜单内容也套 container-page，跟 logo 左边缘对齐 -->
      <div class="container-page">
        <!-- 每项一组，分隔线画在组上（父项带子项算一组），最后一项不画 -->
        <div
          v-for="item in siteConfig.navItems"
          :key="item.to"
          class="border-b border-ink-100 last:border-b-0"
        >
          <!-- 一级项：独占一行，上下 12px 保证手点击高度，当前页橙色加粗 -->
          <RouterLink
            :to="item.to"
            class="block py-3 text-base transition-colors duration-200"
            :class="
              activePath === item.to
                ? 'font-semibold text-brand-500'
                : 'text-ink-700 hover:text-brand-500'
            "
            @click="closeMenu"
            >{{ item.label }}</RouterLink
          >

          <!-- 二级项：缩进平铺，只有三个，一屏能看完，不做折叠省一次点击 -->
          <ul v-if="item.children" class="pb-2">
            <li v-for="child in item.children" :key="child.to">
              <RouterLink
                :to="child.to"
                class="flex items-baseline gap-2 rounded-lg py-2 pl-4 pr-2 transition-colors duration-200"
                :class="
                  activePath === child.to ? 'text-brand-500' : 'text-ink-600 hover:text-brand-500'
                "
                @click="closeMenu"
              >
                <!-- 4px 小圆点，比单纯缩进更容易看出层级（ink-300 没定义，用 400） -->
                <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-400" aria-hidden="true" />
                <span class="text-sm font-medium">{{ child.label }}</span>
                <span v-if="child.desc" class="text-xs text-ink-400">{{ child.desc }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- 底部行动区：跟顶栏右侧互补，同一个入口只出现一份。
           电话 ≥768 就由顶栏常驻了，这里 md:hidden；预约按钮 ≥640 常驻，这里 sm:hidden -->
        <div class="mt-5 flex flex-col gap-3 md:hidden">
          <!-- 电话做成描边按钮，和主按钮分主次 -->
          <BaseButton :href="siteConfig.contact.phoneHref" variant="outline" block>
            {{ siteConfig.contact.phone }}
          </BaseButton>
          <!-- 主按钮外面包一层 div 控显隐，同样不能把 sm:hidden 写在 BaseButton 上（inline-flex 会盖掉） -->
          <div class="sm:hidden">
            <BaseButton block @click="onCta">
              {{ siteConfig.contact.ctaLabel }}
            </BaseButton>
          </div>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
/* 展开：跟着顶栏的下滑方向走，淡入 + 下滑 8px；收起反向。200ms 和桌面下拉一致 */
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active {
    transition: none;
  }
}
</style>
