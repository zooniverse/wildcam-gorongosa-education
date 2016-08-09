import React, { Component, PropTypes } from 'react';

class ClassroomAssignments extends Component {
  constructor(props) {
    super(props);
    this.fetchClassifications = this.fetchClassifications.bind(this);
  }

  fetchClassifications(assignment, user) {
    this.props.fetchClassifications(assignment, user)
  }

  render() {
    const { data, user } = this.props;
    return (
    <div className="student-assignmentlist">
      <h1>Assignments</h1>
      { data.map(classroom =>
        <section key={ classroom.classroom_id }>
          <h3>Classroom { classroom.classroom_name }</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due date</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            { classroom.assignments.map(assignment =>
              <tr key={ assignment.id } className="listitem">
                <td>{ assignment.name }</td>
                <td>{ assignment.description }</td>
                <td>{ assignment.duedate }</td>
                <td>{ assignment.classification_count }/{ assignment.target }</td>
                <td>
                  <a className="btn btn-primary"
                    href={`https://www.wildcamgorongosa.org/#/classify/assignment-${ assignment.id }`}
                    target="_blank"
                    role="button">
                    Start assignment
                  </a>
                </td>
                <td>
                  <button
                  className="btn btn-default"
                  onClick={() => {this.fetchClassifications(assignment, user)}}
                  type="button">
                  Download
                </button>
                </td>
              </tr>
            ) }
            </tbody>
          </table>
        </section>
      ) }
    </div>
  );
  }
};

export default ClassroomAssignments;
