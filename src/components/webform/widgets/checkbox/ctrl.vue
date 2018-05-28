<template>
  <el-form ref="form" label-width="80px" label-position="top" size="mini" class="check-ctrl">
    <el-form-item label="字段名称">
      <el-col :span="11">
        <el-input v-model="fieldName" @blur="inputfun"></el-input>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="11">
        <el-input v-model="fieldNamePinyin"></el-input>
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
          <td><el-checkbox :checked="checkListVal.includes(item.val)" @change="defaultChecked($event, item.val)"></el-checkbox></td>
          <td><el-checkbox :checked="item.disabled" name="" @change="item.disabled = !item.disabled"></el-checkbox></td>
          <td>
            <el-button type="primary" icon="el-icon-plus" v-if="key==0" @click="addCheckeBox"></el-button>
            <el-button type="primary" icon="el-icon-minus" v-if="key!==0"  @click="delCheckeBox($event, key)"></el-button>
          </td>
        </tr>
      </table>
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
// import dataview from './index'
export default {
  name: 'ctrl',
  // mixins: [dataview],
  data () {
    return {
      checkList: [],
      fieldName: '',
      fieldNamePinyin: '',
      checkListVal: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        fieldName: '',
        fieldNamePinyin: ''
      }
    }
  },
  created () {
    this.checkList = this.tdWidget.data['checkList']
    this.fieldName = this.tdWidget.data['fieldName']
    this.checkListVal = this.tdWidget.data['checkListVal']
    console.log('3-------------')
    // this.initCtrlTdData(this)
    console.log(this.tdWidget.data)
  },
  methods: {
    defaultChecked: function (e, v) {
      if (e) {
        if (!this.checkListVal.includes(v)) {
          this.checkListVal.push(v)
        }
      } else {
        this.checkListVal.map((m, i) => {
          if (m === v) {
            this.checkListVal.splice(i, 1)
          }
        })
      }
      console.log(this.tdWidget.data['checkListVal'])
    },
    addCheckeBox: function (e, v) {
      this.checkList.push(
        {
          disabled: false,
          label: '默认值',
          val: ''
        }
      )
      console.log(this.tdWidget.data['checkListVal'])
    },
    delCheckeBox: function (e, i) {
      console.log(i)
      this.checkList.splice(i, 1)
      console.log(this.tdWidget.data['checkListVal'])
    },
    add () {
      this.checkList.push('ss')
      console.log(this.tdWidget.data)
    },
    inputfun (e) {
      console.log(e.target.value)
      let fieldNamePinyin = pinyin(e.target.value, {
        style: pinyin.STYLE_NORMAL, // 设置拼音风格
        heteronym: false
      }).join('')
      this.fieldNamePinyin = fieldNamePinyin
      this.upDataTdDataActions({
        key: 'fieldNamePinyin',
        value: fieldNamePinyin
      })
      this.upDataTdDataActions({
        key: 'fieldName',
        value: e.target.value
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    ...mapActions([
      'initCtrlTdData',
      'updataTdWidgetData',
      'upDataTdDataActions'
    ]),
    ...mapMutations([
      'updataTdData'
    ])
  },
  computed: {
    ...mapGetters([
      'currenttd',
      'tdWidget'
    ])
    // fieldName: {
    //   get () {
    //     return this.tdWidget.data['fieldName']
    //   },
    //   set (value) {
    //     let fieldNamePinyin = pinyin(value, {
    //       style: pinyin.STYLE_NORMAL, // 设置拼音风格
    //       heteronym: false
    //     }).join('')
    //     this.fieldNamePinyin = fieldNamePinyin
    //     // this.updataTdData({
    //     //   key: 'fieldName',
    //     //   value
    //     // })
    //   }
    // }
  },
  watch: {
    // 'form.fieldName': {
    //   handler: function (val, oldval) {
    //     let fieldNamePinyin = pinyin(val, {
    //       style: pinyin.STYLE_NORMAL, // 设置拼音风格
    //       heteronym: false
    //     }).join('')
    //     this.form.fieldNamePinyin = fieldNamePinyin
    //   },
    //   deep: true // 对象内部的属性监听，也叫深度监听
    // }
    // 'currenttd': {
    //   handler: function (val, oldval) {
    //     this.updataTdWidgetData({val, newWidget: this})
    //   },
    //   deep: true // 对象内部的属性监听，也叫深度监听
    // }
  } // 以V-model绑定数据时使用的数据变化监测
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
