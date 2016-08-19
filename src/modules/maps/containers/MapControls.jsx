import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';
import { enableSelectForAssignmentMode } from '../actions/mapexplorer';

import MapFiltersArray from '../components/MapFiltersArray';
import MapFiltersRange from '../components/MapFiltersRange';
import SuperDownloadButton from '../../common/components/SuperDownloadButton';
import DialogTutorial from '../../common/components/DialogTutorial.jsx';

const mapconfig = require('../../../constants/mapExplorer.config.json');

class MapControls extends Component {
  constructor(props) {
    super(props);
    this.updateSummary = this.updateSummary.bind(this);
    this.viewFilters = this.viewFilters.bind(this);
    this.selectForAssignment = this.selectForAssignment.bind(this);
    this.downloadClick = this.downloadClick.bind(this);
    
    this.superDownloadButton = null;
    
    this.state = {
      summary: '',
      viewFilters: false,
    };
  }

  render() {  
    return (
      <section ref="mapControls" className="map-controls">
        <div className="summary">
          {this.state.summary}
        </div>
        <div className="actions-panel">
          {(this.props.teacherMode) 
            ? <button className="btn btn-primary" onClick={this.selectForAssignment}>
                <i className="fa fa-book" /> Select for Assignment
              </button>
            : null
          }
          <SuperDownloadButton
            ref={ele => this.superDownloadButton = ele}
            onClick={this.downloadClick}
          />
          <button className="btn btn-primary" onClick={this.viewFilters}>
            <i className="fa fa-bars" /> {(this.state.viewFilters) ? 'Hide Filters' : 'View Filters' }
          </button>
          {(this.props.studentMode)
            ? <DialogTutorial
                name="explorers"
                data={require('../../common/data/tutorial-explorers.js').default} />
            : null
          }
        </div>
        <div className={(this.state.viewFilters) ? 'options-panel expanded' : 'options-panel collapsed' }>
          <MapFiltersArray displayName="Species" keyName="species" />
          <MapFiltersArray displayName="Habitats" keyName="habitats" />
          <MapFiltersArray displayName="Seasons" keyName="seasons" />
          <MapFiltersArray displayName="Times of Day" keyName="timesOfDay" />
          <MapFiltersRange displayName="Date" keyMinName="dateStart" keyMaxName="dateEnd" datatype="date" />
          <MapFiltersRange displayName="Distance to Humans (m)" keyMinName="distanceToHumansMin" keyMaxName="distanceToHumansMax" minVal="0" maxVal="1000" suffix="m" />
          <MapFiltersRange displayName="Distance to Water (m)" keyMinName="distanceToWaterMin" keyMaxName="distanceToWaterMax" minVal="0" maxVal="1000" suffix="m" />
        </div>
      </section>
    );
  }
  
  componentDidMount() { this.updateSummary(); }
  componentWillReceiveProps(nextProps) { this.updateSummary(nextProps); }
  
  updateSummary(props = this.props) {
    let sql = MapHelper.calculateSql(props.mapexplorer, mapconfig.cartodb.sqlQueryCountItemsCountOnly);
    this.setState({ summary: 'Loading...' });
    fetch(mapconfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sql)))
    .then((response) => {
      if (response.status !== 200) {
        throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
      }
      return response.json();
    })
    .then((json) => {
      const count = json && json.rows && json.rows[0] && json.rows[0].count;
      this.setState({ summary: 'Viewing '+count+' results' });
    })
    .catch((err) => {
      this.setState({ summary: 'ERROR: Sorry, but we encountered issues connecting to the map database' });
      console.error(err);
    });
  }
  
  viewFilters() {
    this.setState({
      viewFilters: !this.state.viewFilters
    });
  }
  
  viewFilterGroup(group = '') {
    return () => {
      let newVal = {};
      newVal['viewGroup_' + group] = !this.state['viewGroup_' + group];
      this.setState(newVal);
    };
  }
  
  selectForAssignment() {
    this.props.dispatch(enableSelectForAssignmentMode());
  }
  
  downloadClick() {
    const sql = MapHelper.calculateSql(this.props.mapexplorer, mapconfig.cartodb.sqlQueryDownload);
    this.superDownloadButton.downloadCSV(sql);
  }
}

MapControls.propTypes = {
  dispatch: PropTypes.func.isRequired,
  teacherMode: PropTypes.bool,
  studentMode: PropTypes.bool,
};
MapControls.defaultProps = { 
  teacherMode: false,
  studentMode: false,
  mapexplorer: initialState
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer
  };
}
export default connect(mapStateToProps)(MapControls);  //Connects the Component to the Redux Store
