import axios from 'axios'
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'https://climb-finder.herokuapp.com/'  || 'http://localhost:3001' 

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
  },

  getGeocode: (searchValue) => {
    return axios({
      url: '/routes/local',
      params: {searchValue: searchValue},
      method: 'get'
    })
  }

//// end route const
}

export default route
// change to routeAPI
