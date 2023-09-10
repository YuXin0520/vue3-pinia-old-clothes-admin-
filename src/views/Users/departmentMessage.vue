<script setup>
import orderMessage from '@/components/breadcrumb.vue'
import card from '@/components/card.vue'
import addDepart from '@/components/addDepart.vue'
import { useUserStore } from '@/stores'
import { getDepartIdData } from '@/utils/departData.js'
import { Edit, Delete, DocumentAdd } from '@element-plus/icons-vue'
import { userDepartDeleteServe,useDepartServe} from '@/api/depart.js'
import { myConfirm } from '@/utils/myConfirm.js'
import { ref } from 'vue'

const userStore = useUserStore()
const breadName = userStore.breadName
//总数据
const departIds = ref([])
//总数
const total = ref(0)
//获取数据
const getDepartIdList = async (params) => {
  const res = await getDepartIdData(params)
  departIds.value = res
  total.value = res.length
}
getDepartIdList()

//获取未处理的部门数据
const departData = ref([])
const getDepartData = async () => {
  const res = await useDepartServe()
  departData.value = res.data
  console.log('departData.value', departData.value)
}
getDepartData()
const addDepartRef = ref()
//操作区
const addForm = async (row) => {
  row.deptIdCas = dealCascader(row.deptId,departData.value,[])
  const addData = deepClone(row)
  addData.name = ''
  if(!addData.parentId) addData.parentId = 0
  addDepartRef.value.openDepart(addData)
  console.log('addForm',addData)
}
const editForm = (row) => {
  row.deptIdCas = dealCascader(row.deptId,departData.value,[])
  const addData = deepClone(row)
  if(addData.deptIdCas.length <= 1) addData.deptIdCas = []
  addDepartRef.value.openDepart(addData,true)
}
const DeleteRow = async (row) => {
  const confirmRes = await myConfirm()
  if (confirmRes) {
    const deptId = row.deptId
    const res = await userDepartDeleteServe({ deptId })
    if (res.code == 200) ElMessage.success('删除成功')
    getDepartIdList()
  }
}
const addDepartSuccess = ()=>{
   getDepartIdList()
}
//处理级联所需能展示的value值,回显
//id 为deptID部门自身id
//arr 为未处理的扁平数据
//blankArr 为空数组
const dealCascader = (id, arr, blankArr) => {
  arr.forEach((item) => {
    if (item.deptId === id) {
      blankArr.push(item.deptId)
      dealCascader(item.parentId, arr, blankArr)
    }
  })
  return blankArr.slice().reverse()
}
//深拷贝函数
const deepClone = (obj) => {
  const tarobj = Object.getPrototypeOf(obj) === Array.prototype ? [] : {}
  for (let key in obj) {
    if (obj[key] && Object.getPrototypeOf(obj[key]) === Object.prototype) {
      tarobj[key] = deepClone(obj[key])
    } else {
      tarobj[key] = obj[key]
    }
  }
  return tarobj
}
</script>
<template>
  <order-message :breadName="breadName"></order-message>
  <card :total="total">
    <template #top>
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="addForm">新增部门</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #main>
      <el-table :data="departIds" style="width: 100%; margin-bottom: 20px" row-key="name" border>
        <el-table-column prop="name" label="部门名称" />
        <el-table-column label="操作" width="180px">
          <template #default="{ row }">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="新增"
              placement="top"
              :enterable="false"
            >
              <el-button type="primary" @click="addForm(row)" :icon="DocumentAdd" circle />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button type="primary" @click="editForm(row)" :icon="Edit" circle />
            </el-tooltip>
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="DeleteRow(row)"
              v-if="!row.children"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </card>
  <add-depart @addDepartSuccess="addDepartSuccess" ref="addDepartRef">

  </add-depart>
</template>

<style lang="less" scoped></style>
