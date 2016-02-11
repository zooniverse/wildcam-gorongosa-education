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
    if (this.state.cartodbVis) {
      //This prevents CartoDB from creating a map one when navigating from the
      //Map Explorer page to the (same) Map Explorer page.
      return <div className="message">Map Explorer ALREADY LOADED</div>;;
    }
    this.refs.mapSql.value = [
      'SELECT ',
      '  cameras.*, ',
      '  COUNT(items.*) as count ',
      'FROM ',
      '  wildcam_gorongosa_cameras_201601 AS cameras ',
      '  RIGHT JOIN ',
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
      '    goCla.species LIKE \'%Buffalo%\' ',
      '  ) AS items ',
      '  ON ',
      '  cameras.id = items.camera ',
      'GROUP BY cameras.cartodb_id '].join('\n');
    this.refs.mapCss.value = [
      '#items { ',  //Any label ID works, actually
      '  marker-fill: #fff; ',
      '  marker-fill-opacity: 0.9; ',
      '  marker-line-color: #FFF; ',
      '  marker-line-width: 2; ',
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
      '  [count >= 1000] { ',
      '    marker-width: 50; ',
      '  } ',
      '  [count < 1000] { ',
      '    marker-width: 40; ',
      '  } ',
      '  [count < 100] { ',
      '    marker-width: 30; ',
      '  } ',
      '  [count < 10] { ',
      '    marker-width: 20; ',
      '  } ',
      '  [count = null], ',
      '  [count = 0] { ',
      '    marker-fill: #c33; ',
      '    marker-width: 5; ',
      '  } ',
      '}'].join('\n');
    
    cartodb.createVis('mapVisuals', config.cartoDB.mapVisualisationUrl)
      .done(function (vis, layers) {
        this.state.cartodbVis = vis;
        this.state.cartodbMap = vis.getNativeMap();
        this.state.cartodbLayers = layers;
        if (layers.length >= (config.cartoDB.dataLayerIndex+1)) {
          this.state.cartodbDataLayer = layers[config.cartoDB.dataLayerIndex];
        }      
        this.updateMapExplorer();
      }.bind(this));
    this.resizeMapExplorer();
    
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
