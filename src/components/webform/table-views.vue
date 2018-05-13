<template>
  <div class="table-views" contenteditable="true">
    <table id="toolbox">
      <tbody>
      <tr>
        <td>
          <input type="button" value="Merge" class="button" @click="tableEvent.merge()" title="Merge marked table cells horizontally and verically"/>
        </td>
        <td>
          <input type="button" value="Split H" class="button" @click="tableEvent.split('h')" title="Split marked table cell horizontally"/>
          <input type="button" value="Split V" class="button" @click="tableEvent.split('v')" title="Split marked table cell vertically"/>
        </td>
        <td>
          <input type="button" value="开头 +" class="button" @click="tableEvent.row('insert', 'start')" title="Add table row"/>
          <input type="button" value="最后 +" class="button" @click="tableEvent.row('insert', 'end')" title="Add table row"/>
          <input type="button" value="上方 +" class="button" @click="tableEvent.row('insert', 'top')" title="Add table row"/>
          <input type="button" value="下方 +" class="button" @click="tableEvent.row('insert', 'bottom')" title="Add table row"/>
          <input type="button" value="最后 -" class="button" @click="tableEvent.row('delete', 'start')" title="Delete table row"/>
          <input type="button" value="开头 -" class="button" @click="tableEvent.row('delete', 'end')" title="Delete table row"/>
          <input type="button" value="上方 -" class="button" @click="tableEvent.row('delete', 'top')" title="Delete table row"/>
          <input type="button" value="下方 -" class="button" @click="tableEvent.row('delete', 'bottom')" title="Delete table row"/>
        </td>
        <td>
          <input type="button" value="开头 +" class="button" @click="tableEvent.column('insert', 'start')" title="Add table column"/>
          <input type="button" value="最后 +" class="button" @click="tableEvent.column('insert', 'end')" title="Add table column"/>
          <input type="button" value="右侧 +" class="button" @click="tableEvent.column('insert', 'right')" title="Add table column"/>
          <input type="button" value="左侧 +" class="button" @click="tableEvent.column('insert', 'left')" title="Add table column"/>
          <input type="button" value="开头 -" class="button" @click="tableEvent.column('delete', 'start')" title="Delete table column"/>
          <input type="button" value="最后 -" class="button" @click="tableEvent.column('delete', 'end')" title="Delete table column"/>
          <input type="button" value="右侧 -" class="button" @click="tableEvent.column('delete', 'right')" title="Delete table column"/>
          <input type="button" value="左侧 -" class="button" @click="tableEvent.column('delete', 'left')" title="Delete table column"/>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="contactTable"  ref="contactTable">
      <table id="mainTable" contenteditable="true"  width="100%">
        <tbody>
        <tr v-for="(v, i) in tdData" :key="i">
          <td v-for="(m, j) in v" :key="j" :y="j" >
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import _ from 'lodash'
// import Vue from 'vue'
export default {
  name: 'table-views',
  created () {
    this.initTdData()
  },
  data () {
    return {
      tableEvent: {},
      tableEl: ''
    }
  },
  directives: {
    uptable: {
      // 指令的定义
      inserted: (el) => {
        console.log(el, ',----')
      },
      update: (el) => {
        console.log(el, 'hhhhh')
      },
      componentUpdated: (el) => {
        console.log(el, '-0-0-0')
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.tableEl = this.$refs.contactTable
      this.tableEvent.init = () => {
        var rt = this.TABLE.table
        rt.onmousedown('mainTable', true)
        rt.cell_index(false, this.initTableData)
        rt.color.cell = this.cellColor
      }
      this.tableEvent.merge = () => {
        this.TABLE.table.merge('h', false)
        this.TABLE.table.merge('v')
      }
      this.tableEvent.split = (mode) => {
        this.TABLE.table.split(mode)
      }
      console.log(this.cellColor)
      this.tableEvent.row = (type, position) => {
        console.log(this.currentElList)
        let _minEl = _.minBy(this.currentElList, (o) => { return o.parentNode.rowIndex })
        let _position = _minEl ? _minEl.parentNode.rowIndex : ''
        switch (position) {
          case 'start':
            _position = 0
            break
          case 'end':
            _position = -1
            break
          case 'top':
            _position = _minEl ? _position - 1 : 0
            break
          case 'bottom':
            _position = _minEl ? _position : -1
            break
          default:
            _position = ''
        }
        this.TABLE.table.row('mainTable', type, _position, position)
      }

      this.tableEvent.column = (type, position) => {
        console.log(this.currentElList)
        let _minEl = _.minBy(this.currentElList, (o) => { return o.cellIndex })
        console.log(_minEl)
        let _position = _minEl ? _minEl.cellIndex : ''
        switch (position) {
          case 'start':
            _position = 0
            break
          case 'end':
            _position = -1
            break
          case 'left':
            if (type === 'delete') {
              _position = _minEl ? _position - 1 : 0
            } else {
              _position = _minEl ? _position : 0
            }

            break
          case 'right':
            _position = _minEl ? _position + 1 : -1
            break
          default:
            _position = ''
        }
        console.log(_position)
        this.TABLE.table.column('mainTable', type, _position)
      }

      if (window.addEventListener) {
        window.addEventListener('load', this.tableEvent.init, false)
      } else if (window.attachEvent) {
        window.attachEvent('onload', this.tableEvent.init)
      }
    })
  },
  computed: {
    ...mapGetters([
      'tdData',
      'rowData',
      'colData',
      'currentElList'
    ])
  },
  datas: {
    a: '<div></div>'
  },
  methods: {
    ...mapActions([
      'setTdData',
      'initTdData',
      'setTdStyle'
    ])
  }
}
</script>

