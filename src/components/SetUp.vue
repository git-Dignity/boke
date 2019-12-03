<template>
    <div>
       <BlogHeader></BlogHeader>

        <form id="sendAppealForm">
            <a href="javascript:void(0);" class="upload">选择文件 > <span class="unfile">未选择任何文件</span>
                 <input class="replyFileid" name="appealFile" id="appealFile" type="file" accept="image/*" multiple="multiple"  v-on:change="getfilename(this)"/>
            </a>
        </form>
        <button type="button" class="layui-btn" v-on:click.prevent = "pass()">
          <i class="layui-icon">&#xe67c;</i>上传头像
        </button>

        <br /><br />

        <div class="pic-box"> 
          <!-- pc端显示的图片是鼠标移过去 -->
          <div v-if="isPC==true">
            <!-- 第一次进来无效，第二次进来生效 -->
            <pic-zoom :url="photo" :scale="2"></pic-zoom>
          </div>
          <!-- 移动端手指触发 -->
          <div v-if="isPC==false" id="imgDemo" v-viewer>
            <!-- 动态修改图片路径失效 -->
            <!-- <viewer :images="img_photo" v-if="!isPC" id="img_photo">
                  <img v-for="src in img_photo" :src="src.url" :key="src.title">
              </viewer> -->
              <img :src="photo" id="previewImage">
          </div>
        </div>


        


     
      <!-- <el-avatar :size="70" :src="photo"></el-avatar> -->
      <br /><br />
    

      <el-form label-position="right" label-width="80px" :model="userInfo">
        <el-form-item label="昵称：">
          <el-link>
            {{userInfo.name}}
          </el-link>
        </el-form-item>
        <el-form-item label="日志：">
          <router-link to = "/log">
            {{userInfo.logInfo}}
          </router-link>
         
        </el-form-item>
      </el-form>

    

    </div>
</template>

<style scoped>
@import  '../../static/utils/layui/css/layui.css'

</style>
<script>
    import jquery from '../../static/jquery-1.9.1.min'
    import BlogHeader from './BlogHeader.vue'
    import Log from './Log.vue'
    import PicZoom from 'vue-piczoom' // 鼠标移过去图片放大
    import Viewer from 'v-viewer'
        
     
  export default {
     components:{
       BlogHeader,
       Log,
       PicZoom
    },
    name: 'set-up',
    data () {
      return {
        
        isPC:true,
        photo: '../../static/image/aze.jpg',
        img_photo: [
          {
            url: 'https://zhengzemin.cn/nodeJs/photo/s.png',
            title: '阿泽'
          }
        ],
        userInfo: {
          name: 'admin',
          logInfo: '日志信息',
          type: ''
        },
        isUpload:true
      }
    },
    mounted(){

      if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,)) {
          this.isPC = false;
      } else {
          console.log('PC端')
      }

    },
    created(){
        var picImg = document.getElementsByTagName('img')[0];

        this.$axios.post('https://zhengzemin.cn/setUp',{
              username:JSON.parse(localStorage.getItem("login")).username
           
          }).then(res =>{
              // console.log(res.data[0]);
              // this.img_photo[0].url = 'https://zhengzemin.cn/nodeJs/photo/' + res.data[0].photo;
              // this.img_photo[0].title = res.data[0].photo;
              this.photo = 'https://zhengzemin.cn/nodeJs/photo/' + res.data[0].photo;
            
          })


        // console.log(picImg.getBoundingClientRect().x,picImg.getBoundingClientRect().y)

    },
    methods: {
      
      pass(){
              if(document.getElementsByClassName('unfile')[0].innerHTML == '未选择任何文件'){
                  alert('亲，请上传文件')
              }else{
                  var formData = new FormData($("#sendAppealForm")[0]);
                var myDate = new Date();  
                formData.append("uploader", JSON.parse(localStorage.getItem("login")).username);    // 上传者
                console.log(this.isUpload)

                var _this = this;
                //图片小于2m才可以上传
                if(this.isUpload!=false){
                  $.ajax({
                      url: "https://zhengzemin.cn/upload/Photo",
                      type: "POST",
                      data: formData,
                      contentType: false,
                      processData: false,
                      mimeType: "multipart/form-data",
                      success: function (res) {
                          // console.log(res)
                          var str = res.substring(45); // 歌曲.MP3
                          layer.msg('更新头像'+str+'成功');
                          _this.photo = 'https://zhengzemin.cn/nodeJs/photo/' + str;
                          // _this.img_photo[0].url = 'https://zhengzemin.cn/nodeJs/photo/' + str;
                          // _this.img_photo[0].title = str;

                          // 初始化 viewer.js
                         // $('#img_photo').viewer({
                         //      inline:true
                         // }).viewer('update')
                          $('.upload span').html('未选择任何文件');
                      },
                      fail: function (err) {
                          console.log(err)
                      }
                  })
                }else{
                  this.$message({
                    message: '该图片大小大于2M！',
                    type: 'warning',
                    center: true,
                    showClose: true
                  });
                }
                
              }
                
            },
          //使用文件的files属性，在调试区console.log后发现name属性中显示了文件名称，因此循环文件的个数，当i不是最后一个文件时，在名称后添加'、'，最后一个文件后不添加
          //选择文件获取文件名称
         getfilename(el){
             
            var _el = document.getElementById('appealFile').files;
            console.log(_el)

            if (_el[0].size/1024 > 1024*2) {
                this.$message({
                    message: '文件大小不能大于2M！',
                    type: 'warning',
                    center: true,
                    showClose: true
                  });
                   
                this.isUpload = false;
                return false;
            }
            this.isUpload = true;

            var _name = "";
            for(var i=0;i<_el.length;i++){
                if(i==_el.length-1){
                    _name += _el[i].name
                }else{
                    _name += _el[i].name+'、'
                }
                $('.upload span').html(_name);
            }
        },
    },
  }
</script>

<style scoped lang="scss">
/* 上传照片*/
.layui-btn{
    margin-top: 5%;   
}
        
.upload{
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    text-decoration: none;
    color: #4d90d3;
    cursor: pointer;
}
.replyFileid{
    width:100%;
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    filter:alpha(opacity=0);
    -moz-opacity:0;
    -khtml-opacity: 0;
    opacity: 0;
    cursor: pointer;
}
.upload span{
    color:#999;
    cursor: pointer;
}

.block{
  display: inline-grid;
  margin-right: 5%;
  span{
    @include fontFamily(cursive);
  text-shadow: -1px -1px white, 1px 1px #666;  
  }
  
}

.pic-box{
  height:100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pic-box img,.magnifier-box{
  border-radius:50%;
  width: 120px;
  height: 120px;
  object-fit: cover;  /*图片等比例缩小*/
}

      
</style>

// vue中商品详情页放大镜功能:https://blog.csdn.net/qq_45184152/article/details/97379502 这个是本次的案例
// https://juejin.im/post/5d8235565188256bbe57dc84?utm_source=gold_browser_extension

// https://segmentfault.com/a/1190000012917213