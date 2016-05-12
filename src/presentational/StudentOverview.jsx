import { PropTypes } from 'react';
import Spinner from 'Spinner.jsx'

const StudentOverview = (props, context) => {

  const {classrooms, user} = context;
  
  let myClassifications = false;
  if (classrooms && classrooms.members && classrooms.loading === false && user) {
    myClassifications = 0;
    classrooms.members.map((student) => {
      if (user.id === student.attributes.zooniverse_id)
        myClassifications = Math.max(student.attributes.classifications_count, myClassifications);
    });
    //NOTE: The current Classifications counter assumes that each Classroom the
    //Student is in shares the same number of *unique* classifications.
    //Previously, this was an array.reduce() function that totalled the number
    //of Classifications across all Classrooms the Student is in.
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
