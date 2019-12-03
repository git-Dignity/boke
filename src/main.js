// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './router/routers'
import axios from 'axios'
import qs from 'qs'
import Vuex from 'vuex'
import store from './store/index'
Vue.prototype.$axios = axios   
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
import BootstrapVue from 'bootstrap-vue'
    
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import Vconsole from 'vconsole';


//引用全局变量
import global_ from './components/tool/Global'
Vue.prototype.GLOBAL = global_

//使用阿里巴巴图标库
import './assets/iconfont/iconfont.css'



Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(ElementUI)
// 图片预览
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

//自定义指令
// Vue.directive('rainbow',{
//   bind(el,binding,vnode){
//     el.style.color = "#" + Math.random().toString(16).slice(2,8);
//   }
// })

Vue.directive('theme',{
  bind(el,binding,vnode){
    if(binding.value == 'wide'){
      el.style.maxWidth = '1260px';
    }else if(binding.value == 'narrow'){
      el.style.maxWidth = "560px";
    }

    if(binding.arg == 'column'){
      el.style.background = "rgba(33, 150, 243,0.9)";
      el.style.padding = '20px'
    }
  }
})

       


//自定义过滤器  全局
// Vue.filter("to-uppercase",function(value){
//   return value.toUpperCase();
// })

Vue.filter("snippet",function(value){
  if(value!= undefined){
    return value.slice(0,25) + "..."
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  data(){
    return{
      requireAuthNum:1
    
    }
  },
  router:Routes,
  store,
  components: { App },
  template: '<App/>',
  created(){
    // 正常访问网站时不会加载这个工具，仅当在网址后面加上 ?vconsole=true 时才会载入,按需开启
    if ((location.href || '').indexOf('vconsole=true') > -1) {
        new Vconsole();
    }
 

  }
})


// vue实现某些页面需要登陆才能访问
// https://www.jianshu.com/p/2146341f75c6
// https://blog.csdn.net/Mote123/article/details/92635850

//移动端调试vConsole:https://mkblog.cn/1852/comment-page-1/