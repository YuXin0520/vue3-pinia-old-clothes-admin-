import request from '@/utils/request.js'

//用户查询接口--分页
export const useUsersSever = (params) => request.get('/api/sys/user/page',{params})

//用户查询--没用
export const useSysUsersSever = (params) => request.get('/api/sys/user/get',{params})

//职位查询
export const usePostServe = () => request.get('/api/sys/post/list')

//角色查询
export const useRoleServe = () => request.get('/api/sys/role/list',)

//添加用户
export const useAddUsersServe = (params) => request.post('/api/sys/user/add', params)

//删除用户
export const useDeleteUsersServe = (params) => request.delete('/api/sys/user/del', {params})

//用户状态编辑
export const useStatusUsersServe = ({ status, userId }) => {
  const formData = new FormData()
  formData.append('status', status)
  formData.append('userId', userId)
  return request.put('/api/sys/user/status/edit', formData)
}

//重置密码
export const useResetUsersServe = (userId) => {
  const formData = new FormData()
  formData.append('userId', userId)
  return request.put('/api/sys/user/password/reset', formData)
} 

//用户编辑
export const useEditUsersServe = (params) => {
  const formData = new FormData()
  for(let i in params){
    formData.append(i,params[i])
  }
  return request.put('/api/sys/user/edit', formData)
}

//密码修改
export const usePasswordServe = (params) => {
  const formData = new FormData()
  for (let i in params) {
    formData.append(i, params[i])
  }
  return request.put('/api/sys/user/password/modify', formData)
}