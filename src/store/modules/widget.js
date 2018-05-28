import Vue from 'vue'
import _ from 'lodash'
const widgets = {
  state: {
    widgets: {},
    tdWidgetList: {},
    currenttd: ''
  },
  getters: {
    getTdWidget: state => id => state.tdWidgetList[id],
    tdWidget: state => state.tdWidgetList[state.currenttd.getAttribute('UUID')],
    tdWidgetList: state => state.tdWidgetList,
    currenttd: state => state.currenttd
  },
  mutations: {
    addTdCtrlWidgetNmae (state, {tdid, CtrlWidget}) {
      if (!state.tdWidgetList[tdid]) {
        Vue.set(state.tdWidgetList, tdid, {})
      }
      Vue.set(state.tdWidgetList[tdid], 'CtrlWidget', CtrlWidget)
    },
    addTdData (state, {tdid, data}) {
      Vue.set(state.tdWidgetList[tdid], 'data', data)
    },
    updataTdData (state, {key, value}) {
      let tdid = state.currenttd.getAttribute('UUID')
      Vue.set(state.tdWidgetList[tdid]['data'], key, value)
      console.log(state.tdWidgetList[tdid]['data'][key])
    },
    delTdData (state, tdid) {
      Vue.delete(state.tdWidgetList, tdid)
    },
    setCurrenttd (state, td) {
      console.log(state, td)
      Vue.set(state, 'currenttd', td)
    }
  },
  actions: { // 同步
    initTdNewWidgetData ({commit, state, getters, rootState}, {newWidget}) {
      let tdid = state.currenttd.getAttribute('UUID')
      let data = _.cloneDeep(newWidget.$data)
      commit('addTdData', {tdid, data})
      for (let i in data) {
        console.log(i, '====>', data)
        // newWidget[i] = getters.getTdWidget(tdid).data[i]
        // newWidget[i].push(tdid)
        Vue.set(newWidget, i, getters.tdWidget.data[i])
        // console.log()
      }
    },
    updataTdWidgetData ({commit, state, getters, rootState}, {val, newWidget}) {
      let tdid = val ? val.getAttribute('UUID') : ''
      if (getters.getTdWidget(tdid)) {
        for (let i in newWidget.$data) {
          newWidget[i] = getters.getTdWidget(tdid).data[i]
        }
      } else {
        for (let i in newWidget.$data) {
          newWidget[i] = ''
        }
      }
    },
    upDataTdDataActions ({commit}, {key, value}) {
      commit('updataTdData', {key, value})
    },
    initCtrlTdData ({state, commit, getters, rootState}, newWidget) {
      let tdid = state.currenttd.getAttribute('UUID')
      for (let i in newWidget.$data) {
        newWidget[i] = getters.getTdWidget(tdid).data[i]
      }
    }
  }
}
export default widgets
