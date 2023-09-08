<script setup>
import { ref,defineExpose } from 'vue'
import { usePermByRoleServe, usePermListServe,useEmpowerPermServe } from '@/api/role.js'
//对话框实例
const dialogRef = ref()
//tree默认展示的数据
const defaultProps = {
  children: 'children',
  label: 'name'
}
//获取权限列表
const permList = ref([])
const getPermList = async () => {
  const res = await usePermListServe()
  //调用函数处理扁平数据
  permList.value = dealTreeData(res.data, 0, [])
}
getPermList()
//tree实例
const treeRef = ref()
//是否弹出权限框
const dialogVisible = ref(false)
//向外暴露方法操作数据
const roleIds = ref()
const roleTreeOpen = async(roleId)=>{
    dialogVisible.value = true
    roleIds.value = roleId
    const res = await usePermByRoleServe({roleId})
    treeRef.value.setCheckedNodes(res.data)
}
//点击提交
const confirmAddRole = async() => {
  const checkedKeys = treeRef.value.getCheckedKeys(false)
  const data = {
    permIds:checkedKeys,
    roleId: roleIds.value
  }
  const res = await useEmpowerPermServe(data)
  if(res.code === 200) ElMessage.success('授权成功')
  dialogVisible.value = false
}

// treeRef.value.setCheckedKeys([1001], false)
//扁平化数组转tree结构
//arr需要处理的数组对象
//id 父级id
//list 处理完返回的数组
const dealTreeData = (arr, parentId, list) => {
  //先拿到一级数据
  arr.forEach((item) => {
    if (item.parentId === parentId) {
      list.push(item)
    }
    //判断是否有children
    if (!item.children && item.type != "BUTTON") {
      item.children = []
      //递归调用继续处理其他层级
      dealTreeData(arr, item.permId, item.children)
    }
  })
  return list
}
defineExpose({
  roleTreeOpen
})
</script>
<template>
  <el-dialog v-model="dialogVisible" title="分配权限 " width="35%" ref="dialogRef">
    <el-scrollbar height="400px">
      <el-tree
        ref="treeRef"
        :data="permList"
        show-checkbox
        node-key="permId"
        :props="defaultProps"
        default-expand-all
      />
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmAddRole"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
