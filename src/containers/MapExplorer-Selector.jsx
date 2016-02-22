import React from 'react';
const config = require('../constants/config.json');

export var SelectorPanel = React.createClass({
  
  render() {
    
    //Input Choice: Species
    let species = [];
    config.mapExplorer.species.map((s) => {
      species.push(
        <li key={'species_'+s.id}><input type="checkbox" ref={'inputRow_species_item_' + s.id} value={s.sqlWherePart} onchange={this.refreshUI} /><label>{s.plural}</label></li>
      );
    });
    
    //Render!
    return (
      <article className="selector-panel" ref="selectorPanel">
        <section className={(this.props.selectorData.mode !== SelectorData.GUIDED_MODE) ? 'input-subpanel not-selected' : 'input-subpanel' } ref="subPanel_guided">
          <h1>Guided Mode</h1>
          <div className="input-row" ref="inputRow_species">
            <label ref="inputRow_species_label">...all species of animals</label>
            <ul ref="inputRow_species_list">
              {species}
            </ul>
          </div>
          <div className="input-row">
            <label>Marker Colo(u)r:</label>
            <input type="text" ref="markerColor" onChange={this.refreshUI} />
            <label>Marker Size:</label>
            <input type="text" ref="markerSize" onChange={this.refreshUI} />
            <label>Marker Opacity:</label>
            <input type="text" ref="markerOpacity" onChange={this.refreshUI} />
          </div>
        </section>
        <section className={(this.props.selectorData.mode !== SelectorData.ADVANCED_MODE) ? 'input-subpanel not-selected' : 'input-subpanel' } ref="subPanel_advanced" >
          <h1>Advanced Mode</h1>
          <div className="input-row">
            <label>SQL Query</label>
            <textarea ref="sql"></textarea>
          </div>
          <div className="input-row">
            <label>CSS Style</label>
            <textarea ref="css"></textarea>
          </div>
        </section>
        <section className="action-subpanel">
          <button onClick={this.updateMe}>(Update)</button>
          <button onClick={this.deleteMe}>(Delete)</button>
        </section>
      </article>
    );
  },
  
  componentDidMount() {
    //Set <input> values based on the selector data.
    //WARNING: Do not set values DURING render(), because these will cause the
    //<input> elements to become strictly 'controlled' React elements.
    
    console.log(this.refs.subpanelChoice);
    
    this.refs.markerColor.value = this.props.selectorData.markerColor;
    this.refs.markerOpacity.value = this.props.selectorData.markerOpacity;
    this.refs.markerSize.value = this.props.selectorData.markerSize;
    
    this.refs.sql.value = this.props.selectorData.sql;
    this.refs.css.value = this.props.selectorData.css;
    
    this.refreshUI(null);
    
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
    console.log('refreshUI', '-'.repeat(40));
    console.log(this.refs.inputRow_species_list.children);
    for (let li of this.refs.inputRow_species_list.children) {  //Children don't have .map() for some reason!
      console.log(li.getElementsByTagName('input')[0]);  //TODO
    }
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
    this.mode = SelectorData.ADVANCED_MODE;
    this.colour = '#000000';
    this.markerColor = '#000000';  //For... consistency, this is coLOR instead of coLOUR.
    this.markerSize = '10';
    this.markerOpacity = '0.6';
    this.sql = '';
    this.css = '';
  }
}
SelectorData.GUIDED_MODE = 1;
SelectorData.ADVANCED_MODE = 2;
