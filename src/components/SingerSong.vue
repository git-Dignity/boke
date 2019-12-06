<template>
  <div id="singer-song">
    <BlogHeader></BlogHeader>


      <el-input id="search" v-model="search" v-on:input.native = "searchMusicName()" required lay-verify="required" placeholder="请输入歌曲名进行搜索" autocomplete="off" class="input-with-select">
      </el-input>

      <div class="delete">
        <div v-for="(item, index) in audios" :key="index" >

           <div class="slider" @click = "music_btn(item.url,item.controlList,item.uploader,item.uploadTime)">
               <span class="content" 
                  @touchstart='touchStart'
                  @touchmove='touchMove'
                  @touchend='touchEnd'
                  :style="deleteSlider"
               >
                 <span :id="'Audio'+index">{{item.audioName}}</span>&nbsp;-&nbsp;{{item.uploader}}
                  <!-- 插槽中放具体项目中需要内容         -->   
                  <slot></slot>
               </span>
               <div class="remove" ref='remove'  @click.stop = "delAudio(index)">
                   删除
               </div>
          </div>

          <span v-if="index<4">
            <el-divider></el-divider>
         </span>
         
        </div>
      </div>


      <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>

    </div>

</template>

<script>
import jquery from '../../static/jquery-1.9.1.min'
import BlogHeader from './BlogHeader.vue'  
import VueAudio from './VueAudio.vue'
import pagination from './pagination.vue'

    
    export default{
        name : 'singer-song',
        components:{
           BlogHeader,
            VueAudio,
            'v-pagination': pagination
        },
        data(){
            return{
               name:this.$route.params.name, //我拿到Music那边传过来的id
               audios: [
         //      {id: 10, url: "../../static/audio/2.m4a", controlList: "onlyOnePlaying"}
             ],
             //分页
              total: 30,     // 记录总条数
              display: 5,   // 每页显示条数
              current: 1,   // 当前的页数
              // item:[{
              //   url:"",
              //   controlList:"",
              //   uploader:"",
              //   uploadTime:""
              // }],
              musicShow:false,
               startX:0,   //触摸位置
              endX:0,     //结束位置
              moveX: 0,   //滑动时的位置
              disX: 0,    //移动距离
              deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
              search:''
            }
            
        },
        created(){

             this.$http.post(this.GLOBAL.url_api + '/music/singerSong?name=' + this.name)
          .then(function(data){
            // console.log(data);
              var dataBodyLeng = data.body.length-1
              this.total = data.body[dataBodyLeng].id;    // 总数
              for(var i = 0; i < data.body.length-1;i++){
                 data.body[i].audioName =  data.body[i].url 
                 data.body[i].url = './../nodeJs/audio/' + data.body[i].url 

                  this.audios.push(data.body[i]);
                   
              }
             this.$store.commit("audiosPage",this.audios)
          
          })
        },
        methods:{
          delAudio(index){
              // console.log(index);
              var audioUrl = document.getElementById('Audio'+index);
              // console.log(audioUrl.innerHTML)

              if(JSON.parse(localStorage.getItem("login")).username == this.GLOBAL.administrator){

                if(confirm('确认要删除该歌曲？')) 
                  { 
                      this.$axios.post(this.GLOBAL.url_api + '/music/delAudio',{
                          url:audioUrl.innerHTML
                      }).then(data =>{
                        this.$store.commit("delAudio",audioUrl.innerHTML)
                        console.log(data); 

                      }).catch(e => {
                        console.log(e);
                      })
                   }
                 }else{
                      this.$message.error('非管理员无权删除');
                 }
                   return; 
                 

          },
          music_btn(url,controlList,uploader,uploadTime){

              this.$store.commit("musicPage",{url:url,controlList:controlList,uploader:uploader,uploadTime:uploadTime})
          },
        pagechange(currentPage){
               this.audios = []; // 清空之前的音乐
               
                 this.current = currentPage;
                 // console.log(currentPage,this.display);
               // ajax请求, 向后台发送 currentPage, 来获取对应的数据
                 this.$axios.post(this.GLOBAL.url_api + '/music/singerSong?name=' + this.name,{
                        currentPage:currentPage,    // 第几页
                        display:this.display        // 每页显示条数
                     
                    })
                 .then(data =>{
                      // console.log(data)
                       var dataLeng = data.data.length-1
                         this.total = data.data[dataLeng].id;    // 总数
                        this.current = currentPage;
                        data.data.pop();

                        for(var j = 0; j < dataLeng;j++){
                          data.data[j].audioName =  data.data[j].url 
                          data.data[j].url = './../nodeJs/audio/' + data.data[j].url 
                          this.audios.push(data.data[j]);
                        }

                        // console.log(data.data);
                        // this.CommentArea =  data.data;
                     
                        this.$store.commit("audiosPage",this.audios)
                    }).catch(function(e){
                        console.log(e);
                    })

             },
             searchMusicName(){
              setTimeout(e =>{
                this.$axios.post(this.GLOBAL.url_api + "/music/searchMusic",{
                  url:this.search,
                  name:this.name
                })
                .then(res => {
                // console.log(res.data)

                  this.audios = [];
                  if(this.search===''){
                    for(var s = 0; s < res.data.length-1; s++){
                      res.data[s].audioName =  res.data[s].url 
                      res.data[s].url = './../nodeJs/audio/' + res.data[s].url 
                      this.audios.push(res.data[s]);
                    }
                  }else{
                    for(var s = 0; s < res.data.length; s++){
                      res.data[s].audioName =  res.data[s].url 
                      res.data[s].url = './../nodeJs/audio/' + res.data[s].url 
                      this.audios.push(res.data[s]);
                    }
                  }
                  

                  this.$store.commit("audiosPage",res.data)
                })
                .catch(data => {
                  console.log(data);
                })
              },500)
             
                
             },
              touchStart(ev){
                if(JSON.parse(localStorage.getItem("login")).username != this.GLOBAL.administrator){
            console.log('你不是管理员');
         
          }else{

                ev= ev || event
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
          
                  if(ev.touches.length == 1){
                          // 记录开始位置
                          this.startX = ev.touches[0].clientX;
                      }

              }
            },
         touchMove(ev){

           //如果不是管理员就删除按钮隐藏
          if(JSON.parse(localStorage.getItem("login")).username != this.GLOBAL.administrator){
            console.log('你不是管理员');
         
          }else{

                ev = ev || event;
                   //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd=this.$refs.remove.offsetWidth;
                    if(ev.touches.length == 1) {
                        // 滑动时距离浏览器左侧实时距离
                        this.moveX = ev.touches[0].clientX
                
                        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                        this.disX = this.startX - this.moveX;
                      
                   // console.log(this.disX)
                        // 如果是向右滑动或者不滑动，不改变滑块的位置
                        if(this.disX < 0 || this.disX == 0) {
                            this.deleteSlider = "transform:translateX(0px)";
                        // 大于0，表示左滑了，此时滑块开始滑动 
                        }else if (this.disX > 50) { // 默认是写0的，我觉得太灵敏就将值设置小一点
                             //具体滑动距离我取的是 手指偏移距离*5。
                            this.deleteSlider = "transform:translateX(-100px)"; //"transform:translateX(-" + this.disX*5 + "px)";
                            
                            // 最大也只能等于删除按钮宽度 
                            if (this.disX*5 >=wd) {
                                this.deleteSlider = "transform:translateX(-" +wd+ "px)";  // "transform:translateX(-" +wd+ "px)";
                             
                            }
                        }
                    }

                }
          },
         touchEnd(ev){
          if(JSON.parse(localStorage.getItem("login")).username != this.GLOBAL.administrator){
            console.log('你不是管理员');
         
          }else{
              ev = ev || event;
              let wd=this.$refs.remove.offsetWidth;
              if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                      
                        this.disX = this.startX - endX;
                        // console.log(this.disX)
                        //如果距离小于删除按钮一半,强行回到起点
                        
                        if ((this.disX*5) < (wd/2)) {
                          
                            this.deleteSlider = "transform:translateX(0px)";
                        }else{
                            //大于一半 滑动到最大值
                             this.deleteSlider = "transform:translateX(-"+wd+ "px)"; // "transform:translateX(-"+wd+ "px)";
                        }
                    }
                }   

            }   
     
        }

    }
</script>

<style scoped lang="scss">

 .slider{
        width: 100%;
        height:90px;
        line-height: 90px;
        position: relative;
         user-select: none;
        .content{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background:#ffffff;
            z-index: 100;
            transition: 0.3s;
            /* 文字不换行 */
            display: block;
            word-break: keep-all;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transform: translateX(0px);
             
        }
        .remove{
            position: absolute;
            width:100px;
            height:90px;
            background:red;
            right: 0;
            top: 0;
            color:#fff;
            text-align: center;
            line-height: 90px;
        }
    }

  .el-input{
    width:90%;
  }
  .el-divider--horizontal{
    margin:0;
  }

</style>