<style lang="scss">
  .table-views {
    outline: none;
    padding: rem(20);
  }
  .page-title {
    border-bottom: 2px solid #dddddd;
    text-align: center;
    width: 80%;
    font-size: 30px;
    margin: 0 auto;
    margin-bottom: 30px;
    outline: none;
    height: 50px;
  }
  .page-title:empty:before{
    content:attr(placeholder);
    font-size: 20px;
    font-weight: bold;
    color: rgba(0,0,0,0.3);
  }
  .page-title:focus{
    content:none;
  }
  .contactTable {
    padding: 20px;
    position: relative;
  }
  /* container */
  #myContainer {
    font-size: 10pt;
    /*display: table;*/
    outline: none;
    position: relative;
    z-index: 0;
  }

  /* both tables */
  div#myContainer table {
    border-collapse: collapse;
    /*border-collapse: separate;*/
    border-spacing: 1px;
  }

  /* toolbox table */
  #toolbox {
    background-color: #ccc;
    margin: 7px 7px 15px 7px;
  }
  .current {
    border: 1px double #2185d0;
    /*background-color: rgba(254,99,65,0.1);*/
  }
  /* main table */
  #mainTable {
    border: none;
    border-collapse: collapse;
    empty-cells: show;
    max-width: 100%;
    outline: none;
    border: none;
    tr {
      td {
        border: 1px solid #dddddd6b;
        padding: 2px;
        user-select: text;
        border-spacing: 0;
        box-sizing: border-box;
        cursor: cell;
        height: 30px;
        min-height: 30px;
        &.current {
          border: 1px double #2185d0;
        }
      }
    }
  }

  /* table cells */
  div#myContainer td{
    border: 1px solid #dddddd6b;
    padding: 2px;
    user-select: text;
    border-spacing: 0;
    box-sizing: border-box;
    cursor: cell;
    height: 30px;
    min-height: 30px;
  }
  div#myContainer td.current , div#myContainer th.current{
    border: 1px double #2185d0;
    /*background-color: rgba(254,99,65,0.1);*/
  }
</style>
