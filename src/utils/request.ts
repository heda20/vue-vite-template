import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { Toast } from 'vant'

const codeMessage: Record<number, string> = {
  400: '请求错误',
  401: '用户没有权限。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求是不存在的记录',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除',
  422: '验证错误',
  500: '服务器发生错误',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}
const pending = new Map()

/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig): void => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel)
      }
    })
}

/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig): void => {
  const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&')
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = (): void => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // proxy 需要注释
  // withCredentials: true,
  timeout: 12000
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    // config
    return config
  },
  (error: AxiosError) => {
    return Promise.resolve(error || '服务器异常')
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response) // 如果存在就移除未的到响应的请求
    const { status, message } = response.data
    if (status !== 200) {
      return Promise.reject(new Error(message || 'Error'))
    }

    return response.data
  },
  (error: AxiosError) => {
    const { response } = error
    if (response && response.status) {
      const { status, statusText } = response
      const errorText = codeMessage[status] || statusText
      Toast(errorText)
    } else if (!response) {
      Toast('您的网络发生异常，无法连接服务器')
    }
    return Promise.reject(error)
  }
)

export default service
