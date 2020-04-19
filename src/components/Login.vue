<template>
    <div id="blog-login" @keydown="keyLogin();">
        <canvas id="canvas" style=" height: 100%; width:100%;"></canvas>
        <div class="tab-pane" id="Login">
            <!-- 小鸟 -->
            <div class="pajaro">··</div>
            <div class="layui-form-item">
                <label class="layui-form-label">账号：</label>
                <div class="layui-input-block" style="display: inline-flex;">
                    <b-form-input type="text" id="username"  placeholder="请输入账号"></b-form-input>
                </div>
            </div>
            
            <p />
            
            <div class="layui-form-item">
                <label class="layui-form-label">密码：</label>
                <div class="layui-input-block" style="display: inline-flex;">
                    <b-form-input type="password" id="password"  placeholder="请输入密码"></b-form-input>
                </div>
            </div>
            
            <p />
            
            <div class="layui-form-item">
                <div class="layui-input-block">
                    <b-button id="inp-login" variant="success"  @click.prevent="sub()">登录</b-button>
                    <b-button type="reset" @click.prevent="reset()">重置</b-button>
                </div>
            </div>
           
        </div>
    </div>
</template>


<script>
import jquery from '../../static/jquery-1.9.1.min'
import yudi from '../../static/js/yudi'      // 雨滴

export default{
    
    name:'blog-login',
	data(){
		return{
      loginTime:""
    }
	},
  created(){
      this.loginTime = this.GLOBAL.getNowTime();

let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              

                console.log(redirect);

                
      if(JSON.parse(localStorage.getItem("login"))){
          if(redirect == '/'){
            this.$message({
                  message: '已登录，正在为你返回首页',
                  type: 'success',
                  center: true,
                  showClose: true
                });
              this.$router.push({path: '/index'});
          }else{
              this.$router.push({path: redirect});
              console.log('重定向回去')
          }
      }


  },
	methods:{

	   sub(){
      console.log(this.GLOBAL.encryptChar($("#password").val()+this.GLOBAL.encryptDecryptChar))
        var _this = this;
         this.$axios.post(this.GLOBAL.url_api + '/login',{
              username:$("#username").val(),
              password:this.GLOBAL.encryptChar($("#password").val()+this.GLOBAL.encryptDecryptChar),
              loginTime:this.loginTime,
              userAgent:navigator.userAgent
           
          }).then(res =>{

             let ws = new WebSocket("ws://zhengzemin.cn:8083")  
              ws.onopen = () => {
                // console.log('websocket连接开启...')
               ws.send($("#username").val())
              }
              ws.onmessage = event => {
               
                console.log('数据已接收...')
              }
           // console.log(res)
            if(res.data.msg == 'no'){
                this.$message.error('账号错误，请重新输入');
            }else if(res.data.msg=='passwordErr'){
                this.$message.error('密码错误，请重新输入');
            }else if(res.data.msg == 'upNull'){
                this.$message.error('账号或密码不能为空');
            }else{

                
                 this.$message({
                  message: $("#username").val()+'登录成功！',
                  type: 'success',
                  center: true,
                  showClose: true
                });

//                  let ws = new WebSocket("ws://zhengzemin.cn:8083")  
// ws.onopen = () => {
//   console.log('websocket连接开启...')
//  ws.send($("#username").val())
// }
// ws.onmessage = event => {
 
//   console.log('数据已接收...')
// }

//                  $.ajax({
//     url: `https://sc.ftqq.com/SCU65367Tb142190d7d317c8d414738b1cca181fa5db93f74ea127.send?text=${$('#username').val()}登录了你的网站&desp=登录时间${this.loginTime}`,
//     type: 'get',
//     dataType: 'jsonp',  // 请求方式为jsonp
//      crossDomain: true,
//    success: function(data) {
//     console.log(data);
//    }
//     // data: {}
// });

                // 登录成功的时候发信息到微信通知（Server酱）
                //  $.getJSON(`https://sc.ftqq.com/SCU65367Tb142190d7d317c8d414738b1cca181fa5db93f74ea127.send?text=${$('#username').val()}登录了你的网站&desp=登录时间${this.loginTime}`, function(data){
                //   console.log(data); 
                // });


                var login = {
                    "username":$("#username").val(),
                    "loginId":res.data[0].id
                }
                
                localStorage.setItem("login",JSON.stringify(login));
                // console.log(_this.$router);
                // console.log(_this.$router.query.redirect);
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                // console.log(window.location.href)
                // console.log(this.$route.query)

                console.log(redirect);

                if(redirect == '/'){
                    _this.$router.push({path: '/index'});
                    // console.log('login');
                }else{
                    _this.$router.push({path: redirect});
                    console.log('重定向回去')
                }

                
            }


          }).catch(err =>{
            console.log(err);
          })
                      
       },
       reset(){
            $("#username").val("");
            $("#password").val("");
       },
       keyLogin(){ 
          if (event.keyCode==13)  //回车键的键值为13 

            document.getElementById("inp-login").click(); //调用登录按钮的登录事件 
       } 
	}
}
</script>


