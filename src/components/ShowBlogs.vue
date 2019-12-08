<template>
  <div>
    <BlogHeader></BlogHeader>

    <transition name="fade">
      <div v-theme:column="'narrow'" id="show-blogs">
        <h1>博客总览</h1>
        <!--        <input type="text" id="search" v-model="search" v-on:input.prevent = "filteredBlogs()" required lay-verify="required" placeholder="请输入标题进行搜索" autocomplete="off" class="layui-input">  -->

        <div style="margin-top: 15px;">
          <el-input
            id="search"
            v-model="search"
            v-on:input.native="filteredBlogs()"
            required
            lay-verify="required"
            placeholder="请输入标题进行搜索"
            autocomplete="off"
            class="input-with-select"
          >
            <el-select
              v-model="select"
              @change="selectCategory"
              slot="prepend"
              unselectable="on"
              placeholder="请选择"
            >
              <el-option label="全部" value="全部"></el-option>
              <el-option label="生活" value="生活"></el-option>
              <el-option label="情感" value="情感"></el-option>
              <el-option label="知识" value="知识"></el-option>
              <el-option label="励志" value="励志"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <div v-for="(blog,index) in currentPage" class="single-blog" :key="blog.id">
          <!-- <div v-model="index">{{index}}</div> -->
          <router-link v-bind:to="'/blog/singleblog/' + blog.id">
            <h3 v-rainbow>{{blog.title | to-uppercase }}</h3>
          </router-link>
          <article>{{blog.content | snippet }}</article>
          <!--            <div class="icon-close" :class="{'iconClose':delDisplay}" v-on:click.prevent = "close(blog.id,index)">X</div>-->
          <i
            class="el-icon-circle-close"
            :class="{'iconClose':delDisplay}"
            v-on:click.prevent="close(blog.id,index)"
          ></i>
          <span class="NowTime">
            <i>{{blog.boketime}}</i>
          </span>
        </div>
        <div class="btn-up" v-on:click.prevent="bokeup()">上一页</div>
        <div class="btn-next" v-on:click.prevent="bokenext()">下一页</div>
      </div>
    </transition>
    <BlogFooter></BlogFooter>
  </div>
</template>

