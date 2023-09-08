//转树形结构
export const dealTreeData = (arr, parentId, list) => {
  //先拿到一级数据
  arr.forEach((item) => {
    if (item.parentId === parentId) {
      list.push(item)
    }
    //判断是否有children
    if (!item.children) {
      item.children = []
      //递归调用继续处理其他层级
      dealTreeData(arr, item.deptId, item.children)
    }
  })
  return list
}
//处理掉最后的空children
export const dealChildren = (arr) => {
  arr.forEach((item) => {
    if (item.children.length != 0) {
      dealChildren(item.children)
    } else {
      delete item.children
    }
  })
  return arr
}
//深拷贝函数
export const deepClone = (obj) => {
  const tarobj = Object.getPrototypeOf(obj) === Array.prototype ? [] : {}
  for (let key in obj) {
    if (obj[key] && Object.getPrototypeOf(obj[key]) === Object.prototype) {
      tarobj[key] = deepClone(obj[key])
    } else {
      tarobj[key] = obj[key]
    }
  }
  return tarobj
}
