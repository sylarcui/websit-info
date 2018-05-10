<template>
  <div class="table-views" contenteditable="true">
    <table id="toolbox">
      <tbody>
      <tr>
        <td>
          <input type="button" value="Merge" class="button" @click="redips.merge()" title="Merge marked table cells horizontally and verically"/>
        </td>
        <td>
          <input type="button" value="Split H" class="button" @click="redips.split('h')" title="Split marked table cell horizontally"/>
          <input type="button" value="Split V" class="button" @click="redips.split('v')" title="Split marked table cell vertically"/>
        </td>
        <td>
          <input type="button" value="Row +" class="button" @click="redips.row('insert')" title="Add table row"/>
          <input type="button" value="Row -" class="button" @click="redips.row('delete')" title="Delete table row"/>
        </td>
        <td>
          <input type="button" value="Col +" class="button" @click="redips.column('insert')" title="Add table column"/>
          <input type="button" value="Col -" class="button" @click="redips.column('delete')" title="Delete table column"/>
        </td>
      </tr>
      </tbody>
    </table>
    <table width="100%" class="table-temp" id="mainTable" ref="tds">
      <tr v-for="(data, key) in tdData" :key="key">
        <td v-for="(td, index) in data" :key="index">
          {{index}}
          <!--<component :is="currentTabComponent" class="tab"></component>-->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Vue from 'vue'
export default {
  name: 'table-views',
  created () {
    this.initTable()
  },
  data () {
    return {
      redips: {}
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.redips.init = () => {
        // define reference to the this.TABLE.table object
        let rt = this.TABLE.table
        // activate onmousedown event listener on cells within table with id="mainTable"
        rt.onmousedown('mainTable', true)
        // show cellIndex (it is nice for debugging)
        rt.cell_index(true)
        // define background color for marked cell
        rt.color.cell = '#9BB3DA'
      }

      this.redips.merge = () => {
        // first merge cells horizontally and leave cells marked
        this.TABLE.table.merge('h', false)
        // and then merge cells vertically and clear cells (second parameter is true by default)
        this.TABLE.table.merge('v')
        console.log(this.$refs)
        this.gettable()
      }

      this.redips.split = (mode) => {
        this.TABLE.table.split(mode)
        console.log(this.$refs)
        this.gettable()
      }

      this.redips.row = (type) => {
        this.TABLE.table.row('mainTable', type)
        console.log(this.$refs)
        this.gettable()
      }

      // insert/delete table column
      this.redips.column = (type) => {
        this.TABLE.table.column('mainTable', type)
        console.log(this.$refs)
        this.gettable()
      }

      // add onload event listener
      if (window.addEventListener) {
        window.addEventListener('load', this.redips.init, false)
      } else if (window.attachEvent) {
        window.attachEvent('onload', this.redips.init)
      }
    })
  },
  methods: {
    ...mapMutations(['initTable', 'updataTable']),
    gettable () {
      let tabledata = []
      // for (let i = 0; i < this.$refs.tds.rows.length; i++) {
      //   tabledata.push([])
      //   for (let j = 0; j < this.$refs.tds.rows[i].cells.length; j++) {
      //     tabledata[i].push([])
      //   }
      // }
      // for (let i = 0; i < this.$refs.tds.rows.length; i++) {
      //   tabledata.push({})
      //   for (let j = 0; j < this.$refs.tds.rows[i].cells.length; j++) {
      //     // state.tdData[i].push([])
      //     Vue.set(tabledata[i], this.$refs.tds.rows[i].cells[j].getAttribute('id'), {})
      //   }
      // }
      this.updataTable(tabledata)
      console.log(tabledata)
    }
  },
  computed: {
    ...mapGetters([
      'tdData',
      'newtdData'
    ])
  }
}
</script>

<style lang="scss">
  .table-views {
    outline: none;
    padding: rem(20);
  }
  .table-temp {
    border: none;
    border-collapse: collapse;
    empty-cells: show;
    max-width: 100%;
    table-layout: fixed;
    tr {
      td {
        border: 1px solid #dddddd;
        padding: rem(2) rem(5);
        border-collapse:collapse;
        vertical-align: middle;
        min-width: rem(10);
        line-height: rem(26);
        height: rem(26);
      }
    }
  }
</style>
