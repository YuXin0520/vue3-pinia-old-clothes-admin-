<script setup>
import { ref, defineExpose, defineEmits } from 'vue'
import { useEditJobServe, useAddJobServe } from '@/api/job.js'
import { useDepartServe } from '@/api/depart.js'
const departData = ref([])
const departIds = ref()
//获取部门的数据
const getDepartData = async () => {
  const res = await useDepartServe()
  departData.value = res.data
  console.log('departData.value', departData.value)
}
getDepartData()
//是否显示弹框
const dialogVisible = ref(false)
const jobEdit = ref(false)
//关闭弹窗触发清空数据校验
//获取表单实例
const jobFormRef = ref()
const closeDialogForm = () => {
  dialogVisible.value = false
  jobFormRef.value.resetFields()
}
//表单数据
const jobForm = ref({})
const jobFormRules = ref({
  code: [{ required: true, message: '请输入职位编号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入职位名称', trigger: 'blur' }],
  deptId: [{ required: true, message: '请选择管理部门', trigger: 'blur' }]
})
//确认提交
const emit = defineEmits(['addJobSuccess'])
const confirmAddRole = async () => {
  await jobFormRef.value.validate()
  console.log('confirmAddRole.value', jobForm.value)
  if (jobEdit.value) {
    //编辑
    if(jobForm.value.deptId instanceof Array){
       jobForm.value.deptId = jobForm.value.deptId[jobForm.value.deptId.length-1]
    }
    const editRes = await useEditJobServe(jobForm.value)
    if (editRes.code === 200) ElMessage.success('编辑成功')
  } else {
    //新增
    const addRes = await useAddJobServe(jobForm.value)
    if (addRes.code === 200) ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('addJobSuccess', jobEdit.value)
}
//向外暴露一个方法操作内部数据
const openJob = (row, eidt) => {
  jobEdit.value = eidt
  dialogVisible.value = true
  jobForm.value = { ...row }
  jobForm.value.deptId = dealCascader(jobForm.value.deptId, departData.value, [])
}
//级联选择器的数据
const props1 = {
  checkStrictly: true,
  label: 'name',
  value: 'deptId'
}
//把数据转成级联选择的格式
const getDepartId = async () => {
  const res = await useDepartServe()
  departIds.value = dealTreeData(res.data, 0, [])
  departIds.value = dealChildren(departIds.value)
  console.log('departIds', departIds.value)
}
getDepartId()

const focusValue = (value) => {
  if (!value) return
  jobForm.value.deptId = value[value.length - 1]
  console.log('deptId', jobForm.value.deptId)
  console.log('focusValue', value)
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
//转树形结构
const dealTreeData = (arr, parentId, list) => {
  //先拿到一级数据
  arr.forEach((item) => {
    if (item.parentId === parentId) {
      list.push(item)
    }
    //判断是否有children
    if (!item.children) {
      item.children = []
      //递归调用继续处理其他层级
      dealTreeData(arr, item.deptId, item.children)
    }
  })
  return list
}
//处理掉最后的空children
const dealChildren = (arr) => {
  arr.forEach((item) => {
    if (item.children.length != 0) {
      dealChildren(item.children)
    } else {
      delete item.children
    }
  })
  return arr
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
defineExpose({
  openJob
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="jobForm.postId ? '编辑职位' : '添加职位'"
    width="40%"
    :before-close="closeDialogForm"
  >
    <el-form
      :model="jobForm"
      class="dialog_form"
      :rules="jobFormRules"
      ref="jobFormRef"
      label-width="80px"
    >
      <el-form-item label="职位编号" prop="code">
        <el-input v-model="jobForm.code" placeholder="请输入职位编号" clearable />
      </el-form-item>
      <el-form-item label="职位名称" prop="name">
        <el-input v-model="jobForm.name" placeholder="请输入职位名称" clearable />
      </el-form-item>
      <el-form-item label="部门" prop="deptName">
        <el-cascader
          @change="focusValue"
          :options="departIds"
          :props="props1"
          v-model="jobForm.deptId"
          clearable
          style="width: 100%"
        />
        <!-- <el-select v-model="jobForm.deptId" clearable placeholder="请选择部门" style="width: 100%">
          <el-option
            v-for="item in departData"
            :key="item.deptId"
            :label="item.name"
            :value="item.deptId"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="jobForm.remark" clearable />
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
