<template>
  <div class="container">
    <slot>Submit</slot>
    <small class="text-smaller el-form-item__error" v-if="allData.errorIsShow">{{allData.errorTipText || '警告文字'}}</small>
    <small class="text-smaller el-form-item__error" v-if="allData.explainIsShow">{{allData.explainText || '说明文字'}}</small>
  </div>
</template>

<script>
import store from '@/store/'
export default {
  name: 'preview-template',
  // props: ['errorTipText', 'errorIsShow', 'explainIsShow', 'explainText'],
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
