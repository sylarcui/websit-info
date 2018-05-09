import axios from '@/http'
import { getUrl } from './path'

class BaseAPI {
  constructor () {
    this.baseName = `${this.constructor.name.toLowerCase()}s`
  }
  create (data) {
    return axios({
      method: 'POST',
      url: getUrl(`groups/${this.baseName}`),
      data
    })
  }
  update (id, data) {
    return axios({
      method: 'PUT',
      url: getUrl(`groups/${this.baseName}/${id}`),
      data
    })
  }
  findAll (params) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${this.baseName}`),
      params
    })
  }
  findOne (id) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${this.baseName}/${id}`)
    })
  }
  remove (id) {
    return axios({
      method: 'DELETE',
      url: getUrl(`groups/${this.baseName}/${id}`)
    })
  }
  join (id, data) {
    return axios({
      method: 'POST',
      url: getUrl(`groups/${id}/join`),
      data
    })
  }
}

export default BaseAPI
