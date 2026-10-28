<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoMark from '@/assets/logo.webp'
import qrWechat from '@/assets/footer/ewm-gzh.jpg'
import qrDouyin from '@/assets/footer/ewm-dy.png'
import qrKuaishou from '@/assets/footer/ewm-ks.jpg'
import qrApp from '@/assets/footer/download-icon.png'
import { siteConfig } from '@/config/site'

/**
 * 页脚（对应原型底部的深色收尾区）
 *
 * 版式取自设计稿 1440×343 的画板，实测值：
 *   · 容器左右各 80px（与 container-page 同一条基准线），内容宽 1280
 *   · 五栏：品牌约 358 / 三个链接栏各约 87·87·62 / 关注我们 430，栏间距 64
 *   · 二维码 100×100、间距 10，四张正好 430，右边缘与容器右边界齐平
 *   · 底色 #0f211b，分隔线 #22392f
 *
 * 响应式：手机单列 → ≥640 两列 → ≥1024 按画板的五栏比例展开。
 */

/**
 * 关注我们：四张二维码
 *
 * 图片必须在这里 import，Vite 才会做哈希命名与体积优化；
 * 文案（label）跟着图片走，不放进 site.ts —— 换图时要一起换，放两处容易漏改。
 */
const qrcodes = [
  { src: qrWechat, label: '微信公众号', alt: '威易达化工微信公众号二维码' },
  { src: qrDouyin, label: '官方抖音号', alt: '威易达官方抖音号二维码' },
  { src: qrKuaishou, label: '官方快手号', alt: '威易达官方快手号二维码' },
  { src: qrApp, label: '扫码下载 APP', alt: '威易达化工 App 下载二维码' },
]

/** 页脚条目既可能是站内路由，也可能是 tel: 这类外链，据此决定渲染 RouterLink 还是原生 a */
const isExternal = (to: string) => /^(tel:|mailto:|https?:)/.test(to)
</script>

