import axios from '@/http'
import BaseAPI from './BaseAPI'
import { getUrl } from './path'

class CollectionMessage extends BaseAPI {
  getFavoriteMsg (params) {
    return axios({
      method: 'GET',
      url: getUrl('favoritemessages'),
      params
    })
  }
  queryFavoriteMsgsTotal () {
    return axios({
      method: 'GET',
      url: getUrl('favoritemessages/total')
    })
  }

}
export default CollectionMessage
