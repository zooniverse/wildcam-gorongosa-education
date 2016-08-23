import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { initialState } from '../../../reducers/mapexplorer';
import { MapHelper } from '../../../helpers/mapexplorer.js';
import { disableSelectForAssignmentMode } from '../actions/mapexplorer';

import { Link } from 'react-router';

const mapconfig = require('../../../constants/mapExplorer.config.json');

class DialogSelectForAssignment extends Component {
  constructor(props) {
    super(props);
    this.closeMe = this.closeMe.bind(this);
    this.changeSelectedCount = this.changeSelectedCount.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.confirmSelection = this.confirmSelection.bind(this);
    this.dataToJSON = this.dataToJSON.bind(this);
    this.goToClassrooms = this.goToClassrooms.bind(this);

    this.state = {
      data: [],
      dataLoading: true,
      dataCount: 0,
      selectedCount: 0,
      confirmed: false,
    };
  }

  render() {
    if (!this.props.mapexplorer.selectForAssignmentMode) return null;

    return (
      <section role="dialog" className="dialog-ver3 select-for-assignment" onClick={this.closeMe}>
        <div className="dialog-box" onClick={this.noAction}>
          <button className="btn close-button fa fa-times" onClick={this.closeMe}></button>
          {(!this.state.dataLoading) ? this.renderData() : <div className="message">Loading...</div> }
        </div>
      </section>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mapexplorer.selectForAssignmentMode &&
        nextProps.mapexplorer.selectForAssignmentMode !== this.props.mapexplorer.selectForAssignmentMode) {
      this.fetchData(nextProps);
    }
  }

  closeMe(e) {
    this.props.dispatch(disableSelectForAssignmentMode());
  }

  //'Eats up' events to prevent them from bubbling to a parent element.
  noAction(e) {
    if (e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      e.returnValue = false;
      e.cancelBubble = true;
    }
    return false;
  }

  fetchData(props = this.props) {
    this.setState({ dataLoading: true, data: [], dataCount: 0, confirmed: false });
    const sql = MapHelper.calculateSql(props.mapexplorer, mapconfig.cartodb.sqlQuerySubjectIDs);

    fetch(mapconfig.cartodb.sqlApi.replace('{SQLQUERY}', encodeURI(sql)))
    .then((response) => {
      if (response.status !== 200) {
        throw 'Can\'t reach CartoDB API, HTTP response code ' + response.status;
      }
      return response.json();
    })
    .then((json) => {
      this.setState({
        data: json.rows,
        dataLoading: false,
        dataCount: json.rows.length,
        selectedCount: json.rows.length,
        confirmed: false,
      });
    })
    .catch((err) => {
      console.error(err);
    });
  }

  renderData() {
    if (!this.state.confirmed) {
      return (
        <div>
          <div className="message">
            <span>We've found</span>
            <span className="highlight">{this.state.dataCount}</span>
            <span>results.</span>
          </div>
          <div className="message">
            <span>How many would you like to use for the Assignment you're creating?</span>
          </div>
          <div>
            <p>
              <b>Tip: </b><i>The images you assign to your students will be selected from this set. The smaller the number the more likely is for your students to see the same images.</i>
            </p>
          </div>
          <div className="message action-message">
            <span>Use</span>
            <input type="number" min="0" max={this.state.dataCount} value={this.state.selectedCount} onChange={this.changeSelectedCount} />
            <span>subject images</span>
            <button className="btn btn-default" onClick={this.confirmSelection}><i className="fa fa-check" /> Confirm Selection</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="message">
            <span>Subjects images selected!</span>
          </div>
          <div className="message action-message">
            <span>Please go to</span>
            <button className="btn btn-default" onClick={this.goToClassrooms}>Classrooms</button>
            <span>and create an</span>
            <span className="highlight">Assignment.</span>
          </div>
        </div>
      );
    }
  }

  changeSelectedCount(e) {
    this.setState({ selectedCount: e.target.value });
  }

  confirmSelection() {
    const selectedCount = Math.max(0, this.state.selectedCount);
    const data = this.state.data.slice(0, selectedCount);
    sessionStorage.setItem('savedSubjectsLocations', data.map(i => i.location).join(','));
    sessionStorage.setItem('savedSubjectsIDs', data.map(i => i.subject_id).join(','));
    sessionStorage.setItem('savedSubjectsDescription', JSON.stringify(this.dataToJSON()));

    const classroomId = sessionStorage.getItem('savedClassroomId');
    if (classroomId) {
      this.closeMe();
      browserHistory.push(`/teachers/classrooms/${classroomId}/assignment`);
    } else {
      this.setState({ confirmed: true });
    }
  }

  dataToJSON() {
    let json = {};
    const selectorKeys = ['species', 'habitats', 'seasons',
                          'dateStart', 'dateEnd', 'timesOfDay',
                          'distanceToHumansMin', 'distanceToHumansMax',
                          'distanceToWaterMin', 'distanceToWaterMax'];
    for (let key of selectorKeys) {
      if (this.props.mapexplorer[key] && this.props.mapexplorer[key].length > 0) {
        json[key] = this.props.mapexplorer[key];
      }
    }
    return json;
  }

  goToClassrooms() {
    this.closeMe();
      browserHistory.push('/teachers/classrooms/');
  }
}

DialogSelectForAssignment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
DialogSelectForAssignment.defaultProps = {
  mapexplorer: initialState,
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    mapexplorer: state.mapexplorer,
  };
}
export default connect(mapStateToProps)(DialogSelectForAssignment);  //Connects the Component to the Redux Store
