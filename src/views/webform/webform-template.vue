<template>
  <el-container class="webform-wrapper">
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</template>

<script>
import api from '@/api'
export default {
  name: 'webformTemplate',
  created () {
    console.log(api)
  }
}
</script>

<style scoped>

</style>
