import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { eduAPI } from '../constants/config.json';
import { fetchClassrooms } from '../actions/classrooms';

class Classrooms extends Component {

  componentDidMount() {
    this.props.dispatch(fetchClassrooms());
  }

  render() {
    let listItems = this.props.classrooms.map((name, i) =>
      <li key={i}>{name}</li>);

    return (
      <div>
        <h2>Classrooms</h2>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

}

Classrooms.propTypes = {
  selectedClassroom: PropTypes.object.isRequired,
  classrooms: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

Classrooms.defaultProps = {
  selectedClassroom: {},
  allClassrooms: {
    classrooms: [],
    isFetching: false
  }
};

function mapStateToProps(state) {
  const { selectedClassroom, allClassrooms } = state
  const {
    isFetching,
    classrooms: classrooms
  } = allClassrooms || {
    isFetching: true,
    classrooms: []
  }
  return {
    classrooms,
    isFetching
  }
}


export default connect(mapStateToProps)(Classrooms);
