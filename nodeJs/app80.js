const http = require('http');

let sever = http.createServer(function (req,res) {
  res.writeHead(301,{'Location':'https://zhengzemin.cn'});
  res.end();
});

sever.listen(80,'0.0.0.0');