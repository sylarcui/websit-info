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
          <el-button type="primary" size="mini" @click="getsed">保存</el-button>
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
            <li class="controls" v-for="(item, key) in data.groupList" :key="key" @click.prevent.stop="selectWidget(item.widgetType)" :title="item.name">
              <div class="controls-con">
                <span class="controls-icon"><icon :icon="item.icon" class="controls-icon-style" fixed-width></icon></span>
                <span class="controls-name">{{item.name}}</span>
              </div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="页面设置">页面设置</el-tab-pane>
      </el-tabs>
      <div id="toolbarContainer" class="toolbar">
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="加粗" placement="bottom">-->
            <!--<icon :icon="['fal', 'print']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-print"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="加粗" placement="bottom">-->
            <!--<icon :icon="['fal', 'clone']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-clone"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="加粗" placement="bottom">-->
            <!--<icon :icon="['fal', 'reply']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-reply"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="加粗" placement="bottom">-->
            <!--<icon :icon="['fal', 'share']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-share"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="加粗" placement="bottom">-->
            <!--<icon :icon="['fal', 'eraser']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-eraser"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<el-dropdown split-button size="mini" >-->
          <!--<el-tooltip class="item" effect="dark" content="居中对齐" placement="bottom">-->
            <!--<icon :icon="['fal', 'align-center']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-align-center"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
          <!--<el-dropdown-menu slot="dropdown">-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<icon :icon="['fal', 'align-justify']"/>-->
                <!--&lt;!&ndash;<i class="fa fa-align-justify"></i>&ndash;&gt;-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="居左对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<icon :icon="['fal', 'align-left']"/>-->
                <!--&lt;!&ndash;<i class="fa fa-align-left"></i>&ndash;&gt;-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--&lt;!&ndash;<el-dropdown split-button size="mini" >&ndash;&gt;-->
        <!--&lt;!&ndash;<el-tooltip class="item" effect="dark" content="字体" placement="bottom">&ndash;&gt;-->
        <!--&lt;!&ndash;<font-icon :icon="['fal', 'font']"/></el-tooltip>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-dropdown-menu slot="dropdown">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-dropdown-item><font-icon :icon="['fal', 'align-justify']"/></el-dropdown-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-dropdown-item><font-icon :icon="['fal', 'align-left']"/></el-dropdown-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-dropdown-menu>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-dropdown>&ndash;&gt;-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="加粗" placement="bottom">-->
            <!--<icon :icon="['fal', 'bold']" />-->
            <!--&lt;!&ndash;<i class="fa fa-bold"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="斜体" placement="bottom">-->
            <!--<icon :icon="['fal', 'italic']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-italic"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<el-dropdown split-button size="mini" >-->
          <!--<el-tooltip class="item" effect="dark" content="标题" placement="bottom">-->
            <!--<icon :icon="['fal', 'heading']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-header"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
          <!--<el-dropdown-menu  slot="dropdown">-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<icon :icon="['fal', 'h1']"/>-->
                <!--&lt;!&ndash;<i class="fa fa-header"></i>&ndash;&gt;-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<icon :icon="['fal', 'h2']"/>-->
                <!--&lt;!&ndash;<i class="fa fa-header"></i>&ndash;&gt;-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<icon :icon="['fal', 'h3']"/>-->
                <!--&lt;!&ndash;<i class="fa fa-header"></i>&ndash;&gt;-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="斜体" placement="bottom">-->
            <!--<icon :icon="['fal', 'underline']" />-->
            <!--&lt;!&ndash;<i class="fa fa-underline"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="斜体" placement="bottom">-->
            <!--<icon :icon="['fal', 'strikethrough']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-strikethrough"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="斜体" placement="bottom">-->
            <!--<icon :icon="['fal', 'font']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-font"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<el-dropdown split-button size="mini" >-->
          <!--<el-tooltip class="item" effect="dark" content="标题" placement="bottom">-->
            <!--<icon :icon="['fal', 'th-large']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-th-large"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
          <!--<el-dropdown-menu  slot="dropdown">-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item >-->
                <!--<div @click="redips.merge()">合并</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<div  @click="redips.split('v')">拆分行</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<div @click="redips.split('h')">拆分列</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--<el-dropdown split-button size="mini" >-->
          <!--<el-tooltip class="item" effect="dark" content="标题" placement="bottom">-->
            <!--<icon :icon="['fal', 'table']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-table"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
          <!--<el-dropdown-menu  slot="dropdown">-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<div @click="redips.row('insert')">添加行</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<div @click="redips.row('delete')">删除行</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<div @click="redips.column('insert')" >增加列</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
            <!--<el-tooltip class="item" effect="dark" content="俩端对齐" placement="left">-->
              <!--<el-dropdown-item>-->
                <!--<div  @click="redips.column('delete')">删除列</div>-->
              <!--</el-dropdown-item>-->
            <!--</el-tooltip>-->
          <!--</el-dropdown-menu>-->
        <!--</el-dropdown>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="斜体" placement="bottom">-->
            <!--<icon :icon="['fal', 'cut']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-cut"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="斜体" placement="bottom">-->
            <!--<icon :icon="['fal', 'paint-brush']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-cut"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
        <!--<div class="top-set-btn-icon">-->
          <!--<el-tooltip class="item" effect="dark" content="斜体" placement="bottom">-->
            <!--<icon :icon="['fal', 'link']"/>-->
            <!--&lt;!&ndash;<i class="fa fa-link"></i>&ndash;&gt;-->
          <!--</el-tooltip>-->
        <!--</div>-->
      </div>
    </el-header>
    <el-container>
      <el-main class="webform-main">
        <div class="page-preview">
          <froala :tag="'div'" ref="froala" :config="config"><tableView ref="tableView"></tableView></froala>
          <!--<froala :onManualControllerReady="initialize" :config="config" v-model="model">Check out the <a href="https://www.froala.com/wysiwyg-editor">Froala Editor</a>-->

          <!--</froala>-->
        </div>
      </el-main>
      <webformSidebar ref="webformSidebar"></webformSidebar>
    </el-container>
  </el-container>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import widgetLists from '@/components/webform/webform-widget'
