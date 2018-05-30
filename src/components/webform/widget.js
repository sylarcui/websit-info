// import store from '@/store/'
import Vue from 'vue'
import * as widgetsl from './widgets/preview'
import * as ctrl from './widgets/ctrl'
// import store from '@/store/'
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
    console.log(this.position)
    // store.commit('addTdCtrlWidget', {tdid: this.position, CtrlWidget: this})
    // console.log(store.getters.getTdWidget(this.position), '90909090909090909')
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
