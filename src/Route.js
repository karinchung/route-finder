import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:3001'

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
