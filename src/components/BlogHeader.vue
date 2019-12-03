<template>
  <nav>
      <ul>
          <li>
              <!-- exact就是我点击哪个就显示哪个  样式的 -->
              <router-link to = "/index" exact>博客</router-link>
              
              <router-link to = "/add" exact >写博客</router-link>
              
              <router-link to = "/music" exact>天歌</router-link>

              <router-link to = "/setUp" exact>设置</router-link>
          </li>

         <div class="icon-temporarily-run">
           <TemporarilyRun></TemporarilyRun>
        </div>

      </ul>
  </nav>
</template>

<script>
    import jquery from '../../static/jquery-1.9.1.min'
    import TemporarilyRun from './TemporarilyRun.vue'

    
    export default{
        name : 'blog-header',
        components:{
           TemporarilyRun
        },
        data(){
            return{
            }
        },
    
    }
</script>

<style scoped>
ul{
    list-style-type: none;
    text-align: center;
    margin:0;
}
li{
    display: inline-block;
    margin:0 10px;
}
a{
    color:#fff;
    padding:12px;
    border-radius: 5px;
}
a:hover{
    text-decoration: none;   
    color:#444;
}
a:active{
    color:#444;   
    text-decoration: none;   
}
nav{
    background: rgba(255, 64, 129,1);
    padding:30px 0;
    margin-bottom: 40px;
    box-shadow: 0px 10px 9px rgba(165,50,73,0.3);
}
.router-link-active{
    background: rgba(255,255,255,0.8);
    color:#444;
    text-decoration: none;
}

.icon-temporarily-run{
  position: fixed;
  right: 2%;
  bottom: 8%;
  z-index: 101;
  color:#ee18c4;
}
</style>
