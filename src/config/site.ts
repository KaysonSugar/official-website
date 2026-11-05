/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.03
 * @Name: 站点内容配置
 */

/**
 * 站点内容配置（唯一数据源，只管内容）
 *
 * 页面上的品牌信息、导航、各页面首屏文案全部集中在这里。
 * 改文案只改本文件，不需要进组件里翻 DOM；字段写错会在 npm run typecheck 时报错。
 * 类型定义搬到了同目录 types.ts，这里只剩数据。
 */

import type { NavChild, PageIntro, SiteConfig } from './types'

/**
 * 各页面首屏文案
 *
 * 有原型画板的直接用画板标题（威易达化工：生产与经营管理 / 威易达物流：调度与合规 /
 * 威易达司机：接单与作业 / 服务支持）；
 * 平台架构、产品矩阵、关于我们三页的原型尚未提供，标题与描述为占位，上线前替换。
 */
const pages: PageIntro[] = [
  {
    to: '/platform',
    label: '平台架构',
    eyebrow: '平台能力',
    title: '平台架构',
    desc: '一套统一底座 + 模块化业务能力，让化工、物流、司机三条业务线共用同一份数据。',
    align: 'left',
  },
  {
    to: '/products/chemical',
    label: '化工生产',
    eyebrow: '产品 / 威易达化工',
    title: '威易达化工',
    desc: '轻量级管理平台，覆盖业务：销售、采购、仓储、合同、资金、生产 BOM、质检环与报表分析八个模块，订单、库存、合同与资金使用同一套数据。',
    align: 'left',
  },
  {
    to: '/products/logistics',
    label: '物流调度',
    eyebrow: '产品 / 威易达物流',
    title: '威易达物流',
    desc: '覆盖资质核验、订单派车、线路规划、在途监控与台账导出五项功能。调度员的日常工作从打电话改为在系统里派单。',
    align: 'left',
  },
  {
    to: '/products/driver',
    label: '司机作业',
    eyebrow: '产品 / 威易达司机',
    title: '威易达司机',
    desc: '司机端提供货源查看、一键接单、电子回单与禁配提示四大主要功能，减少电话沟通环节。',
    align: 'left',
  },
  {
    to: '/solutions',
    label: '服务支持',
    eyebrow: 'SERVICE / 实施与服务',
    title: '标准化的服务流程',
    desc: '订阅版包含基础实施与售后运维。从需求调研、系统配置、数据迁移到操作培训、试运行与验收，每个环节都有明确的交付物与确认动作，实施范围在合同附件中逐项列明。',
    align: 'left',
  },
  {
    to: '/about',
    label: '关于我们',
    eyebrow: 'ABOUT US / 关于我们',
    title: '同心图治，坚持创新，追求卓越',
    desc: '苏州翔瑞成信息技术有限公司',
    align: 'left',
  },
]

/** 产品矩阵下挂的三条业务线（与导航下拉同源，改这里两处一起变） */
const productLines: NavChild[] = [
  { label: '化工生产', desc: '生产与经营管理', to: '/products/chemical' },
  { label: '物流调度', desc: '调度与合规', to: '/products/logistics' },
  { label: '司机作业', desc: '接单与作业', to: '/products/driver' },
]

