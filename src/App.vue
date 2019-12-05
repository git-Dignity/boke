<template>
  <div id="app">
      
      <transition :name="transitionName">
        <router-view class="child-view" :key="key"></router-view>
      </transition>

      <div>
        <MusicPlayer></MusicPlayer>
      </div>
      
  </div>
</template>

<script>
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import BlogHeader from './components/BlogHeader'
import Login from './components/Login'
import BlogFooter from './components/BlogFooter'
import Test from './components/Test'
import Music from './components/Music'
import VueAudio from './components/VueAudio'
import TimeL from './components/TimeL'
import Tqh from './components/Tqh'
import SingerSong from './components/SingerSong'
import MusicPlayer from './components/MusicPlayer'
import TemporarilyRun from './components/TemporarilyRun'


    
export default {
  name: 'App',
    data(){
        return{
            transitionName: 'slide-left',
            // isPageColse:false,   //判断页面是否关闭
            // isPageReloaded:false,   // 判断页面是否刷新
        }
    },
   created(){


   },
    computed: {
        key() {
//            console.log(this.$route)
            return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
        }
     },
    //在当前路由改变，但是该组件被复用时调用
    //对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
    // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    beforeRouteUpdate (to, from, next) {

      let isBack = this.$router.isBack
//      console.log(isBack);
      if (isBack) {
        this.transitionName = 'slide-right';
        console.log(this.$route.name)
      } else {
        this.transitionName = 'slide-left';
        console.log(this.$route.name)
      }
      console.log(this.$route.name)
      this.$router.isBack = false
      next()
    },
     watch:{
      '$route.path':function(newVal,oldVal){
        // console.log(newVal+"---"+oldVal);
        // console.log(this.$route.name)
        // 登录的时候，路由没有发生变化，所以除了登录之外的每一个操作都存在数据库
        this.$axios.post('https://zhengzemin.cn/log',{
            loginTime:this.GLOBAL.getNowTime(),
            userAgent:navigator.userAgent,
            username:JSON.parse(localStorage.getItem("login")).username,
            oldOperation:oldVal,
            operation:newVal
        }).then(data =>{
          // console.log(data);
        })
      
      }

 },
  components:{
    Login,
    AddBlog,
    ShowBlogs,
    BlogHeader,
    BlogFooter,
    Test,
    Music,
    VueAudio,
    TimeL,
    SingerSong,
    MusicPlayer,
    TemporarilyRun
  }
}
</script>

<style lang="scss">  
    
*{
  margin:0;
  padding: 0;
}
p{
    font-size:$input-FontSize;   
}
h1,h2{
       @include fontFamily(cursive)
}
a{
  text-decoration:none;
}
a:hover{
   text-decoration:none;    
}
a:active{
   text-decoration:none;        
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    background: #ffffff;
}
ul li{
  list-style: none; 
}
    
/* 路由动画 */
.child-view {
    position: absolute;
    width:100%;
    transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
}
.el-textarea__inner{
  text-align:center!important;
  background: rgba(248, 248, 255, 0.3)!important;
  border:none!important;
}

.el-message-box{
  width:auto;
}
    
</style>



//关闭本网站，推送消息（bark应用）告诉我
// JS判断页面是否刷新：https://blog.csdn.net/banban008/article/details/82380255
// js监测关闭当前页面、关闭浏览器和取消监测：https://blog.csdn.net/qq_33008701/article/details/63254135