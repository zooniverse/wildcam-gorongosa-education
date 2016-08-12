import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';
import { disableViewCameraMode } from '../actions/mapexplorer';

const mapconfig = require('../../../constants/mapExplorer.config.json');

class DialogCameraViewer extends Component {
  constructor(props) {
    super(props);
    this.closeMe = this.closeMe.bind(this);
    this.renderData = this.renderData.bind(this);
    this.fetchMeta = this.fetchMeta.bind(this);
    this.fetchData = this.fetchData.bind(this);
    
    this.state = {
      meta: '',
      metaLoading: true,
      data: [],
      dataLoading: true,
      dataCount: 0,
    };
  }

  render() {
    if (!this.props.mapexplorer.viewCameraMode) return null;
    
    return (
      <section role="dialog" className="dialog-ver3 view-camera" onClick={this.closeMe}>
        <div className="dialog-box" onClick={this.noAction}>
          <button className="btn close-button fa fa-times" onClick={this.closeMe}></button>
          <div className="title"><span>Viewing Camera</span><span className="highlight">{this.props.mapexplorer.camera}</span></div>
          <div className="meta">{(!this.state.metaLoading) ? this.state.meta : 'Loading metadata...'}</div>
          <div className="data">
            {(!this.state.dataLoading) ? this.renderData() : 'Loading data...'}
          </div>
        </div>
      </section>
    );
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.mapexplorer.camera !== '' &&
        nextProps.mapexplorer.camera !== this.props.mapexplorer.camera) {
      this.fetchMeta(nextProps);
      this.fetchData(nextProps);
    }
  }
  
  closeMe(e) {
    this.props.dispatch(disableViewCameraMode());
  }
  
  //'Eats up' events to prevent them from bubbling to a parent element.
  noAction(e) {
    if (e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      e.returnValue = false;
      e.cancelBubble = true;
    }
    return false;
  }
  
  renderData() {
    if (this.state.data.length === 0) {
      return <span className="sad-message">There are no images for this camera</span>
    }
    
    let data = this.state.data.map((subject, index) => {
      return <a key={'viewCameraItem_'+index} className="item" href={subject.location} target="_blank"><img src={subject.location} /></a>
    });
    
    data.push(
      <div key="viewCameraItem_message" className="message">
        Showing {data.length} randomly selected photos out of {this.state.dataCount}
      </div>
    );

    return data;
  }
  
  fetchMeta(props = this.props) {
    this.setState({ metaLoading: true });
    const sql = mapconfig.cartodb.sqlQueryViewCameraMeta
      .replace(/{CAMERAS}/ig, mapconfig.cartodb.sqlTableCameras)
      .replace(/{WHERE}/ig, 'WHERE id ILIKE \''+props.mapexplorer.camera.replace(/'/, '\'\'').trim()+'\' ');

    fetch(mapconfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sql)))
    .then((response) => {
      if (response.status !== 200) {
        throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
      }
      return response.json();
    })
    .then((json) => {
      let message = 'No information for this camera';
      if (json && json.rows && json.rows[0]) {
        const data = json.rows[0];
        message =
          'Lat: '+data.latitude+', Long: '+data.longitude+', ' +
          data.veg_type+', ' +
          data.dist_humans_m+'m from a '+data.human_type+', ' +
          data.dist_water_m+'m from a '+data.water_type;
      }
      this.setState({
        meta: message,
        metaLoading: false,
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }
  
  fetchData(props = this.props) {
    this.setState({ dataLoading: true, data: [], dataCount: 0 });
    const sql = MapHelper.calculateSql(props.mapexplorer, mapconfig.cartodb.sqlQueryViewCameraData, props.mapexplorer.camera);

    fetch(mapconfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sql)))
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
      this.setState({
        data: randomlySelectedImages,
        dataLoading: false,
        dataCount: json.rows.length,
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }
}

DialogCameraViewer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
DialogCameraViewer.defaultProps = { 
  mapexplorer: initialState,
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer,
  };
}
export default connect(mapStateToProps)(DialogCameraViewer);  //Connects the Component to the Redux Store
