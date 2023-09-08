import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useDepartServe } from '@/api/depart.js'
import { dealTreeData, dealChildren } from '@/utils/dealFunction.js'

export const useDepartStore = defineStore('depart_data', () => {
  const departIds = ref([])

  const getDepartId = async () => {
    const res = await useDepartServe()
    departIds.value = dealTreeData(res.data, 0, [])
    departIds.value = dealChildren(departIds.value)
    console.log('store-departIds', departIds.value)
  }
  return {
    departIds,
    getDepartId
  }
})
