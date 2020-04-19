<template>
  <div>
    <BlogHeader></BlogHeader>

    <div class="add-blog">


      <div class="addBlog-content">
        <form v-if="!submmited">

          <div class="layui-form-item">
            <label class="layui-form-label">代办标题：</label>
            <div class="layui-input-block" style="display: inline-flex;">
              <b-form-input type="text" id="username" v-model="blog.title" placeholder="请输入代办任务标题"></b-form-input>
            </div>
          </div>

          <p />

          <div class="layui-form-item">
            <label class="layui-form-label">代办内容：</label>
            <div class="layui-input-block" style="display: inline-flex;">
              <b-form-textarea
                style="width:220.4px"
                id="password"
                v-model="blog.content"
                placeholder="请输入代办任务内容"
                rows="3"
                max-rows="6"
              ></b-form-textarea>
            </div>
          </div>

          <p />

          <b-form-group label=" ">
            <b-form-checkbox-group v-model="blog.categories" :options="checkboxOpt"></b-form-checkbox-group>
          </b-form-group>

          <div id="div-autor">
            <b-form-select v-model="blog.author" :options="authorsOpt" class="mb-3">
              <template slot="first">
                <option :value="null" disabled>请选择作者</option>
              </template>
            </b-form-select>
          </div>
        </form>
      </div>

      <p />
        <el-button v-if="!nextAdd" type="primary" plain round v-on:click.prevent="add">添加代办</el-button>
        <el-button v-if="!nextAdd" type="info" plain round v-on:click.prevent="reset">重置</el-button>

         <el-button v-if="nextAdd" type="success" v-on:click.prevent="resAddBoke">突然想起还有任务需要写~</el-button>
     <br />
    </div>
  </div>
</template>

<script>
import BlogHeader from "./BlogHeader.vue";
import axios from "axios";
import { AddAgency } from "./../apis/agency.js";

export default {
  name: "Agency",
  components: {
    BlogHeader
  },
  data() {
    return {
      blog: {
        categoryRadio: "博客",
        title: "",
        content: "",
        categories: [],
        author: "null",
        temporarilyRunTime: ""
      },
      submmited: false,
      checkboxOpt: [
        { text: "生活", value: "生活" },
        { text: "情感", value: "情感" },
        { text: "知识", value: "知识" },
        { text: "励志", value: "励志" }
      ],
      authorsOpt: [
        { value: "Min", text: "Min" },
        { value: "Xia", text: "Xia" },
        { value: "Lin", text: "Lin" }
      ],
      nextAdd:false
    };
  },
  created() {
    var myDate = new Date();
    this.blog.temporarilyRunTime = myDate.toLocaleDateString();
  },
  methods: {
    async add() {
      if (
        this.blog.title != "" &&
        this.blog.content != "" &&
        this.blog.categor != "" &&
        this.blog.author != ""
      ) {
        await AddAgency({
          title: this.blog.title,
          content: this.blog.content,
          state:1,
          categories: this.blog.categories,
          author: this.blog.author,
          temporarilyRunTime: this.blog.temporarilyRunTime
        });

        AddAgency().then(result => {
          console.log(result);
          this.reset();
          this.submmited = true;
          this.nextAdd = true;
          this.$message({
            message: "您的博客添加成功",
            type: "success",
            center: true,
            showClose: true
          });
        });
      } else {
        this.$message({
          message: "亲，以上有未填入的信息~",
          type: "warning",
          center: true,
          showClose: true
        });
      }
    },
    resAddBoke(){
     
      //清空
      this.blog.title='';
          this.blog.content = '';
          this.blog.author='null';
          this.blog.categories = [];
      
       this.submmited = false;
       this.nextAdd = false;
       
    },
    reset(){
      this.blog.title='';
          this.blog.content = '';
          this.blog.author='null';
          this.blog.categories = [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#div-autor {
  width: 80%;
  margin: auto;
  @media screen and (min-width: 600px) {
    width: 21%;
  }
}

.layui-form-item {
  display: flex;
  justify-content: center;
  align-items: Center;
}
h2 {
  color: rgba(0, 0, 139, 0.7);
}
#preview {
  width: 90%;
  height: 200px;
  font-size: $label-FontSize;
  margin: 8% auto;
  p {
    margin: 5% auto;
  }
}
</style>
