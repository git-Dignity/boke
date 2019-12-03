var db = require('./db.js');
var express = require('express');
var app = express();

//点赞评论
app.post('/likeInsert',function(req,res){
   
   var commentsId = req.body.commentsId;
    var loginId = req.body.loginId;
    
    // console.log(commentsId,loginId)
    
   
        
        db(`select * from like_table where commentsId = '${commentsId}' and loginId = '${loginId}' `,function(err,data){
		
		if(err){
			console.log(err);
			res.send("数据库错误").end();
		}else{
            
           if(data.length == 0){
                console.log('数据为空');
                           db(`insert into like_table(commentsId,loginId)values('${commentsId}','${loginId}') `,(err,IntoData)=>{
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log('添加成功');
//                            db.query(`select t1.id,t1.username,t2.commentsId from login as t1,like_table as t2 where t1.username = t2.loginId and t2.commentsId = '${commentsId}' `,function(err,data){
                                if(err){
                                    console.log(err)   
                                }
                               
                                res.send(data).end();
//                            })
                        }
                    })
                }else{
                console.log('有数据')   
                  db(`delete from like_table where commentsId = '${commentsId}' and loginId = '${loginId}'`,(err,IntoData)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log('删除成功');
                       res.send(data).end();
            
                }
            })  
                  
                  
                  
           }
		}
	})
        
    	
})


// 显示点赞
app.post('/likeShow',function(req,res){
   
   var bokeId = req.query.id;
   var GroupByLike;
            		

	db(`
update comments  left outer join (select count(commentsId) as num,commentsId  from like_table Group bY commentsId) as likeTables on comments.id =  likeTables.commentsId set zanNum = (case when likeTables.num is not null then likeTables.num else null end) `,function(err,data){
		
		if(err){
			console.log(err);
//			res.send("数据库错误").end();
		}else{
            // console.log('更新点赞次数');

            db(`
            	select count(commentsId) as num,commentsId,loginId  from like_table Group bY commentsId
            	`,function(err,data){
            		 GroupByLike = data;
            		 // console.log(GroupByLike)
            		var str="";
            		// console.log(data);
            		for(let i = 0; i <data.length;i++){
            			
            			db(`
            					select * from like_table where commentsId = '${data[i].commentsId}'
            				`,function(err,result){
            					// console.log(result)
            					for(let j = 0; j < result.length;j++){
            						// console.log(result.length)
            						if(j == result.length-1){
            							if(GroupByLike[i].commentsId == result[j].commentsId){
	            							str+=result[j].loginId;
	            							GroupByLike[i].loginId = str;   
	            							console.log('第一个')
	            						}
            						}else{
	        							if(GroupByLike[i].commentsId == result[j].commentsId){
	            							str+=result[j].loginId+"、";
	            							GroupByLike[i].loginId = str;   
	            							console.log('第er个')
	            						}
            						}
            						
            						
            					}
									str = '';
            				})
            		}
            		// console.log('------')
            		setTimeout(function(){
						for(var t = 0; t < GroupByLike.length;t++){
	            			// console.log(GroupByLike[t].loginId)
			           		db(`
			           				update comments set loginId = '${GroupByLike[t].loginId}' where id = '${GroupByLike[t].commentsId}'
			           			`,function(err,data){
			           			// console.log(data)
			           			// 查询comments表，zanNub为0 则清空loginId
			           			db(`
			           					update comments set loginId  = null where zanNum is null
			           				`,function(err,data){
			           					console.log(data);
			           				})
			           		})
			           }
            		},100)
            		
            		
            	})
           

        //     db.query(`
        // update comments  left outer join (select count(commentsId) as num,commentsId,loginId  from like_table Group bY commentsId) as likeTables on comments.id =  likeTables.commentsId set comments.loginId = (case when likeTables.loginId is not null then likeTables.loginId else null end) `,function(err,data){

        //         if(err){
        //             console.log(err);
        // //			res.send("数据库错误").end();
        //         }else{
        //             console.log('更新点赞次数')
        // //			res.send(data).end();
        //         }
        //     })

		}
	})
    
    setTimeout(function(){
		db(`select id,zanNum,loginId from comments `,function(err,data){
				
			if(err){
				console.log(err);
				res.send("数据库错误").end();
			}else{
				console.log(data);
				res.send(data).end();
			}
		})

    },200)
    
    	
	
})


module.exports = app