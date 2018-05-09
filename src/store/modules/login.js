/* eslint-disable func-call-spacing,no-trailing-spaces */
import * as types from '../mutations-type'

const login = {
  state: {
    loginType: 'domain',
    normalMobile: ''
  },
  getters: {},
  setters: {},
  mutations: {
    [types.SWITCH_LOGIN_TYPE] (state, loginType) {
      state.loginType = loginType
    },
    [types.SWITCH_NORMAL_MOBILE] (state, mobile) {
      state.normalMobile = mobile
    }
  }
}

export default login

