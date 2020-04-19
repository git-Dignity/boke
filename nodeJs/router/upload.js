var db = require('./db.js');
var minioClient = require('./../utils/minio.js');
var express = require('express');
var path = require('path');
var formidable = require('formidable');
const fs = require('fs');
var app = express();

app.post('/Photo', function (req, res) {
    var form = new formidable.IncomingForm();

    // 文件存放的路径
    form.uploadDir = "./photo/"


    form.parse(req, (err, fields, files) => {

        if (err) {
            throw err;
        }
        var extname = files.appealFile.name;
        console.log(files);

        // 要改路径，就改这两个变量的路径就好
        const oldPath = __dirname + "/../" + files.appealFile.path;
        // console.log(oldPath);
        const newPath = __dirname + "/../photo/" + extname;
        // console.log(newPath);


        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.log(err);
                throw Error('改名失败');
            }
            res.send(newPath).end("success");
        })


        //保存dao数据库
        if (extname != '') {
            db(`update login set photo = '${extname}' where username = '${fields.uploader}'`, (err, IntoData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(IntoData);
                }
            })
        } else {
            console.log('数据为空')
        }


    })

})


app.post('/Video', function (req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        if (err) {
            throw err;
        }
        var fileName = files.file.name;
        var filePath = files.file.path;

        // Make a bucket called europetrip.
        // minioClient.makeBucket('europetrip', 'us-east-1', function (err) {
        // if (err) return console.log(err)

        // console.log('Bucket created successfully in "us-east-1".')

        var metaData = {
            'Content-Type': 'application/octet-stream',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }
        // Using fPutObject API upload your file to the bucket europetrip.
        minioClient.fPutObject('europetrip', fileName, filePath, metaData, function (err, etag) {
            if (err) return res.send(err).end();
            console.log('File uploaded successfully.')
            res.send({msg:'success'}).end();
        });
        // });
    })
})

module.exports = app