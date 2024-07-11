import { createRouter, createWebHistory } from 'vue-router'

// 配置路由
export default createRouter({
  // 路由模式设置
  history: createWebHistory(),
  routes: [
    {
      path: '/management',
      component: () => import('@/pages/index.vue'),
      children:[
        {
            path:'prescribe',
            component:() => import("@/pages/prescribe/index.vue")
        },
        {
            path:'caseManagement',
            component:() => import("@/pages/caseManagement/index.vue")
        },
        {
            path:'addPrescription',
            component:() => import("@/pages/addPrescription/index.vue")
          },
        {
            path:'prescribeManagement',
            component:() => import("@/pages/prescribeManagement/index.vue")
        }
    ]

    },
    {
      path: '/',
      redirect: '/management/prescribe'
    }
  ],
  // 滚动行为:控制滚动条的位置
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
