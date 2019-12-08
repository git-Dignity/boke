const http = require('http');
var util = require('util');


function getInfo(name, options) {
  this.name = name
  this.options = options
}


// 淘宝ip库（运营商、地址）
getInfo.getIpCodeInfo = function (ip, cb) {
  var sina_server = 'http://ip.taobao.com/service/getIpInfo.php?format=json&ip=';
  var url = sina_server + ip;
  // console.log(url)
  http.get(url, function (res) {
    var code = res.statusCode;
    if (code == 200) {
      res.on('data', function (data) {
        // console.log('获取淘宝ip')
        try {

          cb(null, JSON.parse(data));
        } catch (err) {
          cb(err);
        }
      });
    } else {
      console.log('获取淘宝ip err')
      cb({ code: code });
    }
  }).on('error', function (e) { cb(e); });
}


//通过req的hearers来获取客户端ip
getInfo.getIpInfo = function (req) {
  var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0];
  }

  return ip.replace("::ffff:", "");
}


module.exports = getInfo
