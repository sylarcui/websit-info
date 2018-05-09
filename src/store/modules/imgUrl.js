/* eslint-disable func-call-spacing,no-trailing-spaces */
import * as types from '../mutations-type'

const preloadImgUrl = {
  state: {
    preloadImgUrl: ''
  },
  getters: {
    baseImgUrl: (state) => {
      return state.preloadImgUrl
    }
  },
  setters: {},
  mutations: {
    [types.BASE_IMGURL] (state, preloadImgUrl) {
      state.preloadImgUrl = preloadImgUrl
    }
  }
}

export default preloadImgUrl

