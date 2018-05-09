/* eslint-disable no-trailing-spaces */
import _ from 'lodash'
import api from '@/api'
import * as types from '../mutations-type'
import NotifyConstant from '../../constant/notification'
import Vue from 'vue'
import db from '../db'
import featureToggle from '../../config/feature-toggle'
import hash from '@/utils/hash'

function convertDomain (msg) {
  let _msgDomain = typeof msg.msgDomain === 'string' ? JSON.parse(msg.msgDomain) : msg.msgDomain
  let _msgDateCreated = typeof msg.msgDateCreated === 'string' ? parseInt(msg.msgDateCreated) : msg.msgDateCreated
  msg.msgDomain = _msgDomain
  msg.msgDateCreated = _msgDomain.msgDateCreated ? _msgDomain.msgDateCreated : _msgDateCreated
}

function getMsgMeta (msg, action, rootState) {
  let key, type
  if (msg.msgReceiver.startsWith('g')) {
    key = msg.msgReceiver
    if (msg.msgDomain.team && msg.msgDomain.team.teamId) {
      type = NotifyConstant.types.GROUP // 讨论组
    } else {
      type = NotifyConstant.types.ROOM // 群聊
    }
  } else {
    if (action === 'RECEIVE' && msg.msgSender !== rootState.user.user.initializeId) {
      key = msg.msgSender
    } else {
      key = msg.msgReceiver
    }
    type = NotifyConstant.types.SINGLE
  }
  return {key, type}
}

async function getNotify (state, rootState, msg, action, chatId) {
  convertDomain(msg)
  if (!msg.msgDomain.user) return
  let {key, type} = getMsgMeta(msg, action, rootState)
  let notifyName, notifyAvatar
  if (action === 'RECEIVE') {
    switch (type) {
      case NotifyConstant.types.ROOM:
        notifyName = msg.msgDomain.room.name
        notifyAvatar = 'http://oi9r0ivj6.bkt.clouddn.com/head_Grouptalk.png'
        break
      case NotifyConstant.types.GROUP:
        notifyName = msg.msgDomain.room.name
        notifyAvatar = 'http://oi9r0ivj6.bkt.clouddn.com/taolunzu.svg'
        if (msg.msgDomain.team.teamId === msg.msgDomain.room.roomId) {
          notifyAvatar = 'http://oi9r0ivj6.bkt.clouddn.com/gonggaoban.svg'
        }
        break
      default:
        if (msg.msgSender !== rootState.user.user.initializeId) {
          notifyName = msg.msgDomain.user.name
          notifyAvatar = msg.msgDomain.user.avatarUrl
        } else {
          let receiver = rootState.user.users[msg.msgReceiver]
          if (!receiver) {
            receiver = await api.user.getUser({initializeId: msg.msgReceiver})
            notifyName = receiver.user.name
            notifyAvatar = receiver.user.avatarUrl
          } else {
            notifyName = receiver.name
            notifyAvatar = receiver.avatarUrl
          }
        }
    }
  } else {
    notifyName = state.notifications[key].name
    notifyAvatar = state.notifications[key].avatarUrl
  }
  let unReadNums
  if (rootState.user.user.initializeId !== msg.msgSender && key !== chatId) {
    unReadNums = 1
  } else {
    unReadNums = 0
  }
  let newNotify = {
    id: key,
    text: msg.msgContent,
    name: notifyName,
    avatarUrl: notifyAvatar,
    type,
    date: msg.msgDateCreated,
    unReadNum: unReadNums,
    unReadNumTemp: 0,
    unReadNumHidden: false
  }
  if (type === NotifyConstant.types.ROOM || type === NotifyConstant.types.GROUP) {
    newNotify.roomId = msg.msgDomain.room.roomId
    newNotify.teamId = msg.msgDomain.team ? msg.msgDomain.team.teamId : ''
    if (rootState.user.user.initializeId !== msg.msgSender && msg.msgSender !== '10089') {
      newNotify.text = `${msg.msgDomain.user.name}:${msg.msgContent}`
    }
  }
  return newNotify
}

