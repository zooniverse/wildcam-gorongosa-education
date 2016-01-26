import React from 'react';
import {Script} from 'react-loadscript';
var Cameras = require('../data/Cameras.jsx');

export default React.createClass({

  cartodbMap: undefined,

  getInitialState: function() {
    this.cartodbMap = undefined;
    return {
    };
  },

  render() {
    //window.initMapExplorer = this.initMapExplorer;

    return (
      <div className='map-explorer'>
        <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/3.15/themes/css/cartodb.css" />
        <div ref="mapVisuals" id="mapVisuals" className="map-visuals"></div>
        <div ref="mapControls" className="map-controls">
          <Script src={'http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.js'}>{
            ({done}) => !done ? <div>Google Maps API is loading</div> : this.initMapExplorer()
          }</Script>
        </div>
      </div>
    );
  },

  //Once React component has rendered, process the map.
  //See notes on initMapExlorer().
  componentDidMount() {
    if (window.cartodb) {
      console.log('componentDidMount: window.cartodb found.');
      this.initMapExplorer();
    } else {
      console.log('componentDidMount: window.cartodb not found.');
    }
  },

  //Cleanup!
  componentWillUnmount() {
    this.cartodbMap = undefined;
  },

  //Initialises the Map Explorer.
  //NOTE: initMapExlorer() can be called in two ways:
  //1. When the map is loaded for the first time, the <Script> for the  API
  //   needs to be loaded dynamically. When it's successfully loaded,
  //   initMapExplorer is called back.
  //2. If the <Script> has been loaded previously - e.g. the user navigated
  //   away from the page and has now returned - then initMapExplorer() will be
  //   called during componentDidMount(), after the necessary HTML elements have
  //   been rendered.
  initMapExplorer() {
    console.log('MapExplorer.initMapExplorer()');
    
    console.log(this.refs.mapVisuals);
    console.log(document.getElementById('mapVisuals'));
    
    this.refs.mapVisuals.style.height = '1000px';
    cartodb.createVis('mapVisuals', 'https://shaunanoordin-zooniverse.cartodb.com/api/v2/viz/e04c2e20-a8a9-11e5-8d6b-0e674067d321/viz.json');
    
    this.resizeMapExplorer();
    return <div>READY</div>;

    //this.paintAllCameras();
  },
  
  resizeMapExplorer() {
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementsByClassName('site-header')[0].offsetHeight;
    let footerHeight = document.getElementsByClassName('site-footer')[0].offsetHeight;
    let availableHeight = windowHeight - headerHeight - footerHeight;
    this.refs.mapVisuals.style.height = availableHeight+'px';
  },

  //PLACEHOLDER - shaun.a.noordin@zooniverse.org to do something about this.
  //Like, make it a proper function with user-selected filters.
  paintAllCameras() {
    console.log('MapExplorer.paintAllCameras()');

    //Sanity Check
    if (!(window.google && window.google.maps && this.cartodbMap)) {
      console.log('ERROR: MapExplorer.paintAllCameras() doesn\'t have a map to paint on!');
      return;
    }

    var inputColour = '#f39';
    var inputOpacity = 0.5;
    var inputSize = 500;

    for (var i = 0, camera; camera = Cameras.all[i]; i++) {
      var marker = new google.maps.Circle({
        center: {
          lat: parseFloat(camera.latitude),
          lng: parseFloat(camera.longitude)
        },
        radius: inputSize,
        fillColor: inputColour,
        fillOpacity: inputOpacity,
        strokeColor: '#fff',
        strokeWeight: 0,
        map: this.cartodbMap
      });

      marker.camera = camera;

      marker.addListener('click', function() {
        alert(this.camera.ID);
        this.cartodbMap.setCenter(this.getPosition());
        this.cartodbMap.setZoom(12);
      }.bind(marker));
    }

  }

});
