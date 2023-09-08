<script setup>
import { ref, defineExpose, defineEmits, defineProps } from 'vue'
const props = defineProps(['dialogVisible'])

const dialogVisible = ref(false)
const data = ref([])
const open = (row) => {
  data.value = [...row]
  dialogVisible.value = true
  console.log(data.value)
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" title="日志详情" width="45%">
    <div class="dialog_form">
      <div v-for="(item, inex) in data" :key="index" class="dialog_item">
        <el-col :span="6">{{ item.label }}</el-col>
        <el-col :span="18"
          ><div width="100%">{{ item.data }}</div></el-col
        >
      </div>
    </div>
  </el-dialog>
</template>

<style lang="less" scoped>
.dialog_form {
  padding: 20px;
  height: 100%;
  border: 1px solid #ccc;
  margin: auto;
}
.dialog_item {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 10px 0;
  word-wrap: break-word;
  word-break: normal;
}
</style>
