var db = require('./db.js');
// var sess = require('./session.js');
var express = require('express');
const http = require('http');
const WebSocket = require('ws');
var app = express(); 

var numClients = 0;

//添加博客
app.post('/addboke',function(req,res){
    //var params = url.parse(req.url, true).query;  //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
   
	var username = req.body.username;
	var title = req.body.title;
	var content = req.body.content;
	var categories = req.body.categories;
	var author = req.body.author;
    var boketime = req.body.boketime;
    console.log(req.body.boketime);
  
    if(title!='' && content!='' && categories!='' && author!='' && boketime!='' ){
    	
		db(`insert into boke(title,content,categories,author,boketime)values('${title}','${content}','${categories}','${author}','${boketime}')`,(err,IntoData)=>{
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


//展示博客
app.post('/showblog',function(req,res){
	

// //统计人数
// io.on('connection', function(socket) {  
//         numClients++;
//         console.log(numClients);
//         // socket.emit('stats', { numClients: numClients });
//         // console.log('Connected clients:', numClients);
//         // socket.on('disconnect', function() {
//         // numClients--;
//         // socket.emit('stats', { numClients: numClients });
//         // console.log('Connected clients:', numClients);
//     // });
// });

	//如果他有参数就是分页
	if(req.body.pagenumL != undefined){
		
		var pagenumL = req.body.pagenumL;  
		var pagenumR = req.body.pagenumR;   
		var currentPage = pagenumR*(pagenumL-1);  
        console.log(pagenumL,pagenumR,currentPage)
		
		db(`select * from boke limit ${currentPage},${pagenumR}`,(err,filterData)=>{
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				// console.log(pagenumL,pagenumR);
				// console.log(filterData);
				res.send(filterData).end();
			}
		})
	}else{
		db(`select * from boke`,function(err,data){
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				// console.log(data);
				res.send(data).end();
			}
		})
	}
	
})


//点击详情	根据id传值
app.get('/singleblog',function(req,res){

	var id = req.query.id;

	db(`select * from boke where id = '${id}'`,function(err,data){
		
		if(err){
			console.log(err);
			res.send("数据库错误").end();
		}else{
			// console.log(data);
			res.send(data).end();
		}
	})
})


//搜索
app.post('/searchblog',function(req,res){
	var title = req.body.title;
	console.log(title);
	if(title != ''){
		db(`select * from boke where title like '%${title}%'`,function(err,data){
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				console.log(data);
				res.send(data).end();
			}
		})
	}else{
		console.log('not title')
		db(`select * from boke limit 0,5`,(err,filterData)=>{
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				// console.log(pagenumL,pagenumR);
				// console.log(filterData);
				res.send(filterData).end();
			}
		})
	}
})


//搜索
app.post('/selectCategory',function(req,res){
	var categories = req.body.categories;
	console.log(categories);
	if(categories != '' && categories!='全部'){
		db(`select * from boke where categories like '%${categories}%'`,function(err,data){
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				console.log(data);
				res.send(data).end();
			}
		})
	
	}else if(categories==='全部'){
		db(`select * from boke limit 0,5`,function(err,data){
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				console.log(data);
				res.send(data).end();
			}
		})
	}

})


//更新博客
app.post('/updateboke',function(req,res){
    //var params = url.parse(req.url, true).query;  //parse将字符串转成对象,req.url="/?url=123&name=321"，true表示params是{url:"123",name:"321"}，false表示params是url=123&name=321
   
	var id = req.body.id;
	var title = req.body.title;
	var content = req.body.content;
	var categories = req.body.categories;
	var author = req.body.author;
    console.log(req.body)
	
//    if(title!='' && content!='' && categories!='' && author!='' ){
    	
		db(`update boke set title = '${title}',content = '${content}',categories = '${categories}',author = '${author}' where id = '${id}'`,(err,IntoData)=>{
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


//删除博客
app.delete('/delblog',function(req,res){
	
	// var id =  req.query.id;
	var id =  req.param("id");
	
	db(`delete from boke where id = '${id}'`,function(err,data){
		if(err){
			console.log(err);
			res.send("database error").end();
		}else{
			console.log(id)
			res.send("删除成功").end();
		}
	})
})


module.exports = app