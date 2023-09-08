<script setup>
import orderMessage from '@/components/breadcrumb.vue'
import card from '@/components/card.vue'
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import { useOrderServe } from '@/api/order.js'
//获取面包屑导航数据
const userStore = useUserStore()
const breadName = userStore.breadName

//获取card数据
//准备请求的参数
const getSeverData = ref({
  // contact: '', //联系人
  page: 1, //页码
  size: 10, //条数
  // //endOrderedTime:'',//下单时间-结束
  // orderNo: '', //订单号
  // phoneNumber: '', //手机号
  // //startOrderedTime:'',//下单时间-开始
  // allOrderTime:[]
})
let tableList = ref([])
let total = ref(0)
//获取初始表单数据
const getTable = async (data) => {
  const res = await useOrderServe(data)
  tableList.value = res.data.record
  total.value = res.data.total
}
getTable(getSeverData.value)
//点击查询
const onSubmit = async () => {
  const orderTime = getSeverData.value.allOrderTime && getSeverData.value.allOrderTime.length > 0
  if (orderTime) {
    getSeverData.value.startOrderedTime = getSeverData.value.allOrderTime[0]
    getSeverData.value.endOrderedTime = getSeverData.value.allOrderTime[1]
    delete getSeverData.value.allOrderTime
  }
  const res = await useOrderServe(getSeverData.value)
  tableList.value = res.data.record
  total.value = tableList.value.length
}
//点击重置表单
const cleaClickSeverrData = () => {
  getSeverData.value = {}
  getTable(getSeverData.value)
}
const addPage = ()=>{
  getSeverData.value.page++
  getTable(getSeverData.value)
}
const subPage = ()=>{
  getSeverData.value.page--
  getTable(getSeverData.value)
}
const changePage = (page)=>{
  getSeverData.value.page = page
  getTable(getSeverData.value)
}
</script>

<template>
  <order-message :breadName="breadName"></order-message>
  <card :total="total" @addPage="addPage" @subPage="subPage" @changePage="changePage">
    <template v-slot:top>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="getSeverData.orderNo" clearable />
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="getSeverData.contact" clearable />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="getSeverData.phoneNumber" clearable />
        </el-form-item>
        <el-form-item label="下单时间-开始">
          <el-date-picker
            v-model="getSeverData.allOrderTime"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="-"
            start-placeholder="下单时间-开始"
            end-placeholder="下单时间-结束"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button plain @click="cleaClickSeverrData">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #main>
      <el-table :data="tableList" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" />
        <el-table-column prop="contact" label="联系人" />
        <el-table-column prop="phoneNumber" label="联系人手机号" />
        <el-table-column prop="estimatedWeight" label="预估重量" />
        <el-table-column prop="expectedTime" label="期待上门时间" />
        <el-table-column prop="orderedTime" label="下单时间" />
        <el-table-column prop="fullAddress" label="地址" />
        <el-table-column prop="province" label="省份" width="55px" />
        <el-table-column prop="municipality" label="市" width="50px" />
        <el-table-column prop="district" label="区" width="50px" />
        <el-table-column prop="detailedAddress" label="详细地址" />
      </el-table>
    </template>
  </card>
</template>

<style lang="less" scoped>
.row_input {
  flex: 1;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
