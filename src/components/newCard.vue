<script setup>
/*
自定义封装card组件
@resetBtn               是否展示重置按钮默认true                       boolean
@total                  table数据的总条数                             string
@formData               查询表单的数据                                boject
@labelData              查询表单的label字段,name为绑定formData的key    array(obj)
@tableTabelHeard        table表头label字段，name为绑定tableList的key   array(obj)
@tableList              table表格的数据                               array(obj)
---方法
@query-select                点击查询按钮
@add-item                    点击添加按钮
@delete-column               点击删除按钮
@reset-form                  点击重置按钮
@edit-item                   点击编辑按钮
@subPage                     点击上一页
@subPage                     点击下一页
@changePage                  点击页码
@clickDetailDialog           点击详情
*/
import { ref, watch, defineProps, defineEmits } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
const props = defineProps([
  'total',
  'formData',
  'labelData',
  'tableTabelHeard',
  'tableList',
  'addBtn'
])
const emit = defineEmits([
  'query-select',
  'reset-form',
  'delete-column',
  'add-item',
  'edit-item',
  'addPage',
  'subPage',
  'changePage',
  'clickDetailDialog'
])
//查询事件
const query = () => {
  emit('query-select', formData.value)
}
//新增事件
const addData = () => {
  emit('add-item')
}
//重置事件
const reset = () => {
  formData.value = {}
  emit('reset-form')
}
//点击编辑事件
const editForm = (row) => {
  emit('edit-item', row)
}
//点击删除事件
const DeleteRow = (row) => {
  emit('delete-column', row)
}
//下一页
const nextClick = () => {
  formData.value.page++
  emit('addPage', formData.value)
}
//上一页
const prevClick = () => {
  formData.value.page--
  emit('subPage', formData.value)
}
//点击页数
const currentChange=(page)=>{
  formData.value.page = page
  emit('changePage', formData.value)
}
//点击详情
const detailDialog = (row)=>{
  emit('clickDetailDialog',row)
}
//接收是否启动添加按钮
const addBtn = props.addBtn
//接收传进来的表头数据
const tableTabelHeard = props.tableTabelHeard
//接收传进来的查询label数据
const labelData = props.labelData
//input的双向数据绑定--向外提供
const formData = ref({
  page: 1,
  size: 10
})
//接收传进来的表格数据
const tableList = ref([])
watch(
  () => props.tableList, //监听
  () => {
    tableList.value = props.tableList
  }
)
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true">
          <template v-if="labelData[0].name">
            <el-form-item :label="item.label" v-for="(item, index) in labelData" :key="index">
              <el-input v-model="formData[item.name]" />
            </el-form-item>
          </template>
          <template v-if="labelData[0].selectName">
            <el-form-item :label="item.label" v-for="(item, index) in labelData" :key="index">
              <el-select v-model="formData[item.value]" placeholder="请选择">
                <el-option
                  v-for="formItem in item.selectName"
                  :key="formItem.name"
                  :label="formItem.name"
                  :value="formItem[item.value]"
                />
              </el-select>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
            <el-button plain @click="reset" v-if="resetBtn ? false : true">重置</el-button>
            <el-button type="primary" @click="addData" v-if="addBtn">新增</el-button>
          </el-form-item>
        </el-form>
        <slot name="top"></slot>
      </div>
    </template>
    <div class="card-main">
      <el-table :data="tableList">
        <el-table-column
          :prop="item.name"
          :label="item.label"
          v-for="(item, index) in tableTabelHeard"
          :key="index"
        >
          <!--errorMsg-->
          <template #default="{ row }" v-if="item.name == 'errResutl'">
            <el-text
              class="mx-1"
              size="large"
              :type="row.errResutl == '成功' ? 'success' : 'danger'"
              >{{ row.errResutl }}</el-text
            >
          </template>
          <!--根据status是否启用switch-->
          <template #default v-if="item.name == 'status'">
            <el-switch v-model="item.status" disabled></el-switch>
          </template>
          <!--detail-->
          <template #default="{ row }" v-if="item.name == 'detail'">
            <el-button plain @click="detailDialog(row)">详情</el-button>
          </template>
          <!--如果不传name就启动-->
          <template #default="{ row }" v-if="!item.name">
            <el-button
              type="primary"
              @click="editForm(row)"
              :icon="Edit"
              circle
              v-if="row.code !== 'admin'"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="DeleteRow(row)"
              v-if="row.code !== 'admin'"
            />
            <slot name="btn"></slot>
          </template>
        </el-table-column>
      </el-table>
      <slot name="main"></slot>
    </div>
    <div class="card-footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="currentChange"
      />
    </div>
  </el-card>
</template>

<style scoped>
.box-card {
  margin-top: 15px;
}
.card-header {
  margin-top: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
.card-footer {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}
.success {
  color: greenyellow;
}
.error {
  color: red;
}
</style>
