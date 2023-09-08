import request from '@/utils/request.js'

//获取订单页的数据
export const useOrderServe = (params) => request.get('/api/page',{params})