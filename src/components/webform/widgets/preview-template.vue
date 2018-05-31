<template>
  <div class="container">
    <slot>Submit</slot>
    {{explainIsShow}}{{errorIsShow}}
    <div v-if="errorIsShow">{{errorTipText}}'4444'</div>
    <div v-if="explainIsShow">{{explainText}}'sss'</div>
  </div>
</template>

<script>
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
    // let tdid = this.widgetData.gettdWidget()
    // Object.assign(this.widgetData.gettdWidget().data, {
    //   errorTipText: '',
    //   errorIsShow: false,
    //   explainIsShow: false,
    //   explainText: ''
    // })
    // this.errorTipText = this.widgetData.gettdWidget().data.errorTipText
    // this.errorIsShow = this.widgetData.gettdWidget().data.errorIsShow
    // this.explainIsShow = this.widgetData.gettdWidget().data.explainIsShow
    // this.explainText = this.widgetData.gettdWidget().data.explainText
    // this.a = this.widgetData.gettdWidget().data.errorIsShow
    let tdid = this.widgetData.currentTd.getAttribute('UUID')
    let dataArr = Object.keys(this.$data).filter(a => a !== 'widgetData')
    // let data = _.cloneDeep(newWidget.$data)
    // Vue.set(this.widgetData.tdWidgetList[tdid], 'data', {
    //   widgetFieldName: '',
    //   widgetFieldNamePinyin: ''
    // })
    dataArr.map((d) => {
      if (this.widgetData.gettdWidget().data[d]) {
        this[d] = this.widgetData.gettdWidget().data[d]
      } else {
        let data = _.cloneDeep(this[d])
        Vue.set(this.widgetData.tdWidgetList[tdid].data, d, data)
        this[d] = this.widgetData.gettdWidget().data[d]
      }
    })
  }
}
</script>

<style scoped>

</style>
