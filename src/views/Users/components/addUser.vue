<script setup>
import { QuestionFilled } from '@element-plus/icons-vue'
import { ref, reactive, defineExpose ,defineEmits} from 'vue'
import { useRoleServe, usePostServe,useEditUsersServe,useAddUsersServe } from '@/api/users.js'
//角色数据
const userRole = ref([])
//职位
const userPost = ref([])
//获取职位角色数据函数
const getData = async () => {
  const resRole = await useRoleServe()
  userRole.value = resRole.data
  const resPost = await usePostServe()
  userPost.value = resPost.data
}
getData()
//新增用户表单数据
const dialogRules = reactive({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phoneNumber: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '手机号格式不正确',
      trigger: 'blur'
    }
  ],
  postIds: [{ required: true, message: '请选择职位', trigger: 'blur' }],
  roleIds: [{ required: true, message: '请选择角色', trigger: 'blur' }]
})
//点击确认提交
const dialogForm = ref({}) //对话框数据
const dialogFromRef = ref({}) //对话框实例
const isEidt = ref() //判断是否编辑
const emit = defineEmits(['success'])
//确认提交函数
const comifrmAddUser = async () => {
  await dialogFromRef.value.validate()
  if (isEidt.value) {
    const editRes = await useEditUsersServe(dialogForm.value)
    if (editRes.code === 200) ElMessage.success('编辑成功')
  } else {
    const addRes = await useAddUsersServe(dialogForm.value)
    if (addRes.code === 200) ElMessage.success('添加成功')
  }
  dialogTableVisible.value = false
  emit('success',isEidt.value)
}
//是否弹出对话框 
const dialogTableVisible = ref(false)
//向外暴露方法操作对话框和数据
const dilaogEidtFunction = (row,edit) => {
  isEidt.value = edit
  dialogTableVisible.value = true
  dialogForm.value = { ...row }
}
//关闭弹框操作
const closeUserFomr = ()=>{
    dialogTableVisible.value = false
    dialogFromRef.value.resetFields()
}
defineExpose({
  dilaogEidtFunction
})
</script>
<template>
  <el-dialog
    v-model="dialogTableVisible"
    :title="dialogTitle"
    align-center
    width="47%"
    :before-close="closeUserFomr"
  >
    <div class="dialog_form">
      <el-form
        ref="dialogFromRef"
        :model="dialogForm"
        :rules="dialogRules"
        label-width="80px"
        :size="small"
        status-icon
      >
        <el-form-item label="账号" prop="account" class="form_item_input">
          <el-input v-model="dialogForm.account" />
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="dialogForm.phoneNumber" />
        </el-form-item>
        <el-form-item label="职位" prop="postIds">
          <!-- <el-select v-model="dialogForm.postIds" placeholder="请选择职位">
                <el-option :label="item.name" :value="item.postId" v-for="item in userPost" />
              </el-select> -->
          <el-select
            v-model="dialogForm.postIds"
            multiple
            placeholder="请选择职位"
            style="width: 100%"
          >
            <el-option
              v-for="item, in userPost"
              :key="item.postId"
              :label="item.name"
              :value="item.postId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select
            v-model="dialogForm.roleIds"
            placeholder="请选择角色"
            style="width: 100%"
            multiple
          >
            <el-option
              :label="item.name"
              :value="item.roleId"
              v-for="(item, index) in userRole"
              :key="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="接收通知" prop="notifiedFlag">
          <span slot="label" class="label_slot">
            <el-tooltip
              placement="top"
              content="开启后, 用户下单通知将会发送当前用户手机号"
              :enterable="false"
            >
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </span>
          <el-switch v-model="dialogForm.notifiedFlag" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeUserFomr">取消</el-button>
        <el-button type="primary" @click="comifrmAddUser"> 确定 </el-button>
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
</style>
