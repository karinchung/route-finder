import React, {Component} from 'react'
import clientAuth from './clientAuth.js'
import './Map.css'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Marker, Popup, Cluster } from "react-mapbox-gl"
import route from './Route.js'

class Maps extends Component {
  constructor() {
    super()
    this.state = {
      routes: []
    }
  }

  componentDidMount() {
    route.getRoutes().then(res => {
      this.setState({
        routes: res.data
      })
      console.log(this.state)
    })
  }

  render() {
    const routes = this.state.routes.map((route) => {
      return (
        <Marker
          coordinates={route.coordinates}>
          <img className="marker" src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png'}/>
        </Marker>
      )
    })
    return (
      <div id='map'>
        <ReactMapboxGl
          style="mapbox://styles/mapbox/outdoors-v10"
          accessToken="pk.eyJ1Ijoia2FyaW5jaHVuZyIsImEiOiJjajNnZHU2Y2cwMDJtMzNwNTY5NzVyb2IxIn0.HcMKrOMyzfeRTqygjGWoOQ"
          containerStyle={{height: "70vh"}}
          zoom='9'
          // change below to user coordinates if allowed... or this
          center={[-116.147202, 34.001124]}>
          {/* All routes */}
          {routes}
        </ReactMapboxGl>
      </div>
    )
  }

}

export default Maps