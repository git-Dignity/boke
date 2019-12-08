<template>
  <div class="edit_container">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <button v-on:click="saveHtml">保存</button>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
// 图片推拽上传
import { quillEditor } from "vue-quill-editor";
import * as Quill from "quill"; //引入编辑器
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageDrop", ImageDrop);

export default {
  name: "App",
  data() {
    return {
      content: ``,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], //引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], //列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], //字体
            [{ align: [] }], //对齐方式

            ["clean"], //清除字体样式
            ["image", "video"] //上传图片、上传视频
          ],
          imageDrop: true,
          // imageResize: {
          //   displayStyles: {
          //     width: "50px",
          //     height: "50px"
          //   }
          // }
        },
        theme: "snow"
      }
    };
  },

  created() {

    this.$axios
      .post(this.GLOBAL.url_api + "/blogComments/showComments", {
        id: 117,
        currentPage: 3, // 第几页
        display: 5 // 每页显示条数
      })
      .then(data => {
        data.data.forEach(element => {
          element.commentsContent = Base64.decode(element.commentsContent);
        });
        this.CommentArea = data.data;
      });
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    // 禁用编辑器
    onEditorFocus(val, editor) {
      // 富文本获得焦点时的事件
      console.log(val); // 富文本获得焦点时的内容
      editor.enable(false); // 在获取焦点的时候禁用
    },
    onEditorChange() {}, // 内容改变事件
    saveHtml: function(event) {
      console.log(this.content)
      // this.content = Base64.encode(this.content);

      this.$axios
        .post(this.GLOBAL.url_api + "/blogComments/comments", {
          bokeId: 117,
          commentsContent: this.content,
          commentTime: new Date().toLocaleDateString(),
          author: JSON.parse(localStorage.getItem("login")).username
        })
        .then(data => {
          console.log(this.content)
          // this.content = "";
          // this.CommentArea =data.data;
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>