/*
 * @Description:
 * @version: 0.0.1
 * @Company: Puredo
 * @Author: dada
 * @Date: 2021-11-05 14:05:37
 * @LastEditors: dada
 * @LastEditTime: 2021-11-05 14:05:37
 */
/*
 * @Description:
 * @version: 0.0.1
 * @Company: Puredo
 * @Author: dada
 * @Date: 2021-11-05 10:41:18
 * @LastEditors: dada
 * @LastEditTime: 2021-11-05 14:04:48
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface ImportMetaEnv {
  VITE_APP_BASE_API: string
}
