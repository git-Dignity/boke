var db = require('./db.js');
var getInfo = require('./ipInfo.js');
var encryptDecryptChar = require('../tool/encryptDecryptChar.js');
// var sess = require('./session.js');
const https = require('https');
const qs = require('querystring');
var util = require('util');

var express = require('express');
var app = express();



//登录
module.exports = app.post('/', function (req, res) {

 


    // var params = url.parse(req.url, true).query;  //parse将字符串转成对象,
    // req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
    var username = req.body.username;
    var password =req.body.password;
    var login_time = req.body.loginTime;
    var userAgent =req.body.userAgent;
    password = encryptDecryptChar.decryptChar(password)
	// console.log(password);
	console.log(username);

  var area,ip,isp;

  ip = getInfo.getIpInfo(req)

  getInfo.getIpCodeInfo(ip, function(err, msg) {
   
    if(msg!=undefined){
        if(msg.code===0){
          // 表示请求成功
          area = msg.data.country+msg.data.region+msg.data.city;
          isp = msg.data.isp;
          // console.log(isp+"获取到")
        }
     }else{
      // console.log('淘宝ip异常')
     }
     
  })

  // ipInfo('113.71.37.170', function(err, msg) {
  //     console.log('城市: ' + msg.city);
  //     console.log('msg: ' + util.inspect(msg, true, 8));
  // })

	
    if(username != '' && password != ''){
        db(`select * from login where username = '${username}'`,(err,data)=>{
        	
            if(err){
                console.log(err);
            }else{
                if(data.length==0){
                    
                    res.send({msg:'no'}).end();
                }else{
                    if(data[0].password == password){
                      // 因为24行那拿ip是在插入之后才执行完的，只能先用setTimeout
                          setTimeout(function(){
                              db(`insert into log(username,ip,area,isp,userAgent,login_time,login_num,code,login_state)values('${username}','${ip}','${area}','${isp}','${userAgent}','${login_time}','1','${JSON.stringify(data)}','1')`,(errLog,dataLog)=>{
                                   // console.log('插入登录用户信息成功')
                              });
                          },500);

                     

              // 登录成功的时候发信息到微信通知（Server酱）
              // http 模块 url 编码中文问题(qs.escape)
              var push_wx_url = `https://sc.ftqq.com/SCU65367Tb142190d7d317c8d414738b1cca181fa5db93f74ea127.send?text=${username}<br>`+qs.escape('用户登录了你的网站')+'&desp='+qs.escape('登录时间')+login_time +qs.escape('\n\n网址：zhengzemin.cn');
              https.get(push_wx_url, function(res) {
           
                    res.setEncoding('utf-8');
                    var code = res.statusCode;
                    if (code == 200) {
                        res.on('data', function(data) {
                          // console.log(data);
                       
                        });
                    } else {
                      console.log('失败');
                    }
              }).on('error', function(e) { console.log(e);console.log('err') });

                         res.send(data).end();

                    }else{
                      // 因为24行那拿ip是在插入之后才执行完的，只能先用setTimeout
                    	setTimeout(function(){
                        db(`insert into log(username,ip,area,isp,userAgent,login_time,login_num,code,login_state)values('${username}','${ip}','${area}','${isp}','${userAgent}','${login_time}','1','passwordErr','0')`,(errLog,dataLog)=>{
                           // console.log('插入登录用户信息成功')
                        });
                      },500)

                        res.send({msg:'passwordErr'}).end();
                    }
                }
            }
        })
    }else{
   
        res.send({msg:'upNull'}).end();   
    }
  	
})




// 登录的时候发信息到微信通知（Server酱）：http://sc.ftqq.com/?c=code