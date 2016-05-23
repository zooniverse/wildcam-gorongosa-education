import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { default as StudentClassroomPresentational } from '../presentational/StudentClassroom.jsx';
import Spinner from '../presentational/Spinner.jsx';

export default class StudentClassroom extends Component {

  render() {
    const {classrooms, params, user} = this.props
    const members = classrooms.members;
    const classroom = classrooms.data.find(classroom =>
      classroom.id === params.classroomId);

    if (classroom && members) {
      return (<StudentClassroomPresentational data={classroom} members={members} user={user} />);
    } else {
      return (<Spinner />);
    }
  }

}

StudentClassroom.propTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

StudentClassroom.defaultProps = {
  classrooms: {
    data: [],
    loading: false,
    error: false,
    members: []
  },
  user: {}
};

function mapStateToProps(state) {
  return { ...state,
    classrooms: state.student.classrooms,
    user: state.login.user
  };
}

export default connect(mapStateToProps)(StudentClassroom);

