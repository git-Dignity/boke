var mysql = require('mysql');

//公司的mysql
// var dbSql = mysql.createPool({
//     host: 'localhost', //主机名，此处为本机
//     user: 'root', //mysql 用户名
//     password: 'root123', //mysql 密码
//     database: 'qynbgl' //连接的数据库
// });


//远程47.107.103.41
var dbSql = mysql.createPool({
    host: '47.107.103.41', //主机名，此处为本机
    user: 'root', //mysql 用户名
    password: 'root', //mysql 密码
    database: 'qynbgl' //连接的数据库
});




// module.exports = db


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