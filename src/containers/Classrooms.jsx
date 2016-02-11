import React from 'react';
import { connect } from 'react-redux';

import { eduAPI } from '../constants/config.json';
import { fetchClassrooms } from '../actions/classrooms';

class Classrooms extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [{
        attributes: { },
        id: '',
        relationship: { },
        type: ''
      }]
    };
  }

  // Fetch classrooms from education-api and update state
  componentDidMount() {
    this.props.dispatch(fetchClassrooms());
  }

  render() {
    let listItems = this.state.data.map((classroom, i) =>
      <li key={i}>{classroom.attributes.name}</li>);

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

export default connect()(Classrooms);
