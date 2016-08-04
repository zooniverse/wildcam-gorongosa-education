import React, { PropTypes } from 'react';

const ClassroomAssignments = props => {
  const { data } = props;
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
              </tr>
            ) }
            </tbody>
          </table>
        </section>
      ) }
    </div>
  );
};

export default ClassroomAssignments;
