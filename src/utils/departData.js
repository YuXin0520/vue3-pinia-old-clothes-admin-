import { ref } from 'vue'
import { dealTreeData, dealChildren } from '@/utils/dealFunction.js'
import {useDepartServe} from '@/api/depart.js'

export const getDepartIdData = async (params) => {
  const departIds = ref([])
  const res = await useDepartServe(params)
  departIds.value = dealTreeData(res.data, 0, [])
  departIds.value = dealChildren(departIds.value)
  return departIds.value
}
