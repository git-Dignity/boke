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
      audioani: ""
    };
  },
  computed: {
    musicPage() {
      return this.$store.state.musicPage;
    }
  },
  components: {
    VueAudio
  },
  created() {
    // console.log(this.audioshow)
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
    }
  },

  watch: {
    musicPage(n, o) {
      // console.log(n)
      // console.log(o)

      var testaudio = document.getElementById("test-audio");

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