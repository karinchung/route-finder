import React, {Component} from 'react'
import clientAuth from './clientAuth.js'
import './Favorites.css'
import Route from './Route.js'

class Favorites extends Component {

  constructor() {
    super()
    this.state = {
      currentUser: clientAuth.getCurrentUser()
    }
  }

  // _grabUserFavorites(fave) {
  //   Route.showRoute(fave).then(res => {
  //     console.log(res.data)
  //   }
  // }

  render() {
    const faveInfo = this.state.currentUser.favorites.map((fave, i) => (
      <div key={i} className="row">
        <div className="six columns theMap">
        </div>
        <div className="six columns mapInfo">
          {/* {this._grabUserFavorites(fave)} */}
        </div>
      </div>
    ))


    return(
      <div className="row">
        {this.state.currentUser ? faveInfo : 'No favorites'}
      </div>
    )
  }

}

export default Favorites
