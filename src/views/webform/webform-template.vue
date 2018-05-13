<template>
  <el-container class="webform-wrapper">
    <el-header class="webform-header" height="90">
      <div class="header-top">
        <div class="float-l">
          <icon :icon="['fas', 'save']"  fixed-width></icon>
          <icon :icon="['fas', 'folder']" fixed-width></icon>
        </div>
        <div class="float-r">
          <el-input v-model="formName" placeholder="请输入表单名称" size="mini"></el-input>
          <el-button type="primary" size="mini">保存</el-button>
          <div class="avatar">
            <img src="../../assets/avatar.jpg" />
          </div>
          <icon :icon="['fal', 'chevron-down']" class="icon-chevron-down" fixed-width></icon>
        </div>
      </div>
      <el-tabs type="card" class="header-tab">
        <el-tab-pane v-for="(data, index) in widgetLists" :key="index">
          <span slot="label"><i :class="data.icon"></i> {{data.group}}</span>
          <ul class="controls-list clearfix">
            <li class="controls" v-for="(item, key) in data.groupList" :key="key" @click="selectWidget(item.widgetType)" :title="item.name">
              <div class="controls-con">
                <span class="controls-icon"><icon :icon="item.icon" class="controls-icon-style" fixed-width></icon></span>
                <span class="controls-name">{{item.name}}</span>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="页面设置">页面设置</el-tab-pane>
      </el-tabs>
      <div class="toolbar">
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <icon :icon="['fal', 'print']"/>
            <!--<i class="fa fa-print"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <icon :icon="['fal', 'clone']"/>
            <!--<i class="fa fa-clone"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <icon :icon="['fal', 'reply']"/>
            <!--<i class="fa fa-reply"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <icon :icon="['fal', 'share']"/>
            <!--<i class="fa fa-share"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <icon :icon="['fal', 'eraser']"/>
            <!--<i class="fa fa-eraser"></i>-->
          </el-tooltip>
        </div>
        <el-dropdown split-button size="mini" >
          <el-tooltip class="item" effect="dark" content="居中对齐" placement="bottom">
            <icon :icon="['fal', 'align-center']"/>
            <!--<i class="fa fa-align-center"></i>-->
          </el-tooltip>
          <el-dropdown-menu slot="dropdown">
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <icon :icon="['fal', 'align-justify']"/>
                <!--<i class="fa fa-align-justify"></i>-->
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="居左对齐" placement="left">
              <el-dropdown-item>
                <icon :icon="['fal', 'align-left']"/>
                <!--<i class="fa fa-align-left"></i>-->
              </el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<el-dropdown split-button size="mini" >-->
        <!--<el-tooltip class="item" effect="dark" content="字体" placement="bottom">-->
        <!--<font-icon :icon="['fal', 'font']"/></el-tooltip>-->
        <!--<el-dropdown-menu slot="dropdown">-->
        <!--<el-dropdown-item><font-icon :icon="['fal', 'align-justify']"/></el-dropdown-item>-->
        <!--<el-dropdown-item><font-icon :icon="['fal', 'align-left']"/></el-dropdown-item>-->
        <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="加粗" placement="bottom">
            <icon :icon="['fal', 'bold']" />
            <!--<i class="fa fa-bold"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
            <icon :icon="['fal', 'italic']"/>
            <!--<i class="fa fa-italic"></i>-->
          </el-tooltip>
        </div>
        <el-dropdown split-button size="mini" >
          <el-tooltip class="item" effect="dark" content="标题" placement="bottom">
            <icon :icon="['fal', 'heading']"/>
            <!--<i class="fa fa-header"></i>-->
          </el-tooltip>
          <el-dropdown-menu  slot="dropdown">
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <icon :icon="['fal', 'h1']"/>
                <!--<i class="fa fa-header"></i>-->
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <icon :icon="['fal', 'h2']"/>
                <!--<i class="fa fa-header"></i>-->
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <icon :icon="['fal', 'h3']"/>
                <!--<i class="fa fa-header"></i>-->
              </el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
            <icon :icon="['fal', 'underline']" />
            <!--<i class="fa fa-underline"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
            <icon :icon="['fal', 'strikethrough']"/>
            <!--<i class="fa fa-strikethrough"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
            <icon :icon="['fal', 'font']"/>
            <!--<i class="fa fa-font"></i>-->
          </el-tooltip>
        </div>
        <el-dropdown split-button size="mini" >
          <el-tooltip class="item" effect="dark" content="标题" placement="bottom">
            <icon :icon="['fal', 'th-large']"/>
            <!--<i class="fa fa-th-large"></i>-->
          </el-tooltip>
          <el-dropdown-menu  slot="dropdown">
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item >
                <div @click="redips.merge()">合并</div>
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <div  @click="redips.split('v')">拆分行</div>
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <div @click="redips.split('h')">拆分列</div>
              </el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown split-button size="mini" >
          <el-tooltip class="item" effect="dark" content="标题" placement="bottom">
            <icon :icon="['fal', 'table']"/>
            <!--<i class="fa fa-table"></i>-->
          </el-tooltip>
          <el-dropdown-menu  slot="dropdown">
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <div @click="redips.row('insert')">添加行</div>
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <div @click="redips.row('delete')">删除行</div>
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <div @click="redips.column('insert')" >增加列</div>
              </el-dropdown-item>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">
              <el-dropdown-item>
                <div  @click="redips.column('delete')">删除列</div>
              </el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
            <icon :icon="['fal', 'cut']"/>
            <!--<i class="fa fa-cut"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
            <icon :icon="['fal', 'paint-brush']"/>
            <!--<i class="fa fa-cut"></i>-->
          </el-tooltip>
        </div>
        <div class="top-set-btn-icon">
          <el-tooltip class="item" effect="dark" content="斜体" placement="bottom">
            <icon :icon="['fal', 'link']"/>
            <!--<i class="fa fa-link"></i>-->
          </el-tooltip>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-main class="webform-main">
        <div class="page-preview">
          <tableView></tableView>
        </div>
      </el-main>
      <webformSidebar :currentView="currentView"></webformSidebar>
    </el-container>
  </el-container>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import widget from '@/components/webform/webform-widget'
