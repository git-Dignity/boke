<template>
    
<div class="Single">
    <BlogHeader></BlogHeader>
    
   
    <transition name = "fade">
        <div>
    <div id="single-blog" class="SingleBlog">
        <h1>文章详情</h1>
        <div class="single-content">
            <h4>博客标题：</h4>
          <!--   <input id="boke-title"  
                v-model="blog.title"  
                class="blogContent" 
                readonly /> -->
            <el-input
                id="boke-title"  
                v-model="blog.title"  
                class="blogContent" 
                readonly
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 5}" >
            </el-input>
            
            <h4>博客内容：</h4>
            <div>
           <!--    <textarea id="textarea"   
                    v-model="blog.content" 
                    class="blogContent" 
                    readonly /> -->
                <el-input
                    id="textarea"   
                    v-model="blog.content" 
                    class="blogContent" 
                    readonly
                    type="textarea"
                    :autosize="{ minRows: 1, maxRows: 20}" >
                </el-input>

            </div>
            <h4>博客分类</h4>
            <!-- <input v-model="blog.categories" readonly="true" /> -->
            <el-input
                v-model="blog.categories"  
                readonly
                class="blogContent" 
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 5}" >
            </el-input>
            <h4>作者：</h4>
            <!-- <input v-model="blog.author" readonly="true" /> -->
            <el-input
                v-model="blog.author"  
                readonly
                class="blogContent" 
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 5}" >
            </el-input>
        </div>
    </div>
    
    <div class="comment-area">
        <h2>评论社区</h2>
        <div class="CommentArea">
            <h3 v-show = "!iscomments">暂无评论，请评论~</h3>
            <ul>
                <li v-for="(CommentAreas,index) in CommentArea" >
                    <span>{{CommentAreas.author}}</span>
                    {{CommentAreas.commentsContent}}
                    <br />
                   
                    <div class="commentArea-b">
                        <span class="commentTime">{{CommentAreas.commentTime}}</span>
                        <div class="commentArea-b-r">
                            
                            <div class="zan" :id="index"  @click.prevent = "zan(index)">
                                 <div class="CommentAreasId" style="display:none;">{{CommentAreas.id}} </div>
                               
                                 <vue-star class="layui-anim layui-anim-scale" color="#F05654" style="width: 64px;height: 30px;" >
                                      <img slot="icon" src="../../static/image/zan.png" />

                                </vue-star>
                                <div id="zanNum">{{CommentAreas.zanNum}} </div>
                            </div>
                           
                            <div class="Reply">
                                <el-badge :value="3" class="item">
                                  <el-button type="primary" plain size="mini" @click.prevent = "reply()">回复</el-button>
                                </el-badge>
                            </div>
                            <div class="Delcomments" :class="{'Usercomments':delDisplay}">
                                  <el-button type="danger" plain  size="mini" icon="el-icon-delete" @click.prevent = "Delcomments($event)"></el-button>
                                <div class="CommentAreasId" style="display:none;">{{CommentAreas.id}} </div>
                            </div>
                            
                       
                        </div>
                        
                    </div>
                    <br />
                        <div style="display: inline-flex;padding-left: 2%;">
                          <div v-if="CommentAreas.loginId == null">
                            评论不够经典，暂时没人赞哦~
                          </div>
                          <div v-else>
                            {{CommentAreas.loginId}}等{{CommentAreas.zanNum}}人觉得很赞！
                          </div>

                          
                            
                        </div>
                </li>
          </ul>
            <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
        </div>
    </div>
    <div class="publish-comment" >
        <h2>发表评论</h2>
        <input  v-model = "username" readonly="true" id="username" />
        <textarea id="commentsContent"
                v-model = "commentsContent"
                placeholder="请留下您的足迹~" />
     <!--    <b-row class="mt-2" style="width:100%;" >
            <b-col >
              <b-form-textarea
                id="commentsContent"
                v-model = "commentsContent"
                placeholder="请留下您的足迹~"
              ></b-form-textarea>
            </b-col>
          </b-row> -->
        
    </div>
    
    <div class="mt-3" style="margin-bottom:5%;">
    <b-button-group>
      <b-button variant="warning" v-on:click.prevent = "singleEdit()">编辑</b-button>
      <b-button variant="info" v-on:click.prevent = "comments(blog.id)">发送评论</b-button>
      <b-button variant="success" v-on:click.prevent ="singleKeep(blog.id)">保存</b-button>
    </b-button-group>
  </div>
            </div>
    </transition>
