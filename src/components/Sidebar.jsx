import React from 'react';
import Classrooms from 'Classrooms.jsx';

export default class Sidebar extends React.Component {

  render() {

    return (
      <div className="admin-sidebar">
        <Classrooms source="http://localhost:3001/teachers/classrooms.json" />
      </div>
    );
  }

}
