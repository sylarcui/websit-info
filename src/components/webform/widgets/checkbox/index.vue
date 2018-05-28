<script>
import store from '@/store/'
// ctrl 和 preview 同时共同执行的 放在这里 比如共同的data
export default {
  data () {
    return {
      checkList: ['1', '2']
    }
  },
  created () {
    store.dispatch('initTdNewWidgetData', {newWidget: this})
  },
  watch: {
    // 'currenttd': {
    //   handler: function (val, oldval) {
    //     console.log('sssss======')
    //     store.dispatch('updataTdWidgetData', {val, newWidget: this})
    //   },
    //   deep: true // 对象内部的属性监听，也叫深度监听
    // }
  }, // 以V-model绑定数据时使用的数据变化监测
  mounted: function () {
    this.$nextTick(() => {
      // if (this.$refs.ctrl) {
      //   store.dispatch('initCtrlTdData', this)
      // }

      for (let i in store.getters.tdWidget.data) {
        this[i] = store.getters.tdWidget.data[i]
        // newWidget[i].push(tdid)
      }
    })
  }
}
</script>
