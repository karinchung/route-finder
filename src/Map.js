import React, {Component} from 'react'
import './App.css'
import './Map.css'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl"

class Map extends Component {
  state = {
    center: [-0.481747846041145, 51.3233379650232],
    zoom: [11],
    skip: 0,
    stations: new Map(),
    popupShowLabel: true
  };

  render() {
    return (
      <div id='map'>
        <ReactMapboxGl
          style="mapbox://styles/mapbox/outdoors-v10"
          accessToken="pk.eyJ1Ijoia2FyaW5jaHVuZyIsImEiOiJjajNnZHU2Y2cwMDJtMzNwNTY5NzVyb2IxIn0.HcMKrOMyzfeRTqygjGWoOQ"
          containerStyle={{height: "50vh"}}
          center={[-116.147202, 34.001124]}>
          <Marker
            coordinates={[-116.147202, 34.001124]}
            anchor="bottom">
            <img className="marker" src={'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png'}/>
          </Marker>
        </ReactMapboxGl>
      </div>
    )
  }

}

export default Map
