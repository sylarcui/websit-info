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
    <slot></slot>
  <el-form-item  label="提示设置开启">
    <el-col :span="6">
      <el-form-item  label="错误">
        <el-checkbox v-model="allData.errorIsShow"></el-checkbox>
      </el-form-item>
      <el-form-item  label="说明">
        <el-checkbox v-model="allData.explainIsShow"></el-checkbox>
      </el-form-item>
    </el-col>
    <!--<el-col :span="2">&nbsp;</el-col>-->
    <el-col :span="18">
      <el-form-item  label="错误提示">
        <el-input v-model="allData.errorTipText" placeholder="必须中文名称"></el-input>
      </el-form-item>
      <el-form-item  label="说明文字">
        <el-input v-model="allData.explainText" placeholder="必须中文名称"></el-input>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="deleteWidget">删除控件</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import pinyin from 'pinyin'
export default {
  name: 'preview-template',
  // props: ['errorTipText', 'errorIsShow', 'explainIsShow', 'explainText'],
  data: function () {
    return {
      allData: {}
    }
  },
  created () {
    this.allData = this.$store.getters.tdWidget.data
  },
  methods: {
    deleteWidget () {
      let uuid = this.$store.getters.currenttd.getAttribute('UUID')
      let _td = this.$store.getters.currenttd
      _td.innerHTML = '<br/>'
      _td.className = _td.className.replace('content-sed', '')
      this.$store.commit('delTdData', uuid)
      this.$store.commit('setCurrenttd', '')
      console.log(this.allData)
    }
  },
  watch: {
  }, // 以V-model绑定数据时使用的数据变化监测
  computed: {
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
}
</script>

<style scoped>

</style>
