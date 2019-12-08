var db = require('./db.js');
var getInfo = require('../tool/ipInfo.js');
var util = require('util');
var express = require('express');
var app = express();


module.exports = app.post('/', function (req, res) {

	var username = req.body.username;
    var login_time = req.body.loginTime;
    var userAgent =req.body.userAgent;
    var oldOperation = req.body.oldOperation;
    var operation =req.body.operation;
    var area,ip,isp;

  ip = getInfo.getIpInfo(req);
  // console.log(ip);

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
    
    // console.log(area,isp);
  })

  if(username != '' ){
  	// 因为20行那拿ip是在插入之后才执行完的，只能先用setTimeout
  	setTimeout(function(){
        db(`insert into log(username,ip,area,isp,userAgent,login_time,login_num,code,login_state,oldOperation,operation)values('${username}','${ip}','${area}','${isp}','${userAgent}','${login_time}','1','操作菜单${operation}','1','${oldOperation}','${operation}')`,(err,data)=>{
        	
            if(err){
                console.log(err);
            }else{
            	res.send(data).end();
            }
        })
     },500);
   }


  	
})

