import axios from '@/http'
import { getUrl } from './path'

const contact = {
  getContacts: function () {
    return axios({
      method: 'get',
      url: getUrl('users/contacts')
    })
  },
  getNewContact: function (data) {
    return axios({
      url: getUrl('users/contacts'),
      method: 'POST',
      data
    })
  }
}

export default contact
