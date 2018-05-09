import axios from '@/http'
import { getUrl } from './path'

const colleague = {
  getOrganization: function (nodeId) {
    return axios({
      method: 'get',
      url: getUrl(`colleagues/organizations/${nodeId}`),
      transformResponse: function (data) {
        let obj = JSON.parse(data)
        if (obj.data.organization) {
          let organization = obj.data.organization
          organization.id = organization.nNodeID
          organization.name = organization.vcShortName
          organization.breadcrumbIds = organization.vcOrganID.split('-').filter((id) => { return id !== '' && id !== '0' })
        }
        return obj
      }
    })
  },
  getOrganizations: function (params) {
    return axios({
      method: 'get',
      params: params,
      url: getUrl(`colleagues/organizations`),
      transformResponse: function (data) {
        let obj = JSON.parse(data)
        if (obj.data.organizations) {
          obj.data.organizations.forEach((organization) => {
            if (organization) {
              organization.id = organization.nNodeID
              organization.name = organization.vcShortName
              organization.parent = organization.vcParentId
            }
          })
        }
        return obj
      }
    })
  },
  getEmployees: function (params, source) {
    return axios({
      method: 'get',
      params: params,
      url: getUrl('colleagues/employees'),
      cancelToken: source ? source.token : '',
      transformResponse: function (data) {
        let obj = JSON.parse(data)
        if (obj.data.employees) {
          obj.data.employees.forEach((employee) => {
            if (employee) {
              employee.name = employee.nickname ? employee.nickname : employee.username
              employee.stuffNo = employee.employeeId
              employee.company = employee.jobs[0].company // Temporary jobs?
              employee.department = employee.jobs[0].department // Temporary jobs?
              employee.title = employee.jobs[0].title // Temporary jobs?
            }
          })
        }
        return obj
      }
    })
  },

  getParentData: function () {
    return axios({
      method: 'get',
      url: getUrl('colleagues/organizations/me/withParentData')
    })
  },
  getCrumData: function () {
    return axios({
      method: 'get',
      url: getUrl('colleagues/organizations/me')
    })
  },
  getMineEmployees: function () {
    return axios({
      method: 'get',
      url: getUrl('colleagues/employees/me')
    })
  },
  getchildOrganEmployees: function (id) {
    return axios({
      method: 'get',
      url: getUrl(`colleagues/organizations/${id}/all`)
    })
  },
  getCollEmployees: function (id) {
    return axios({
      method: 'get',
      url: getUrl(`colleagues/organizations/${id}/employees`)
    })
  },
  getcrumColleagueEmployees: function (id) {
    return axios({
      method: 'get',
      url: getUrl(`colleagues/organizations/${id}/organizations`)
    })
  },
  getMobileColleagueEmployees (mobile) {
    return axios({
      method: 'get',
      url: getUrl(`colleagues/employees/mobile/${mobile}`),
      transformResponse: function (data) {
        let obj = JSON.parse(data)
        if (obj.data.employees) {
          obj.data.employees.forEach((employee) => {
            if (employee) {
              employee.name = employee.nickname ? employee.nickname : employee.username
              employee.stuffNo = employee.employeeId
              employee.company = employee.jobs[0].company // Temporary jobs?
              employee.department = employee.jobs[0].department // Temporary jobs?
              employee.title = employee.jobs[0].title // Temporary jobs?
            }
          })
        }
        return obj
      }
    })
  },
  getRoomsJoined: function (params) {
    return axios({
      method: 'get',
      params: params,
      url: getUrl('/groups/rooms/joined')
    })
  }
}

export default colleague
