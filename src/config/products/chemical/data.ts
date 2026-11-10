/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 化工生产页内容数据
 */

import type { ChemicalConfig } from './types'

export const chemical: ChemicalConfig = {
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
      {
        name: '液碱框架采购合同',
        contract: 'HT123698877',
        amount: '10,000.00',
        date: '2026-08-24',
      },
      { name: '硫酸年度长约', contract: 'HT123700012', amount: '300,000.00', date: '2026-08-24' },
      {
        name: '苏州客户销售合同',
        contract: 'HT145689',
        amount: '900,000.00',
        date: '2026-08-14',
      },
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
        steps: [
          '销售订单',
          '合并拼产',
          'BOM 拆解',
          '物料需求',
          '库存校验',
          '领料 / 采购',
          '投料生产',
          '成品入库',
          '发货出库',
        ],
        tone: 'orange',
      },
      {
        no: '02',
        icon: 'material',
        title: '物资链路 · 采购到领料闭环',
        desc: '请购、比价、到货、质检、入库、领用逐环留痕，批次与供应商强绑定，质量可回溯。',
        steps: [
          '请购单',
          '比价定商',
          '到货登记',
          '来料质检',
          '入库上架',
          '领料出库',
          '调拨',
          '库存汇总',
        ],
        tone: 'green',
      },
      {
        no: '03',
        icon: 'finance',
        title: '资金链路 · 合同到报表',
        desc: '合同台账、收付款登记、借款报销与报表自动汇总，收入支出与应收应付一目了然。',
        steps: [
          '销售 / 采购合同',
          '收付款登记',
          '借款报销',
          '对账核销',
          '资金流水',
          '合同报表',
          '资金类型表',
        ],
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
            {
              name: '石油原油',
              tag: '成品',
              tagTone: 'green',
              purity: '98%',
              unit: '千克',
              qty: '5',
            },
            {
              name: '36 号的物料',
              tag: '原料',
              tagTone: 'orange',
              purity: '036%',
              unit: '吨',
              qty: '110',
            },
            {
              name: '2-呋喃甲胺',
              tag: '成品',
              tagTone: 'green',
              purity: '39%',
              unit: '吨',
              qty: '90',
            },
            {
              name: '5-硝基-1,3-二甲苯',
              tag: '原料',
              tagTone: 'orange',
              purity: '35%',
              unit: '克',
              qty: '50',
            },
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
          freqs: [
            { text: '不固定', active: true },
            { text: '每天' },
            { text: '每周' },
            { text: '每季度' },
          ],
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
          filters: [
            { text: '全部', active: true },
            { text: '重要客户' },
            { text: '一般客户' },
            { text: '潜在客户' },
          ],
          headers: ['企业名称', '客户等级', '企业性质', '状态'],
          rows: [
            {
              name: '企业名称 12',
              level: '重要客户',
              levelTone: 'green',
              nature: '民企',
              status: '启用',
            },
            {
              name: '企业名称 6',
              level: '重要客户',
              levelTone: 'green',
              nature: '民企',
              status: '启用',
            },
            {
              name: '企业名称 8',
              level: '潜在客户',
              levelTone: 'orange',
              nature: '外企',
              status: '启用',
            },
            {
              name: '企业名称 7',
              level: '一般客户',
              levelTone: 'gray',
              nature: '合资',
              status: '启用',
            },
          ],
          footer: '客户与运单共用一套企业档案，报价单、运单可直接带出企业信息',
        },
      },
    ],
  },

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
        items: [
          '资金类型表',
          '资金流水表',
          '收款合同报表 · 付款合同报表',
          '项目收支表 · 供应商报表',
        ],
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
}
