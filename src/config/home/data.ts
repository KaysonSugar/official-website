/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 首页内容数据
 */

import type {
  HomeHero,
  HomeIndustry,
  HomeLightweight,
  HomeArchitecture,
  HomeMatrix,
  HomeCapabilities,
  HomeWorkflow,
  HomeCollab,
  HomeAdvantage,
  HomeCostEfficiency,
  HomeService,
} from './types'

export const hero: HomeHero = {
  badge: '对标 2026 版《危险化学品安全法》',
  badgeHint: '点击查看',
  leaveTip: '您将离开威易达官网，前往共产党员网查看《危险化学品安全法》相关内容，请注意信息安全。',
  floats: {
    compliance: { title: '合规校验通过', desc: '危化品运输资质已核验' },
    transit: { title: '在途运输 12 辆', desc: '4 单待签收' },
  },
  title: '威易达化工生产 + 危化运输',
  titleAccent: '一体化平台',
  desc: '覆盖销售订单、原料入库、工厂投产、成品发货与在途运输的全过程。业务数据一处录入、多处复用，合规记录随流程自动生成。',
  primaryCta: '预约产品演示',
  features: ['合规前置校验', '一物一码全链路追溯', '多端协同调度'],
  stats: [
    { value: '10', label: '大业务模块' },
    { value: '1', label: '个数据库' },

    { value: '7 天', label: '完成上线部署', noCount: true },
    { value: '7×24', label: '技术支持响应', noCount: true },
  ],

  workbench: {
    brand: { name: '威易达化工', sub: 'WEIYIDAHUAGONG' },
    menus: [
      '首页',
      '销售管理',
      '物流管理',
      '仓储推荐',
      '采购管理',
      '库存管理',
      '生产管理',
      '质量检测',
      '安全检查',
      '合同资金',
    ],
    top: { title: '工作台', search: '全站搜索', date: '10月28日 周三' },
    greet: { hello: '下午好，王董', sub: '欢迎回到威易达化工系统', scope: '总公司 · 北京总部' },
    stats: [
      { label: '销售总额', value: '4,977.28', unit: '万', tone: 'orange' },
      { label: '采购总额', value: '2.42', unit: '万', tone: 'mint' },
      { label: '合同收款', value: '905.37', unit: '万', tone: 'gray' },
      { label: '运输总额', value: '32.13', unit: '亿', tone: 'amber' },
    ],
    trend: { title: '产量趋势', tag: '本年' },
    donut: {
      title: '物料库存占比',
      items: [
        { label: '原料', percent: 60, tone: 'orange' },
        { label: '成品', percent: 33, tone: 'green' },
        { label: '其他', percent: 7, tone: 'gray' },
      ],
      total: '库存总量 291.5 万吨',
    },
    production: {
      title: '生产情况',
      note: '本周计划 13 个',
      headers: ['计划单号', '产品名称', '计划产量', '状态'],
      rows: [
        {
          no: 'JH2026081500',
          product: '叔丁基过氧化氢-2-乙基己酯',
          qty: '98 吨',
          status: '生产中',
          tone: 'orange',
        },
        { no: 'JH2025081500', product: '石油醚', qty: '98 吨', status: '检测中', tone: 'amber' },
        {
          no: 'SC11089',
          product: '叔丁基过氧化氢-2-乙基己酯',
          qty: '1 吨',
          status: '已完成',
          tone: 'green',
        },
      ],
    },
  },
}