</div>
</template>

<style scoped>
/*    @import  '../../static/layui/css/layui.css'*/
</style>

<script>
import BlogHeader from './BlogHeader.vue'
import VueStar from 'vue-star'
import pagination from './pagination.vue'
 import jquery from '../../static/jquery-1.9.1.min'   
 // import layuiAll from '../../static/layui/layui'   
// import flow from "../../static/layui/src/lay/modules/flow"

    
    export default{
        name : "single-blog",
        components:{
            BlogHeader,
            VueStar,
            'v-pagination': pagination
        },
        data(){
            return {
                iscomments:true,
                id:this.$route.params.id, //我拿到showblogs那边传过来的id
                blog:{},
                commentsContent:'',   //评论内容
                CommentArea:[],
                commentTime:'',
                zanNum:'',
                s:'',
                username:'',
                ta:'',
                zanKey:false,
                delDisplay:false,
                //分页
                total: 30,     // 记录总条数
                display: 5,   // 每页显示条数
                current: 1,   // 当前的页数
                
                userArr:{}
               
            }
        },
        created(){
            
            
            
            this.$http.get('https://zhengzemin.cn/blog/singleblog?id=' + this.id)
                        .then(function(data){
//                             console.log(data.body[0]);
                            this.blog = data.body[0];
                        })
            this.$axios.post('https://zhengzemin.cn/blogComments/showComments',{
                          id:this.id       
                    }).then(data =>{
                var dataLeng = data.data.length-1
                         this.total = data.data[dataLeng].id;    // 总数
               
                data.data.pop();
                             this.CommentArea =  data.data;
                
                for(var c = 0; c < this.CommentArea.length; c++){
                    
                    this.CommentArea[c].usernames = [];
               console.log(this.CommentArea)
                
                                for(var u = 0; u < this.userArr.length; u++){
                                    if(this.CommentArea[c].id == this.userArr[u].commentsId){
                                           console.log(this.CommentArea[c].id)
                                           this.CommentArea[c].userN = this.userArr[u].username;
                                    }
                                }
                            }
                
                this.$store.commit("commentsPage",this.CommentArea)
               
                             this.username = JSON.parse(localStorage.getItem("login")).username + '说：';
                            
                
                             if(this.CommentArea.length == 0){ //暂无评论
                                this.iscomments = false; 
                             }
                        
                               
                        }).catch(function(e){
                            console.log(e);
                        })
            
            //当前时间
            var myDate = new Date();  
            this.commentTime = myDate.toLocaleDateString();
            
            
            //如果不是管理员就删除按钮隐藏
            if(JSON.parse(localStorage.getItem("login")).username == this.GLOBAL.administrator){
            
               this.delDisplay = true;
            
            }
            
           
            
        },
        methods:{
             pagechange(currentPage){
               console.log(currentPage);
                 this.current = currentPage;
               // ajax请求, 向后台发送 currentPage, 来获取对应的数据
                 this.$axios.post('https://zhengzemin.cn/blogComments/showComments',{
                        id:this.id,
                        currentPage:currentPage,    // 第几页
                        display:this.display        // 每页显示条数
                     
                    }).then(data =>{
                   
                       var dataLeng = data.data.length-1
                         this.total = data.data[dataLeng].id;    // 总数
                        this.current = currentPage;
                        data.data.pop();
                        this.CommentArea =  data.data;
                        
                     for(var c = 0; c < this.CommentArea.length; c++){
                                
                         for(var u = 0; u < this.userArr.length; u++){
                                if(this.CommentArea[c].id == this.userArr[u].commentsId){
                                       console.log(this.CommentArea[c].id)
                                       this.CommentArea[c].userN += this.userArr[u].username;
                                }
                            }
                         
                      }
                     
                      this.$store.commit("commentsPage",this.CommentArea)
                    }).catch(function(e){
                        console.log(e);
                    })

             },
            singleEdit(){
                alert('亲，可以点击修改数据啦~')
                
                var input = document.getElementsByTagName('input');
                var textarea = document.getElementsByTagName('textarea');
                for(var i = 0; i < input.length; i++){
                    textarea[0].removeAttribute("readonly");
                    textarea[1].removeAttribute("readonly");
                    input[i].removeAttribute("readonly");
                    input[i].style.borderColor = "#0f0";

                }
            },
            singleKeep(id){
                this.$axios.post('https://zhengzemin.cn/blog/updateboke',{
                    id:id,
                    title:this.blog.title,
                    content:this.blog.content,
                    categories:this.blog.categories,
                    author:this.blog.author
                }).then(data =>{
                    alert('亲，你的数据修改成功啦~')
                    console.log(data);
                }).catch(function(e){
                    console.log(e);
                })
            },
            zan(data){
//                console.log(data)
                 var userArrNew = [];
                this.$axios.post('https://zhengzemin.cn/commentsLike/likeInsert',{
                                                                                     commentsId:document.getElementById(data).firstElementChild.innerText,
                    loginId:JSON.parse(localStorage.getItem("login")).username
                   
                  }).then(data =>{
//                    console.log(data)
                    this.userArr = data.data;
                    
                    //更新点赞次数到comments表
                    this.$axios.post('https://zhengzemin.cn/commentsLike/likeShow').then(data =>{

//                        console.log(data);
                        //在次查询表中的数据
                        this.$axios.post('https://zhengzemin.cn/blogComments/showComments',{
                        id:this.id,
                        currentPage:this.current,    // 第几页
                        display:this.display        // 每页显示条数
                     
                        }).then(data =>{
//                            console.log(data.data)
                            var dataLeng = data.data.length-1
                             this.total = data.data[dataLeng].id;    // 总数
                                data.data.pop();
                            this.CommentArea =  data.data;
                            
                           
                            
                            // console.log(this.userArr)
                            console.log("=====")
                          
                            
//                            for(var c = 0; c < this.CommentArea.length; c++){
//                                
//                                
//                                for(var u = 0; u < this.userArr.length; u++){
//                                    if(this.CommentArea[c].id == this.userArr[u].commentsId){
////                                           console.log(this.CommentArea[c].id)
//                                        this.CommentArea[c].usernames.push(this.userArr[u].username);
////                                           this.CommentArea[c].userN = this.userArr[u].username;
//                                       
//                                    }
//                                }
//                            }
                            
                            console.log(this.CommentArea)
                            
                            
                            
                                this.$store.commit("commentsPage",this.CommentArea)
                        }).catch(function(e){
                            console.log(e);
                        })
                        
                        

                      }).catch(function(e){
                        console.log(e);
                      })
                    
                  }).catch(function(e){
                    console.log(e);
                  })
                
                
                
            },
            // 删除评论
            Delcomments(e){
              console.log(e.target.parentNode)
                console.log(e.target.parentNode.parentNode.lastElementChild.innerText);
                
                if(JSON.parse(localStorage.getItem("login")).username == this.GLOBAL.administrator){
                  if(confirm('确认要删除？')) 
                    { 
                        this.$axios.post('https://zhengzemin.cn/blogComments/delcomments',{
                          id:e.target.parentNode.parentNode.lastElementChild.innerText
                        })
                        .then(data =>{
                          // 数据库已经删除，节点未删除（用vuex解决)   parentNode这个还有些获取不到，
                          this.$store.commit("delcomments",e.target.parentElement.parentElement.lastElementChild.innerText)
                            console.log(data)
                        })
                        .catch(function(e){
                          console.log(e);
                        })
                     }
                 }else{
                  this.$message.error('非管理员无权删除');
                 }
                   return; 
                   
            },
            reply(){
                
            },
            comments(id){
                if(this.commentsContent!=''){
                  this.$axios.post('https://zhengzemin.cn/blogComments/comments',{
                    bokeId:id,
                    commentsContent:this.commentsContent,
                    commentTime:this.commentTime,
                    author:this.username,
                    
                  }).then(data =>{
                     alert('亲，你的评论已飞速上传！')
                     this.commentsContent = '';

                     this.$axios.post('https://zhengzemin.cn/blogComments/showComments',{
                          id:this.id,
                          currentPage:this.current,    // 第几页
                          display:this.display        // 每页显示条数
                    }).then(data =>{
                         var dataLeng = data.data.length-1
                         this.total = data.data[dataLeng].id;    // 总数
                 
                        data.data.pop();
                         
                             this.CommentArea =  data.data;
                         
                           for(var c = 0; c < this.CommentArea.length; c++){
                                for(var u = 0; u < this.userArr.length; u++){
                                    if(this.CommentArea[c].id == this.userArr[u].commentsId){
                                           console.log(this.CommentArea[c].id)
                                           this.CommentArea[c].userN = this.userArr[u].username;
                                    }
                                }
                            }
                             
                                this.iscomments = true; 
                         this.$store.commit("commentsPage",this.CommentArea)
                         
                         
                             
                        })

                  }).catch(function(e){
                    console.log(e);
                  })
               }else{
                alert('亲，评论内容为空，请评论~');   
              }
            }
        },

        mounted(){
          
            
            
//             layui.use('flow', function(){
//           var flow = layui.flow;
//             var _this = this;
//           flow.load({
//             elem: '#LAY_demo1' //流加载容器
//             ,scrollElem: '#LAY_demo1' //滚动条所在元素，一般不用填，此处只是演示需要。
//             ,done: function(page, next){ //执行下一页的回调
// //                $.get("http://47.107.103.41/showCommentsTest?id="+this.id, function(res){
// //                    console.log(res)
// //        //假设你的列表返回在data集合中
// ////        layui.each(res.data, function(index, item){
// ////          lis.push('<li>'+ item.title +'</li>');
// ////        }); 
// //        
// //        //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
// //        //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
// ////        next(lis.join(''), page < res.pages);    
// //      });
                
               
             
                
                
//               //模拟数据插入
// //              setTimeout(function(){
// //                var lis = [];
// //                for(var i = 0; i < 8; i++){
// //                  lis.push('<li>'+ ( (page-1)*8 + i + 1 ) +'</li>')
// //                }
// //
// //                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
// //                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
// //                next(lis.join(''), page < 10); //假设总页数为 10
// //              }, 500);
//             }
//           });



//         });
            
            
//            textarea高度自适应
         
            var el = document.getElementById('textarea');
            var timer = null;
            //由于ie8有溢出堆栈问题，故调整了这里
            var setStyle = function(el, auto) {
            if (auto) el.style.height = 'auto';
                el.style.height = el.scrollHeight + 'px';
                //        el.style.height = 28 + 'px';
            }
            var delayedResize = function(el) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
                timer = setTimeout(function() {
                    setStyle(el)
                }, 200);
            }

            if (el.addEventListener) {
                el.addEventListener('input', function() {
                    setStyle(el, 1);
                }, false);
                setStyle(el)
            } else if (el.attachEvent) {
                el.attachEvent('onpropertychange', function() {
                    setStyle(el)
                })
                setStyle(el)
            }
            if (window.VBArray && window.addEventListener) { //IE9
                el.attachEvent("onkeydown", function() {
                var key = window.event.keyCode;
                if (key == 8 || key == 46) delayedResize(el);

                });
                el.attachEvent("oncut", function() {
                    delayedResize(el);
                }); //处理粘贴
            }   
        
          
            
        }
    }
