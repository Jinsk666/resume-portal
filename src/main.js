// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/config/rem'
import '@/assets/style/common.scss'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/element-ui.scss'
import '@/assets/style/element-variables.scss'

import FastClick from 'fastclick'
import fetch from '@/config/fetch'

import '@/icons' // icon

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(elementUi);
Vue.config.productionTip = false

// 路由拦截  判断进入哪个主题
router.beforeEach((to, from, next) => {
    if(to.meta.require) {
        next({name: 'defaults', query:{'resumeCode': to.query.resumeCode}});
        // 请求接口
        // fetch('/getTemplateUrl/' + to.query.resumeCode,{}).then( (data) => {
        //     if( data.code != '0000' ) {
        //         this.loading.close();
        //         next({path: '/404'});
        //     }
        //     let route = data.data;
        //     next({name: 'defaults', query:{'resumeCode': to.query.resumeCode, 'templateCode': to.query.templateCode}});

        // }).catch( (error) => {
        //     console.log(error);
        //     this.loading.close();
        //     next({path: '/404'});
        // })
    }else {
        next();
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
