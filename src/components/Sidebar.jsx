import React from 'react';

export default React.createClass({
  getInitialState() {
    return {};
  },
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
  },
  render() {
    let listItems = this.state.classrooms.map(function(classroom, i){
      return (
        <li key={i}>{classroom.name}</li>
      )

    });
    return(
     <div className="sidebar">
        <h2>Classrooms</h2>
        <ul>
          { listItems }
        </ul>
    </div>
    );

  }
});
