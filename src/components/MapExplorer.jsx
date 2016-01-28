import React from 'react';
import { Script } from 'react-loadscript';

import Cameras from '../data/Cameras.jsx';


export default React.createClass({

  //The Google API key ending with dld08s ('dildos') is tied to the
  //shaun.a.noordin@zooniverse.org account and is only used for development.
  GOOGLE_MAPS_API_KEY: 'AIzaSyAzMva99KALzUQfe_BCkCovZyGK-dld08s',
  GOOGLE_MAPS_API_VERSION: '3',

  googleMap: undefined,

  getInitialState: function() {
    this.googleMap = undefined;
    return {};
  },

  render() {
    window.initMapExplorer = this.initMapExplorer;

    let googleMapScriptUrl = 'https://maps.googleapis.com/maps/api/js' +
      `?key=${this.GOOGLE_MAPS_API_KEY}` +
      `&v=${this.GOOGLE_MAPS_API_VERSION}` +
      `&callback=initMapExplorer`;

    return (
      <div className='map-explorer'>
        <div ref='mapVisuals' className='map-visuals'></div>
        <div className='map-controls'>
          <Script src={googleMapScriptUrl}>{
            ({done}) => !done ? <div>Google Maps API is loading</div> : <div>Google Maps is ready</div>
          }</Script>
        </div>
      </div>
    );
  },

  //Once React component has rendered, process the map.
  //See notes on initMapExlorer().
  componentDidMount() {
    if (window.google && window.google.maps) {
      console.log('componentDidMount: window.google found.');
      this.initMapExplorer();
    } else {
      console.log('componentDidMount: window.google not found.');
    }
  },

  //Cleanup!
  componentWillUnmount() {
    //Note that the Map Explorer (and hence, the Google Map) is recreated every
    //time the Map page is opened/navigated to. As such, we want to make sure we
    //wipe all references/handles to prevent a memory leak.
    this.googleMap = undefined;
  },

  //Initialises the Map Explorer.
  //NOTE: initMapExlorer() can be called in two ways:
  //1. When the map is loaded for the first time, the <Script> for the Google
  //   Maps API needs to be loaded dynamically. When it's successfully loaded,
  //   initMapExplorer is called back.
  //2. If the <Script> has been loaded previously - e.g. the user navigated
  //   away from the page and has now returned - then initMapExplorer() will be
  //   called during componentDidMount(), after the necessary HTML elements have
  //   been rendered.
  initMapExplorer() {
    console.log('MapExplorer.initMapExplorer()');

    this.googleMap = new google.maps.Map(this.refs.mapVisuals, {
      center: {
        lat: Cameras.median.lat,
        lng: Cameras.median.lng
      },
      zoom: 11
    });

    this.paintAllCameras();
  },

  //PLACEHOLDER - shaun.a.noordin@zooniverse.org to do something about this.
  //Like, make it a proper function with user-selected filters.
  paintAllCameras() {
    console.log('MapExplorer.paintAllCameras()');

    //Sanity Check
    if (!(window.google && window.google.maps && this.googleMap)) {
      console.log('ERROR: MapExplorer.paintAllCameras() doesn\'t have a map to paint on!');
      return;
    }

    let inputColour = '#f39';
    let inputOpacity = 0.5;
    let inputSize = 500;

    Cameras.all.forEach(function(camera) {
      let marker = new google.maps.Circle({
        center: {
          lat: parseFloat(camera.latitude),
          lng: parseFloat(camera.longitude)
        },
        radius: inputSize,
        fillColor: inputColour,
        fillOpacity: inputOpacity,
        strokeColor: '#fff',
        strokeWeight: 0,
        map: this.googleMap,
        camera: camera
      });


      marker.addListener('click', function() {
        alert(this.camera.ID);
        this.map.setCenter(this.getCenter());
        this.map.setZoom(12);
      }.bind(marker));

    }.bind(this));
  }

});
