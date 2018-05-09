/* eslint-disable func-call-spacing,no-trailing-spaces */
import api from '@/api'
import * as types from '../mutations-type'

const contact = {
  state: {
    contacts: []
  },
  getters: {},
  setters: {},
  mutations: {
    [types.SET_CONTACTS] (state, contacts) {
      state.contacts = contacts
    },
    [types.CREATE_CONTACT] (state, contact) {
      state.contacts.push(contact)
    }
  },
  actions: {
    async getContacts ({commit}) {
      let data = await api.contact.getContacts()
      data.contacts.map((i) => {
        i.pinyin = window.pinyinUtil.getPinyin(i.name).replace(/\s+/g, '')
      })
      commit(types.SET_CONTACTS, data.contacts)
      return data
    }
  }
}

export default contact
