<template>
  <div class="container">
    <slot>Submit</slot>
    {{explainIsShow}}{{errorIsShow}}
    <div v-if="errorIsShow">{{errorTipText}}'4444'</div>
    <div v-if="explainIsShow">{{explainText}}'sss'</div>
  </div>
</template>

<script>
import store from '@/store/'
import widgetData from './widget-data'
import Vue from 'vue'
import _ from 'lodash'
export default {
  name: 'preview-template',
  // props: ['errorTipText', 'errorIsShow', 'explainIsShow', 'explainText'],
  data: function () {
    return {
      widgetData,
      errorTipText: '',
      errorIsShow: false,
      explainIsShow: false,
      explainText: ''
    }
  },
  created () {
    console.log('======>11111111111111')
    let tdid = store.getters.currenttd.getAttribute('UUID')
    let dataArr = Object.keys(this.$data)
    dataArr.map((d) => {
      if (store.getters.tdWidget.data.hasOwnProperty(d)) {
        this[d] = store.getters.tdWidgetList[tdid].data[d]
      } else {
        let data = _.cloneDeep(this[d])
        store.dispatch('upDataTdDataActions', {key: d, data})
        this[d] = store.getters.tdWidgetList[tdid].data[d]
      }
    })
  },
  watch: {
    'store.getters.currenttd': {
      handler: function (val, oldval) {
       console.log(val)
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  } // 以V-model绑定数据时使用的数据变化监测
}
</script>

<style scoped>

</style>
