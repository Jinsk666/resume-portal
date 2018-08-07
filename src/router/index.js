import Vue from 'vue'
import Router from 'vue-router'
import Defaults from '@/page/defaults'
import Unfind from '@/page/404'
import Home from '@/page/home'
//import TreeMore from '@/page/tree-more'

Vue.use(Router)

export default new Router({
  routes: [
    // 默认选择主题页面
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { require: true }
    },
    // 404
    {
      path: '/404',
      name: '404',
      component: Unfind
    },
    // 默认主题
    {
      path: '/defaults',
      name: 'defaults',
      component: Defaults
    },
    // {
    //   path: '/tree/more',
    //   name: 'treeMore',
    //   component: TreeMore
    // }
  ]
})
