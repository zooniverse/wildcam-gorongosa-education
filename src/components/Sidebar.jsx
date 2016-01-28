import React from 'react';

export default class Sidebar extends React.Component{
  constructor(){
    super();
  }
  componentWillMount() {
    this.setState({
      classrooms: [
      {
        name: 'Classroom1'
      },
      {
        name: 'Classroom2'
      },
      {
        name: 'Classroom3'
      },
      {
        name: 'Classroom4'
      }
    ]
    });
  }
  render() {
    let listItems = this.state.classrooms.map((classroom, i) =>
      <li key={i}>{classroom.name}</li>);
    return(
      <div className="admin-sidebar">
        <h2>Classrooms</h2>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
};
