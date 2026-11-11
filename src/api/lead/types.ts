/**
 * @Author: takaixin
 * @Email: takaixin@outlook.com
 * @StartDate: 2026.11.11
 * @Name: 预约线索接口类型
 */

/** 弹层收集的内容，字段按页面语义；company / region / note 选填 */
export interface LeadPayload {
  name: string
  company: string
  region: string
  phone: string
  note: string
}

/** 后端统一响应壳：code 200 才算成功，msg 是给用户看的错误文案 */
export interface LeadResponse {
  code?: number
  msg?: string
  data?: { id?: number }
}
