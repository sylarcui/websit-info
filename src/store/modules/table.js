// import Vue from 'vue'
// import _ from 'lodash'
// let steData = (tdLenght) => {
//   let tdData = []
//   for (let j = 0; j < tdLenght; j++) {
//     tdData.push({
//       data: {},
//       spanData: {},
//       style: {'width': '20px'},
//       rowspan: 1,
//       colspan: 1,
//       display: true
//     })
//   }
//   return tdData
// }
const tableObj = {
  state: {
    rowData: 10,
    colData: 5,
    tdData: [],
    currentElList: [],
    widgets: {},
    tdWidgetsData: {
      '3-1': {
        position: '',
        style: {},
        widget: 'input',
        attr: {}
      }
    }
  },
  getters: {
    tdData: state => state.tdData,
    rowData: state => state.rowData,
    colData: state => state.colData,
    currentElList: state => state.currentElList,
    // currenttd: state => state.currentElList[0],
    widgets: state => state.widgets,
    tdWidgetsData: state => state.tdWidgetsData
  },
  mutations: {
    currentElList (state, {td, type}) {
      console.log(state)
      if (type) {
        state.currentElList.splice(0, state.currentElList.length)
      }
      td.className = 'current'
      state.currentElList.push(td)
    },
    clearCurrent (state) {
      console.log(state)
      state.currentElList.splice(0, state.currentElList.length)
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
    initTdData ({commit, state, rootState}) {
      commit('initTdDataUp')
    }
  }
}

export default tableObj
