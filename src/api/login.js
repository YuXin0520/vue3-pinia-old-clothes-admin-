import request from '@/utils/request.js'
//登陆请求
export const useLoginServe = ({account,password}) => {
  const formData = new FormData()
  formData.append('account', account)
  formData.append('password', password)
  return request.post('/api/authentication', formData)
}
  


    

