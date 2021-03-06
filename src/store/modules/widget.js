import Vue from 'vue'
// import _ from 'lodash'
const widgets = {
  state: {
    widgets: {},
    tdWidgetList: {},
    currenttd: ''
  },
  getters: {
    getTdWidget: state => id => state.tdWidgetList[id],
    tdWidget: state => state.currenttd && state.tdWidgetList[state.currenttd.getAttribute('UUID')],
    tdWidgetList: state => state.tdWidgetList,
    currenttd: state => state.currenttd
  },
  mutations: {
    addTdCtrlWidgetName (state, {uuid, CtrlWidget}) {
      Vue.set(state.tdWidgetList, uuid, {})
      console.log(state.tdWidgetList, uuid)
      if (!state.tdWidgetList[uuid].hasOwnProperty('CtrlWidget')) {
        // Vue.set(widgetData.tdWidgetList, uuid, {})
        Vue.set(state.tdWidgetList[uuid], 'CtrlWidget', CtrlWidget)
      } else {
        // Vue.set(state.tdWidgetList, tdid, {})
        if (state.tdWidgetList[uuid].CtrlWidget !== CtrlWidget) {
          Vue.set(state.tdWidgetList[uuid], 'CtrlWidget', CtrlWidget)
        }
      }
      console.log(state.tdWidgetList)
    },
    addTdData (state, {data}) {
      // console.log(data)
      // let _data = data || {}
      let tdid = state.currenttd.getAttribute('UUID')
      if (state.tdWidgetList[tdid].hasOwnProperty('data')) {
        Vue.set(state.tdWidgetList[tdid], 'data', data)
      } else {
        Vue.set(state.tdWidgetList[tdid], 'data', {})
        Vue.set(state.tdWidgetList[tdid], 'data', data)
      }
    },
    addTdDataInit (state) {
      // console.log(data)
      // let _data = data || {}
      let tdid = state.currenttd.getAttribute('UUID')
      if (!state.tdWidgetList[tdid].hasOwnProperty('data')) {
        Vue.set(state.tdWidgetList[tdid], 'data', {})
      }
    },
    updataTdData (state, {key, value}) {
      let tdid = state.currenttd.getAttribute('UUID')
      console.log(key, value)
      Vue.set(state.tdWidgetList[tdid].data, key, value)
      // console.log(state.tdWidgetList[tdid]['data'][key])
    },
    delTdData (state, tdid) {
      Vue.delete(state.tdWidgetList, tdid)
    },
    setCurrenttd (state, td) {
      Vue.set(state, 'currenttd', '')
      Vue.set(state, 'currenttd', td)
    }
  },
  actions: { // 同步
    initTdNewWidgetData ({commit, state, getters, rootState}, {data}) {
      commit('addTdData', {data})
    },
    updataTdWidgetData ({commit, state, getters, rootState}, {val, newWidget}) {
      let tdid = val ? val.UUID : ''
      if (getters.getTdWidget(tdid)) {
        console.log(tdid)
        for (let i in newWidget.$data) {
          // newWidget[i] = getters.getTdWidget(tdid).data[i]
          Vue.set(newWidget, i, getters.tdWidget.data[i])
        }
      } else {
        for (let i in newWidget.$data) {
          newWidget[i] = ''
        }
      }
    },
    upDataTdDataActions ({commit}, {key, data}) {
      commit('updataTdData', {key, value: data})
    },
    upDataTdDatasActions ({commit}, arrData) {
      console.log(arrData)
      for (let key in arrData) {
        commit('updataTdData', {key, value: arrData[key]})
      }
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