/** 实际内容（当前为占位文案，上线前替换） */
export const siteConfig: SiteConfig = {
  brand: {
    name: '威易达化工',
    nameEn: 'WEIYIDA HUAGONG',
  },
  contact: {
    phone: '400-001-8355',
    phoneHref: 'tel:4000018355',
    ctaLabel: '预约演示',
    ctaHref: 'tel:4000018355',
  },
  // 一级导航四项（对应定稿原型 01 首页顶栏）；「产品矩阵」带下拉，
  // 化工 / 物流 / 司机是它的二级项，不是一级导航。
  // 「平台架构」不在导航里了，页面保留（页脚与首页次按钮还链过去）
  navItems: [
    { label: '首页', to: '/' },
    { label: '产品矩阵', to: '/products', children: productLines },
    { label: '服务支持', to: '/solutions' },
    { label: '关于我们', to: '/about' },
  ],
  pages,
  hero: {
    badge: '对标 2026 版《危险化学品安全法》',
    title: '威易达化工生产 + 危化运输',
    titleAccent: '一体化平台',
    desc: '覆盖销售订单、原料入库、工厂投产、成品发货与在途运输的全过程。业务数据一处录入、多处复用，合规记录随流程自动生成。',
    primaryCta: '预约产品演示',
    features: ['合规前置校验', '一物一码全链路追溯', '多端协同调度'],
    stats: [
      { value: '10', label: '大业务模块' },
      { value: '1', label: '个数据库' },
      // 这两条不递增：0.9s 动画里会闪过「6 天 / 6×24」，6×24 语义就不对
      { value: '7 天', label: '完成上线部署', noCount: true },
      { value: '7×24', label: '技术支持响应', noCount: true },
    ],
  },
  // 原型 02 的四张卡片按新法条款顺序排，icon 名对应 assets/home/icons/ 下的 png
  industry: {
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
  },
  // 原型 03：轻量化平台。icon 名即 assets/home/icons/ 下的文件名（不含 .png）
  lightweight: {
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
  },
  // 原型 04：平台功能结构。暗色分层图，layers 顺序即从上到下；
  // 业务层用 modules（四张棕卡），其余层用 blocks（等宽文字块）
  architecture: {
    eyebrow: 'PLATFORM ARCHITECTURE / 平台架构',
    title: '平台功能结构',
    desc: '从展示层到资源服务层共六层。化工企业的生产合规需求与物流企业的调度合规需求，共用同一套用户体系、数据与算法能力。',
    layers: [
      { label: '展示层', blocks: ['PC', 'APP', '大屏'] },
      { label: '用户层', blocks: ['货主', '货运公司', '司机', '平台管理'] },
      {
        label: '业务层',
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
  },
  // 原型 05：三端业务运转模式。流程图是一整张透明底素材（matrix-flow.png），
  // 卡片的 href 是三个外部系统入口；司机端还没上线，故意不给 href
  matrix: {
    eyebrow: 'PRODUCT MATRIX / 产品矩阵',
    title: '三端业务运转模式',
    desc: '化工企业用「威易达化工」管生产、合同与资金；货运公司用「威易达物流」管车辆、人员与调度；司机用「威易达司机」接单、报备、回单。三端共用同一套订单与数据。',
    cards: [
      {
        icon: 'chemical',
        tone: 'orange',
        label: '化工生产企业',
        title: '威易达化工',
        desc: '把销售、采购、仓储、合同、资金、生产、质检与安检环节装进一套系统，订单驱动排产，BOM 精准算料，一物一码追溯从原料入厂到成品出库。',
        tags: ['销售管理', '采购管理', '仓储管理', '生产 BOM', '质安检', '报表分析'],
        href: 'https://prod.weihuayunshu.com/producer/',
      },
      {
        icon: 'logistics',
        tone: 'green',
        label: '危化品运输企业',
        title: '威易达物流',
        desc: '把线下调度搬上系统：资质前置校验、智能派单、合规线路规划、在途动态监控全部线上完成，运单全程留痕，可随时导出对账。',
        tags: ['运单调度', '车辆司机', '资质校验', '在途监控', '电子回单', '对账结算'],
        href: 'https://prod.weihuayunshu.com/carrier/',
      },
      {
        icon: 'driver',
        tone: 'green',
        label: '危化品运输司机',
        title: '威易达司机',
        desc: '一手货源看得见：一键接单、在线报备、电子回单、禁配与线路提示，把过去靠电话沟通的环节压缩成几次点击。',
        tags: ['找货接单', '在线报备', '电子回单', '合规提示', '安全培训'],
      },
    ],
  },
  // 原型 06：核心功能详解。六张卡按业务流顺序排（订单 → BOM → 库存 → 采购 → 投产 → 销售），
  // icon 名对应 assets/home/icons/ 下的 fn-*.png（素材自带浅色圆角底，橙绿交替）
  capabilities: {
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
  },
  // 原型 07：生产主流程图。纯文字流程图无图标：顶部四节点 → 菱形判断 → 左右两条分支
  workflow: {
    eyebrow: 'WORKFLOW / 生产主流程图',
    title: '生产主流程管理',
    desc: '流程中只有一个判断点：即时库存是否满足。不足生成采购单，齐套生成领料单，两条分支最终都在成品入库与发货环节汇合。',
    // 顶部主流程节点，arrow 前置表示节点右侧跟一个 →
    topNodes: [
      { text: '销售订单', tone: 'orange', arrow: true },
      { text: '生产计划（绑定成品和 BOM）', tone: 'green', arrow: true },
      { text: 'BOM 多级展开', tone: 'plain', arrow: true },
      { text: '物料需求（半成品 / 原料 / 包材）', tone: 'green', arrow: false },
    ],
    judge: '库存可用量',
    // 两条分支：head 分支名条、steps 中间步骤、tail 收尾条（tone=solid 是深绿实心）
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
  },
  collab: {
    eyebrow: 'COLLABORATION / 运输协同流程图',
    title: '运输协同',
    desc: '化工企业发布运单，货主端完成比价与合同确认，物流端派车，司机接单承运并回传在途状态。回单与结算数据回流至货主，形成完整闭环。',
  },
  advantage: {
    eyebrow: 'FULL-CHAIN ADVANTAGE / 全链路一体化优势',
    title: '三类参与方的核心痛点与对应方案',
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
  },
  // 原型 09：降本增效。处罚行按原型保留「处罚 5-50 万元 · 停产整顿」的写法，
  // 连接符用短横线；四张卡文字长短不一，靠栅格等宽对齐
  costEfficiency: {
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
  },
  // 原型 10：我们的服务。图标素材自带浅橙/浅绿圆角底，直接当图片用
  service: {
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
  },
  // 服务支持页（原型 Service Hero + S1），文案逐字照画板
  support: {
    ctaLabel: '预约实施评估',
    features: ['线上远程实施', '线下上门实施', '7–15 天试运行', '7×24 技术支持'],
    timeline: {
      title: '典型项目节奏',
      badge: '4–6 周',
      note: '整体周期视模块数量、数据量与反馈处理效率评估，多工厂项目顺延。',
      steps: [
        { no: '1', tone: 'orange', label: '第 1 周 · 调研与方案', desc: '梳理流程与单据，确认实施范围与交付清单' },
        { no: '2', tone: 'green', label: '第 2 周 · 配置与建档', desc: '搭建组织权限，标准化基础档案与审批流程' },
        { no: '3', tone: 'salmon', label: '第 3–4 周 · 迁移与培训', desc: '存量数据清洗导入，管理员与岗位分批实操培训' },
        { no: '4', tone: 'dark', label: '第 5 周 · 试运行与验收', desc: '全流程跑单观察，逐项签字确认后移交维保' },
      ],
    },
    scope: {
      eyebrow: 'SERVICE SCOPE / 服务内容',
      title: '实施交付包含八项内容',
      desc: '从签约后的需求调研到验收归档，实施范围按固定清单推进。合同附件中逐项列明交付内容，避免范围与责任界定不清。',
      cards: [
        {
          icon: 'survey',
          title: '前期对接调研',
          desc: '梳理业务流程、组织架构、岗位权限与审批路径，确认表单字段、报表与 BOM 需求，输出实施方案、工期计划与交付清单。',
        },
        {
          icon: 'init',
          title: '系统初始化配置',
          desc: '按组织架构与角色权限，批量开通账号，标准化客户、供应商、物料、仓库与会计科目等基础档案，配置单据流程与打印模板。',
        },
        {
          icon: 'migrate',
          title: '历史数据迁移',
          desc: '整理并清洗存量 Excel 数据，协助导入历史单据、往来账目与库存期初，完成试算平衡与差异调整后在新系统并行试运行。',
        },
        {
          icon: 'training',
          title: '操作培训服务',
          desc: '为管理员提供后台全功能培训，为各岗位员工提供线上或现场实操培训，配套操作手册与常见问题说明，并考核操作熟练度。',
        },
        {
          icon: 'launch',
          title: '上线调试与试运行',
          desc: '完成全流程跑单测试与业务闭环验证，跟进异常问题与缺陷修复，安排 7–15 天试运行，配合旧系统平稳切换。',
        },
        {
          icon: 'accept',
          title: '项目验收归档',
          desc: '按需求清单逐项验收签字，归档需求文档、配置台账与培训记录，移交售后对接人并转入常规维保服务。',
        },
        {
          icon: 'aftercare',
          title: '后期售后运维',
          desc: '处理账号新增与权限调整，提供在线答疑与远程协助，同步版本更新与功能升级，跟进年度盘点与续期服务。',
        },
        {
          icon: 'plus',
          title: '增值实施服务',
          desc: '深度定制流程、二次表单开发、个性化报表、多系统接口对接、驻场实施与数据大屏等需求，按单次项目另行报价。',
        },
      ],
    },
    // 第三屏（原型 S2）：七个节点单数在轴上方、双数在下方，07 是深绿卡
    process: {
      // 这一屏眉题是绿色，全站独一份
      eyebrow: 'PROCESS / 实施流程',
      title: '七个节点，从需求调研到转入维保',
      desc: '每个节点都有对应的交付物与确认动作，客户确认后进入下一阶段。未签订实施协议、未结清费用，不启动上门与深度实施。',
      steps: [
        { no: '01', title: '需求调研', desc: '确认流程与数据范围' },
        { no: '02', title: '方案确认', desc: '输出方案与交付清单' },
        { no: '03', title: '环境初始化', desc: '组织权限与基础档案' },
        { no: '04', title: '数据迁移', desc: '清洗导入与期初建账' },
        { no: '05', title: '培训交付', desc: '管理员与岗位培训' },
        { no: '06', title: '试运行', desc: '全流程跑单与观察' },
        { no: '07', title: '验收转维保', desc: '逐项签字移交对接人', dark: true },
      ],
      afterLabel: '验收之后',
      afterText: '签字移交后转入运维，7×24 技术支持持续推进。',
    },
    // 第四屏（原型 S3）：线下上门那张是暖橙卡，其余白卡
    pricing: {
      eyebrow: 'DELIVERY & PRICING / 实施方式与计费',
      title: '线上远程与线下上门，按方式分别计费',
      desc: '年套餐内含基础实施与售后运维。超出标配范围的上门、专场培训与定制开发，按单次项目另行计费，具体报价按城市、客户规模与实施天数评估。',
      cards: [
        {
          icon: 'remote',
          title: '线上远程实施',
          items: ['年套餐内含基础实施，不另行收费', '超出标配的账号座位按档计费', '年度赠送一次专场培训，超出按次计费'],
          foot: '适用于单工厂、流程相对标准的企业',
        },
        {
          icon: 'onsite',
          title: '线下上门实施',
          warm: true,
          items: ['按实施人天计费，差旅住宿据实报销', '集中培训按场次计费', '报价按城市、客户规模与天数评估'],
          foot: '适用于多工厂、多角色协同的企业',
        },
        {
          icon: 'plus',
          title: '增值与定制',
          items: ['二次表单开发与个性化报表', '多系统接口对接与数据大屏', '驻场实施与专项数据整理'],
          foot: '按单次项目评估工作量后报价',
        },
      ],
    },
    // 第五屏「服务承诺」（原型 S4）：深绿底，四张准则卡 + 底部一行硬指标
    commitment: {
      eyebrow: 'COMMITMENT / 服务承诺',
      title: '四项交付准则，写入服务范围',
      desc: '实施与售后均按统一标准执行：范围在合同中明确、节点按计划推进、问题有明确的责任人与关闭时间。',
      cards: [
        {
          icon: 'sign',
          title: '先签约后实施',
          desc: '实施协议签订、费用结清后启动上门与深度实施，不在合同外先做后补。',
        },
        {
          icon: 'checklist',
          title: '按清单交付',
          desc: '交付内容以合同附件与交付清单为准，不做超出范围的口头承诺。',
        },
        {
          icon: 'schedule',
          title: '按期验收',
          desc: '按计划节点推进，异常问题当日反馈，未完成项列入整改清单并跟踪至关闭。',
        },
        {
          icon: 'loop',
          title: '闭环售后',
          desc: '验收后移交专属对接人，服务工单跟进至关闭，年度回访与续费提醒由同一人负责。',
        },
      ],
      stats: [
        { value: '7×24', label: '技术支持响应' },
        { value: '1 对 1', label: '专属实施顾问' },
        { value: '7–15 天', label: '系统试运行周期' },
        { value: '100%', label: '由公司对公账户收款' },
      ],
    },
  },
  // 关于我们页（原型 About Hero + S1~S3）。首屏文案在 pages 的 /about 条目里，
  // 简介与使命同构（眉题+标题+段落）共用一个组件；段落逐字照原型，含原型原有的标点缺失。
  about: {
    intro: {
      eyebrow: 'INTRODUCTION / 简介',
      title: '简介',
      paras: [
        '苏州翔瑞成信息技术有限公司，依托人工智能模型与算法进行软件产品开发、运营。公司以AI技术为基础，以市场为导向，目前主要进行危险化学品品运输车辆调度优化、城市管理机器人等针对低碳环保领域的产品开发与迭代，以数字化助力碳中和，最终实现利用人工智能推动社会治理水平的提高，实现对公共安全、环境保护方面的创新和突破。',
      ],
    },
    mission: {
      eyebrow: 'MISSION / 公司使命',
      title: '公司使命',
      paras: [
        '危化品物流是指危化品从生产者到消费者之间的物理经济活动，包括运输、仓储、装卸搬运、流通加工、配送、回收、信息活动等过程的有机结合，最终实现物的价值增值和组织目标近年来我国危化品行业快速发展，带动危化品物流需求增长，行业市场规模不断扩大。',
        '这是一个专为危险化学品运输打造的物流平台，致力于提供高效、安全的危化品载配与拼车服务。我们深知危化品运输的重要性与复杂性，因此通过专业的技术团队与丰富的行业经验为您打造了一个全方位的危化品物流解决方案。',
      ],
    },
    philosophy: {
      eyebrow: 'PHILOSOPHY / 企业理念',
      title: '企业理念',
      items: [
        { icon: 'innovation', label: '创新' },
        { icon: 'persist', label: '坚持' },
        { icon: 'execute', label: '执行' },
        { icon: 'excel', label: '卓越' },
      ],
    },
  },
  // 化工生产页（原型 Product Hero + P 三条主线）。资金流水卡与流程面板都是 DOM 重建
  // （用户传的 Flow Panel.png / Module Card.png 是烘焙文字参考图，已删）。
  chemical: {
    ctaLabel: '立即体验',
    heroCard: {
      title: '资金流水 · 2026 年 10 月',
      badge: '本月',
      stats: [
        { label: '合同收款', value: '9,053,871.00', active: true },
        { label: '合同付款', value: '507,913.12' },
        { label: '借款', value: '2,531,759.00' },
        { label: '报销', value: '15,008,876.00' },
        { label: '还款', value: '55,490.12' },
      ],
      tabs: ['合同收款', '合同付款', '借款', '报销', '还款'],
      columns: ['合同名称', '合同编号', '收款金额（元）', '创建日期'],
      rows: [
        { name: '硝酸采购合同', contract: 'HT123654321', amount: '800.00', date: '2026-08-25' },
        { name: '液碱框架采购合同', contract: 'HT123698877', amount: '10,000.00', date: '2026-08-24' },
        { name: '硫酸年度长约', contract: 'HT123700012', amount: '300,000.00', date: '2026-08-24' },
        { name: '苏州客户销售合同', contract: 'HT145689', amount: '900,000.00', date: '2026-08-14' },
      ],
      totalLabel: '本月合计收款',
      totalValue: '¥9,053,871.00',
    },
    chains: {
      eyebrow: 'THREE CHAINS / 三大主线',
      title: '交易、物资与生产',
      cards: [
        {
          no: '01',
          icon: 'production',
          title: '生产链路 · 订单驱动到底',
          desc: '销售订单一确认，系统合并拼产、拆解 BOM、计算物料，全程无需手工转抄。',
          steps: ['销售订单', '合并拼产', 'BOM 拆解', '物料需求', '库存校验', '领料 / 采购', '投料生产', '成品入库', '发货出库'],
          tone: 'orange',
        },
        {
          no: '02',
          icon: 'material',
          title: '物资链路 · 采购到领料闭环',
          desc: '请购、比价、到货、质检、入库、领用逐环留痕，批次与供应商强绑定，质量可回溯。',
          steps: ['请购单', '比价定商', '到货登记', '来料质检', '入库上架', '领料出库', '调拨', '库存汇总'],
          tone: 'green',
        },
        {
          no: '03',
          icon: 'finance',
          title: '资金链路 · 合同到报表',
          desc: '合同台账、收付款登记、借款报销与报表自动汇总，收入支出与应收应付一目了然。',
          steps: ['销售 / 采购合同', '收付款登记', '借款报销', '对账核销', '资金流水', '合同报表', '资金类型表'],
          tone: 'plain',
        },
      ],
      flow: {
        label: 'FLOW / 订单驱动全流程',
        main: [
          { text: '销售订单', tone: 'orange', note: '合并多单同一成品' },
          { text: '生产计划（绑定成品 · BOM）', tone: 'green', note: 'BOM 多层展开' },
          { text: '物料需求清单（半成品 + 原料 + 包装）', tone: 'green' },
        ],
        decision: '判断库存可用量',
        branchLeft: {
          label: '库存不足',
          nodes: [
            { text: '生成采购单', note: '审批 · 到货' },
            { text: '来料质检' },
            { text: '物料入库' },
          ],
        },
        branchRight: {
          label: '库存充足',
          nodes: ['生成领料单', '按工序投产', '成品质检 · 入库', '发货出库'],
        },
      },
    },
    // 原型 P 界面实录：四块系统面板 DOM 重建（tour-*.webp 位图已删），演示数据照截图逐字转录
    tour: {
      eyebrow: 'PRODUCT TOUR / 界面实录',
      title: '界面展示',
      desc: '仓储、生产、质检、客户与运单——下面四屏照着系统实际界面重绘，字段、状态与操作路径与线上保持一致。',
      rows: [
        {
          label: '01 · 仓储',
          pairs: [
            { name: '当前库存', desc: '每种物料在库多少，成品与原料分色标注' },
            { name: '分批次库存统计', desc: '按批次统计，每一批次多少量一清二楚' },
            { name: '库存流水', desc: '盘入盘出逐笔留痕，谁动的、动了多少' },
          ],
          panel: {
            kind: 'warehouse',
            title: '仓库详情',
            badge: '启用',
            meta: ['仓库编号 001', '负责人 王淑娜', '建库 2025-12-29'],
            tabs: { active: '当前库存', idle: ['库存流水'] },
            action: '+ 盘入 / 盘出',
            headers: ['物料名称', '物料类型', '浓度/纯度', '计量单位', '库存数量'],
            rows: [
              { name: '石油原油', tag: '成品', tagTone: 'green', purity: '98%', unit: '千克', qty: '5' },
              { name: '36 号的物料', tag: '原料', tagTone: 'orange', purity: '036%', unit: '吨', qty: '110' },
              { name: '2-呋喃甲胺', tag: '成品', tagTone: 'green', purity: '39%', unit: '吨', qty: '90' },
              { name: '5-硝基-1,3-二甲苯', tag: '原料', tagTone: 'orange', purity: '35%', unit: '克', qty: '50' },
            ],
            footer: '共 20 条物料 · 分批次库存按批次展开查看',
          },
        },
        {
          label: '02 · 生产',
          flip: true,
          bullets: [
            '生产需求中心汇总待排订单，一键加入生产计划',
            '计划详情带 BOM 版本、生产批次、优先级与时间窗',
            '物料清单按损耗率折算投料量，来源标注自生产或外购',
          ],
          panel: {
            kind: 'production',
            title: '生产计划详情',
            badges: [
              { text: '已完成', tone: 'green' },
              { text: '审批通过', tone: 'blue' },
            ],
            chips: [
              { label: '计划产量', value: '27 吨' },
              { label: '计划开始 → 完成', value: '10-26 → 10-27' },
              { label: 'BOM 版本', value: '1016' },
              { label: '生产批次', value: '第二批次—27 个' },
            ],
            tabs: ['物料清单', '产出物清单', '进度'],
            headers: ['物料名称', '损耗率 %', '生产投料量', '来源'],
            rows: [
              { name: '水泥', loss: '10', amount: '2,940', source: '自生产', tone: 'orange' },
              { name: '熟料', loss: '3', amount: '1,200', source: '外购', tone: 'gray' },
              { name: '石膏', loss: '2', amount: '180', source: '自生产', tone: 'orange' },
            ],
            footer: '投料量按 BOM 与计划产量自动折算，损耗率可逐项覆盖',
          },
        },
        {
          label: '03 · 质量与安全',
          bullets: [
            '检测项模块化配置：检测项、指标描述、检测方法同屏维护',
            '安全检查可设频率，从早晚各一次到每季度按场景选',
            '检测过程有据可依，问题一步定位',
          ],
          panel: {
            kind: 'quality',
            title: '检测项设置',
            badge: '通用模板',
            meta: ['物料 2,3-二氨基萘', '纯度 444', '计量单位 千克'],
            headers: ['检测项', '指标描述', '检测方法'],
            rows: [
              { item: '外观无破损', desc: '表面无划痕', method: '目视检查' },
              { item: '纯度与杂质', desc: '≥ 99.5%，无可见杂质', method: '色谱分析' },
              { item: '包装密封', desc: '封口无破损、无渗漏', method: '抽检 10 袋' },
            ],
            freqLabel: '检查频率',
            freqs: [{ text: '不固定', active: true }, { text: '每天' }, { text: '每周' }, { text: '每季度' }],
          },
        },
        {
          label: '04 · 客户与供应商',
          flip: true,
          bullets: [
            '客户分三级，可根据不同等级的客户分类管理',
            '供应商同样分级，核心原料供应商优先锁量，备选供应商自动补位',
            '客户和供应商数据与其他表单联动，数据统一，报表自动统计',
          ],
          panel: {
            kind: 'customer',
            title: '客户管理',
            stat: '共 51 家 · 8 家重要',
            filters: [{ text: '全部', active: true }, { text: '重要客户' }, { text: '一般客户' }, { text: '潜在客户' }],
            headers: ['企业名称', '客户等级', '企业性质', '状态'],
            rows: [
              { name: '企业名称 12', level: '重要客户', levelTone: 'green', nature: '民企', status: '启用' },
              { name: '企业名称 6', level: '重要客户', levelTone: 'green', nature: '民企', status: '启用' },
              { name: '企业名称 8', level: '潜在客户', levelTone: 'orange', nature: '外企', status: '启用' },
              { name: '企业名称 7', level: '一般客户', levelTone: 'gray', nature: '合资', status: '启用' },
            ],
            footer: '客户与运单共用一套企业档案，报价单、运单可直接带出企业信息',
          },
        },
      ],
    },
    // 原型 P 报表中心：四张维度卡，标题/对勾跟卡 tone 走色（资金、采购是橙勾）
    report: {
      eyebrow: 'REPORT CENTER / 智慧报表',
      title: '报表中心：四个维度自动成表',
      desc: '同一套业务数据，按物资、资金、采购、生产四个维度自动生成报表，不需要财务与仓管各自导出 Excel 核对。',
      cards: [
        {
          icon: 'material',
          title: '物资',
          tone: 'green',
          items: ['入库报表', '出库报表', '库存流水表', '库存汇总表'],
        },
        {
          icon: 'finance',
          title: '资金',
          tone: 'orange',
          items: ['资金类型表', '资金流水表', '收款合同报表 · 付款合同报表', '项目收支表 · 供应商报表'],
        },
        {
          icon: 'purchase',
          title: '采购',
          tone: 'orange',
          items: ['采购申请表', '采购总量分析表', '物资价格表', '付款报表'],
        },
        {
          icon: 'production',
          title: '生产与销售',
          tone: 'green',
          items: ['销售订单明细表', '生产计划表 · 投入产出表', '质检报告汇总', '货运台账'],
        },
      ],
    },
  },
  // 物流调度页（原型 Logistics Hero + B 免费货源广场）。调度台卡与货源表格都是 DOM
  // 重建（用户传的 Dispatch Mock.png / Cargo Card.png 是烘焙文字参考图，已删）。
  // 表格行数据逐字照 Cargo Card.png 转录，含原型里同一电话出现两行的细节
  logistics: {
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
        columns: ['序号', '装卸地址', '类别', '车辆类型', '货物重量', '装货时间', '联系人', '联系电话'],
        rows: [
          { route: '北京市 → 内蒙古自治区', cls: '一类 1.1', truck: '敞篷车', weight: '13 吨', time: '09-29 12:00 → 17:59', contact: '小苏', phone: '13295240809' },
          { route: '安徽固镇县 → 福建漳州市', cls: '八类', truck: '无要求', weight: '15 吨', time: '随时装车', contact: '张师傅', phone: '18913275666' },
          { route: '定远县济东化工 → 上海市金山区', cls: '八类', truck: '无要求', weight: '17.6 吨', time: '随时装车', contact: '—', phone: '18913275666' },
          { route: '甘肃玉门 → 上海浦东', cls: '三类', truck: '无要求', weight: '25.6 吨', time: '随时装车', contact: '—', phone: '18112886910' },
          { route: '陕西富平 → 安徽铜陵', cls: '八类', truck: '无要求', weight: '32 吨', time: '随时装车', contact: '—', phone: '18112886910' },
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
                { orderNo: 'WYD20261201006143', from: '苏州市', to: '洛阳市', cls: '三类1', weight: '5 吨', frac: '1/1' },
                { orderNo: 'WYD20261202006187', from: '苏州市', to: '合肥市', cls: '三类', weight: '6 吨', frac: '1/1' },
                null,
                null,
                null,
                { orderNo: 'WYD20261206063512', from: '长沙市', to: '咸宁市', cls: '六类6.1', weight: '5 吨', frac: '1/1' },
                null,
              ],
            },
            {
              plate: '苏AF6K27',
              weight: '32 吨',
              scope: '一类1',
              cells: [
                { orderNo: 'WYD20261201006201', from: '苏州市', to: '洛阳市', cls: '三类1', weight: '5 吨', frac: '1/1' },
                null,
                null,
                null,
                { orderNo: 'WYD20261205063408', from: '苏州市', to: '长沙市', cls: '一类4、三类4', weight: '6 吨', frac: '1/1' },
                null,
                null,
              ],
            },
            {
              plate: '苏B38516',
              weight: '50 吨',
              scope: '一类1.1、二类2',
              cells: [
                { orderNo: 'WYD20261201006266', from: '苏州市', to: '宿州市', cls: '三类', weight: '5 吨', frac: '1/1' },
                null,
                { orderNo: 'WYD20261203063357', from: '苏州市', to: '合肥市', cls: '三类', weight: '6 吨', frac: '1/1' },
                null,
                null,
                null,
                { orderNo: 'WYD20261207063690', from: '宜宾市', to: '合肥市', cls: '六类6.1', weight: '5 吨', frac: '1/1' },
              ],
            },
            {
              plate: '皖KD58273',
              weight: '32 吨',
              scope: '一类1.2、二类2',
              active: true,
              cells: [
                { orderNo: 'WYD20261201006298', from: '苏州市', to: '合肥市', cls: '三类', weight: '6 吨', frac: '1/1' },
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
          cards: [{ plate: '苏AD8926', city: '苏州市', weight: '32 吨', phone: '138****6271', scope: '四类4.1' }],
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
  },
  // 司机作业页五屏（原型 Driver Hero + B 平台优势 + D 接单作业四步 + E 核心界面一览 + F 司机招募）。
  // 文案逐字照原型转录；主色是品牌橙，手机演示与浮动徽标整屏 DOM 重建（Chip/Phone Mock 位图已删）
  driver: {
    ctaLabel: '下载司机端',
    hero: {
      pills: ['货源信息免费', '危化合规提示', '回程也能接单'],
      phone: {
        statusLeft: '9:41',
        statusRight: '危化运输 · 司机端',
        title: '附近货源',
        orders: [
          { from: '苏州', to: '北京', price: '¥ 8,600', meta: '液碱 32t · 罐车 · 明日装货', tone: 'orange' },
          { from: '无锡', to: '济南', price: '¥ 6,200', meta: '甲醇 28t · 厢车 · 今日装货', tone: 'green' },
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
  },
  // 原型 CTA Card：文案逐字照原型。注意电话是原型上的 400-828-1988，
  // 与 contact.phone（400-001-8355）不一致，用哪个等用户拍板
  cta: {
    title: '约一次演示，用你的单据跑一遍',
    desc: '演示会基于你所在行业的 BOM 结构和实际运输场景，从接单、排产、出入库到发运、回单逐环节走一遍，约 40 分钟。',
    button: '预约产品演示',
    phoneNote: '或致电 400-828-1988（工作日 9:00-18:00）',
  },
  footer: {
    desc: ['化工生产 + 危化运输一体化平台，全链路数字化、全流程规范化、全方位安全化。'],
    slogan: ['市场为源', '客户为心', '应用而创', '携手同行'],
    linkGroups: [
      {
        title: '产品',
        items: [
          { label: '威易达化工', to: '/products/chemical' },
          { label: '威易达物流', to: '/products/logistics' },
          { label: '威易达司机', to: '/products/driver' },
          // 报表看板尚无独立页面，先指向平台架构（数据能力所在）；后续补页时改这里
          { label: '报表与数据看板', to: '/platform' },
        ],
      },
      {
        title: '解决方案',
        items: [
          { label: '化工生产管理', to: '/products/chemical' },
          { label: '危化运输调度', to: '/products/logistics' },
          { label: '合规与全程追溯', to: '/solutions' },
          { label: '平台架构', to: '/platform' },
        ],
      },
      {
        title: '关于威易达',
        items: [
          { label: '公司介绍', to: '/about' },
          { label: '实施与服务', to: '/about' },
          // 设计稿为「联系我们」，站内暂无联系页，直接拨号更实用
          { label: '联系我们', to: 'tel:4000018355' },
        ],
      },
    ],
    copyright: '2026 苏州羿瑞成信息科技有限公司　版权所有',
    tagline: '威易达化工 · 化工生产与危化运输一体化平台',
  },
}

/**
 * 按路由路径取页面首屏配置
 *
 * 各 View 用它拿文案，写错路径会在开发时立刻抛错，而不是渲染出一片空白。
 */
export function getPage(to: string): PageIntro {
  const page = siteConfig.pages.find((item) => item.to === to)
  if (!page) {
    throw new Error(`config/site.ts 中缺少路径为 ${to} 的页面配置`)
  }
  return page
}
