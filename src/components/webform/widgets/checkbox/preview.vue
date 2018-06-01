<template>
    <!--<el-checkbox-group v-model="checkListVal">-->
  <previewTemplate class="p-l-xs">
    <el-checkbox v-for="(item, key) in allData.checkList" :key="key" :disabled="item.disabled" v-model="item.checked" :label="item.val" :class="{ vertical: allData.isVertical }" @change="verifyFn">
      {{item.label}}
    </el-checkbox>
  </previewTemplate>
    <!--</el-checkbox-group>-->
</template>

<script>
import previewMixins from '../preview-mixins'
import previewTemplate from '../preview-template'
export default {
  name: 'checkbox',
  mixins: [previewMixins],
  data () {
    return {
      checkList: [
        {
          disabled: false,
          label: '选项一',
          val: 'xiang',
          checked: false
        },
        {
          disabled: false,
          label: '选项二',
          val: 'xiang2',
          checked: false
        }
      ],
      checkListVal: [],
      minNum: 0,
      maxNum: 2,
      isVertical: false
    }
  },
  created () {
    console.log(this.allData)
  },
  methods: {
    verifyFn () {
      if (!this.allData.errorIsShow) return false
      let checkeds = this.allData.checkList.filter(s => s.checked).length
      let status = !(checkeds >= this.allData.minNum && checkeds <= this.allData.maxNum)
      status && this.$message.error(`${this.allData.errorTipText}`)
    }
  },
  watch: {
  }, // 以V-model绑定数据时使用的数据变化监测
  components: {
    previewTemplate
  },
  computed: {
  }
}
</script>

<style lang="scss">
  .el-checkbox {
    &.vertical {
      padding: rem(5) 0;
      display: block;
      &+.el-checkbox {
        margin-left: 0;
      }
    }
  }
</style>
