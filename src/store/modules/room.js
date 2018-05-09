/* eslint-disable func-call-spacing,no-trailing-spaces */
import _ from 'lodash'
import Vue from 'vue'
import api from '@/api'
import * as types from '../mutations-type'

const room = {
  state: {
    rooms: {}
  },
  getters: {
    getGroup: state => id => state.rooms[id]
  },
  mutations: {
    [types.GET_ROOM] (state, {roomId, room}) {
      state[ roomId ] = room
    },
    [types.CREATE_ROOM] (state, room) {
      Vue.set(state.rooms, room.groupId, room)
    },
    [types.SET_ROOMS] (state, {_teamId, rooms}) {
      state[_teamId] = rooms
    },
    [types.REMOVE_ROOM] (state, ids) {
      if (_.isEmpty(ids)) {
        return
      }
      let idSet = new Set(ids)
      state.rooms = state.rooms.filter((room) => !idSet.has(`${room._id}`))
    },
    [types.UPDATA_ROOM] (state, room) {
      state.rooms.find(item => {
        if (item._id === room._id) {
          item = room
        }
      })
    }
  },
  actions: {
    async createRoom ({ commit }, roomInfo) {
      let {room} = await api.room.create(roomInfo)
      commit(types.CREATE_ROOM, room)
      return room
    },
    async removeRoom ({ commit }, roomId) {
      if (_.isEmpty(roomId)) {
        return {}
      }
      let res = await api.room.remove(roomId)
      commit(types.REMOVE_ROOM, res)
    },
    async findRooms ({ commit }, _teamId) {
      let rooms = await api.room.findAll({_teamId})
      if (_.isEmpty(rooms)) {
      }
      commit(types.SET_ROOMS, {_teamId, rooms})
      return rooms
    },
    async updateRoom ({commit}, roomInfo) {
      let {room} = await api.room.update(roomInfo._id, roomInfo)
      commit(types.UPDATA_ROOM, room)
    },
    async findRoomById ({ commit }, roomId) {
      let room = await api.room.findOne(roomId)
      commit(types.GET_ROOM, room)
      return room
    }
  }
}

export default room
