<template>
    <div class="contactTable">
      <table width="100%" contenteditable="true">
        <tbody>
        <tr v-for="(v, i) in tdData" :key="i">
          <td v-for="(m, j) in v" :key="j" :y="j">
          </td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'table-views',
  created () {
    this.initTdData()
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'tdData'
    ])
  },
  // components: widgetsl,
  methods: {
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
    /*padding: rem(20);*/
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
    padding: rem(10);
    color: #666666;
    font-size: rem(20);
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
    table {
      tr {
        td {
          height: rem(30);
          border: 1px solid #efefef;
        }
      }
    }
    /*padding: 20px;*/
    /*position: relative;*/
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
