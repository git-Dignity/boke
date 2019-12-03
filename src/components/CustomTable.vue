<template>
  <!-- 在循环 th 和 td 的时候先判断是否有 type，如果有 type 并且值为 selection 就渲染成复选框 -->
  <div class="xr-table">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">
            <div>
              <!-- 在这里先判断 type -->
              <template v-if="col.type === 'selection'">
                <input ref="allCheckbox" type="checkbox" :checked="isSelectAll" @change="selectAll">
              </template>
              <template v-else>
                <span>{{col.title}}</span>
                <!-- 排序 -->
                 <span v-if="col.sortable">
                  <i @click="handleSort(col.key, 'asc')">↑</i>
                  <i @click="handleSort(col.key, 'desc')">↓</i>
                </span>

              </template>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="col in columns" :key="col.key">
            <div>
              <!-- 在这里先判断 type -->
              <template v-if="col.type === 'selection'">
                <input
                  type="checkbox"
                  :checked="formateStatus(row)"
                  @change="toggleSelect($event, row)"
                >
              </template>
              <template v-else>{{row[col.key]}}</template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  export default{
    props: {
      columns: {
        type: Array,
        default: [],
        required: true,
      },
      data:{
          type: Array,
          default: []
      }
    },
        name : 'customTable',
        data(){
            return{
              columns:this.columns,
              data:this.data,
              selectedRows: [] // 当前已选中的行
            }
        },
        created(){

        },
         computed: {
    isSelectAll() { // 表头全选的勾选状态应该根据当前已选的来计算，最好不要直接比较数组长度是否相等，而是应该在比较长度的基础上比较每一项的 id 是否一样，虽然目前看起来这个步骤很多余
      let all = this.data.map(item => item.id).sort();
      let selected = this.selectedRows.map(item => item.id).sort();
      let isSelectAll = true;
      if (all.length === selected.length) {
        for (let i = 0, len = all.length; i < len; i++) {
          if (all[i] !== selected[i]) {
            isSelectAll = false;
            break;
          }
        }
      } else {
        isSelectAll = false;
      }
      this.$nextTick(() => { // 这个是选了部分之后把表头的复选框改变成中间状态（就是横杠的状态）
        this.$refs['allCheckbox'][0].indeterminate =
          selected.length && !isSelectAll;
      });
      return isSelectAll;
    }
  },
  methods: {
    selectAll(e) { // 单击表头的多选框并向外触发事件
      let checked = e.target.checked;
      this.selectedRows = checked ? JSON.parse(JSON.stringify(this.data)) : [];
      this.$emit('on-selection-change', this.selectedRows);
    },
    toggleSelect(e, row) { // 单击表体的多选框并向外触发事件
      let checked = e.target.checked;
      if (checked) {
        this.selectedRows.push(row);
      } else {
        let idx = this.selectedRows.findIndex(item => item.id === row.id);
        this.selectedRows.splice(idx, 1);
      }
      this.$emit(
        'on-selection-change',
        JSON.parse(JSON.stringify(this.selectedRows))
      );
    },
    formateStatus(row) { // 表体的每个多选框是否被勾选
      return this.selectedRows.findIndex(item => item.id === row.id) >= 0;
    },
    //排序
    handleSort(key, sortType) {
          this.$emit('on-sort', { key, sortType });
        }
  }

    
    }
</script>

<style lang="scss" scoped>
.xr-table {
  overflow-x: scroll;
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td,
  table th {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
}
</style>



// 表格：https://juejin.im/post/5da925bdf265da5b5d205b3f?utm_source=gold_browser_extension