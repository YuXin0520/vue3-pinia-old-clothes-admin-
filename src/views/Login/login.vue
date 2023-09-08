<script setup>
import { Lock, User, Hide, View } from '@element-plus/icons-vue'
import { ref } from 'vue'
import axios from 'axios'
import { useLoginServe } from '@/api/login.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
//import axios from 'axios'

//密码框的显示与否,默认不显示
const passwordView = ref(false)
const changeIcon = () => {
  passwordView.value = !passwordView.value
}

//提交给后台的表单数据
const loginForm = ref({
  account: 'admin',
  password: 'Abcd1234'
})

//表单校验规则
const loginFormRules = ref({
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '请输入长度为3-8位的用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{3,10}$/, message: '请输入长度为3-10位的非空字符', trigger: 'blur' }
  ]
})
//表单验证对象
const loginFormRef = ref()
//获取路由对象
const router = useRouter()
//發送登錄請求
const loginPost = async () => {
  await loginFormRef.value.validate()
  //获取登陆token
  const res = await useLoginServe(loginForm.value)
  // //存储token
   const userStore = useUserStore()
   userStore.setToken(res.data)
  // //跳转layout
   router.push('/layout')
   ElMessage.success('登陆成功')
  //   axios({
  //   url: '/api/authentication',
  //   method: 'post',
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   },
  //   data: formData
  // }).then(res=>{
  //   console.log(formData)
  //   console.log(res.data)
  // }).catch(err=>console.log(err))
}
</script>

<template>
  <div class="login_container">
    <div class="login_box">
      <el-form
        class="login_from"
        size="large"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item class="box_title">
          <h1>旧衣物回收系统管理平台</h1>
        </el-form-item>
        <el-form-item prop="account">
          <el-input placeholder="请输入用户名" v-model="loginForm.account">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="loginForm.password"
            :prefix-icon="Lock"
            :type="passwordView ? 'text' : 'password'"
          >
            <template #append>
              <el-button :icon="passwordView ? View : Hide" @click="changeIcon" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="loginPost">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login_container {
  background: url('../../assets/recover3.webp');
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}
/deep/.el-form-item__content {
  justify-content: center;
}
.login_container .login_box {
  width: 420px;
  height: 280px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  box-sizing: border-box;
}
.login_from {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
