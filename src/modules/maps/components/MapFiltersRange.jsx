import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';
import { addMapFilterValue, removeMapFilterValue } from '../actions/mapexplorer';

const mapconfig = require('../../../constants/mapExplorer.config.json');

class MapFiltersRange extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    
    this.state = {
      expanded: false,
    };
  }

  render() {
    const DEFAULT_MINISUMMARY = 'Viewing all';
    const min = this.props.mapexplorer[this.props.keyMinName];
    const max = this.props.mapexplorer[this.props.keyMaxName];
    
    let miniSummary = DEFAULT_MINISUMMARY;
    if (this.props.datatype === 'date') {
      if (min !== '' && max !== '') { miniSummary = min + this.props.suffix + ' to ' + max + this.props.suffix; }
      else if (min !== '') { miniSummary = min + this.props.suffix + ' onwards'; }
      else if (max !== '') { miniSummary = 'until ' + max + this.props.suffix; }
    } else {
      if (min !== '' && max !== '') { miniSummary = min + this.props.suffix + ' to ' + max + this.props.suffix; }
      else if (min !== '') { miniSummary = min + this.props.suffix + ' or more'; }
      else if (max !== '') { miniSummary = max + this.props.suffix + ' or less'; }
    }
    
    const miniSummaryIsHighlighted = miniSummary !== DEFAULT_MINISUMMARY;
    
    return (
      <div className="filter-group">
        <div className="filter-name">
          <button className="btn btn-default" onClick={this.toggle}>
            <i className="fa fa-bars" /> {this.props.displayName}
          </button>
          <span className={(miniSummaryIsHighlighted) ? 'mini-summary highlighted' : 'mini-summary'}>{miniSummary}</span>
        </div>
        <div className={(this.state.expanded) ? 'filter-values expanded range-type '+this.props.datatype+'-type' : 'filter-values collapsed' }>
          <input
            type={this.props.datatype}
            name={this.props.keyMinName}
            onChange={this.updateFilters}
            value={this.props.mapexplorer[this.props.keyMinName]}
            placeholder="Any"
          />
          <span>to</span>
          <input
            type={this.props.datatype}
            name={this.props.keyMaxName}
            onChange={this.updateFilters}
            value={this.props.mapexplorer[this.props.keyMaxName]}
            placeholder="Any"
          />
        </div>
      </div>          
    );
  }

  updateFilters(e) {
    const key = e.target.name;
    const val = (e.target.value.trim) ? e.target.value.trim() : e.target.value;
    if (val.length > 0) {
      this.props.dispatch(addMapFilterValue(key, val));
    } else {
      this.props.dispatch(removeMapFilterValue(key, val));
    }
  }
    
  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }
}

MapFiltersRange.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  keyMinName: PropTypes.string.isRequired,
  keyMaxName: PropTypes.string.isRequired,
  datatype: PropTypes.string,
  suffix: PropTypes.string,
  minVal: PropTypes.string,
  maxVal: PropTypes.string,
};
MapFiltersRange.defaultProps = { 
  mapexplorer: initialState,
  displayName: '',
  keyMinName: '',
  keyMaxName: '',
  datatype: 'number',
  suffix: '',
  minVal: '',
  maxVal: '',
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer,
  };
}
export default connect(mapStateToProps)(MapFiltersRange);  //Connects the Component to the Redux Store
