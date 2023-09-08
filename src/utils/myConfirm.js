export const myConfirm = async()=>{
  const confirmRes = await ElMessageBox.confirm('是否确认删除', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch((e) => e)
  if (confirmRes === 'cancel') ElMessage('取消了删除')
  if (confirmRes === 'confirm') return true
}