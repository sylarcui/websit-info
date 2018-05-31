<template>
  <el-form ref="form" label-width="80px" label-position="top" size="mini" class="check-ctrl">
    <el-form-item label="字段名称">
      <el-col :span="11">
        <el-input v-model="widgetFieldName" @blur="widgetFieldNameBlur" placeholder="必须中文名称"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input v-model="_widgetFieldNamePinyin"  placeholder="必须英文名称"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="选项设置">
      <table class="check-ctrl-table">
        <tr>
          <th width="60">名称</th>
          <th width="60">值</th>
          <th>默认</th>
          <th>禁用</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, key) in checkList" :key="key">
          <td><el-input v-model="item.label"></el-input></td>
          <td><el-input v-model="item.val"></el-input></td>
          <td><el-checkbox v-model="item.checkedStatus"></el-checkbox></td>
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
          <el-input-number size="mini" :min="0" :max="checkList.length" v-model="minNum" controls-position="right" @change="changeMinNum"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item  label="最多选中">
          <el-input-number size="mini" :min="minNum" :max="checkList.length"  v-model="maxNum" controls-position="right" @change="changeMaxNum"></el-input-number>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item  label="错误提示设置">
      <el-col :span="6">
        <el-form-item  label="开启">
          <el-checkbox v-model="errorIsShow" @change="changeErrorIsShow"></el-checkbox>
        </el-form-item>
      </el-col>
      <!--<el-col :span="2">&nbsp;</el-col>-->
      <el-col :span="18">
        <el-form-item  label="提示文字">
            <el-input v-model="errorTipText" placeholder="必须中文名称"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item  label="说明文字">
      <el-col :span="6">
        <el-form-item  label="开启">
          <el-checkbox v-model="explainIsShow" @change="changeExplainIsShow"></el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item  label="提示文字">
          <el-input v-model="explainText" placeholder="必须中文名称"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="add">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
      checkList: [],
      widgetFieldName: '',
      widgetFieldName2: '',
      widgetFieldNamePinyin: '',
      errorTipText: '',
      explainText: '',
      explainIsShow: true,
      errorIsShow: false,
      checkListVal: [],
      minNum: 1,
      maxNum: 2
    }
  },
  created () {
    console.log(Utils)
    // this.errorIsShow = this.widgetData.gettdWidget().data.errorIsShow
  },
  methods: {
    changeMinNum (e) {
      // this.updateFun({minNum: e})
      this.upDataTdDatasActions({minNum: e})
    },
    changeErrorIsShow (e) {
      // this.updateFun({errorIsShow: e})
      this.upDataTdDatasActions({errorIsShow: e})
    },
    changeExplainIsShow (e) {
      // this.updateFun({explainIsShow: e})
      this.upDataTdDatasActions({explainIsShow: e})
    },
    changeMaxNum (e) {
      this.upDataTdDatasActions({minNum: e})
    },
    upRecord (i) {
      Utils.upRecord(this.checkList, i)
    },
    downRecord (i) {
      Utils.downRecord(this.checkList, i)
    },
    addCheckeBox: function (e, k) {
      // let key = this.checkList.length
      // let initNum = this.checkList.length
      // let _key = parseInt(_.toNumber(_.maxBy(this.checkList, 'val').val)) + 1
      // let key = !_key ? initNum + 1 : _key + 1
      // console.log(_key)
      this.checkList.push(
        {
          disabled: false,
          label: '选项一',
          val: `${UUID.genV4().hexFields[2]}`,
          checkedStatus: false
        }
      )
    },
    delCheckeBox: function (e, val) {
      this.checkList.map((m, index) => {
        if (m === val) {
          this.checkList.splice(index, 1)
        }
      })
      // this.checkListVal.map((m, i) => {
      //   if (m === val) {
      //     this.checkListVal.splice(i, 1)
      //   }
      // })
      // _.remove(this.checkListVal, function (n) {
      //   return n !== val
      // })
      // this.tdWidget.data['checkListVal'] = this.tdWidget.data['checkListVal'].filter(m => m !== i)
      // this.checkList.splice(i, 1)
    },
    add () {
      console.log(this.tdWidget)
    },
    widgetFieldNameBlur (e) {
      // this.widgetFieldName = e.target.value
      // this.widgetFieldNamePinyin = this._widgetFieldNamePinyin
      // this.updateFun(
      //   {
      //     widgetFieldNamePinyin: this._widgetFieldNamePinyin,
      //     widgetFieldName: e.target.value
      //   }
      // )
      // this.updateFun('widgetFieldNamePinyin', this._widgetFieldNamePinyin)
      // this.widgetData.gettdWidget().data['widgetFieldNamePinyin'] = this._widgetFieldNamePinyin
      // this.widgetData.gettdWidget().data['widgetFieldName'] = this.widgetFieldName
      this.upDataTdDatasActions(
        {
          widgetFieldNamePinyin: this._widgetFieldNamePinyin,
          widgetFieldName: e.target.value
        }
      )
    },
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
      'tdWidget'
    ]),
    _widgetFieldNamePinyin: function () {
      let fieldNamePinyin = pinyin(this.widgetFieldName, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false
      }).join('')
      return fieldNamePinyin
    }
  },
  watch: {
  }
}
</script>
<style lang="scss">
  .check-ctrl {
    .el-input__inner {
      padding: 0 rem(5);
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
