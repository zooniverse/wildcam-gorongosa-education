import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Script } from 'react-loadscript';

import DialogScreen from '../components/DialogScreen';
import DialogScreen_ViewCamera from '../components/DialogScreen-ViewCamera';
const config = require('../../../constants/mapExplorer.config.json');
const gorongosaGeomap = require('../../../map-data/gorongosa-geomap.json');


//WARNING: DON'T import Leaflet. Leaflet 0.7.7 is packaged with cartodb.js 3.15.
//import L from 'leaflet';

class MapVisuals extends Component {
  constructor(props) {
    super(props);

    //Event binding
    this.recentreMap = this.recentreMap.bind(this);
    this.closeAllDialogs = this.closeAllDialogs.bind(this);

    this.state = {
      map: undefined,
      cartodbLayer: undefined,  //Array of map layers. layer[0] is the base (cartographic map).
      viewCamera: {
        status: DialogScreen.DIALOG_IDLE,
        message: null,
        data: null
      }
    };
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
        <DialogScreen_ViewCamera status={this.state.viewCamera.status} data={this.state.viewCamera.data} message={this.state.viewCamera.message} closeMeHandler={this.closeAllDialogs} />
      </section>
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
      return null;
    }

    //Create the map (Leaflet + CartoDB ver)
    //--------------------------------
    //Prepare the base layers.
    let baseLayers = [];
    let baseLayersForControls = {};
    config.baseLayers.map((layer) => {
      const newLayer = L.tileLayer(layer.url, {
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
    
    //Create the CartoDB Geomap layer
    const geomapOptions = {
      style: {
        'color': '#c93',
        'opacity': 0.5,
        'clickable': false,
        'weight': 5,
      }};
    const geomapLayer = L.geoJson(gorongosaGeomap, geomapOptions).addTo(this.state.map);
    
    //Create the CartoDB Data layer
    cartodb.createLayer(this.state.map, config.cartodb.vizUrl)
      .addTo(this.state.map)
      .on('done', (layer) => {
        this.state.cartodbLayer = layer;
        this.state.cartodbLayer.setInteraction(true);
        layer.on('error', (err) => {
          console.error('ERROR (initMapExplorer(), cartodb.createLayer().on(\'done\')): ' + err);
        });

        //Add the controls for the layers
        L.control.layers(baseLayersForControls, { 'Data': layer, 'Gorongosa National Park': geomapLayer }).addTo(this.state.map);
      
        console.log('[');
        console.log(layer);

        //updateDataVisualisation performs some cleanup
        this.updateDataVisualisation(this.props);
      })
      .on('error', (err) => {
        console.error('ERROR (initMapExplorer(), cartodb.createLayer()):' + err);
      });

    //Bonus: Add legends to map
    const legend = L.control({position: 'bottomright'});
    legend.onAdd = (map) => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML +=
        '<div><svg height="10" width="10"><circle cx="5" cy="5" r="5" fill="#666" /></svg> : Camera with no images</div>' +
        '<div><svg height="10" width="10"><circle cx="5" cy="5" r="5" fill="#f93" /></svg> : Camera with images (click to view)</div>';
      return div;
    };
    legend.addTo(this.state.map);

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
    recentreButton.addTo(this.state.map);
    //--------------------------------

    //Cleanup then go
    //--------------------------------
    return null;
    //Note: use `return <div className="message">Welcome to the Map Explorer!</div>` if we don't want a message to pop up.
    //--------------------------------
  }

  updateDataVisualisation(props = this.props) {
    //Req check
    if (!(this.state.map && this.state.cartodbLayer)) {
      console.log('MapVisuals.updateDataVisualisation(): failed');
      return;
    }

    //Remove all sublayers
    for (let i = this.state.cartodbLayer.getSubLayerCount() - 1; i >= 0; i--) {
      this.state.cartodbLayer.getSubLayer(i).remove();
    }

    //Add a new sublayer for each selector
    props.selectors.map((selector) => {
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
              const MAX_IMAGES = 6;
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

  recentreMap() {
    if (!this.state.map) return;
    this.state.map.setZoom(config.mapCentre.zoom);
    this.state.map.panTo([config.mapCentre.latitude, config.mapCentre.longitude]);
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
}

MapVisuals.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectors: PropTypes.array
};
MapVisuals.defaultProps = {
  selectors: []
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    selectors: state.map.selectors
  };
}
export default connect(mapStateToProps)(MapVisuals);  //Connects the Component to the Redux Store
