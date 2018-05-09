import Vue from 'vue'
const InitTable = {
  state: {
    tableRow: 10,
    tableCol: 10,
    tdData: []
  },
  getters: {
    // initTable: state => id => state.members[id],
    tdData: state => state.tdData
  },
  mutations: {
    initTable (state) {
      for (let i = 0; i < state.tableRow; i++) {
        state.tdData.push([])
        for (let j = 0; j < state.tableCol; j++) {
          state.tdData[i].push([])
          Vue.set(state.tdData[i], j, {
            x: i,
            y: j,
            data: {},
            style: {},
            rowspan: 1,
            colspan: 1,
            show: true,
            redips: {
              selected: false
            }
          })
        }
      }
    }
  },
  actions: {
  }
}
export default InitTable
