/* eslint-disable func-call-spacing,no-trailing-spaces */
import _ from 'lodash'
import Vue from 'vue'
import api from '@/api'
import * as types from '../mutations-type'

const member = {
  state: {
    members: {},
    teamMember: []
  },
  getters: {
    getMembers: state => id => state.members[id],
    getteamMember: state => state.teamMember
  },
  mutations: {
    [types.SET_MEMBERS] (state, {chatId, members}) {
      Vue.set(state.members, chatId, members)
    },
    updateTeamMember (state, saveteamMember) {
      // state.teamMember = []
      // Vue.set(state, state.teamMember, )
      // state.teamMember.splice(0, state.teamMember.length)
      saveteamMember.map (i => {
        state.teamMember.push(i)
      })
    },
    deleteTeamMember (state, delTeamMember) {
      delTeamMember.forEach((dMember) => {
        state.teamMember = state.teamMember.filter((tMember) => {
          return dMember.id !== tMember.id
        })
      })
    },
    deletTeamMember (state) {
      state.teamMember = []
    }
  },
  actions: {
    async addMembers ({ commit }, members) {

    },
    async remove ({ commit }) {
    },
    async findMembers ({ commit }, groupId) {
      let members = await api.member.findAll(groupId)
      if (_.isEmpty(members)) {
      }
      commit(types.SET_MEMBERS, {groupId, members})
    },
    async findById ({ commit }, phone) {
    }
  }
}

export default member
