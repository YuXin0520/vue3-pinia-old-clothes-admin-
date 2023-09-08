<script setup>
import orderMessage from '@/components/breadcrumb.vue'
import card from '@/components/card.vue'
import myButton from '@/components/myButton.vue'
import addRole from './components/addRole.vue'
import roleTree from './components/roleTree.vue'
import { useUserStore } from '@/stores'
import { useRoleServe, useDeleteRoleServe } from '@/api/role.js'
import { Edit, Delete, Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
//面包屑
const userStore = useUserStore()
const breadName = userStore.breadName
//角色名称查询
const formData = ref({
  page: 1,
  size: 10
})
//总数
const total= ref(0)
//获取角色表单数据的长度
const formDataLength = Object.values(formData).length
//表格数据
const tableList = ref([])
//获取表格数据
const getTableList = async () => {
  const res = await useRoleServe(formData.value)
  if (res.code === 200) {
    tableList.value = res.data.record
    total.value = res.data.total
  }
}
getTableList()
//selecRoleData 点击查询
const selecRoleData = () => {
  getTableList(formData.value)
}
//重置表单
const resetQuery = () => {
  formData.value.name = ''
  getTableList(formData.value)
}
//点击删除
const deleteRole = async (row) => {
  const roleId = row.roleId
  const confirmRes = await ElMessageBox.confirm(`是否确认删除${row.name}角色`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((e) => e)
  if (confirmRes === 'cancel') ElMessage('取消了删除')
  if (confirmRes === 'confirm') {
    const res = await useDeleteRoleServe({ roleId })
    if (res.code === 200) ElMessage.success('删除成功')
    getTableList()
  }
}
//点击分配权限
const roleTreeRef = ref()
const settingRole = (roleId) => {
  roleTreeRef.value.roleTreeOpen(roleId)
}
const addRoleRef = ref()
//点击打开新增
const addRoleData = () => {
  addRoleRef.value.openRole({})
}
//点击编辑权限
const editRoleForm = (row) => {
  addRoleRef.value.openRole(row, true)
}
//分页
const addPage = ()=>{
  formData.value.page+1
  getTableList(formData.value)
}
const subPage = ()=>{
  formData.value.page-1
  getTableList(formData.value)
}
const changePage = (page)=>{
  formData.value.page = page
  getTableList(formData.value)
}
</script>

<template>
  <order-message :breadName="breadName"></order-message>
  <card :total="total" @addPage="addPage" @subPage="subPage" @changePage="changePage">
    <template #top>
      <el-form :inline="true" :model="formInline" style="margin-top: 20px">
        <el-form-item label="角色名称">
          <el-input v-model="formData.name" clearable />
        </el-form-item>
        <el-form-item>
          <my-button
            :resetBtn="formDataLength ? true : false"
            @querySelect="selecRoleData"
            @resetformData="resetQuery"
            @clickAddBtn="addRoleData"
          ></my-button>
        </el-form-item>
      </el-form>
    </template>
    <template #main>
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="roleKey" label="角色权限标识" width="140" />
        <el-table-column prop="name" label="角色名称" width="140" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="status" label="是否禁用">
          <template #default="{ row }">
            <el-switch v-model="row.status" disabled />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <template v-if="row.roleId != 1">
              <el-button type="primary" @click="editRoleForm(row)" :icon="Edit" circle />
              <el-button type="danger" @click="deleteRole(row)" :icon="Delete" circle />
              <el-tooltip
                class="box-item"
                effect="dark"
                content="分配权限"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="warning"
                  :icon="Setting"
                  circle
                  @click="settingRole(row.roleId)"
                ></el-button>
              </el-tooltip>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <add-role ref="addRoleRef" @success="getTableList()"></add-role>
      <role-tree ref="roleTreeRef"></role-tree>
    </template>
  </card>
</template>

<style lang="less" scoped></style>
