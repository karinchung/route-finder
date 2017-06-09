import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature, Marker, Popup } from "react-mapbox-gl"
import Maps from './Maps'
import clientAuth from './clientAuth'
import User from './User.js'
import Favorites from './Favorites.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Route Finder</h1>
          <User />
        </div>
      </div>
    );
  }
}

export default App;
