<template>
  <el-aside width="300px"  class="webform-aside">
    <el-tabs v-model="webformAside" type="card">
      <el-tab-pane name="first">
        <span slot="label"><icon :icon="['fal','wrench']"></icon> 控件属性</span>
        <component :is="currentView"></component>
        <!--<div ref="widgetCtrl" id="aaa"><div></div></div>-->
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><icon :icon="['fal','tasks']"></icon> 控件列表</span>配置管理
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script>
import * as widgetsl from '@/components/webform/widgets/ctrl'
import widgetData from '@/components/webform/widgets/widget-data'
import {mapGetters} from 'vuex'
export default {
  name: 'webformSidebar',
  // props: ['currentView'],
  data () {
    return {
      webformAside: 'first',
      widgetLists: {},
      currentView: '',
      widgetData
    }
  },
  created () {
    // this.widgetLists = widgetsl
    // console.log(this.widgetLists, 'widgetListswidgetLists')
  },
  mounted () {
    this.$on('insertWidgetCtrl', (widgetNmae, position) => {
      this.currentView = ''
      this.initWidgetCtrl(widgetNmae, position)
    })
  },
  watch: {
    // 'currenttd': {
    //   handler: function (val, oldval) {
    //     if (this.tdWidget) {
    //       this.currentView = this.tdWidget.CtrlWidget
    //     }
    //     console.log(val, '======>')
    //     // this.updataTdWidgetData({val, newWidget: this})
    //   },
    //   deep: true // 对象内部的属性监听，也叫深度监听
    // }
  },
  methods: {
    initWidgetCtrl (widgetNmae, position) {
      if (this.widgetData.gettdWidget()) {
        this.currentView = this.widgetData.gettdWidget().CtrlWidget
      }
    }
  },
  computed: {
    ...mapGetters([
      'currenttd',
      'tdWidget'
    ])
  },
  components: widgetsl
}
</script>
<style lang="scss">
  .webform-aside {
    overflow: initial;
    .el-form--label-top .el-form-item__label {
      padding-bottom: 0;
    }
    .el-tabs {
      height: 100%;
      margin-top: rem(-35);
    }
    .el-tab-pane {
      padding: rem(10);
      overflow: auto;
      height: 100%;
    }
    .el-tabs__content {
      /*height: calc(100% - 2.25rem);*/
      height: 100%;
      background-color: white;
      border-left: 1px solid #d1d1d1;
    }
    .el-tabs__header {
      margin-bottom: 0;
      height: rem(35);
      background-color: #ffffff;
      border-bottom: 1px solid #d1d1d1;
      border-left: 1px solid #d1d1d1;
      .el-tabs__item {
        padding: 0 rem(5);
        height: rem(35);
        line-height: rem(35);
        font-size: rem(12);
        width: rem(109);
        text-align: center;
        color: #323232;
        border-left: 1px solid #d1d1d1;
        &.is-active {
          background-color: #f7f7f7;
          color: $default--color;
          border-bottom: 1px solid #d1d1d1;
        }
      }
      .el-tabs__nav {
        z-index: 0;
        border: none;
      }
    }
  }
</style>
<style scoped lang="scss">
  .webform-aside {
    position: relative;
    z-index: 1;
  }
</style>
