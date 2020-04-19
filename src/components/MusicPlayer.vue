<template>
  <div>
    <div
      class="iconfont zzm-bokeyinle"
      v-on:click="audioshow = !audioshow"
      :style="{animation:audioani}"
    ></div>
    <transition name="fade">
      <div id="test-audio">
        <div v-for="(item, index) in item" :key="index" v-show="audioshow" class="vueAudio">
          <VueAudio
            :theUrl="item.url"
            :theControlList="item.controlList"
            :theUploader="item.uploader"
            :theUploadTime="item.uploadTime"
            @musicClose="closeMusic"
            @audioState="audioState($event)" 
            @onTimeupdate="onTimeupdate"
            @playAll = "playAll"
            @playSingle = "playSingle"
          />
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import VueAudio from "./utils/VueAudio.vue";

export default {
  name: "music-player",
  data() {
    return {
      item: [
        {
          url: "https://zhengzemin.cn/nodeJs/audio/说好不哭-周杰伦.m4a",
          controlList: "onlyOnePlaying",
          uploader: "周杰伦",
          uploadTime: "2019/05/20"
        }
      ],
      audioshow: false,
      audioani: "",
      isAllOrSingle:2,
      audioIndex:1,   //当前的歌曲在vuex的audiosPage排在第几位
      audioRandomIndex:1,
      asd:[
        {
          url:"./../../static/audio/gs.mp3",
          controlList: "onlyOnePlaying",
          uploader: "周杰伦",
          uploadTime: "2019/05/20"
        },
        {
          url:"./../../static/audio/1.mp3",
          controlList: "onlyOnePlaying",
          uploader: "12",
          uploadTime: "2019/05/203"
        }
      ]
    };
  },
  computed: {
    musicPage() {
      return this.$store.state.musicPage; 
    },
    // findThisAudioIndex(){
    //   //为了不让下一首歌播放当前的歌曲
    //       if(this.$store.state.audiosPage.length!=0){
    //           this.$store.state.audiosPage.forEach((element,index) => {
    //             if(this.$store.state.musicPage.url===element.url){
    //               console.log(element);
    //               if(index<4){
    //                 this.audioIndex == index++;
    //                 return index++;
    //               }else{
    //                 this.audioIndex == index--;
    //                 return index--;
    //               }
    //               console.log(index)
    //             }
    //           });
    //       }
    //       return this.audioIndex;
    // }
  },
  components: {
    VueAudio
  },
  created() {
    // console.log(this.audioshow)
    console.log(this.$store.state.audiosPage)
      
      
  },
  methods: {
    closeMusic(data) {
      if (data === "0") {
        this.audioshow = !this.audioshow;
      }
      // console.log(data);
    },
    audioState(data) {
      if (data === "play") {
        this.audioani = "audioani 3s ease infinite";
      } else {
        this.audioani = "";
      }
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    findThisAudioIndex(){
      return this.$store.state.audiosPage.findIndex(n => n.url === this.$store.state.musicPage.url) 
        // if(this.$store.state.audiosPage.length!=0){
        //       this.$store.state.audiosPage.forEach((element,index) => {
        //         if(this.$store.state.musicPage.url===element.url){
        //           this.audioIndex == index;
        //           console.log(index)
        //           return index;
        //         }
        //       });
        //   }
        //   return this.audioIndex;
    },
    audioRandomIsThisAudio(audioRandomIndex,thisAudioIndex){
      if(audioRandomIndex===thisAudioIndex){
          return this.audioRandomIsThisAudio(this.random(0, this.$store.state.audiosPage.length),thisAudioIndex)
        }else{
          return audioRandomIndex;
        }
    },
    onTimeupdate(data){
      // console.log(this.isAllOrSingle)
      // console.log(this.item);
     
      if(data==100){
        if(this.isAllOrSingle===1){
          //代办：就是随机播放，要是下一首歌还是当前的歌就不会播放，考虑换下随机算法
          //为了不让下一首歌播放当前的歌曲
          // if(this.$store.state.audiosPage.length!=0){
          //     this.$store.state.audiosPage.forEach((element,index) => {
          //       if(this.$store.state.musicPage.url===element.url){
          //         console.log(element);
          //         console.log(this.$store.state.musicPage)
          //         if(index<4){
          //           // this.audioIndex == index++;
          //           this.$store.commit("musicPage",this.$store.state.audiosPage[index++])
          //           console.log(this.$store.state.audiosPage[index++])
          //           console.log(this.$store.state.musicPage)
          //         }else{
          //           // this.audioIndex == index--;
          //           this.$store.commit("musicPage",this.$store.state.audiosPage[index--])
          //         }
          //         console.log(index)
          //       }
          //     });
          // }
          this.findThisAudioIndex();
          console.log(this.audioIndex)
          this.audioRandomIndex = this.random(0, this.$store.state.audiosPage.length);
          //使用递归，这样才不会当前播放和下一曲的索引会相同
          this.audioRandomIndex = this.audioRandomIsThisAudio(this.audioRandomIndex,this.findThisAudioIndex())
          // if(this.audioRandomIndex===this.findThisAudioIndex()){
          //   this.audioRandomIndex = this.random(0, this.$store.state.audiosPage.length-1)
          // }
          console.log(this.findThisAudioIndex())
          console.log(this.audioRandomIndex)
          this.$store.commit("musicPage",this.$store.state.audiosPage[this.audioRandomIndex])
          console.log(this.$store.state.musicPage)
          
          //随机，但是有个bug，下一曲随机播放和当前的歌曲一样就不播放了
            // this.$store.commit("musicPage",this.$store.state.audiosPage[this.random(0, this.$store.state.audiosPage.length-1)])
        }else if(this.isAllOrSingle===2){
          // console.log(this.item[1])
          //  console.log(this.$store.state.musicPage)
          this.$store.commit("musicPage",this.$store.state.musicPage)
        }
        
      }
    },
    //随机播放
    playAll(data){
      // 1
      this.isAllOrSingle = data;
      // console.log(data)
    },
    //单曲循环
    playSingle(data){
      // 2
      this.isAllOrSingle = data;
      // console.log(data); 
    }
  },

  watch: {
 
    musicPage(n, o) {
      // console.log(n)
      // console.log(o)

      

      var testaudio = document.getElementById("test-audio");
      // console.log(testaudio.childNodes)
      for (var i = 0; i < testaudio.childNodes.length; i++) {
        testaudio.removeChild(testaudio.childNodes[i]);
      }

      this.item.push(n);

      // console.log(this.item)
    }
  },
  beforeUpdate(ev) {},
  Update() {},
  mounted() {}
};
</script>
<style>
.zzm-bokeyinle {
  color: #d81e06;
  font-size: 22px;
  position: fixed;
  right: 2%;
  top: 32%;
  z-index: 101;
  filter: drop-shadow(10px 10px 10px rgba(0, 0, 0, 0.5));
  border-radius: 100%;
  /* -webkit-animation: audioani 2s linear infinite; */
}
@keyframes audioani {
  0% {
    filter: drop-shadow(0 0 0px #ff8329);
    /* box-shadow: 0 0 0px #ff8329 */
  }
  25% {
    filter: drop-shadow(10px 10px 5px #ff8329);
    /* box-shadow: 0 0 5px #ff8329 */
  }
  50% {
    filter: drop-shadow(10px 10px 10px #ff8329);
    /* box-shadow: 0 0 10px #ff8329 */
  }
  75% {
    filter: drop-shadow(10px 10px 5px #ff8329);
    /* box-shadow: 0 0 5px #ff8329 */
  }
  100% {
    filter: drop-shadow(0 0 0px #ff8329);
    /* box-shadow: 0 0 0px #ff8329 */
  }
}

.vueAudio {
  position: fixed;
  z-index: 102;
  bottom: 0%;
  left: 0%;
  overflow: auto;
  box-shadow: 0 -2px 12px 1px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background: #fcfcfc;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>