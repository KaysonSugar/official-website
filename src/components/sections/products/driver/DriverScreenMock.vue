<!--
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 司机端核心界面 · 四个手机界面用 DOM 画
-->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import welcomeWyd from '@/assets/products/driver/images/welcome-wyd.webp'

/** 四个界面一一对应 siteConfig.driver.screens.items[].img */
export type ScreenKind = 'workbench' | 'market' | 'load' | 'route'

defineProps<{ kind: ScreenKind }>()

/** 设计画布宽度：所有 px 坐标都以这个宽度为基准 */
const CANVAS_W = 610

const box = useTemplateRef<HTMLElement>('box')
const scale = ref(0)
let ro: ResizeObserver | undefined

/* 列宽由外层 grid 决定，这里只负责换算缩放比；
   ResizeObserver 在断点切换（4 列→2 列→1 列）时会自动重算 */
onMounted(() => {
  ro = new ResizeObserver(([entry]) => {
    scale.value = entry.contentRect.width / CANVAS_W
  })
  ro.observe(box.value!)
})
onBeforeUnmount(() => ro?.disconnect())

/* 工作台三条推荐线路 */
const wbRoutes = [
  { from: '樟树', to: '会昌' },
  { from: '上饶', to: '信丰' },
  { from: '赣州', to: '九江瑞昌' },
]

/* 货源广场顶部五个筛选项 */
const marketFilters = ['装货地', '卸货地', '车型', '类别', '吨位']

/* 货源广场两张货源卡：起止地 + 里程 */
const marketCards = [
  { from: '樟树', to: '会昌', km: '310' },
  { from: '上饶', to: '信丰', km: '514' },
]

/* 配载信息六个字段，CAS 号后面跟红色「危」角标 */
const loadRows = [
  { label: 'CAS号：', value: '12030-88-5', danger: true },
  { label: '货品名称：', value: '超氧化钾', danger: false },
  { label: '类别：', value: '五类 5.1', danger: false },
  { label: '货物重量：', value: '2 吨', danger: false },
  { label: '包装类型：', value: '包', danger: false },
  { label: '堆叠方式：', value: '可堆叠', danger: false },
]

/* 路线页三张城市卡：装货点绿色章、卸货点灰色章，第三张整卡带薄荷底 + 定位钉 */
const routeCards = [
  {
    city: '苏州市',
    tinted: false,
    pinned: false,
    rows: [
      { tag: '装', addr: '江苏省苏州市虎丘区浒墅关新区永旺梦乐城2层NO.288', pick: true },
      { tag: '卸', addr: '江苏省苏州市虎丘区城际路19号永旺梦乐城苏州新区店1F层', pick: false },
    ],
  },
  {
    city: '杭州市',
    tinted: false,
    pinned: false,
    rows: [{ tag: '卸', addr: '西湖区', pick: false }],
  },
  {
    city: '南京市',
    tinted: true,
    pinned: true,
    rows: [{ tag: '卸', addr: '玄武区', pick: false }],
  },
]
</script>

