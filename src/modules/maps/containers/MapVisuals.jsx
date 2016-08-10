import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Script } from 'react-loadscript';
import ReactDOM from 'react-dom';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';

const mapconfig = require('../../../constants/mapExplorer.config.json');
const gorongosaGeodata = require('../../../map-data/gorongosa-geodata.json');
const vegetationGeodata = require('../../../map-data/vegetation-geodata.json');

import MapLegendCameras from '../components/MapLegendCameras';
import MapLegendVegetation from '../components/MapLegendVegetation';

//WARNING: DON'T import Leaflet. Leaflet 0.7.7 is packaged with cartodb.js 3.15.
//import L from 'leaflet';

class MapVisuals extends Component {
  constructor(props) {
    super(props);
    this.renderMarker = this.renderMarker.bind(this);
    this.examineMarker = this.examineMarker.bind(this);

    //Event binding
    this.recentreMap = this.recentreMap.bind(this);
    
    this.map = undefined;
    this.cartodbLayer = undefined;
  }

  componentWillReceiveProps(nextProps) {
    this.updateDataVisualisation(nextProps);
  }

  render() {
    return (
      <section ref="mapVisuals" className="map-visuals">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
        <link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />
        <Script src={'https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js'}>{
          ({done}) => !done ? <div className="message">Map Explorer is loading...</div> : this.initMapExplorer()
        }</Script>
        <div id="mapVisuals"></div>
      </section>
    );
  }
  
  //----------------------------------------------------------------

  //Initialises the Map Explorer.
  initMapExplorer() {
    //Req check
    if (!(window.L && window.cartodb)) {
      alert('ERROR: Sorry, but we couldn\'t load the map');
      console.error('MapExplorer.initMapExplorer(): failed');
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
    mapconfig.baseLayers.map((layer) => {
      const newLayer = L.tileLayer(layer.url, {
        attribution: layer.attribution
      });
      baseLayers.push(newLayer);
      baseLayersForControls[layer.name] = newLayer;
    });

    //Go go gadget Leaflet Map!
    this.map = new L.Map('mapVisuals', {  //Leaflet 0.7.7 comes with cartodb.js 3.15
      center: [mapconfig.mapCentre.latitude, mapconfig.mapCentre.longitude],
      zoom: mapconfig.mapCentre.zoom,
      layers: baseLayers[0]  //Set the default base layer
    });
    
    //Create the Geomap layers (i.e. the geographical data like park boundaries, vegetation types, etc)
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
    
    //Create the CartoDB Data Layer
    this.cartodbLayer = L.geoJson(null, {
      pointToLayer: this.renderMarker
    }).addTo(this.map);
    this.updateDataVisualisation(this.props);
    //--------------------------------
    
    //Add the extra info layers
    //--------------------------------
    //Bonus: Add legends to map
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = (map) => {
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(<MapLegendCameras />, div);
      return div;
    };
    legend.addTo(this.map);
    
    //Bonus: Add (vegetation) legends to map
    const vegetationLegend = L.control({position: 'bottomright'});
    vegetationLegend.onAdd = (map) => {
      let div = L.DomUtil.create('div', '');
      ReactDOM.render(<MapLegendVegetation />, div);
      return div;
    };
    vegetationLegend.addTo(this.map);

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
    
    //Bonus: Add the Layer Controls
    L.control.layers(baseLayersForControls, {
      'Data': this.cartodbLayer,
      ...geomapLayers
    }, {
      position: 'topleft',
      collapsed: true,
    }).addTo(this.map);
    //--------------------------------

    return null;
  }
  
  //----------------------------------------------------------------
  
  updateDataVisualisation(props = this.props) {
    //Req check
    if (!(this.map && this.cartodbLayer)) {
      alert('ERROR: Sorry, but we couldn\'t load the map');
      console.error('MapVisuals.updateDataVisualisation(): failed');
      return;
    }
    
    let sql = MapHelper.calculateSql(props.mapexplorer, mapconfig.cartodb.sqlQueryCountItems);    
    console.log('*'.repeat(80), '\nSQL REQUEST: ', sql);
    let cartoSql = cartodb.SQL({user: 'shaunanoordin-zooniverse', format: 'geojson'});
    cartoSql.execute(sql)
    .done((geojson) => {
      this.cartodbLayer.clearLayers();
      this.cartodbLayer.addData(geojson);
    });
  }
  
  renderMarker(feature, latlng) {
    const MINRADIUS = 5;
    const MAXRADIUS = 25;
    const fillColor = (feature.properties.count > 0)
      ? '#f93' : '#333';
    let radius = feature.properties.count || 0;
    radius = 5 + radius / 100;
    radius = Math.min(Math.max(radius, MINRADIUS), MAXRADIUS);

    const marker = L.circleMarker(latlng, {
      color: '#fff',
      fillColor: fillColor,
      fillOpacity: 0.8,
      radius: radius,
    });
    marker.on('click', this.examineMarker);
    return marker;
  }
  
  examineMarker(e) {
    const cameraId = e.target.feature.properties.id;
    alert('EXAMINING CAMERA '+cameraId+'!');
    console.log(e);
  }
  
  recentreMap() {
    if (!this.map) return;
    this.map.setZoom(mapconfig.mapCentre.zoom);
    this.map.panTo([mapconfig.mapCentre.latitude, mapconfig.mapCentre.longitude]);
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
