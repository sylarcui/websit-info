<template>
    <el-checkbox-group v-model="checkListVal">
        <el-checkbox v-for="(item, key) in checkList" :key="key" :disabled="item.disabled" :label="item.val" >{{item.label}}</el-checkbox>
    </el-checkbox-group>
</template>

<script>
// import dataview from './index'
// import {mapGetters} from 'vuex'
import store from '@/store/'
export default {
  name: 'checkbox',
  // mixins: [dataview],
  data () {
    return {
      // fieldName: '',
      checkList: [
        {
          disabled: false,
          label: '选项一',
          val: 'xuanxiangyi'
        },
        {
          disabled: false,
          label: '选项二',
          val: 'xuanxianger'
        }
      ],
      checkListVal: []
    }
  },
  created () {
    // this.initTdNewWidgetData({newWidget: this})
    // store.dispatch('initTdNewWidgetData', {newWidget: this})
    store.dispatch('initTdNewWidgetData', {newWidget: this})
    console.log(this.$store, '初始化2', store.getters.getTdWidget())
  },
  methods: {
  },
  watch: {
    checkList: {
      handler: function (val, oldval) {
        console.log(store.getters.tdWidget.data)
        // console.log(store.getters.tdWidgetList, '----44444-----')
        // this.fieldName = store.getters.tdWidget.data.fieldName
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    },
    // widgetFieldName: {
    //   handler: function (val, oldval) {
    //     console.log(store.getters.tdWidget, this.widgetFieldName, '---44444444444-------------')
    //     // console.log(store.getters.tdWidgetList, '----44444-----')
    //     // this.fieldName =
    //   },
    //   deep: true // 对象内部的属性监听，也叫深度监听
    // },
    // 'store.getters.getTdWidget': function (val) {
    //   console.log(val)
    // },
    'currenttd': {
      handler: function (val, oldval) {
        // this.updataTdWidgetData({val, newWidget: this})
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
