/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.09
 * @Name: 预约演示表单提交
 * 走 erp-h5-producer 那套网关前缀，头里带 appType: 10 标识官网来源；这个接口不要 token。
 */

/** 弹层里收集到的内容，字段名按页面语义写，提交前再映射成后端字段 */
export interface LeadPayload {
  /** 联系人姓名 */
  name: string
  /** 公司名称，选填 */
  company: string
  /** 所在地区，选填 */
  region: string
  /** 手机号，已通过前端校验 */
  phone: string
  /** 需求备注，选填 */
  note: string
}

// 网关前缀照 erp-h5-producer：/producer/api 由 nginx 转到后端服务，后面接接口自己的路径；
// 要临时换环境（比如预发）用 VITE_LEAD_ENDPOINT 覆盖
const ENDPOINT =
  (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) ??
  '/producer/api/official/lead/leadIntent/create'

// 后端要的是 companyName / remark，跟表单字段不一样，这里映射一次；
// productTypes（1 化工 2 物流 3 司机）官网不采集，不传
export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(ENDPOINT, {
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
      remark: payload.note,
    }),
  })

  // 后端约定 code 200 才算成功，其余把 msg 透出去给弹层显示
  const json = (await res.json().catch(() => null)) as { code?: number; msg?: string } | null
  if (!res.ok || json?.code !== 200) {
    throw new Error(json?.msg || `提交失败（${res.status}）`)
  }
}
