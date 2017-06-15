import React, {Component} from 'react'
import clientAuth from './clientAuth.js'
import './Favorites.css'
import route from './Route.js'

class Favorites extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: clientAuth.getCurrentUser(),
      favorites: null
    }
  }

  _findFavorite(fave) {
    route.showRoute(fave).then(res => {
      console.log(res.data)
    })
  }

  render() {
    const eachFavorite = this.state.currentUser.favorites.map((fave, i) => (
      route.showRoute(fave).then(res => {
        const result = res.data
        console.log(result)
        return (
          <div className="row">
            <div className="six columns theMap">
            </div>
            <div className="six columns mapInfo">
              <p>{result.name}</p>
              <p>{result.rating}</p>
            </div>
          </div>
        )
        })
      ))

    const faveInfo = this.state.currentUser.favorites.map((fave, i) => (
      <div key={i} className="row">
        <div className="six columns theMap">
        </div>
        <div className="six columns mapInfo">
          {/* <p>{_findFavorite(fave)}</p> */}
        </div>
      </div>
    ))

    return(
      <div className="row">
        {this.state.currentUser ? faveInfo : 'No favorites'}
        {/* {this.state.currentUser ? eachFavorite : 'No favorites'} */}
      </div>
    )
  }

}

export default Favorites
