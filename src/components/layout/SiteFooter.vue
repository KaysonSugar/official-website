<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 站点页脚
-->
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoMark from '@/assets/brand/logo.webp'
// 页脚素材全在 brand/ 下，带 footer- 前缀区分（页脚是全局组件，不算页面素材）
import qrWechat from '@/assets/brand/footer-qr-gzh.jpg'
import qrDouyin from '@/assets/brand/footer-qr-dy.jpg'
import qrKuaishou from '@/assets/brand/footer-qr-ks.jpg'
import qrApp from '@/assets/brand/footer-app-download.png'
import { siteConfig } from '@/config/site'
/** 四张二维码。图在这里 import，Vite 才会做哈希命名 */
const qrcodes = [
  { src: qrWechat, label: '微信公众号', alt: '威易达化工微信公众号二维码' },
  { src: qrDouyin, label: '官方抖音号', alt: '威易达官方抖音号二维码' },
  { src: qrKuaishou, label: '官方快手号', alt: '威易达官方快手号二维码' },
  { src: qrApp, label: '扫码下载 APP', alt: '威易达化工 App 下载二维码' },
]

/** 页脚条目有可能是 tel:/mailto: 这类外链，据此决定渲染 RouterLink 还是 a */
const isExternal = (to: string) => /^(tel:|mailto:|https?:)/.test(to)
</script>

<template>
  <!-- 页脚：深色收尾，bg-night-900 是设计稿取的 #0f211b。
       没用纯黑，暖色官网上纯黑太生硬，这层墨绿正好跟品牌橙对着来 -->
  <footer class="bg-night-900">
    <!-- 容器：跟顶栏、各区块同一条基线（1440 下各 80px）；上面留 64 -->
    <div class="container-page pt-16">
      <!-- 主区：手机单列 → ≥640 两列 → ≥1024 三列，≥1440 五栏在 scoped 里改。
           手机纵向间距 40，≥640 横向 32 -->
      <div class="footer-main grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
        <!-- 品牌栏：图 + 中文名 + 两行描述 + 理念 -->
        <div class="footer-brand sm:col-span-2 lg:col-span-3">
          <!-- 只放图形 mark + 中文名（组合标是竖排的，稿子这里是横排）；图形 24px、文字 18px -->
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

          <!-- 描述：13px / 行高 22；max-w-[330px] 是为了还原稿子的折行位置（第一行断在「全流程规」后面） -->
          <p
            v-for="(line, i) in siteConfig.footer.desc"
            :key="i"
            class="max-w-[330px] text-[13px] leading-[22px] text-night-300"
            :class="i === 0 ? 'mt-6' : 'mt-0'"
          >
            {{ line }}
          </p>

          <!-- 理念：几个短语用中点连起来，12px 最弱色 -->
          <p class="mt-5 text-xs leading-[18px] text-night-400">
            {{ siteConfig.footer.slogan.join(' · ') }}
          </p>
        </div>

        <!-- 链接栏：标题 14px 白，条目 13px，行高 18 + space-y-3(12) = 每条 30 -->
        <nav
          v-for="group in siteConfig.footer.linkGroups"
          :key="group.title"
          :aria-label="`页脚${group.title}`"
        >
          <h3 class="text-sm font-bold leading-5 text-white">{{ group.title }}</h3>
          <ul class="mt-2.5 space-y-3">
            <li v-for="item in group.items" :key="item.label">
              <!-- block 别省：a 是 inline 时 li 的行盒会被父级 line-height 撑到 24，
                   比文字本身多 6px，四行累计能把页脚顶高十几像素 -->
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

        <!-- 关注我们：四张图，间距 10。
             图用 aspect-square + w-full 自适应，≥1440 由 scoped 固定 100px；
             max-w-[430px] = 4×100 + 3×10，不设的话两列/三列时每张会被拉到 170 以上 -->
        <div class="footer-social sm:col-span-2 lg:col-span-3">
          <h3 class="text-sm font-bold leading-5 text-white">关注我们</h3>
          <ul class="mt-2.5 grid max-w-[430px] grid-cols-4 gap-2.5">
            <li v-for="qr in qrcodes" :key="qr.label">
              <!-- 四张原图是白底方图，稿子里带圆角 -->
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

      <!-- 底部条：上面留 32、下面 36，加 1px 分隔线（#22392f），合计对上画板的 343 高 -->
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
/* ≥1440 的五栏版式。
   这里得写原生媒体查询：Tailwind v4 会把自定义断点的媒体查询排在核心断点前面，
   同特异性下 lg: 反而赢——之前实测 1440 下拿到的还是 grid-cols-3，二维码被压到 67px。
   scoped 选择器带 data-v，特异性能稳稳压过工具类。

   数值来自 1440×343 画板：品牌栏吃掉剩余空间（约 358），三个链接栏 87/87/62、栏距 58，
   二维码栏 430 = 四张 100 + 三个 10，右边缘贴容器。 */
@media (min-width: 1440px) {
  .footer-main {
    grid-template-columns: minmax(0, 1fr) auto auto auto 430px;
    column-gap: 58px;
  }

  /* 品牌栏和二维码栏各占一列，盖掉 lg 的 col-span-3 */
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
