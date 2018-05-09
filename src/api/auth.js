import axios from '@/http'
import Fingerprintjs2 from 'fingerprintjs2'
import { getUrl } from './path'

function getDeviceId () {
  return new Promise(function (resolve, reject) {
    new Fingerprintjs2().get(function (result, components) {
      resolve(result)
    })
  })
}

const auth = {
  loginByAd (data) {
    return getDeviceId().then((result) => {
      return axios({
        url: getUrl('auth/signin/webiam'),
        // url: getUrl('auth/signin/ad'),
        method: 'POST',
        data
        // headers: {
        //   deviceid: result
        // }
      })
    })
  },

  loginByNormal (data) {
    return getDeviceId().then((result) => {
      return axios({
        url: getUrl('auth/signin/phone'),
        method: 'POST',
        data,
        headers: {
          deviceid: result
        }
      })
    })
  },

  logout () {
    return axios({
      url: getUrl(`auth/signout`),
      method: 'POST'
    })
  },

  register (data) {
    return axios({
      url: getUrl('users/signup/phone'),
      method: 'POST',
      data
    })
  },

  sendVerifyCode (phone) {
    return axios({
      url: getUrl('auth/sendVerifyCode'),
      method: 'GET',
      params: {
        phone
      }
    })
  },
  checkExists (phone) {
    return axios({
      url: getUrl('users/exists'),
      method: 'GET',
      params: {
        phone
      }
    })
  },
  verifyCode (data) {
    return axios({
      url: getUrl('auth/verifyCode'),
      method: 'POST',
      data
    })
  },

  resetPwd (data) {
    return axios({
      url: getUrl('users/resetPassword'),
      method: 'PUT',
      data
    })
  }
}

export default auth

