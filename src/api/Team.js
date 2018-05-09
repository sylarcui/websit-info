import axios from '@/http'
import BaseAPI from './BaseAPI'
import { getUrl } from './path'

class Team extends BaseAPI {
  findMembers (groupId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${groupId}/members`)
    })
  }
  findRooms (_teamId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/teams/rooms`),
      params: {
        _teamId
      }
    })
  }
  findTags () {
    return axios({
      method: 'GET',
      url: getUrl(`groups/teams/tags`)
    })
  }
  findAllTeamMembers () {
    return axios({
      method: 'GET',
      url: getUrl('groups/teams/members')
    })
  }
  logoutTeam (groupId) {
    return axios({
      method: 'GET',
      url: getUrl(`groups/${groupId}/logout`)
    })
  }
}
export default Team
