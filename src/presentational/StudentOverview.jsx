import { PropTypes } from 'react';
import Spinner from 'Spinner.jsx'

const StudentOverview = (props, context) => {

  let myClassifications = false;
  const {classrooms, user} = context;
  if (classrooms && classrooms.members && classrooms.loading === false && user) {
    myClassifications = classrooms.members.reduce((prev, cur, index, arr) => {
      return prev + ((user.id === cur.attributes.zooniverse_id) ? cur.attributes.classifications_count : 0);
    }, 0);
  }

  return (
    <section className="content-view">
      <div className="row">
        <div className="page-header">
          <h1>Student Overview</h1>
        </div>
      </div>
      <div className="panel panel-info">
        <div className="panel-body">
          Start classifying at <a href="https://wildcamgorongosa.org" target="_blank">wildcamgorongosa.org</a>
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
                  {(classrooms.loading === false) ?
                  <h1>{classrooms.data.length}</h1>
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
                  <i className="fa fa-pencil-square-o fa-4x"></i>
                </div>
                <div className="col-xs-9 text-right">
                  {(myClassifications !== false) ?
                  <h1>{myClassifications}</h1>
                  : <Spinner/>}
                </div>
              </div>
            </div>
            <div className="panel-footer text-right">
              <div>Classifications</div>
            </div>
          </div>
        </div>
      </div>
    </section>
)};

StudentOverview.contextTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export {StudentOverview as default}
