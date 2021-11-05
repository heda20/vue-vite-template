/*
 * @Description:
 * @version: 0.0.1
 * @Company: Puredo
 * @Author: dada
 * @Date: 2021-11-05 11:22:31
 * @LastEditors: dada
 * @LastEditTime: 2021-11-05 11:24:16
 */
import request from '../utils/request'
export interface HttpResponse {
  status: number
  success?: boolean
  traceId?: string
  data: any
}
interface dataType {
  status: number
  success?: boolean
  traceId?: string
  data: any
}
export const getData = async (params: dataType): Promise<HttpResponse> => {
  return request('api/yyyy', {
    method: 'post',
    data: params
  })
}
