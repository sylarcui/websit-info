import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import tableObj from './modules/table'
import widgets from './modules/widget'

Vue.use(Vuex)

const state = {
  isLoading: false,
  uuid: '',
  number: 0,
  token: ''
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    tableObj,
    widgets
  }
})
