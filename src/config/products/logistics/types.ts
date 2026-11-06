/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 物流调度页字段形状
 */

/**
 * 物流调度页的内容形状。改字段来这里。
 *
 * 这里只声明类型，具体文案在 ./data.ts；组件不直接引本文件，统一走 @/config/site。
 */

/** 物流调度页 /products/logistics（原型 Logistics Hero + B 免费货源广场） */
export interface LogisticsConfig {
  /** 首屏按钮文案（原型「预约调度演示」，绿色按钮） */
  ctaLabel: string
  /** 第一屏右侧调度台演示卡：整卡 DOM 重建（Dispatch Mock.png 是烘焙文字位图，已删） */
  heroDash: {
    /** 侧栏品牌名与副标 */
    brand: string
    brandSub: string
    /** 侧栏菜单，第一项渲染为白底选中态；vip 的项挂橙色 VIP 徽标 */
    menus: { label: string; vip?: boolean }[]
    /** 顶栏右侧的「下载中心 + 日期」文字 */
    topbarRight: string
    /** 欢迎卡：用户名与问候语 */
    welcome: { name: string; hello: string }
    /** 合作运单卡：四个统计 */
    coop: { title: string; stats: { label: string; value: string }[] }
    /** 非合作运单卡：三个统计 */
    nonCoop: { title: string; stats: { label: string; value: string }[] }
    /** 待办卡：计数徽标 + 两条待办 */
    todo: {
      badges: { label: string; count: string; tone: 'green' | 'orange' | 'gray' }[]
      rows: { no: string; route: string; badge: string; tone: 'orange' | 'green' }[]
    }
    /** 今日货源简讯卡：右侧「更多 →」组件里写死 */
    brief: { title: string; rows: { route: string; meta: string }[] }
  }
  /** 第二屏「免费货源广场」（原型 B 免费货源广场）：表格卡 DOM 重建（Cargo Card.png 已删） */
  cargo: {
    /** 眉题（品牌橙） */
    eyebrow: string
    /** 大标题三段：title 黑 + accent 橙（原型橙的是 5,000+）+ tail 黑 */
    title: string
    titleAccent: string
    titleTail: string
    desc: string
    /** 四个统计；tone 决定数字颜色（原型前三个绿、0 元橙） */
    stats: { value: string; label: string; tone: 'green' | 'orange' }[]
    /** 统计行右侧的注释短句，组件里用 · 连接 */
    notes: string[]
    card: {
      title: string
      /** 标题旁的两枚徽标（免费查看绿 / 每日更新橙） */
      badges: { label: string; tone: 'green' | 'orange' }[]
      /** 右上角「数据更新于 … · 当前 … 条」 */
      updated: string
      count: string
      /** 筛选行：label + 输入框占位文字 */
      filters: { label: string; placeholder: string }[]
      columns: string[]
      rows: {
        route: string
        cls: string
        truck: string
        weight: string
        time: string
        contact: string
        phone: string
      }[]
      /** 卡片底部左侧合计说明 */
      foot: string
      /** 右下角「查看全部货源 →」链接文字 */
      more: string
    }
  }
  /** 第三屏「运输链核心功能」：三张能力卡 + 调度台演示窗口（整窗 DOM 重建） */
  capability: {
    eyebrow: string
    title: string
    desc: string
    /** noteTag 是绿色小结行加粗的前缀（源头风险 / 周转效率 / 降低风险） */
    cards: { title: string; body: string; noteTag: string; note: string }[]
    /** 调度台窗口：配色/字号全部照 wyd-h5-carrier 源码 dispatchDesk 三个 scss 还原，数据是演示假数据不脱敏 */
    console: {
      /** 窗口顶栏：标题与时间 */
      title: string
      time: string
      caption: string
      /** 左栏：待调度运单，active 卡是绿框高亮的第一张（#d8ffff 渐变 + #21e3a5 边框） */
      orders: {
        title: string
        cards: {
          from: string
          to: string
          active?: boolean
          orderNo: string
          category: string
          weight: string
          vehicleType: string
          mileage: string
          loadTime: string
        }[]
      }
      /** 中栏：车辆排班表；左列 200px + 7 天，cells 按 0 起数的天下标给数据格 */
      board: {
        title: string
        days: string[]
        /** 可拼单栏：pinCount 对应「可拼单 : N 辆」，route 是中间的绿色 Tag */
        pinCount: string
        routeFrom: string
        routeTo: string
        vehicles: {
          plate: string
          weight: string
          scope: string
          /** 可拼单水印 + 绿框高亮（照源码 has-combine-watermark / is-selected） */
          active?: boolean
          cells: ({
            orderNo: string
            from: string
            to: string
            cls: string
            weight: string
            frac: string
          } | null)[]
        }[]
      }
      /** 右栏：空闲车辆 */
      idle: {
        title: string
        cards: { plate: string; city: string; weight: string; phone: string; scope: string }[]
      }
    }
  }
  /** 第四屏「智能拼车」：深绿屏，右侧拼车时间轴卡 DOM 重建（拼车路线图.png 是参考图） */
  carpool: {
    eyebrow: string
    title: string
    desc: string
    /** 左列：橙色小标签（拼车）与说明段 */
    tag: string
    detail: string
    card: {
      plan: string
      from: string
      to: string
      badge: string
      summary: string
      /** 六个节点：城市 / 圆点上方事件 / 圆点下方货物去向 */
      stops: { city: string; event: string; cargo: string }[]
      /** 底部橙条：加粗引子 + 全程路线 */
      stripLead: string
      stripRoute: string
    }
  }
  /** 第五屏「车辆及司机管理」：奶油底三卡 */
  ledger: {
    eyebrow: string
    title: string
    desc: string
    /** icon 对应 logistics/icons/Icon Box 0N.png（01 文档=集中管理、02 链接=灵活配置、03 日历=智能排班） */
    cards: { icon: '01' | '02' | '03'; title: string; body: string }[]
  }
}
