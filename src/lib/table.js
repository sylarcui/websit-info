/* eslint-disable */
/* enable strict mode */
"use strict";
import store from '../store/'
import UUID from 'uuidjs'
import $ from 'jquery'
import _ from 'lodash'
// import * as widgetsl from '@/components/webform/widgets'
// var Profile = Vue.extend({
//   template: '<div ref="componentss"><component v-bind:is="currentView"></component></div>',
//   components: widgetsl,
//   props: ['widgetNmae'],
//   data: function () {
//     return {
//     }
//   },
//   created () {
//   },
//   computed: {
//     currentView () {
//       return store.getters.widgets[this.$refs.componentss]
//     }
//   }
// })
// 创建 Profile 实例，并挂载到一个元素上。
// new Profile().$mount('#mount-point')
// 创建TABLE名称空间
var TABLE = TABLE || {};
TABLE.table = (function () {
  // 方法声明
  var	onmousedown, handler_onmousedown,	merge,merge_cells,max_cols,split,get_table,	mark,	cell_init,row,column,cell_list,relocate,remove_selection,	cell_index,cell_ignore,getParentCell,
    uptdData,tables = [],	td_event,  show_index,
    color = {cell: false,
      row: false,
      column: false},
    mark_nonempty = true;

  onmousedown = function (el, flag, type) {
    var	td,	 th,  i, t,	 get_tables;
    get_tables = function (el) {
      var arr = [],  nodes,	 i;
      nodes = el.getElementsByTagName('table');
      for (i = 0; i < nodes.length; i++) {
        arr.push(nodes[i]);
      }
      return arr;
    };
    td_event = flag;
    if (typeof(el) === 'string') {
      if (type === 'classname') {
        tables = get_tables(document);
        for (i = 0; i < tables.length; i++) {
          if (tables[i].className.indexOf(el) === -1) {
            tables.splice(i, 1);
            i--;
          }
        }
      }
      else {
        el = document.getElementById(el);
      }
    }
    if (el && typeof(el) === 'object') {
      if (el.nodeName === 'TABLE') {
        tables[0] = el;
      }
      else {
        tables = get_tables(el);
      }
    }
    for (t = 0; t < tables.length; t++) {
      th = tables[t].getElementsByTagName('th');
      for (i = 0; i < th.length; i++) {
        cell_init(th[i]);
      }
      td = tables[t].getElementsByTagName('td');
      for (i = 0; i < td.length; i++) {
        cell_init(td[i]);
      }
    }
    cell_index();
  };
  cell_init = function (c) {
    if (c === undefined) {
      c = tables[0]
      for (var y = 0; y < c.rows.length; y++) {
        for (var t = 0; t<c.rows[y].cells.length; t++ ) {
          if (td_event === true) {
            TABLE.event.add(c.rows[y].cells[t], 'mousedown', handler_onmousedown);
          }
          else {
            TABLE.event.remove(c.rows[y].cells[t], 'mousedown', handler_onmousedown);
          }
        }
      }
    }
    if (c.className.indexOf('ignore') > -1) {
      return;
    }
    if (td_event === true) {
      TABLE.event.add(c, 'mousedown', handler_onmousedown);
    }
    else {
      TABLE.event.remove(c, 'mousedown', handler_onmousedown);
    }

  };

  cell_ignore = function (c) {
    if (typeof(c) === 'string') {
      c = document.getElementById(c);
    }
    TABLE.event.remove(c, 'mousedown', handler_onmousedown);
  };

  handler_onmousedown = function (e) {
    var evt = e || window.event,
      td = getParentCell(evt.target || evt.srcElement),
      mouseButton,
      empty;
    var target = td.offsetParent || e.target.offsetParent.offsetParent
    if (!td && !e.shiftKey) {
      return;
    }
    if (td && !e.shiftKey) {
      var cl = cell_list(target)
      for(var i in cl) {
        cl[i].redips = {}
        if (cl[i].redips.selected) cl[i].redips.selected = false
        cl[i].className = ''
      }
      td.redips.selected = true
      store.commit('currentElList', {td, type: true})
      return
    }
    if (e.shiftKey) {
      e.preventDefault()
    }
    store.commit('currentElList', {td, type: false})
    empty = (/^\s*$/.test(td.innerHTML)) ? true : false;
    if (TABLE.table.mark_nonempty === false && empty === false) {
      return;
    }
    if (evt.which) {
      mouseButton = evt.which;
    }
    else {
      mouseButton = evt.button;
    }
    if (mouseButton === 1 /*&& td.childNodes.length === 0*/) {
      td.redips = td.redips || {};
      if (td.redips.selected === true) {
        mark(false, td);
      }
      else {
        mark(true, td);
      }
    }
  };
  getParentCell = function (node) {
    if (!node) {
      return null;
    }
    if (node.nodeName == 'TD' || node.nodeName == 'TH') {
      return node;
    }
    // return getParentCell(node.parentNode);
    return getParentCell($(node).parents('td')[0]);
  }

  merge = function (mode, clear, table) {
    var	tbl, tr,  c,	rc1,  rc2, marked, span,	id,	cl,  t, i, j,	first = {index : -1, span : -1};
    remove_selection();
    tbl = (table === undefined) ? tables : get_table(table);
    for (t = 0; t < tbl.length; t++) {
      cl = cell_list(tbl[t]);
      tr = tbl[t].rows;
      rc1 = (mode === 'v') ? max_cols(tbl[t]) : tr.length;
      rc2 = (mode === 'v') ? tr.length : max_cols(tbl[t]);
      for (i = 0; i < rc1; i++) {
        first.index = first.span = -1;
        for (j = 0; j <= rc2; j++) {
          id = (mode === 'v') ? (j + '-' + i) : (i + '-' + j);
          if (cl[id]) {
            c = cl[id];
            c.redips = c.redips || {};
            marked = c ? c.redips.selected : false;
            span = (mode === 'v') ? c.colSpan : c.rowSpan;
          }
          else {
            marked = false;
          }
          if (marked === true && first.index === -1) {
            first.index = j;
            first.span = span;
          }
          else if ((marked !== true && first.index > -1) || (first.span > -1 && first.span !== span)) {
            merge_cells(cl, i, first.index, j, mode, clear);
            first.index = first.span = -1;
            if (marked === true) {
              if (clear === true || clear === undefined) {
                mark(false, c);
              }
              marked = false;
            }
          }
          if (cl[id]) {
            j += (mode === 'v') ? c.rowSpan - 1: c.colSpan - 1;
          }
        }
        if (marked === true) {
          merge_cells(cl, i, first.index, j, mode, clear);
        }
      }
    }
    cell_index(true);
  };
  merge_cells = function (cl, idx, pos1, pos2, mode, clear) {
    // var tdData = store.getters.tdData
    var span = 0, id,	fc,	c, i;
    fc = (mode === 'v') ? cl[pos1 + '-' + idx] : cl[idx + '-' + pos1];
    for (i = pos1 + 1; i < pos2; i++) {
      id = (mode === 'v') ? (i + '-' + idx) : (idx + '-' + i);
      if (cl[id]) {
        c = cl[id];
        span += (mode === 'v') ? c.rowSpan : c.colSpan;
        // relocate(c, fc);
        store.dispatch('upDataTdData', c.getAttribute('UUID'))
        store.commit('clearCurrent')
        fc.className = ''
        c.parentNode.deleteCell(c.cellIndex);
      }
    }
    if (fc !== undefined) {
      if (mode === 'v') {
        fc.rowSpan += span;
      }
      else {
        fc.colSpan += span;
      }
      if (clear === true || clear === undefined) {
        mark(false, fc);
      }
    }
  };

  max_cols = function (table) {
    var	tr = table.rows,
      span,
      max = 0,
      i, j;
    if (typeof(table) === 'string') {
      table = document.getElementById(table);
    }
    for (i = 0; i < tr.length; i++) {
      span = 0;
      for (j = 0; j < tr[i].cells.length; j++) {
        span += tr[i].cells[j].colSpan || 1;
      }
      if (span > max) {
        max = span;
      }
    }
    return max;
  };

  split = function (mode, table) {
    var	tbl,tr,	 c,	cl,	 rs,n,cols, max,t, i, j,get_rowspan;
    get_rowspan = function (c, row, col) {
      var rs,
        last,
        i;
      rs = 0;
      last = row + c.rowSpan - 1;
      for (i = col - 1; i >= 0; i--) {
        if (cl[last + '-' + i] === undefined) {
          rs++;
        }
      }
      return rs;
    };
    remove_selection();
    tbl = (table === undefined) ? tables : get_table(table);
    for (t = 0; t < tbl.length; t++) {
      cl = cell_list(tbl[t]);
      max = max_cols(tbl[t]);
      tr = tbl[t].rows;
      for (i = 0; i < tr.length; i++) {
        cols = (mode === 'v') ? max : tr[i].cells.length;
        for (j = 0; j < cols; j++) {
          if (mode === 'v') {
            c = cl[i + '-' + j];
            if (c !== undefined) {
              c.redips = c.redips || {};
            }
            if (c !== undefined && c.redips.selected === true && c.rowSpan > 1) {
              rs = get_rowspan(c, i, j);
              n = tr[i + c.rowSpan - 1].insertCell(j - rs);

              n.colSpan = c.colSpan;
              c.rowSpan -= 1;
              cell_init(n);
              cl = cell_list(tbl[t]);
            }
          }
          else {
            c = tr[i].cells[j];
            c.redips = c.redips || {};
            if (c.redips.selected === true && c.colSpan > 1) {
              cols++;
              n = tr[i].insertCell(j + 1);
              n.rowSpan = c.rowSpan;
              c.colSpan -= 1;
              cell_init(n);
            }
          }
          if (c !== undefined) {
            // store.dispatch('upDataTdData', c.getAttribute('itemid'))
            store.commit('clearCurrent')
            c.className = ''
            mark(false, c);
          }
        }
      }
    }
    cell_index()
    var oDiv = document.createElement("div")
    oDiv.className = 'content'
    oDiv.contentEditable = true
    console.log([oDiv])
    n.appendChild(oDiv)
    // new Profile().$mount(oDiv);
  };

  get_table = function (table) {
    var tbl = [];
    if (table !== undefined) {
      if (typeof(table) === 'string') {
        table = document.getElementById(table);
      }
      if (table && typeof(table) === 'object' && table.nodeName === 'TABLE') {
        tbl[0] = table;
      }
    }
    return tbl;
  };

  row = function (table, mode, index, position) {
    var	nc,
      nr = null,
      fr,
      c,
      cl,
      cols = 0,
      colss = 0,
      i, j, k;
    var ciRowSpan
    remove_selection();
    if (typeof(table) !== 'object') {
      table = document.getElementById(table);
    }
    if (index === undefined) {
      index = -1;
    }
    let _minEl = _.minBy(store.getters.currentElList, (o) => { return o.parentNode.rowIndex })
    let _position = _minEl ? _minEl.parentNode.rowIndex : ''
    if (mode === 'insert') {
      fr = table.rows[_position];
      console.log(fr, 'sss')
      for (i = 0; i < fr.cells.length; i++) {
        if (fr.cells[i].rowSpan <= 1) {
          cols += fr.cells[i].colSpan;
        }
      }
      nr = table.insertRow(index);
      for (i = 0; i < cols; i++) {
        console.log(cols)
        nc = nr.insertCell(i);
        cell_init(nc);
      }
      if (position === 'bottom') {
        for (let l = 0; l < index;  l++ ) {
          for (let c = 0; c < table.rows[l].cells.length; c++) {
            let cSpan = table.rows[l].cells[c].rowSpan
            if (cSpan + l > index) {
              table.rows[cSpan + l].cells[c].rowSpan += 1
              table.rows[cSpan + l].insertCell(c);
            }
          }

        }
      }
      cell_index();
    }
    else {
      console.log(position)
      if (table.rows.length === 1) {
        return;
      }
      if (position === 'bottom') {
        for (let l = _position + 1; l < index;  l++ ) {
          for (let c = 0; c < table.rows[l].cells.length; c++) {
            let cSpan = table.rows[l].cells[c].rowSpan
            if (cSpan > 1) {
              table.rows[l].cells[c].rowSpan =- 1
            }
          }

        }
      }
      table.deleteRow(index);
      cl = cell_list(table);
      index = table.rows.length - 1;
      cols = max_cols(table);
      for (i = 0; i < cols; i++) {
        c = cl[index + '-' + i];
        if (c === undefined) {
          for (j = index, k = 1; j >= 0; j--, k++) {
            c = cl[j + '-' + i];
            if (c !== undefined) {
              c.rowSpan = k;
              break;
            }
          }
        }
        else if (c.rowSpan > 1) {
          c.rowSpan -= 1;
        }
        i += c.colSpan - 1;
      }
    }
    return nr;
  };

  column = function (table, mode, index) {
    var	c,
      idx,
      nc,
      i;
    remove_selection();
    if (typeof(table) !== 'object') {
      table = document.getElementById(table);
    }
    if (index === undefined) {
      index = -1;
    }
    if (mode === 'insert') {
      for (i = 0; i < table.rows.length; i++) {
        nc = table.rows[i].insertCell(index);
        cell_init(nc);
      }
      cell_index();
    }
    else {
      c = table.rows[0].cells;
      if (c.length === 1 && (c[0].colSpan === 1 || c[0].colSpan === undefined)) {
        return;
      }
      for (i = 0; i < table.rows.length; i++) {
        if (index === -1) {
          idx = table.rows[i].cells.length - 1;
        }
        else {
          idx = index;
        }
        if (table.rows[i].cells[idx]) {
          c = table.rows[i].cells[idx]
        } else {
          c = table.rows[i].cells[table.rows[i].cells.length - 1];
          index = -1
        }
        if (c.colSpan > 1) {
          c.colSpan -= 1;
        }
        else {
          table.rows[i].deleteCell(index);
        }
        i += c.rowSpan - 1;
      }
    }
  };

  mark = function (flag, el, row, col) {
    var cl;
    if (typeof(flag) !== 'boolean') {
      return;
    }
    if (typeof(el) === 'string') {
      el = document.getElementById(el);
    }
    else if (typeof(el) !== 'object') {
      return;
    }
    if (el.nodeName === 'TABLE') {
      cl = cell_list(el);
      el = cl[row + '-' + col];
    }
    if (!el || (el.nodeName !== 'TD' && el.nodeName !== 'TH')) {
      return;
    }
    el.redips = el.redips || {};
    if (typeof(TABLE.table.color.cell) === 'string') {
      if (flag === true) {
        el.redips.background_old = el.className;
        el.className = TABLE.table.color.cell;
      }
      else {
        el.className = el.redips.background_old;
      }
    }
    el.redips.selected = flag;
    el.redips = el.redips || {};
  };

  remove_selection = function () {
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
    // IE8
    else if (document.selection && document.selection.type === "Text") {
      try {
        document.selection.empty();
      }
      catch (error) {
      }
    }
  };

  cell_list = function (table) {
    var matrix = [],
      matrixrow,
      lookup = {},
      c,
      ri,
      rowspan,
      colspan,
      firstAvailCol,
      tr,
      i, j, k, l;
    tr = table.rows;
    for (i = 0; i < tr.length; i++) {
      for (j = 0; j < tr[i].cells.length; j++) {
        c = tr[i].cells[j];
        ri = c.parentNode.rowIndex;
        rowspan = c.rowSpan || 1;
        colspan = c.colSpan || 1;
        matrix[ri] = matrix[ri] || [];
        for (k = 0; k < matrix[ri].length + 1; k++) {
          if (typeof(matrix[ri][k]) === 'undefined') {
            firstAvailCol = k;
            break;
          }
        }
        lookup[ri + '-' + firstAvailCol] = c;
        for (k = ri; k < ri + rowspan; k++) {
          matrix[k] = matrix[k] || [];
          matrixrow = matrix[k];
          for (l = firstAvailCol; l < firstAvailCol + colspan; l++) {
            matrixrow[l] = 'x';
          }
        }
      }
    }
    return lookup;
  };

  relocate = function (from, to) {
    var cn,
      i, j;
    if (from === to) {
      return;
    }
    cn = from.childNodes.length;
    for (i = 0, j = 0; i < cn; i++) {
      if (from.childNodes[j].nodeType === 1) {
        to.appendChild(from.childNodes[j]);
      }
      else {
        j++;
      }
    }
  };

  cell_index = function (flag) {
    flag = true
    if (flag === undefined && show_index !== true) {
      return;
    }
    if (flag !== undefined) {
      show_index = flag;
    }
    var tr,
      c,
      cl,
      cols,
      i, j, t;
    for (t = 0; t < tables.length; t++) {
      tr = tables[t].rows;
      cols = max_cols(tables[t]);
      cl = cell_list(tables[t]);
      for (i = 0; i < tr.length; i++) {
        for (j = 0; j < cols; j++) {
          if (cl[i + '-' + j]) {
            c = cl[i + '-' + j];
            c.setAttribute('itemid', `${i}-${j}`)
            if (!c.getAttribute('UUID')) {
              c.setAttribute('UUID', UUID.genV4().hexFields[2])
            }
            // console.log(UUID.genV4().hexFields[2], 'uuid')
            // c.innerHTML = (show_index) ? i + '-' + j : '';
          }
        }
      }
    }
  };
  return {
    color : color,
    mark_nonempty : mark_nonempty,
    onmousedown : onmousedown,
    mark : mark,
    merge : merge,
    split : split,
    row : row,
    column : column,
    cell_index : cell_index,
    cell_ignore : cell_ignore
  };
}());



if (!TABLE.event) {
  TABLE.event = (function () {
    var add,
      remove;
    add = function (obj, eventName, handler) {
      if (obj.addEventListener) {
        obj.addEventListener(eventName, handler, false);
      }
      else if (obj.attachEvent) {
        obj.attachEvent('on' + eventName, handler);
      }
      else {
        obj['on' + eventName] = handler;
      }
    };

    remove = function (obj, eventName, handler) {
      if (obj.removeEventListener) {
        obj.removeEventListener(eventName, handler, false);
      }
      else if (obj.detachEvent) {
        obj.detachEvent('on' + eventName, handler);
      }
      else {
        obj['on' + eventName] = null;
      }
    };

    return {
      add		: add,
      remove	: remove
    };

  }());
}
export default TABLE
