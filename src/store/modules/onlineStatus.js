import { Message } from 'element-ui'

const onlineStatus = {
  state: {
    onlineStatus: true
  },
  getters: {
    onlineStatus: state => state.onlineStatus
  },
  mutations: {
    updateOnlineStatus (state, onlineStatus) {
      state.onlineStatus = onlineStatus
    }
  },
  actions: {
    fetchOnlineStatus ({ commit }, onlineStatus) {
      let onlineMessage = Message({
        duration: 0,
        message: '当前网络处于离线状态，请检测您的网络',
        type: 'warning'
      })
      if (onlineStatus) {
        Message.closeAll(onlineMessage)
      } else {
        onlineMessage
      }
      commit('updateOnlineStatus', onlineStatus)
    }
  }
}

export default onlineStatus
