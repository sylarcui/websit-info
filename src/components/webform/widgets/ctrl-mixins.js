import store from '@/store/'
const ctrlMixins = {
  data: function () {
    return {
      allData: {},
      td: {}
    }
  },
  created () {
    this.allData = store.getters.tdWidget.data
    this.td = store.getters.currenttd
  },
  methods: {
  },
  watch: {
    // 'td': {
    //   handler: function (val, oldVal) {
    //     console.log(val)
    //     this.allData = store.getters.tdWidget.data
    //   },
    //   deep: true
    // }
  } // 以V-model绑定数据时使用的数据变化监测
}
export default ctrlMixins
