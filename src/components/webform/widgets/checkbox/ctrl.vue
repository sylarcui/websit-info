<template>
  <div ref="ctrl">{{checkList}}
    <button @click="add">aaa</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import dataview from './index'
export default {
  name: 'ctrl',
  mixins: [dataview],
  data () {
    return {
    }
  },
  created () {
    console.log('3-------------')
    this.initCtrlTdData(this)
  },
  methods: {
    add () {
      this.checkList.push('ss')
    },
    ...mapActions([
      'initCtrlTdData',
      'updataTdWidgetData'
    ])
  },
  computed: {
    ...mapGetters([
      'currenttd'
    ])
  },
  watch: {
    'currenttd': {
      handler: function (val, oldval) {
        this.updataTdWidgetData({val, newWidget: this})
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  } // 以V-model绑定数据时使用的数据变化监测
}
</script>

<style scoped>

</style>
