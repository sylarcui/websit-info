/* eslint-disable func-call-spacing,no-trailing-spaces */
import api from '@/api'
import Vue from 'vue'
import * as types from '../mutations-type'

const team = {
  state: {
    teams: {},
    tags: []
  },
  getters: {
    getTeam: state => id => state.teams[id]
  },
  setters: {},
  mutations: {
    [types.CREATE_TEAM] (state, team) {
      Vue.set(state.teams, team._id, team)
    },
    [types.SET_TEAMS] (state, teams) {
      for (let team of teams) {
        Vue.set(state.teams, team._id, team)
      }
    },
    [types.SET_TEAM_TAGS] (state, tags) {
      state.tags = tags
    },
    [types.UPDATA_TEAM] (state, team) {
      for (let key in state.teams) {
        if (key === team._id) {
          state.teams[key] = team
        }
      }
    }
  },
  actions: {
    async createTeam ({commit}, teamForm) {
      teamForm.projects = teamForm.projects.filter(m => {
        return m.name !== ''
      })
      if (teamForm.projects.length <= 0) {
        delete teamForm.projects
      }
      let team = await api.team.create(teamForm)
      commit(types.CREATE_TEAM, team)
      return team
    },
    async updateTeam ({commit}, teamInfo) {
      teamInfo.projects = teamInfo.projects.filter(m => {
        return m.name !== ''
      })
      if (teamInfo.projects.length <= 0) {
        delete teamInfo.projects
      }
      let team = await api.team.update(teamInfo._id, teamInfo)
      commit(types.UPDATA_TEAM, team)
      return
    },
    async remove ({commit}, id) {
      commit(types.UPDATA_TEAM, id)
    },
    async findAll ({commit, state}) {
      let params = {
        limit: 10,
        page: 1
      }
      state.teams = {}
      let data = await api.team.findAll(params)
      commit(types.SET_TEAMS, data.teams)
      if (data.meta.total > params.limit) {
        let pages = data.meta.total / params.limit
        for (let i = 1; i < Math.ceil(pages); i++) {
          params.page++
          let data = await api.team.findAll(params)
          commit(types.SET_TEAMS, data.teams)
        }
      }
      return data
    },
    async findTags ({ commit }) {
      let data = await api.team.findTags()
      commit(types.SET_TEAM_TAGS, data.tags)
    }
  }
}

export default team
