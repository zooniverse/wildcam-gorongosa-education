import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialState } from '../../../reducers/mapexplorer';
import { addMapFilterValue, removeMapFilterValue } from '../actions/mapexplorer';

const config = require('../../../constants/mapExplorer.config.json');

class MapControls extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeFilters = this.changeFilters.bind(this);
  }

  render() {
    
    
    return (
      <section ref="mapControls" className="map-controls">
        <div>
          {this.renderArrayTypeFilter('species')}
        </div>
        <div>
          {this.renderArrayTypeFilter('habitats')}
        </div>
      </section>
    );
  }
  
  renderArrayTypeFilter(filterName) {
    console.log(config[filterName]);
    return config[filterName].map((item) => {
      const checked = (this.props.mapexplorer)
        ? this.props.mapexplorer[filterName].includes(item.id)
        : false;
      return (
        <label key={filterName+'_'+item.id}>
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

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  
  changeFilters(e) {
    const data = e.target.name.split('_');
    if (e.target.checked) {
      this.props.dispatch(addMapFilterValue(data[0], data[1]));
    } else {
      this.props.dispatch(removeMapFilterValue(data[0], data[1]));
    }
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
