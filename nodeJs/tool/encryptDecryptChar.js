var encryptDecryptChar = {
    "name" : "郑泽敏哈~",
    // 加密方法
    "encryptChar" : function (target) {
        let result = '';
        for (let i = 0, j = 0; j < target.length; j++, i++) {
            let code = target.codePointAt(j);
            result += String.fromCodePoint(code + i + j);
            // 超出BMP的码值，是两个码值表示一个字符
            if (code > 65535) { j += 1; }
        }
        return encodeURIComponent(result);
    },
    // 解密
    "decryptChar" : function (target) {
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
       
        return result.replace(this.name,'');
    }
}

exports = module.exports = encryptDecryptChar;
 


 // 加密 https://juejin.im/post/5db64f5af265da4cf77c8086