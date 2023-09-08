import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userinfo', () => {
  //  设置登陆token
  const token = ref('')

  const setToken = (value) => {
    token.value = value
  }
  //退出清空
  const removeInfo = () => {
    token.value = ''
    activeIndex.value = ''
  }

  //设置刷新导航高亮
  const activeIndex = ref('')

  const setActiveIndex = (value) => {
    activeIndex.value = value
  }

  //设置面包屑
  const breadName = ref()

  const setBreadName = (value) => {
    breadName.value = value
  }

  return {
    token,
    setToken,
    removeInfo,
    activeIndex,
    setActiveIndex,
    breadName,
    setBreadName
  }
},{
  persist:true
})
