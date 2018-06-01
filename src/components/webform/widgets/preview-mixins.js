import store from '@/store/'
import _ from 'lodash'
const previewMixins = {
  data: function () {
    return {
      widgetFieldName: '',
      widgetFieldNamePinyin: '',
      errorTipText: '',
      errorIsShow: false,
      explainIsShow: false,
      explainText: '',
      allData: {},
      errorShow: false
    }
  },
  created () {
    let dataArr = Object.keys(this.$data).filter(d => d !== 'allData')
    store.commit('addTdDataInit')
    dataArr.map((d) => {
      let data = _.cloneDeep(this[d])
      store.dispatch('upDataTdDataActions', {key: d, data})
    })
    this.allData = store.getters.tdWidget.data
  }
}
export default previewMixins
