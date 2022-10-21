import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/stage1"
    },
    {
      path: '/stage1',
      name: 'stage1',
      component: () => import('../views/stage1/index.vue')
    }
  ]
})

export default router