export const industry: HomeIndustry = {
  eyebrow: 'INDUSTRY & COMPLIANCE / 行业背景与法规驱动',
  title: '行业背景与法规驱动',
  desc: '新法核心要求：信息化建设与危化品全生命周期安全管控',
  cards: [
    {
      icon: 'shield',
      label: '第 6 条 / 第 11 条',
      title: '双重预防 + 信息化管控',
      desc: '强制企业构建风险分级管控与隐患排查双重预防机制，推进安全生产信息化，实现全生命周期追溯。',
    },
    {
      icon: 'chip',
      label: '第 12 条',
      title: '鼓励智能自控与数字化',
      desc: '鼓励采用智能控制系统，实现自动监测、数字化管控等先进适用的安全生产技术。',
    },
    {
      icon: 'ban',
      label: '第 82 条 / 第 83 条',
      title: '严禁混装与违规处罚',
      desc: '严禁危化品混装运输与储存，对违规行为实施高额罚款与行政处罚，彻底压降物理混装风险。',
    },
    {
      icon: 'pin',
      label: '第 69 条',
      title: '运输全流程动态管控',
      desc: '强制对运输车辆、驾驶与押运人员实施动态管控，确保危化品运输轨迹可查、状态可控。',
    },
  ],
  note: '平台响应：对标新法要求，将合规要求内置于系统流程，以全生命周期信息化手段，帮助企业轻松应对监管挑战，实现安全与合规一体化落地。',
}

export const lightweight: HomeLightweight = {
  eyebrow: 'LIGHTWEIGHT PLATFORM / 轻量化平台',
  title: '减负提效，轻量合规',
  desc: '面向预算与信息化人员较为有限的中小化工及运输企业，平台以 SaaS 方式交付，覆盖生产、仓储、运输与合规台账管理。',
  tags: [
    { icon: 'tag-erp', text: '无需重型 ERP 系统' },
    { icon: 'tag-invest', text: '无需大额软硬件投入' },
    { icon: 'tag-speed', text: '基础操作约一小时' },
    { icon: 'tag-launch', text: '七天完成上线部署' },
  ],
  pain: {
    title: '中小企业的三项现实约束',
    cards: [
      {
        icon: 'pain-price',
        no: '01',
        title: '预算有限',
        desc: '重型系统采购与定制开发投入较高，实施周期长。',
      },
      {
        icon: 'pain-staff',
        no: '02',
        title: '落地困难',
        desc: '缺乏专职运维及信息化人员，复杂系统难以推广。',
      },
      {
        icon: 'pain-compliance',
        no: '03',
        title: '合规压力',
        desc: '追溯、人车校验与台账缺乏专人管理，违规处罚金额高。',
      },
    ],
  },
  groups: [
    {
      title: '平台在投入、操作、运维与部署四个方面进行了简化',
      cols: 4,
      cards: [
        { icon: 'light-invest', title: '投入轻', desc: '无需额外实施费用，按需订阅。' },
        { icon: 'light-operate', title: '操作轻', desc: '流程精简，约一小时即可掌握。' },
        { icon: 'light-maintain', title: '运维轻', desc: '无需专职 IT，版本由云端统一升级。' },
        { icon: 'light-deploy', title: '部署轻', desc: 'SaaS 架构，无需本地服务器。' },
      ],
    },
    {
      title: '核心能力覆盖生产、调度、溯源与财务台账',
      cols: 2,
      cards: [
        {
          icon: 'cap-production',
          title: '生产管控',
          desc: '支持简易排产与 BOM 自动拆解，库存、采购及生产环节形成闭环管理。',
        },
        {
          icon: 'cap-dispatch',
          title: '智能调度',
          desc: '运单一键发布，系统自动匹配运力，并校验人车资质与禁配物料。',
        },
        {
          icon: 'cap-trace',
          title: '全链路溯源',
          desc: '采用一物一码追溯，电子台账自动生成并加密存档，监管报表可导出。',
        },
        {
          icon: 'cap-finance',
          title: '财务台账',
          desc: '收付款、报销与资金流水统一统计，报表自动生成，满足日常对账需要。',
        },
      ],
    },
  ],
  notes: [
    '生产、仓储与运输共用同一套系统，无需在多个软件之间切换。',
    '合规校验内置于业务流程之中，对无证作业与混装等违规行为形成事前拦截。',
  ],
}

