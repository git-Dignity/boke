<template>
  <div >
      <BlogHeader></BlogHeader>
<!--
    <a href="https://github.com/luyilin/vue-cute-timeline" class="github-corner"
       aria-label="View source on Github">
      <svg width="80" height="80" viewBox="0 0 250 250" style="fill:lightblue; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
           aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"/><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"/></svg></a>
-->
<!--    <div class="demo">-->
<!--        dark-->
      <div class="demo-them light">
        <timeline timeline-theme="lightblue">
          <timeline-title>2019</timeline-title>
          <timeline-item bg-color="#9dd8e0" font-color="#e166ab">我想</timeline-item>
          <timeline-item bg-color="#e6b6b0" :hollow="true">和你 🎉</timeline-item>
          <timeline-item bg-color="#b0e6d1">一起进步</timeline-item>
          <timeline-item bg-color="#b0e6d1">一起做饭</timeline-item>
          <timeline-title bg-color="#f2d7e1">一起跑步</timeline-title>
          <timeline-item bg-color="#b0e6d1" icon-size="small">一起吵架</timeline-item>
          <timeline-item bg-color="#b0e6d1" icon-size="small">一起压马路</timeline-item>
          <timeline-item bg-color="#b0e6d1" icon-size="small">一起去ktv</timeline-item>
          <timeline-item bg-color="#b0e6d1" icon-size="medium">一起买菜</timeline-item>
          <timeline-item bg-color="#b0e6d1" icon-size="large">一起穿拖鞋</timeline-item>
          <timeline-item>
            
        <img class="douyin icon-heart" slot="others"  src="https://user-images.githubusercontent.com/12069729/36057805-80cfc3d2-0e4e-11e8-8851-6fda091ff389.png" />
        <img class="douyin1 icon-heart" style="position: absolute;" src="https://user-images.githubusercontent.com/12069729/36057805-80cfc3d2-0e4e-11e8-8851-6fda091ff389.png" />
        <img class="douyin2 icon-heart" style="position: absolute;" src="https://user-images.githubusercontent.com/12069729/36057805-80cfc3d2-0e4e-11e8-8851-6fda091ff389.png" />

            <!-- <img src="https://user-images.githubusercontent.com/12069729/36057805-80cfc3d2-0e4e-11e8-8851-6fda091ff389.png" class="icon-heart" slot="others"> -->
            <p>I love <a href="https://github.com/luyilin/Aoba">you~</a></p>
            <p class="append">‘斑马’，‘如果有来生’</p>
          </timeline-item>
          <timeline-item line-color="#a6ade4">
            <p>一起<a href="https://github.com/luyilin/Maltose">...</a></p>
            <p class="append">环游世界</p>
          </timeline-item>
        </timeline>
      </div>
     
<!--    </div>-->
  </div>
</template>

<script>
import BlogHeader from './BlogHeader.vue'
import timeline from './timeline.vue'
import timelineItem from './timelineItem.vue'
import timelineTitle from './timelineTitle.vue'
    
export default {
  components: {
    BlogHeader,
    timeline,
    timelineItem,
    timelineTitle
  }
}
</script>

<style scoped>
  .append {
    font-size: .8em;
    margin-top: 3px;
    color: #646C7C;
  }

  a {
    color: #bf6dcf;
    font-weight: bold;
    text-decoration: none;
  }

  .icon-heart {
    width: 20px;
  }

  .demo {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-gap: 1rem;
  }

  .demo-theme.dark {
    background: #3a3939;
  }

  .github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}

  /*抖图片*/
  /* 白色 */
  .douyin {
    fill: #fff;

    /*Animation*/
    animation: glitch1 3s infinite;
  }
/* 蓝色 */
  .douyin1 {
    fill: #25f4ee;
    animation: glitch2 3s infinite;
  }
/* 红色 */
  .douyin2 {
    fill: #fe2c55;
    animation: glitch3 3s infinite;
  }

  /*Keyframes*/

/*skew是实现倾斜效果。另外还用opacity做了些透明度的处理 */
  @keyframes glitch1 {
    0% {
      transform: none;
      opacity: 1;
    }

    7% {
      transform: skew(-2.5deg, -0.9deg);
      opacity: 0.75;
    }

    10% {
      transform: none;
      opacity: 1;
    }

    27% {
      transform: none;
      opacity: 1;
    }

    30% {
      transform: skew(1.8deg, -0.1deg);
      opacity: 0.75;
    }

    35% {

      transform: none;
      opacity: 1;
    }

    52% {

      transform: none;
      opacity: 1;
    }

    55% {
      transform: skew(-1deg, 1.2deg);
      opacity: 0.75;
    }

    60% {
      transform: none;
      opacity: 1;
    }

    72% {
      transform: none;
      opacity: 1;
    }

    75% {
      transform: skew(0.4deg, -1deg);
      opacity: 0.75;
    }

    80% {
      transform: none;
      opacity: 1;
    }

    100% {
      transform: none;
      opacity: 1;
    }
  }

/*蓝色部分是在白色图标的左上方，所以设置的translate的值都是负数，这是左上方的平移。*/
  @keyframes glitch2 {
    0% {
      transform: none;
      opacity: 0.25;
    }

    7% {
      transform: translate(-4px, -6px);
      opacity: 0.5;
    }

    10% {
      transform: none;
      opacity: 0.25;
    }

    27% {
      transform: none;
      opacity: 0.25;
    }

    30% {
      transform: translate(-7px, -4px);
      opacity: 0.5;
    }

    35% {
      transform: none;
      opacity: 0.25;
    }

    52% {
      transform: none;
      opacity: 0.25;
    }

    55% {
      transform: translate(-5px, -2px);
      opacity: 0.5;
    }


    60% {
      transform: none;
      opacity: 0.25;
    }

    72% {
      transform: none;
      opacity: 0.25;
    }

    75% {
      transform: translate(-4px, -6px);
      opacity: 0.5;
    }

    80% {
      transform: none;
      opacity: 0.25;
    }

    100% {
      transform: none;
      opacity: 0.25;
    }
  }

/*红色部分类似，只是translate的值都是正数，表示时右下方的平移。 */
  @keyframes glitch3 {
    0% {
      transform: none;
      opacity: 0.25;
    }

    7% {
      transform: translate(4px, 6px);
      opacity: 0.5;
    }

    10% {
      transform: none;
      opacity: 0.25;
    }

    27% {
      transform: none;
      opacity: 0.25;
    }

    30% {
      transform: translate(7px, 4px);
      opacity: 0.5;
    }

    35% {
      transform: none;
      opacity: 0.25;
    }

    52% {
      transform: none;
      opacity: 0.25;
    }

    55% {
      transform: translate(5px, 2px);
      opacity: 0.5;
    }

    60% {
      transform: none;
      opacity: 0.25;
    }

    72% {
      transform: none;
      opacity: 0.25;
    }

    75% {
      transform: translate(4px, 8px);
      opacity: 0.5;
    }

    80% {
      transform: none;
      opacity: 0.25;
    }

    100% {
      transform: none;
      opacity: 0.25;
    }
  }
</style>

// 时间线：https://github.com/luyilin/vue-cute-timeline#vue-cute-timeline
// 会抖动的心啊：https://juejin.im/post/5d9ad281f265da5ba308398b?utm_source=gold_browser_extension
