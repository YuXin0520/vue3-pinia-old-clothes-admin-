import request from '@/utils/request.js'
//职位查询-byage
export const usePostServe = (params) => request.get('/api/sys/post/page',{params})

//删除职位
export const usePostDelServe = (params={}) => request.delete('/api/sys/post/del',{params})

//编辑职位
export const useEditJobServe = (params) => {
  const formData = new FormData()
  for (let i in params) {
    formData.append(i, params[i])
  }
  console.log('formData',params)
  return request.put('/api/sys/post/edit', formData)
}

//添加职位
export const useAddJobServe = (params) => request.post('/api/sys/post/add', params)