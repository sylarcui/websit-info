<template>
  <div class="table-views">
    <div class="contactTable">
      <table width="100%" contenteditable="true">
        <tbody>
        <tr v-for="(v, i) in tdData" :key="i">
          <td v-for="(m, j) in v" :key="j" :y="j">
            <div>sss</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// import * as widgetsl from '@/components/webform/widgets'
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
      tableEl: '',
      position: ''
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
      console.log(this.$refs.currentViewPan)
      this.tableEvent.init = () => {
        var rt = this.TABLE.table
        rt.onmousedown('mainTable', true)
        rt.cell_index(true)
        rt.color.cell = this.cellColor
      }
      this.tableEvent.merge = () => {
        this.TABLE.table.merge('h', false)
        this.TABLE.table.merge('v')
      }
      this.tableEvent.split = (mode) => {
        this.TABLE.table.split(mode)
      }
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
            if (type === 'delete') {
              _position = _minEl ? _position + _minEl.rowSpan : 0
            } else {
              _position = _minEl ? _position + _minEl.rowSpan : 0
            }
            // _position = _minEl ? _position : 0
            break
          case 'bottom':
            if (type === 'delete') {
              _position = _minEl ? _position + _minEl.rowSpan : 0
            } else {
              _position = _minEl ? _position + _minEl.rowSpan : 0
            }
            // _position = _minEl ? _position : -1
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
      this.tableEvent.init()
      // if (window.addEventListener) {
      //   window.addEventListener('load', this.tableEvent.init, false)
      // } else if (window.attachEvent) {
      //   window.attachEvent('onload', this.tableEvent.init)
      // }
    })
  },
  computed: {
    ...mapGetters([
      'tdData',
      'rowData',
      'colData',
      'currentElList',
      'widgets'
    ]),
    currentView () {
      if (this.currentElList[0]) {
        return this.widgets[this.$refs.componentss.parentNode.getAttribute('UUID')]
      } else {
        return ''
      }
    }
  },
  // components: widgetsl,
  methods: {
    clicktd (e) {
      console.log(e)
    },
    ...mapActions([
      'initTdData'
    ])
  }
}
</script>

<style lang="scss">
  .content-sed {
    border: 1px double #1e88e5 !important;
  }
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
