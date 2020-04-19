var db = require('./db.js');
var express = require('express');
var app = express(); 

app.post('/addAgency',function(req,res){
    //var params = url.parse(req.url, true).query;  //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
   
    // state 0表示完成，1表示暂办
	var username = req.body.username;
	var title = req.body.title;
    var content = req.body.content;
    var state = req.body.state;
	var categories = req.body.categories;
	var author = req.body.author;
    var temporarilyRunTime = req.body.temporarilyRunTime;
    console.log(req.body.state);
  
    if(title!='' && content!='' && state!=undefined && categories!='' && author!='' && temporarilyRunTime!='' ){
    	
		db(`insert into temporarilyrun(title,content,state,categories,author,temporarilyRunTime)values('${title}','${content}','${state}','${categories}','${author}','${temporarilyRunTime}')`,(err,IntoData)=>{
			if(err){
				console.log(err);
				res.send({msg:'数据添加失败'}).end();
			}
			else{
				console.log(IntoData);
				// res.send(IntoData).end();
				res.send({msg:'添加成功'}).end();
			}
		})
	}else{
          res.send({msg:'数据为空'}).end(); 
    }
})

app.post('/showAgency',function(req,res){
    var state = req.body.state;
    console.log(typeof(state));
    if(state==0){
        console.log(456)
        db(`select * from temporarilyrun where state=0`,(err,data)=>{
            if(err){
                console.log(err);
                res.send({msg:'数据库错误'}).end();
            }else{
                console.log(data);
                res.send(data).end();
            }
        })
    }else if(state==1){
        console.log(852)
        db(`select * from temporarilyrun where state=1`,(err,data)=>{
            if(err){
                console.log(err);
                res.send({msg:'数据库错误'}).end();
            }else{
                res.send(data).end();
            }
        })
    }else{
        console.log('no')
        res.send({msg:'数据为空'}).end(); 
  }
            
       
        
    })


    app.post('/updateAgency',function(req,res){
        //var params = url.parse(req.url, true).query;  //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
       
        var id = req.body.id;
        
    //    if(title!='' && content!='' && categories!='' && author!='' ){
            
            db(`update temporarilyrun set state = '0' where id = '${id}'`,(err,IntoData)=>{
                if(err){
                    console.log(err);
                    res.send({msg:'数据更新失败'}).end();
                }
                else{
                    console.log(IntoData);
                    // res.send(IntoData).end();
                    res.send({msg:'更新成功'}).end();
                }
            })
    //	}
    })

module.exports = app