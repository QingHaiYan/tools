import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import ObjectDetail from '@/components/ObjectDetail'
import FeedBack from '@/components/FeedBack'
// import PublicFather from '@/components/PublicFather'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      // children: [
      //   {
      //     // 当 /user/:id/profile 匹配成功，
      //     // UserProfile 会被渲染在 User 的 <router-view> 中
      //     path: 'Index',
      //     component: Index
      //   }
      // ]  
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/ObjectDetail/:num',
      name: 'ObjectDetail',
      component: ObjectDetail
    },
    {
      path: '/FeedBack',
      name: 'FeedBack',
      component: FeedBack
    },
    // {
    //     path: '/PublicFather',
    //     name: 'PublicFather',
    //     component: PublicFather

    // }
   
  ]
})