export const architecture: HomeArchitecture = {
  eyebrow: 'PLATFORM ARCHITECTURE / 平台架构',
  title: '平台功能结构',
  desc: '从展示层到资源服务层共六层。化工企业的生产合规需求与物流企业的调度合规需求，共用同一套用户体系、数据与算法能力。',
  layers: [
    { label: '展示层', blocks: ['PC', 'APP', '大屏'] },
    { label: '用户层', blocks: ['货主', '货运公司', '司机', '平台管理'] },
    {
      label: '业务层',
      highlight: true,
      modules: [
        {
          title: '货主模块',
          desc: '销售管理、物流管理、采购管理、库存管理、质量安全、合同资金',
        },
        {
          title: '货运公司模块',
          desc: '运单管理、配载调度、货源推荐、仓储推荐、司机押运员管理、车辆管理',
        },
        {
          title: '司机模块',
          desc: '货源推荐、线上接单、风险预警、应急预案',
        },
        {
          title: '平台管理模块',
          desc: '用户管理、车辆管理、优化配载、运力调度、业务数据分析、风险可控',
        },
      ],
    },
    { label: '算法层', blocks: ['协同过滤算法', '路径算法', 'MRP 物料需求算法'] },
    { label: '数据库', blocks: ['基础数据库', '业务数据库', '危化品数据库'] },
    {
      label: '资源服务层',
      blocks: ['云服务器 ECS', '负载均衡 SLB', '云数据库 RDS MySQL', '弹性公网 IP', '日志服务'],
    },
  ],
  note: '新法的监管逻辑是源头防控、全程监督、智能预警、永久溯源。平台按这项顶层组织功能，生产与运输共用同一套客户、数据与算法。',
}

export const matrix: HomeMatrix = {
  eyebrow: 'PRODUCT MATRIX / 产品矩阵',
  title: '三端业务运转模式',
  desc: '化工企业用「威易达化工」管生产、合同与资金；货运公司用「威易达物流」管车辆、人员与调度；司机用「威易达司机」接单、报备、回单。三端共用同一套订单与数据。',
  flow: {
    alt: '化工企业、威易达货主、合作物流公司、威易达物流、威易达司机、全国危化物流公司与自营车辆的业务流转关系图',
    nodes: [
      { id: 'chemical', label: '化工企业', tone: 'orange', icon: 'factory' },
      { id: 'shipper', label: '威易达货主', tone: 'green', icon: 'fleet' },
      { id: 'partner', label: '合作物流公司', tone: 'orange', icon: 'warehouse' },
      { id: 'hub', label: '威易达物流', tone: 'green', icon: 'fleet' },
      { id: 'driver', label: '威易达司机', tone: 'green', icon: 'fleet' },
      { id: 'national', label: '全国危化物流公司', tone: 'orange', icon: 'airlift' },
      { id: 'own', label: '自营车辆', tone: 'orange', icon: 'truck' },
    ],
    links: [
      { id: 'order', label: '填写运单发货,选择合作物流', labelPos: 'above' },
      { id: 'compare', label: '比价,确定承运公司', labelPos: 'below' },
      { id: 'encrypt', label: '数据流转加密', labelPos: 'right' },
      { id: 'quote', label: '展示化工企业运单信息', labelPos: 'above' },
      { id: 'bid', label: '报价，接单', labelPos: 'below' },
      { id: 'transfer', label: '转单', labelPos: 'above' },
      { id: 'status', label: '运输状态', labelPos: 'below' },
      { id: 'source', label: '展示货源、自动寻车', labelPos: 'above' },
      { id: 'accept', label: '接单', labelPos: 'below' },
      { id: 'dispatch', label: '系统自动调度', labelPos: 'right' },
    ],
  },
  linkPrefix: '了解',
  linkArrow: ' →',
  cards: [
    {
      icon: 'chemical',
      tone: 'orange',
      label: '化工生产企业',
      title: '威易达化工',
      desc: '把销售、采购、仓储、合同、资金、生产、质检与安检环节装进一套系统，订单驱动排产，BOM 精准算料，一物一码追溯从原料入厂到成品出库。',
      tags: ['销售管理', '采购管理', '仓储管理', '生产 BOM', '质安检', '报表分析'],
      to: '/products/chemical',
    },
    {
      icon: 'logistics',
      tone: 'green',
      label: '危化品运输企业',
      title: '威易达物流',
      desc: '把线下调度搬上系统：资质前置校验、智能派单、合规线路规划、在途动态监控全部线上完成，运单全程留痕，可随时导出对账。',
      tags: ['运单调度', '车辆司机', '资质校验', '在途监控', '电子回单', '对账结算'],
      to: '/products/logistics',
    },
    {
      icon: 'driver',
      tone: 'green',
      label: '危化品运输司机',
      title: '威易达司机',
      desc: '一手货源看得见：一键接单、在线报备、电子回单、禁配与线路提示，把过去靠电话沟通的环节压缩成几次点击。',
      tags: ['找货接单', '在线报备', '电子回单', '合规提示', '安全培训'],
      to: '/products/driver',
    },
  ],
}

