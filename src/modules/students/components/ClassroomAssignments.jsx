import React, { PropTypes } from 'react';

const ClassroomAssignments = props => {
  const { data } = props;
  return (
    <div className="student-assignmentlist">
      <h1>Assignments!</h1>
      { data.map(classroom =>
        <section key={ classroom.classroom_id }>
          <h3>Classroom { classroom.classroom_name }</h3>
          <ul className="list">
            { classroom.assignments.map(assignment =>
              <li key={ assignment.id } className="listitem">
                <div>
                  <div><strong>Name</strong></div>
                  <div>{ assignment.name }</div>
                </div>
                <div>
                  <div><strong>Description</strong></div>
                  <div>{ assignment.description }</div>
                </div>
                <div>
                  <div><strong>Due date</strong></div>
                  <div>{ assignment.duedate }</div>
                </div>
                <div>
                  <div><strong>Progress</strong></div>
                  <div>{ assignment.classification_count }/{ assignment.target }</div>
                </div>
                <div>
                  <a className="btn btn-default"
                    href={`https://www.wildcamgorongosa.org/#/classify/assignment-${ assignment.id }`}
                    target="_blank"
                    role="button">
                    Start assignment
                  </a>
                </div>
              </li>
            ) }
          </ul>
        </section>
      ) }
    </div>
  );
};

export default ClassroomAssignments;
