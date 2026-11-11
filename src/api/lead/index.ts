/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 预约演示表单提交
 * 走 erp-h5-producer 那套网关前缀，头里带 appType: 10 标识官网来源；这个接口不要 token。
 */

import type { LeadPayload, LeadResponse } from './types'

export type { LeadPayload, LeadResponse } from './types'

/** 产品线枚举，跟后端 productTypes 约定一致 */
const PRODUCT_TYPE = { chemical: 1, logistics: 2, driver: 3 } as const

/** 三条线全选：非产品页打开弹窗时的默认值，等价于以前的「整体方案」 */
export const ALL_PRODUCT_TYPES: number[] = [
  PRODUCT_TYPE.chemical,
  PRODUCT_TYPE.logistics,
  PRODUCT_TYPE.driver,
]

// 产品页来的线索默认带上自己那条线；没命中的页面（首页、服务支持、关于我们）算整体方案
const PRODUCT_TYPES_BY_ROUTE: Record<string, number[]> = {
  '/products/chemical': [PRODUCT_TYPE.chemical],
  '/products/logistics': [PRODUCT_TYPE.logistics],
  '/products/driver': [PRODUCT_TYPE.driver],
}

/** 按当前路由取 productTypes，产品页给对应枚举，其余给全选 */
export const productTypesForRoute = (path: string): number[] =>
  PRODUCT_TYPES_BY_ROUTE[path] ?? ALL_PRODUCT_TYPES

// 网关前缀照 erp-h5-producer：/producer/api 由 nginx 转到后端服务，后面接接口自己的路径；
// 要临时换环境（比如预发）用 VITE_LEAD_ENDPOINT 覆盖
const ENDPOINT =
  (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) ??
  '/producer/api/official/lead/leadIntent/create'

// 兜底一：10 秒超时，后端挂了不让用户对着提交中无限等
const TIMEOUT_MS = 10_000

/** 网络层失败（断网、代理没起、超时），弹层换成配置里的中文提示 */
export class LeadNetworkError extends Error {}

/** 后端明确拒绝（code != 200），message 是后端 msg，可能为空 */
export class LeadApiError extends Error {}

/** 后端要的是 companyName / remark，跟表单字段不一样，这里映射一次 */
export async function submitLead(payload: LeadPayload, productTypes: number[]): Promise<void> {
  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        appType: '10',
      },
      body: JSON.stringify({
        name: payload.name,
        companyName: payload.company,
        region: payload.region,
        phone: payload.phone,
        productTypes,
        remark: payload.note,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
  } catch {
    // fetch 只要在传输层断掉都算网络错误（含超时 abort），别把英文原话甩给用户
    throw new LeadNetworkError('network')
  }

  // 兜底二：响应体不是合法 JSON（网关回了 HTML 错误页之类）也吞掉，走统一失败分支
  const json = (await res.json().catch(() => null)) as LeadResponse | null
  if (!res.ok || json?.code !== 200) {
    // 兜底三：后端没给 msg 就传空串，展示文案的兜底留给弹层配置
    throw new LeadApiError(json?.msg || '')
  }
}
