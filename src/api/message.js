import axios from '@/http'
import BaseAPI from './BaseAPI'
import { getUrl } from './path'
class Message extends BaseAPI {
  getTranlatedMsg (queryObj) {
    return axios({
      method: 'GET',
      url: getUrl(`translator/text?q=${queryObj.msgContent}`)
    })
  }

}
export default Message
