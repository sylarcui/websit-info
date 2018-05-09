import axios from '@/http'
import { getUrl } from './path'
import _ from 'lodash'
import uuid from 'uuid'
let icons = {
  'txt': new Set(['txt', 'log']),
  'apk': new Set(['apk']),
  'ios': new Set(['deb', 'ipa', 'pxl']),
  'audio': new Set(['mp3', 'wma', 'flac']),
  'video': new Set(['mp4', 'rmvb', 'mov', 'flv', 'avi']),
  'doc': new Set(['doc', 'docx']),
  'ppt': new Set(['ppt', 'pptx']),
  'xls': new Set(['xls', 'xlsx']),
  'img': new Set(['jpg', 'jpeg', 'gif', 'png', 'bmp']),
  'pdf': new Set(['pdf']),
  'ps': new Set(['psd']),
  'zip': new Set(['zip', 'tar', '7z', 'rar', 'gz'])
}
const file = {
  isImg (file) {
    if (file.isFolder) {
      return false
    }

    return icons.img.has(file.type)
  },
  fileIcon (file) {
    if (file.isFolder) {
      return 'icon-folder'
    } else {
      let cl = 'file'
      if (_.isEmpty(file.type)) {
        let dotIndex = file.name.lastIndexOf('.')
        if (dotIndex > -1) {
          file.type = file.name.substr(dotIndex + 1)
        }
      }
      for (let icon in icons) {
        if (icons[icon].has((file.type || '').toLowerCase())) {
          cl = icon
          break
        }
      }

      return `icon-${cl}`
    }
  },
  getMyFiles (params) {
    return axios({
      method: 'get',
      url: getUrl('files/me'),
      params
    })
  },
  getMyFileSpace () {
    return axios({
      method: 'get',
      url: getUrl('files/space')
    })
  },
  forwardingGroupFile (params) {
    return axios({
      method: 'POST',
      url: getUrl('files/repost'),
      params
    })
  },
  moveMyFiles (params) {
    return axios({
      method: 'put',
      url: getUrl('files/move'),
      params
    })
  },
  removeMyFiles (_fileIds) {
    return axios({
      method: 'delete',
      url: getUrl('files'),
      params: {
        _fileIds
      }
    })
  },
  removeMyFolders (_folderIds) {
    return axios({
      method: 'delete',
      url: getUrl('files/folder'),
      params: {
        _folderIds
      }
    })
  },
  searchGroupFiles (type, id, params) {
    return axios({
      method: 'get',
      url: getUrl(`files/${type}/${id}/search`),
      params
    })
  },
  findGroupFiles (id, params) {
    return axios({
      method: 'get',
      url: getUrl(`files/room/${id}/search`),
      params
    })
  },
  createFolder (data) {
    return axios({
      method: 'POST',
      url: getUrl('files/folder'),
      data
    })
  },
  renameFolder (id, params) {
    return axios({
      method: 'PUT',
      url: getUrl(`files/folder/${id}`),
      params
    })
  },
  collectFile (params, _folderId) {
    if (_folderId) {
      params._folderId = _folderId
    }
    return axios({
      method: 'post',
      url: getUrl('files/collect'),
      params
    })
  },
  uploadFile (params) {
    return axios({
      method: 'post',
      // url: getUrl('files'),
      url: getUrl('files'),
      params
    })
  },
  getUpServers () {
    return axios({
      method: 'post',
      url: 'https://bimworks.hnaresearch.com:9527/v2/goukuai/getUpServers'
    })
  },
  getFlieList (params) {
    return axios({
      method: 'post',
      url: 'https://bimworks.hnaresearch.com:9527/v2/goukuai/list',
      params
    })
  },
  addFileTag (params) {
    return axios({
      method: 'post',
      url: 'https://bimworks.hnaresearch.com:9527/v2/goukuai/addTag',
      params
    })
  },
  delFile (params) {
    return axios({
      method: 'post',
      url: 'https://bimworks.hnaresearch.com:9527/v2/goukuai/delfile',
      params
    })
  },
  webUpload (updataData, cb, progressEventCb) {
    updataData.files.overUpload = 'start'
    let orgClientId = 'TJ4a36NtJE04asj8o02ViVjLFI'
    let formData = new FormData()
    let UserId
    if (updataData.me.user.type !== 'NORMAL') {
      UserId = updataData.me.user.stuffNo
    } else {
      UserId = updataData.me.user.id
    }
    formData.append('org_client_id', orgClientId)
    formData.append('path', `${UserId}/huiyijiyao`)
    formData.append('name', updataData.files.name)
    formData.append('op_name', updataData.me.user.name)
    formData.append('overwrite', 0)
    formData.append('filefield', 'file')
    formData.append('file', updataData.files)
    async function upload (e) {
      let getServers = await file.getUpServers()
      let index = Math.floor(Math.random() * getServers['m-upload'].length)
      let url = getServers['m-upload'].length > 1 ? `${getServers['m-upload'][index]}/2/web_upload` : `${getServers['m-upload'][0]}/2/web_upload`
      // let url = 'http://10.70.69.60:80/m-upload/2/web_upload'
      axios.post(url, formData,
        {
          cancelToken: updataData.source.token,
          onUploadProgress: (progressEvent) => {
            progressEventCb(progressEvent, updataData.files)
          }
        })
        .then(resp => {
          console.log(resp, '-------')
          console.log(uuid.v1())
          updataData.files.overUpload = 'over'
          cb(resp, updataData.files, uuid.v1())
        })
        .catch(err => {
          console.log(err, 'errerrerrerrerrerrerrerr')
          // cb(err, updataData.files, uuid.v1())
        })
    }
    upload()
  }
}

export default file
