//入口文件

//1.加载express模块

var mysql = require('mysql');
var express = require('express');
var path = require('path');
var formidable = require('formidable');
const fs = require('fs');
const cors = require("cors"); //可以写ajax实现实现异步跨域，在表头加上http头
const bodyParser = require("body-parser");
const https = require('https');
const http = require('http');
const qs = require('querystring');
var util = require('util');
var history = require('connect-history-api-fallback');


// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// const redis = require('redis')
// let RedisStore = require('connect-redis')(session)
// let redisClient = redis.createClient()
// websocket.js
const ws = require('nodejs-websocket')





const login = require('./router/login.js');
const blog = require('./router/blog.js');
const comments = require('./router/comments.js');
const commentsLike = require('./router/commentsLike.js');
const music = require('./router/music.js');
const upload = require('./router/upload.js');
const log = require('./router/log.js');
const sess = require('./router/session.js');
const setUp = require('./router/setUp.js');

//var mime = require('mime'); //加载mime，为了判断你是什么文件的格式并加载进来

var db = mysql.createConnection({
    host: 'localhost', //主机名，此处为本机
    user: 'root', //mysql 用户名
    password: 'root', //mysql 密码
    database: 'qynbgl' //连接的数据库
});


db.on('error',function(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        reconnection();
    }
});

function reconnection(){
        db = mysql.createConnection({   
            host: 'localhost', //主机名，此处为本机
            user: 'root', //mysql 用户名
            password: 'root', //mysql 密码
            database: 'qynbgl' //连接的数据库
       });
       db.connect(function(err) {
       if(err){
           throw err;
           setTimeout('reconnection()', 1000);
       }
       });
       db.on('error', function(err) {
            console.log(err);
            if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                  reconnection();
            }
       });
}




//2.创建一个app对象（类似于创建一个server对象）
var app = express();
app.use(history());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));





// 先让他进去dist里面，然后把dist页面放到外层
app.use(express.static(path.resolve(__dirname,'../dist')));
app.use(express.static(path.resolve(__dirname,'../')));   //打包好的静态路径

//app.use(express.static(path.join(__dirname,'../dist'))); 

app.get('/',function(req,res){

   const html = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf-8'); // 然后我们在进入dist目录下即可
   res.send(html);
}); 


    // 创建websocket服务
// ws.createServer(connection => {
//     console.log(4545)
//     connection.on('text', function(result) {
//       console.log(result)
//       return result;
//     })
//     connection.on('connect', function(code) {
//       console.log('开启连接', code)
//       return code;
//     })
//     connection.on('close', function(code) {
//       console.log('关闭连接', code)
//     })

//   }).listen(8083)

app.use('/login',login); //登录

// 博客页面
app.use('/blog',blog);

//博客的评论
app.use('/blogComments',comments);

//博客的评论点赞
app.use('/commentsLike',commentsLike);

//录音、歌曲
app.use('/music',music);

app.use('/upload',upload);

//日志
app.use('/log',log);

app.use('/setUp',setUp);

// setInterval(function(){
//     console.log(sess)
// },2000)

//3.启动路由
// app.listen(80,function() {
//   console.log('http:localhost:80');
// })

//配置ssl证书
const httpsOption = {
    key: fs.readFileSync('../2563695_zhengzemin.cn.key'),//证书文件的存放目录
   cert: fs.readFileSync('../2563695_zhengzemin.cn.crt')
}




const WebSocketServer = require('ws').Server; // 引用Server类

// 创建request请求监听器
const processRequest = (req, res) => {
    res.writeHead(200);
    res.end('厉害了，我的WebSockets!\n');
};


// 实例化WebSocket服务器
const wss = new WebSocketServer({
    server: https.createServer(httpsOption, processRequest).listen(8083)
});
// 如果有WebSocket请求接入，wss对象可以响应connection事件来处理
var username;
wss.on('connection', (wsConnect) => {
    console.log('服务器已启动，监听中~');
    wsConnect.on('message', (message) => {
        console.log(`服务器接收到：${message}`);
        username = message;
        wsConnect.send(`服务器回复: ${message}`, (err) => {
            if (err) {
                console.log(`服务器错误：${err}`);
            }
        });
    });
    wsConnect.on('close', (message) => {
        console.log(`他走了`);
              // 登录成功的时候发信息到微信通知（Server酱）
console.log(username)
var push_bark_url;
if(username!=''){
    username += '用户默默离开了';
  push_bark_url = `https://api.day.app/MsrNtY7TVM9vXLqqL47UYh/${qs.escape(username)}?automaticallyCopy=1&copy=optional`;
             
}else{
    push_bark_url = `https://api.day.app/MsrNtY7TVM9vXLqqL47UYh/${qs.escape("进来没干嘛就跑了")}?automaticallyCopy=1&copy=optional`;
   
}
              https.get(push_bark_url, function(res_bark) {
           
                    res_bark.setEncoding('utf-8');
                    var code = res_bark.statusCode;
                    console.log(code)
                    if (code == 200) {
                        res_bark.on('data', function(data) {
                          console.log(data);
                       
                        });
                    } else {
                      console.log('失败');
                    }
              }).on('error', function(e) { console.log(e);console.log('err') });

    });
});






//如果访问http,会重定向到https来
http.createServer(app).listen(80);
https.createServer(httpsOption, app).listen(443);

// 在db文件添加那堆东西，db.query变成db就可以

//websocket：https://segmentfault.com/a/1190000013956534
