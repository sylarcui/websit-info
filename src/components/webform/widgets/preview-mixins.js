// import store from '@/store/'
import widgetData from './widget-data'
import _ from 'lodash'
import Vue from 'vue'
const previewMixins = {
  data: function () {
    return {
      widgetData,
      widgetFieldName: '',
      widgetFieldNamePinyin: '',
      errorTipText: '',
      errorIsShow: false,
      explainIsShow: false,
      explainText: ''
    }
  },
  created () {
    console.log('======>222222222222222')
    // this.initTdNewWidgetData({newWidget: this})
    // store.dispatch('initTdNewWidgetData', {newWidget: this})
    // store.dispatch('initTdNewWidgetData', {newWidget: this})
    // this.widgetData.initTdNewWidgetData()
    // console.log(this.$store, '初始化2', store.getters.getTdWidget())
    // let _fieldNameObj = {
    //   widgetFieldName: '1111',
    //   widgetFieldNamePinyin: '1111'
    // }
    let tdid = this.widgetData.currentTd.getAttribute('UUID')
    let dataArr = Object.keys(this.$data).filter(a => a !== 'widgetData')
    // let data = _.cloneDeep(newWidget.$data)
    Vue.set(this.widgetData.tdWidgetList[tdid], 'data', {})
    dataArr.map((d) => {
      if (this.widgetData.gettdWidget().data[d]) {
        this[d] = this.widgetData.gettdWidget().data[d]
      } else {
        let data = _.cloneDeep(this[d])
        Vue.set(this.widgetData.tdWidgetList[tdid].data, d, data)
        this[d] = this.widgetData.gettdWidget().data[d]
      }
    })
    // // Object.assign(newWidget.$data, _fieldNameObj)
    // let data = _.cloneDeep(newWidget.$data)
    // Vue.set(this.tdWidgetList[tdid], 'data', data)
    // console.log(newWidget)
    // for (let i in data) {
    //   console.log(i, '====>', data)
    //   newWidget[i] = this.tdWidgetList[tdid].data[i]
    //   // newWidget[i].push(tdid)
    //   // Vue.set(newWidget, i, this.tdWidgetList[tdid].data[i])
    //   // console.log()
    // }
    // Object.assign(this.gettdWidget.data, _fieldNameObj)
    // for (let i in Object.keys(this.$data)) {
    //   if ()
    // }
  }
}
export default previewMixins
