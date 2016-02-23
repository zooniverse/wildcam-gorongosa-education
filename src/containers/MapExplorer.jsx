import React from 'react';
import {Script} from 'react-loadscript';

const config = require('../constants/config.json');

export default React.createClass({
  getInitialState() {
    return {
      cartodbVis: undefined,
      cartodbMap: undefined,
      cartodbLayers: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
      cartodbDataLayer: undefined
    };
  },

  render() {
    console.log('render()');
    return (
      <div className='map-explorer'>
        <link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />
        <div ref="mapVisuals" id="mapVisuals" className="map-visuals"></div>
        <div ref="mapControls" className="map-controls">
          <Script src={'https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js'}>{
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
    if (this.state.cartodbVis) {
      //This prevents CartoDB from creating a map one when navigating from the
      //Map Explorer page to the (same) Map Explorer page.
      return <div className="message">Map Explorer ALREADY LOADED</div>;;
    }
    cartodb.createVis('mapVisuals', config.cartoDB.mapVisualisationUrl)
      .done(function (vis, layers) {
        this.state.cartodbVis = vis;
        this.state.cartodbMap = vis.getNativeMap();
        this.state.cartodbLayers = layers;
        if (layers.length >= (config.cartoDB.dataLayerIndex+1)) {
          this.state.cartodbDataLayer = layers[config.cartoDB.dataLayerIndex];
        }
      }.bind(this));
    this.resizeMapExplorer();

    this.refs.mapSql.value = 'SELECT * FROM "' + config.cartoDB.dataTable + '" WHERE "veg_type" LIKE \'Mixed Savanna and Woodland\' OR "veg_type" LIKE \'Floodplain Grassland\'';
    this.refs.mapCss.value = [
      '#'+config.cartoDB.dataTable+' {',
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
      '#'+config.cartoDB.dataTable+'[dist_water_m < 300] {',
      '  marker-width: 30;',
      '}',
      '#'+config.cartoDB.dataTable+'[dist_water_m < 200] {',
      '  marker-width: 40;',
      '}',
      '#'+config.cartoDB.dataTable+'[dist_water_m < 100] {',
      '  marker-width: 50;',
      '}',
      '#'+config.cartoDB.dataTable+'[veg_type="Floodplain Grassland"] {',
      '  marker-fill: #3ff;',
      '}'
    ].join('\n');

    return <div className="message">Map Explorer is READY</div>;
    //Note: use `return null` if we don't want a message to pop up.
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

      this.state.cartodbDataLayer.createSubLayer({
        sql: this.refs.mapSql.value,
        cartocss: this.refs.mapCss.value
      });
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
