import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: "/stage2"
    },
    {
      path: '/stage1',
      name: 'stage1',
      component: () => import('../views/stage1/index.vue')
    },
    {
      path: '/stage2',
      name: 'stage2',
      component: () => import('../views/stage2/index.vue')
    }
  ]
})

export default router
