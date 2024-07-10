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
            path:'caseManagement',
            component:() => import("@/pages/prescribe/index.vue")
        },
        // {
        //     path:'detail',
        //     component:() => import("@/pages/hospital/detail/index.vue")
        // },
        // {
        //     path:'notice',
        //     component:() => import("@/pages/hospital/notice/index.vue")
        // },
        // {
        //     path:'close',
        //     component:() => import("@/pages/hospital/close/index.vue")
        // },
        // {
        //     path:'search',
        //     component:() => import("@/pages/hospital/search/index.vue")
        // }
    ]

    },
    {
      path: '/',
      redirect: '/management'
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
