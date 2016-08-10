import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';
import { addMapFilterValue, removeMapFilterValue } from '../actions/mapexplorer';

const mapconfig = require('../../../constants/mapExplorer.config.json');

class MapControls extends Component {
  constructor(props) {
    super(props);
    this.changeFilters = this.changeFilters.bind(this);
    this.updateSummary = this.updateSummary.bind(this);
    
    this.state = {
      summary: ''
    };
  }

  render() {
    return (
      <section ref="mapControls" className="map-controls">
        <div className="summary">
          {this.state.summary}
        </div>
        <div className="filter-group">
          {this.renderArrayTypeFilter('species')}
        </div>
        <div className="filter-group">
          {this.renderArrayTypeFilter('habitats')}
        </div>
        <div className="filter-group">
          {this.renderArrayTypeFilter('seasons')}
        </div>
        <div className="filter-group">
          {this.renderArrayTypeFilter('timesOfDay')}
        </div>
      </section>
    );
  }
  
  renderArrayTypeFilter(filterName) {
    console.log(mapconfig[filterName]);
    return mapconfig[filterName].map((item) => {
      const checked = (this.props.mapexplorer)
        ? this.props.mapexplorer[filterName].includes(item.id)
        : false;
      return (
        <label key={filterName+'_'+item.id} className={(checked) ? 'selected' : ''}>
          <input
            type="checkbox"
            name={filterName+'_'+item.id}
            checked={checked}
            onChange={this.changeFilters}
          />
          {item.displayName}
        </label>
      );
    });
  }

  componentDidMount() { this.updateSummary(); }
  componentWillReceiveProps(nextProps) { this.updateSummary(nextProps); }
  
  changeFilters(e) {
    const data = e.target.name.split('_');
    if (e.target.checked) {
      this.props.dispatch(addMapFilterValue(data[0], data[1]));
    } else {
      this.props.dispatch(removeMapFilterValue(data[0], data[1]));
    }
  }
  
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
}

MapControls.propTypes = {
  dispatch: PropTypes.func.isRequired
};
MapControls.defaultProps = { 
  mapexplorer: initialState
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer
  };
}
export default connect(mapStateToProps)(MapControls);  //Connects the Component to the Redux Store
