import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ClassroomPresentational from '../presentational/Classroom.jsx';
import Spinner from '../presentational/Spinner.jsx';

import { deleteClassroom, deleteStudent } from '../actions/teacher';

export default class Classroom extends Component {

  render() {
    const { classrooms, assignments, params, actions } = this.props;
    const members = classrooms.members;
    const classroom = classrooms.data.find(classroom => classroom.id === params.classroomId);
    const classroomId = (classroom && classroom.id) ? classroom.id : undefined;
    const boundDeleteClassroom = actions.deleteClassroom.bind(this, classroomId);
    const students = classroom ? classroom.relationships.students.data : undefined;
    const studentIds = students ? students.map(student => student.id) : undefined;
    const boundDeleteStudent = actions.deleteStudent.bind(this);
    const classroomAssignments = assignments;
    //TODO: Select the correct subset of assignments for this class.

    return (classroom && members)
      ? <ClassroomPresentational
          data={classroom}
          members={members}
          assignments={classroomAssignments}
          deleteClassroom={boundDeleteClassroom}
          deleteStudent={boundDeleteStudent}
          studentsIds={studentIds}
          classroomId={classroomId}
        />
      : <Spinner />;
  }
}

Classroom.propTypes = {
  classrooms: PropTypes.object.isRequired,
  assignments: PropTypes.object.isRequired,
};

Classroom.defaultProps = {
  classrooms: {
    data: [],
    loading: false,
    error: false,
    members: [],
    uniqueMembers: [],
  },
  assignments: {
    data: [],
    loading: false,
    error: false,
  }
};

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms,
  assignments: state.assignment.assignments,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    deleteClassroom: bindActionCreators(deleteClassroom, dispatch),
    deleteStudent: bindActionCreators(deleteStudent, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
