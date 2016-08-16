import { PropTypes } from 'react';
const vegetationGeodata = require('../data/vegetation-geodata.json');

const MapLegendVegetation = (props) => {
  let keys = [];
  for (let key in vegetationGeodata.specificStyles) {
    const color = vegetationGeodata.specificStyles[key].color;
    keys.push(
      <div key={key}>
        <svg height="10" width="10"><circle cx="5" cy="5" r="5" fill={color} fillOpacity="0.5" /></svg> : {key}
      </div>);
  }
  return (
    <div className="info legend">
      {keys}
    </div>
  );
};

export default MapLegendVegetation;
