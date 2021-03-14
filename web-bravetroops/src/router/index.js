import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/register',
      name: 'Register',
      component: resolve => require(['@/components/Register'], resolve),},
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/components/index'], resolve),
      children:[
        {
          path: '/index/main',
          name: 'main',
          component: resolve => require(['@/components/main'], resolve),
          children:[
            {
              path: '/index/main/articlelist',
              name: 'articlelist',
              component: resolve => require(['@/components/articlelist'], resolve),
            },
            {
              path: '/index/main/ledger',
              name: 'ledger',
              component: resolve => require(['@/components/ledger'], resolve),
            },
            {
              path: '/index/main/mining',
              name: 'mining',
              component: resolve => require(['@/components/mining'], resolve),
            }
          ],redirect:{name:'articlelist'}
        },
        {
          path: '/index/about',
          name: 'About',
          component: resolve => require(['@/components/About'], resolve),
        }
      ],redirect:{name:'main'}
    },{
      path: '/content',
      name: 'content',
      component: resolve => require(['@/components/content'], resolve),
    },
    {
      path: '/pow',
      name: 'pow',
      component: resolve => require(['@/components/pow'], resolve),
    }
  ]
})
export default router;
