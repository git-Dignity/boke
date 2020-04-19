var db = require('./db.js');
var express = require('express');
var app = express();



//登录
module.exports = app.post('/', function (req, res) {

    var username = req.body.username;
 
	
    if(username != ''){
        db(`select * from login where username = '${username}'`,(err,data)=>{
        	
            if(err){
                console.log(err);
            }else{
                res.send(data).end();
            }
        })
    }
  	
})


