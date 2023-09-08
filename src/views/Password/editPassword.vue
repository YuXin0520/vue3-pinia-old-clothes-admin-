<script setup>
import orderMessage from '@/components/breadcrumb.vue'
import card from '@/components/card.vue'
import { usePasswordServe } from '@/api/users.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
//获取面包屑导航数据
const breadName = { firstName: '修改密码', secondName: '' }
const userStore = useUserStore()
const router = useRouter()
const passwrodForm = ref({
  newPassword: '',
  oldPassword: ''
})
const passFormRules = ref({
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }]
})

const changePass = async () => {
  const res = await usePasswordServe(passwrodForm.value)
  if(res.code==200) ElMessage.success('修改成功')
  userStore.removeInfo()
  router.push('/')
}
</script>

<template>
  <order-message :breadName="breadName"></order-message>
  <card>
    <template #main>
      <div class="pass_form">
        <el-form :model="passwrodForm" :rules="passFormRules">
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="passwrodForm.newPassword"
              type="password"
              placeholder="请输入新密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              v-model="passwrodForm.oldPassword"
              type="password"
              placeholder="请输入旧密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%; margin-top: 10px" @click="changePass"
              >确认修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </template>
  </card>
</template>

<style lang="less" scoped>
.pass_form {
  width: 360px;
  border: 1px solid #ccc;
  padding: 20px;
}
</style>
