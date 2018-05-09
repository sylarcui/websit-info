import axios from '@/http'
import { getUrl } from './path'

const companycard = {
  getCompanycards: function (data) {
    return axios({
      url: getUrl(`ecards?type=${data}`),
      method: 'get'
    })
  },
  removeCompanycard: function (_cardIds) {
    return axios({
      method: 'delete',
      url: getUrl(`ecards/${_cardIds}`)
    })
  }
}

export default companycard
