<template>
  <footer>
     
              Copyright Min © 2019 · 粤ICP备19034667号 ·<br />
      
      <router-link to = "/TimeL" exact>我爱你</router-link>
      <router-link to = "/Tqh" exact>
        <span>~</span>
      </router-link>
         
  </footer>
</template>

<script>
//import footDH from '../../static/footDH' 
export default{
    name : 'blog-footer',
    methods:{
    }
}
</script>

<style scoped>
footer{
    color: #9e9ea6;
    margin:2% 0;   
}
a{
    color: #9e9ea6;
    text-decoration: none;
}
a:active{
    color: #9e9ea6;
    text-decoration: none;   
}
a:hover{
    color: #9e9ea6;
    text-decoration: none;   
}

span {
  color: #595959;
  position: relative;
  z-index: 1;
}

span::before,
span::after {
  content: "";
  z-index: -1;
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: #262626;
  transform: scaleX(0);
  transition: transform 0.2s ease-in-out;
}

span::before {
  top: 0;
  transform-origin: center right;
}

span::after {
  bottom: 0;
  transform-origin: center left;
}

span:hover {
  cursor: pointer;
}

span:hover::before {
  transform-origin: center left;
  transform: scaleX(1);
}

span:hover::after {
  transform-origin: center right;
  transform: scaleX(1);
}
   
</style>


// https://xin-tan.com/passages/2019-07-16-font-animation/#%E5%88%92%E7%BA%BF%E5%8A%A8%E6%80%81