<template>
  <div>
    <BlogHeader></BlogHeader>

    <div class="add-blog">

      <div v-if="submmited">
         <el-alert
          title="博客添加成功"
          type="success"
          :description="blog.title"
          show-icon>
        </el-alert>
      </div>

      <div class="addBlog-content">
        <form v-if="!submmited">
          <el-radio-group v-model="blog.categoryRadio" size="medium">
            <el-radio label="博客"></el-radio>
            <el-radio label="代办任务"></el-radio>
          </el-radio-group>

          <p />

          <div class="layui-form-item">
            <label class="layui-form-label">博客标题：</label>
            <div class="layui-input-block" style="display: inline-flex;">
              <b-form-input type="text" id="username" v-model="blog.title" placeholder="请输入博客标题"></b-form-input>
            </div>
          </div>

          <p />

          <div class="layui-form-item">
            <label class="layui-form-label">博客内容：</label>
            <div class="layui-input-block" style="display: inline-flex;">
              <b-form-textarea
                style="width:220.4px"
                id="password"
                v-model="blog.content"
                placeholder="请输入博客内容"
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
        <el-button v-if="!nextAdd" type="primary" plain round v-on:click.prevent="addBoke">添加博客</el-button>
        <el-button v-if="!nextAdd" type="info" plain round>重置</el-button>

         <el-button v-if="nextAdd" type="success" v-on:click.prevent="resAddBoke">还想再添加</el-button>
     <br />
      <!-- <button v-on:click.prevent="post">添加博客</button> -->

      <div id="preview">
        <h2>博客总览</h2>
        <p>添加类别：{{blog.categoryRadio}}</p>
        <p>博客标题：{{blog.title}}</p>
        <p>博客内容：</p>
        <p>{{blog.content}}</p>
        <p>博客分类：</p>
        <ul>
          <li v-for="category in blog.categories" :key="category.title">{{category}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BlogHeader from "./BlogHeader.vue";
import axios from "axios";
import { Addboke } from "./../apis/blog.js";

export default {
  name: "add-blog",
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
        boketime: ""
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
    this.blog.boketime = myDate.toLocaleDateString();
  },
  methods: {
    async addBoke() {
      if (
        this.blog.title != "" &&
        this.blog.content != "" &&
        this.blog.categor != "" &&
        this.blog.author != ""
      ) {
        await Addboke({
          title: this.blog.title,
          content: this.blog.content,
          categories: this.blog.categories,
          author: this.blog.author,
          boketime: this.blog.boketime,
          categoryRadio: this.blog.categoryRadio
        });

        Addboke().then(result => {
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
      this.submmited = false;
       this.nextAdd = false;
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
