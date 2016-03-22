/*
Map Explorer
============

Project
-------
https://github.com/zooniverse/wildcam-gorongosa-education/

Info
----
The Map Explorer component lets educators and students explore WildCam
Gorongosa's collected data & information about wildlife, etc on a visual map.

(- shaun.a.noordin, 20160317)
********************************************************************************
 */

import React from 'react';
import {Script} from 'react-loadscript';
import SelectorData from './MapExplorer-SelectorData.jsx';
import SelectorPanel from './MapExplorer-SelectorPanel.jsx';
const config = require('../constants/mapExplorer.config.json');

//WARNING: DON'T import Leaflet. Leaflet 0.7.7 is packaged with cartodb.js 3.15.
//import L from 'leaflet';

export default class MapExplorer extends React.Component {
  constructor(props) {
    super(props);

    //Event binding
    this.addSelector = this.addSelector.bind(this);
    this.deleteSelector = this.deleteSelector.bind(this);
    this.updateSelector = this.updateSelector.bind(this);
    this.resizeMapExplorer = this.resizeMapExplorer.bind(this);
    window.onresize = this.resizeMapExplorer;

    let defaultSelector = new SelectorData();

    this.state = {
      map: undefined,
      cartodbLayer: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
      selectors: [defaultSelector]
    };
  }

  render() {
    return (  //Reminder: the parent .content-section is a <main>, so don't set .map-explorer as <main> as well.
      <div ref="mapExplorer" className="map-explorer">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/leaflet.css" />
        <link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />
        <section ref="mapVisuals" id="mapVisuals" className="map-visuals"></section>
        <section ref="mapControls" className="map-controls">
          <Script src={'https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js'}>{
            ({done}) => !done ? <div className="message">Map Explorer is loading...</div> : this.initMapExplorer()
          }</Script>
          {this.state.selectors.map((selector) => {
            return (
              <SelectorPanel key={selector.id} selectorData={selector} updateMeHandler={this.updateSelector} deleteMeHandler={this.deleteSelector} />
            );
          })}
          <div className="controlPanel hidden">
            <button onClick={this.addSelector}>Add Selector</button>
          </div>
        </section>
      </div>
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

    if (this.state.map) {
      //This prevents CartoDB from re-creating a map one when navigating from
      //the Map Explorer page to the (same) Map Explorer page.
      return <div className="message">Welcome to the Map Explorer</div>;;
    }

    //Create the map (Leaflet + CartoDB ver)
    //--------------------------------
    //Prepare the base layers.
    let baseLayers = [];
    let baseLayersForControls = {};
    config.baseLayers.map((layer) => {
      let newLayer = L.tileLayer(layer.url, {
        attribution: layer.attribution
      });
      baseLayers.push(newLayer);
      baseLayersForControls[layer.name] = newLayer;
    });

    //Go go gadget Leaflet Map!
    this.state.map = new L.Map('mapVisuals', {  //Leaflet 0.7.7 comes with cartodb.js 3.15
      center: [config.mapCentre.latitude, config.mapCentre.longitude],
      zoom: config.mapCentre.zoom,
      layers: baseLayers[0]  //Set the default base layer
    });

    //Create the CartoDB layer
    cartodb.createLayer(this.state.map, config.cartodb.vizUrl)
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

        //updateDataVisualisation performs some cleanup
        this.updateDataVisualisation();
      })
      .on('error', (err) => {
        console.error('ERROR (initMapExplorer(), cartodb.createLayer()):' + err);
      });
    //--------------------------------

    //Cleanup then go
    //--------------------------------
    this.resizeMapExplorer();
    return <div className="message">Welcome to the Map Explorer!</div>;
    //Note: use `return null` if we don't want a message to pop up.
    //--------------------------------
  }

  updateDataVisualisation() {

    //Req check
    if (!(this.state.map && this.state.cartodbLayer)) {
      console.log('MapExplorer.updateDataVisualisation(): failed');
      return;
    }

    //Remove all sublayers
    for (let i = this.state.cartodbLayer.getSubLayerCount() - 1; i >= 0; i--) {
      this.state.cartodbLayer.getSubLayer(i).remove();
    }

    //Add a new sublayer for each selector
    this.state.selectors.map((selector) => {
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

    //Alternative: update a sublayer instead of replacing it.
    //----
    //if (this.state.cartodbLayer.getSubLayerCount() > 0) {
    //  this.state.cartodbLayer.getSubLayer(0).set({
    //    sql: this.refs.mapSql.value,
    //    cartocss: this.refs.mapCss.value
    //  });
    //}
    //----
  }

  resizeMapExplorer() {
    let windowHeight = window.innerHeight;
    let headerHeight = document.getElementsByClassName('site-header')[0].offsetHeight;
    let footerHeight = document.getElementsByClassName('site-footer')[0].offsetHeight;
    let availableHeight = windowHeight - headerHeight - footerHeight;
    this.refs.mapVisuals.style.height = availableHeight+'px';
    this.refs.mapControls.style.height = availableHeight+'px';
  }

  //----------------------------------------------------------------

  onMapClick(e, latlng, pos, data) {
    console.log(e, latlng, pos, data);
  }

  //----------------------------------------------------------------

  addSelector() {
    var newSelector = new SelectorData();
    this.state.selectors.push(newSelector);
    this.setState({
      selectors: this.state.selectors
    });
    this.updateDataVisualisation();
  }

  deleteSelector(id) {
    this.state.selectors = this.state.selectors.filter((selector) => {
      return selector.id !== id;
    });
    this.setState({
      selectors: this.state.selectors
    });
    this.updateDataVisualisation();
  }

  updateSelector(data) {
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
    this.updateDataVisualisation();
  }
}
