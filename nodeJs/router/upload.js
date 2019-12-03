var db = require('./db.js');
var express = require('express');
var path = require('path');
var formidable = require('formidable');
const fs = require('fs');
var app = express();

app.post('/Photo',function(req,res){
	var form=new formidable.IncomingForm();

form.uploadDir="./photo/"


form.parse(req,(err,fields,files)=>{
        
        if(err){
            throw err;
        }
        var extname = files.appealFile.name;
        
        // 要改路径，就改这两个变量的路径就好
        const oldPath=__dirname+"/../"+files.appealFile.path;
        // console.log(oldPath);
        const newPath=__dirname+"/../photo/"+extname;
        // console.log(newPath);

    
        fs.rename(oldPath,newPath,(err)=>{
            if(err){
                console.log(err);
                throw Error('改名失败');
            }
            res.send(newPath).end("success");
        })


        //保存dao数据库
        if(extname!='' ){
            db(`update login set photo = '${extname}' where username = '${fields.uploader}'`,(err,IntoData)=>{
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

module.exports = app