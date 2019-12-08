var db = require('./db.js');
var express = require('express');
var app = express();


//评论博客
app.post('/comments',function(req,res){
   
    var id = req.body.id;
	var bokeId = req.body.bokeId;
	var commentsContent = req.body.commentsContent;
    var commentTime = req.body.commentTime;
    var author = req.body.author;
    console.log(req.body.commentsContent);
  
    if(bokeId!='' && commentsContent!='' && author!=''){
    	
		db(`insert into comments(bokeId,commentsContent,author,commentTime)values('${bokeId}','${commentsContent}','${author}','${commentTime}')`,(err,IntoData)=>{
			if(err){
				console.log(err);
				res.send({msg:'数据添加失败'}).end();
			}
			else{
				// console.log(IntoData);
				// res.send(IntoData).end();
				res.send({msg:'添加成功'}).end();
			}
		})
	}else{
          res.send({msg:'数据为空'}).end(); 
    }
})


//显示评论
app.post('/showComments',function(req,res){

	var bokeId = req.body.id;
    var currentPage = req.body.currentPage;  // 第几页
    var display = req.body.display;  // 每页显示条数
    var currentPageA = display*(currentPage-1);  
//    console.log(bokeId)
//    console.log(currentPage)
//    console.log(display)
    
    
    if(currentPage == '' || currentPage == undefined){
    	
        db(`select * from comments  where bokeId = '${bokeId}' limit 5 union All select count(*),"","","","","","" from comments  where bokeId = '${bokeId}'`,function(err,data){
//		0*7 《  （0+1）*7
        
		if(err){
			console.log(err);
			res.send("数据库错误").end();
		}else{
			 console.log('刚刚进来成功');
			res.send(data).end();
		}
	})
    
    }else{
        db(`select * from comments  where bokeId = '${bokeId}' limit ${currentPageA},${display} union All select count(*),"","","","","","" from comments  where bokeId = '${bokeId}' `,function(err,data){

        console.log()
            if(err){
                console.log(err);
                res.send("数据库错误").end();
            }else{
                 console.log('分页成功');
                res.send(data).end();
            }
        })   
    }
    
})


//删除评论
app.post('/delcomments',function(req,res){
	
	var id = req.body.id;
    console.log(id)
	db(`delete from comments where id = '${id}'`,function(err,data){
		if(err){
			console.log(err);
			res.send("database error").end();
		}else{
			res.send("删除成功").end();
		}
	})
})


module.exports = app