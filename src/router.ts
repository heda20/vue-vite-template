/*
 * @Description:
 * @version: 0.0.1
 * @Company: Puredo
 * @Author: dada
 * @Date: 2021-11-05 10:42:38
 * @LastEditors: dada
 * @LastEditTime: 2021-11-05 14:33:52
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const history = createWebHistory() // 如需hash替换成createWebHashHistory
//路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: (): Promise<typeof import('*.vue')> => import('@/pages/login/index.vue'),
    meta: { title: '登录', keepAlive: true }
  }
]

const router = createRouter({
  history,
  scrollBehavior: () => ({ top: 0 }),
  routes
})

export default router
