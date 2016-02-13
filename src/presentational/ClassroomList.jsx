import React, { Component, PropTypes } from 'react';

export default class ClassroomList extends Component {

  render() {
    return (
      <ul className="list-group">
        { this.props.classrooms.map((name, i) =>
          <li key={i} className="list-group-item">{name}</li>) }
      </ul>
    );
  }

}

ClassroomList.propTypes = {
  classrooms: PropTypes.array.isRequired
};
