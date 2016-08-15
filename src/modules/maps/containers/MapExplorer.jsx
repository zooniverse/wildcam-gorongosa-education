/*
Map Explorer
============

Info
----
The Map Explorer component lets educators and students explore WildCam
Gorongosa's collected data & information about wildlife, etc on a visual map.

(- shaun.a.noordin, 20160808)
********************************************************************************
 */

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MapControls from './MapControls';
import MapVisuals from './MapVisuals';
import DialogCameraViewer from '../components/DialogCameraViewer';
import DialogSelectForAssignment from '../components/DialogSelectForAssignment';

class MapExplorerVer3 extends Component {
  constructor(props) {
    super(props);

    //Event binding
    this.resizeMapExplorer = this.resizeMapExplorer.bind(this);
    window.onresize = this.resizeMapExplorer;
  }

  componentDidMount() {
    this.resizeMapExplorer();
  }

  render() {
    const teacherMode = this.props.location.pathname.includes('teachers');
    const studentMode = this.props.location.pathname.includes('students');
    return (  //Reminder: the parent .content-section is a <main>, so don't set .map-explorer as <main> as well.
      <div ref="mapExplorer" className="map-explorer-ver3">
        <MapVisuals />
        <MapControls teacherMode={teacherMode} studentMode={studentMode} />
        <DialogCameraViewer />
        <DialogSelectForAssignment />
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
}

MapExplorerVer3.propTypes = {
  dispatch: PropTypes.func.isRequired
};
MapExplorerVer3.defaultProps = {};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {};
}
export default connect(mapStateToProps)(MapExplorerVer3);  //Connects the Component to the Redux Store
