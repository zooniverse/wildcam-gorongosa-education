import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
const config = require('../../../constants/mapExplorer.config.json');

class MapControls extends Component {
  constructor(props) {
    super(props);
    this.changeFilters = this.changeFilters.bind(this);
  }

  render() {
    let speciesFilters = config.species.map((species) => {
      const checked = false;
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

  componentDidMount() {
  }
  
  componentWillReceiveProps(nextProps) {
  }
  
  changeFilters(e) {
    console.log('TEST: CHANGE FILTERS');
    console.log(e.target.name, e.target.value, e.target.checked);    
  }
}

MapControls.propTypes = {
  dispatch: PropTypes.func.isRequired
};

//Don't subscribe to the Redux Store, but gain access to dispatch() and give
//this component's parent access to this component via getWrappedInstance()
export default connect(null, null, null, { withRef: true })(MapControls);
