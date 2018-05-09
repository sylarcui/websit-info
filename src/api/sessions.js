import axios from '@/http'
import { getUrl } from './path'
const sessions = {
  getSessionsList () {
    return axios({
      method: 'get',
      url: getUrl('im/sessions')
    })
  },
  setSession (params) {
    return axios({
      method: 'post',
      url: getUrl('im/sessions'),
      params
    })
  },
  cancelSession (sessionID) {
    return axios({
      method: 'DELETE',
      url: getUrl(`im/sessions/${sessionID}`)
    })
  }
}

export default sessions