const MessageState = {
  state: {
    msgMap: {},
    notifications: {},
    notHistoryGet: [],
    unReadNumTotal: 0,
    sendFile: true
  },
  getters: {
    msgMap: state => state.msgMap,
    notifications: state => state.notifications,
    getNotify: state => id => state.notifications[id],
    getMsgList: state => id => state.msgMap[id],
    translatedMsg: state => state.translatedMsg,
    notHistoryGetList: state => state.notHistoryGet,
    unReadNumTotal: state => state.unReadNumTotal,
    sendFile: state => state.sendFile
  },
  mutations: {
    [types.SET_MESSAGE] (state, {msg, key}) {
      let currentMsgList
      if (state.msgMap[key]) {
        currentMsgList = state.msgMap[key].filter(m => m.msgId !== msg.msgId)
        state.msgMap[key] = currentMsgList
        state.msgMap[key].push(msg)
      } else {
        Vue.set(state.msgMap, key, [msg])
      }
    },
    [types.UPDATE_TRANSLATE_MESSAGE] (state, {toId, currentMessage, translatedMessage}) {
      // Attention _.clone don't work when complex array
      var currentMsgList = _.cloneDeep(state.msgMap[toId])
      currentMsgList.map((message) => {
        if (message.msgId === currentMessage.msgId) {
          message.translatedMsg = translatedMessage
          message.isTranslating = currentMessage.isTranslating
        }
      })
      state.msgMap[toId] = currentMsgList
    },
    [types.UPDATE_MESSAGE] (state, {msg, key}) {
      let messages = _.clone(state.msgMap[key])
      if (!_.isEmpty(messages)) {
        let isMessages = messages.filter((m) => { return m.msgId === msg.mockId })
        if (isMessages.length > 0) {
          for (let [index, _msg] of messages.entries()) {
            if (_msg.msgId === msg.mockId) {
              messages[index] = msg
            }
          }
        } else {
          messages.push(msg)
        }
        Vue.set(state.msgMap, key, messages)
      } else {
        Vue.set(state.msgMap, key, [msg])
      }
    },
    [types.REMOVE_MESSAGE] (state, {notifyId, msgId}) {
      let currentMsgList = state.msgMap[notifyId]
      if (!_.isEmpty(currentMsgList)) {
        currentMsgList = currentMsgList.filter(msg => msg.msgId !== msgId)
        state.msgMap[notifyId] = currentMsgList
      } else {
        return
      }
    },
    [types.REMOVE_MESSAGE_LIST] (state, notifyId) {
      Reflect.deleteProperty(state.msgMap, notifyId)
      state.msgMap = {...state.msgMap}
    },
    [types.CLEAR_MESSAGE] (state) {
      state.msgMap = {}
    },
    [types.CLEAR_NOTIFY] (state) {
      state.notifications = {
        'talkai': {
          id: 'talkai',
          name: 'NewBot',
          text: `Hi，我是NewBot，欢迎体验New.Do网页版，现在，你可以去<通讯录>找到你的组织和同仁们一起愉快工作、愉快聊天~`,
          date: new Date().getTime(),
          unReadNum: 1,
          topLevel: 4101509532000,
          msgDomain: {user: {id: 'talkai'}},
          type: 1,
          avatarUrl: '../../../static/img/NewBot.svg'
        }
      }
    },
    [types.CREATE_NOTIFY] (state, notifyInfo) {
      let notifyId = notifyInfo.id
      if (!state.notifications[notifyId]) {
        state.notifications[notifyId] = notifyInfo
        state.notifications = {...state.notifications}
        if (notifyInfo.unReadNum >= 1) {
          state.unReadNumTotal = state.unReadNumTotal + notifyInfo.unReadNum
        }
      }
    },
    [types.UPDATE_NOTIFY] (state, {notifyInfo, chatId, isMe}) {
      let notifyId = notifyInfo.id
      if (state.notifications[notifyId]) {
        for (let k in notifyInfo) {
          if (k === 'unReadNum' && notifyId !== chatId && !isMe) {
            Vue.set(state.notifications[notifyId], k, state.notifications[notifyId][k] + 1)
            state.unReadNumTotal = state.unReadNumTotal + 1
          } else {
            Vue.set(state.notifications[notifyId], k, notifyInfo[k])
          }
        }
      }
    },
    [types.REMOVE_NOTIFY] (state, notifyId) {
      Reflect.deleteProperty(state.notifications, notifyId)
      state.notifications = {...state.notifications}
    },
    [types.GROUP_NOTIFY] (state, notifyInfo) {
      let notifyId = notifyInfo.id
      Reflect.deleteProperty(notifyInfo, 'id')
      for (let k in notifyInfo) {
        Vue.set(state.notifications[notifyId], k, notifyInfo[k])
      }
    },
    [types.CREATE_HISTORY] (state, history) {
      if (!state.notHistoryGet[history]) {
        state.notHistoryGet.push(history)
      }
    },
    [types.UPDATE_UNREADNUM] (state, {num, type}) {
      if (type === 'add') {
        state.unReadNumTotal = state.unReadNumTotal + num
      } else if (type === 'subtract') {
        if (state.unReadNumTotal <= 0) {
          state.unReadNumTotal = 0
        } else {
          state.unReadNumTotal = state.unReadNumTotal - num
        }
      } else {
        state.unReadNumTotal = num
      }
    },
    [types.SENDFILE] (state, type) {
      state.sendFile = type
    }
  },
  actions: { // 同步
    async saveNotify ({commit, state, rootState}, notify) {
      if (notify.id === rootState.user.user.initializeId) {
        return
      }
      commit(types.CREATE_NOTIFY, notify)
      let prefix = `Doudou/${rootState.user.user.initializeId}`
      try {
        if (rootState.user.user.initializeId && notify.id) {
          let _notify = await db.get(`${prefix}/notifications/${notify.id}`)
          if (_notify) {
            notify._id = _notify._id
            notify._rev = _notify._rev
            await db.put(notify)
          }
        }
      } catch (err) {
        if (err.status === 404 && err.name === 'not_found') {
          notify = {
            _id: `${prefix}/notifications/${notify.id}`,
            ...notify
          }
          await db.put(notify)
        } else {
          console.log('message action: saveNotify ==> ', err)
        }
      }
    },
    async updateNotify ({commit, state, rootState}, {notifyInfo, chatId, isMe}) {
      commit(types.UPDATE_NOTIFY, {notifyInfo, chatId, isMe})
      let prefix = `Doudou/${rootState.user.user.initializeId}`
      try {
        if (rootState.user.user.initializeId && notifyInfo.id) {
          let _notify = await db.get(`${prefix}/notifications/${notifyInfo.id}`)
          if (_notify) {
            Reflect.deleteProperty(notifyInfo, 'id')
            for (let k in notifyInfo) {
              _notify[k] = notifyInfo[k]
            }
            await db.put(_notify)
          }
        }
      } catch (err) {
        console.log('message action: updateNotify ==> ', err)
      }
    },
    async removeNotify ({commit, state, rootState}, notifyId) {
      commit(types.REMOVE_NOTIFY, notifyId)
      let prefix = `Doudou/${rootState.user.user.initializeId}`
      try {
        if (rootState.user.user.initializeId && notifyId) {
          let _notify = await db.get(`${prefix}/notifications/${notifyId}`)
          await db.remove(_notify)
        }
      } catch (err) {
        console.log(`remove the notify ${notifyId} failed, ${err}`)
      }
    },
    async removeMsgList ({commit, state, rootState}, notifyId) {
      commit(types.REMOVE_MESSAGE_LIST, notifyId)
      let prefix = `Doudou/${rootState.user.user.initializeId}`
      try {
        if (rootState.user.user.initializeId && notifyId) {
          let _notify = await db.get(`${prefix}/messages/${notifyId}`)
          await db.remove(_notify)
        }
      } catch (err) {
        console.log(`remove the notify ${notifyId} failed, ${err}`)
      }
    },
    async initBimbot ({commit, state, rootState}) {
      let me = await api.user.me()
      me = JSON.parse(hash.aesDecryptHex(me.crypto, localStorage.getItem('md5')))
      let prefix = `Doudou/${me.me.initializeId}`
      try {
        if (me.me.initializeId) {
          await db.get(`${prefix}/notifications/talkai`)
        }
      } catch (err) {
        if (err.status === 404 && err.name === 'not_found') {
          let notify = {
            _id: `${prefix}/notifications/talkai`,
            id: 'talkai',
            name: 'NewBot',
            text: `Hi，我是NewBot，欢迎体验New.Do网页版，现在，你可以去<通讯录>找到你的组织和同仁们一起愉快工作、愉快聊天~`,
            date: new Date().getTime(),
            unReadNum: 1,
            topLevel: 4101509532000,
            msgDomain: {user: {id: 'talkai'}},
            type: 1,
            avatarUrl: '../../../static/img/NewBot.svg'
          }
          await db.put(notify)
        } else {
          console.log('message action: saveNotify ==> ', err)
        }
      }
    },
    async syncMsg ({commit, state, rootState}) {
      let me = await api.user.me()
      me = JSON.parse(hash.aesDecryptHex(me.crypto, localStorage.getItem('md5')))
      let prefix = `Doudou/${me.me.initializeId}`
      // console.log(`这是同步的前缀`, prefix)
      let localNotifys = await db.allDocs({
        include_docs: true,
        startkey: `${prefix}/notifications/`,
        endkey: `${prefix}/notifications/\uffff`
      })
      // console.log(`这是同步的历史notify`, localNotifys)
      let notifys = localNotifys.rows.map(row => row.doc)
      if (localNotifys.rows.length > 0) {
        for (let ntf of notifys) {
          Vue.set(state.notifications, ntf.id, ntf)
          let num = 0
          for (var id in state.notifications) {
            num = num + state.notifications[id].unReadNum
          }
          commit(types.UPDATE_UNREADNUM, {num})
          if (!featureToggle.isHistoryMsg) {
            // Msg同步本地
            let msgs = await db.allDocs({
              include_docs: true,
              startkey: `${prefix}/messages/${ntf.id}/`,
              endkey: `${prefix}/messages/${ntf.id}/\uffff`
            })
            console.log('这是同步的历史消息Map', msgs)
            if (msgs.rows.length > 0) {
              let _msgs = msgs.rows
                .map(row => row.doc)
                .sort((a, b) => a.msgDateCreated > b.msgDateCreated)
              Vue.set(state.msgMap, ntf.id, _msgs)
            }
          }
        }
      }
    },
    async saveMsg ({commit, state, rootState}, msgInfo) {
      let notify
      let {msg, action, chatId} = msgInfo
      convertDomain(msg)
      if (filterMsg(msg, rootState)) return
      if (!msg.msgDomain.user) return
      let prefix = `Doudou/${rootState.user.user.initializeId}`
      let notifyInfo = await getNotify(state, rootState, msg, action, chatId)
      let isMe = rootState.user.user.initializeId === msg.msgSender
      notifyInfo.showMessageList = true
      try {
        console.log(notifyInfo, 'notifyInfonotifyInfo')
        if (state.notifications[notifyInfo.id]) {
          if (msgInfo.msg.state || msgInfo.msg.state === undefined) {
            commit(types.UPDATE_NOTIFY, {notifyInfo, chatId, isMe})
          }
        } else {
          commit(types.CREATE_NOTIFY, notifyInfo)
        }
        // if ([7, 6, 4].includes(msg.msgType)) {
        //   if (msgInfo.msg.state) {
        //     commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
        //     return
        //   } else if (msgInfo.msg.state === false) {
        //     commit(types.UPDATE_MESSAGE, {msg, key: notifyInfo.id})
        //   } else if (msgInfo.msg.state === undefined) {
        //     commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
        //   }
        // } else {
        //   commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
        // }
        // if (msgInfo.msg.state === false) {
        //   commit(types.UPDATE_MESSAGE, {msg, key: notifyInfo.id})
        // } else if (msgInfo.msg.state === undefined || msgInfo.msg.state) {
        //   commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
        // }

        // if (msgInfo.msg.hasOwnProperty('state')) {
        //   if (!msgInfo.msg.state) {
        //     commit(types.UPDATE_MESSAGE, {msg, key: notifyInfo.id})
        //     return
        //   } else {
        //     commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
        //   }
        // } else {
        //   commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
        // }
        if (msgInfo.msg.hasOwnProperty('state')) {
          if (msgInfo.msg.state === 'sending') {
            console.log('sending', msgInfo.msg.state)
            commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
            return
          } else if (msgInfo.msg.state === 'succeed') {
            commit(types.UPDATE_MESSAGE, {msg, key: notifyInfo.id})
          } else if (msgInfo.msg.state === 'defeated') {
            console.log('defeated', msgInfo.msg.state)
            commit(types.UPDATE_MESSAGE, {msg, key: notifyInfo.id})
            // return
          }
        } else {
          commit(types.SET_MESSAGE, {msg, key: notifyInfo.id})
        }

        // 创建常用联系人
        if (notifyInfo.type === NotifyConstant.types.SINGLE) {
          let localContact = rootState.contact.contacts.find(c => c.initializeId === notifyInfo.id)
          if (_.isEmpty(localContact)) {
            let resContact = await api.contact.getNewContact({initialize: notifyInfo.id})
            commit(types.CREATE_CONTACT, resContact.contact.to)
          }
        }

        if (rootState.user.user.initializeId && notifyInfo.id) {
          let currentNotify = state.notifications[notifyInfo.id]
          notify = await db.get(`${prefix}/notifications/${notifyInfo.id}`)
          // console.log(`这是数据库取出来的`, notify)
          Reflect.deleteProperty(currentNotify, '_id')
          Reflect.deleteProperty(currentNotify, '_rev')
          let _notify = {
            _id: notify._id,
            _rev: notify._rev,
            ...currentNotify
          }
          // console.log(`这是更新的notify:`, _notify)
          await db.put(_notify)
          if (!featureToggle.isHistoryMsg) {
            let _msg = {_id: `Doudou/${rootState.user.user.initializeId}/messages/${notifyInfo.id}/${msg.msgId}`, ...msg}
            await db.put(_msg)
          }
        } else {
          console.log(`消息 ${msgInfo.msgContent} 存储失败`)
        }
      } catch (err) {
        if (err.status === 404 && err.name === 'not_found') {
          notify = {
            _id: `${prefix}/notifications/${notifyInfo.id}`,
            ...notifyInfo
          }
          console.log(`这是第一次存储的notify`, notify)
          await db.put(notify)
        } else {
          console.log('message action: setMsg ==> ', err)
        }
      }
    },
    async removeMsg ({commit, state, rootState}, {notifyId, msgId}) {
      commit(types.REMOVE_MESSAGE, {notifyId, msgId})
      // 删除库消息
      if (!featureToggle.isHistoryMsg) {
        let prefix = `Doudou/${rootState.user.user.initializeId}`
        try {
          if (rootState.user.user.initializeId) {
            let _msg = await db.get(`${prefix}/messages/${notifyId}/${msgId}`)
            db.remove(_msg)
          }
        } catch (err) {
          console.log(`remove the msg ${msgId} error, ${err}`)
        }
      }
    },
    async updateMsg ({commit, state, rootState}, {notifyId, msgId, message}) {
      // commit(types.REMOVE_MESSAGE, {notifyId, msgId})
      let prefix = `Doudou/${rootState.user.user.initializeId}`
      try {
        if (rootState.user.user.initializeId) {
          let _msg = await db.get(`${prefix}/messages/${notifyId}/${msgId}`)
          message._id = _msg._id
          message._rev = _msg._rev
          db.put(message)
          // db.put(_msg)
        }
      } catch (err) {
        console.log(`update the msg ${msgId} error, ${err}`)
      }
    },
    async translateMsg ({commit, state, rootState}, msgContent) {
      var translatedMsg = await api.message.getTranlatedMsg({msgContent: msgContent})
      commit(types.SET_TRANSLATE_MESSAGE, translatedMsg)
    }
  }
}

function filterMsg (msg, rootState) {
  // 过滤自己消息
  if (msg.msgSender === msg.msgReceiver && msg.msgReceiver === rootState.user.user.initializeId) {
    return true
  }
  let filterReceivers = ['talkai', '_b_formbot', '_b_snapchatbot', '_b_filebot', '_b_talkai', '_b_assistant']
  if (filterReceivers.includes(msg.msgReceiver) || filterReceivers.includes(msg.msgSender)) {
    return true
  }
  // 过滤附件拓展消息
  let filterMsgTypes = ['meet-card', 'confdetails', 'confstatus', 'dataset', 'bimbot', 'json', 'light_app', 'assistant']
  let msgType = msg.msgDomain.attachment ? msg.msgDomain.attachment.category : 'text'
  if (filterMsgTypes.includes(msgType)) {
    console.log('到底过滤了没有啊？')
    return true
  }
  return false
}

export default MessageState
