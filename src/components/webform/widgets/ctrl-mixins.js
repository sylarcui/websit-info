import _widgetData from './widget-data'
import Vue from 'vue'
import store from '@/store/'
const ctrlMixins = {
  data: function () {
    return {
      // widgetData: _widgetData
    }
  },
  created () {
    console.log('======>333333333333333')
    // this.initTdNewWidgetData({newWidget: this})
    // store.dispatch('initCtrlTdData', this)
    // this.initCtrlTdData(this)
    let dataArr = Object.keys(this.$data)
    // console.log(dataArr)
    dataArr.map((d) => {
      if (store.getters.tdWidget.data.hasOwnProperty(d)) {
        this[d] = store.getters.tdWidget.data[d]
      }
    })
  },
  methods: {
    // updateFun (objKey) {
    //   for (let i in objKey) {
    //     Vue.set(this.widgetData.gettdWidget().data, i, objKey[i])
    //   }
    // }
  },
  watch: {
    // 'form.fieldName': {
    //   handler: function (val, oldval) {
    //     let fieldNamePinyin = pinyin(val, {
    //       style: pinyin.STYLE_NORMAL, // 设置拼音风格
    //       heteronym: false
    //     }).join('')
    //     this.form.fieldNamePinyin = fieldNamePinyin
    //   },
    //   deep: true // 对象内部的属性监听，也叫深度监听
    // }
    'currenttd': {
      handler: function (val, oldval) {
        if (val) {
          let dataArr = Object.keys(this.$data)
          // console.log(dataArr)
          dataArr.map((d) => {
            if (store.getters.tdWidget.data.hasOwnProperty(d)) {
              this[d] = store.getters.tdWidget.data[d]
            }
          })
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  } // 以V-model绑定数据时使用的数据变化监测
}
export default ctrlMixins
