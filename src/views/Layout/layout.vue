<script setup>
import { SwitchButton, Tools } from '@element-plus/icons-vue'
import { useUserStore, useAsideStore } from '@/stores'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
//退出功能
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const loginOut = () => {
  userStore.removeInfo()
  router.push('/')
}
//修改密码
const editPassword = () => {
  router.push({ path: '/layout/editpassword' })
}
//获取渲染侧边栏数据
const asideStore = useAsideStore()
const asideList = asideStore.asideData
//设置持久化 导航高亮
const activeIndex = userStore.activeIndex
//监听路由变化，把新变化的路径持久化存储起来
//面包屑的数据
const breadName = ref({
  firstName: '备忘录',
  secondName: ''
})
const chlickItem = ()=>{
  console.log(router)
}


//监听路由变化，根据变化路由保存高亮选项跟面包屑
watch(route, () => {
  const pathFirst = '/' + route.path.split('/')[2]
  const pathSecond = pathFirst + '/' + route.path.split('/')[3]
  const newActiveIndex = route.path
  userStore.setActiveIndex(newActiveIndex)
  asideList.forEach((item) => {
    if (item.path === pathFirst && pathFirst !== 'memo') {
      breadName.value.firstName = item.name
      if (item.children) {
        item.children.forEach((subItem) => {
          if (subItem.path === pathSecond) {
            breadName.value.secondName = subItem.name
          }
        })
      }
    }
  })
  //console.log(breadName.value)
  userStore.setBreadName(breadName.value)
})
</script>

<template>
  <div class="common-layout">
    <el-container class="home_container">
      <!--侧边栏-->
      <el-aside width="240px" class="home_aside">
        <div class="aside_title">
          <h1>旧衣物回收系统管理平台</h1>
        </div>
        <el-menu
          background-color="#2c3e50"
          text-color="#fff"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          router
        >
          <template v-for="item in asideList" :key="item.id">
            <el-sub-menu :index="item.path" v-if="item.children">
              <template #title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item
                :index="'/layout' + child.path"
                v-for="child in item.children"
                :key="child.path"
                @click="chlickItem"
                >{{ child.name }}</el-menu-item
              >
            </el-sub-menu>
            <el-menu-item :index="'/layout' + item.path" v-if="!item.children">
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!--内容区-->
      <el-container>
        <el-header class="home_header">
          <el-dropdown>
            <el-button type="pain" size="large"> 系统管理员 </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="editPassword">
                  <el-icon><Tools /></el-icon>
                  修改密码
                </el-dropdown-item>
                <el-dropdown-item @click="loginOut">
                  <el-icon><SwitchButton /></el-icon>
                  退出登陆
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <keep-live>
            <router-view></router-view>
          </keep-live>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.home_container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.home_header {
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: end;
  align-items: center;
  box-shadow: 1px 1px 4px #ccc;
}
.home_aside {
  box-shadow: 0.1px 0.1px 4px #ccc;
  background-color: #2c3e50;
}
.aside_title {
  height: 65px;
  text-align: center;
  color: #fff;
  line-height: 65px;
  font-size: 16px;
  background-color: #2c3e61;
}
.menu_item {
  background-color: #2c3e46;
  color: #999;
}
.activeIncex {
  color: #5670f3;
  background-color: #2c3e46;
}
</style>
