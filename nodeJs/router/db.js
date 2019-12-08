var mysql = require('mysql');
var dbInfo = require('./../utils/dbInfo.js')

var dbSql = mysql.createPool(dbInfo);
var db = function(sql,callback){
    dbSql.getConnection(function(err,conn){
        if(err){
            callback(err,null);
        }else{
            conn.query(sql,function(err,results){
                callback(err,results);
            });
            conn.release();
        }
    });
};
 
module.exports = db;


//mysql老是断：https://blog.csdn.net/mhdp820121/article/details/82869892