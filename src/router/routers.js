import ShowBlogs from '../components/ShowBlogs.vue'
import AddBlog from '../components/AddBlog.vue'
import SingleBlog from '../components/SingleBlog.vue'
import Login from '../components/Login.vue'
import Test from '../components/Test.vue'
import Music from '../components/Music.vue'
import SingerSong from '../components/SingerSong.vue'
import TimeL from '../components/TimeL.vue'
import Tqh from '../components/Tqh.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import SetUp from '../components/SetUp.vue'
import Log from '../components/Log.vue'
import TemporarilyRun from '../components/TemporarilyRun.vue'

import VueRouter from 'vue-router'
const routes = [
    {path:"/",name:'login',component:Login},
    {path:"/index",name:'index',component:ShowBlogs,meta:{requireAuth:true}},
    {path:"/add",name:'add',component:AddBlog,meta:{requireAuth:true}},
    {path:"/blog/singleblog/:id",name:'singleblog',component:SingleBlog,meta:{requireAuth:true}},
    {path:"/test",name:'test',component:Test},
    {path:'/music',name:'music',component:Music,meta:{requireAuth:true}},
    {path:'/singerSong/:name',name:'SingerSong',component:SingerSong,meta:{requireAuth:true}},
    {path:'/TimeL',name:'TimeL',component:TimeL,meta:{requireAuth:true}},
    {path:'/Tqh',name:'Tqh',component:Tqh},
    {path:'/MusicPlayer',name:'MusicPlayer',component:MusicPlayer,meta:{requireAuth:true}},
    {path:'/setUp',name:'setUp',component:SetUp,meta:{requireAuth:true}},
    {path:'/log',name:'log',component:Log,meta:{requireAuth:true}},
    {path:'/TemporarilyRun',name:'temporarilyRun',component:TemporarilyRun,meta:{requireAuth:true}}
    
]
const router = new VueRouter({
  routes:routes,
  mode:"history"   //去掉#
})

router.beforeEach((to, from, next) => {
    var _this = this;
    var current_fullPath = to.fullPath;

    // if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    //以前一直进入114的else是因为，把index赋值给路由，然后就去判断108，又是index（加上meta.requirAuth）所以就进入115的else，进入递归
    if(to.meta.requireAuth && _this.requireAuthNum==1){

       if(JSON.parse(localStorage.getItem("login"))==null){
          console.log('没有登录')
         next({
            path: '/',
            query: {redirect: to.fullPath}   //登录成功后重定向到当前页面
          });
          // _this.$router.push({path: '/',query: {redirect: to.fullPath}})
          // next()
       } else {
          _this.requireAuthNum++;
          next({
            path: to.fullPath
          });
          // _this.$router.push({path: to.fullPath})
          // next()
        }
    }
    else {
      _this.requireAuthNum = 1;
      next();
    }



// console.log(current_fullPath)
      //如果本地 存在 token 则 不允许直接跳转到 登录页面
  if(to.fullPath === "/"){
    if(JSON.parse(localStorage.getItem("login"))!=null){
     
      next({
            path: '/',
            query: {redirect: current_fullPath}   //登录成功后重定向到当前页面
          });
      // next({
      //   path:'/index'
      // });
    }else {
      next();
    }
  }


});
export default router;



// vue实现某些页面需要登陆才能访问
// https://www.jianshu.com/p/2146341f75c6
// https://blog.csdn.net/Mote123/article/details/92635850