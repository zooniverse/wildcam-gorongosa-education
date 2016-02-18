/*
Map Explorer
============

Project
-------
https://github.com/zooniverse/wildcam-gorongosa-education/

Info
----
The Map Explorer will be used by teachers and students to explore Wildcam
Gorongosa's collected data & information about wildlife, etc on a visual map.

The ME is a component of the Wildcam Gorongosa Education project. It exists on a
standalone 'Map' page on the website, and consists of an interactive map and
controls to filter the data shown on the visuals.

(- shaun.a.noordin, 20160216)
********************************************************************************
 */

import React from 'react';
import {Script} from 'react-loadscript';
import {SelectorPanel, SelectorData} from './MapExplorer-Selector.jsx';
const config = require('../constants/config.json');

//WARNING: DON'T import Leaflet. Leaflet 0.7.7 is packaged with cartodb.js 3.15.
//import L from 'leaflet';

export default React.createClass({
  getInitialState() {
    let defaultSelector = new SelectorData();
    defaultSelector.sql =
      config.mapExplorer.cartodb.sqlQueryCountCameras
      .replace(/{CAMERAS}/ig, config.mapExplorer.cartodb.sqlTableCameras)
      .replace(/{SUBJECTS}/ig, config.mapExplorer.cartodb.sqlTableSubjects)
      .replace(/{CLASSIFICATIONS}/ig, config.mapExplorer.cartodb.sqlTableClassifications)
      .replace(/{WHERE}/ig, '');
    defaultSelector.css =
      config.mapExplorer.cartodb.cssStandard
      .replace(/{LAYER}/ig, config.mapExplorer.cartodb.sqlTableCameras)  //Actually, any ID will do
      .replace(/{MARKER-COLOR}/ig, defaultSelector.markerColor)
      .replace(/{MARKER-OPACITY}/ig, defaultSelector.markerOpacity)
      .replace(/{MARKER-SIZE}/ig, defaultSelector.markerSize);
    
    return {
      map: undefined,
      cartodbLayer: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
      selectors: [defaultSelector]
    };
  },

  render() {
    console.log('render()');
    return (
      <div ref="mapExplorer" className="map-explorer">
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
          
          {this.state.selectors.map((selector) => {
            return (
              <SelectorPanel key={selector.id} selectorData={selector} updateMeHandler={this.updateSelector} deleteMeHandler={this.deleteSelector} />
            );
          })}
          
          <div>
            <button onClick={this.addSelector}>Add Selector</button>
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
  
  //----------------------------------------------------------------

  //Initialises the Map Explorer.
  initMapExplorer() {
    //Req check
    if (!(window.L && window.cartodb)) {
      console.log('initMapExplorer(): failed');
      return;
    } else {
      console.log('initMapExplorer()');
    }
    
    if (this.state.map) {
      //This prevents CartoDB from re-creating a map one when navigating from
      //the Map Explorer page to the (same) Map Explorer page.
      return <div className="message">Map Explorer ALREADY LOADED</div>;;
    }
    
    //Prepare the CartoDB Query and Styles
    //--------------------------------
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
      '    marker-fill: #39b; ',
      '  } ',
      '  [veg_type="Floodplain Grassland"] { ',
      '    marker-fill: #4ac; ',
      '  } ',
      '  [veg_type="Limestone Gorge"] { ',
      '    marker-fill: #5bd; ',
      '  } ',
      '  [veg_type="Miombo Woodland"] { ',
      '    marker-fill: #6ce; ',
      '  } ',
      '  [count = null], ',
      '  [count = 0] { ',
      '    marker-fill: #c33; ',
      '  } ',
      cssScaling,
      '}'].join('\n');
    //--------------------------------
    
    //Create the map (Leaflet + CartoDB ver)
    //1. Prepare the base layers
    //2. Create the Leaflet Map
    //3. Create the CartoDB data layer, and at that same step, add the controls
    //   for controlling the base layers AND the data layer.
    //--------------------------------
    //Prepare the base layers.
    let baseLayers = [];
    let baseLayersForControls = {};
    config.mapExplorer.baseLayers.map((layer) => {
      let newLayer = L.tileLayer(layer.url, {
        attribution: layer.attribution
      });
      baseLayers.push(newLayer);
      baseLayersForControls[layer.name] = newLayer;
    });
          
    //Go go gadget Leaflet Map!
    this.state.map = new L.Map('mapVisuals', {  //Leaflet 0.7.7 comes with cartodb.js 3.15
      center: [config.mapExplorer.mapCentre.latitude, config.mapExplorer.mapCentre.longitude],
      zoom: config.mapExplorer.mapCentre.zoom,
      layers: baseLayers[0]  //Set the default base layer
    });
    
    //Create the CartoDB layer
    cartodb.createLayer(this.state.map, config.mapExplorer.cartodb.vizUrl)
      .addTo(this.state.map)
      .on('done', (layer) => {   
        this.state.cartodbLayer = layer;
        this.state.cartodbLayer.setInteraction(true);
        this.state.cartodbLayer.on('featureClick', this.onMapClick);  //Other events: featureOver
        layer.on('error', (err) => {
          console.error('ERROR (initMapExplorer(), cartodb.createLayer().on(\'done\')): ' + err);
        });
      
        //Add the controls for the layers
        L.control.layers(baseLayersForControls, { 'Data': layer }).addTo(this.state.map);                                                 
        
        //updateMapExplorer performs some cleanup
        this.updateMapExplorer();
      })
      .on('error', (err) => {
        console.error('ERROR (initMapExplorer(), cartodb.createLayer()):' + err);
      });
    //--------------------------------
    
    //Cleanup then go
    //--------------------------------
    this.resizeMapExplorer();
    return <div className="message">Map Explorer is READY</div>;
    //Note: use `return null` if we don't want a message to pop up.
    //--------------------------------
  },
  
  updateMapExplorer() {
    //Req check
    if (!(this.state.map && this.state.cartodbLayer)) {
      console.log('updateMapExplorer(): failed');
      return;
    } else {
      console.log('updateMapExplorer()');
    }

    //Remove all sublayers
    for (let i = this.state.cartodbLayer.getSubLayerCount() - 1; i >= 0; i--) {
      this.state.cartodbLayer.getSubLayer(i).remove();
    }
    
    //Add a new sublayer for each selector
    this.state.selectors.map((selector) => {
      console.log('>>>' + selector.id,
                  '  >' + selector.sql,
                  '  >' + selector.css);
      
      //let where = '';
      //let sql = config.mapExplorer.cartodb.sqlQueryCountCameras
      //  .replace(/{CAMERAS}/ig, config.mapExplorer.cartodb.sqlTableCameras)
      //  .replace(/{SUBJECTS}/ig, config.mapExplorer.cartodb.sqlTableSubjects)
      //  .replace(/{CLASSIFICATIONS}/ig, config.mapExplorer.cartodb.sqlTableClassifications)
      //  .replace(/{WHERE}/ig, where);
      //let css = this.refs.mapCss.value;
      
      let sql = selector.sql.trim();
      let css = selector.css.trim();
      
      if (sql !== '' && css !== '') {
        let newSubLayer = this.state.cartodbLayer.createSubLayer({
          sql: sql,
          cartocss: css,
          interactivity: 'id'  //Specify which data fields we want when we handle input events. Camera ID is enough, thanks.
        });
        newSubLayer.setInteraction(true);
      }
    });

    //Add a new sublayer
    //let newSubLayer = this.state.cartodbLayer.createSubLayer({
    //  sql: this.refs.mapSql.value,
    //  cartocss: this.refs.mapCss.value,
    //  interactivity: 'id'  //Specify which data fields we want when we handle input events. Camera ID is enough, thanks.
    //});
    //newSubLayer.setInteraction(true);  //We must set both setIneraction(true) and specify the data fields we want in {interactivity}.

    //Alternative: update a sublayer instead of replacing it.
    //----
    //if (this.state.cartodbLayer.getSubLayerCount() > 0) {
    //  this.state.cartodbLayer.getSubLayer(0).set({
    //    sql: this.refs.mapSql.value,
    //    cartocss: this.refs.mapCss.value
    //  });
    //}
    //----
  },

  resizeMapExplorer() {
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementsByClassName('site-header')[0].offsetHeight;
    let footerHeight = document.getElementsByClassName('site-footer')[0].offsetHeight;
    let availableHeight = windowHeight - headerHeight - footerHeight;
    this.refs.mapVisuals.style.height = availableHeight+'px';
    this.refs.mapControls.style.height = availableHeight+'px';
  },
  
  //----------------------------------------------------------------
  
  onMapClick(e, latlng, pos, data) {
    console.log('--------', e, latlng, pos, data, '========');
    //console.log(this.refs.mapSql.value);
  },
  
  //----------------------------------------------------------------
  
  updateSelector(data) {
    console.log('MapExplorer.updateSelector('+data.id+')');
    
    //Find the Selector and then copy the values from the new input.
    for (var selector of this.state.selectors) {  //for...of, not for...in.
      if (selector.id === data.id) {
        for (var prop in selector)  {  //for...in
          selector[prop] = data[prop];
        }
      }
    }
    this.setState({
      selectors: this.state.selectors
    });    
    this.updateMapExplorer();
  },
  
  deleteSelector(id) {
    console.log('MapExplorer.deleteSelector('+id+')');
    this.state.selectors = this.state.selectors.filter((selector) => {
      return selector.id !== id;
    });    
    this.setState({
      selectors: this.state.selectors
    });
    this.updateMapExplorer();
  },

  addSelector() {
    console.log('MapExplorer.addSelector()');
    var newSelector = new SelectorData();    
    this.state.selectors.push(newSelector);
    this.setState({
      selectors: this.state.selectors
    });
    this.updateMapExplorer();
  }
  
});
