<template>
    <div>

    

      <img :src="base64" />
       
      <input type="file" name="file" accept="image/*" @change="uploadImg" />

        <textarea id="textarea"></textarea>
        
        <section>
      <img id="previewImg" src="https://avatars1.githubusercontent.com/u/25993112?s=460&v=4" alt="预览" />
      <div class="button" role="button">
        选择图片 <input type="file" name="file"  id="file" class="upload-img" accept="image/*" @change.prevent="chooseImg()"  />
      </div>
    </section>

    

    </div>
</template>

<style>
</style>
<script>
    import jquery from '../../static/jquery-1.9.1.min'
        
    
    
   
   
  import Clipic from 'clipic'
  const clipic = new Clipic()
  export default {
    data () {
      return {
       base64: '../image/1.png',
     
      }
    },
     created(){
    

     },
      mounted(){
         var a = document.getElementById('textarea')
         console.log(a);
      },
    methods: {
    
      chooseImg(event) {
        var files = document.getElementById("file").files[0];
         
//        var files = event.files || event.dataTransfer.files
        
        var reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onload = e => {
            
          clipic.getImage({
            // width: 500,
            // height: 400,
            ratio: 16 / 9,
            src: e.target.result,
            // buttonText: ['Cancel', 'Reset', 'Done'],
            onDone: function(e) {
                console.log(document.getElementById('previewImg'))
              document.getElementById('previewImg').src = e
            }
          })
        }
        event.value = ''
      }
    }
  }
</script>

<style scoped>
.header{
    position: relative;
    overflow:hidden;
    background-color:rgba(7,17,27,0.5);
}
.content-wrapper{
    position:relative;
    padding:24px 12px 18px 24px;

    font-size:0;/*解决inline-block中间一个空格*/
}
    .h-avatar{
        display: inline-block;
        vertical-align: top;
    }
        .h-avatar img{
            border-radius:2px;
        }
    .h-content{
        display: inline-block;
        margin-left:16px;
        color:#fff;
    }
        .h-title{
            margin:2px 0 8px 0;
        }
            .h-iconP{
                vertical-align: top;
                display:inline-block;
                width:30px;
                height:18px;
                margin-right:6px;
               
                background-size:30px 18px;
                background-repeat: no-repeat;
            }
            .h-titleC{
                font-size:16px;
                font-weight: bold;
                line-height: 18px
            }
        .h-description{
            font-size:12px;
            font-weight: 200;
            line-height: 12px;
        }
        .h-gonggao{
            margin:10px 0 2px 0;
        }
          .h-iconJ{
                display: inline-block;
                vertical-align: top;
                width:12px;
                height:12px;
                margin-right:4px;
                background-size:12px 12px;
            }
            .h-gonggaoJ{
                font-size: 10px;
                font-weight: 200;
                line-height: 14px
            }
    .h-aside{
        position: absolute;
        right:12px;
        bottom:14px;
        padding:0 8px;
        border-radius:14px;
        height:24px;
        line-height: 24px;
        background-color:rgba(0,0,0,0.2);
        text-align:center;
        color:#fff;
    }
        .h-supportsL{
            vertical-align: top;
            margin-right:2px;
            font-size:10px;
        }
        .icon-keyboard_arrow_right{
            font-size:10px;
            line-height: 24px;
        }
/* 公告部分 */
.content-gonggao{
    position: relative;
    height:28px;
    line-height: 28px;
    padding:0 26px 0 12px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    background-color:rgba(7,17,27,0.2);
    color:#fff;
}
    .hg_icong{
        vertical-align: top;
        display: inline-block;
        width:22px;
        height:12px;
        background-size:22px 12px;
        background-repeat: no-repeat;
        margin-top:7px;
    }
    .hg_desc{
        font-size:10px;
        padding:0 4px;
        vertical-align: top;
    }
    .content-gonggao .icon-keyboard_arrow_right{
        position: absolute;
        right:12px;
        top:0;
        line-height:28px;
    }
/*背景图*/
.bgkImg{
    position: absolute;
    top:0;
    left: 0;
    width:100%;
    height:100%;
    filter:blur(10px);
    z-index:-1;
}
.bgkImg img{
    width:100%;
    height:100%;
}
/*详情弹框*/
.detail {
    position: fixed;
    left: 0;
    top:0;
    overflow: auto;
    width:100%;
    height:100%;
    background-color:rgba(7,17,27,0.8);
    z-index:99;
    color:#fff;
    backdrop-filter: blur(10px);
}
.fade-enter-active, .fade-leave-active {
  transition: all .7s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

  .detail-wrapper{
    width:100%;
    min-height: 100%;
  }
    .detail-main{
      padding: 64px 0;
    }
      .sellerName{
        font-size: 16px;
        font-weight: 700;
        line-height:32px;
        text-align:center;
      }
      .starGroup{
        text-align: center;
        margin:16px 0 28px 0;
      }
      .huiInfo{
        display:flex;
        width:80%;
        margin:28px auto 24px auto;
        font-size: 0;
      }
      .huiInfo .line{
        flex:1;
        display:inline-block;
        height:1px;
        background-color:rgba(255,255,255,0.2);
        margin: 6.3px 0;
      }
      .huiInfo .info{
        padding:0 12px;
        font-size:14px;
        font-weight: 700;
      }
      .allHui{
        width:80%;
        margin:0 auto;
        font-size: 0;
      }
      .allHui .h-iconJ{
        width:16px;
        height: 16px;
        background-size:16px 16px;
        margin-right: 6px;
      }
      .allHui .h-gonggaoJ{
        font-size:12px;
        line-height: 16px;
      }
      .Detailbulletin{
        width: 80%;
        font-size:12px;
        font-weight: 200;
        line-height: 24px;
        margin:0 auto;
      }
  .detail-close{
    position: relative;
    width:32px;
    height:32px;
    margin:-64px auto 0 auto;
    font-size: 32px;
  }
</style>