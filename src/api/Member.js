import axios from '@/http'
import BaseAPI from './BaseAPI'
import { getUrl } from './path'

class Member extends BaseAPI {
  findAll (groupId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${groupId}/members`)
    })
  }
  invite (groupId, data) {
    return axios({
      method: 'POST',
      url: getUrl(`groups/${groupId}/invite`),
      data
    })
  }
  join (groupId, data) {
    return axios({
      method: 'POST',
      url: getUrl(`groups/${groupId}/join`),
      data
    })
  }
  logout (groupId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${groupId}/logout`)
    })
  }
  remove (groupId) {
    return axios({
      method: 'DELETE',
      url: getUrl(`groups/${groupId}/members`)
    })
  }
}

export default Member
