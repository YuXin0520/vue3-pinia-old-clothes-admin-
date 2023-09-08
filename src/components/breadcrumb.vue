<script setup >
import { defineProps } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue'

const props = defineProps(['breadName'])
const breadName = props.breadName

</script>

<template>
   <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{breadName.firstName}}</el-breadcrumb-item>
    <el-breadcrumb-item v-if="breadName.secondName">{{breadName.secondName}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="less" scoped>

</style>