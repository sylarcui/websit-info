import axios from '@/http'
import { getUrl } from './path'
import BaseAPI from './BaseAPI'

class User extends BaseAPI {
  getUser (params) {
    return axios({
      url: getUrl(`users/detail?refresh=true`),
      method: 'GET',
      params
    })
  }
  findOneColleague (params) { // params is account or stuffNo
    return axios({
      url: getUrl(`colleagues/employees/${params}`),
      method: 'GET'
    })
  }
  getColleagues (params) {
    return axios({
      url: getUrl(`colleagues/employees/accounts`),
      method: 'GET',
      params
    })
  }
  refreshToken () {
    return axios({
      url: getUrl(`auth/refreshToken`),
      method: 'GET'
    })
  }
  async me () {
    return axios.get(getUrl(`users/me?refresh=true`))
  }
}

export default User