<template>
  <!-- 页脚：深色收尾。bg-night-900 是设计稿取色 #0f211b，
       不直接用纯黑 —— 暖色调官网上纯黑会显得生硬，这层绿让它与品牌橙形成冷热对照 -->
  <footer class="bg-night-900">
    <!-- 内层容器：与顶栏、各区块共用同一条左右基准线（≥1440 时左右各 80px） -->
    <div class="container-page pt-16">
      <!-- 主区：
           <640 单列 → ≥640 两列 → ≥1024 三列 → ≥1440 五栏（见文件末尾的 scoped 样式）。
           1440 那套五栏要用原生媒体查询而不是 Tailwind 断点：Tailwind v4 会把
           自定义断点的媒体查询排在核心断点之前，lg: 反而会覆盖它，拿不到想要的布局。
           五栏里后四栏用 auto 由内容撑开，不写死宽度（写死会因字体差异挤断行）；
           栏间距取 58px 而非画板上量到的 64px：auto 列实际比设计稿宽约 4px/栏，
           58 才能让「产品」栏仍然落在 x=503 的位置上 -->
      <div class="footer-main grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
        <!-- 品牌栏：图形 + 中文名 + 描述 + 理念 -->
        <div class="footer-brand sm:col-span-2 lg:col-span-3">
          <!-- 品牌标识：页脚只用图形 mark + 中文名，不用组合标
               （组合标是竖排的，这里设计稿是横排；图形 24px、文字 18px 均取自画板） -->
          <div class="flex items-center gap-3">
            <img
              :src="logoMark"
              :alt="siteConfig.brand.name"
              class="h-6 w-6 shrink-0 object-contain"
              loading="lazy"
              decoding="async"
            />
            <span class="text-lg font-bold leading-none text-white">{{
              siteConfig.brand.name
            }}</span>
          </div>

          <!-- 品牌描述：13px / 22px 行高；max-w-[330px] 还原画板的折行位置（第一行断在"全流程规"后）；
               text-night-300 是在深底上仍能保证可读性的次要色 -->
          <p
            v-for="(line, i) in siteConfig.footer.desc"
            :key="i"
            class="max-w-[330px] text-[13px] leading-[22px] text-night-300"
            :class="i === 0 ? 'mt-6' : 'mt-0'"
          >
            {{ line }}
          </p>

          <!-- 品牌理念：四个短语用中圆点连接，12px 最弱色 -->
          <p class="mt-5 text-xs leading-[18px] text-night-400">
            {{ siteConfig.footer.slogan.join(' · ') }}
          </p>
        </div>

        <!-- 链接栏：标题 14px 纯白，条目 13px 次要色，条目间距 30（行高 18 + space-y-3） -->
        <nav
          v-for="group in siteConfig.footer.linkGroups"
          :key="group.title"
          :aria-label="`页脚${group.title}`"
        >
          <h3 class="text-sm font-bold leading-5 text-white">{{ group.title }}</h3>
          <ul class="mt-2.5 space-y-3">
            <li v-for="item in group.items" :key="item.label">
              <!-- block 不能省：a 是 inline 时，li 的行盒高度由父级 line-height 决定（实测 24px），
                   比文字自身的 18px 多出 6px，四行累计会把整个页脚撑高十几像素 -->
              <RouterLink
                v-if="!isExternal(item.to)"
                :to="item.to"
                class="block text-[13px] leading-[18px] text-night-300 transition-colors duration-200 hover:text-white"
                >{{ item.label }}</RouterLink
              >
              <a
                v-else
                :href="item.to"
                class="block text-[13px] leading-[18px] text-night-300 transition-colors duration-200 hover:text-white"
                >{{ item.label }}</a
              >
            </li>
          </ul>
        </nav>

        <!-- 关注我们：四张 100×100 二维码 + 下方标签。
             图用 aspect-square w-full 自适应，≥1440 由 scoped 样式固定 100px；
             max-w-[430px] 是四张的上限（4×100 + 3×10），否则在两列/三列布局下
             每张会被拉到 170px 以上，比画板大近一倍 -->
        <div class="footer-social sm:col-span-2 lg:col-span-3">
          <h3 class="text-sm font-bold leading-5 text-white">关注我们</h3>
          <ul class="mt-2.5 grid max-w-[430px] grid-cols-4 gap-2.5">
            <li v-for="qr in qrcodes" :key="qr.label">
              <!-- 圆角裁切：四张图本身是白底方图，画板里都带圆角 -->
              <img
                :src="qr.src"
                :alt="qr.alt"
                class="aspect-square w-full rounded-lg object-cover"
                loading="lazy"
                decoding="async"
              />
              <p class="mt-2 text-center text-xs leading-[18px] text-night-300">{{ qr.label }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部条：分隔线 1px（#22392f），上方留 32px、下方内容留 36px，
           三项之和与画板的 343 高度对齐 -->
      <div
        class="mt-8 flex flex-col gap-2 border-t border-night-800 pt-9 pb-9 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-xs leading-[18px] text-night-400">{{ siteConfig.footer.copyright }}</p>
        <p class="text-xs leading-[18px] text-night-400">{{ siteConfig.footer.tagline }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/**
 * ≥1440 的五栏精确版式
 *
 * 为什么这段用原生媒体查询而不是 Tailwind 的断点变体：
 * Tailwind v4 会把 @theme 里自定义 --breakpoint-* 生成的媒体查询排在核心断点
 * （sm / md / lg …）之前，同特异性下 lg: 的规则反而赢 —— 实测 1440 下拿到的
 * 仍是 `lg:grid-cols-3`，头像被压到 67px。写在 scoped 里顺序完全可控，
 * 且 scoped 选择器带 data-v 属性，特异性能稳稳压过工具类。
 *
 * 数值全部来自设计稿 1440×343 画板的像素实测（见 README「页脚」一节）：
 *   · 品牌栏吃掉剩余空间，约 358px
 *   · 三个链接栏各约 87 / 87 / 62，栏间距 58
 *   · 关注我们 430 = 四张 100 + 三个 10，右边缘与容器右边界齐平
 */
@media (min-width: 1440px) {
  .footer-main {
    grid-template-columns: minmax(0, 1fr) auto auto auto 430px;
    column-gap: 58px;
  }

  /* 五栏里品牌栏与二维码栏各占一列，覆盖 lg 的 col-span-3 */
  .footer-brand,
  .footer-social {
    grid-column: auto;
  }

  .footer-social img {
    width: 100px;
    height: 100px;
  }
}
</style>
