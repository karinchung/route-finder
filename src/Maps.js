import React, {Component} from 'react'
import clientAuth from './clientAuth.js'
import './Map.css'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl"

class Maps extends Component {
  state = {
    routes: []
  };

  render() {
    return (

      <div id='map'>
        <ReactMapboxGl
          style="mapbox://styles/mapbox/outdoors-v10"
          accessToken="pk.eyJ1Ijoia2FyaW5jaHVuZyIsImEiOiJjajNnZHU2Y2cwMDJtMzNwNTY5NzVyb2IxIn0.HcMKrOMyzfeRTqygjGWoOQ"
          containerStyle={{height: "70vh"}}
          zoom='9'
          center={[-116.147202, 34.001124]}>
          <Marker
            coordinates={[-116.147202, 34.001124]}>
            <img className="marker" src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png'}/>
          </Marker>
        </ReactMapboxGl>
      </div>
    )
  }

}

export default Maps