export const capabilities: HomeCapabilities = {
  eyebrow: 'CORE CAPABILITIES / 核心功能详解',
  title: '业务流程闭环',
  desc: '销售订单确认后，系统依次完成生产计划、BOM 拆解、物料需求计算与库存校验。缺料自动转采购，齐套自动转领料，计划员只需核对系统生成的需求清单。',
  cards: [
    {
      icon: 'order',
      title: '订单驱动，智能排产',
      desc: '多张销售订单自动合并，结合产能与交期生成最优生产计划，减少换线次数。',
    },
    {
      icon: 'bom',
      title: 'BOM 多级展开，物料精准',
      desc: '成品自动拆解到半成品与原材料，按定额与损耗系数计算需求量，杜绝漏算、多算。',
    },
    {
      icon: 'stock',
      title: '库存智能校验，按需触发',
      desc: '对照实时库存自动判定可用量，缺料触发采购，齐套触发领料，采购与车间同步收紧。',
    },
    {
      icon: 'purchase',
      title: '采购—质检—入库闭环',
      desc: '询价、比价、验收、质检、入库逐环节留痕，批次与供应商绑定，物料质量来源可查。',
    },
    {
      icon: 'process',
      title: '工序化投产，过程标准化',
      desc: '投产工单与工序、工时绑定，投料量与实际产出双向核对，生产进度实时可见。',
    },
    {
      icon: 'sales',
      title: '产销衔接，数据互通',
      desc: '成品入库即刻同步可用库存与可承诺量，销售报价与交期承诺有真实数据支撑。',
    },
  ],
}

export const workflow: HomeWorkflow = {
  eyebrow: 'WORKFLOW / 生产主流程图',
  title: '生产主流程管理',
  desc: '流程中只有一个判断点：即时库存是否满足。不足生成采购单，齐套生成领料单，两条分支最终都在成品入库与发货环节汇合。',

  topNodes: [
    { text: '销售订单', tone: 'orange', arrow: true },
    { text: '生产计划（绑定成品和 BOM）', tone: 'green', arrow: true },
    { text: 'BOM 多级展开', tone: 'plain', arrow: true },
    { text: '物料需求（半成品 / 原料 / 包材）', tone: 'green', arrow: false },
  ],
  judge: '库存可用量',

  branches: [
    {
      head: '库存不足 → 采购分支',
      tone: 'orange',
      steps: ['生成采购单', '供应商比价 · 送货', '来料质检'],
      tail: { text: '原料入库（批次可追溯）', tone: 'tinted' },
    },
    {
      head: '库存充足 → 生产分支',
      tone: 'green',
      steps: ['生成领料单', '投料生产 · 工序化作业', '成品入库'],
      tail: { text: '发货出库 → 运输调度', tone: 'solid' },
    },
  ],
  note: '两条分支最终都汇入成品入库与发货环节：采购回来的原料进入投料生产，库存充足则直接领料投产 —— 全流程单据与批次数据自动联动，无需二次录入。',
}

