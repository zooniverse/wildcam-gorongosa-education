import { PropTypes } from 'react';
import Spinner from 'Spinner.jsx'


const ClassroomsOverview = (props, context) => (
  <section className="content-view">
    <div className="page-header">
      <h1>Overview</h1>
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
                {(context.classrooms.loading === false) ?
                <h1>{context.classrooms.data.length}</h1>
                : <Spinner/>}
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
                {(context.classrooms.loading === false) ?
                <h1>{context.classrooms.uniqueMembers.length}</h1>
                : <Spinner/>}
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
);

ClassroomsOverview.contextTypes = {
  classrooms: PropTypes.object.isRequired
}

export {ClassroomsOverview as default}
