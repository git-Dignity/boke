<template>
  <div>
    <span class="iconfont zzm-bokedaibanrenwu-xian-copy-copy-copy" @click="outerVisible = true"></span>

  
  <el-dialog 
     title="任务"
     :visible.sync="outerVisible" 
     :before-close="handleClose" 
     :modal-append-to-body='false' 
     width="90%"
     height="100%" 
     center
     >
          <el-dialog
            width="75%"
            height="90%"
            title="内层 Dialog"
            :visible.sync="innerVisible"
           
            append-to-body>
          </el-dialog>

          <div  class="dialog-footer">
            <el-tabs type="border-card" stretch="true">
              <el-tab-pane label="代办任务">

               
                <CustomTable 
                    :columns="columns" 
                    :data="data" 
                    @on-selection-change="onSelectionChange"
                    @on-sort="onSort"
                    ></CustomTable>
            
                
              </el-tab-pane>
               <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 已办任务</span>
                已办任务
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
  import CustomTable from './CustomTable.vue'
    
    export default{
        name : 'temporarilyRun',
        data(){
            return{
              outerVisible:false,
              innerVisible:false,

               columns: [
                  {
                    // 添加全选功能
                    type: 'selection'  // 这个地方可以不用写 key，type 就相当于 key
                  },
                  {
                    title: '姓名',
                    key: 'name',
                    sortable: true
                  },
                  {
                    title: '年龄',
                    key: 'age',
                    sortable: true
                  },
                  {
                    title: '职位',
                    key: 'job'
                  }
                ],
                data: [
                  {
                    id: 1,
                    name: 'Jasmine',
                    age: 18,
                    job: '产品',
                    desc: '这是展开的描述啊1'
                  },
                  {
                    id: 2,
                    name: 'Mango',
                    age: 18,
                    job: '设计',
                    desc: '这是展开的描述啊2'
                  },
                  {
                    id: 3,
                    name: 'Aking',
                    age: 24,
                    job: '前端',
                    desc: '这是展开的描述啊3'
                  },
                  {
                    id: 4,
                    name: 'Dick',
                    age: 30,
                    job: '后端',
                    desc: '这是展开的描述啊4'
                  },
                  {
                    id: 5,
                    name: 'Lucy',
                    age: 18,
                    job: '测试',
                    desc: '这是展开的描述啊5'
                  }
                ],

            }
        },
        components:{
           CustomTable
        },
        methods: {
            handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },
          //勾选的时候触发
          onSelectionChange(){
            console.log('selection')
          }
        }
    
    }
</script>

<style scoped lang="scss">



</style>



// 使用阿里巴巴图标库：https://blog.csdn.net/qq_32113629/article/details/79740949