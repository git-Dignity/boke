
import Vuex from 'vuex'
import Vue from 'vue'

 
 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    blogs:[], //所有数据
    currentPage:[],//当前页的数据
    commentsPage:[],
    audiosPage:[],  // 音乐的内容 
    musicPage:[]
  },
  mutations: {
    blogs (state,blogs) {
       state.blogs = blogs.blogs  
    },
    // 删除博客
    del(state,index){
        for(var i=0;i<state.currentPage.length;i++){
            if(state.currentPage[i].id == index){
                state.currentPage.splice(i,1);
            }
        }
    },
    // 展示当前博客的内容
    currentPage(state,page){
      if(state.currentPage.length!=0){
        state.currentPage = [];
      }
      state.currentPage = page;
      // state.currentPage = state.blogs.slice(page.pagenumL,page.pagenumR);
    },
      //评论的内容
      commentsPage(state,page){
          
      if(state.commentsPage.length!=0){
        state.commentsPage = [];
      }
      state.commentsPage = page;
        
      // state.currentPage = state.blogs.slice(page.pagenumL,page.pagenumR);
    },
    // 删除评论
    delcomments(state,index){
        
        for(var i=0;i<state.commentsPage.length;i++){
//            console.log(state.commentsPage[i].id)
            if(state.commentsPage[i].id == index){
                state.commentsPage.splice(i,1);
            }
        }
    },
    // 音乐的内容
    audiosPage(state,page){
      if(state.audiosPage.length!=0){
        state.audiosPage = [];
      }
      state.audiosPage = page;
     
    
    },
    //
    musicPage(state,data){
        state.musicPage = data;
    },
    // 删除歌曲
    delAudio(state,index){
        
        for(var i=0;i<state.audiosPage.length;i++){
           if(state.audiosPage[i].audioName == index){
                state.audiosPage.splice(i,1);
            }
          
        }
    }
  }
})

export default store