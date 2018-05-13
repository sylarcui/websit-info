import Vue from 'vue'
import _ from 'lodash'
let steData = (tdLenght) => {
  let tdData = []
  for (let j = 0; j < tdLenght; j++) {
    tdData.push({
      data: {},
      spanData: {},
      style: {'width': '20px'},
      rowspan: 1,
      colspan: 1,
      display: true
    })
  }
  return tdData
}
const tableObj = {
  state: {
    rowData: 10,
    colData: 5,
    tdData: [],
    currentElList: [],
    currentKeyList: [],
    tdWidgets: {}
  },
  getters: {
    tdData: state => state.tdData,
    rowData: state => state.rowData,
    colData: state => state.colData,
    currentElList: state => state.currentElList,
    currentKeyList: state => state.currentKeyList,
    tdWidgets: state => state.tdWidgets
  },
  mutations: {
    updataTdData (state, val) {
      state.tdData.splice(0, state.tdData.length)
      state.tdData = []
      val.map((m, i) => {
        console.log(m)
        state.tdData.push([])
        m.map(t => {
          state.tdData[i].push(t)
        })
      })
      // state.tdData = [...val]
      // for ()
      console.log('val', val)
      // state.tdData.splice(0, state.tdData.length)
    },
    pushWidgets (state, {key, emlData}) {
      if (!state.tdWidgets.key) {
        Vue.set(state.tdWidgets, key, emlData)
      }
    },
    tdAddWidgets (state) {
      console.log(state.currentElList)
      // if (!state.tdWidgets.key) {
      //   Vue.set(state.tdWidgets, key, emlData)
      // }
    },
    clearTdData (state) {
      state.tdData.splice(0, state.tdData.length)
    },
    updataTrData (state, {i}) {
      Vue.set(state.tdData, i, [])
    },
    currentElList (state, {td, type}) {
      if (type) {
        state.currentElList.splice(0, state.currentElList.length)
        td.className = 'current'
        Vue.set(state.currentElList, 0, td)
      } else {
        td.className = 'current'
        state.currentElList.push(td)
      }
    },
    updataCellData (state, {i, j, data}) {
      if (data !== undefined) {
        Vue.set(state.tdData[i], j, data)
      } else {
        state.tdData[i].splice(j, 1)
      }
      // state.tdData[i].push(data)
    },
    setSpan (state, {tdx, tdy, spanType, spanVal}) {
      Vue.set(state.tdData[tdy][tdx], spanType, spanVal)
    },
    setCurrentKeyList (state, action, data) {
      let itemid = (k) => k ? { itemid: k.getAttribute('itemid'), x: k.getAttribute('x'), y: k.getAttribute('y') } : {}
      if (action === 'add') {
        state.currentKeyList.push(itemid(data))
        state.currentElList.push(data)
      } else if (action === 'del') {
        state.currentKeyList = state.currentKeyList.filter(n => n.itemid !== data.getAttribute('itemid'))
        state.currentElList = state.currentElList.filter(n => n.getAttribute('itemid') !== data.getAttribute('itemid'))
      } else {
        state.currentKeyList.splice(0, state.currentKeyList.length)
        state.currentElList.splice(0, state.currentElList.length)
      }
    },
    insertRow (state, {rowIndex, tdLenght, insertType}) {
      if (insertType === 'insert') {
        state.tdData.splice(rowIndex, 0, steData(tdLenght))
      } else {
        state.tdData.splice(rowIndex - 1, 1)
      }
    },
    insertColumn (state, {columnIndex, rows, insertType}) {
      if (insertType === 'insert') {
        for (let i = 0; i < state.tdData.length; i++) {
          // state.tdData.splice(columnIndex, 0, steData(tdLenght))
          Vue.set(state.tdData[i], columnIndex, {
            data: {},
            spanData: {},
            style: {},
            rowspan: 1,
            colspan: 1,
            display: true
          })
        }
      } else {
        state.tdData[rows].splice(columnIndex, 1)
      }
    },
    setTdStyleUp (state, {indexY, indexX, key, styles, col}) {
      let _min = _.minBy(col, (o) => { return o.itemid })
      let _y = []
      col.map(el => {
        if (!_y.includes(el.y)) {
          _y.push(el.y)
        }
        if (el.itemid !== _min.itemid) {
          state.tdData[el.y][el.x].display = false
          console.log('el')
        }
      })
      state.tdData[_min.y][_min.x]['rowspan'] = _y.length
      state.tdData[_min.y][_min.x]['rowspanlist'] = col
      // state.tdData[indexY + 1].splice(indexX, 1)
      // state.tdData[indexY + 2].splice(indexX, 1)
      console.log(state.tdData[indexY][indexX][key])
    },
    initTdDataUp (state) {
      let steData = (i) => {
        state.tdData[i].push({
          data: {},
          spanData: {},
          style: {},
          rowspan: 1,
          colspan: 1,
          display: true
        })
      }
      for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 5; j++) {
          if (!state.tdData[i]) {
            state.tdData.push([])
            steData(i)
          } else {
            steData(i)
          }
        }
      }
    }
  },
  actions: { // 同步
    setTdData ({commit, state, rootState}, val) {
      console.log(commit, state, rootState, val)
      commit('updataTdData', {val})
    },
    initTdData ({commit, state, rootState}) {
      commit('initTdDataUp')
    },
    setTdStyle ({commit, state, rootState}, {indexY, indexX, key, styles, col}) {
      // console.log({y, x, key, styles})
      commit('setTdStyleUp', {indexY, indexX, key, styles, col})
    },
    setTdSpan ({commit, state, rootState}, {tdx, tdy, spanType, spanVal}) {
      if (spanType === 'del') {
        // state.tdData[tdy][tdx].display = false
        state.tdData[tdy].splice(tdx, 1)
      } else if (spanType === 'split') {
        state.tdData[tdy][tdx].display = true
        // state.tdData[tdy].splice(tdx, 0, [])
      } else {
        commit('setSpan', {tdx, tdy, spanType, spanVal})
      }
    }
  }
}

export default tableObj