</script>

<style scoped lang="scss">
    
.SingleBlog{
    width:100%;
    height: 100%;
    background: rgba(248,248,255,0.7);
    .single-content{
        font-size: $titleBtn-FontSize;
        margin: 5% auto;
        width:75%;
        border: 1px dashed yellowgreen;
    }
    .single-content{
        input,textarea{
            margin:3% 0;
            color:rgba(3,2,9,0.9);
            @include fontFamily(cursive);
        }
        h4{
            margin:3% 0;
            @include fontFamily(cursive);
            color: rgba(39,150,250,0.9);
        }
    }
}
h1{
    color: rgba(165,42,42,0.8);  
}
.Single{
/*
    .comment-area{
        height: 800px;
        overflow-y: scroll;
    }
*/
    .comment-area,.publish-comment{
        h2{
            margin-left:-12%;
            width: 75%;  
            color:rgba(0,0,139,0.7);
        }
        #username{
            margin-top:6%;   
            color:cadetblue;
            margin-left: -12%;
            width: 75%;
        }
    }
    
   
}
.Usercomments{
    display: block!important;   
}
.Delcomments{
    display: none;
    margin-left:10px;
}
input,textarea{
    display: block;
    font-size: $input-FontSize;
    border:none;
    text-align: center;
    width: 99%;
    caret-color: auto;
    caret-color: pink;
}
input:focus {
     outline: none;
}
textarea:focus {
     outline: none;
}
#boke-title{
    border:none;
    color: rgba(3, 2, 9, 0.9);
    font-family: cursive;
    font-weight: bold; 
   
    text-align: center!important;
}
.blogContent{
    padding:0 5%;
    border:none!important;
    color: rgba(3, 2, 9, 0.9)!important;
    font-family: cursive!important;
    font-weight: bold!important;
    text-align: center!important;
    
    
}

