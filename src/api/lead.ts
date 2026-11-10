/**
 * @Name: 预约演示表单提交
 * 现在没有真实接口：配置 VITE_LEAD_ENDPOINT 后自动 POST 过去，没配就本地模拟成功。
 * 后续接 CRM / 企微机器人，只改这里，弹层不用动。
 */

export interface LeadPayload {
  /** 联系人姓名 */
  name: string
  /** 公司名称，可不填 */
  company: string
  /** 所在地区，可不填 */
  region: string
  /** 手机号，已通过前端校验 */
  phone: string
  /** 关注的产品线，没选是空串 */
  interest: string
  /** 需求备注，可不填 */
  note: string
}

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT as string | undefined

export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!ENDPOINT) {
    // 占位实现：留一条 console 方便对字段，600ms 模拟网络耗时
    console.info('[lead] 未配置 VITE_LEAD_ENDPOINT，本地模拟提交：', payload)
    await new Promise((resolve) => setTimeout(resolve, 600))
    return
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error(`提交失败（${res.status}）`)
  }
}
