<template>
    <!--<el-checkbox-group v-model="checkListVal">-->
  <previewTemplate>
    <el-checkbox v-for="(item, key) in allData.checkList" :key="key" :disabled="item.disabled" v-model="item.checkedStatus" :label="item.val" >
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
          checkedStatus: false
        },
        {
          disabled: false,
          label: '选项二',
          val: 'xiang2',
          checkedStatus: false
        }
      ],
      checkListVal: [],
      minNum: 1,
      maxNum: 2
    }
  },
  created () {
    console.log(this.allData)
  },
  methods: {
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

<style scoped>

</style>