export const collab: HomeCollab = {
  eyebrow: 'COLLABORATION / 运输协同流程图',
  title: '运输协同',
  desc: '化工企业发布运单，货主端完成比价与合同确认，物流端派车，司机接单承运并回传在途状态。回单与结算数据回流至货主，形成完整闭环。',
  center: {
    title: '全链路数据闭环',
    sub: '订单 · 运单 · 回单 同步',
    note: '一次录入，四方可见',
  },

  nodes: [
    { name: '化工企业', sub: '发布运单、选择合作物流', tone: 'light', x: 50, y: 7.2 },
    { name: '威易达化工', sub: '比价 · 合同 · 结算', tone: 'orange', x: 71.5, y: 50 },
    { name: '威易达物流', sub: '派单 · 调度 · 在途监控', tone: 'green', x: 50, y: 92.8 },
    { name: '威易达司机', sub: '社会运力 · 接单 · 电子回单', tone: 'light', x: 29.3, y: 49.9 },
  ],

  flows: [
    { text: '回单结算', x: 32.9, y: 14.9 },
    { text: '下单询价', x: 66.9, y: 14.9 },
    { text: '接单承运', x: 32.9, y: 85.6 },
    { text: '转单派车', x: 67, y: 85.5 },
  ],
  asides: [
    {
      title: '闭环如何成立',
      tone: 'green',
      items: [
        { title: '一份数据源', desc: '订单、运单、回单同源，四方同步可见。' },
        { title: '节点全留痕', desc: '派车、装货、在途、卸货逐环节留痕。' },
        { title: '回单即回传', desc: '司机拍照上传，结算不等纸质单据。' },
      ],
    },
    {
      title: '数据流向哪里',
      tone: 'orange',
      items: [
        { title: '在途看板', desc: '位置、进度、异常在货主端实时可见。' },
        { title: '回单归档', desc: '卸货拍照即入档，按单可查、按客户可筛。' },
        { title: '成本报表', desc: '运费、里程、时效汇入报表，可对比分析。' },
      ],
    },
  ],
}

export const advantage: HomeAdvantage = {
  eyebrow: 'FULL-CHAIN ADVANTAGE / 全链路一体化优势',
  title: '三类参与方的核心痛点与对应方案',
  tableHead: { party: '参与方', pain: '核心痛点', solution: '威易达解决方案' },
  supportsTitle: '平台层的三项支撑能力',
  rows: [
    {
      name: '化工企业',
      pains: [
        { title: '生产混乱', desc: '订单排产无序；BOM 拆解易错，库存与生产脱节。' },
        { title: '管理繁琐', desc: '台账人工记录，全流程溯源难，合规风险高。' },
      ],
      solutions: [
        { title: '生产管控一体化', desc: '订单驱动智能排产，BOM 自动拆解，库存智能校验。' },
        { title: '管理数字化', desc: '自动化台账，一物一ID 全流程溯源，满足合规审计。' },
        { title: '运输资源整合', desc: '多渠道运力入池，透明比价，全程在途监控。' },
      ],
    },
    {
      name: '物流企业',
      pains: [
        { title: '获客难', desc: '优质货源分散，接单渠道单一。' },
        { title: '调度难', desc: '人工派单效率低，运力匹配不合理。' },
        { title: '合规难', desc: '人车资质审核繁琐，货物禁配风险高。' },
      ],
      solutions: [
        { title: '货源信息聚合', desc: '平台汇聚优质货源，拓宽接单渠道。' },
        { title: '智能调度派单', desc: '系统自动匹配最优运力，提升调度效率。' },
        { title: '合规前置校验', desc: '自动核验人车资质，禁配自动检测，规避风险。' },
      ],
    },
    {
      name: '危化司机',
      pains: [
        { title: '找货难', desc: '货源信息杂乱，优质订单匹配效率低。' },
        { title: '流程繁', desc: '接单-报备-回单流程繁琐，沟通成本高。' },
        { title: '风险高', desc: '禁配、路线无指导，违规风险高。' },
      ],
      solutions: [
        { title: '智能订单匹配', desc: '精准推送优质订单，提升接单效率。' },
        { title: '操作流程简化', desc: '一键接单，在线报备、电子回单，简化操作。' },
        { title: '全程合规指导', desc: '智能规划合规路线，禁配风险提前预警。' },
      ],
    },
  ],
  supports: [
    {
      no: '01',
      tone: 'orange',
      title: '数据自动串联',
      desc: '原料入库、生产完工、成品仓储、销售出库、运输签收全链路自动打通，跨系统抄录与二次录入彻底消失。',
    },
    {
      no: '02',
      tone: 'green',
      title: '一物一 ID 贯穿全周期',
      desc: '每一批次、每一包化学品都有唯一身份标识，从生成到使用逐环节记录，随时可追溯、责任可界定。',
    },
    {
      no: '03',
      tone: 'orange',
      title: '契合新法合规要求',
      desc: '完整响应安全生产法对危化品全生命周期信息化管理与跨部门数据共享的要求，从源头规避合规风险。',
    },
  ],
  noteTag: '核心观点',
  note: '全流程记录在一处可查：管理层看得见瓶颈工序，合规岗调得出批次台账，客户查得到货物去向。',
}

