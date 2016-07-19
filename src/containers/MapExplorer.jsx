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

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMapSelector } from '../actions/map';
import { Script } from 'react-loadscript';
import MapVisuals from './MapVisuals.jsx';
import MapControls from './MapControls.jsx';
import DialogScreen from '../presentational/DialogScreen.jsx';
import DialogScreen_ViewCamera from '../presentational/DialogScreen-ViewCamera.jsx'
const config = require('../constants/mapExplorer.config.json');

class MapExplorer extends Component {
  constructor(props) {
    super(props);

    //Event binding
    this.addSelector = this.addSelector.bind(this);
    this.updateAllSelectors = this.updateAllSelectors.bind(this);
    this.toggleSelectors = this.toggleSelectors.bind(this);
    this.expandSelectors = this.expandSelectors.bind(this);
    this.collapseSelectors = this.collapseSelectors.bind(this);
    this.resizeMapExplorer = this.resizeMapExplorer.bind(this);
    window.onresize = this.resizeMapExplorer;
  }
  
  componentDidMount() {
    this.resizeMapExplorer();
  }

  render() {
    return (  //Reminder: the parent .content-section is a <main>, so don't set .map-explorer as <main> as well.
      <div ref="mapExplorer" className="map-explorer">
        <MapVisuals ref="mapVisuals"></MapVisuals>
        <section ref="mapControls" className="map-controls">
          <button className="btn toggle-selectors" onClick={this.toggleSelectors}>
            <span>View Map Options</span>
          </button>
          <div>
            <div className="selectors-list">
            {this.props.selectors.map((selector) => {
              selector.tmp = selector.id + selector.id;
              return (
                <MapControls ref={`mapControls_${selector.id}`} key={selector.id} selectorData={selector} />
              );
            })}
            </div>
            <div className="controlPanel">
              <button className="hidden" onClick={this.addSelector}>Add Selector</button>
              <button className="btn" onClick={this.updateAllSelectors}>Apply Changes to Map View</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  //----------------------------------------------------------------

  resizeMapExplorer() {
    const windowHeight = window.innerHeight;
    const headerHeight = document.getElementsByClassName('site-header')[0].offsetHeight;
    const footerHeight = document.getElementsByClassName('site-footer')[0].offsetHeight;
    const availableHeight = windowHeight - headerHeight - footerHeight;
    this.refs.mapExplorer.style.height = availableHeight+'px';  
  }
  
  //----------------------------------------------------------------
  
  addSelector() {    
    this.props.dispatch(addMapSelector());
  }
  
  updateAllSelectors() {    
    this.props.selectors.map((selector) => {
      const selectorPanel = this.refs[`mapControls_${selector.id}`].getWrappedInstance();
      selectorPanel && selectorPanel.updateMe();
    });
    this.toggleSelectors();
  }
  
  toggleSelectors() {
    const regexExpand = /\b\s*expand\s*\b/g;
    const regexCollapse = /\b\s*collapse\s*\b/g;
    
    if (regexExpand.test(this.refs.mapExplorer.className)) {
      this.collapseSelectors();
    } else {
      this.expandSelectors();
    }
  }
  
  expandSelectors() {
    const regexCollapse = /\b\s*collapse\s*\b/g;
    this.refs.mapExplorer.className = this.refs.mapExplorer.className.replace(regexCollapse, ' ') + ' expand';
  }
  
  collapseSelectors() {
    const regexExpand = /\b\s*expand\s*\b/g;
    this.refs.mapExplorer.className = this.refs.mapExplorer.className.replace(regexExpand, ' ') + ' collapse';
  }
}

MapExplorer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectors: PropTypes.array
};
MapExplorer.defaultProps = {
  selectors: []
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    selectors: state.map.selectors
  };
}
export default connect(mapStateToProps)(MapExplorer);  //Connects the Component to the Redux Store
