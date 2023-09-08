import request from '@/utils/request.js'

export const useLogServe = (params) => request.get('/api/sys/log/page', { params })