import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/router'

let loading = null

const instance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

instance.interceptors.request.use(
   (config)=> {
     loading = ElLoading.service({ fullscreen: true })
     const userStore = useUserStore()
     //携带请求头
     if (userStore.token) {
       config.headers.Authorization = userStore.token
     }
     return config
   },
   (error)=> {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
   (response) =>{
    //return response.data
    // 2xx 范围内的状态码都会触发该函数。
    loading.close()
    if(response.data.code === 200){
      return response.data
    }
    // // 对响应数据做点什么,
    // //失败给错误提示
    ElMessage.error(response.data.msg || '服务异常')
  },
   (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    //401或权限过期
    if(error.response?.status === 401){
      router.push('/login')
    }

    // 对响应错误做点什么
    ElMessage.error(error || '服务异常')
    return Promise.reject(error)
  }
)

export default instance