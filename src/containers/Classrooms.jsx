import React from 'react';
import { connect } from 'react-redux';

import { eduAPI } from '../constants/config.json';
import { fetchClassrooms } from '../actions/classrooms';

class Classrooms extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedClassroom: {},
      allClassrooms: {
        classrooms: [],
        isFetching: false
      }
    };
  }

  // Fetch classrooms from education-api and update state
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
