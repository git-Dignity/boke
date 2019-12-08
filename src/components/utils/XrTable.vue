<template>
  <div class="xr-table" :style="tableStyle">
    <div class="xr-table__header" ref="tableHeader">
      <table ref="tableHeaderTable" >
        <colgroup>
          <col v-for="(col, index) in columns" :key="index" :width="col.width || ''">
        </colgroup>
        <thead >
          <tr>
            <th v-for="col in columns" :key="col.key">
              <div>
                <template v-if="col.type === 'selection'">
                  <input
                    ref="allCheckbox"
                    type="checkbox"
                    :checked="isSelectAll"
                    @change="selectAll"
                  >
                </template>
                <template v-else-if="col.type === 'expand'"></template>
                <template v-else>
                  <span>{{col.title}}</span>
                  <span v-if="col.sortable">
                    <i @click="handleSort(col.key, col.slot, 'asc')">↑</i>
                    <i @click="handleSort(col.key, col.slot, 'desc')">↓</i>
                  </span>
                </template>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="xr-table__body" ref="tableBody">
      <table :style="{width:tableBodyWidth}">
        <colgroup>
          <col v-for="(col, index) in columns" :key="index" :width="col.width || ''">
        </colgroup>
        <tbody>
          <template v-for="(row, index) in data">
            <tr :key="row.id">
              <td v-for="col in columns" :key="col.key">
                <div>
                  <template v-if="col.slot">
                      <!-- row，col，index 是我们需要主动传出去的参数，这样在外面的 slotProps 才能拥有这几个参数，当然我们还可以传其他参数，他们最终都会被放在 slotProps 这一个对象里面 -->
                    <slot :name="col.slot" :row="row" :col="col" :index="index"></slot>
                  </template>
                  <template v-else-if="col.type === 'selection'">
                    <input
                      type="checkbox"
                      :checked="formateStatus(row)"
                      @change="toggleSelect($event, row)"
                    >
                  </template>
                  <template v-else-if="col.type === 'expand'">
                    <span @click="toggleExpand(row.id)">></span>
                  </template>
                  <template v-else>
                    <span>{{row[col.key]}}</span>
                  </template>
                </div>
              </td>
            </tr>
            <tr :key="`expand-${row.id}`" v-if="checkIsExpand(row.id)">
              <td :colspan="columns.length">{{row.desc}}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XrTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: [String, Number],
      default: -1
    }
  },
  data() {
    return {
      selectedRows: [], // 当前已选中的行
      expandIds: [],
      htmlWidth:'',
      tableBodyWidth:'100%'     
    };
  },
  created() {
    window.vm = this;
    this.htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  },
  mounted() {
    let { tableHeader, tableBody } = this.$refs;
    let headerH = parseInt(window.getComputedStyle(tableHeader).height);
    let bodyH = this.height - headerH;
    tableBody.style.height = `${bodyH}px`;
    
    //手机端就让他tbody跟thead一样宽，才可以拖动（因为没有做移动端适配）
    let {tableHeaderTable} = this.$refs;
    console.log(this.htmlWidth)
    setTimeout(()=>{
        if(this.htmlWidth<400){
            this.tableBodyWidth = parseInt(window.getComputedStyle(tableHeaderTable).width) + 'px';
        }
    },1)
    
  },
  computed: {
    tableStyle() {
      return this.height ? `height: ${this.height}px` : '';
    },
    // 表头全选的勾选状态应该根据当前已选的来计算，最好不要直接比较数组长度是否相等，而是应该在比较长度的基础上比较每一项的 id 是否一样，虽然目前看起来这个步骤很多余
    isSelectAll() {
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
      this.$nextTick(() => {
           // 这个是选了部分之后把表头的复选框改变成中间状态（就是横杠的状态）
        this.$refs['allCheckbox'][0].indeterminate =
          selected.length && !isSelectAll;
      });
      return isSelectAll;
    }
  },
  methods: {
       // 单击表头的多选框并向外触发事件
    selectAll(e) {
      let checked = e.target.checked;
      this.selectedRows = checked ? JSON.parse(JSON.stringify(this.data)) : [];
      this.$emit('on-selection-change', this.selectedRows);
    },
     // 单击表体的多选框并向外触发事件
    toggleSelect(e, row) {
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
    // 表体的每个多选框是否被勾选
    formateStatus(row) {
      return this.selectedRows.findIndex(item => item.id === row.id) >= 0;
    },
    handleSort(key, slot, sortType) {
      this.$emit('on-sort', { key, slot, sortType });
    },
    toggleExpand(id) {
      let idx = this.expandIds.indexOf(id);
      if (idx >= 0) {
        this.expandIds.splice(idx, 1);
      } else {
        this.expandIds.push(id);
      }
    },
    checkIsExpand(id) {
      return this.expandIds.indexOf(id) >= 0;
    }
  }
};
</script>

<style lang="scss">
.xr-table {
  overflow: hidden;
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
  &__body {
      height: 220px; 
    overflow: auto;
  }
  .xr-table__header{
    overflow-x: scroll;
  }
  .xr-table__body::-webkit-scrollbar {
    display: none;
    }
}
</style>


// 表格：https://juejin.im/post/5da925bdf265da5b5d205b3f?utm_source=gold_browser_extension