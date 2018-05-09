/* eslint-disable func-call-spacing,no-trailing-spaces */
import api from '@/api'
import {RL_YTX} from '@/lib/RL_YTX'
import * as types from '../mutations-type'
import { login } from '../../api/login'
import hash from '@/utils/hash'

const user = {
  state: {
    user: {},
    teamNum: '',
    fileTotal: '',
    favoriteTotal: '',
    users: {}
  },
  getters: {
    avatar: (state) => state.user.avatarUrl
  },
  mutations: {
    [types.SET_USER] (state, user) {
      state.user = user
    },
    [types.SET_TEAM_NUM] (state, teamNum) {
      state.teamNum = teamNum
    },
    [types.SET_FILE_TOTAL] (state, fileTotal) {
      state.fileTotal = fileTotal
    },
    [types.SET_FAVORITE_TOTAL] (state, favoriteTotal) {
      state.favoriteTotal = favoriteTotal
    }
  },
  actions: {
    async loginByAd ({commit}, userInfo) {
      let data = await api.auth.loginByAd(userInfo)
      data = JSON.parse(hash.aesDecryptHex(data.crypto, localStorage.getItem('md5')))
      let token = data.accountToken.accessToken
      commit(types.SET_USER, data)
      localStorage.setItem('token', token)
    },
    async loginByNormal ({commit}, userInfo) {
      let data = await api.auth.loginByNormal(userInfo)
      data = JSON.parse(hash.aesDecryptHex(data.crypto, localStorage.getItem('md5')))
      let token = data.accountToken.accessToken
      commit(types.SET_USER, data)
      localStorage.setItem('token', token)
    },
    async logout ({commit}) {
      RL_YTX.logout(function () {
        commit(types.CLEAR_NOTIFY)
        commit(types.CLEAR_MESSAGE)
      }, function (err) {
        console.log(`容联云登出失败 ${err}`)
      })
      localStorage.removeItem('token')
      return await api.auth.logout()
    },
    async register ({commit}, userInfo) {
      let data = await api.auth.register(userInfo)
      let token = data.accountToken.accessToken
      commit(types.SET_USER, data)
      localStorage.setItem('token', token)
    },
    async sendVerifyCode ({commit}, phone) {
      return await api.auth.sendVerifyCode(phone)
    },
    async checkExists ({commit}, phone) {
      return await api.auth.checkExists(phone)
    },
    async validateCode ({ commit }, verifyInfo) {
      return await api.auth.verifyCode(verifyInfo)
    },
    async resetPwd ({commit}, resetPwdInfo) {
      return await api.auth.resetPwd(resetPwdInfo)
    },
    async userMe ({commit}) {
      let data = await api.user.me()
      data = JSON.parse(hash.aesDecryptHex(data.crypto, localStorage.getItem('md5')))
      if (data.me) {
        login(data.me.initializeId)
      }
      commit(types.SET_USER, data.me)
    }
  }
}

export default user
