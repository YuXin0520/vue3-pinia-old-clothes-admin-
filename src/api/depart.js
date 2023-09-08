import request from '@/utils/request.js'
//查询部门
export const  useDepartServe = (params)=>request.get('/api/sys/dept/list',{params})

//删除部门
export const userDepartDeleteServe = (params) => request.delete('/api/sys/dept/del',{params})

//编辑部门
export const userDepartEditServe = (params) => {
  const formData = new FormData()
  for (let i in params) {
    formData.append(i, params[i])
  }
  return request.put('/api/sys/dept/edit', formData)
} 
//添加部门
export const userDepartAddServe = (params) => request.post('/api/sys/dept/add',  params )