import tableView from '@/components/webform/table-views'
import webformSidebar from './webform-sidebar'
export default {
  name: 'webformTemplate',
  data () {
    return {
      formName: '',
      webformAside: 'first',
      widgetLists: [],
      currentView: ''
    }
  },
  created () {
    this.widgetLists = widget
    console.log(tableView)
  },
  methods: {
    selectWidget (widgetType) {
      console.log(widgetType)
      this.currentView = widgetType
      this.tdAddWidgets()
      if (this.tdWidgets[widgetType]) {
        this.currentElList[0].innerHTML = this.tdWidgets[widgetType].outerHTML
      }
      console.log(this.tdWidgets[widgetType])
    },
    ...mapMutations([
      'tdAddWidgets'
    ])
  },
  components: {
    tableView,
    webformSidebar
  },
  computed: {
    ...mapGetters([
      'tdWidgets',
      'currentElList'
    ])
  }
}
</script>
<style lang="scss">
  .webform-wrapper {
    .webform-header {
      .toolbar {
        .el-button-group {
          border: 1px solid rgba(153, 153, 153, 0);
          &:hover {
            border: 1px solid rgba(153, 153, 153, 0.3);
          }
          &:focus {
            border: 1px solid rgba(153, 153, 153, 0.3);
            background-color: rgba(0,0,0,0.3);
          }
        }
        .el-button:focus, .el-button:hover {
          color: inherit;
        }
        .el-button--mini, .el-button--mini.is-round {
          padding: 3px;
          width: auto;
          background: transparent;
          border: 1px solid transparent;
          .top-set-btn-icon {
          }
          &:hover {
          }
        }
        .el-button--mini.el-dropdown__caret-button {
          padding-left: 0px;
          padding-right: 0px;
        }
        .el-button--mini, .el-button--small {
          border-radius: 0;
        }
        .el-dropdown__icon {
          margin: 0;
          transform:scale(0.7);
        }
      }
    }

    .header-top {
      .el-input {
        width: rem(200);
        vertical-align: middle;
      }
      .el-input__inner {
        background-color: #111C2D;
        border: transparent;
        &::-webkit-input-placeholder {
          color: #2F3E55;
        }
      }
    }
    .header-tab {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      position: relative;
      z-index: 1;
      .el-tabs__header {
        background-color: $default--color;
        padding-left: rem(10);
        margin-bottom: 0;
        .el-tabs__item {
          padding: 0 rem(5);
          height: rem(24);
          line-height: rem(24);
          font-size: rem(12);
        }
        .el-tabs__nav {
          border: 0;
        }
        .el-tabs__item {
          border: none;
          color: white;
          border-radius: rem(2) rem(2) 0 0;
          margin-right: rem(5);
          &.is-active {
            background-color: white;
            color: $default--color;
          }
        }
      }
      .el-tabs__content {
        background-color: white;
        .el-tab-pane {
          padding: rem(10);
        }
      }
    }

  }
