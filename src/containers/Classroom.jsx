import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { default as ClassroomPresentational } from '../presentational/Classroom.jsx';



export default class Classroom extends Component {

  render() {
    const members = this.props.classrooms.members;
    const classroom = this.props.classrooms.data.find(classroom =>
      classroom.id === this.props.params.classroomId);
    return (<ClassroomPresentational data={classroom} members={members} />);
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
  return Object.assign({}, {
    classrooms: state.teacher.classrooms
  });
}

export default connect(mapStateToProps)(Classroom);
