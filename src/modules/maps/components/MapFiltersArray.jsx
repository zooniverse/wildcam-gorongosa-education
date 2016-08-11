import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';
import { addMapFilterValue, removeMapFilterValue } from '../actions/mapexplorer';

const mapconfig = require('../../../constants/mapExplorer.config.json');

class MapFiltersArray extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.renderArrayTypeFilter = this.renderArrayTypeFilter.bind(this);
    
    this.state = {
      expanded: false,
    };
  }

  render() {
    const DEFAULT_MINISUMMARY = 'Viewing all';
    const count = this.props.mapexplorer[this.props.keyName].length;
    const miniSummary = (count > 0)
      ? count + ' filter(s) active'
      : DEFAULT_MINISUMMARY;
    const miniSummaryIsHighlighted = miniSummary !== DEFAULT_MINISUMMARY;
    
    return (
      <div className="filter-group">
        <div className="filter-name">
          <button className="btn btn-default" onClick={this.toggle}>
            <i className="fa fa-bars" /> {this.props.displayName}
          </button>
          <span className={(miniSummaryIsHighlighted) ? 'mini-summary highlighted' : 'mini-summary'}>{miniSummary}</span>
        </div>
        <div className={(this.state.expanded) ? 'filter-values expanded array-type' : 'filter-values collapsed' }>
          {this.renderArrayTypeFilter(this.props.keyName)}
        </div>
      </div>          
    );
  }
  
  renderArrayTypeFilter(filterName) {
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
            onChange={this.updateFilters}
          />
          {item.displayName}
        </label>
      );
    });
  }

  updateFilters(e) {
    const data = e.target.name.split('_');
    if (e.target.checked) {
      this.props.dispatch(addMapFilterValue(data[0], data[1]));
    } else {
      this.props.dispatch(removeMapFilterValue(data[0], data[1]));
    }
  }
    
  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }
}

MapFiltersArray.propTypes = {
  dispatch: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
};
MapFiltersArray.defaultProps = { 
  mapexplorer: initialState,
  displayName: '',
  keyName: '',
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer,
  };
}
export default connect(mapStateToProps)(MapFiltersArray);  //Connects the Component to the Redux Store
