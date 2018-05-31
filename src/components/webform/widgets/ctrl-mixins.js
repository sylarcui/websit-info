import _widgetData from './widget-data'
import Vue from 'vue'
const ctrlMixins = {
  data: function () {
    return {
      widgetData: _widgetData
    }
  },
  created () {
    console.log('======>333333333333333')
    // this.initTdNewWidgetData({newWidget: this})
    // store.dispatch('initCtrlTdData', this)
    // this.initCtrlTdData(this)
    let dataArr = Object.keys(this.$data).filter(a => a !== 'widgetData')
    console.log(dataArr)
    dataArr.map((d) => {
      if (this.widgetData.gettdWidget().data.hasOwnProperty(d)) {
        this[d] = this.widgetData.gettdWidget().data[d]
      }
      console.log('explainIsShow', d, this[d], this.widgetData.gettdWidget().data[d])
    })
    console.log(this.widgetData.gettdWidget().data, this, 'jjj')
  },
  methods: {
    updateFun (objKey) {
      for (let i in objKey) {
        Vue.set(this.widgetData.gettdWidget().data, i, objKey[i])
      }
    }
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
    'widgetData.currentTd': {
      handler: function (val, oldval) {
        if (val) {
          let dataArr = Object.keys(this.$data).filter(a => a !== 'widgetData')
          dataArr.map((d) => {
            if (this.widgetData.gettdWidget().data[d]) {
              this[d] = this.widgetData.gettdWidget().data[d]
            }
          })
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  } // 以V-model绑定数据时使用的数据变化监测
}
export default ctrlMixins
