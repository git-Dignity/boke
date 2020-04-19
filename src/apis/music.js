//member.js 用于定义用户的登录、注册、注销等

import req from './http.js'

export const SearchMusic =params=>req('post','/music/searchMusic',params)

export const SingerSong =params=>req('post','/music/singerSong',params)

export const DelAudio =params=>req('delete','/music/delAudio',params)
