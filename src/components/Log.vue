<template>
    <div>
       <BlogHeader></BlogHeader>
      
       <div style="margin-top: 20px">
        <el-radio v-model="radio2" label="1" border size="medium">登录日志查询</el-radio>
        <el-radio v-model="radio2" label="2" border size="medium">操作日志查询</el-radio>
      </div>
      <br /><br />

    </div>
</template>

<style>
</style>
<script>
  import jquery from '../../static/jquery-1.9.1.min'
  import BlogHeader from './BlogHeader.vue'
    
  export default {
     components:{
       BlogHeader
    },
    name: 'log',
    data () {
      return {
        radio2: '1',
      
      }
    },
     created(){

     },
      mounted(){
       
      },
  }
</script>

<style scoped>


</style>