<script>
import BlogHeader from "./BlogHeader.vue";
import BlogFooter from "./BlogFooter.vue";
import jquery from "../../static/jquery-1.9.1.min";
import qs from "qs";
import {
  ShowBlog,
  SearchBlog,
  SelectCategory,
  Delblog
} from "./../apis/blog.js";
export default {
  components: {
    BlogHeader,
    BlogFooter
  },
  name: "show-blogs",
  data() {
    return {
      delDisplay: false,
      search: "",
      select: "",
      pagenum: 1,
      pagenumL: 0,
      pagenumR: 0,
      blogs: []
    };
  },

  created() {
    this.$http
      .post(this.GLOBAL.url_api + "/blog/showblog")
      .then(function(data) {
        this.blogs = data.body; //初始化所有数据

        // this.$store.commit("currentPage",{pagenumL:0,pagenumR:5}); //初始化
      });
    // easy-mock  测试接口数据
    //    this.$http.get('https://easy-mock.com/mock/5d0884e85fe0103ee3ddde4e/example/address')
    //    .then(function(data){
    //       console.log(data);
    //    })
    //

    this.getCurrentPageData(this.pagenum, 5);

    //如果不是管理员就删除按钮隐藏
    if (
      JSON.parse(localStorage.getItem("login")).username !=
      this.GLOBAL.administrator
    ) {
      this.delDisplay = true;
    }

    // 应该说可以删除d 看戏啊下拉框哪里 手机
    //      var elInp =  document.getElementsByClassName('el-input__inner')[0];
    //      $(".el-input__inner").eq(0).on('focus', function() {
    //    $(this).trigger('blur');
    //    });
  },
  mounted() {
    var elInp = document.getElementsByClassName("el-input__inner")[0];

    elInp.setAttribute("required", "required");
    elInp.setAttribute("unselectable", "on");

    $(".el-input__inner")
      .eq(0)
      .on("focus", function() {
        $(this).trigger("blur");
      });
  },
  methods: {
    async getCurrentPageData(currentPage, pageNum) {
      this.$store.commit(
        "currentPage",
        await ShowBlog({ pagenumL: currentPage, pagenumR: pageNum })
      );

      // this.$http.post(this.GLOBAL.url_api + '/blog/showblog',{pagenumL:currentPage,pagenumR:pageNum})
      // .then(res=>{
      //   console.log(res.body)
      //   this.$store.commit("currentPage",res.body)
      // })
    },
    bokeup() {
      if (this.pagenum > 0) {
        this.pagenum--;
        // console.log(this.pagenum)
        if (this.pagenum >= 0 && this.pagenumL > 0 && this.pagenumR > 5) {
          this.pagenumL -= 5;
          this.pagenumR = this.pagenumL + 5;
          this.$store.commit("currentPage", {
            pagenumL: this.pagenumL,
            pagenumR: this.pagenumR
          });
          // this.blogs = data.body.slice(this.pagenumL,this.pagenumR);
        } else {
          this.pagenum = 1;
          alert("亲，没有数据了~");
        }
      } else {
        alert("亲，当前是第一页~");
      }
      this.getCurrentPageData(this.pagenum, 5);
      // console.log(this.pagenumL,this.pagenumR);
    },
    bokenext() {
      this.pagenum++;

      // console.log(this.blogs)
      // console.log(this.$store.state.blogs)
      // 我删除了，还是this.blogs.length还是以前的值
      if (
        this.pagenum * 5 + 1 <= this.blogs.length ||
        ((this.pagenum - 1) * 5 + 1 <= this.blogs.length &&
          this.blogs.length < this.pagenum * 5 + 1)
      ) {
        this.pagenumL += 5;
        this.pagenumR = this.pagenumL + 5;
        this.$store.commit("currentPage", {
          pagenumL: this.pagenumL,
          pagenumR: this.pagenumR
        });
      } else {
        this.pagenum--;
        alert("亲，没有数据了~");
      }

      this.getCurrentPageData(this.pagenum, 5);
    },
    async close(id, index) {
      if (
        JSON.parse(localStorage.getItem("login")).username ==
        this.GLOBAL.administrator
      ) {
        if (confirm("确认要删除？")) {
          await Delblog({ id: id });
          Delblog().then(result => {
            this.$store.commit("del", id);
          });

          // this.$axios
          //   .post(this.GLOBAL.url_api + "/blog/delblog", {
          //     id: id
          //   })
          //   .then(data => {
          //     // 数据库已经删除，节点未删除
          //     this.$store.commit("del", id);
          //   })
          //   .catch(function(e) {
          //     console.log(e);
          //   });
        }
      } else {
        this.$message.error("非管理员无权删除");
      }
      return;
    },

     

      
    async filteredBlogs() {
      
      //  用then就拿不到
      // await SearchBlog({ title: this.search });
      // SearchBlog().then(result => {
      //   console.log(result);
      //   this.$store.commit("currentPage", result);
      // });

      this.$store.commit("currentPage", await SearchBlog({title:this.search}))
    },
    async selectCategory(event, item) {
      //change 触发事件
      this.$store.commit("currentPage", await SelectCategory({categories:event}))
    }
  },
  computed: {
    //搜索
    // filteredBlogs:function(){
    //   return this.blogs.filter((blog) =>{
    //     return blogs.title.match(this.search);
    //   })
    // },
    currentPage() {
      return this.$store.state.currentPage;
    }
  },
  //局部过滤器
  filters: {
    // "to-uppercase":function(value){
    //   return value.toUpperCase();
    // }
    toUppercase(value) {
      if (value != undefined) {
        return value.toUpperCase();
      }
    }
  },
  //自定义指令
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color =
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media screen and (min-width: 600px) {
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-input__inner {
  color: transparent;
  width: 200%;
  margin-left: -100%;
  outline: none;
  caret-color: transparent;
  caret-color: white;
}

h1 {
  text-shadow: -1px -1px #dbe3f9, 1px 1px #666;
}
#show-blogs {
  max-width: 800px;
  margin: 5% auto;
  border-radius: 15px;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #fafafa;
  border-radius: 15px;
  position: relative;
  box-shadow: 5px 10px 9px rgba(51, 204, 255, 0.5);
  h3 {
    @include fontFamily(cursive);
    text-shadow: -1px -1px white, 1px 1px #666;
  }

  .el-icon-circle-close {
    position: absolute;
    right: 2%;
    top: 6%;
    font-size: 22px;
  }
  .NowTime {
    position: absolute;
    right: 2%;
    bottom: 2%;
    text-shadow: -1px -1px white, 1px 1px #666;
    font-size: 12px;
  }
}
.iconClose {
  display: none !important;
}
#single-blogs a {
  color: #444;
  text-decoration: none;
}
input[type="text"] {
  padding: 8px;
  margin: 15px 0;
  width: 100%;
  box-sizing: border-box;
}

article {
  font-family: inherit;
  padding-top: 10px;
}
.btn-next,
.btn-up {
  display: inline;
  font-size: $titleBtn-FontSize;
  padding: 15px;
  @include rounded-corners(50%);
  cursor: pointer;
  background: rgba(0, 255, 127, 0.8);
}
.btn-next:hover {
  font-size: 22px;
  box-shadow: 3px 3px 1px rgba(245, 245, 245, 0.3);
}
.btn-up:hover {
  font-size: 22px;
  box-shadow: 3px 3px 1px rgba(245, 245, 245, 0.3);
}
#search {
  border-radius: 3%;
}
a:hover {
  text-decoration: none;
}
</style>
