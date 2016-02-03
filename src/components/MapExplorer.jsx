import React from 'react';
import {Script} from 'react-loadscript';

export default React.createClass({
  //All CartoDB configuration data
  cartodbConfig: {
    mapVisualisationUrl: 'https://shaunanoordin-zooniverse.cartodb.com/api/v2/viz/e04c2e20-a8a9-11e5-8d6b-0e674067d321/viz.json',
    dataTable: 'wildcam_gorongosa_cameras_201601',
    dataLayerIndex: 1
  },

  cartodbVis: undefined,
  cartodbMap: undefined,
  cartodbLayers: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
  cartodbDataLayer: undefined,

  getInitialState() {
    this.cartodbVis = undefined;
    this.cartodbMap = undefined;
    this.cartodbLayers = undefined;
    this.cartodbDataLayer = undefined;
    return {};
  },

  render() {
    return (
      <div className='map-explorer'>
        <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/3.15/themes/css/cartodb.css" />
        <div ref="mapVisuals" id="mapVisuals" className="map-visuals"></div>
        <div ref="mapControls" className="map-controls">
          <Script src={'http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.js'}>{
            ({done}) => !done ? <div className="message">CartoDB API is loading</div> : this.initMapExplorer()
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
    this.cartodbVis = undefined;
    this.cartodbMap = undefined;
    this.cartodbLayers = undefined;
    this.cartodbDataLayer = undefined;
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
    this.refs.mapVisuals.style.height = '1000px';
    cartodb.createVis('mapVisuals', this.cartodbConfig.mapVisualisationUrl)
      .done(function (vis, layers) {
        this.cartodbVis = vis;
        this.cartodbMap = vis.getNativeMap();
        this.cartodbLayers = layers;
        if (layers.length >= (this.cartodbConfig.dataLayerIndex+1)) {
          this.cartodbDataLayer = layers[this.cartodbConfig.dataLayerIndex];
        }
      }.bind(this));
    this.resizeMapExplorer();
    
    this.refs.mapSql.value = 'SELECT * FROM "' + this.cartodbConfig.dataTable + '" WHERE "veg_type" LIKE \'Mixed Savanna and Woodland\' OR "veg_type" LIKE \'Floodplain Grassland\'';
    this.refs.mapCss.value = [
      '#'+this.cartodbConfig.dataTable+' {',
      '  marker-fill: #fc3;',
      '  marker-fill-opacity: 0.9;',
      '  marker-line-color: #FFF;',
      '  marker-line-width: 2;',
      '  marker-line-opacity: 1;',
      '  marker-placement: point;',
      '  marker-type: ellipse;',
      '  marker-width: 20;',
      '  marker-allow-overlap: true;',
      '}',
      '#'+this.cartodbConfig.dataTable+'[dist_water_m < 300] {',
      '  marker-width: 30;',
      '}',
      '#'+this.cartodbConfig.dataTable+'[dist_water_m < 200] {',
      '  marker-width: 40;',
      '}',
      '#'+this.cartodbConfig.dataTable+'[dist_water_m < 100] {',
      '  marker-width: 50;',
      '}',
      '#'+this.cartodbConfig.dataTable+'[veg_type="Floodplain Grassland"] {',
      '  marker-fill: #3ff;',
      '}'
    ].join('\n');
    
    return <div className="message">CartoDB API READY</div>;
  },
  
  updateMapExplorer(e) {
    //Delete everything.
    //TODO: This is a temporary measure to get a clean start! It's not really
    //necessary to delete and rebuild layers - we can modify existing ones,
    //assuming we can figure out which existing ones we want to twiddle with.
    for (let i = this.cartodbDataLayer.getSubLayerCount() - 1; i >= 0; i--) {
      this.cartodbDataLayer.getSubLayer(i).remove();
    }
    
    this.cartodbDataLayer.createSubLayer({
      sql: this.refs.mapSql.value,
      cartocss: this.refs.mapCss.value
    });
  },
  
  resizeMapExplorer() {
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementsByClassName('site-header')[0].offsetHeight;
    let footerHeight = document.getElementsByClassName('site-footer')[0].offsetHeight;
    let availableHeight = windowHeight - headerHeight - footerHeight;
    this.refs.mapVisuals.style.height = availableHeight+'px';
  }
});
