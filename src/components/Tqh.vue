<template>
    <div>
        <br />
        <!-- <el-button id="button" type="primary" icon="el-icon-search" @click.prevent="sub()">土</el-button> -->
       
        <div :class="{'Picture-container' : isClassPicture}"  v-bind:style="styleObjectPicture">

            <div class="productLeft">
                <!-- 左侧中图  -->
                <div class="mdImg">
                    <img :src="qall" alt="">
                </div>
                <!-- 遮罩层  -->
                <div v-show="isShow" class="marks" :style="{top:top+'px',left:left+'px'}"></div>
                <!-- 遮罩层 玻璃板 superMarks -->
                <div v-if="isPC==false" @touchstart.prevent="enter" @touchend.prevent="leave"  @touchmove.prevent="marks" @click.prevent="sub()" class="superMarks" ></div>

                <div v-if="isPC==true" @mouseenter="enter" @mouseleave="leave"  @mousemove="marks" @click.prevent="sub()" class="superMarks" ></div>

                <div v-show="isShow" class="lgImg">
                    <img :src="qallBig" alt="" :style="{top:topLgImg+'px',left:leftLgImg+'px'}">
                </div>
            </div>
        </div>

        <br />
        <div id="result"></div>

    </div>
</template>

<script>
    import jquery from '../../static/jquery-1.9.1.min'

    
    export default{
        name : 'blog-header',
        data(){
            return{
                isPC:true,
                isClassPicture:true,
                styleObjectPicture: {
                    left: '30%'
                },
                // 大图片
                qall: '../../static/image/土味.jpg',
                qallBig: '../../static/image/土味Big.jpg',
                isShow:false,   //控制遮罩层marks和大图片是否显示"
                left:0,       //marks左移位置
                top:0,         //marks下移位置
                leftLgImg:0,       //大图lgImg移动的位置
                topLgImg:0         //大图lgImg移动的位置
            }
            
        },
        methods:{
          sub(){
           
            $(document).ready(function(){ 
                // $('#button').click(function(){ 
                $.ajax({ 
                    type:"GET", 
                        url:"https://api.tianapi.com/txapi/saylove/?&key=762be789103e1ae7b65573f8d4fc0df6", 
                        dataType:"json", 
                        success:function(data){ 
                            console.log(data)
                            var  txapi="<span>"+data["newslist"][0]["content"]+"</span><hr />"; 

                            $('#result').append(txapi); 

                        } 
                    }); 
                    return false; 
                // }); 
                });    
          },
          //鼠标进入和离开
        enter(){
            this.isShow=true;
            if(this.isPC === false){
                this.sub();
            }

        },
        leave(){
            this.isShow=false;
        },
        //遮罩层放大镜
        marks(e){
            // console.log('移动')
            // console.log(e)   //鼠标移入时的位置·
            var marksWidth=48;//marks的宽
            var marksHeight=48;//marks的高
            // 160*91  320*181
           if(this.isPC==true){
            //PC端
                this.left=e.offsetX-marksWidth/2;   
                this.top=e.offsetY-marksHeight/2;
                if(this.left<0){
                    this.left=0;
                }else if(this.left>160){
                    this.left=160;
                }
                if(this.top<0){
                    this.top=0;
                }else if(this.top>160){
                    this.top=160;
                }
                
                //中图片div宽高100，大图片div宽高200
                this.leftLgImg=-this.left*320/160;
                this.topLgImg=-this.top*181/91;
            }else{
                //移动端
                this.left=e.changedTouches[0].clientX-marksWidth/2;   
                this.top=e.changedTouches[0].clientY-marksHeight/2;
                if(this.left<0){
                    this.left=0;
                }else if(this.left>160){
                    this.left=160;
                }
                if(this.top<0){
                    this.top=0;
                }else if(this.top>45){
                    this.top=45;
                }
                
                //大d图片除以小的图片的宽高
                this.leftLgImg=-this.left*320/160;
                this.topLgImg=-this.top*181/91;
               
                // path[0].offsetParent.offsetTop
                // .$refs可以获取dao宽高
          
            // var picImg = document.getElementsByTagName('img')[0];
            // console.log(picImg.getBoundingClientRect().x,picImg.getBoundingClientRect().y)
            
          
            }

            
        }

        },
        mounted(){
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,)) {
        this.isPC = false; 
        this.styleObjectPicture = {left:'2%'}
    } else {
        console.log('PC端')

    }


    }
    }
</script>

<style scoped>
.Picture-container{
    position:fixed;
    top:2%;
    
}
/* 左侧大小图样式 160*91  320*181*/
    .productLeft{

        width:160px;
        position: relative;

    }
    /* 左侧中图 */
    .mdImg,.mdImg>img{
        width:160px;
        height:91px;
        margin-left: 15px;
    }
    /*遮罩层superMarks */
    .superMarks{
        width:160px;
        height:91px;
        background-color:rgba(220, 220, 220, 0);
        position:absolute;
        top:0px;
        left:0px;

    }
    /* 遮罩层 */
    .marks{
        width:48px;
        height:48px;
        position:absolute;
        background-color:rgba(220, 220, 220, 0.5);
        /*top:0px;  //内联设置了动态的top，left
        left:0px;*/
    }
    
    /* 左侧隐藏大图 */
    .lgImg{
        width:160px;
        height:91px;
        overflow: hidden;
        position:absolute;
        top:0px;
        left:195px;
        border:2px solid #aaa;
        background-color:#fff;
    }
    .lgImg img{
        width:320px;
        height:181px;
        position:absolute;
        /*top:100px;
        left:100px;*/
    }


    #button{
        position:fixed;
        top:2%;
        left: 40%;

    }
    #result{
        margin-top:18%;
    }
</style>


// vue中商品详情页放大镜功能:https://blog.csdn.net/qq_45184152/article/details/97379502 这个是本次的案例
// https://juejin.im/post/5d8235565188256bbe57dc84?utm_source=gold_browser_extension

// https://segmentfault.com/a/1190000012917213