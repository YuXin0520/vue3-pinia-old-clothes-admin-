<script setup>
import { ref, defineProps,defineEmits } from 'vue'

const props = defineProps(['total'])
const emit = defineEmits(['addPage','subPage','changePage'])
const prevClick = ()=>{
  emit('subPage')
}
const nextClick =()=>{
  emit('addPage')
}
const currentChange =(page)=>{
  emit('changePage',page)
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <slot name="top"></slot>
      </div>
    </template>
    <div class="card-main">
      <slot name="main"></slot>
    </div>
    <div class="card-footer">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="currentChange"
      />
    </div>
  </el-card>
</template>

<style scoped>
.box-card {
  margin-top: 15px;
}
.card-header {
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
}
.card-footer {
  margin-top: 20px;
  display: flex;
  justify-content: end;
}
</style>
