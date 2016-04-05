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
import DialogScreen from '../presentational/DialogScreen.jsx';
import DialogScreen_ViewCamera from '../presentational/DialogScreen-ViewCamera.jsx'
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
    this.closeAllDialogs = this.closeAllDialogs.bind(this);

    let defaultSelector = new SelectorData();

    this.state = {
      map: undefined,
      cartodbLayer: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
      selectors: [defaultSelector],
      viewCamera: {
        status: DialogScreen.DIALOG_IDLE,
        message: null,
        data: null
      }
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
        <DialogScreen_ViewCamera status={this.state.viewCamera.status} data={this.state.viewCamera.data} message={this.state.viewCamera.message} closeMeHandler={this.closeAllDialogs} />
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
        //this.state.cartodbLayer.on('featureClick', this.onMapClick);  //Other events: featureOver
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
    
    //Bonus: Add legends to map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML +=
        '<div><svg height="10" width="10"><circle cx="5" cy="5" r="5" fill="#666" /></svg> : Camera with no images</div>' +
        '<div><svg height="10" width="10"><circle cx="5" cy="5" r="5" fill="#fc3" /></svg> : Camera with images (click to view)</div>';
      return div;
    };
    legend.addTo(this.state.map);
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
        newSubLayer.on('featureClick', (e, latlng, pos, data) => {
          console.log('Map.featureClick on ', selector, 'with data ', data);
          let sqlQuery = selector.calculateSql(config.cartodb.sqlQueryViewCamera, data.id);
          console.log(sqlQuery);
          
          this.setState({
            viewCamera: {
              status: DialogScreen.DIALOG_ACTIVE,
              message: 'Loading images from camera...',
              data: null
          }});
          
          fetch(config.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sqlQuery)))
            .then((response) => {
              if (response.status !== 200) {
                throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
              }
              return response.json();
            })
            .then((json) => {
              let MAX_IMAGES = 6;
              let randomlySelectedImages = [];
              if (json.rows.length <= MAX_IMAGES) {
                randomlySelectedImages = json.rows;
              } else {  //Select X random images.
                let index = Math.floor(Math.random() * json.rows.length);
                while (randomlySelectedImages.length < MAX_IMAGES) {
                  randomlySelectedImages.push(json.rows[index]);
                  index = (index + 1) % json.rows.length;
                }
              }
              
              let message = 'Showing selected photos from camera ' + data.id;
              if (randomlySelectedImages.length === 0) {
                message = 'There are no photos from camera ' + data.id;
                randomlySelectedImages = null;
              }
            
              this.setState({
                viewCamera: {
                  status: DialogScreen.DIALOG_ACTIVE,
                  message: message,
                  data: randomlySelectedImages
              }});
            })
            .catch((err) => {
              console.log(err);
              this.setState({
                viewCamera: {
                  status: DialogScreen.DIALOG_ACTIVE,
                  message: 'ERROR',
                  data: null
              }});
            });;
        });
        selector.mapReference = newSubLayer;
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
  
  closeAllDialogs() {
    this.setState({
      viewCamera: {
        status: DialogScreen.DIALOG_IDLE,
        message: null,
        data: null
    }});
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
