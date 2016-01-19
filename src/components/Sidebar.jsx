import React from 'react';

export default React.createClass({
  render() {
    var classrooms = [
    {
      name: "Classroom1"
    },
    {
      name: "Classroom2"
    },
    {
      name: "Classroom3"
    },
    {
      name: "Classroom4"
    }
  ];
    return(
      <nav className="sidebar">
        <h2>Classrooms</h2>
        <ul>
          <li><a href="#">Classroom1</a></li>
          <li><a href="#">Classroom2</a></li>
          <li><a href="#">Classroom3</a></li>
          <li><a href="#">Classroom4</a></li>
        </ul>
      </nav>

    );

  }



});
