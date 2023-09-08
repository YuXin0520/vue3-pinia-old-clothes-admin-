<script setup>
import orderMessage from '@/components/breadcrumb.vue'
import newCard from '@/components/newCard.vue'
import addJob from './components/addJob.vue'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { usePostServe, usePostDelServe } from '@/api/job.js'
import { myConfirm } from '@/utils/myConfirm.js'
const userStore = useUserStore()
const breadName = userStore.breadName
//table表头数据，name为表单的key值
const tableTabelHeard = ref([
  { label: '职位编号', name: 'code' },
  { label: '职位名称', name: 'name' },
  { label: '备注', name: 'remark' },
  { label: '是否禁用', name: 'status' },
  { label: '操作' }
])
//labelData查询表单的label数据，name为双向绑定请求表单的key
const labelData = ref([{ label: '职位名称', name: 'name' }])
//tableList表格主体数据
const tableList = ref([])
const total = ref(0)
const query = ref({
  size: 10,
  page: 1
})
//调接口获取tabel数据
const getTableList = async (data) => {
  const res = await usePostServe(data)
  tableList.value = res.data.record
  total.value = res.data.total
}
getTableList(query.value)
//点击查询
const querySelectData = (data) => {
  const newQuery = { ...query.value, ...data }
  getTableList(newQuery)
}
//点击重置
const resetformData = () => {
  getTableList(query.value)
}
//点击新增
const addItemData = () => {
  addJobRef.value.openJob()
}
//点击删除
const deleteTableColumn = async (row) => {
  const postId = row.postId
  const confirmRes = await myConfirm()
  if(confirmRes){
    const res = await usePostDelServe({postId})
    if(res.code == 200) ElMessage.success('删除成功')
  }
  getTableList(query.value) 
}

//addjob实例
const addJobRef = ref()
//点击编辑
const editItemData = async (row)=>{
  const name = row.name
  const res = await usePostServe({name})
  const data = res.data.record[0]
  data.deptId = parseInt(data.deptId)
  addJobRef.value.openJob(data,true)
}
//addJobSuccess
const addJobSuccess = ()=>{
  getTableList(query.value) 
}
</script>

<template>
  <order-message :breadName="breadName"></order-message>
  <new-card
    :tableTabelHeard="tableTabelHeard"
    :labelData="labelData"
    :tableList="tableList"
    :total="total"
    :addBtn='true'
    @query-select="querySelectData"
    @reset-form="resetformData"
    @delete-column="deleteTableColumn"
    @add-item="addItemData"
    @edit-item="editItemData"
  >
  </new-card>
  <add-job ref="addJobRef" @addJobSuccess="addJobSuccess"></add-job>
</template>

<style lang="less" scoped></style>
