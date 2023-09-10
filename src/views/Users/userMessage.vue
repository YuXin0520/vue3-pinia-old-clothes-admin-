<script setup>
import orderMessage from '@/components/breadcrumb.vue'
import card from '@/components/card.vue'
import addUser from './components/addUser.vue'
import { useUserStore } from '@/stores'

import {
  useUsersSever,
  useDeleteUsersServe,
  useResetUsersServe,
  useStatusUsersServe,
} from '@/api/users.js'
import { Edit, Delete, Setting,  } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

//1.获取面包屑
const userStore = useUserStore()
const breadName = userStore.breadName
//2.1获取表格数据
const tableList = ref([])
//3.1准备请求的表单数据对象
const formData = ref({
  page:1,
  size:10,
  account: '',
  name: ''
})
//表格总条数
const total = ref(0)
const getTableData = async (params) => {
  const resTable = await useUsersSever(params)
  tableList.value = resTable.data.record
  dealTableList(tableList.value)
  total.value = resTable.data.total
}
//初始化表格
getTableData()
//点击根据参数查询
const getClickTableList = () => {
  getTableData(formData.value)
}
//3.2重置表单数据
const formRef = ref()
const resetformData = () => {
  formRef.value.resetFields()
  formData.value = {
  page:1,
  size:10,
  account: '',
  name: ''
}
  getTableData()
}
//点击删除
const DeleteUser = async (userId) => {
  const confirmRes = await ElMessageBox.confirm('确定删除该用户？', '提示', {
    type: 'warning'
  }).catch((e) => e)
  if (confirmRes === 'cancel') ElMessage('取消了删除')
  if (confirmRes === 'confirm') {
    const res = await useDeleteUsersServe({ userId })
    if (res.code === 200) ElMessage.success('删除成功')
    getTableData()
  }
}
//点击重置密码
const resUserPassword = async (row) => {
  const userId = row.userId
  const res = await useResetUsersServe(userId)
  row.visible = false
  if (res.code === 200) ElMessage.success('重置成功')
}
//点击修改状态
const editStatus = async(row)=>{
  const status = row.status ? 1 : 0
  const userId = row.userId
  const res = await useStatusUsersServe({status,userId})
  if(res.code === 200) ElMessage.success('修改用户状态成功')
}
//把后端数据返回的数据处理成表格格式
const dealTableList = (data) => {
  data.forEach((item) => {
    if (item.deptInfos) {
      const postNameArr = []
      item.deptInfos.forEach((child) => {
        postNameArr.push(child.postName)
      })
      item.postName = postNameArr.join('、')
    }
    if (item.roleInfos) {
      const roleNameArr = []
      item.roleInfos.forEach((child) => {
        roleNameArr.push(child.roleName)
      })
      item.roleName = roleNameArr.join('、')
    }
  })
}
const dialogForm = ref({
  account: '', //账号
  name: '', //用户名
  phoneNumber: '', //手机号
  postIds: [], //职位ID
  roleIds: [], //角色ID
  notifiedFlag: true, //是否接收通知标志
  userId:'',
  status:false
})
//获取dialogeidt实例
const dialogEidtRef = ref()
//点击添加用户信息
const addUserData = ()=>{
  dialogEidtRef.value.dilaogEidtFunction({notifiedFlag:true})
}
//编辑用户信息
const editUserForm = async(row) =>{
  //console.log(res)
  dialogForm.value = {...row}
  dialogForm.value.postIds = []
  dialogForm.value.roleIds = []
  row.deptInfos.forEach(item=>{
    dialogForm.value.postIds.push(item.postId)
  })
  row.roleInfos.forEach(item=>{
    dialogForm.value.roleIds.push(item.roleId)
  })
  dialogEidtRef.value.dilaogEidtFunction(dialogForm.value,true)
}
//分页
const addPage = ()=>{
  formData.value.page+1
  getTableData(formData.value)
}
const subPage = ()=>{
  formData.value.page-1
  getTableData(formData.value)
}
const changePage = (page)=>{
  formData.value.page = page
  getTableData(formData.value)
}
</script>

<template>
  <order-message :breadName="breadName"></order-message>
  <card :total="total" @addPage="addPage" @subPage="subPage" @changePage="changePage">
    <!--表格头部区-->
    <template #top>
      <el-form :inline="true" :model="formInline" ref="formRef" style="margin-top: 20px">
        <el-form-item label="账号">
          <el-input v-model="formData.account" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.name" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getClickTableList">查询</el-button>
          <el-button plain="" @click="resetformData">重置</el-button>
          <el-button type="primary" @click="addUserData">新增</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!--表格主体区-->
    <template #main>
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号 "></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="deptInfos[0]postName" label="职位"></el-table-column>
        <el-table-column label="是否禁用">
          <template #default="{ row }">
            <el-switch v-model="row.status" :disabled="row.userId === 1 ? true : false" @change="editStatus(row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否接收短信通知">
          <template #default="{ row }">
            <el-switch v-model="row.notifiedFlag" disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template #default="{ row }">
            <el-button
              type="primary"
              @click="editUserForm(row)"
              :icon="Edit"
              circle
              v-if="row.userId !== 1"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="DeleteUser(row.userId)"
              v-if="row.userId !== 1"
            />
            <el-popover :visible="row.visible" placement="top" :width="220" trigger="click">
              <p>确定重置{{ row.name }}的密码?(重置后密码为: 666666)</p>
              <div style="text-align: right; margin: 0">
                <el-button size="small" text @click="row.visible = false">取消</el-button>
                <el-button size="small" type="primary" @click="resUserPassword(row)"
                  >确认</el-button
                >
              </div>
              <template #reference>
                <el-button
                  type="warning"
                  :icon="Setting"
                  circle
                  @click="row.visible = true"
                  v-if="row.userId !== 1"
                />
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!--dialog-->
      <add-user ref="dialogEidtRef" @success="getTableData()"></add-user>
    </template>
  </card>
</template>

<style lang="less" scoped>

.label_slot {
  margin-left: -10px;
  margin-right: 10px;
  vertical-align: bottom;
  margin-top: 2px;
}
</style>
