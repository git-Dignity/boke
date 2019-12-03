<template>
    <div>

      <div class="el-icon-s-opportunity" v-on:click="audioshow = !audioshow"></div>
        <transition name="fade" >
          <div id="test-audio">
            <div v-for="(item, index) in item" :key="index" v-show="audioshow" class="vueAudio">
              <VueAudio :theUrl="item.url" :theControlList="item.controlList" :theUploader="item.uploader" :theUploadTime = "item.uploadTime" @musicClose="closeMusic"  />
            </div>
          </div>
        </transition>
    </div>
</template>
<script>
  import VueAudio from './VueAudio.vue' 

    export default {
      name : 'music-player', 
    data () {
      return {
          item:[{
                url:"https://zhengzemin.cn/nodeJs/audio/说好不哭-周杰伦.m4a",
                controlList:"onlyOnePlaying",
                uploader:"周杰伦",
                uploadTime:"2019/05/20"
              }],
          audioshow:false
         



      }
    },
    computed:{
      musicPage(){
        return this.$store.state.musicPage
      }
      
    },
    components:{
        VueAudio
    },
    created(){
      // console.log(this.audioshow)
    },
    methods:{
        closeMusic(data){
          if(data === "0"){
            this.audioshow = !this.audioshow;
          }
          // console.log(data);
        }
    },

     watch:{

       musicPage(n,o){
      
        // console.log(n)
        // console.log(o)
        // this.item.url = n.url;
        // this.item.controlList = n.controlList;
        // this.item.uploader = n.uploader;
        // this.item.uploadTime = n.uploadTime;
        // this.$set(this.item, 'url', n.url);
        // this.$set(this.item, 'controlList', n.controlList);
        // this.$set(this.item, 'uploader', 'zzzz');
       
          // document.getElementById('theUrl').setAttribute("theUrl",n.url);
          // document.getElementById('theUrl').setAttribute("theControlList",n.controlList);
          // console.log(this.$refs.vueaudio)
          // this.$refs.vueaudio.$refs.audio.src = n.url;
          // this.$refs.vueaudio.setAttribute("theUrl", n.url);
          // this.$refs.vueaudio.setAttribute("theControlList", n.controlList);
         
       // this.item = Object.assign({},this.item,{url:n.url, controlList:n.controlList,uploader:n.uploader,uploadTime:n.uploadTime})
        // console.log(this.item)

       
        var testaudio = document.getElementById('test-audio');

       
          for(var i = 0; i < testaudio.childNodes.length;i++){
                  
            testaudio.removeChild(testaudio.childNodes[i])
          }
       
        

        this.item.push(n);

       
        console.log(this.item)
      
          }
     },
     beforeUpdate(ev){
     },
     Update(){
     },
     mounted(){
     
     }
  }

</script>
<style>
.el-icon-s-opportunity{
  color:limegreen;
  font-size:22px;
  position:fixed;
  right:2%;
  top:32%;
  z-index:101;
}
.vueAudio{
  position: fixed;
  z-index: 100;
  bottom: 0%;
  left: 0%;
  overflow: auto;
  box-shadow: 0 -2px 12px 1px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background: #FCFCFC;
}


.fade-enter-active, .fade-leave-active {
  transition: all .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>