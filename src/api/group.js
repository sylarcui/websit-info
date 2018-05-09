import axios from '@/http'
import { getUrl } from './path'

const group = {
  // 创建群聊并添加成员
  createGroup: function (data) {
    return axios({
      method: 'POST',
      url: getUrl('groups/rooms'),
      data
    })
  },
  // 删除群聊
  deleteGroup: function () {
    return axios({
      method: 'DELETE',
      url: getUrl('groups/rooms')
    })
  },
  // 邀请成员
  addPerson: function (groupId, data) {
    return axios({
      method: 'POST',
      url: getUrl(`groups/${groupId}/invite`),
      data
    })
  },
  // 删除成员
  delPerson: function (groupId, data) {
    return axios({
      method: 'DELETE',
      url: getUrl(`groups/${groupId}/members`),
      data
    })
  },
  // 修改群聊/讨论组ID为roomId
  editGroup: function (ID, data) {
    return axios({
      method: 'PUT',
      url: getUrl(`groups/rooms/${ID}`),
      data
    })
  },
  // 获取群组成员
  getGroupMembers: function (groupId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${groupId}/members`)
    })
  },
  // 获取消息列表
  getSessionList: function () {
    return axios({
      method: 'GET',
      url: getUrl('im/sessions/pined')
    })
  },
  // 获取群组详情ID为roomId
  getGroupInfo: function (ID) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${ID}`)
    })
  },
  // 用户申请加入群聊
  joinGroup: function (groupId, data) {
    return axios({
      method: 'POST',
      url: getUrl(`groups/${groupId}/join`),
      data
    })
  },
  // 用户申请退出群聊
  logoutGroup: function (groupId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${groupId}/logout`)
    })
  },
  // 获取历史消息
  getHistoryMsg: function (params) {
    return axios({
      method: 'GET',
      url: getUrl(`im/messages/history/${params.id}`),     // 这个弃用，有待整理
      params: params
    })
  },
  getHistoryMsgV2: function (params) {
    return axios({
      method: 'GET',
      url: getUrl(`im/messages/history/${params.id}`),
      params: params
    })
  },
  // 收藏消息
  collectFavoriteMsg: function (data) {
    return axios({
      method: 'POST',
      url: getUrl('im/messages/favorite'),
      data
    })
  },
  // 查看收藏列表
  getFavoriteMsg: function (params) {
    return axios({
      method: 'GET',
      url: getUrl('im/messages/favorite'),
      params
    })
  },
  // 删除收藏消息 此ID是favoriteMessageModel 中的_id
  deleteFavoriteMsg: function (Id) {
    return axios({
      method: 'DELETE',
      url: getUrl(`im/messages/favorite/${Id}`)
    })
  },
  // 查询收藏数量
  queryFavoriteMsgsTotal: function () {
    return axios({
      method: 'GET',
      url: getUrl('im/messages/favorite/total')
    })
  }
}

export default group
