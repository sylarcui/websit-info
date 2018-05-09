<template>
  <el-container style="height: 100%;" class="app-wrapper">
    <Sidebar></Sidebar>
    <router-view/>
  </el-container>
</template>

<script>
import Sidebar from '@/pages/layout/sidebar'
export default {
  name: 'layout',
  components: {
    Sidebar
  }
}
</script>

<style scoped>

</style>