<style scoped lang="scss">


#inp-login {
  color: #454545;
  background: transparent;
  border: 2px solid #454545;
  position: relative;
  margin: 1em .5rem;
  padding: 0.5em 1em;
  transition: all 0.3s ease-in-out;
  text-align: center;
  font-family: comfortaa;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}
#inp-login:before, #inp-login:after {
  content: '';
  display: block;
  position: absolute;
  border-color: #454545;
  box-sizing: border-box;
  border-style: solid;
  width: 1em;
  height: 1em;
  transition: all 0.3s ease-in-out;
}
#inp-login:before {
  top: -6px;
  left: -6px;
  border-width: 2px 0 0 2px;
  z-index: 5;
}
#inp-login:after {
  bottom: -6px;
  right: -6px;
  border-width: 0 2px 2px 0;
}
#inp-login:hover:before, #inp-login:hover:after {
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  border-color: #fff;
}
#inp-login:hover {
  color: #353535;
  background-color: #fff;
}
#inp-login:active, #inp-login:focus {
  outline: none;
}

html,
body{
  height:100%;
  background: rgba(248,248,255,0.7);
  font-size: $label-FontSize;
}

    
/*------------------------------------------------------ body of the bird  小鸟
*/

.pajaro{
  background:black;
  border-radius: 50% 50% 20% 20%;
  color:white;
  line-height:20px;
  letter-spacing: 2px;
  font-size:0.8em;
  text-align:center;
  position:absolute;
  top:10%; left:50%;
  margin-top:-20px; margin-left:-10px;
  width:15px; height:15px;
  animation:planeo 8.8s linear infinite;
  z-index:999;
}

.pajaro:after,
.pajaro:before{
  content:"";
  position:absolute;
  top:50%; left:50%;
}

/*------------------------------------------------------ bird wings
*/

.pajaro:after{
  border-radius: 100% 100% 0 0;
  box-shadow: inset 0px 5px 0 black;
  width:100px; height:100px;
  margin-top:-7px; margin-left:-50px;
  transform-origin: 100% 0%;
  animation:alas 4s linear infinite;
}

/*------------------------------------------------------ bird beak
*/

.pajaro:before{
  background:#FFC37F;
  border-radius: 100% 0% 20% 0%;
  margin-top:3px; margin-left:-4px;
  width:6px; height:6px;
  transform:rotateZ(45deg);
}

/*------------------------------------------------------ wings animation
*/

@keyframes alas {
  50%{
    transform:rotateX(-1440deg);
  }
}

/*------------------------------------------------------ bird animation
*/

@keyframes planeo {
  40%{
    transform:rotateZ(2deg) translateX(2px) translateY(10px) translateZ(0);
    line-height:16px;
    font-size:0.6em;
  }
  80%{
    transform:rotateZ(-2deg) translateX(5px) translateY(8px) translateZ(0);
  }
}
</style>


// 登录的时候发信息到微信通知（Server酱）：http://sc.ftqq.com/?c=code

//websocket：https://segmentfault.com/a/1190000013956534