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
      map: null,
      routes: [],
      tempMarkerCoords: null
    }
  }

  componentDidMount() {
    route.getRoutes().then(res => {
      this.setState({
        routes: res.data
      })
    })
  }

  _showCoordinates(theMap) {
    console.log(theMap.lngLat)

    // must click twice PORQUE WHY
    // console.log(theMap.lngLat)
    if(!this.state.map) {
      theMap.on('click', (e) => {
        var lng = e.lngLat.lng
        var lat = e.lngLat.lat
        console.log('lng: ', lng, 'lat: ', lat)

        document.getElementById('info').innerHTML =
        'lng: ' + JSON.stringify(lng) + ' ' +
        'lat: ' + JSON.stringify(lat)

        this.setState({
          tempMarkerCoords: [lng, lat]
        })

        //  var tempMarker =
        //    <Marker
        //      coordinates={[lng, lat]}>
        //      <img className="marker" src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png'}/>
        //    </Marker>
        //
        // this.setState({
        //   routes: [...this.state, tempMarker]
        // })


        // popup with coordinates and a form that takes a name
        // add route?
        // on submit send a post request
      })

      this.setState({
        map: theMap
      })
    }
  }

  render() {
    console.log(this)
    const routes = this.state.routes.map((route, i) => {
      return (
        <Marker
          key={i}
          coordinates={route.coordinates}>
          <img className="marker" src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png'}/>
        </Marker>
      )
    })
    return (
      <div>
        <pre id='info'>
        </pre>
        <div id='map'>
          <ReactMapboxGl
            style="mapbox://styles/mapbox/outdoors-v10"
            accessToken="pk.eyJ1Ijoia2FyaW5jaHVuZyIsImEiOiJjajNnZHU2Y2cwMDJtMzNwNTY5NzVyb2IxIn0.HcMKrOMyzfeRTqygjGWoOQ"
            containerStyle={{height: "70vh"}}
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
