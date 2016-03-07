import React from 'react';
const config = require('../constants/mapExplorer.config.json');
import SelectorData from './MapExplorer-SelectorData.jsx';

export default class SelectorPanel extends React.Component {
  constructor(props) {
    super(props);

    //Event binding
    this.refreshUI = this.refreshUI.bind(this);
    this.updateMe = this.updateMe.bind(this);
    this.deleteMe = this.deleteMe.bind(this);
    this.changeToGuided = this.changeToGuided.bind(this);
    this.changeToAdvanced = this.changeToAdvanced.bind(this); 
  }

  render() {
    let thisId = this.props.selectorData.id;
    
    //Input Choice: Species
    let species = [];
    config.species.map((item) => {
      species.push(
        <li key={'species_'+item.id}><input type="checkbox" id={'inputRow_species_item_' + item.id + '_' + thisId} ref={'inputRow_species_item_' + item.id} value={item.id} onchange={this.refreshUI} /><label htmlFor={'inputRow_species_item_' + item.id + '_' + thisId}>{item.displayName}</label></li>
      );
    });
    
    //Input Choice: Habitats
    let habitats = [];
    config.habitats.map((item) => {
      habitats.push(
        <li key={'habitat_'+item.id}><input type="checkbox" id={'inputRow_habitats_item_' + item.id + '_' + thisId} ref={'inputRow_habitats_item_' + item.id} value={item.id} onchange={this.refreshUI} /><label htmlFor={'inputRow_habitats_item_' + item.id + '_' + thisId}>{item.displayName}</label></li>
      );
    });
    
    //Input Choice: Seasons
    let seasons = [];
    config.seasons.map((item) => {
      seasons.push(
        <li key={'seasons_'+item.id}><input type="checkbox" id={'inputRow_seasons_item_' + item.id + '_' + thisId} ref={'inputRow_seasons_item_' + item.id} value={item.id} onchange={this.refreshUI} /><label htmlFor={'inputRow_seasons_item_' + item.id + '_' + thisId}>{item.displayName}</label></li>
      );
    });
    
    //Render!
    return (
      <article className="selector-panel" ref="selectorPanel">
        <section className={(this.props.selectorData.mode !== SelectorData.GUIDED_MODE) ? 'input-subpanel not-selected' : 'input-subpanel' } ref="subPanel_guided">
          <h1 onClick={this.changeToGuided}>Standard Mode</h1>
          <div className="input-row" ref="inputRow_species">
            <label ref="inputRow_species_label">Species</label>
            <ul ref="inputRow_species_list">
              {species}
            </ul>
          </div>
          <div className="input-row" ref="inputRow_habitats">
            <label ref="inputRow_habitats_label">Habitats</label>
            <ul ref="inputRow_habitats_list">
              {habitats}
            </ul>
          </div>
          <div className="input-row" ref="inputRow_seasons">
            <label ref="inputRow_seasons_label">Seasons</label>
            <ul ref="inputRow_seasons_list">
              {seasons}
            </ul>
          </div>
          <div className="input-row" ref="inputRow_dates">
            <label ref="inputRow_dates_label">Date</label>
            <div ref="inputRow_dates_list" className="range-input">
              <input ref="inputRow_dates_item_start" placeholder="2000-12-31" />
              <span>to</span>
              <input ref="inputRow_dates_item_end" placeholder="2020-12-31" />
            </div>
          </div>
          <div className="input-row">
            <label>Username:</label>
            <input type="text" ref="username" onChange={this.refreshUI} />
          </div>
          <div className="input-row">
            <label>Marker Color:</label>
            <input type="text" ref="markerColor" onChange={this.refreshUI} />
            <label>Marker Size:</label>
            <input type="text" ref="markerSize" onChange={this.refreshUI} />
            <label>Marker Opacity:</label>
            <input type="text" ref="markerOpacity" onChange={this.refreshUI} />
          </div>
        </section>
        <section className={(this.props.selectorData.mode !== SelectorData.ADVANCED_MODE) ? 'input-subpanel not-selected' : 'input-subpanel' } ref="subPanel_advanced" >
          <h1 onClick={this.changeToAdvanced}>Advanced Mode</h1>
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
  }
  
  componentDidMount() {
    //Set <input> values based on the selector data.
    //WARNING: Do not set values DURING render(), because these will cause the
    //<input> elements to become strictly 'controlled' React elements.
    
    //Update the UI to reflect the current selector values
    config.species.map((item) => {
      this.refs['inputRow_species_item_' + item.id].checked = (this.props.selectorData.species.indexOf(item.id) >= 0);
    });
    config.habitats.map((item) => {
      this.refs['inputRow_habitats_item_' + item.id].checked = (this.props.selectorData.habitats.indexOf(item.id) >= 0);
    });
    config.seasons.map((item) => {
      this.refs['inputRow_seasons_item_' + item.id].checked = (this.props.selectorData.seasons.indexOf(item.id) >= 0);
    });
    this.refs['inputRow_dates_item_start'].value = this.props.selectorData.dateStart;
    this.refs['inputRow_dates_item_end'].value = this.props.selectorData.dateEnd;
    
    //Some extra options
    this.refs.username.value = this.props.selectorData.user;
    
    //Same for the styling
    this.refs.markerColor.value = this.props.selectorData.markerColor;
    this.refs.markerOpacity.value = this.props.selectorData.markerOpacity;
    this.refs.markerSize.value = this.props.selectorData.markerSize;
    
    //Same for the Advanced panel.
    this.refs.sql.value = this.props.selectorData.sql;
    this.refs.css.value = this.props.selectorData.css;
    
    this.refreshUI(null);
    
    //Once mounted, be sure to inform the parent.
    this.updateMe(null);
  }
  
  //----------------------------------------------------------------
  
  changeToGuided(e) {
    let data = this.props.selectorData.copy();
    data.mode = SelectorData.GUIDED_MODE;
    this.props.updateMeHandler(data);
  }
  
  changeToAdvanced(e) {
    let data = this.props.selectorData.copy();
    data.mode = SelectorData.ADVANCED_MODE;
    this.props.updateMeHandler(data);
  }
  
  //----------------------------------------------------------------
  
  //Tells the parent that this Selector has updated its values.
  updateMe(e) {
    //Create a copy of the current Selector Data, which we will then modify and
    //pass to the parent.
    let data = this.props.selectorData.copy();

    //Filter control: species
    data.species = [];
    config.species.map((item) => {
      let ele = this.refs['inputRow_species_item_' + item.id];
      if (ele && ele.checked && ele.value) {
        data.species.push(item.id);
      }
    });
    
    //Filter control: habitats
    data.habitats = [];
    config.habitats.map((item) => {
      let ele = this.refs['inputRow_habitats_item_' + item.id];
      if (ele && ele.checked && ele.value) {
        data.habitats.push(item.id);
      }
    });
    
    //Filter control: seasons
    data.seasons = [];
    config.seasons.map((item) => {
      let ele = this.refs['inputRow_seasons_item_' + item.id];
      if (ele && ele.checked && ele.value) {
        data.seasons.push(item.id);
      }
    });
    
    //Filter control: dates
    data.dateStart = this.refs['inputRow_dates_item_start'].value.trim();
    data.dateEnd = this.refs['inputRow_dates_item_end'].value.trim();
    
    //Filter control: users & grouping
    data.user = this.refs.username.value.trim();

    //Filter control: styles
    data.markerColor = this.refs.markerColor.value;
    data.markerOpacity = this.refs.markerOpacity.value;
    data.markerSize = this.refs.markerSize.value;

    //Filter control: mode
    if (data.mode === SelectorData.GUIDED_MODE) {
      this.refs.sql.value = data.calculateSql();
      this.refs.css.value = data.calculateCss();
    }
    data.sql = this.refs.sql.value;
    data.css = this.refs.css.value;
    
    //Commit the changes.
    this.props.updateMeHandler(data);
  }
  
  //Tells the parent that this Selector wants to be deleted.
  deleteMe(e) {
    this.props.deleteMeHandler(this.props.selectorData.id);
  }
  
  //Update the UI based on user actions.
  refreshUI(e) {
    console.log('Selectors.refreshUI()');
  }
}
