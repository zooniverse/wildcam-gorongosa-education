import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

import { removeMapSelector, editMapSelector } from '../actions/map';
import MapSelector from './MapSelector';
import DialogScreen from '../components/DialogScreen';
import DialogScreen_Download from '../components/DialogScreen-Download';
const config = require('../../../constants/mapExplorer.config.json');


class MapControls extends Component {
  constructor(props) {
    super(props);

    //Event binding
    this.updateMe = this.updateMe.bind(this);
    this.deleteMe = this.deleteMe.bind(this);
    this.getUpdatedData = this.getUpdatedData.bind(this);
    this.prepareCsv = this.prepareCsv.bind(this);
    this.prepareSubjectsForAssignments = this.prepareSubjectsForAssignments.bind(this);
    this.changeToGuided = this.changeToGuided.bind(this);
    this.changeToAdvanced = this.changeToAdvanced.bind(this);
    this.closeAllDialogs = this.closeAllDialogs.bind(this);

    //Initialise state
    this.state = {
      downloadDialog: {
        status: DialogScreen.DIALOG_IDLE,
        message: '',
        data: null
      },
      generalDialog: {
        status: DialogScreen.DIALOG_IDLE
      }
    };
  }

  render() {
    const thisId = this.props.selectorData.id;

    let speciesText = [];
    config.species.map((item) => {
      (this.props.selectorData.species.indexOf(item.id) >= 0) ? speciesText.push(item.displayName) : null;
    });
    speciesText = speciesText.join(', ');

    //Input Choice: Species
    let species = [];
    config.species.map((item) => {
      species.push(
        <li key={`species_${item.id}`}>
          <input type="checkbox" id={`inputRow_species_item_${item.id}_${thisId}`} ref={`inputRow_species_item_${item.id}`} value={item.id} />
          <label htmlFor={`inputRow_species_item_${item.id}_${thisId}`}>{item.displayName}</label>
        </li>
      );
    });

    //Input Choice: Habitats
    let habitats = [];
    config.habitats.map((item) => {
      habitats.push(
        <li key={`habitat_${item.id}`}>
          <input type="checkbox" id={`inputRow_habitats_item_${item.id}_${thisId}`} ref={`inputRow_habitats_item_${item.id}`} value={item.id} />
          <label htmlFor={`inputRow_habitats_item_${item.id}_${thisId}`}>{item.displayName}</label>
        </li>
      );
    });

    //Input Choice: Seasons
    let seasons = [];
    config.seasons.map((item) => {
      seasons.push(
        <li key={`seasons_${item.id}`}>
          <input type="checkbox" id={`inputRow_seasons_item_${item.id}_${thisId}`} ref={`inputRow_seasons_item_${item.id}`} value={item.id} />
          <label htmlFor={`inputRow_seasons_item_${item.id}_${thisId}`}>{item.displayName}</label>
        </li>
      );
    });
    
    //Input Choice: Times of Day
    let timesOfDay = [];
    config.timesOfDay.map((item) => {
      timesOfDay.push(
        <li key={`timesOfDay_${item.id}`}>
          <input type="checkbox" id={`inputRow_timesOfDay_item_${item.id}_${thisId}`} ref={`inputRow_timesOfDay_item_${item.id}`} value={item.id} />
          <label htmlFor={`inputRow_timesOfDay_item_${item.id}_${thisId}`}>{item.displayName}</label>
        </li>
      );
    });

    //Subpanel Switching
    const subPanelGuidedClass = (this.props.selectorData.mode !== MapSelector.GUIDED_MODE)
      ? 'input-subpanel not-selected'
      : 'input-subpanel';
    const subPanelAdvancedClass = (this.props.selectorData.mode !== MapSelector.ADVANCED_MODE)
      ? 'input-subpanel not-selected'
      : 'input-subpanel';

    //Render!
    return (
      <article className="selector-panel">
        <section className={subPanelGuidedClass} ref="subPanel_guided">
          <button className="btn hidden" onClick={this.changeToGuided}>Standard Mode</button>
          <div className="input-row">
            <label>Species</label>
            {
              (speciesText.length > 0)
              ? <span>Viewing {speciesText}</span>
              : <span>Viewing all species</span>
            }
          </div>
          <div className="input-row" ref="inputRow_species">
            <ul>
              {species}
            </ul>
          </div>
          <div className="input-row">
            <label>Habitats</label>
            <ul>
              {habitats}
            </ul>
          </div>
          <div className="input-row" ref="inputRow_seasons">
            <label>Seasons</label>
            <ul>
              {seasons}
            </ul>
          </div>
          <div className="input-row">
            <label>Date</label>
            <div className="range-input">
              <input ref="inputRow_dates_item_start" placeholder="2000-12-31" />
              <span>to</span>
              <input ref="inputRow_dates_item_end" placeholder="2020-12-31" />
            </div>
          </div>
          <div className="input-row" ref="inputRow_timesOfDay">
            <label>Times of Day</label>
            <ul>
              {timesOfDay}
            </ul>
          </div>
          <div className="input-row">
            <label>Distance to Humans (m)</label>
            <div className="range-input">
              <input ref="inputRow_distanceToHumans_item_start" placeholder={config.distanceToHumans.min} />
              <span>to</span>
              <input ref="inputRow_distanceToHumans_item_end" placeholder={config.distanceToHumans.max} />
            </div>
          </div>
          <div className="input-row">
            <label>Distance to Water (m)</label>
            <div className="range-input">
              <input ref="inputRow_distanceToWater_item_start" placeholder={config.distanceToWater.min} />
              <span>to</span>
              <input ref="inputRow_distanceToWater_item_end" placeholder={config.distanceToWater.max} />
            </div>
          </div>
          <div className="input-row hidden">
            <label>Username:</label>
            <input type="text" ref="username" />
          </div>
          <div className="input-row hidden">
            <label>Marker Color:</label>
            <input type="text" ref="markerColor" />
            <label>Marker Size:</label>
            <input type="text" ref="markerSize" />
            <label>Marker Opacity:</label>
            <input type="text" ref="markerOpacity" />
          </div>
        </section>
        <section className={subPanelAdvancedClass} ref="subPanel_advanced" >
          <button className="btn hidden" onClick={this.changeToAdvanced}>Advanced Mode</button>
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
          <button className="hidden" onClick={this.updateMe}>(Apply)</button>
          <button className="hidden" onClick={this.deleteMe}>(Delete)</button>
          <button className="btn" onClick={this.prepareCsv}>(Download)</button>

          {/*TODO: Make sure this only appears for TEACHERS. */}
          <button className="btn" onClick={this.prepareSubjectsForAssignments}>(Select For Assignment)</button>

        </section>
        <DialogScreen status={this.state.generalDialog.status} message={this.state.generalDialog.message} closeMeHandler={this.closeAllDialogs} />
        <DialogScreen_Download status={this.state.downloadDialog.status} message={this.state.downloadDialog.message} data={this.state.downloadDialog.data} closeMeHandler={this.closeAllDialogs} />
      </article>
    );
  }

