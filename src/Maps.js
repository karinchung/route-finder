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
      coordinates: [0, 0],
      modal: null,
      showModal: false,
      center: [-116.147202, 34.001124]
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
    evt.preventDefault()
    const newRoute = {
      name: this.refs.routeName.value,
      rating: this.refs.rating.value,
      coordinates: this.state.coordinates
    }
    clientAuth.addRoute(newRoute).then(res => {
      console.log(res.data)
      this.setState({
        routes: [
          ...this.state.routes,
          res.data.route
        ],
        showModal: false,
        tempMarkerCoords: null
      })
      this.refs.routeName.value = ""
      this.refs.rating.value = ""
      console.log(res.data)
    })
  }

  _showCoordinates(theMap) {
    if(!this.state.newRoute) {
      theMap.on('click', (e) => {
        var lng = e.lngLat.lng
        var lat = e.lngLat.lat
        this.setState({
          tempMarkerCoords: [lng, lat],
          coordinates: [lng, lat],
          showModal: true
        })
      })
      this.setState({
        newRoute: theMap
      })
    }
  }

  _closeModal() {
    this.setState({
      showModal: false
    })
  }

  _handleDrag(theMap) {
    console.log(theMap)
  }

  render() {
    console.log(this.state.routes)
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
        <div>
          <input type="text" placeholder="location"></input>
          <button className="button-primary" type="submit">Search</button>
        </div>

        {/* <div id="menu">
          <input className="streets" type="radio" value="streets" checked="checked"></input>
          <label for='streets'>street</label>
          <input className="satellite" type="radio" value="satellite"></input>
          <label for='satellite'>satellite</label>
        </div> */}

        <div id='info' style={this.state.showModal ? {display: 'block'} : {display: 'none'}}>
          <button onClick={this._closeModal.bind(this)} className="tempModal">x</button>
          <div style={{clear: 'both'}}>
            <p className="lng">LNG:  {this.state.coordinates[0]}</p>
            <p className="lng">LAT:  {this.state.coordinates[1]}</p> <br/>
          </div>
            <form>
              <input className="routeName" type="text" placeholder="Route Name" ref="routeName" />
              <input className="rating" type="text" placeholder="Rating" ref="rating" /><br/>
              <button onClick={this._addRoute.bind(this)} className="button-primary" type="submit">save</button>
            </form>

        </div>
        <div id='map'>
          <ReactMapboxGl
            style="mapbox://styles/mapbox/outdoors-v10"
            accessToken="pk.eyJ1Ijoia2FyaW5jaHVuZyIsImEiOiJjajNnZHU2Y2cwMDJtMzNwNTY5NzVyb2IxIn0.HcMKrOMyzfeRTqygjGWoOQ"
            containerStyle={{height: "80vh"}}
            zoom='9'
            // change below to user coordinates if allowed... or this
            center={this.state.center}
            onClick={this._showCoordinates.bind(this)}
            onDrag={this._handleDrag.bind(this)}
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
      // end return
    )
    // end render
  }

}

export default Maps
