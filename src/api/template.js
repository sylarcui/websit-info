import axios from '@/http'
import { getUrl } from './path'

const template = {
  // 创建群聊并添加成员
  list: function (data) {
    return axios({
      method: 'POST',
      url: getUrl('templateList'),
      data
    })
  }
}

export default template
