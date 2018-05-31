import Vue from 'vue'
import _ from 'lodash'
const widgetData = {
  tdWidgetList: {
  },
  currentTd: '',
  widget: this.currentTd ? this.tdWidgetList[this.currentTd.getAttribute('UUID')] : '',
  gettdWidget (id) {
    let uuid = id || this.currentTd.getAttribute('UUID')
    return this.tdWidgetList[uuid]
  },
  // widget (id) {
  //   let uuid = id || this.currentTd.getAttribute('UUID')
  //   return this.tdWidgetList[uuid].data
  // },
  setCurrentTd (td) {
    Vue.set(this, 'currentTd', td)
  },
  settdWidget ({uuid, CtrlWidget}) {
    Vue.set(this.tdWidgetList, uuid, {})
    if (!this.tdWidgetList[uuid]) {
      // Vue.set(widgetData.tdWidgetList, uuid, {})
      Vue.set(this.tdWidgetList[uuid], 'CtrlWidget', CtrlWidget)
    } else {
      // Vue.set(state.tdWidgetList, tdid, {})
      if (this.tdWidgetList[uuid].CtrlWidget !== CtrlWidget) {
        Vue.set(this.tdWidgetList[uuid], 'CtrlWidget', CtrlWidget)
      }
    }
  },
  initTdNewWidgetData ({newWidget}) {
    let tdid = this.currentTd.getAttribute('UUID')
    let _fieldNameObj = {
      widgetFieldName: '1111',
      widgetFieldNamePinyin: '1111'
    }
    // Object.assign(newWidget.$data, _fieldNameObj)
    let data = _.cloneDeep(newWidget.$data)
    Vue.set(this.tdWidgetList[tdid], 'data', data)
    for (let i in data) {
      newWidget[i] = this.tdWidgetList[tdid].data[i]
      // newWidget[i].push(tdid)
      // Vue.set(newWidget, i, this.tdWidgetList[tdid].data[i])
      // console.log()
    }
    Object.assign(this.gettdWidget.data, _fieldNameObj)
  }
}
export default widgetData

// console.log(widgetData.gettdWidget())