export const costEfficiency: HomeCostEfficiency = {
  eyebrow: 'COST & EFFICIENCY / 为企业降本增效',
  title: '违规风险前置拦截，人工成本逐项下降',
  desc: '四类高频违规由系统在业务发生前拦截，不依赖个人记忆与责任心。重复录入由系统自动完成，同样的人手可以处理更多单据。',
  risks: [
    {
      title: '危化混装 · 瞒报谎报',
      penalty: '处罚 5-50 万元 · 停产整顿',
      guard: '防控：自动禁配校验，从源头杜绝违规配载',
    },
    {
      title: '台账缺失 · 记录不合规',
      penalty: '处罚 10-20 万元 · 责令限期整改',
      guard: '防控：业务数据自动归档，加密云端长期留存',
    },
    {
      title: '无证人车承单运输',
      penalty: '处罚 5-50 万元 · 追究责任人',
      guard: '防控：资质到期自动冻结接单权限',
    },
    {
      title: '剧毒化学品流向未备案',
      penalty: '处罚 2-10 万元 · 构成犯罪追刑责',
      guard: '防控：流向数据自动统计，一键生成备案材料',
    },
  ],
  gains: [
    {
      tone: 'green',
      title: '降低人工成本',
      desc: '自动填报与智能派单替代大量手工操作，省下的都是净利。',
    },
    {
      tone: 'green',
      title: '提升车辆周转率',
      desc: '就近匹配与合规拼单，减少空驶与等货，一趟能多装、一天能多跑。',
    },
    {
      tone: 'orange',
      title: '优化管理决策',
      desc: '全流程数据实时可视化，瓶颈与异常一眼可见，决策有据可依而不是凭经验。',
    },
    {
      tone: 'orange',
      title: '增强客户信任',
      desc: '透明、留痕、可追溯的服务体验，客户问得住，合作自然更稳、更长久。',
    },
  ],
}

export const service: HomeService = {
  eyebrow: 'OUR SERVICE / 我们的服务',
  title: '实施、定制与运维，三类服务内容',
  desc: '面向化工与危化运输业务，提供上线实施、二次开发与日常运维三类服务，均由熟悉行业流程的实施团队负责。',
  cards: [
    {
      icon: 'implement',
      title: '专业实施服务',
      items: [
        '一对一专属顾问，提供全流程上线指导，从需求梳理到落地执行全程跟进',
        '协助历史数据清洗迁移，开展全员操作培训，降低学习成本',
        '遵循标准化实施流程，严控节点与质量，快速部署、平稳上线',
      ],
    },
    {
      icon: 'custom',
      title: '定制化开发支持',
      items: [
        '支持二次表单开发与个性化报表，贴合企业独特业务逻辑',
        '大数据看板定制开发，拒绝数据孤岛，打通业务全链路',
        '对接现有 ERP、MES 等系统，实现多平台数据互联互通',
      ],
    },
    {
      icon: 'support',
      title: '7×24 小时在线答疑',
      items: [
        '专业技术团队全天候实时响应，快速解答系统使用疑问',
        '提供远程协助、视频指导等技术支持，及时排查问题',
        '定期进行系统迭代与优化，持续修复问题、提升性能',
      ],
    },
  ],
}
