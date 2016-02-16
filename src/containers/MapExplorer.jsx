import React from 'react';
import {Script} from 'react-loadscript';
const config = require('../constants/config.json');

//WARNING: DON'T import Leaflet. Leaflet 0.7.7 is packaged with cartodb.js 3.15.
//import L from 'leaflet';

export default React.createClass({
  getInitialState() {
    return {
      map: undefined,
      cartodbVis: undefined,
      //cartodbMap: undefined,
      cartodbLayer: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
      cartodbDataLayer: undefined
    };
  },

  render() {
    console.log('render()');
    return (
      <div className='map-explorer'>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
        <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/3.15/themes/css/cartodb.css" />
        <div ref="mapVisuals" id="mapVisuals" className="map-visuals"></div>
        <div ref="mapControls" className="map-controls">
          <Script src={'http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.js'}>{
            ({done}) => !done ? <div className="message">Map Explorer is loading...</div> : this.initMapExplorer()
          }</Script>
          <div className="inputRow">
            <label>Map SQL</label>
            <textarea ref="mapSql"></textarea>
          </div>
          <div className="inputRow">
            <label>Map CSS</label>
            <textarea ref="mapCss"></textarea>
          </div>
          <div className="inputRow">
            <button onClick={this.updateMapExplorer}>Update</button>
          </div>
        </div>
      </div>
    );
  },

  componentDidMount() {
    console.log('componentDidMount()');
  },

  componentWillUnmount() {
    console.log('componentWillUnmount()');
  },

  //Initialises the Map Explorer.
  initMapExplorer() {
    console.log('MapExplorer.initMapExplorer()');
    if (this.state.map) {
      //This prevents CartoDB from re-creating a map one when navigating from
      //the Map Explorer page to the (same) Map Explorer page.
      return <div className="message">Map Explorer ALREADY LOADED</div>;;
    }
    
    //Prepare the CartoDB Query and Styles
    //----------------------------------------------------------------
    this.refs.mapSql.value = [
      'SELECT ',
      '  cameras.*, ',
      '  COUNT(items.*) as count ',
      'FROM ',
      '  wildcam_gorongosa_cameras_201601 AS cameras ',
      '  LEFT JOIN ',
      '  (SELECT ',
      '    goSub.camera, ',
      '    goSub.location, ',
      '    goSub.month, ',
      '    goSub.year, ',
      '    goSub.season, ',
      '    goSub.time_period, ',
      '    goCla.species, ',
      '    goCla.species_count, ',
      '    goCla.user_hash, ',
      '    goSub.subject_id, ',
      '    goCla.classification_id ',
      '  FROM ',
      '    wildcam_gorongosa_subjects_201601 AS goSub ',
      '    INNER JOIN ',
      '    wildcam_gorongosa_classifications_201601 AS goCla ',
      '    ON ',
      '    goSub.subject_id = goCla.subject_zooniverse_id ',
      '  WHERE ',
      '    1 = 1 ',  //Replace with goCla.species LIKE \'%Buffalo%\' or something.
      '  ) AS items ',
      '  ON ',
      '  cameras.id = items.camera ',
      'GROUP BY cameras.cartodb_id '].join('\n');
    let cssScaling = '';
    for (let i = 0; i < 50; i++) {
      cssScaling +=
        '  [count > '+(200 * i)+'] { \n' +
        '    marker-width: '+(i * 3 + 12)+'; \n' +
        '  } \n';
    }
    this.refs.mapCss.value = [
      '#items { ',  //Any label ID works, actually
      '  marker-fill: #fff; ',
      '  marker-fill-opacity: 0.6; ',
      '  marker-line-color: #FFF; ',
      '  marker-line-width: 1; ',
      '  marker-line-opacity: 1; ',
      '  marker-placement: point; ',
      '  marker-type: ellipse; ',
      '  marker-width: 10; ',
      '  marker-allow-overlap: true; ',
      '  ',
      '  [veg_type="Mixed Savanna and Woodland"] { ',
      '    marker-fill: #cc3; ',
      '  } ',
      '  [veg_type="Floodplain Grassland"] { ',
      '    marker-fill: #33c; ',
      '  } ',
      '  [veg_type="Limestone Gorge"] { ',
      '    marker-fill: #3cc; ',
      '  } ',
      '  [veg_type="Miombo Woodland"] { ',
      '    marker-fill: #3c3; ',
      '  } ',
      '  [count = null], ',
      '  [count = 0] { ',
      '    marker-fill: #c33; ',
      '  } ',
      cssScaling,
      '}'].join('\n');
    //----------------------------------------------------------------
    
    //Create the map (Leaflet + CartoDB ver)
    //----------------------------------------------------------------
    this.state.map = new L.Map('mapVisuals', {  //Leaflet 0.7.7 comes with cartodb.js 3.15
      center: [config.mapExplorer.mapCentre.latitude, config.mapExplorer.mapCentre.longitude],
      zoom: config.mapExplorer.mapCentre.zoom
    });
    
    //Choose a base layer
    if (false) {
      L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }).addTo(this.state.map);
    } else if (true) {
      L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.state.map);
    }
    
    //Create the CartoDB layer
    console.log('-'.repeat(40), this);
    cartodb.createLayer(this.state.map, config.mapExplorer.cartodbVizUrl)
      .addTo(this.state.map)
      .on('done', function(layer) {   
        this.state.cartodbLayer = layer;
        this.state.cartodbLayer.setInteraction(true);
        this.state.cartodbLayer.on('featureClick', this.onMapClick);  //Other events: featureOver
        layer.on('error', function(err) {
          console.error('ERROR (initMapExplorer(), cartodb.createLayer().on(\'done\')): ' + err);
        });
        this.updateMapExplorer();
      }.bind(this))
      .on('error', function(err) {
        console.error('ERROR (initMapExplorer(), cartodb.createLayer()):' + err);
      });
    //----------------------------------------------------------------
    
    //Create the map (old CartoDB ver)
    //----------------------------------------------------------------
    /*cartodb.createVis('mapVisuals', config.cartoDB.mapVisualisationUrl)
      .done(function (vis, layers) {
        this.state.cartodbVis = vis;
        //this.state.cartodbMap = vis.getNativeMap();
        this.state.cartodbLayers = layers;
        if (layers.length >= (config.cartoDB.dataLayerIndex+1)) {
          this.state.cartodbDataLayer = layers[config.cartoDB.dataLayerIndex];
        }      
        this.updateMapExplorer();
      }.bind(this));
    */
    //----------------------------------------------------------------
    
    //Cleanup then go
    //----------------------------------------------------------------
    this.resizeMapExplorer();
    return <div className="message">Map Explorer is READY</div>;
    //Note: use `return null` if we don't want a message to pop up.
    //----------------------------------------------------------------
  },

  updateMapExplorer() {
    console.log('updateMapExplorer()');
    if (this.state.map && this.state.cartodbLayer) {

      //Remove all sublayers
      for (let i = this.state.cartodbLayer.getSubLayerCount() - 1; i >= 0; i--) {
        this.state.cartodbLayer.getSubLayer(i).remove();
      }
      
      //Add a new sublayer
      let newSubLayer = this.state.cartodbLayer.createSubLayer({
        sql: this.refs.mapSql.value,
        cartocss: this.refs.mapCss.value,
        interactivity: 'id'  //Specify which data fields we want when we handle input events. Camera ID is enough, thanks.
      });
      newSubLayer.setInteraction(true);  //We must set both setIneraction(true) and specify the data fields we want in {interactivity}.
    
      //Alternative: update a sublayer instead of replacing it.
      //if (this.state.cartodbLayer.getSubLayerCount() > 0) {
      //  this.state.cartodbLayer.getSubLayer(0).set({
      //    sql: this.refs.mapSql.value,
      //    cartocss: this.refs.mapCss.value
      //  });
      //}
      
    }
  },
  
  onMapClick(e, latlng, pos, data) {
    console.log('--------', e, latlng, pos, data, '========');
    //console.log(this.refs.mapSql.value);
  },

  resizeMapExplorer() {
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementsByClassName('site-header')[0].offsetHeight;
    let footerHeight = document.getElementsByClassName('site-footer')[0].offsetHeight;
    let availableHeight = windowHeight - headerHeight - footerHeight;
    this.refs.mapVisuals.style.height = availableHeight+'px';
  }
});
