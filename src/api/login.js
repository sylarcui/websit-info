import { RL_YTX, sig } from '../lib/RL_YTX'
import api from '@/api'
import hash from '@/utils/hash'
import Countly from '@/utils/countly'
import featureToggle from '../config/feature-toggle'

async function login (userName) {
  let res = await sig(userName)
  var loginBuilder = new RL_YTX.LoginBuilder()
  loginBuilder.setType(1)
  loginBuilder.setUserName(userName)
  loginBuilder.setPwd()
  loginBuilder.setSig(res._sig)
  loginBuilder.setTimestamp(res._timestamp)
  console.log('RL_YTX login params \n', JSON.stringify(loginBuilder, null, 2))
  console.log(loginBuilder)
  RL_YTX.login(loginBuilder, function (obj) {
    console.log('login success', obj)
    getMyinfo()
  }, function (obj) {
    console.log('login error', obj)
  })
}
async function getMyinfo () {
  RL_YTX.getMyInfo(
    async function (obj) {
      // 获取用户名
      let me = await api.user.me()
      me = JSON.parse(hash.aesDecryptHex(me.crypto, localStorage.getItem('md5')))
      let userInfo = me.me
      console.log(obj, me, '获取成功')
      if (me.me.type === 'AD') {
        localStorage.setItem('meAccountAD', me.me.account)
      } else {
        localStorage.setItem('meAccount', me.me.account)
      }
      if (obj.nickName === '' && obj.nickName !== userInfo.name) {
        await setMyinfo(userInfo)
      }
      if (featureToggle.mBaaS) {
        Countly.add_event({
          key: 'login num_web',
          count: 1,
          segmentation: {
            account: me.account
          }
        })
      }
    }, function (obj) {
      // 获取数据失败
    console.log(obj, '获取失败')
  })
}
function setMyinfo (userInfo) {
  console.log(userInfo.name, 'userInfouserInfo')
  let uploadPersonInfoBuilder = new RL_YTX.UploadPersonInfoBuilder()
  uploadPersonInfoBuilder.setNickName(userInfo.name || '')
  uploadPersonInfoBuilder.setSex(userInfo.sex || '')
  uploadPersonInfoBuilder.setSign('')
  uploadPersonInfoBuilder.setBirth('')
  RL_YTX.uploadPerfonInfo(
    uploadPersonInfoBuilder,
    function (obj) {
      // 设置成功
      obj.version // 个人信息版本号
      // console.log(obj, '设置成功')
    }, function (resp) {
      // 设置失败
      console.log(resp, '设置失败')
    })
}

export { login }
