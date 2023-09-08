import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAsideStore = defineStore('aside_list',()=>{
    const asideData = reactive([
      {
        id: 1,
        name: '订单管理',
        path: '/order',
        children: [{ id: 101, name: '回收订单', path: '/order/recover' }]
      },
      {
        id: 2,
        name: '用户管理',
        path: '/users',
        children: [
          { id: 201, name: '用户管理', path: '/users/user' },
          { id: 202, name: '角色管理', path: '/users/role' },
          { id: 203, name: '职位管理', path: '/users/job' },
          { id: 204, name: '部门管理', path: '/users/department' }
        ]
      },
      {
        id: 3,
        name: '日志管理',
        path: '/log',
        children: [{ id: 301, name: '系统日志', path: '/log/system' }]
      },
      {
        id: 4,
        name: '备忘录',
        path: '/memo'
      }
    ])
    const setAsideData = ()=>{
        // asideData = [
        //   {
        //     id: 1,
        //     name: '订单管理',
        //     children: [{ id: 101, name: '回收订单' }]
        //   },
        //   {
        //     id: 2,
        //     name: '用户管理',
        //     children: [
        //       { id: 201, name: '用户管理' },
        //       { id: 202, name: '角色管理' },
        //       { id: 203, name: '职位管理' },
        //       { id: 204, name: '部门管理' }
        //     ]
        //   },
        //   {
        //     id: 3,
        //     name: '日志管理',
        //     children: [{ id: 301, name: '系统日志' }]
        //   },
        //   {
        //     id: 4,
        //     name: '备忘录',
        //   }
        // ]
    }
    return {
      asideData,
      setAsideData
    }
})