import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

// Is this the right way to do this?
// all users can access this info, if logged in, clientAuth
const route = {
  getRoutes: () => {
  return axios({
    url: '/routes',
    method: 'get'
  })
}

//// end route const
}

export default route
