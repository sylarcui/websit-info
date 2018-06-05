<template>
  <div class="container" ref="container">
    <slot>Submit</slot>
    <!--<div v-if="allData.errorShow"><small class="text-smaller el-form-item__error" v-if="allData.errorIsShow && allData.errorTipText">{{allData.errorTipText || '警告文字'}}</small></div>-->
    <small class="text-smaller" v-if="allData.explainIsShow">{{allData.explainText || '说明文字'}}</small>
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
  mounted: function () {
    this.$nextTick(function () {
      // this.$refs.container.querySelectorAll('.el-checkbox__label').forEach((t) => {
      //   // console.log(t.innerHTML.trim())
      //   // t.innerHTML = t.innerHTML.trim()
      // })
    })
  },
  watch: {
  } // 以V-model绑定数据时使用的数据变化监测
}
</script>

<style lang="scss">
  .text-smaller{
    color: $gray;
  }
</style>
