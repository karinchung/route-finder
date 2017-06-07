import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

// all users can access this info, if logged in, clientAuth
const route = {
  getRoutes: () => {
  return axios({
    url: '/routes',
    method: 'get'
  })
},

  showRoute: (id) => {
    return axios({
      url:`/routes/${id}`,
      method: 'get'
    })
  }

//// end route const
}

export default route
// change to routeAPI
