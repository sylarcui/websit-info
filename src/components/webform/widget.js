// import store from '@/store/'
import Vue from 'vue'
import * as widgetsl from './widgets/preview'
import * as ctrl from './widgets/ctrl'
import store from '@/store/'
const Widget = Vue.extend({
  template: '<div class="widget-shade-container"  contenteditable="false" @click.stop><div class="widget-shade"></div><component v-bind:is="widgetNmae"></component></div>',
  components: widgetsl,
  props: ['widgetNmae', 'position'],
  data: function () {
    return {
      isShowPreview: false
    }
  },
  created () {
    console.log(store.getters.tdWidget)
  },
  methods: {

  },
  watch: {
    'store.getters.tdWidget': {
      handler: function (val, oldval) {
        console.log(val)
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  }, // 以V-model绑定数据时使用的数据变化监测
  computed: {

  },
  mounted: function () {
    this.$nextTick(() => {
    })
  }
})

const Ctrl = Vue.extend({
  template: '<component v-bind:is="widgetNmae"></component>',
  components: ctrl,
  props: ['widgetNmae', 'position'],
  data: function () {
    return {
      isShowPreview: false
    }
  },
  created () {
    // store.commit('addTdCtrlWidget', {tdid: this.position, CtrlWidget: this})
  },
  methods: {

  },
  computed: {

  },
  mounted: function () {
    this.$nextTick(() => {
    })
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
// new Profile().$mount('#mount-point')
export {Widget, Ctrl}
