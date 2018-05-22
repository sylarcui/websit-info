<template>
  <el-aside width="220px"  class="webform-aside">
    <el-tabs v-model="webformAside" type="card">
      <el-tab-pane name="first">
        <span slot="label"><icon :icon="['fal','wrench']"></icon> 控件属性</span> 控件属性
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
// import {Ctrl} from '@/components/webform/widget'
export default {
  name: 'webformSidebar',
  // props: ['currentView'],
  data () {
    return {
      webformAside: 'first',
      widgetLists: {},
      currentView: ''
    }
  },
  created () {
    // this.widgetLists = widgetsl
    // console.log(this.widgetLists, 'widgetListswidgetLists')
  },
  mounted () {
    this.$on('insertWidgetCtrl', (widgetNmae, position) => {
      this.initWidgetCtrl(widgetNmae, position)
    })
  },
  watch: {
    // currentView (val, oldVal) {
    //   // console.log('new: %s, old: %s', val, oldVal)
    //   console.log(this)
    // }
  },
  methods: {
    initWidgetCtrl (widgetNmae, position) {
      this.currentView = widgetNmae
    }
  },
  components: widgetsl
}
</script>
<style lang="scss">
  .webform-aside {
    overflow: initial;
    .el-tabs {
      height: 100%;
      margin-top: rem(-35);
    }
    .el-tabs__content {
      height: calc(100% - 2.25rem);
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
