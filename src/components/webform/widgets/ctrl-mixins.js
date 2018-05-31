import store from '@/store/'
const ctrlMixins = {
  data: function () {
    return {
      allData: {}
    }
  },
  created () {
    this.allData = store.getters.tdWidget.data
  },
  methods: {
  },
  watch: {
  } // 以V-model绑定数据时使用的数据变化监测
}
export default ctrlMixins
