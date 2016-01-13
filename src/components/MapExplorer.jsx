import React from 'react';
import {Script} from 'react-loadscript';
var Cameras = require('../data/Cameras.jsx');

export default React.createClass({
  
  //The Google API key ending with dld08s ("dildos") is tied to the
  //shaun.a.noordin@zooniverse.org account and is only used for development.
  GOOGLE_MAPS_API_KEY: "AIzaSyAzMva99KALzUQfe_BCkCovZyGK-dld08s",
  googleMap: undefined,
  
  getInitialState: function() {
    return {
      map: undefined
    };
  },
  
  render() {
    window.initMapExplorer = this.initMapExplorer;
    
    console.log(this);
    
    //console.log(Cameras);
    //var cameras = new Cameras().listCameras();
    
    return (
      <div className="map-explorer">
        <div ref="mapVisuals" className="map-visuals"></div>
        <div className="map-controls">
          <Script src={'https://maps.googleapis.com/maps/api/js?key='+this.GOOGLE_MAPS_API_KEY+'&callback=initMapExplorer'}>{
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
      console.log("componentDidMount: window.google found.");
      this.initMapExplorer();
    } else {
      console.log("componentDidMount: window.google not found.");
    }
  },
  
  //Cleanup!
  componentWillUnmount() {
    this.setState({
      map: undefined
    });
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
    console.log("initMapExplorer() started");
    
    var newMap = new google.maps.Map(this.refs.mapVisuals, {
      center: { lat: Cameras.median.lat, lng: Cameras.median.lng },
      zoom: 11
    });
    
    console.log(newMap);
    
    this.setState({
      map: newMap
    });
    
    console.log(this.state);
    
    this.paintAllCameras();
  },
  
  //TEST - shaun.a.noordin@zooniverse.org to do something about this. Like, make
  //it a proper function with user-selected filters.
  paintAllCameras() {
    
    //Sanity check
    console.log("SANITY CHECK STARTS");
    console.log(window.google);
    console.log(window.google.maps);
    console.log(this.state.map);
    
    if (!(window.google && window.google.maps && this.state.map)) {
      console.log("ERROR: MapExplorer.paintAllCameras() doesn't have a map to paint on!");
      return;  
    }
    
    console.log("SANITY CHECK ENDS");
    
    var inputColour = "#f39";
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
        map: this.state.map
      });
      
      marker.camera = camera;
      
      marker.addListener('click', function() {
        alert(this.camera.ID);
        this.state.map.setCenter(this.getPosition());
        this.state.map.setZoom(12);
      }.bind(marker));
    }
    
  }
  
});

//<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzMva99KALzUQfe_BCkCovZyGK-dld08s&callback=initMapExplorer"></script>
