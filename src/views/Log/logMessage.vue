<script setup>
import orderMessage from '@/components/breadcrumb.vue'
import newCard from '@/components/newCard.vue'
import logDialog from './components/logDialog.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { useLogServe } from '@/api/log.js'

//面包屑
const userStore = useUserStore()
const breadName = userStore.breadName
//label 下拉框查询数据
const labelData = ref([
  {
    label: '操作类型',
    selectName: [
      { name: '所有' },
      { name: '新增', type: 1 },
      { name: '修改', type: 2 },
      { name: '删除', type: 3 },
      { name: '授权', type: 4 },
      { name: '上传', type: 5 },
      { name: '导入', type: 6 },
      { name: '导出', type: 7 }
    ],
    value: 'type'
  },
  {
    label: '操作模块',
    selectName: [
      { name: '用户管理', title: 0 },
      { name: '角色管理', title: 1 },
      { name: '部门管理', title: 2 },
      { name: '职位管理', title: 3 },
      { name: '权限管理', title: 4 },
      { name: '日志管理', title: 5 }
    ],
    value: 'title'
  },
  {
    label: '操作状态',
    selectName: [
      { name: '成功', status: 0 },
      { name: '失败', status: 1 }
    ],
    value: 'status'
  }
])
//tabaleHead 表格头
const tableTabelHeard = ref([
  { label: '用户', name: 'operName' },
  { label: '用户类型', name: 'operatorType' },
  { label: '用户描述', name: 'businessDesc' },
  { label: '操作模块', name: 'title' },
  { label: '操作类型', name: 'caozuoleixing' },
  { label: '时间', name: 'operTime' },
  { label: '结果', name: 'errResutl' },
  { label: '', name: 'detail' }
])
//传入的表格数据
const total = ref(0)
const tableList = ref([])
const getTableList = async (data) => {
  const res = await useLogServe(data)
  tableList.value = res.data.record
  total.value = res.data.total
  tableList.value.forEach((item) => {
    item.operatorType = '后台用户'
    if (item.errorMsg) {
      item.errResutl = '失败'
    } else {
      item.errResutl = '成功'
    }
    item.caozuoleixing = item.businessDesc.split(':')[1]
  })
}
getTableList()
//点击查询
const querySelect = (data) => {
  getTableList(data)
}
//点击重置
const resetForm = () => {
  getTableList()
}
//点击上下页
const addPage = (data) => {
  console.log(data)
  getTableList(data)
}
const subPage = (data) => {
  getTableList(data)
}
const changePage = (data) => {
  getTableList(data)
}
//点击弹窗详情
const clickDetailDialog = (row) => {
  console.log(row)
  const data = [
    { label: 'IP', data: row.operIp },
    { label: '请求路径', data: row.operUrl },
    { label: '请求方式', data: row.requestMethod },
    { label: '处理方法', data: row.method },
    { label: '请求参数', data: row.operParam },
    { label: '错误信息', data: row.errorMsg },
    { label: '返回内容', data: row.jsonResult }
  ]
  logDialogRef.value.open(data)
}

//弹窗组件的结构日志详情
//弹窗实例
const logDialogRef = ref()
</script>

<template>
  <order-message :breadName="breadName"></order-message>
  <new-card
    :labelData="labelData"
    :tableTabelHeard="tableTabelHeard"
    :addBtn="false"
    :tableList="tableList"
    :total="total"
    @query-select="querySelect"
    @reset-form="resetForm"
    @addPage="addPage"
    @subPage="subPage"
    @changePage="changePage"
    @clickDetailDialog="clickDetailDialog"
  ></new-card>
  <log-dialog ref="logDialogRef"></log-dialog>
</template>

<style lang="less" scoped></style>
