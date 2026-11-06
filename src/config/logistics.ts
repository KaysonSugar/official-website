/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 物流调度页内容配置
 */

/**
 * 物流调度页（/products/logistics）五屏：调度台演示卡、货源广场、核心功能、智能拼车、车辆司机管理。
 * 类型定义就在数据上方；组装出口在 site.ts，组件统一从 '@/config/site' 拿数据，不要直接引本文件。
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
    /** 眉题（绿色） */
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

// 物流调度页（原型 Logistics Hero + B 免费货源广场）。调度台卡与货源表格都是 DOM
// 重建（用户传的 Dispatch Mock.png / Cargo Card.png 是烘焙文字参考图，已删）。
// 表格行数据逐字照 Cargo Card.png 转录，含原型里同一电话出现两行的细节
export const logistics: LogisticsConfig = {
  ctaLabel: '预约调度演示',
  heroDash: {
    // 品牌名照原型：产品名 + 副标，不是公司全名
    brand: '威易达',
    brandSub: '物流工作台',
    menus: [
      { label: '首页' },
      { label: '调度台' },
      { label: '运单管理' },
      { label: '仓储推荐' },
      { label: '合作运单' },
      { label: '货源广场', vip: true },
      { label: '地址簿' },
      { label: '合同管理' },
      { label: '运输协议' },
      { label: '车辆管理' },
      { label: '司机管理' },
    ],
    topbarRight: '下载中心　2026-10-29 星期四',
    welcome: { name: '张三 · 威易达物流', hello: '早上好，欢迎登录本系统' },
    coop: {
      title: '合作运单',
      stats: [
        { label: '报价次数', value: '36' },
        { label: '接单数量', value: '28' },
        { label: '完成运单数', value: '24' },
        { label: '运费（万元）', value: '128.6' },
      ],
    },
    nonCoop: {
      title: '非合作运单',
      stats: [
        { label: '发单数量', value: '12' },
        { label: '完成运单数', value: '9' },
        { label: '运费（万元）', value: '46.2' },
      ],
    },
    todo: {
      badges: [
        { label: '待处理', count: '8', tone: 'green' },
        { label: '待报价', count: '128', tone: 'orange' },
        { label: '待装货', count: '2', tone: 'gray' },
      ],
      rows: [
        { no: '2506133632', route: '苏州 → 北京 · 危险品 32t', badge: '待装货', tone: 'orange' },
        { no: '241225597849', route: '沧州 → 北京 · 危险品 30t', badge: '待报价', tone: 'green' },
      ],
    },
    brief: {
      title: '今日货源简讯',
      rows: [
        { route: '北京市 → 内蒙古自治区', meta: '一类 · 15 吨' },
        { route: '定远县济东化工 → 上海市金山区', meta: '八类 · 17.6 吨' },
      ],
    },
  },
  cargo: {
    eyebrow: 'CARGO MARKET / 免费货源广场',
    title: '每天',
    titleAccent: '5,000+',
    titleTail: '条危化品货源，免费看、直接联系',
    desc: '平台每天更新 5,000 条以上一手货源，覆盖全国 31 个省级区域，全部是危化品运输需求。装货地、品类、重量、装车时间与联系人电话全部公开，注册即可联系货主，不收会员费、不抽成。',
    stats: [
      { value: '5,000+', label: '每日新增货源（条）', tone: 'green' },
      { value: '31', label: '覆盖省级区域', tone: 'green' },
      { value: '100%', label: '均为危化品货源', tone: 'green' },
      { value: '0 元', label: '查看联系方式，不抽成', tone: 'orange' },
    ],
    notes: ['数据实时同步', '覆盖危化品 8 大类', '全部一手货源'],
    card: {
      title: '货源广场 · 实时货源',
      badges: [
        { label: '免费查看', tone: 'green' },
        { label: '每日更新 5,000+', tone: 'orange' },
      ],
      updated: '数据更新于 2026-10-29 10:00',
      count: '当前 5,002 条',
      filters: [
        { label: '装货地', placeholder: '请选择装货地' },
        { label: '卸货地', placeholder: '请选择卸货地' },
        { label: '类别', placeholder: '请选择类别' },
      ],
      columns: [
        '序号',
        '装卸地址',
        '类别',
        '车辆类型',
        '货物重量',
        '装货时间',
        '联系人',
        '联系电话',
      ],
      rows: [
        {
          route: '北京市 → 内蒙古自治区',
          cls: '一类 1.1',
          truck: '敞篷车',
          weight: '13 吨',
          time: '09-29 12:00 → 17:59',
          contact: '小苏',
          phone: '13295240809',
        },
        {
          route: '安徽固镇县 → 福建漳州市',
          cls: '八类',
          truck: '无要求',
          weight: '15 吨',
          time: '随时装车',
          contact: '张师傅',
          phone: '18913275666',
        },
        {
          route: '定远县济东化工 → 上海市金山区',
          cls: '八类',
          truck: '无要求',
          weight: '17.6 吨',
          time: '随时装车',
          contact: '—',
          phone: '18913275666',
        },
        {
          route: '甘肃玉门 → 上海浦东',
          cls: '三类',
          truck: '无要求',
          weight: '25.6 吨',
          time: '随时装车',
          contact: '—',
          phone: '18112886910',
        },
        {
          route: '陕西富平 → 安徽铜陵',
          cls: '八类',
          truck: '无要求',
          weight: '32 吨',
          time: '随时装车',
          contact: '—',
          phone: '18112886910',
        },
      ],
      foot: '共 5,002 条货源 · 注册后可查看完整联系方式并与货主信息',
      more: '查看全部货源',
    },
  },
  // 第三屏文字逐字照「L 三项核心能力.png」转录。调度台窗口整窗 DOM 重建
  // （原参考图 调度台截图区.png 已删）：打码字段照原型保留成灰色色块，
  // 行数据逐格转录，第五张运单卡在原型里就被面板底边裁掉一半，照做
  capability: {
    eyebrow: 'CORE CAPABILITIES / 运输链核心功能',
    title: '资质校验、派单、线路规划',
    desc: '资质能不能派、这单派给谁最省、路上走哪条线。过去依赖个人经验，现在由规则与算法给出建议。',
    cards: [
      {
        title: '智能资质前置校验',
        body: '系统自动校验车辆道路运输许可、罐体年检、驾驶员与押运员从业资格证，逐项比对有效期与准运范围。',
        noteTag: '源头风险',
        note: '证照过期自动拦截派单，规避无证运输的高额罚款。',
      },
      {
        title: '智能调度派单',
        body: '按订单品类、重量、装卸地点与合规运力自动匹配，支持多单合并与历史线路复用，减少人工调度误差。',
        noteTag: '周转效率',
        note: '运力充分复用，显著提升单车满载率与月配送数。',
      },
      {
        title: '风险识别',
        body: '内置化学品禁配逻辑，可自动判断不同货品能否混合运输；所有危化品均配备运输注意事项说明，帮助司机安全运输。',
        noteTag: '降低风险',
        note: '自动判断混运，附带运输须知。',
      },
    ],
    console: {
      title: '威易达物流 · 调度台',
      time: '2026-10-29 周四 10:00',
      caption:
        '调度台：左侧为待调度运单（含品类、总量、运距与装货时间），中间按车辆与日期排班并可拼单，右侧显示空闲车辆与可承运品类。',
      // 演示数据是编造的明文：原型截图里车牌/单号打码是真实数据脱敏，官网展示不用学
      orders: {
        title: '待调度运单',
        cards: [
          {
            from: '苏州市',
            to: '合肥市',
            active: true,
            orderNo: 'WYD20261129004826',
            category: '三类',
            weight: '5 吨',
            vehicleType: '固体车',
            mileage: '426.94km',
            loadTime: '2025-12-01 12:00:00',
          },
          {
            from: '合肥市',
            to: '长沙市',
            orderNo: 'WYD20261129004931',
            category: '二类2.1',
            weight: '5 吨',
            vehicleType: '厢式车',
            mileage: '685.72km',
            loadTime: '2025-12-01 00:00:00',
          },
          {
            from: '宜宾市',
            to: '合肥市',
            orderNo: 'WYD20261128005117',
            category: '六类6.1',
            weight: '5 吨',
            vehicleType: '罐式车',
            mileage: '1499.45km',
            loadTime: '2025-12-07 12:00:00',
          },
          {
            from: '长沙市',
            to: '咸宁市',
            orderNo: 'WYD20261128005260',
            category: '六类6.1',
            weight: '5 吨',
            vehicleType: '厢式车',
            mileage: '276.17km',
            loadTime: '2025-12-01 12:00:00',
          },
          {
            from: '苏州市',
            to: '宜宾市',
            orderNo: 'WYD20261128005318',
            category: '三类、四类',
            weight: '6 吨',
            vehicleType: '厢式车',
            mileage: '1732.60km',
            loadTime: '2025-12-08 08:00:00',
          },
        ],
      },
      board: {
        title: '车辆排班表',
        days: ['12月1日', '12月2日', '12月3日', '12月4日', '12月5日', '12月6日', '12月7日'],
        pinCount: '1 辆',
        routeFrom: '苏州市',
        routeTo: '合肥市',
        vehicles: [
          {
            plate: '苏AD8926',
            weight: '32 吨',
            scope: '一类1.1',
            cells: [
              {
                orderNo: 'WYD20261201006143',
                from: '苏州市',
                to: '洛阳市',
                cls: '三类1',
                weight: '5 吨',
                frac: '1/1',
              },
              {
                orderNo: 'WYD20261202006187',
                from: '苏州市',
                to: '合肥市',
                cls: '三类',
                weight: '6 吨',
                frac: '1/1',
              },
              null,
              null,
              null,
              {
                orderNo: 'WYD20261206063512',
                from: '长沙市',
                to: '咸宁市',
                cls: '六类6.1',
                weight: '5 吨',
                frac: '1/1',
              },
              null,
            ],
          },
          {
            plate: '苏AF6K27',
            weight: '32 吨',
            scope: '一类1',
            cells: [
              {
                orderNo: 'WYD20261201006201',
                from: '苏州市',
                to: '洛阳市',
                cls: '三类1',
                weight: '5 吨',
                frac: '1/1',
              },
              null,
              null,
              null,
              {
                orderNo: 'WYD20261205063408',
                from: '苏州市',
                to: '长沙市',
                cls: '一类4、三类4',
                weight: '6 吨',
                frac: '1/1',
              },
              null,
              null,
            ],
          },
          {
            plate: '苏B38516',
            weight: '50 吨',
            scope: '一类1.1、二类2',
            cells: [
              {
                orderNo: 'WYD20261201006266',
                from: '苏州市',
                to: '宿州市',
                cls: '三类',
                weight: '5 吨',
                frac: '1/1',
              },
              null,
              {
                orderNo: 'WYD20261203063357',
                from: '苏州市',
                to: '合肥市',
                cls: '三类',
                weight: '6 吨',
                frac: '1/1',
              },
              null,
              null,
              null,
              {
                orderNo: 'WYD20261207063690',
                from: '宜宾市',
                to: '合肥市',
                cls: '六类6.1',
                weight: '5 吨',
                frac: '1/1',
              },
            ],
          },
          {
            plate: '皖KD58273',
            weight: '32 吨',
            scope: '一类1.2、二类2',
            active: true,
            cells: [
              {
                orderNo: 'WYD20261201006298',
                from: '苏州市',
                to: '合肥市',
                cls: '三类',
                weight: '6 吨',
                frac: '1/1',
              },
              null,
              null,
              null,
              null,
              null,
              null,
            ],
          },
        ],
      },
      idle: {
        title: '空闲车辆',
        cards: [
          {
            plate: '苏AD8926',
            city: '苏州市',
            weight: '32 吨',
            phone: '138****6271',
            scope: '四类4.1',
          },
        ],
      },
    },
  },
  // 第四屏文字逐字照「L 智能拼车.png」转录；右侧时间轴卡 DOM 重建（拼车路线图.png 是参考图）
  carpool: {
    eyebrow: 'SMART CARPOOLING / 智能拼车',
    title: '智能拼车',
    desc: '系统按危化品禁配规则与地理路径推荐可拼组合，在不违反禁配要求的前提下串联多点，降低运输成本并提升车辆满载率。',
    tag: '拼车',
    detail:
      '根据货品运输路线为危化品货源提供合规拼车服务；在不违反禁配规则的前提下拆分线路、串联多点，有效降低运输成本，同时提升物流企业营收与车辆满载率。',
    card: {
      plan: '拼车方案',
      from: '苏州',
      to: '北京',
      badge: '资配校验通过',
      summary: '5 个订单 · 1 车',
      stops: [
        { city: '苏州', event: '接到第一个订单', cargo: '苏州·北京 · 货物A' },
        { city: '无锡', event: '接到第二个订单', cargo: '无锡·济南 · 货物B' },
        { city: '淮安', event: '接到第三个订单', cargo: '淮安·济南 · 货物C' },
        { city: '济南', event: '卸货 B、C、接到第四单', cargo: '济南·沧州 · 货物D' },
        { city: '沧州', event: '卸货 D、接到第五单', cargo: '沧州·北京 · 货物E' },
        { city: '北京', event: '卸货 A、E', cargo: '开启返程，可接回程单' },
      ],
      stripLead: '5 个订单 1 车送',
      stripRoute: '苏州 → 无锡 → 淮安 → 济南 → 沧州 → 北京',
    },
  },
  // 第五屏文字逐字照「L 电子台账.png」转录
  ledger: {
    eyebrow: 'VEHICLE / 车辆及司机管理',
    title: '车辆及司机管理',
    desc: '车辆档案散落在 Excel，司机资质压在纸质证件里、车人绑定凭经验、排班靠电话协调。统一到一套资源池后，车辆状态、证照有效期与出车记录全程可查，调度按任务自动生成建议。',
    cards: [
      {
        icon: '01',
        title: '集中管理',
        body: '统一维护车辆档案和司机信息数据库，确保基础数据准确完整。支持多种维度的快速检索和统计分析。',
      },
      {
        icon: '02',
        title: '灵活配置',
        body: '打破固定车人绑定模式，实现动态匹配管理。系统自动记录每次出车的人员配置，便于后续追溯。',
      },
      {
        icon: '03',
        title: '智能排班',
        body: '根据运输任务自动生成调度排班建议。考虑顺路单、往返货等要求，提升运输效率。',
      },
    ],
  },
}
