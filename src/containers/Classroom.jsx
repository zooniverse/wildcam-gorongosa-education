import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ClassroomPresentational from '../presentational/Classroom.jsx';
import Spinner from '../presentational/Spinner.jsx';
import { deleteClassroom } from '../actions/teacher';

export default class Classroom extends Component {

  render() {
    const { classrooms, params, actions } = this.props;
    const members = classrooms.members;
    const classroom = classrooms.data.find(classroom => classroom.id === params.classroomId);
    const classroomId = (classroom && classroom.id) ? classroom.id : undefined;
    const boundDeleteClassroom = actions.deleteClassroom.bind(this, classroomId);

    return (classroom && members)
      ? <ClassroomPresentational
          data={classroom}
          members={members}
          deleteClassroom={boundDeleteClassroom}
        />
      : <Spinner />;
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ deleteClassroom }, dispatch),
});

function mapStateToProps(state) {
  return { ...state,
    classrooms: state.teacher.classrooms
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
