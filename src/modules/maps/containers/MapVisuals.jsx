import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Script } from 'react-loadscript';
import { initialState } from '../../../reducers/mapexplorer';

const mapconfig = require('../../../constants/mapExplorer.config.json');
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
    
    //Create the CartoDB Data Layer
    this.cartodbLayer = L.geoJson(null, {
      pointToLayer: function (feature, latlng) {
        const MINRADIUS = 5;
        const MAXRADIUS = 25;
        const fillColor = (feature.properties.count > 0)
          ? '#fc3' : '#333';
        let radius = feature.properties.count || 0;
        radius = 5 + radius / 100;
        radius = Math.min(Math.max(radius, MINRADIUS), MAXRADIUS);
        
        const marker = L.circleMarker(latlng, {
          color: '#fff',
          fillColor: fillColor,
          fillOpacity: 0.8,
          radius: radius,
        });
        //TEST
        //----------------
        marker.on('click', (e) => {
          alert('CLICK!');
        });
        //----------------
        return marker;
      }
    }).addTo(this.map);
    this.updateDataVisualisation(this.props);    

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

    //Cleanup then go
    //--------------------------------
    return null;
    //--------------------------------
  }
  
  recentreMap() {
    if (!this.map) return;
    this.map.setZoom(mapconfig.mapCentre.zoom);
    this.map.panTo([mapconfig.mapCentre.latitude, mapconfig.mapCentre.longitude]);
  }
  
  updateDataVisualisation(props = this.props) {
    
    console.log('-'.repeat(80));
    console.log(props.mapexplorer.species);
    
    //Req check
    if (!(this.map && this.cartodbLayer)) {
      console.error('MapVisuals.updateDataVisualisation(): failed');
      return;
    }
    
    let sqlWhere = '';
    if (props.mapexplorer.species) {
      sqlWhere = props.mapexplorer.species.map((id) => {
        let val = mapconfig.species.find(ele => { return ele.id === id });
        val = (val) ? val.dbName : '';
        return ' species = \''+val+'\' ';
      }).join(' OR ');
    }
    if (sqlWhere !== '') { sqlWhere = ' WHERE ' + sqlWhere; }
    
    let sql = mapconfig.cartodb.sqlQueryCountItems
      .replace('{CAMERAS}', mapconfig.cartodb.sqlTableCameras)
      .replace('{SUBJECTS}', mapconfig.cartodb.sqlTableSubjects)
      .replace('{CLASSIFICATIONS}', mapconfig.cartodb.sqlTableClassifications)
      .replace('{AGGREGATIONS}', mapconfig.cartodb.sqlTableAggregations)
      .replace('{WHERE}', sqlWhere);
    
    console.log('SQL REQUEST: ', sql);
    
    let cartoSql = cartodb.SQL({user: 'shaunanoordin-zooniverse', format: 'geojson'});
    cartoSql.execute(sql)
    .done((geojson) => {
      this.cartodbLayer.clearLayers();
      this.cartodbLayer.addData(geojson);
    });
    
    
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
