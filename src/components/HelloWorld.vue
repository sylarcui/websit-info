<template>
  <div class="hello">
    <button @click="merge()">合并</button>
    <button @click="merge('row')">合并行</button>
    <button @click="merge('col')">合并列</button>
    <table width="100%" class="table">
      <tr v-for="(data, key) in tdData" :key="key">
        <td v-for="(td, index) in data" :class="{ active: td.redips.selected }"
            v-if="td.show"
            :key="index"
            :x="index"
            :y="key"
            @click="selectedTd(td)"
            :colspan="td.colspan"
            :rowspan="td.rowspan">
            {{td.rowspan}} {{`${key}-${index}`}}<br/>
            next:{{td.nextdata}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.initTable()
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  methods: {
    ...mapMutations(['initTable']),
    selectedTd (td) {
      td.redips.selected = !td.redips.selected
      console.log(td)
    },
    merge (type) {
      this.tdData.forEach((tr, trIndex) => {
        if (type === 'row') {
          this.mergeCell(tr, trIndex, type)
        } else {
          this.mergeCell(tr, trIndex, type)
        }
        let _row
        for (let i = 0; i < tr.length; i++) {
          let td = tr[i]
          _row = 0
          if (td.rowspan > 1) {
            _row++
          }
          console.log(i, _row)
          td.nextdata = `${trIndex + td.rowspan}-${i - _row}`
        }
      })
    },
    mergeCell (tr, trIndex, type) {
      for (let i = 0; i < tr.length; i++) {
        if (tr[i + 1] === undefined || this.tdData[trIndex + tr[i].rowspan] === undefined) {
          break
        }
        let td = tr[i]
        let nextTd
        // console.log(this.tdData[trIndex + tr[i].rowspan], 'sss')
        let _row = 0
        if (td.rowspan > 1) {
          _row++
        }
        // console.log(td.rowspan > 1, _row, trIndex + tr[i].rowspan, 'tdrow')
        if (type === 'row') {
          nextTd = this.tdData[trIndex + tr[i].rowspan][i - _row]
          console.log(type, nextTd, td.y, '-0-0-0-')
        } else {
          nextTd = tr[i + 1]
        }
        let span = type === 'row' ? nextTd.rowspan : nextTd.colspan
        if (td.redips.selected && nextTd.redips.selected) {
          // td.colspan += span
          // tr.splice(i + 1, 1)
          console.log('nexttd', nextTd)
          if (type === 'row') {
            this.tdData[trIndex + tr[i].rowspan].splice(i, 1)
            td.rowspan += span
          } else {
            tr.splice(i + 1, 1)
            td.colspan += span
          }
          // type === 'row' ? td.rowspan += span : td.colspan += span
          this.mergeCell(tr, trIndex, type)
          td.redips.selected = false
          break
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'tdData'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
  .table{
    width: 100%;
    tr {
      td {
        border: 1px solid lightskyblue;
        padding: 10px;
        &.active {
          background-color: brown;
        }
      }
    }
  }
</style>
