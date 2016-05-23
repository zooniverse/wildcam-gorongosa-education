import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { default as ClassroomPresentational } from '../presentational/Classroom.jsx';
import Spinner from '../presentational/Spinner.jsx';

export default class Classroom extends Component {

  render() {
    const members = this.props.classrooms.members;
    const classroom = this.props.classrooms.data.find(classroom =>
      classroom.id === this.props.params.classroomId);
    if (classroom && members) {
      return (<ClassroomPresentational data={classroom} members={members} />);
    } else {
      return (<Spinner />);
    }
  }

}

Classroom.propTypes = {
  classrooms: PropTypes.object.isRequired,
};

Classroom.defaultProps = {
  classrooms: {
    data: [],
    loading: false,
    error: false,
    members: [],
    uniqueMembers: [],
  }
};

function mapStateToProps(state) {
  return { ...state,
    classrooms: state.teacher.classrooms
  };
}

export default connect(mapStateToProps)(Classroom);
