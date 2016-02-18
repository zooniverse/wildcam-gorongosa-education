import React from 'react';

export var SelectorPanel = React.createClass({
  render() {
    
    //Render!
    return (
      <div className="selector-panel" ref="selectorPanel">
        <div className="input-row">
          <label>Marker Colo(u)r:</label>
          <input type="text" ref="markerColor" onChange={this.refreshUI} />
          <label>Marker Size:</label>
          <input type="text" ref="markerSize" onChange={this.refreshUI} />
          <label>Marker Opacity:</label>
          <input type="text" ref="markerOpacity" onChange={this.refreshUI} />
        </div>
        <div className="input-row">
          <label>SQL</label>
          <textarea ref="sql"></textarea>
          <label>CSS</label>
          <textarea ref="css"></textarea>
        </div>
        <div className="input-row">
          <button onClick={this.updateMe}>(Update)</button>
          <button onClick={this.deleteMe}>(Delete)</button>
        </div>
      </div>
    );
  },
  
  componentDidMount() {
    //Set <input> values based on the selector data.
    //WARNING: Do not set values DURING render(), because these will cause the
    //<input> elements to become strictly 'controlled' React elements.
    
    //this.refs.colour.value = this.props.selectorData.colour;
    this.refs.markerColor.value = this.props.selectorData.markerColor;
    this.refs.markerOpacity.value = this.props.selectorData.markerOpacity;
    this.refs.markerSize.value = this.props.selectorData.markerSize;
    
    
    this.refs.sql.value = this.props.selectorData.sql;
    this.refs.css.value = this.props.selectorData.css;
    
    //Once mounted, be sure to inform the parent.
    this.updateMe(null);
  },
  
  //Tells the parent that this Selector has updated its values.
  updateMe(e) {
    //Create a copy of the current Selector Data, which we will then modify and
    //pass to the parent.
    var data = new SelectorData();
    data.id = this.props.selectorData.id;
    data.sql = this.refs.sql.value;
    data.css = this.refs.css.value;
    
    //Commit the changes.
    this.props.updateMeHandler(data);
  },
  
  //Tells the parent that this Selector wants to be deleted.
  deleteMe(e) {
    this.props.deleteMeHandler(this.props.selectorData.id);
  },
  
  //Update the UI based on user actions.
  refreshUI(e) {
    
  }
});

export class SelectorData {
  constructor() {
    this.id = //Random ID.
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)];
    this.colour = '#000000';
    this.markerColor = '#000000';  //For... consistency, this is coLOR instead of coLOUR.
    this.markerSize = '10';
    this.markerOpacity = '0.6';
    this.sql = '';
    this.css = '';
  }
}

/*

SELECT 
  cameras.*, 
  COUNT(items.*) as count 
FROM 
  wildcam_gorongosa_cameras_201601 AS cameras 
  LEFT JOIN 
  (SELECT 
    goSub.camera, 
    goSub.location, 
    goSub.month, 
    goSub.year, 
    goSub.season, 
    goSub.time_period, 
    goCla.species, 
    goCla.species_count, 
    goCla.user_hash, 
    goSub.subject_id, 
    goCla.classification_id 
  FROM 
    wildcam_gorongosa_subjects_201601 AS goSub 
    INNER JOIN 
    wildcam_gorongosa_classifications_201601 AS goCla 
    ON 
    goSub.subject_id = goCla.subject_zooniverse_id 
  WHERE 
    1 = 1 
  ) AS items 
  ON 
  cameras.id = items.camera 
GROUP BY cameras.cartodb_id 

//--------

#items { 
  marker-fill: #fff; 
  marker-fill-opacity: 0.6; 
  marker-line-color: #FFF; 
  marker-line-width: 1; 
  marker-line-opacity: 1; 
  marker-placement: point; 
  marker-type: ellipse; 
  marker-width: 10; 
  marker-allow-overlap: true; 
  
  [veg_type="Mixed Savanna and Woodland"] { 
    marker-fill: #39b; 
  } 
  [veg_type="Floodplain Grassland"] { 
    marker-fill: #4ac; 
  } 
  [veg_type="Limestone Gorge"] { 
    marker-fill: #5bd; 
  } 
  [veg_type="Miombo Woodland"] { 
    marker-fill: #6ce; 
  } 
  [count = null], 
  [count = 0] { 
    marker-fill: #c33; 
  } 
  [count > 0] { 
    marker-width: 12; 
  } 
  [count > 200] { 
    marker-width: 15; 
  } 
  [count > 400] { 
    marker-width: 18; 
  } 
  [count > 600] { 
    marker-width: 21; 
  } 
  [count > 800] { 
    marker-width: 24; 
  } 
  [count > 1000] { 
    marker-width: 27; 
  } 
  [count > 1200] { 
    marker-width: 30; 
  } 
  [count > 1400] { 
    marker-width: 33; 
  } 
  [count > 1600] { 
    marker-width: 36; 
  } 
  [count > 1800] { 
    marker-width: 39; 
  } 
  [count > 2000] { 
    marker-width: 42; 
  } 
  [count > 2200] { 
    marker-width: 45; 
  } 
  [count > 2400] { 
    marker-width: 48; 
  } 
  [count > 2600] { 
    marker-width: 51; 
  } 
  [count > 2800] { 
    marker-width: 54; 
  } 
  [count > 3000] { 
    marker-width: 57; 
  } 
  [count > 3200] { 
    marker-width: 60; 
  } 
  [count > 3400] { 
    marker-width: 63; 
  } 
  [count > 3600] { 
    marker-width: 66; 
  } 
  [count > 3800] { 
    marker-width: 69; 
  } 
  [count > 4000] { 
    marker-width: 72; 
  } 
  [count > 4200] { 
    marker-width: 75; 
  } 
  [count > 4400] { 
    marker-width: 78; 
  } 
  [count > 4600] { 
    marker-width: 81; 
  } 
  [count > 4800] { 
    marker-width: 84; 
  } 
  [count > 5000] { 
    marker-width: 87; 
  } 
  [count > 5200] { 
    marker-width: 90; 
  } 
  [count > 5400] { 
    marker-width: 93; 
  } 
  [count > 5600] { 
    marker-width: 96; 
  } 
  [count > 5800] { 
    marker-width: 99; 
  } 
  [count > 6000] { 
    marker-width: 102; 
  } 
  [count > 6200] { 
    marker-width: 105; 
  } 
  [count > 6400] { 
    marker-width: 108; 
  } 
  [count > 6600] { 
    marker-width: 111; 
  } 
  [count > 6800] { 
    marker-width: 114; 
  } 
  [count > 7000] { 
    marker-width: 117; 
  } 
  [count > 7200] { 
    marker-width: 120; 
  } 
  [count > 7400] { 
    marker-width: 123; 
  } 
  [count > 7600] { 
    marker-width: 126; 
  } 
  [count > 7800] { 
    marker-width: 129; 
  } 
  [count > 8000] { 
    marker-width: 132; 
  } 
  [count > 8200] { 
    marker-width: 135; 
  } 
  [count > 8400] { 
    marker-width: 138; 
  } 
  [count > 8600] { 
    marker-width: 141; 
  } 
  [count > 8800] { 
    marker-width: 144; 
  } 
  [count > 9000] { 
    marker-width: 147; 
  } 
  [count > 9200] { 
    marker-width: 150; 
  } 
  [count > 9400] { 
    marker-width: 153; 
  } 
  [count > 9600] { 
    marker-width: 156; 
  } 
  [count > 9800] { 
    marker-width: 159; 
  } 

}
*/
