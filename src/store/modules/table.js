import Vue from 'vue'
const InitTable = {
  state: {
    tableRow: 10,
    tableCol: 5,
    tdData: [],
    newtdData: [{'3-1': {}}]
  },
  getters: {
    // initTable: state => id => state.members[id],
    tdData: state => state.tdData,
    newtdData: state => state.newtdData
  },
  mutations: {
    initTable (state) {
      for (let i = 0; i < state.tableRow; i++) {
        state.tdData.push({})
        for (let j = 0; j < state.tableCol; j++) {
          // state.tdData[i].push([])
          Vue.set(state.tdData[i], `${i}-${j}`, {})
        }
      }
    },
    updataTable (state, newTdData) {
      // state.tdData.splice(0, state.tdData.length)
      // state.tdData = newTdData
      // for (let i = 0; i < newTdData.length; i++) {
      //   state.tdData.push({})
      //   for (let j = 0; j < newTdData.length; j++) {
      //     // state.tdData[i].push([])
      //     Vue.set(state.tdData[i], `${i}-${j}`, {})
      //   }
      //
      // }
      // newTdData.map((t, j) => {
      //   console.log(t, 'tttt')
      //   Vue.set(state.tdData, j, {})
      //   for (let i in t) {
      //     console.log(i, j, '-0-0')
      //     Vue.set(state.tdData[j], i, t[i])
      //   }
      //   // state.tdData.push(t)
      // })
      console.log(state.tdData, '09090')
    }
  },
  actions: {
  }
}
export default InitTable
