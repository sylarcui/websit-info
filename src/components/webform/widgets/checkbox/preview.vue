<template>
    <!--<el-checkbox-group v-model="checkListVal">-->
  <div>
    {{explainIsShow}}{{errorIsShow}}{{maxNum}}
    <el-checkbox v-for="(item, key) in checkList" :key="key" :disabled="item.disabled" v-model="item.checkedStatus" :label="item.val" >
      {{item.label}}
    </el-checkbox>
  </div>
    <!--</el-checkbox-group>-->
</template>

<script>
import previewMixins from '../preview-mixins'
import previewTemplate from '../preview-template'
// import store from '@/store/'
export default {
  name: 'checkbox',
  mixins: [previewMixins],
  data () {
    return {
      // fieldName: '',
      // errorTipText: '',
      // explainText: '',
      explainIsShow: false,
      errorIsShow: false,
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
    // console.log(this.$store, '初始化2', store.getters.getTdWidget())
  },
  methods: {
  },
  watch: {
    'errorIsShow': {
      handler: function (val, oldval) {
        console.log(val)
      },
      deep: true // 对象内部的属性监听，也叫深度监听
    }
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
