// import httpConfig from '@/constant/http-config'
import axios from 'axios'
// import store from './store'
// axios.defaults.timeout = httpConfig.TIMEOUT

axios.defaults.baseURL = '/api'
// axios.interceptors.request.use(
//   config => {
//     config.headers = {
//       'x-client-type': 'web',
//       'x-client-id': localStorage.getItem('deviceId') || '',
//       'version': 'v1.0.0'
//     }
//     return config
//   },
//   err => {
//     console.log(err)
//     return Promise.reject(err)
//   }
// )
axios.interceptors.request.use(
  config => {
    if (config.url.startsWith('/api')) {
      config.headers = {
        'x-client-type': 'web',
        'x-client-id': localStorage.getItem('deviceId') || '',
        'version': 'v1.0.0',
        'x-client-transfer': localStorage.getItem('web-date') || ''
      }
    } else {
      config.headers = {}
    }
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data.code === 200) {
      return response.data.data
    }
    return response
  },
  error => {
    if (error.response.data.code === 401 || error.response.data.code === 201) {
      // store.dispatch('logout').then(() => {
      //   localStorage.removeItem('token')
      //   window.location.href = '/login'
      // })
    } else {
      return Promise.reject(error)
    }
  }
)

export default axios