  componentDidMount() {
    //Set <input> values based on the selector data.
    //WARNING: Do not set values DURING render(), because these will cause the
    //<input> elements to become strictly 'controlled' React elements.

    //Update the UI to reflect the current selector values
    config.species.map((item) => {
      this.refs[`inputRow_species_item_${item.id}`].checked = (this.props.selectorData.species.indexOf(item.id) >= 0);
    });
    config.habitats.map((item) => {
      this.refs[`inputRow_habitats_item_${item.id}`].checked = (this.props.selectorData.habitats.indexOf(item.id) >= 0);
    });
    config.seasons.map((item) => {
      this.refs[`inputRow_seasons_item_${item.id}`].checked = (this.props.selectorData.seasons.indexOf(item.id) >= 0);
    });
    this.refs['inputRow_dates_item_start'].value = this.props.selectorData.dateStart;
    this.refs['inputRow_dates_item_end'].value = this.props.selectorData.dateEnd;
    config.timesOfDay.map((item) => {
      this.refs[`inputRow_timesOfDay_item_${item.id}`].checked = (this.props.selectorData.timesOfDay.indexOf(item.id) >= 0);
    });    
    this.refs['inputRow_distanceToHumans_item_start'].value = this.props.selectorData.distanceToHumansMin;
    this.refs['inputRow_distanceToHumans_item_end'].value = this.props.selectorData.distanceToHumansMax;
    this.refs['inputRow_distanceToWater_item_start'].value = this.props.selectorData.distanceToWaterMin;
    this.refs['inputRow_distanceToWater_item_end'].value = this.props.selectorData.distanceToWaterMax;

    //Some extra options
    this.refs.username.value = this.props.selectorData.user;

    //Same for the styling
    this.refs.markerColor.value = this.props.selectorData.markerColor;
    this.refs.markerOpacity.value = this.props.selectorData.markerOpacity;
    this.refs.markerSize.value = this.props.selectorData.markerSize;

    //Same for the Advanced panel.
    this.refs.sql.value = this.props.selectorData.sql;
    this.refs.css.value = this.props.selectorData.css;
  }

