import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Classroom from '../components/Classroom';
import Spinner from '../../common/components/Spinner';
import { deleteClassroom, deleteStudent } from '../actions/teacher';


class ClassroomContainer extends Component {

  render() {
    const { classrooms, params, actions } = this.props;
    const members = classrooms.members;
    const classroom = classrooms.data.find(classroom => classroom.id === params.classroomId);
    const classroomId = (classroom && classroom.id) ? classroom.id : undefined;
    const boundDeleteClassroom = actions.deleteClassroom.bind(this, classroomId);
    const students = classroom ? classroom.relationships.students.data : undefined;
    const studentIds = students ? students.map(student => student.id) : undefined;
    const boundDeleteStudent = actions.deleteStudent.bind(this);

    return (classroom && members)
      ? <Classroom
          data={classroom}
          members={members}
          deleteClassroom={boundDeleteClassroom}
          deleteStudent={boundDeleteStudent}
          studentsIds={studentIds}
          classroomId={classroomId}
        />
      : <Spinner />;
  }
}

ClassroomContainer.propTypes = {
  classrooms: PropTypes.object.isRequired,
};

ClassroomContainer.defaultProps = {
  classrooms: {
    data: [],
    loading: false,
    error: false,
    members: [],
    uniqueMembers: [],
  }
};

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms
});

const mapDispatchToProps = dispatch => ({
  actions: {
    deleteClassroom: bindActionCreators(deleteClassroom, dispatch),
    deleteStudent: bindActionCreators(deleteStudent, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassroomContainer);
