import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Script } from 'react-loadscript';
import { initialState } from '../../../reducers/mapexplorer';

const config = require('../../../constants/mapExplorer.config.json');
const gorongosaGeodata = require('../../../map-data/gorongosa-geodata.json');
const vegetationGeodata = require('../../../map-data/vegetation-geodata.json');

//WARNING: DON'T import Leaflet. Leaflet 0.7.7 is packaged with cartodb.js 3.15.
//import L from 'leaflet';

class MapVisuals extends Component {
  constructor(props) {
    super(props);

    //Event binding
    this.recentreMap = this.recentreMap.bind(this);
    
    this.map = undefined;
    this.cartodbLayer = undefined;
  }

  componentWillReceiveProps(nextProps) {
    this.updateDataVisualisation(nextProps);
  }

  render() {
    const test = this.props.mapexplorer.species.join(', ');
    
    return (
      <section ref="mapVisuals" className="map-visuals">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
        <link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />
        <Script src={'https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js'}>{
          ({done}) => !done ? <div className="message">Map Explorer is loading...</div> : this.initMapExplorer()
        }</Script>
        <div id="mapVisuals"></div>
        <div id="mapVisualsDEBUG">{test}</div>
      </section>
    );
  }

  //----------------------------------------------------------------

  //Initialises the Map Explorer.
  initMapExplorer() {
    //Req check
    if (!(window.L && window.cartodb)) {
      console.log('MapExplorer.initMapExplorer(): failed');
      return;
    }
    
    if (this.map) {
      //This prevents CartoDB from re-creating a map one when navigating from
      //the Map Explorer page to the (same) Map Explorer page.
      return null;
    }

    //Create the map (Leaflet + CartoDB ver)
    //--------------------------------
    //Prepare the base layers.
    let baseLayers = [];
    let baseLayersForControls = {};
    config.baseLayers.map((layer) => {
      const newLayer = L.tileLayer(layer.url, {
        attribution: layer.attribution
      });
      baseLayers.push(newLayer);
      baseLayersForControls[layer.name] = newLayer;
    });

    //Go go gadget Leaflet Map!
    this.map = new L.Map('mapVisuals', {  //Leaflet 0.7.7 comes with cartodb.js 3.15
      center: [config.mapCentre.latitude, config.mapCentre.longitude],
      zoom: config.mapCentre.zoom,
      layers: baseLayers[0]  //Set the default base layer
    });
    
    //Create the CartoDB Geomap layer
    const geomapLayers = {
      'Gorongosa National Park': L.geoJson(gorongosaGeodata.geojson, gorongosaGeodata.options).addTo(this.map),
      'Vegetation': L.geoJson(vegetationGeodata.geojson, {
        style: function (feature) {
          const specificStyles = vegetationGeodata.specificStyles;
          let baseStyle = vegetationGeodata.options.style;
          const featureName = feature.properties.NAME;
          return (specificStyles[featureName])
            ? Object.assign(baseStyle, specificStyles[featureName])
            : baseStyle;
        }
      }).addTo(this.map),
    };
    
    //Create the CartoDB Data layer
    cartodb.createLayer(this.map, config.cartodb.vizUrl)
    .done((layer) => {
      layer.addTo(this.map);
      this.cartodbLayer = layer;
      this.cartodbLayer.setInteraction(true);
      layer.on('error', (err) => {
        console.error('ERROR (initMapExplorer(), cartodb.createLayer().on(\'done\')): ' + err);
      });

      //Add the controls for the layers
      L.control.layers(baseLayersForControls, {
        'Data': layer,
        ...geomapLayers
      }, {
        position: 'topleft',
        collapsed: true,
      }).addTo(this.map);

      //updateDataVisualisation performs some cleanup
      this.updateDataVisualisation(this.props);
    })
    .error((err) => {
      console.error('ERROR (initMapExplorer(), cartodb.createLayer()):' + err);
    });

    //Bonus: 'Recentre Map' button
    const recentreButton = L.control({position: 'topleft'});
    recentreButton.onAdd = (map) => {
      const container = L.DomUtil.create('div', 'info');
      const button = document.createElement('button');
      button.onclick = this.recentreMap;
      button.className = 'btn fa fa-crosshairs';
      container.appendChild(button);
      return container;
    }
    recentreButton.addTo(this.map);
    //--------------------------------

    //Cleanup then go
    //--------------------------------
    return null;
    //--------------------------------
  }
  
  recentreMap() {
    if (!this.map) return;
    this.map.setZoom(config.mapCentre.zoom);
    this.map.panTo([config.mapCentre.latitude, config.mapCentre.longitude]);
  }
  
  updateDataVisualisation(props = this.props) {
    //Req check
    if (!(this.map && this.cartodbLayer)) {
      console.log('MapVisuals.updateDataVisualisation(): failed');
      return;
    }
  }
}

MapVisuals.propTypes = {
  dispatch: PropTypes.func.isRequired
};
MapVisuals.defaultProps = { 
  mapexplorer: initialState
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer
  };
}
export default connect(mapStateToProps)(MapVisuals);  //Connects the Component to the Redux Store
