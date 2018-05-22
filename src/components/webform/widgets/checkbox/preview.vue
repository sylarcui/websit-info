<template>
  <div>{{checkList}}</div>
</template>

<script>
import dataview from './index'
// import {mapGetters} from 'vuex'
import store from '@/store/'
export default {
  name: 'checkbox',
  mixins: [dataview],
  data () {
    return {
      // checkList: ['1', '3']
    }
  },
  created () {
    // this.initTdNewWidgetData({newWidget: this})
    // store.dispatch('initTdNewWidgetData', {newWidget: this})
    store.dispatch('initTdNewWidgetData', {newWidget: this})
    console.log(this.$store, '初始化2', this.getTdWidget)
  },
  methods: {
  },
  watch: {
    checkList: {
      handler: (val, oldval) => {
        console.log(val)
        // console.log(store.getters.tdWidgetList, '----44444-----')
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
    // 'childrens.name': (val, oldval) => {
    //   // console.log(val+"aaa")
    // }, // 键路径必须加上引号
    // lastName: (val, oldval) => {
    //   console.log(this.lastName)
    // }
  }, // 以V-model绑定数据时使用的数据变化监测
  components: {
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
