<template>
    <div @load = "musicLoad()" >
        <BlogHeader></BlogHeader>

        
        <form id="sendAppealForm">
            <a href="javascript:void(0);" class="upload">选择文件 > <span class="unfile">未选择任何文件</span>
                 <input class="replyFileid" name="appealFile" id="appealFile" type="file" accept="audio/*" multiple="multiple"  v-on:change="getfilename(this)"/>
            </a>
        </form>
        <button type="button" class="layui-btn" v-on:click.prevent = "pass()">
          <i class="layui-icon">&#xe67c;</i>上传录音
        </button>

        <br /><br />

 
        <div >
          <div class="block" v-for="headSculptures in headSculpture" :key="headSculptures.name">
              <span class="title">{{ headSculptures.name }}</span>
              <router-link v-bind:to = "'/singerSong/' + headSculptures.name">
                <el-avatar shape="square" :size="130" :fit="headSculptures.fit" :src="headSculptures.url"></el-avatar>
              </router-link>
          </div>
        </div>


        
    </div>
</template>





<script>
    import jquery from '../../static/jquery-1.9.1.min'
    import BlogHeader from './BlogHeader.vue'  
//    import flow from '../../static/layui/lay/modules/flow'
//        import laypage from '../../static/layui/lay/modules/laypage'
     import pagination from './pagination.vue'
         
    
  export default {
    name:"music",
    data () {
      return {
       //分页
        total: 30,     // 记录总条数
        display: 5,   // 每页显示条数
        current: 1,   // 当前的页数
        headSculpture:[
            {fit:'fill',name:'全部歌曲',url:'./../../static/image/all.jpg'},
            {fit:'contain',name:'阿泽',url:'./../../static/image/aze.jpg'},
            {fit:'contain',name:'阿玲',url:'./../../static/image/xl.jpg'},
            {fit:'cover',name:'周杰伦',
            url:'https://p1.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg?param=130y130'},
            {fit:'none',name:'华晨宇',
            url:'https://p1.music.126.net/eiazGAbIGMBF-Q9lInm5xw==/109951164158509628.jpg?param=130y130'},
            {fit:'scale-down',name:'邓紫棋',
            url:'https://p1.music.126.net/r7uMnwjWpYMuQI_3ZTg56A==/18528969953189760.jpg?param=130y130'}
        ]
      }
    },
      components:{
         BlogHeader,
          'v-pagination': pagination
          
      },
      mounted:{
          
        musicLoad(){
            // console.log(1)   
        }
      },
      
      methods:{
          pass(){
              if(document.getElementsByClassName('unfile')[0].innerHTML == '未选择任何文件'){
                  alert('亲，请上传文件')
              }else{
                  var formData = new FormData($("#sendAppealForm")[0]);
                var myDate = new Date();  
                formData.append("uploader", JSON.parse(localStorage.getItem("login")).username);    // 上传者
                formData.append("uploadTime", myDate.toLocaleDateString());       // 上传日期
              
              
                var _this = this;
                $.ajax({
                    url: this.GLOBAL.url_api + "/music/SoundRecording",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    mimeType: "multipart/form-data",
                    success: function (res) {
                        console.log(res)
                        var str = res.substring(27); // 歌曲.MP3

                       // _this.audios.push({url:'./../nodeJs/audio/'+str,
                       //                    controlList:'onlyOnePlaying',
                       //                    uploader:JSON.parse(localStorage.getItem("login")).username,
                       //                    uploadTime:myDate.toLocaleDateString()
                       //                   })
                        alert('亲，已上传成功~');
                        $('.upload span').html('未选择任何文件');
                    },
                    fail: function (err) {
                        console.log(err)
                    }
                })
              }
                
            },
          //使用文件的files属性，在调试区console.log后发现name属性中显示了文件名称，因此循环文件的个数，当i不是最后一个文件时，在名称后添加'、'，最后一个文件后不添加
          //选择文件获取文件名称
         getfilename(el){
             
             
            var _el = document.getElementById('appealFile').files;
//             console.log(_el)
            var _name = "";
            for(var i=0;i<_el.length;i++){
                if(i==_el.length-1){
                    _name += _el[i].name
                }else{
                    _name += _el[i].name+'、'
                }
                $('.upload span').html(_name);
            }
        }
      },
      mounted(){
           
      }
    
  }
</script>

<style scoped>
@import  '../../static/utils/layui/css/layui.css'

</style>

<style scoped lang="scss">
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
</style>