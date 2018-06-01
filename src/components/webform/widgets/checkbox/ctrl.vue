<template>
  <ctrl-template>
  <el-form-item label="选项设置">
    <table class="check-ctrl-table">
      <tr>
        <th width="60">名称</th>
        <th width="60">值</th>
        <th>默认</th>
        <th>禁用</th>
        <th>操作</th>
      </tr>
      <tr v-for="(item, key) in allData.checkList" :key="key">
        <td><el-input v-model="item.label"></el-input></td>
        <td><el-input v-model="item.val" @blur="verify(item.val, key)" @focus="isRepetition = false; key_ = '' " :class="{'is-error': key_ == key && isRepetition}"></el-input></td>
        <td><el-checkbox v-model="item.checked"></el-checkbox></td>
        <td><el-checkbox v-model="item.disabled"></el-checkbox></td>
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
  <el-form-item>
    <el-col :span="11">
      <el-form-item  label="最少选中">
        <el-input-number size="mini" :min="0" :max="allData.checkList.length" v-model="allData.minNum" controls-position="right"></el-input-number>
      </el-form-item>
    </el-col>
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="11">
      <el-form-item  label="最多选中">
        <el-input-number size="mini" :min="allData.minNum" :max="allData.checkList.length"  v-model="allData.maxNum" controls-position="right"></el-input-number>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-col :span="11"><span class="el-form-item__label">是否竖版显示</span> </el-col>
    <el-col :span="2">&nbsp;</el-col>
    <el-col :span="11"><el-switch v-model="allData.isVertical"></el-switch></el-col>
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
    console.log(Utils)
    // this.errorIsShow = this.widgetData.gettdWidget().data.errorIsShow
  },
  methods: {
    // changeVal (e, v) {
    //   this.upDataTdDatasActions({[v]: e})
    // },
    verify (v, k) {
      this.isRepetition = this.tdWidget.data.checkList.filter(m => m.val === v).length >= 2 || v === ''
      this.key_ = k
      this.isRepetition && this.$message.error('值不能重复, 也不能为空')
    },
    upRecord (i) {
      Utils.upRecord(this.allData.checkList, i)
    },
    downRecord (i) {
      Utils.downRecord(this.allData.checkList, i)
    },
    addCheckeBox: function (e, k) {
      this.allData.checkList.push(
        {
          disabled: false,
          label: '选项一',
          val: `${UUID.genV4().hexFields[2]}`,
          checkedStatus: false
        }
      )
    },
    delCheckeBox: function (e, val) {
      console.log(this.allData)
      this.allData.checkList.map((m, index) => {
        if (m === val) {
          this.allData.checkList.splice(index, 1)
        }
      })
      if (this.allData.maxNum > this.allData.checkList.length) {
        this.allData.maxNum = this.allData.checkList.length
      }
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
    ]),
    _widgetFieldNamePinyin: {
      get: function () {
        let fieldNamePinyin = pinyin(this.allData.widgetFieldName, {
          style: pinyin.STYLE_NORMAL, // 设置拼音风格
          heteronym: false
        }).join('')
        /* eslint-disable */
        this.allData.widgetFieldNamePinyin = fieldNamePinyin
        return fieldNamePinyin
      },
      set: function (v) {
        v = v.replace(/[^\w\.\/]/ig,'')
        console.log(v)
        this.allData.widgetFieldNamePinyin = v
      }
    }
  },
  watch: {
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
