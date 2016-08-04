import { PropTypes } from 'react';

const MapLegendCameras = (props) => (
  <div className="info legend">
    <div><svg height="10" width="10"><circle cx="5" cy="5" r="5" fill="#666" /></svg> : Camera with no images</div>
    <div><svg height="10" width="10"><circle cx="5" cy="5" r="5" fill="#f93" /></svg> : Camera with images (click to view)</div>
  </div>
);

export default MapLegendCameras;
