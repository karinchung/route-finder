import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl"
import Maps from './Maps'

class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h1>Route Finder</h1>
        </div>
        <div>
          <input type="text" placeholder="location"></input>
          <button type="submit">Search</button>
        </div>
        <div id='map'>
          <Maps />
        </div>
      </div>
    );
  }
}

export default App;
