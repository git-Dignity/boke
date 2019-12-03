<script type="text/javascript">
const colorList = [
  '#F9F900',
  '#6FB7B7',
  '#9999CC',
  '#FF77FF',
  '#FF79BC',
  '#FF2D2D',
  '#ADADAD'
]

//本系统的管理员账号
const administrator  = 'zheng'
// 在indexhtml那用搜狐查询接口获取ip
const UserIp  = returnCitySN["cip"];  

//获取当前时间
function getNowTime(){      
  var date=new Date();

  var year=date.getFullYear();
  var month=date.getMonth();
  var day=date.getDate();

    var hour=date.getHours();
    var minute=date.getMinutes();
    var second=date.getSeconds();

    //这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
    if (hour<10) {
      hour='0'+hour;
    }
    if (minute<10) {
      minute='0'+minute;
    }
    if (second<10) {
      second='0'+second;
    }


    var x=date.getDay();//获取星期


    var time=year+'/'+month+'/'+day+'/'+hour+':'+minute+':'+second;

    return time;
}

const encryptDecryptChar = "郑泽敏哈~";
// 加密方法
function encryptChar(target) {
    let result = '';
    for (let i = 0, j = 0; j < target.length; j++, i++) {
        let code = target.codePointAt(j);
        result += String.fromCodePoint(code + i + j);
        // 超出BMP的码值，是两个码值表示一个字符
        if (code > 65535) { j += 1; }
    }
    return encodeURIComponent(result);
}

// 解密方法
function decryptChar(target) {
    let newTarget = decodeURIComponent(target);
    let result = '';
    for (let i = 0, j = 0; j < newTarget.length; j++, i++) {
        let code = newTarget.codePointAt(j);
        result += String.fromCodePoint(code - i - j);
        // 超出BMP的码值，是两个码值表示一个字符
        if (code > 65535) {
            j += 1;
        }
    }
    return result;
}


export default
{
  colorList,
  administrator,
  UserIp,
  getNowTime,
  encryptDecryptChar,
  encryptChar,
  decryptChar
}
</script>


 // VUE全局变量：https://www.cnblogs.com/mafeng/p/7723179.html