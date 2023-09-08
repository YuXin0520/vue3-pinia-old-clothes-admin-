<script setup>
import { ref, defineExpose,defineEmits } from 'vue'
import { useAddRoleServe,useEditRoleServe } from '@/api/role.js'
//是否显示弹框
const dialogVisible = ref(false)
const roleEdit = ref(false)
//关闭弹窗触发清空数据校验
//获取表单实例
const roleFormRef = ref()
const closeDialogForm = () => {
  dialogVisible.value = false
  roleFormRef.value.resetFields()
}
//表单数据
const roleForm = ref({})
const roleFormRules = ref({
  roleKey: [{ required: true, message: '请输入角色标识', trigger: 'blur' }],
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
})
//确认提交
const emit = defineEmits(['success'])
const confirmAddRole = async () => {
  await roleFormRef.value.validate()
  if (roleEdit.value) {
    //编辑
    const editRes = await useEditRoleServe(roleForm.value)
    if (editRes.code === 200) ElMessage.success('编辑成功')
  } else {
    //新增
    const addRes = await useAddRoleServe(roleForm.value)
    if (addRes.code === 200) ElMessage.success('添加成功')
  } 
  dialogVisible.value = false
  emit('success',roleEdit.value)
}
//向外暴露一个方法操作内部数据
const openRole = (row, eidt) => {
  roleEdit.value = eidt
  dialogVisible.value = true
  roleForm.value = { ...row }
}
defineExpose({
  openRole
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="roleForm.name ? '编辑角色' : '添加角色'"
    width="42%"
    :before-close="closeDialogForm"
  >
    <el-form
      :model="roleForm"
      class="dialog_form"
      :rules="roleFormRules"
      ref="roleFormRef"
      label-width="80px"
    >
      <el-form-item label="角色标识" prop="roleKey">
        <el-input v-model="roleForm.roleKey" placeholder="请输入角色标识" clearable />
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" placeholder="请输入角色名称" clearable />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="roleForm.remark" placeholder="备注" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialogForm">取消</el-button>
        <el-button type="primary" @click="confirmAddRole"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.dialog_form {
  padding: 40px;
  width: 90%;
  height: 100%;
  border: 1px solid #ccc;
  margin: auto;
}
.el-form-item {
  width: 100%;
}
</style>
