<script setup>
import { ref, defineExpose, defineEmits } from 'vue'
import { getDepartIdData } from '@/utils/departData.js'
import {
  userDepartEditServe,
  userDepartAddServe,
  useDepartServe,
} from '@/api/depart.js'
const emit = defineEmits(['addDepartSuccess'])
//是否开启
const dialogVisible = ref(false)
//是否编辑
const editBtn = ref(false)
//表单数据
const addForm = ref({
  type: 0,
  parentId: 0,
  name: ''
})
//表单实例
const addFormRef = ref()
const addFormRules = ref({
  type: [{ required: true, message: '部门类型不能为空', trigger: 'blur' }],
  name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }]
})
const departData = ref([])
//获取未处理的部门数据
const getDepartData = async () => {
  const res = await useDepartServe()
  departData.value = res.data
  console.log('departData.value', departData.value)
}
getDepartData()
//级联数据
const departIds = ref([])
//获取数据
//级联选择器的数据
const props1 = {
  checkStrictly: true,
  label: 'name',
  value: 'deptId'
}
const getDepartIdList = async (params) => {
  const res = await getDepartIdData(params)
  departIds.value = res
}
getDepartIdList()
//改变管理部门
const focusValue = (value) => {
  if(!value) return addForm.value.parentId = 0
  addForm.value.parentId = value[value.length - 1]
  console.log('change', addForm.value)
}
//确认提交
const submitForm = async () => {
  await addFormRef.value.validate()
  console.log(addForm.value)
  if (editBtn.value) {
    const editRes = await userDepartEditServe(addForm.value)
    if (editRes.code === 200) ElMessage.success('编辑成功')
  } else {
    const addRes = await userDepartAddServe(addForm.value)
    if (addRes.code === 200) ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('addDepartSuccess')
}
//暴露个方法给外部操作
const openDepart = (row, edit) => {
  editBtn.value = edit
  dialogVisible.value = true
  addForm.value = {...row}
  addForm.value.type = 0
  console.log('open',addForm.value)
}
const closeDialog = () => {
   dialogVisible.value = false
   addFormRef.value.resetFields()
}
defineExpose({
  openDepart
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="editBtn ? '编辑部门' : '新增部门'"
    width="45%"
    class="dialog_form"
    @close="closeDialog"
  >
    <template #default="{ row }">
      <el-form :rules="addFormRules" :model="addForm" label-width="100px" ref="addFormRef" >
        <el-form-item label="部门类型" prop="type">
          <el-radio-group v-model="addForm.type" class="ml-4">
            <el-radio :label="0" size="large" border>内部</el-radio>
            <el-radio :label="1" size="large" border>外部</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-cascader
            @change="focusValue"
            :options="departIds"
            :props="props1"
            v-model="addForm.deptIdCas"
            clearable
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
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
