import { Component, PropTypes } from 'react';
import configureStore from '../store';
const store = configureStore();

export default class ClassroomsOverview extends Component {
  render() {
    const state = store.getState();
    return(
      <section className="content-view">
        <div className="row">
          <div className="page-header">
            <h1>Overview</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <div className="panel-title row">
                  <div className="col-xs-3">
                    <i className="fa fa-institution fa-4x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <h1>{state.classrooms.data.length}</h1>
                  </div>
                </div>
              </div>
              <div className="panel-footer text-right">
                <div>Classrooms</div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <div className="panel-title row">
                  <div className="col-xs-3">
                    <i className="fa fa-graduation-cap fa-4x"></i>
                  </div>
                  <div className="col-xs-9 text-right">
                    <h1>{state.classrooms.members.length}</h1>
                  </div>
                </div>
              </div>
              <div className="panel-footer text-right">
                <div>Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ClassroomsOverview.propTypes = {
  classrooms: PropTypes.object.isRequired
};
