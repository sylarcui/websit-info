import axios from '@/http'

function getQRCode (data) {
  return axios({
    method: 'get',
    url: 'http://pan.baidu.com/share/qrcode?w=350&h=350&url=www.baidu.com'
  })
}

export { getQRCode }
