<template>
    <!--<el-checkbox-group v-model="checkListVal">-->
  <previewTemplate>
    <div class="sets" contenteditable="false">
      <div class="addtr"  contenteditable="false"> <el-button icon="el-icon-plus" size="mini" round @click="addTr"></el-button> </div>
      <div class="deltr" v-for="(col, key) in allData.tableData" :key="key" contenteditable="false">
        <el-button icon="el-icon-minus" size="mini" round @click="delTr(key, col)"></el-button>
      </div>
      <!--<table contenteditable="false">-->
        <!--<thead>-->
        <!--<tr>-->
          <!--<th contenteditable="false"><el-button icon="el-icon-plus" size="mini" round></el-button></th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr v-for="(col, key) in allData.tableData" :key="key">-->
          <!--<td contenteditable="false">-->
            <!--<el-button icon="el-icon-minus" size="mini" round></el-button>-->
          <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(col, key) in allData.tableColData" :key="key" :width="col.width" v-text="col.label"></th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr v-for="(col, key) in allData.tableData" :key="key">
          <td v-for="(item, i) in col" :key="i">
            <el-input v-model="col[i]" size="mini"></el-input>
          </td>
        </tr>
      </tbody>
    </table>
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
      tableColData: [
        {
          prop: 'moren',
          label: '默认',
          width: '180'
        }
      ],
      tableData: [{
        moren: 'morena'
      }]
    }
  },
  created () {
  },
  methods: {
    verifyFn () {
      if (!this.allData.errorIsShow) return false
      let checkeds = this.allData.checkList.filter(s => s.checked).length
      let status = !(checkeds >= this.allData.minNum && checkeds <= this.allData.maxNum)
      status && this.$message.error(`${this.allData.errorTipText}`)
    },
    addTr () {
      let _obj = {}
      this.allData.tableColData.forEach((v) => {
        console.log(v.prop)
        this.$set(_obj, v.prop, 'sss')
      })
      this.allData.tableData.push(_obj)
    },
    delTr (k, v) {
      console.log(k, v)
      this.allData.tableData.splice(k, 1)
      // let _obj = {}
      // this.allData.tableColData.forEach((v) => {
      //   console.log(v.prop)
      //   this.$set(_obj, v.prop, 'sss')
      // })
      // this.allData.tableData.push(_obj)
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
  .sets {
    position: absolute;
    right: rem(-30);
    border: 0;
    text-align: center;
    z-index: 1;
    .addtr {
      padding: rem(2);
    }
    .deltr {
      padding: rem(2);
    }
    /*table {*/
      /*margin: 0 !important;*/
      /*border: rem(1) solid transparent;*/
      /*td, th{*/
        /*text-align: left;*/
        /*border: rem(1) solid transparent;*/
      /*}*/
    /*}*/
  }
</style>
