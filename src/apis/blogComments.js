  //member.js 用于定义用户的登录、注册、注销等

import req from './http.js'


export const Comments =params=>req('post','/blogComments/comments',params)

export const ShowComments =params=>req('post','/blogComments/showComments',params)

export const Delcomments =params=>req('delete','/blogComments/delcomments',params)
