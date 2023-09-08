<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps(['resetBtn'])
//是否开启重置
const resetBtn = props.resetBtn 
const emit = defineEmits(['clickAddBtn', 'querySelect', 'resetformData'])
//查询事件
const query = () => {
  emit('querySelect')
}
//新增事件
const addData = () => {
  emit('clickAddBtn')
}
//重置事件
const reset = () => {
  emit('resetformData')
}
</script>
<template>
  <el-button type="primary" @click="query">查询</el-button>
  <el-button plain @click="reset" v-if="resetBtn">重置</el-button>
  <el-button type="primary" @click="addData">新增</el-button>
</template>

<style lang="less" scoped></style>
