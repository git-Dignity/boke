var db = require('./db.js');
var express = require('express');
var path = require('path');
var formidable = require('formidable');
const fs = require('fs');
var app = express();


//上传录音
app.post('/SoundRecording',function(req,res){
   
   var form=new formidable.IncomingForm();

form.uploadDir="./audio/"


form.parse(req,(err,fields,files)=>{
        
        //报错的时候直接抛出错误
        if(err){
            throw err;
        }
    
//    var a = files['appealFile'][0];
// var b = 0;
// for(var file in files){ b++}
    
    
        //每当触发事件的时候就产生一个随机数
        // var ran=parseInt(Math.random()*89999+10000);

        //    var extname=path.extname(files.appealFile.name); // m4a  改名用的随机数
        var extname = files.appealFile.name;
        
        // 要改路径，就改这两个变量的路径就好
        const oldPath=__dirname+"/../"+files.appealFile.path;
        // console.log(oldPath);
        const newPath=__dirname+"/../audio/"+extname;
        // console.log(newPath);

    
        fs.rename(oldPath,newPath,(err)=>{
            if(err){
                console.log(err);
                throw Error('改名失败');
            }
            res.send(newPath).end("success");
        })
//        ./../../static/audio/${extname}
        //保存dao数据库
        if(extname!='' ){
            db(`insert into music(url,controlList,uploader,uploadTime)values('${extname}','onlyOnePlaying','${fields.uploader}','${fields.uploadTime}')`,(err,IntoData)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(IntoData);
                }
            })
        }else{
            console.log('数据为空')
        }
        
     
    })

})


//搜索歌曲
app.post('/searchMusic',function(req,res){
	var url = req.body.url;
	var name = req.body.name;
	// console.log(url);
	if(url != ''){
		db(`select * from music where url like '%${url}%'`,function(err,data){
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				
				res.send(data).end();
			}
		})
	}else{
		db(`select * from music where uploader like '%${name}%' limit 5 union All select count(*),"","","","" from music`,function(err,data){

            if(err){
                console.log(err);
                res.send("数据库错误").end();
            }else{
                
                res.send(data).end();
            }
        })   
	}
})


//展示录音
app.post('/showMusic',function(req,res){

	var currentPage = req.body.currentPage;  // 第几页
    var display = req.body.display;  // 每页显示条数
    var currentPageA = display*(currentPage-1);   
	
	if(currentPage == '' || currentPage == undefined){
		db(`select * from music limit 5 union All select count(*),"","","","" from music`,(err,filterData)=>{
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				res.send(filterData).end();
			}
		})
	}else{
		db(`select * from music  limit ${currentPageA},${display} union All select count(*),"","","","" from music`,function(err,data){

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


//点击歌手详情	根据id传值
app.post('/singerSong',function(req,res){

	var currentPage = req.body.currentPage;  // 第几页
    var display = req.body.display;  // 每页显示条数
    var currentPageA = display*(currentPage-1); 
	var name = req.query.name;
	console.log(currentPage,display,currentPageA,name);

	// 全部歌曲的第一次进来
	if(name == '全部歌曲' && currentPage == undefined){
		// if(display == undefined && currentPage == undefined){
		db(`select * from music limit 5 union All select count(*),"","","","" from music`,(err,filterData)=>{
			if(err){
				console.log(err);
				res.send({msg:'数据库错误'}).end();
			}else{
				res.send(filterData).end();
			}
		})
	}else if(name == '全部歌曲' && currentPage != undefined){    // 全部歌曲的分页
		db(`select * from music limit ${currentPageA},${display} union All select count(*),"","","","" from music`,function(err,data){

            if(err){
                console.log(err);
                res.send("数据库错误").end();
            }else{
                 console.log('分页成功');
                res.send(data).end();
            }
        })   
	}else if(currentPage == '' || currentPage == undefined){     // 其他歌曲的第一次进来
		db(`select * from music where uploader like '%${name}%' limit 5 union All select count(*),"","","","" from music`,function(err,data){

            if(err){
                console.log(err);
                res.send("数据库错误").end();
            }else{
                
                res.send(data).end();
            }
        })   
	}
	else{
		db(`select * from music where uploader like '%${name}%' limit ${currentPageA},${display} union All select count(*),"","","","" from music`,function(err,data){  // // 其他歌曲的分页

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


//删除歌曲
app.post('/delAudio',function(req,res){
	
	var url = req.body.url;
    console.log(url)
	db(`delete from music where url = '${url}'`,function(err,data){
		if(err){
			console.log(err);
			res.send("database error").end();
		}else{
			res.send(`删除'${url}'成功`).end();
		}
	})
})


module.exports = app