<template>
  <el-form ref="form" label-width="80px" label-position="top" size="mini" class="check-ctrl">
    <el-form-item label="字段名称">
      <el-col :span="11">
        <el-input v-model="allData.widgetFieldName" placeholder="必须中文名称"></el-input>
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
        <tr v-for="(item, key) in allData.checkList" :key="key">
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
    <el-form-item  label="错误提示设置">
      <el-col :span="6">
        <el-form-item  label="开启">
          <el-checkbox v-model="allData.errorIsShow"></el-checkbox>
        </el-form-item>
      </el-col>
      <!--<el-col :span="2">&nbsp;</el-col>-->
      <el-col :span="18">
        <el-form-item  label="提示文字">
            <el-input v-model="allData.errorTipText" placeholder="必须中文名称"></el-input>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item  label="说明文字">
      <el-col :span="6">
        <el-form-item  label="开启">
          <el-checkbox v-model="allData.explainIsShow"></el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <el-form-item  label="提示文字">
          <el-input v-model="allData.explainText" placeholder="必须中文名称"></el-input>
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
      'tdWidget'
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