import tableView from '@/components/webform/table-views'
import webformSidebar from './webform-sidebar'
import $ from 'jquery'
import UUID from 'uuidjs'
import { Widget } from '@/components/webform/widget'
export default {
  name: 'webformTemplate',
  data () {
    return {
      formName: '',
      webformAside: 'first',
      widgetLists: [],
      currentView: '',
      widgetKey: '',
      widgetName: '',
      editor: null,
      // getsed: null,
      config: {
        events: {
          'froalaEditor.initialized': (e, editor) => {
            this.editor = editor
          },
          // 添加事件，在每次按键按下时，都记录一下最后停留位置
          'froalaEditor.commands.before': (e, editor, html, ee) => {
            console.log(e,editor, editor.core.isEmpty(), editor.selection.inEditor(), html, ee)
            if (!editor.selection.inEditor()) {
              return false
            }
          },
          // 添加事件，在每次鼠标点击时，都记录一下最后停留位置
          'froalaEditor.mousedown': (e, editor, html) => {
            // console.log(e, editor, html.target)
            $('.contactTable').find('.content-sed').removeClass('content-sed')
            this.setCurrenttd('')
          },
          'froalaEditor.mouseup': (e, editor, html) => {
            // console.log(e, html, $(html.target).parents('td').length, html.target.nodeName === 'TD')
            if ($(html.target).parents('td').length) {
              // console.log('222', this.setCurrenttd)
              $(html.target).parents('td').addClass('content-sed')
              this.setCurrenttd($(html.target).parents('td')[0])
            } else if (html.target.nodeName === 'TD') {
              // console.log('11')
              this.setCurrenttd(html.target)
              $(html.target).addClass('content-sed')
            }
          }
        },
        language: 'zh_cn',
        charCounterCount: false,
        disableRightClick: true,
        enter: $.FroalaEditor.ENTER_BR,
        htmlAllowComments: true,
        // tableResizer: false,
        pastePlain: true,
        tableCellStyles: {
          class1: 'Class 1',
          class2: 'Class 2',
          class3: 'Class 3'
        },
        tableStyles: {
          class1: 'Class 1',
          class2: 'Class 2',
          class3: 'Class 3'
        },
        // toolbarInline: true,
        // toolbarSticky: false,
        toolbarButtons: ['check', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'insertLink', 'insertImage', 'insertFile', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', '|', 'undo', 'redo'],
        tableEditButtons: ['tableHeader', 'check', '|', 'tableRows', 'tableColumns', 'tableStyle', '-', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableCellStyle'],
        // tableInsertButtons: ['tableBack', 'tableRows', 'tableColumns', 'tableCells', 'tableCellVerticalAlign', 'tableHeader'],
        toolbarContainer: '#toolbarContainer'
        // tableColors: ['#61BD6D', '#1ABC9C', '#54ACD2', 'REMOVE']
        // tableColorsButtons: ['tableBack']
      },
      model: 'Edit Your Content Here!'
    }
  },
  created () {
    this.widgetLists = widgetLists
    console.log($.FroalaEditor.DefineIcon('check', { NAME: 'check-square' }))
    $.FroalaEditor.DefineIcon('check', { NAME: 'check-square' })
    $.FroalaEditor.RegisterCommand('check', {
      title: 'check-box',
      focus: true,
      undo: true,
      refreshAfterCallback: false,
      callback: () => {
        let froala = document.querySelector('.contactTable')
        let titleDiv = document.createElement('div')
        titleDiv.contentEditable = true
        titleDiv.setAttribute('placeholder', '输入标题')
        titleDiv.className = 'page-title'
        let fistNode = froala.firstChild
        froala.insertBefore(titleDiv, fistNode)
        console.log(froala)
      }
    })
    // this.getsed = () => {
    //   // this.initControls.html.set('')
    //   // console.log(this.editor)
    //   // this.initControls.getEditor()('undo.reset')
    //   // this.initControls.getEditor()('undo.saveStep')
    // }
  },
  mounted: function () {
    this.$nextTick(() => {
      // console.log($.FroalaEditor.DefineIcon('check', { NAME: 'check-square' }))
    })
  },
  methods: {
    getsed () {
      // this.editor.html.set('')
      // this.editor.html.getSelected()
    },
    selectWidget (widgetType) {
      this.widgetName = widgetType
      if (!this.currenttd.getAttribute('UUID')) {
        this.currenttd.setAttribute('UUID', UUID.genV4().hexFields[2])
      }
      this.addTdCtrlWidgetNmae({
        tdid: this.currenttd.getAttribute('uuid'),
        CtrlWidget: widgetType
      })
      console.log([this.currenttd])
      this.widgetKey = this.currenttd.getAttribute('UUID')
      let currentWidget = new Widget({
        propsData: {
          widgetNmae: widgetType,
          position: this.currenttd.getAttribute('UUID')
        }
      })
      currentWidget.$mount(this.currenttd.firstChild)
      this.$refs.webformSidebar.$emit('insertWidgetCtrl', widgetType, this.widgetKey)
      // console.log(this.getTdWidget(this.currenttd.getAttribute('UUID')), ';;;;;;;;;')
    },
    ...mapMutations([
      'addTdCtrlWidgetNmae',
      'setCurrenttd'
    ])
  },
  watch: {
    'currenttd': {
      handler: function (val, oldval) {
        console.log(val)
        if (val) {
          if (val && this.getTdWidget(val.getAttribute('UUID'))) {
            this.$refs.webformSidebar.$emit('insertWidgetCtrl', this.getTdWidget(val.getAttribute('UUID')).CtrlWidget, this.widgetKey)
          } else {
            this.$refs.webformSidebar.$emit('insertWidgetCtrl', '', this.widgetKey)
          }
        }
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  },
  components: {
    tableView,
    webformSidebar
  },
  computed: {
    ...mapGetters([
      'widgets',
      'currentElList',
      'currenttd',
      'getTdWidget'
    ])
  }
}
</script>
<style lang="scss">
  .fr-wrapper {
    & > div[style^="z-index"] {
      display: none;
      height: 0;
      overflow: hidden;
      position: absolute !important;
      top: -1000px;
    }
  }
  .fr-box.fr-basic .fr-element {
    padding: rem(30);
  }
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
        .fr-toolbar {
          border-top: 0px solid #222;
          box-shadow: none;
          background-color: transparent;
          padding-top: rem(3);
          text-align: center;
          white-space:nowrap;
          .fr-separator {
            &.fr-vs {
              height: rem(26);
              display: inline-block;
              float: none;
              vertical-align: middle;
            }
          }
          .fr-command {
            &.fr-btn {
              width: rem(30);
              height: rem(30);
              display: inline-block;
              float: none;
              vertical-align: middle;
              i {
                margin: rem(5);
              }
            }
          }
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
        /*padding: 8px 0;*/
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