<template>
  <!-- aspect-ratio 撑出与源图同样的 610:822 占位，缩放后不产生布局跳动。
       常驻一层浅投影把手机界面从白底上托出来；hover 再走全局 card-lift
       （投影浮现、卡片本身不动），圆角跟着缩放比走，::after 的投影是手机那道圆角 -->
  <div
    ref="box"
    class="card-lift relative w-full select-none shadow-[0_16px_36px_-22px_rgba(19,50,42,0.4)]"
    :style="{ aspectRatio: '610 / 822', borderRadius: `${20 * scale}px` }"
  >
    <!-- 画布本体：610×822 固定尺寸 + 左上原点缩放，圆角裁掉绿色头部的直角 -->
    <div
      aria-hidden="true"
      class="absolute left-0 top-0 h-[822px] w-[610px] origin-top-left overflow-hidden rounded-[20px]"
      :style="{ transform: `scale(${scale})`, visibility: scale ? 'visible' : 'hidden' }"
    >
      <!-- ============ 01 工作台 ============ -->
      <template v-if="kind === 'workbench'">
        <!-- 底色：顶部 388 绿色头部（占 47%），下面是浅灰内容区 -->
        <div class="absolute inset-0 bg-[#f2f5f3]"></div>
        <div class="absolute inset-x-0 top-0 h-[388px] bg-[#17b47d]"></div>

        <!-- 头像 + 姓名 / 手机号 / 公司：头像 58 圆、浅薄荷底、绿色线描人像 -->
        <div class="absolute left-[28px] top-[38px] flex items-center gap-[14px]">
          <span
            class="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-full bg-[#cdeee1]"
          >
            <svg width="30" height="30" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="9.6" r="4.3" stroke="#17b47d" stroke-width="1.5" />
              <path
                d="M4.8 21.2c1.4-3.8 4.5-5.7 8.2-5.7s6.8 1.9 8.2 5.7"
                stroke="#17b47d"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </span>
          <span class="flex flex-col">
            <span class="text-[22px] font-bold leading-[28px] text-white">邹*</span>
            <span class="text-[15px] leading-[20px] text-white/75">167****1293</span>
            <span class="text-[15px] leading-[20px] text-white/75">某运输公司</span>
          </span>
        </div>

        <!-- 开工中：20% 白半透明块，80×40，圆角 8 -->
        <span
          class="absolute right-[28px] top-[50px] flex h-[40px] items-center rounded-[8px] bg-white/20 px-[16px] text-[16px] leading-[22px] text-white"
        >
          开工中
        </span>

        <!-- 邀请红包 banner：直接用设计给的 735×300 原图，object-cover 裁到 555×221 -->
        <img
          :src="welcomeWyd"
          alt=""
          class="absolute left-[28px] top-[134px] h-[221px] w-[555px] rounded-[10px] object-cover"
        />

        <!-- 今日货源卡：562 宽白卡，行距 18 让三条线路均匀铺开 -->
        <div
          class="absolute left-[24px] top-[414px] w-[562px] rounded-[12px] bg-white px-[24px] pb-[22px] pt-[18px]"
        >
          <div class="flex items-baseline justify-between">
            <p class="text-[20px] font-bold leading-[26px] text-[#1f2422]">
              今日货源已更新 4880 条
            </p>
            <span class="text-[14px] leading-[20px] text-[#9aa19d]">更多</span>
          </div>
          <div class="mt-[18px] flex flex-col gap-[18px]">
            <div
              v-for="route in wbRoutes"
              :key="route.from"
              class="flex items-center gap-[13px] text-[19px] leading-[24px] text-[#1f2422]"
            >
              <span>{{ route.from }}</span>
              <svg width="21" height="17" viewBox="0 0 20 16" fill="none">
                <path
                  d="M1 8h15M11 3l5 5-5 5"
                  stroke="#17b47d"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{{ route.to }}</span>
            </div>
          </div>
        </div>

        <!-- 回程开关：灰底胶囊 + 白色圆钮贴右（表示已开启返程推荐） -->
        <div
          class="absolute left-[24px] right-[24px] top-[630px] flex items-center justify-between"
        >
          <span class="text-[19px] leading-[24px] text-[#1f2422]">回程</span>
          <span class="relative block h-[24px] w-[48px] rounded-full bg-[#dfe9e4]">
            <span
              class="absolute right-[3px] top-[3px] block h-[18px] w-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.14)]"
            ></span>
          </span>
        </div>

        <!-- 下线：白底绿描边按钮 66 高，1px 边，圆角 6 -->
        <div
          class="absolute left-[24px] bg-white right-[24px] top-[676px] flex h-[66px] items-center justify-center rounded-[8px] border border-[#17b47d] text-[20px] leading-[28px] text-[#17b47d]"
        >
          下线
        </div>

        <!-- 底部提示：橙红小字 -->
        <p
          class="absolute left-[24px] right-[24px] top-[757px] text-[15px] leading-[20px] text-[#b95a42]"
        >
          注：若您在线上已装货，请填写配载信息后再上线
        </p>
      </template>

      <!-- ============ 02 货源广场 ============ -->
      <template v-else-if="kind === 'market'">
        <div class="absolute inset-0 bg-[#f1f5f2]"></div>
        <div class="absolute inset-x-0 top-0 h-[152px] bg-[#17b47d]"></div>

        <!-- 顶部两个 tab 各占一半：左侧激活（白字 + 50×3 白色下划线），右侧 80% 白 -->
        <div class="absolute inset-x-0 top-[30px] flex">
          <div class="relative flex-1 text-center">
            <span class="text-[20px] font-bold leading-[28px] text-white">货源广场</span>
            <span
              class="absolute -bottom-[16px] left-1/2 block h-[3px] w-[50px] -translate-x-1/2 rounded-full bg-white"
            ></span>
          </div>
          <div class="flex-1 text-center">
            <span class="text-[19px] font-bold leading-[28px] text-white/80">平台货源</span>
          </div>
        </div>

        <!-- 五个筛选：等距铺满，白 90%，右侧小箭头 -->
        <div
          class="absolute inset-x-[26px] top-[100px] flex items-center justify-between text-[16px] leading-[22px] text-white/90"
        >
          <span v-for="filter in marketFilters" :key="filter" class="flex items-center gap-[6px]">
            {{ filter }}
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
              <path
                d="M1 1l4.5 4.5L10 1"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </div>

        <!-- 两张货源卡：起止地居中夹卡车图标，四行参数 16/26，右下两颗绿按钮 -->
        <div class="absolute left-[20px] top-[170px] flex w-[570px] flex-col gap-[20px]">
          <article
            v-for="card in marketCards"
            :key="card.from"
            class="rounded-[12px] bg-white px-[24px] pb-[20px] pt-[22px]"
          >
            <div
              class="flex items-center justify-center gap-[12px] text-[20px] font-bold leading-[26px] text-[#1f2422]"
            >
              <span>{{ card.from }}</span>
              <svg width="36" height="24" viewBox="0 0 34 22" fill="none">
                <path
                  d="M1.5 4h15v11.5h-15z"
                  stroke="#17b47d"
                  stroke-width="1.6"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 8h6.2l4.5 4.4v3.1h-10.7z"
                  stroke="#17b47d"
                  stroke-width="1.6"
                  stroke-linejoin="round"
                />
                <circle cx="7.5" cy="17.6" r="2.6" stroke="#17b47d" stroke-width="1.6" />
                <circle cx="23" cy="17.6" r="2.6" stroke="#17b47d" stroke-width="1.6" />
              </svg>
              <span>{{ card.to }}</span>
            </div>
            <div class="mt-[18px] flex flex-col text-[16px] leading-[26px] text-[#6d7470]">
              <p>车辆类型：无要求</p>
              <p>运输里程约：{{ card.km }} 公里</p>
              <p>联系电话：13879715802</p>
              <p>装货开始时间：2026-10-30 00:00:00</p>
            </div>
            <div class="mt-[20px] flex justify-end gap-[14px]">
              <span
                class="flex h-[40px] items-center rounded-[8px] bg-[#17b47d] px-[18px] text-[16px] text-white"
              >
                分享
              </span>
              <span
                class="flex h-[40px] items-center rounded-[8px] bg-[#17b47d] px-[18px] text-[16px] text-white"
              >
                电话议价
              </span>
            </div>
          </article>
        </div>
      </template>

      <!-- ============ 03 配载信息 ============ -->
      <template v-else-if="kind === 'load'">
        <div class="absolute inset-0 bg-white"></div>
        <div class="absolute inset-x-0 top-0 h-[80px] bg-[#17b47d]"></div>

        <!-- 返回箭头 + 居中标题 -->
        <svg
          class="absolute left-[26px] top-[28px]"
          width="14"
          height="24"
          viewBox="0 0 14 24"
          fill="none"
        >
          <path
            d="M11.5 2L2.5 12l9 10"
            stroke="#fff"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="absolute inset-x-0 top-[26px] text-center text-[20px] leading-[28px] text-white">
          配载信息
        </p>

        <!-- 六个字段：左灰标签、右深色值，行高统一 48 -->
        <div class="absolute inset-x-[24px] top-[92px] flex flex-col">
          <div
            v-for="row in loadRows"
            :key="row.label"
            class="flex h-[48px] items-center justify-between text-[17px] leading-[24px]"
          >
            <span class="text-[#8d9390]">{{ row.label }}</span>
            <span class="flex items-center gap-[10px] text-[#1f2422]">
              {{ row.value }}
              <span
                v-if="row.danger"
                class="rounded-[3px] bg-[#e0574a] px-[6px] py-[2px] text-[13px] leading-[16px] text-white"
              >
                危
              </span>
            </span>
          </div>
        </div>

        <p
          class="absolute left-[24px] top-[402px] text-[17px] font-bold leading-[24px] text-[#17b47d]"
        >
          查看运输要求
        </p>

        <!-- 运输要求浮层卡：白卡带极淡描边和投影，正文 16/25 三行，底部浅灰「关闭」 -->
        <div
          class="absolute left-[26px] top-[440px] w-[558px] rounded-[12px] border border-[#edf1ef] bg-white px-[26px] pb-[24px] pt-[24px] shadow-[0_10px_28px_-18px_rgba(19,50,42,0.28)]"
        >
          <p class="text-center text-[19px] font-bold leading-[26px] text-[#1f2422]">运输要求</p>
          <p class="mt-[14px] text-[18px] font-bold leading-[24px] text-[#1f2422]">超氧化钾</p>
          <p class="mt-[12px] text-[18px] font-bold leading-[24px] text-[#1f2422]">禁配物：</p>
          <p class="mt-[12px] text-[15.5px] leading-[25px] text-[#4a514d]">
            运输注意事项：严禁与酸类、易燃物、有机物、还原剂、自燃物品、遇湿易燃物品等混装混运。运输时车辆应配备相应品种和数量的消防器材及泄漏应急处理设备。
          </p>
          <div
            class="mt-[16px] flex h-[38px] items-center justify-center rounded-[8px] bg-[#f2f4f3] text-[17px] text-[#1f2422]"
          >
            关闭
          </div>
        </div>

        <!-- 底部绿色主按钮条：70 高，圆角由画布 overflow 裁出来 -->
        <div
          class="absolute inset-x-0 bottom-0 flex h-[70px] items-center justify-center bg-[#17b47d] text-[20px] text-white"
        >
          添加配载
        </div>
      </template>

      <!-- ============ 04 路线 ============ -->
      <template v-else>
        <!-- 整屏绿底，卡片浮在上面 -->
        <div class="absolute inset-0 bg-[#17b47d]"></div>
        <p class="absolute inset-x-0 top-[30px] text-center text-[20px] leading-[28px] text-white">
          路线
        </p>

        <div class="absolute left-[23px] top-[102px] flex w-[564px] flex-col gap-[20px]">
          <div
            v-for="card in routeCards"
            :key="card.city"
            class="rounded-[14px] px-[16px] pb-[20px] pt-[20px]"
            :class="card.tinted ? 'bg-[#e6f5ee]' : 'bg-[#f6f9f8]'"
          >
            <p
              class="flex items-center justify-center gap-[8px] text-[20px] font-bold leading-[26px] text-[#1f2422]"
            >
              <svg v-if="card.pinned" width="15" height="19" viewBox="0 0 15 19" fill="none">
                <path
                  d="M7.5 18.4s6-5.5 6-10.2A6 6 0 1 0 1.5 8.2c0 4.7 6 10.2 6 10.2z"
                  fill="#17b47d"
                />
                <circle cx="7.5" cy="7.7" r="2.2" fill="#fff" />
              </svg>
              {{ card.city }}
            </p>

            <!-- 装/卸 章 + 白底地址条 + 绿色「导航」 -->
            <div class="mt-[18px] flex flex-col gap-[12px]">
              <div v-for="(row, i) in card.rows" :key="i" class="flex items-center gap-[10px]">
                <span
                  class="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-[6px] text-[14px] text-white"
                  :class="row.pick ? 'bg-[#17b47d]' : 'bg-[#9aa19d]'"
                >
                  {{ row.tag }}
                </span>
                <span
                  class="flex-1 rounded-[4px] bg-white px-[12px] py-[8px] text-[15px] leading-[20px] text-[#1f2422]"
                >
                  {{ row.addr }}
                </span>
                <span
                  class="flex h-[36px] w-[68px] shrink-0 items-center justify-center rounded-[6px] bg-[#17b47d] text-[15px] text-white"
                >
                  导航
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
