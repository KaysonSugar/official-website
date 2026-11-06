/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.06
 * @Name: 关于我们页内容数据
 */

/**
 * 关于我们页（/about）：简介、企业理念、公司使命；首屏文案在 brand/data.ts 的 pages 里。
 * 字段形状在 ./types.ts；组装出口在 site.ts，组件统一从 '@/config/site' 拿数据，不要直接引本文件。
 */

import type { AboutConfig } from './types'

// 关于我们页（原型 About Hero + S1~S3）。首屏文案在 pages 的 /about 条目里，
// 简介与使命同构（眉题+标题+段落）共用一个组件；段落逐字照原型，含原型原有的标点缺失。
export const about: AboutConfig = {
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
}