.el-textarea__inner{
    border:none!important;
    color: rgba(3, 2, 9, 0.9)!important;
    font-family: cursive!important;
    font-weight: bold!important;
    text-align: center!important;
}

#commentsContent{
    display: inline-block;
    border: 1px solid #f3f3f3;
    width: 80%;
    margin: 5% 0;  
    margin-left:4%;
}
textarea::-webkit-input-placeholder {
    padding-top:4%;
    padding-left:2%;
    text-align: left;
}
.CommentArea{
    border: 1px solid #f3f3f3;
    width: 80%;
    margin: 5% 12%;  
    background-color: rgba(246,246,246,0.2);
    @include rounded-corners(5%);
    h3{
        @include fontFamily(cursive)
        color:rgba(255,69,0,0.7);
    }
    ul li{
        .commentArea-b{
            margin: 10px 10px 10px 1%;
            .commentArea-b-r{
                display: inline-flex;
                float: right;
/*                margin-right: 1.5%;*/
                .Reply{
                  margin-left:22px;
                }
                #zanNum{
                    position: relative;
                    vertical-align: middle;
                    display: inline-block;
                }
                .commentTime{
                    color:#666;   
                }
            }
        }
        img{
            width:20px;
            margin-bottom: 70px;
            height: 20px;
        }   
        background-color: rgba(246,246,246,0.4);
        border-bottom: 1px dashed rgba(215,115,201,0.2);
        text-align: left;
        padding-left: 2%;
        margin: 8% 0;
        
        span{
            color:rgba(184,134,11,0.7);
            padding-left:2%;
        }
    }
}
.mt-3, .my-3{
    margin-top:0px;   
}
.VueStar {
    position: relative!important;
    vertical-align: middle!important;
    display: inline-block!important;
}
</style>

<!--https://github.com/OYsun/VueStar/blob/master/README-ZH.MD-->

<!--https://cloud.tencent.com/developer/article/1124181-->
