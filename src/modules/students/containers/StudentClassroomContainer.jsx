import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import StudentClassroom from '../components/StudentClassroom.jsx';
import Spinner from '../../common/components/Spinner.jsx';

class StudentClassroomContainer extends Component {

  render() {
    const { classrooms, params, user } = this.props
    const members = classrooms.members;
    const classroom = classrooms.data.find(classroom =>
      classroom.id === params.classroomId);

    return (classroom && members)
      ? <StudentClassroom data={classroom} members={members} user={user} />
      : <Spinner />;
  }

}

StudentClassroomContainer.propTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

StudentClassroomContainer.defaultProps = {
  classrooms: {
    data: [],
    loading: false,
    error: false,
    members: []
  },
  user: {}
};

const mapStateToProps = state => ({
  classrooms: state.student.classrooms,
  user: state.login.user
});

export default connect(mapStateToProps)(StudentClassroomContainer);