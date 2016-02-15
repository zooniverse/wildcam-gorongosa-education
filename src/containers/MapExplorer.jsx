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
      cartodbLayers: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
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
  //NOTE: initMapExlorer() can be called in two ways:
  //1. When the map is loaded for the first time, the <Script> for the  API
  //   needs to be loaded dynamically. When it's successfully loaded,
  //   initMapExplorer is called.
  //2. If the <Script> has been loaded previously - e.g. the user navigated
  //   away from the page and has now returned - then initMapExplorer() will be
  //   called during componentDidMount(), after the necessary HTML elements have
  //   been rendered.
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
      '  marker-width: 5; ',
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
    
    //Create the map (Leaflet + CartpDB ver)
    //----------------------------------------------------------------
    this.state.map;
    
    var map = new L.Map('mapVisuals', {  //Leaflet 0.7.7 comes with cartodb.js 3.15
      center: [config.cartoDB.mapCentre.latitude, config.cartoDB.mapCentre.longitude],
      zoom: config.cartoDB.mapCentre.zoom
    });
    
    this.state.map = map;
    
    //L.tileLayer('https://{s}.maps.nlp.nokia.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?lg=eng&token=A7tBPacePg9Mj_zghvKt9Q&app_id=KuYppsdXZznpffJsKT24', {
    //  //'https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png'
    //  attribution: '&copy;2016 HERE <a href="http://here.net/services/terms" target="_blank">Terms of use</a>'
    //}).addTo(this.state.map);
    
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
    
    cartodb.createLayer(map, 'https://shaunanoordin-zooniverse.cartodb.com/api/v2/viz/e04c2e20-a8a9-11e5-8d6b-0e674067d321/viz.json')
      .addTo(map)
      .on('done', function(layer) {
        layer.setInteraction(true);
        //layer.on('featureOver', function(e, latlng, pos, data) {
        //  cartodb.log.log(e, latlng, pos, data);
        //});
        layer.on('featureClick', function(e, latlng, pos, data) {
          console.log('--------', e, latlng, pos, data, '========');
        });
        layer.on('error', function(err) {
          cartodb.log.log('error: ' + err);
        });
      }).on('error', function() {
        cartodb.log.log('some error occurred');
      });
    
    
    //Add an extra layer on top
    /*cartodb.createLayer(this.state.map, 'http://documentation.cartodb.com/api/v2/viz/2b13c956-e7c1-11e2-806b-5404a6a683d5/viz.json')
      .addTo(this.state.map)
      .on('done', function(layer) {
        console.log('DONE');
        layer.setInteraction(true);
      }).on('error', function() {
        cartodb.log.log('some error occurred');
      });*/
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
    //this.resizeMapExplorer();
    return <div className="message">Map Explorer is READY</div>;
    //Note: use `return null` if we don't want a message to pop up.
    //----------------------------------------------------------------
  },

  updateMapExplorer() {
    console.log('updateMapExplorer()');
    if (this.state.cartodbVis) {
      //Delete everything.
      //TODO: This is a temporary measure to get a clean start! It's not really
      //necessary to delete and rebuild layers - we can modify existing ones,
      //assuming we can figure out which existing ones we want to twiddle with.
      for (let i = this.state.cartodbDataLayer.getSubLayerCount() - 1; i >= 0; i--) {
        this.state.cartodbDataLayer.getSubLayer(i).remove();
      }

      let newSubLayer = this.state.cartodbDataLayer.createSubLayer({
        sql: this.refs.mapSql.value,
        cartocss: this.refs.mapCss.value
      });
      
      //TODO: TEST why are there no interactions?
      //----------------
      newSubLayer.setInteractivity({'interactivity': 'cartodb_id, camera, latitude, longitude' });
      newSubLayer.setInteraction(true);
      newSubLayer.on('featureClick', function(e, latlng, pos, data, subLayerIndex) {
        console.log('click over polygon with data: ' + data);
      });
      newSubLayer.on('click', function(e) {
        console.log('CLICK ' + e);
      });
      console.log(this.state);
      console.log(newSubLayer);
      console.log('-'.repeat(40));
      //----------------

    }
  },

  resizeMapExplorer() {
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementsByClassName('site-header')[0].offsetHeight;
    let footerHeight = document.getElementsByClassName('site-footer')[0].offsetHeight;
    let availableHeight = windowHeight - headerHeight - footerHeight;
    this.refs.mapVisuals.style.height = availableHeight+'px';
  }
});
