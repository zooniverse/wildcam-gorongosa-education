import React from 'react';
import {Script} from 'react-loadscript';

export default React.createClass({
  
  initMapExplorer() {
    window.map = new google.maps.Map(this.refs.mapVisuals, {
      center: {lat: -18.9754, lng: 34.5158},
      zoom: 11
    });
  },

  render() {
    window.initMapExplorer = this.initMapExplorer;
    
    return (
      <div className="map-explorer">
        <div ref="mapVisuals" className="map-visuals"></div>
        <div className="map-controls">
          <Script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAzMva99KALzUQfe_BCkCovZyGK-dld08s&callback=initMapExplorer'>{
            ({done}) => !done ? <div>Google Maps API is loading</div> : <div>Google Maps is ready</div>
          }</Script>
        </div>
      </div>
    );
  },
  
  componentDidMount() {
    if (window.google && window.google.maps) {
      console.log("componentDidMount: window.google found.");
      this.initMapExplorer();
    } else {
      console.log("componentDidMount: window.google not found.");
    }
  }
});

//<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzMva99KALzUQfe_BCkCovZyGK-dld08s&callback=initMapExplorer"></script>
