import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { default as ClassroomPresentational } from '../presentational/Classroom.jsx';



export default class Classroom extends Component {

  render() {
    const classroom = this.props.classrooms.data.find(classroom =>
      classroom.id === this.props.params.classroomId);
    return (<ClassroomPresentational data={classroom} />);
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
  }
};

function mapStateToProps(state) {
  return Object.assign({}, {
    classrooms: state.classrooms
  });
}

export default connect(mapStateToProps)(Classroom);