</style>
<style scoped lang="scss">
  .webform-wrapper {
    background-color: #F9FBFF;
    height: 100%;
    .webform-header {
      position: relative;
      z-index: 1;
      /*box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);*/
      .toolbar {
        border-bottom: rem(1) solid #D5D5D5;
        border-top: rem(1) solid #D5D5D5;
        background-color: #F2F2F2;
        height: rem(36);
        font-size: 12px;
        text-align: center;
        padding: 8px 0;
        padding-right: rem(220);
        .top-set-btn-icon {
          border: 1px solid rgba(153, 153, 153, 0);
          display: inline-block;
          position: relative;
          vertical-align: baseline;
          cursor: pointer;
          height: 20px;
          color: #5f6265;
          font-size: 14px;
          padding:0 5px;
          line-height: 20px;
          &:hover {
            border: 1px solid rgba(153, 153, 153, 0.3);
          }
        }
      }
      .header-top {
        position: relative;
        z-index: 2;
        height: rem(30);
        padding: rem(5) rem(10);
        background-color: $default--color;
        color: #ffffff;
        .float-r {
          text-align: right;
          width: rem(500);
          .avatar {
            display: inline-block;
            vertical-align: middle;
            width: rem(40);
            height: rem(40);
            margin: 0 auto;
            border-radius: rem(3);
            overflow: hidden;
            margin-left: rem(15);
            margin-right: rem(-5);
            img {
              width: 100%;
            }
          }
          .icon-chevron-down {
            font-size: rem(12);
          }
        }
      }
    }
    .webform-main {
      position: relative;
      z-index: 0;
    }
    .controls-list {
      .controls {
        float: left;
        font-size: rem(12);
        text-align: center;
        width: rem(80);
        border-right: rem(1) solid rgba(151,151,151,0.3);
        padding:0 rem(3);
        .controls-icon {
          display: block;
          .controls-icon-style {
            font-size: rem(20);
          }
        }
        .controls-name {
          display: block;
          line-height: 2;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .controls-con {
          padding: rem(5);
          border-radius: rem(2);
          cursor: pointer;
          &:hover {
            background-color: rgba(0,0,0,0.1);
          }
        }
      }
    }
    .page-preview {
      width: rem(800);
      min-height: rem(1000);
      background-color: white;
      margin: rem(20) auto;
      box-shadow: 0 0px 10px 0 rgba(0, 0, 0, 0.12), 0 0 10px 0 rgba(0, 0, 0, 0.04);
    }
  }
</style>
