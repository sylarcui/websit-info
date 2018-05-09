import axios from '@/http'
import BaseAPI from './BaseAPI'
import { getUrl } from './path'

class Room extends BaseAPI {
  findAll (params) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${this.baseName}`),
      params
    })
  }
  findMembers (groupId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${groupId}/members`)
    })
  }
}

export default Room
