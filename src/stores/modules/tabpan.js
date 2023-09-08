import { ref } from 'vue'
import { defineStore } from 'pinia'

//此函数用来保存tab标签

export  const useTabListStore = defineStore('use-tab',()=>{
    //准备一个保持keepAlive的数组
    const tabKeepAliveList = ref([])
    //添加
    const addtabKeepAliveList = (data)=>{
       const index=  tabKeepAliveList.indexOf(data)
       if(index == -1){
          tabKeepAliveList.push(data)
       }
    }

    const removeTabKeepAliveList = (data)=>{
      const index = tabKeepAliveList.indexOf(data)
      if (index != -1) {
        tabKeepAliveList.splice(index,1)
      }
    }
    return {
      tabKeepAliveList,
      addtabKeepAliveList,
      removeTabKeepAliveList
    }
})