  //----------------------------------------------------------------

  changeToGuided(e) {
    const data = this.props.selectorData.copy();
    data.mode = MapSelector.GUIDED_MODE;
    this.props.dispatch(editMapSelector(data));
  }

  changeToAdvanced(e) {
    const data = this.props.selectorData.copy();
    data.mode = MapSelector.ADVANCED_MODE;
    this.props.dispatch(editMapSelector(data));
  }

  //----------------------------------------------------------------

  closeAllDialogs(e) {
    this.setState(
      {
        downloadDialog: {
          status: DialogScreen.DIALOG_IDLE,
          message: '',
          data: null,
        },
        generalDialog: {
          status: DialogScreen.DIALOG_IDLE,
          message: '',
        }
      }
    );
  }

  //----------------------------------------------------------------

  //Tells the parent that this Selector has updated its values.
  updateMe(e) {
    const data = this.getUpdatedData();

    //Commit the changes.
    this.props.dispatch(editMapSelector(data));
  }
  
  deleteMe(e) {
    this.props.dispatch(removeMapSelector(this.props.selectorData));
  }
  
  getUpdatedData() {
    //Create a copy of the current Selector Data, which we will then modify and
    //pass to the parent.
    let data = this.props.selectorData.copy();

    //Filter control: species
    data.species = [];
    config.species.map((item) => {
      const ele = this.refs[`inputRow_species_item_${item.id}`];
      if (ele && ele.checked && ele.value) {
        data.species.push(item.id);
      }
    });

    //Filter control: habitats
    data.habitats = [];
    config.habitats.map((item) => {
      const ele = this.refs[`inputRow_habitats_item_${item.id}`];
      if (ele && ele.checked && ele.value) {
        data.habitats.push(item.id);
      }
    });

    //Filter control: seasons
    data.seasons = [];
    config.seasons.map((item) => {
      const ele = this.refs[`inputRow_seasons_item_${item.id}`];
      if (ele && ele.checked && ele.value) {
        data.seasons.push(item.id);
      }
    });

    //Filter control: dates
    data.dateStart = this.refs['inputRow_dates_item_start'].value.trim();
    data.dateEnd = this.refs['inputRow_dates_item_end'].value.trim();
    
    //Filter control: times of day
    data.timesOfDay = [];
    config.timesOfDay.map((item) => {
      const ele = this.refs[`inputRow_timesOfDay_item_${item.id}`];
      if (ele && ele.checked && ele.value) {
        data.timesOfDay.push(item.id);
      }
    });
    
    //Filter control: distance to humans
    data.distanceToHumansMin = this.refs['inputRow_distanceToHumans_item_start'].value.trim();
    data.distanceToHumansMax = this.refs['inputRow_distanceToHumans_item_end'].value.trim();
    
    //Filter control: distance to water
    data.distanceToWaterMin = this.refs['inputRow_distanceToWater_item_start'].value.trim();
    data.distanceToWaterMax = this.refs['inputRow_distanceToWater_item_end'].value.trim();

    //Filter control: users & grouping
    data.user = this.refs.username.value.trim();

    //Filter control: styles
    data.markerColor = this.refs.markerColor.value;
    data.markerOpacity = this.refs.markerOpacity.value;
    data.markerSize = this.refs.markerSize.value;

    //Filter control: mode
    if (data.mode === MapSelector.GUIDED_MODE) {
      this.refs.sql.value = data.calculateSql(config.cartodb.sqlQueryCountItems);
      this.refs.css.value = data.calculateCss();
    }
    data.sql = this.refs.sql.value;
    data.css = this.refs.css.value;
    
    return data;
  }

