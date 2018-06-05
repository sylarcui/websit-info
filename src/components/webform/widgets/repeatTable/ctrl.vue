<template>
  <ctrl-template>
  <el-form-item label="添加列">
    <table class="check-ctrl-table">
      <tr>
        <th width="40">序号</th>
        <th width="110">列名称</th>
        <th width="40">列宽</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, key) in allData.tableColData" :key="key">
        <td>{{key}}</td>
        <td><el-input v-model="item.label" @input="changeProp($event,item)" @blur="verify(item.label, key)"></el-input></td>
        <td><el-input v-model="item.width"></el-input></td>
        <td>
          <el-button-group>
            <el-button type="primary" icon="fal fa-long-arrow-up" @click="upRecord(key)"></el-button>
            <el-button type="primary" icon="fal fa-long-arrow-down" @click="downRecord(key)"></el-button>
            <el-button type="primary" icon="el-icon-plus" v-if="key==0" @click="addCheckeBox($event, key)"></el-button>
            <el-button type="primary" icon="el-icon-minus" v-if="key!==0"  @click="delCheckeBox($event, item)"></el-button>
          </el-button-group>
        </td>
      </tr>
    </table>
  </el-form-item>
</ctrl-template>
</template>

<script>
import ctrlTemplate from '../ctrl-template'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import pinyin from 'pinyin'
import ctrlMixins from '../ctrl-mixins'
import Utils from '@/Utils/'
import UUID from 'uuidjs'
// import Vue from 'vue'
export default {
  name: 'ctrl',
  mixins: [ctrlMixins],
  data () {
    return {
      isRepetition: false,
      key_: ''
    }
  },
  created () {
    // this.errorIsShow = this.widgetData.gettdWidget().data.errorIsShow
  },
  methods: {
    // changeVal (e, v) {
    //   this.upDataTdDatasActions({[v]: e})
    // },
    verify (v, k) {
      this.isRepetition = this.tdWidget.data.tableColData.filter(m => m.prop === v).length >= 2 || v === ''
      this.key_ = k
      this.isRepetition && this.$message.error('值不能重复, 也不能为空')
    },
    changeProp (e, item) {
      let fieldNamePinyin = pinyin(e, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false
      }).join('')
      item.prop = fieldNamePinyin
      console.log(e, item)
    },
    upRecord (i) {
      Utils.upRecord(this.allData.tableColData, i)
    },
    downRecord (i) {
      Utils.downRecord(this.allData.tableColData, i)
    },
    addCheckeBox: function (e, k) {
      this.allData.tableColData.push(
        {
          prop: UUID.genV4().hexFields[2],
          label: '默认',
          width: '180'
        }
      )
      // this.$set(this.allData.tableData[0], k, '')
    },
    delCheckeBox: function (e, val) {
      this.allData.tableColData.map((m, index) => {
        if (m === val) {
          this.allData.tableColData.splice(index, 1)
        }
      })
    },
    add () {
      console.log(this.tdWidget)
    },
    // widgetFieldNameBlur (e) {
    //   this.upDataTdDatasActions(
    //     {
    //       widgetFieldNamePinyin: this._widgetFieldNamePinyin,
    //       widgetFieldName: e.target.value
    //     }
    //   )
    // },
    ...mapActions([
      'initCtrlTdData',
      'updataTdWidgetData',
      'upDataTdDataActions',
      'upDataTdDatasActions'
    ]),
    ...mapMutations([
      'updataTdData'
    ])
  },
  computed: {
    ...mapGetters([
      'currenttd',
      'tdWidget',
      'tdWidgetList'
    ])
  },
  watch: {
    'allData.tableColData': {
      handler: function (val, oldval) {
        console.log(val.map(v => v.prop))
        console.log(val)
        let _obj = {}
        val.forEach((v) => {
          console.log(v.prop)
          this.$set(_obj, v.prop, 'sss')
        })
        this.$set(this.allData.tableData, 0, _obj)
        this.$set(this.allData.tableData, 1, _obj)
        console.log(this)
        // this.tableData.tableData[0] =
        // this.$set('this.tableData.tableData')
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
  },
  components: {
    ctrlTemplate
  }
}
</script>
<style lang="scss">
  .check-ctrl {
    .el-input__inner {
      padding: 0 rem(5);
    }
  }
  .is-error {
    .el-input__inner{
      border: rem(1) solid #f56c6c;
    }
  }
</style>
<style scoped lang="scss">
  .check-ctrl-table {
    tr {
      td {
        text-align: center;
        padding: rem(2);
      }
    }
  }
</style>
