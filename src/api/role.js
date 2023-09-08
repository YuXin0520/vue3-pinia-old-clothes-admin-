import request from '@/utils/request.js'
//角色查询
export const useRoleServe = (params) => request.get('/api/sys/role/page', { params })

//角色授权
export const useRoleStatusServe = (params) => request.post('/api/sys/role/empowerPerm', params)

//删除角色
export const useDeleteRoleServe = (params) => request.delete('/api/sys/role/del', {params})

//添加角色
export const useAddRoleServe = (params) => request.post('/api/sys/role/add',params)

//编辑角色
export const useEditRoleServe = (params) => {
  const formData = new FormData()
  for (let i in params) {
    formData.append(i, params[i])
  }
  return request.put('/api/sys/role/edit', formData)
}

//权限查询
export const usePermListServe = () => request.get('/api/sys/perm/list')

//权限查询-by用户
export const usePermByUserServe = (params) => request.get('/api/sys/perm/listByUser', {params})

//权限查询-by角色
export const usePermByRoleServe = (params) => request.get('/api/sys/perm/listByRole', {params})


//角色授权
export const useEmpowerPermServe = (params) => request.post('/api/sys/role/empowerPerm', params)