  //----------------------------------------------------------------

  //Download the current results into a CSV.
  prepareCsv(e) {
    this.setState({
      downloadDialog: {
        status: DialogScreen.DIALOG_ACTIVE,
        message: 'Preparing data file...',
        data: null
    }});

    const data = this.getUpdatedData();
    const sqlQuery = data.calculateSql(config.cartodb.sqlQueryDownload);
    console.log('Prepare CSV: ', sqlQuery);
    fetch(config.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sqlQuery)))
      .then((response) => {
        if (response.status !== 200) {
          throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
        }
        return response.json();
      })
      .then((json) => {
        let data = [];
        let row = [];

        for (let key in json.fields) {
          row.push('"'+key.replace(/"/g, '\\"')+'"');
        }
        row = row.join(',');
        data.push(row);

        json.rows.map((rowItem) => {
          let row = [];
          for (let key in json.fields) {
            (json.fields[key].type === 'string' && rowItem[key])
              ? row.push('"'+rowItem[key].replace(/"/g, '\\"')+'"')
              : row.push(rowItem[key]);
          }
          row = row.join(',');
          data.push(row);
        });
        data = data.join('\n');

        this.setState({
          downloadDialog: {
            status: DialogScreen.DIALOG_ACTIVE,
            message: 'Data file ready!',
            data: data
        }});
      
        this.updateMe(null);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          downloadDialog: {
            status: DialogScreen.DIALOG_ACTIVE,
            message: 'ERROR',
            data: null
        }});
      });
  }

  //----------------------------------------------------------------

  prepareSubjectsForAssignments(e) {
    this.setState({
      generalDialog: {
        status: DialogScreen.DIALOG_ACTIVE,
        message: 'Preparing data...'
    }});

    const data = this.getUpdatedData();
    const sqlQuery = data.calculateSql(config.cartodb.sqlQuerySubjectIDs);
    fetch(config.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sqlQuery)))
      .then((response) => {
        if (response.status !== 200) {
          throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
        }
        return response.json();
      })
      .then((json) => {
        if (json && json.rows) {
          sessionStorage.setItem('savedSubjectsLocations', json.rows.map(i => i.location).join(','));
          sessionStorage.setItem('savedSubjectsIDs', json.rows.map(i => i.subject_id).join(','));
          
          const classroomId = sessionStorage.getItem('savedClassroomId');          
          if (classroomId) {
            browserHistory.push(`/teachers/classrooms/${classroomId}/assignment`);
          } else {
            this.setState({
              generalDialog: {
                status: DialogScreen.DIALOG_ACTIVE,
                message: 'Subjects saved! Go to Classrooms to create your Assignment.'
            }});            
            this.updateMe(null);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          generalDialog: {
            status: DialogScreen.DIALOG_ACTIVE,
            message: 'ERROR'
        }});
      });
  }
}

MapControls.propTypes = {
  dispatch: PropTypes.func.isRequired
};

//Don't subscribe to the Redux Store, but gain access to dispatch() and give
//this component's parent access to this component via getWrappedInstance()
export default connect(null, null, null, { withRef: true })(MapControls);
