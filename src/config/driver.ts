/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 司机作业页内容配置
 */

/**
 * 司机作业页（/products/driver）五屏：手机演示首屏、平台优势、接单四步、核心界面、司机招募。
 * 类型定义就在数据上方；组装出口在 site.ts，组件统一从 '@/config/site' 拿数据，不要直接引本文件。
 */

/** 司机作业页 /products/driver（原型 Driver Hero + B~F 五屏）。主色是品牌橙，绿只做点缀 */
export interface DriverConfig {
  /** 首屏按钮文案（原型「下载司机端」，橙色按钮） */
  ctaLabel: string
  /** 第一屏：左文案 + 右手机演示（Phone Mock.png 是烘焙文字位图已删，整屏 DOM 重建） */
  hero: {
    /** 按钮下三枚薄荷绿药丸标签 */
    pills: string[]
    /** 手机屏幕内容，数据是编造的明文假数据 */
    phone: {
      statusLeft: string
      statusRight: string
      title: string
      /** 两张货源卡：tone 决定卡片底色（原型第一张浅橙、第二张浅薄荷） */
      orders: { from: string; to: string; price: string; meta: string; tone: 'orange' | 'green' }[]
      acceptLabel: string
      income: { label: string; value: string; delta: string }
      notice: string
      /** 底部导航三项，圆点分隔 */
      tabs: string[]
    }
    /** 三枚浮动徽标：pos 决定绝对定位位置（top 右上 / left 左中 / bottom 左下） */
    chips: { label: string; dot: 'orange' | 'green'; pos: 'top' | 'left' | 'bottom' }[]
  }
  /** 第二屏「平台优势」：四枚圆形插画图标（icons/source-direct 等四张） */
  advantage: {
    eyebrow: string
    items: {
      icon: 'source-direct' | 'roundtrip' | 'safer' | 'earn-more'
      title: string
      desc: string
    }[]
  }
  /** 第三屏「接单作业四步」：四张步骤卡 + 深绿横幅 */
  workflow: {
    eyebrow: string
    title: string
    desc: string
    /** tone 决定卡片底色与编号色（原型 01 浅橙/橙号、04 浅薄荷/绿号、02/03 白卡） */
    steps: { no: string; title: string; body: string; tone: 'orange' | 'plain' | 'green' }[]
    /** 深绿横幅三列 */
    banner: { title: string; desc: string }[]
  }
  /** 第四屏「核心界面一览」：四张真机截图（screen-*.png，真实界面截图才留图） */
  screens: {
    eyebrow: string
    title: string
    desc: string
    items: { no: string; label: string; img: 'workbench' | 'market' | 'load' | 'route' }[]
  }
  /** 第五屏「司机招募」：薄荷绿大圆角容器 + 左文案右插画 */
  recruit: {
    eyebrow: string
    title: string
    desc: string
    stats: { value: string; label: string }[]
    qr: { title: string; desc: string }
  }
}

// 司机作业页五屏（原型 Driver Hero + B 平台优势 + D 接单作业四步 + E 核心界面一览 + F 司机招募）。
// 文案逐字照原型转录；主色是品牌橙，手机演示与浮动徽标整屏 DOM 重建（Chip/Phone Mock 位图已删）
export const driver: DriverConfig = {
  ctaLabel: '下载司机端',
  hero: {
    pills: ['货源信息免费', '危化合规提示', '回程也能接单'],
    phone: {
      statusLeft: '9:41',
      statusRight: '危化运输 · 司机端',
      title: '附近货源',
      orders: [
        {
          from: '苏州',
          to: '北京',
          price: '¥ 8,600',
          meta: '液碱 32t · 罐车 · 明日装货',
          tone: 'orange',
        },
        {
          from: '无锡',
          to: '济南',
          price: '¥ 6,200',
          meta: '甲醇 28t · 厢车 · 今日装货',
          tone: 'green',
        },
      ],
      acceptLabel: '一键接单',
      income: { label: '本周收益', value: '¥ 18,400', delta: '+12%' },
      notice: '禁配提示：甲醇不可与硝酸同车',
      tabs: ['我的运单', '报备', '回单'],
    },
    chips: [
      { label: '本周新增 4880 条货源', dot: 'orange', pos: 'top' },
      { label: '已接单', dot: 'green', pos: 'left' },
      { label: '禁配校验通过', dot: 'green', pos: 'bottom' },
    ],
  },
  advantage: {
    eyebrow: 'PLATFORM ADVANTAGE / 平台优势',
    items: [
      { icon: 'source-direct', title: '一手货源', desc: '货源直发，不经过中间转手。' },
      { icon: 'roundtrip', title: '往返货源', desc: '去程回程一起推，回程不空跑。' },
      { icon: 'safer', title: '更安全', desc: '内置危化品禁配机制，自动判断货是否可拼车' },
      { icon: 'earn-more', title: '更赚钱', desc: '运价公开，不收信息费，接单即知收益。' },
    ],
  },
  workflow: {
    eyebrow: 'DRIVER WORKFLOW / 接单作业四步',
    title: '司机端作业流程：四个步骤',
    desc: '接单、报价、在途、回单四个环节在手机上完成，调度端同步可见。',
    steps: [
      {
        no: '01',
        title: '找货接单',
        body: '一手货源直连，按线路、品类、车型筛选，符合资质即可一键接单。',
        tone: 'orange',
      },
      {
        no: '02',
        title: '在线议价',
        body: '装货前在线报备车辆、驾驶员与押运人员及证件，系统自动核验有效性。',
        tone: 'plain',
      },
      {
        no: '03',
        title: '在途协同',
        body: '位置与运输状态实时回传，异常与事故一键上报，调度端同步可见。',
        tone: 'plain',
      },
      {
        no: '04',
        title: '电子回单',
        body: '卸货拍照上传即生成电子回单，替代纸质单据，结算与对账同步提速。',
        tone: 'green',
      },
    ],
    banner: [
      { title: '少跑空车', desc: '拼车与返程单推荐，减少空驶里程' },
      { title: '回单不用追', desc: '电子回单自动归档，结算周期缩短' },
      { title: '合规有依据', desc: '资质校验与线路提示，避免误装误扣' },
    ],
  },
  screens: {
    eyebrow: 'APP SCREENS / 核心界面',
    title: '司机每天用到的四个场景',
    desc: '开工接单、货源广场挑单、配载信息报备、路线导航，四个高频场景全部在手机上完成。',
    items: [
      { no: '01', label: '工作台', img: 'workbench' },
      { no: '02', label: '货源广场', img: 'market' },
      { no: '03', label: '配载信息', img: 'load' },
      { no: '04', label: '路线', img: 'route' },
    ],
  },
  recruit: {
    eyebrow: 'DRIVER NETWORK / 司机招募',
    title: '1500+ 司机已上线，货源天天更新',
    desc: '每日更新一手货源 5000+ 条，从装货地到卸货地一目了然；货源信息全部免费，接单不抽信息费。',
    stats: [
      { value: '1500+', label: '在营司机' },
      { value: '5000+', label: '每日一手货源' },
      { value: '0 元', label: '资源信息费' },
    ],
    qr: { title: '扫码下载司机端', desc: '司机专属注册通道，货源信息免费' },
  },
}
