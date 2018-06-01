<template>
  <el-aside width="300px"  class="webform-aside">
    <el-tabs v-model="webformAside" type="card">
      <el-tab-pane name="first">
        <span slot="label"><icon :icon="['fal','wrench']"></icon> 控件属性</span>
        <transition name="el-fade-in-linear">
          <component :is="currentView"></component>
        </transition>
        <!--<div ref="widgetCtrl" id="aaa"><div></div></div>-->
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label"><icon :icon="['fal','tasks']"></icon> 控件列表</span>
        <ul class="widget-list">
          <li v-for="(item, key) in tdWidgetList" :key="key" class="widget-list-item" @click="selectiveWidget(item.CtrlWidget ,key)">
            <div class="widget-list-item-icon">
              <i class="fa fa-check-square"></i><strong class="widget-list-item-name">{{item.data.widgetFieldName || '未命名'}}</strong>
            </div>
            <div class="widget-list-item-other">
              sad
            </div>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </el-aside>
</template>

<script>
import * as widgetsl from '@/components/webform/widgets/ctrl'
import widgetData from '@/components/webform/widgets/widget-data'
import {mapGetters, mapMutations} from 'vuex'
import $ from 'jquery'
export default {
  name: 'webformSidebar',
  props: ['froala'],
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
    'currenttd': {
      handler: function (val, oldval) {
        if (val) {
          if (this.tdWidget) {
            this.currentView = this.tdWidget.CtrlWidget
          }
        } else {
          this.currentView = ''
        }
        console.log(val, '======>')
        // this.updataTdWidgetData({val, newWidget: this})
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    selectiveWidget (widgetName, k) {
      let _td = $(this.froala.$el).find(`[uuid = ${k}]`)
      $(this.froala.$el).find('.content-sed').removeClass('content-sed')
      $(_td[0]).addClass('content-sed')
      this.setCurrenttd(_td[0])
      this.initWidgetCtrl(widgetName, k)
    },
    initWidgetCtrl (widgetName, position) {
      this.currentView = ''
      console.log(widgetName, position)
      if (this.getTdWidget(position)) {
        this.currentView = widgetName
      }
    },
    ...mapMutations([
      'addTdCtrlwidgetName',
      'setCurrenttd'
    ])
  },
  computed: {
    ...mapGetters([
      'currenttd',
      'tdWidget',
      'getTdWidget',
      'tdWidgetList'
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
        width: rem(149);
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
    .widget-list {
      .widget-list-item {
        font-size: rem(12);
        padding-left: rem(30);
        color: #676a6c;
        .widget-list-item-icon {
          margin-left: rem(-29);
          line-height: rem(30);
          height: rem(30);
          /*border-bottom: rem(1) solid #e7eaec;*/
          i {
            width: rem(30);
            height: rem(30);
            text-align: center;
            border: 1px solid #e7eaec;
            background: #f8f8f8;
            display: inline-block;
            line-height: rem(30);
          }
          .widget-list-item-name {
            padding: rem(5);
            height: rem(30);
          }
        }
        .widget-list-item-other {
          border-left: 1px solid #e7eaec;
          border-bottom: 1px solid #e7eaec;
          padding: rem(5);
          margin-bottom: rem(-1);
          padding-bottom: rem(15);
        }
        &:hover {
          .widget-list-item-icon {
            background-color: #f6f6f6;
          }
        }
      }
    }
  }
</style>
