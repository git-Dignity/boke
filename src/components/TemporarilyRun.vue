<template>
  <div>
    <div class="iconfont zzm-bokedaibanrenwu-xian-copy-copy-copy" @click="outerVisible = true"></div>

    <el-dialog
      title="任务"
      :visible.sync="outerVisible"
      :before-close="handleClose"
      :modal-append-to-body="false"
      width="90%"
      height="100%"
      append-to-body
      center
    >
      <el-dialog
        width="75%"
        height="90%"
        title="不论在什么岗位上，都要努力"
        :visible.sync="innerVisible"
        append-to-body
      ></el-dialog>

      <div class="dialog-footer">
        <el-tabs type="border-card" :stretch="true" :before-leave="thisTabs">
          <el-tab-pane label="代办任务">
            <!-- <div @click="commissionTask"> -->
            <XrTable
              :columns="columns"
              :data="data"
              @on-selection-change="onSelectionChange($event)"
              @on-sort="onSort($event)"
              height="280"
            >
              <!-- 自定义内容 -->
              <!-- 其中 age 是对应的插槽名，{row, col, index} 对应的是行、列、索引这三个参数 -->
              <template v-slot:age="{row, col, index}">{{ row.age + '岁'}}</template>
              <template v-slot:action="{row, col, index}">
                <div :style="{display: 'flex'}">
                  <el-button type="primary" icon="el-icon-edit" size="mini" circle @click.prevent="submit(row.id)"></el-button>
                  <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                </div>
              </template>
            </XrTable>
            <!-- </div> -->
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              <i class="el-icon-date"></i> 已办任务
            </span>
            
              <XrTable
                :columns="columns"
                :data="data"
                @on-selection-change="onSelectionChange($event)"
                @on-sort="onSort($event)"
                height="280"
              >
                <!-- 自定义内容 -->
                <!-- 其中 age 是对应的插槽名，{row, col, index} 对应的是行、列、索引这三个参数 -->
              <template v-slot:age="{row, col, index}">{{ row.age + '岁'}}</template>
                <template v-slot:action="{row, col, index}">
                  <div :style="{display: 'flex'}">
                    <el-button type="primary" icon="el-icon-edit" size="mini" circle @click.prevent="submit(row.id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                  </div>
                </template>
              </XrTable>

          </el-tab-pane>
        </el-tabs>
      </div>

      <div slot="footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XrTable from "./utils/XrTable.vue";
import Sort from "./tool/Sort.vue";
import { ShowAgency, UpdateAgency } from "./../apis/agency.js";

export default {
  name: "temporarilyRun",
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      columns: [
        {
          // 添加全选功能
          type: "selection", // 这个地方可以不用写 key，type 就相当于 key
          width: "180"
        },
        {
          title: "标题",
          key: "title",
          sortable: true,
          width: "180"
        },
        {
          title: "年龄",
          slot: "age", // 用来表明表格的某一列是否需要自定义内容
          sortable: true,
          width: "180"
        },
        {
          title: "内容",
          key: "content",
          width: "180"
        },
        {
          title: "作者",
          key: "author",
          width: "180"
        },
        {
          title: "时间",
          key: "temporarilyRunTime",
          width: "180"
        },
        {
          title: "操作",
          slot: "action",
          width: "180"
        }
      ],
      data: [
        // {
        //   id: 1,
        //   name: "Jasmine",
        //   age: 18,
        //   job: "产品",
        //   desc: "这是展开的描述啊1"
        // },
        // {
        //   id: 2,
        //   name: "Mango",
        //   age: 18,
        //   job: "设计",
        //   desc: "这是展开的描述啊2"
        // },
        // {
        //   id: 3,
        //   name: "Aking",
        //   age: 24,
        //   job: "前端",
        //   desc: "这是展开的描述啊3"
        // },
        // {
        //   id: 4,
        //   name: "Dick",
        //   age: 30,
        //   job: "后端",
        //   desc: "这是展开的描述啊4"
        // },
        // {
        //   id: 5,
        //   name: "Lucy",
        //   age: 18,
        //   job: "测试",
        //   desc: "这是展开的描述啊5"
        // },
        // {
        //   id: 6,
        //   name: "Lucy",
        //   age: 18,
        //   job: "测试",
        //   desc: "这是展开的描述啊5"
        // },
        // {
        //   id: 7,
        //   name: "Lucy",
        //   age: 18,
        //   job: "测试",
        //   desc: "这是展开的描述啊5"
        // }
      ]
    };
  },
  components: {
    XrTable,
    Sort
  },
  created() {
    this.$http
      .post(this.GLOBAL.url_api + "/agency/showAgency",{
        state:1
      })
      .then(function(data) {
        this.data = data.body;
        this.data.forEach(element => {
          element.age=18;
          element.desc = "159"
        });
        // console.log(this.data)
      });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //勾选的时候触发
    onSelectionChange(selectedRows) {
      console.log(selectedRows);
    },
    onSort(key) {
      if (key.sortType === "desc") {
        //因为年龄那加了自定义字，使用变成slot插槽，使用要加多个判断
        if (key.slot) {
          this.data.sort(Sort.sortBy(key.slot, false));
        } else {
          this.data.sort(Sort.sortBy(key.key, false));
        }
      } else {
        if (key.slot) {
          this.data.sort(Sort.sortBy(key.slot, true));
        } else {
          this.data.sort(Sort.sortBy(key.key, true));
        }
      }
    },
    async thisTabs(data){
      if(data==0){
        this.data = await ShowAgency({state:1});
        this.data.forEach(element => {
          element.age=18;
          element.desc = "159"
        });
      }else if(data==1){
        this.data = await ShowAgency({state:0});
        this.data.forEach(element => {
          element.age=18;
          element.desc = "159"
        });
      }
      // console.log(this.data)
    },
    async submit(id){
      await UpdateAgency({id:id})
      UpdateAgency().then(res =>{
        console.log(res);
      })
    }
  }
};
</script>

<style scoped lang="scss">
</style>



// 使用阿里巴巴图标库：https://blog.csdn.net/qq_32113629/article/details/79740949