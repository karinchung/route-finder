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
      center: [-116.147202, 34.001124],
      style: 'roads',
      popup: null
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
          showModal: true,
          popup: false
        })
      })
      this.setState({
        newRoute: theMap
      })
    }
  }

  _closeModal() {
    this.setState({
      showModal: false,
      tempMarkerCoords: null
    })
  }

  _handleOptionChangeRoad() {
    this.setState({
      style: 'roads'
    })
  }

  _handleOptionChangeSatellite() {
    this.setState({
      style: 'satellite'
    })
  }

  _markerClick(evt) {
    route.showRoute(evt.target.id).then(res => {
      this.setState({
        popup: res.data,
        showModal: false,
        tempMarkerCoords: null
      })
    })
  }

  _handlePopupClick(evt) {
    console.log(evt)
    this.setState({
      popup: null
    })
  }

  _handleSearch(evt) {
    evt.preventDefault()
    const searchValue = {
      center: this.refs.center.value
    }
    route.getGeocode(searchValue).then(res => {
      this.setState({
        center: [res.data.lng, res.data.lat]
      })
    })
  }

  render() {
    const routes = this.state.routes.map((route, i) => {
      return (
        <Marker
          key={i}
          coordinates={route.coordinates}
          onClick={this._markerClick.bind(this)}>
          <img id={route._id} className="marker" src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png'}/>
        </Marker>
      )
    })

    return (
      <div>
        <div className="search">
          <form onSubmit={this._handleSearch.bind(this)}>
            <input type="text" placeholder="location" ref="center"></input>
            <button className="button-primary" type="submit">Search</button>
          </form>
        </div>

        <div className="styleRadio">
          <form>
          <label>
            <input type="radio"
              value="Roads"
              checked={this.state.style === 'roads'}
              onChange={this._handleOptionChangeRoad.bind(this)}/>
            Roads
          </label>
          <label>
            <input type="radio"
              value="Satellite"
              checked={this.state.style === 'satellite'}
              onChange={this._handleOptionChangeSatellite.bind(this)}/>
            Satellite
          </label>
          </form>
        </div>

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
            style={this.state.style === 'roads' ? "mapbox://styles/mapbox/outdoors-v10" : "mapbox://styles/mapbox/satellite-v9"}
            accessToken="pk.eyJ1Ijoia2FyaW5jaHVuZyIsImEiOiJjajNnZHU2Y2cwMDJtMzNwNTY5NzVyb2IxIn0.HcMKrOMyzfeRTqygjGWoOQ"
            containerStyle={{height: "80vh"}}
            zoom='9'
            // change below to user coordinates if allowed... or this
            center={this.state.center}
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
            {this.state.popup && (
              <Popup
                coordinates={this.state.popup.coordinates}
                onClick={this._handlePopupClick.bind(this)}
                >
                <p className="routeName">{this.state.popup.name}</p>
                <p className="rating">Rating: {this.state.popup.rating}</p>
                <i class="fa fa-star" aria-hidden="true"></i>
              </Popup>
            )}
          </ReactMapboxGl>
        </div>
      </div>
      // end return
    )
    // end render
  }
// end component
}

export default Maps
