import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { default as StudentClassroomPresentational } from '../presentational/StudentClassroom.jsx';



export default class StudentClassroom extends Component {

  render() {
    const members = this.props.classrooms.members;
    const classroom = this.props.classrooms.data.find(classroom =>
      classroom.id === this.props.params.classroomId);
    return (<StudentClassroomPresentational data={classroom} members={members} user={this.props.user} />);
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
  return Object.assign({}, {
    classrooms: state.student.classrooms,
    user: state.login.user
  });
}

export default connect(mapStateToProps)(StudentClassroom);

