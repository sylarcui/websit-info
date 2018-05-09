/* eslint-disable func-call-spacing,no-trailing-spaces */
import * as types from '../mutations-type'

const modal = {
  state: {
    isShow: false,
    isShowSearch: false,
    isShowSideBar: false,
    isShowTeamBar: false,
    isShowAddPerson: false,
    isShowFile: false,
    isShowAt: false,
    isShowMenu: false
  },
  getters: {
    modalStatus: (state) => {
      return state.isShow
    },
    atStatus: (state) => {
      return state.isShowAt
    },
    modalStatusContact: (state) => {
      return state.isShowSearch
    },
    modalStatusSideBar: (state) => {
      return state.isShowSideBar
    },
    modalStatusTeamBar: (state) => {
      return state.isShowTeamBar
    },
    modalAddPerson: (state) => {
      return state.isShowAddPerson
    },
    modalShowFile: (state) => {
      return state.isShowFile
    },
    modalShowMenu: (state) => {
      return state.isShowMenu
    }
  },
  setters: {},
  mutations: {
    [types.SHOW_MODAL] (state, isShow) {
      state.isShow = isShow
    },
    [types.HIDE_MODAL] (state, isShow) {
      state.isShow = !isShow
    },
    [types.AT_STATUS] (state, isShowAt) {
      state.isShowAt = isShowAt
    },
    [types.SHOW_MODAL_CONTACT] (state, isShowSearch) {
      state.isShowSearch = isShowSearch
    },
    [types.HIDE_MODAL_CONTACT] (state, isShowSearch) {
      state.isShowSearch = !isShowSearch
    },
    [types.SHOW_MODAL_SIDEBAR] (state, isShowSideBar) {
      state.isShowSideBar = isShowSideBar
    },
    [types.HIDE_MODAL_SIDEBAR] (state, isShowSideBar) {
      state.isShowSideBar = !isShowSideBar
    },

    [types.SHOW_MODAL_TEAM] (state, isShowTeamBar) {
      state.isShowTeamBar = isShowTeamBar
    },
    [types.HIDE_MODAL_TEAN] (state, isShowTeamBar) {
      state.isShowTeamBar = !isShowTeamBar
    },
    [types.SHOW_MODAL_ADD] (state, isShowAddPerson) {
      state.isShowAddPerson = isShowAddPerson
    },
    [types.HIDE_MODAL_ADD] (state, isShowAddPerson) {
      state.isShowAddPerson = !isShowAddPerson
    },
    [types.SHOW_MODAL_FILE] (state, isShowFile) {
      state.isShowFile = isShowFile
    },
    [types.HIDE_MODAL_FILE] (state, isShowFile) {
      state.isShowFile = !isShowFile
    },
    [types.SHOW_MENUE] (state, isShowMenu) {
      state.isShowMenu = isShowMenu
    },
    [types.HIDE_MENUE] (state, isShowMenu) {
      state.isShowMenu = !isShowMenu
    }
  }
}

export default modal

