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
      newRoute: null,
      routes: [],
      tempMarkerCoords: null,
      modal: null
    }
  }

  componentDidMount() {
    route.getRoutes().then(res => {
      this.setState({
        routes: res.data
      })
    })
  }

  _addRoute(evt) {
    console.log(evt)
  }

  _showCoordinates(theMap) {
    if(!this.state.newRoute) {
      theMap.on('click', (e) => {
        var lng = e.lngLat.lng
        var lat = e.lngLat.lat
        var tempModal = document.getElementById('info')
        tempModal.innerHTML =
        '<span className="tempModal" style="display: block; text-align: right;">X</span>' +
        '<input type="text" placeholder="Route Name" ref="routeName" />' +
        '<input type="number" placeholder="Rating" ref="rating" />' + '<br>' +
        'lng: ' + JSON.stringify(lng) + ' ' +
        'lat: ' + JSON.stringify(lat) + '<br>' +
        '<button className="button-primary" type="submit" onClick={this._addRoute.bind(this)}>save</button>'
        this.setState({
          tempMarkerCoords: [lng, lat],
        })
      })
      this.setState({
        newRoute: theMap
      })
    }
  }

  render() {
    const routes = this.state.routes.map((route, i) => {
      return (
        <Marker
          key={i}
          coordinates={route.coordinates}>
          <img className="marker" src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png'}/>
        </Marker>
      )
    })
    const divStyle = {
      display: 'none'
    }
    const divStyleApplied = {
      display: 'block'
    }
    return (
      <div>
        <div>
          <input type="text" placeholder="location"></input>
          <button type="submit">Search</button>
        </div>

        {/* <div id="menu">
          <input className="streets" type="radio" value="streets" checked="checked"></input>
          <label for='streets'>street</label>
          <input className="satellite" type="radio" value="satellite"></input>
          <label for='satellite'>satellite</label>
        </div> */}

        <div id='info' style={this.state.newRoute ? divStyleApplied : divStyle}></div>
        <div id='map'>
          <ReactMapboxGl
            style="mapbox://styles/mapbox/outdoors-v10"
            accessToken="pk.eyJ1Ijoia2FyaW5jaHVuZyIsImEiOiJjajNnZHU2Y2cwMDJtMzNwNTY5NzVyb2IxIn0.HcMKrOMyzfeRTqygjGWoOQ"
            containerStyle={{height: "80vh"}}
            zoom='9'
            // change below to user coordinates if allowed... or this
            center={[-116.147202, 34.001124]}
            onClick={this._showCoordinates.bind(this)}
            >
            {/* All routes */}
            {routes}

            {this.state.tempMarkerCoords && (
              <Marker
                coordinates={this.state.tempMarkerCoords}>
                <img className="marker" src={'https://www.iconfinder.com/data/icons/gray-toolbar-4/512/map_marker-256.png'}/>
              </Marker>
            )}
          </ReactMapboxGl>
        </div>
      </div>

    )
  }

}

export default Maps
