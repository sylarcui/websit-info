<template>
  <div class="container">
    <slot>Submit</slot>
    <div v-if="allData.errorIsShow">{{allData.errorTipText}}'4444'</div>
    <div v-if="allData.explainIsShow">{{allData.explainText}}'sss'</div>
  </div>
</template>

<script>
import store from '@/store/'
export default {
  name: 'preview-template',
  data: function () {
    return {
      allData: {}
    }
  },
  created () {
    this.allData = store.getters.tdWidget.data
  },
  watch: {
  } // 以V-model绑定数据时使用的数据变化监测
}
</script>

<style scoped>

</style>
