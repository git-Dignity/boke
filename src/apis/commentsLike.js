   //member.js 用于定义用户的登录、注册、注销等

import req from './http.js'


export const LikeInsert =params=>req('post','/commentsLike/likeInsert',params)

export const LikeShow =params=>req('post','/commentsLike/likeShow',params)

