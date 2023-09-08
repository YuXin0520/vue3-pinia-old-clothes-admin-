<script setup >
import orderMessage from '@/components/breadcrumb.vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const breadName = userStore.breadName
</script>

<template>
  <order-message :breadName="breadName"></order-message>
</template>

<style lang="less" scoped>

</style>