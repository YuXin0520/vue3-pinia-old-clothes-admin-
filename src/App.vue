<script setup>
import { onUnmounted, ref, onMounted} from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useUserStore } from '@/stores'
const language = ref('zh-cn')
//const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
const locale = zhCn
const userStore = useUserStore()
onMounted(()=>{
  window.addEventListener('beforeunload',()=>{
    localStorage.removeItem('userinfo')
  })
})
</script>

<template>
  <div id="app">
    <el-config-provider :locale="locale"> <router-view></router-view></el-config-provider>
  </div>
</template>

<style scoped></style>
