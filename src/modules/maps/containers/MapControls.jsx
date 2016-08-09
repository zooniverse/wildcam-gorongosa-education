import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialState } from '../../../reducers/mapexplorer';
import { addMapFilterValue } from '../actions/mapexplorer';

const config = require('../../../constants/mapExplorer.config.json');

class MapControls extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeFilters = this.changeFilters.bind(this);
  }

  render() {
    let speciesFilters = config.species.map((species) => {
      const checked = (this.props.mapexplorer)
        ? this.props.mapexplorer.species.includes(species.id)
        : false;
      //const checked = false;
      return (
        <label key={'species_'+species.id}>
          <input
            type="checkbox"
            name={'species_'+species.id}
            checked={checked}
            onChange={this.changeFilters}
          />
          {species.displayName}
        </label>
      );
    });
    
    return (
      <section ref="mapControls" className="map-controls">
        {speciesFilters}
      </section>
    );
  }

  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  
  changeFilters(e) {
    console.log('TEST: CHANGE FILTERS');
    console.log(e.target.name, e.target.value, e.target.checked);
    const data = e.target.name.split('_');
    this.props.dispatch(addMapFilterValue(data[0], data[1]));
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
