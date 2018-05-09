import api from '@/api'
import * as types from '../mutations-type'
import _ from 'lodash'

let limit = 20

let remarkFolders = (folders) => {
  if (_.isEmpty(folders)) {
    return folders
  }

  return folders.map((folder) => {
    folder.isFolder = true
    return folder
  })
}

const file = {
  state: {
    files: [],
    folders: [],
    fileData: [],
    myFileUseSpace: {},
    myFileTotalSize: 0,
    myFileSheng: 0,
    gouKuaiFileLength: 0
  },
  getters: {
    files (state) {
      let filterAfter = _.uniqBy(state.files, 'messageId')
      // filterAfter = _.sortBy(filterAfter, function (item) {
      //   return -item.updatedAt
      // })
      return state.folders.concat(filterAfter)
    },
    fileData (state) {
      return state.fileData
    },
    getUsedSpace (state) {
      return state.myFileUseSpace
    },
    getGouKuaiFileLength (state) {
      return state.gouKuaiFileLength
    },
    getTotalSize (state) {
      return state.myFileTotalSize
    },
    getSheng (state) {
      return state.myFileSheng
    }
  },
  setters: {},
  mutations: {
    updataGouKuaiFileLength (state, length) {
      state.gouKuaiFileLength = length
    },
    [types.GET_TOTAL_SPACE] (state, myFileTotalSize) {
      state.myFileTotalSize = myFileTotalSize
    },
    [types.GET_SHENG_SPACE] (state, myFileSheng) {
      state.myFileSheng = myFileSheng
    },
    [types.GET_MY_SPACE] (state, myFileUseSpace) {
      if (myFileUseSpace.isAdd) {
        state.myFileUseSpace.used += myFileUseSpace.used
        state.myFileUseSpace = {...state.myFileUseSpace}
        // console.log(Number(state.myFileUseSpace.used), '*********9090990***')
      } else {
        state.myFileUseSpace.used = myFileUseSpace.used
      }
    },
    [types.SET_MY_FILES] (state, files) {
      state.files = _.isEmpty(files) ? [] : files
    },
    [types.APPEND_MY_FILES] (state, files) {
      if (!_.isEmpty(files)) {
        state.files.push(...files)
      }
    },
    [types.UNSHIFT_MY_FILES] (state, files) {
      if (!_.isEmpty(files)) {
        state.files.unshift(...files)
      }
    },
    [types.REMOVE_MY_FILES] (state, ids) {
      if (_.isEmpty(ids)) {
        return
      }
      let idSet = new Set(ids)
      state.files = state.files.filter((file) => !idSet.has(`${file._id}`))
    },
    [types.REMOVE_MY_FOLDERS] (state, ids) {
      if (_.isEmpty(ids)) {
        return
      }

      let idSet = new Set(ids)
      console.log(idSet)
      state.folders = state.folders.filter((folder) => !idSet.has(`${folder._id}`))
    },
    [types.SET_MY_FOLDERS] (state, folders) {
      state.folders = _.isEmpty(folders) ? [] : folders
    },
    [types.UNSHIFT_MY_FOLDERS] (state, folders) {
      if (!_.isEmpty(folders)) {
        state.folders.unshift(...folders)
      }
      state.folders = _.uniqBy(state.folders, (e) => e.id)
    },
    [types.GET_FOLDER_BY_ID] (state, id) {
      return state.folders.filter((folder) => `${folder._id}` === `${id}`)
    },
    [types.NEW_FOLDER] (state) {
      if (!state.folders.some((folder) => folder.newFolder)) {
        state.folders.unshift({isFolder: true, newFolder: true})
      }
    },
    [types.NEW_FOLDER_CANCEL] (state) {
      console.log(state)
      document.querySelector('table tbody tr td').style.visibility = 'visible'
      state.folders = state.folders.filter((folder) => !folder.newFolder)
    },
    [types.SET_FILE_DATA] (state, fileData) {
      state.fileData = fileData
    }
  },
  actions: {
    async getMyFileUseSpace ({commit}) {
      try {
        let res = await api.file.getMyFileSpace()
        let totalSize = res.size
        let shengyu = totalSize - res.used
        console.log('**totalsize******', totalSize)
        let sizeObj = {
          used: res.used,
          isAdd: false
        }
        console.log('**usedSize******', sizeObj.used)
        console.log('&&&&&&*剩余', totalSize - res.used)
        commit(types.GET_MY_SPACE, sizeObj)
        commit(types.GET_TOTAL_SPACE, totalSize)
        commit(types.GET_SHENG_SPACE, shengyu)
        return res
      } catch (err) {
        console.log('errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
      }
    },
    async loadMyFiles ({commit}, params = {}) {
      params.limit = limit
      let res
      try {
        res = await api.file.getMyFiles(params)
      } catch (err) {
        res = {files: []}
      }
      commit(types.SET_MY_FILES, res.files)
      commit(types.SET_MY_FOLDERS, remarkFolders(res.folders))

      return res
    },
    async loadMoreMyFiles ({commit}, params = {}) {
      params.limit = limit
      let res = await api.file.getMyFiles(params)
      commit(types.APPEND_MY_FILES, res.files)
      commit(types.UNSHIFT_MY_FOLDERS, remarkFolders(res.folders))

      return res.files
    },
    async upload2MyFiles ({commit}, params) {
      let res = await api.file.uploadFile(params)
      commit(types.UNSHIFT_MY_FILES, [res])

      return res
    },
    async removeMyFiles ({commit}, _fileIds) {
      if (_.isEmpty(_fileIds)) {
        return {}
      }
      let res = await api.file.removeMyFiles(_fileIds)
      commit(types.REMOVE_MY_FILES, res._fileIds)

      return res
    },
    async moveMyFiles ({commit}, params) {
      let res = await api.file.moveMyFiles(params)
      commit(types.REMOVE_MY_FILES, res._fileIds)

      return res
    },
    async removeMyFolders ({commit}, _folderIds) {
      if (_.isEmpty(_folderIds)) {
        return {}
      }
      let res = await api.file.removeMyFolders(_folderIds)
      commit(types.REMOVE_MY_FOLDERS, res._folderIds)

      return res
    },
    async loadGroupFiles ({commit}, {type, id, params = {}}) {
      params.limit = limit
      let pattern = new RegExp("[\"*|\\[\\]<>/?*|/；:'？?]")
      if (params.name && pattern.test(params.name)) {
        commit(types.SET_MY_FILES, [])
        commit(types.SET_MY_FOLDERS, [])
        return
      }
      let res = await api.file.searchGroupFiles(type, id, params)
      commit(types.SET_MY_FILES, res.files)
      commit(types.SET_MY_FOLDERS, res.folders)
    },
    async loadMoreGroupFiles ({commit}, {type, id, params = {}}) {
      params.limit = limit
      let res = await api.file.searchGroupFiles(type, id, params)
      commit(types.APPEND_MY_FILES, res.files)
      commit(types.UNSHIFT_MY_FOLDERS, remarkFolders(res.folders))

      return res.files
    },
    async createMyFolder ({commit}, {folderInfo, isInFolder}) {
      // debugger
      let folder = await api.file.createFolder(folderInfo)
      commit(types.NEW_FOLDER_CANCEL)
      // debugger
      if (!isInFolder) {
        commit(types.UNSHIFT_MY_FOLDERS, remarkFolders([folder]))
      }

      return folder
    }
    // async renameFolder ({commit}, {folderName}) {
    //   let folderName = await api.file.Folder(folderName)
    // }
  }
}

export default file
