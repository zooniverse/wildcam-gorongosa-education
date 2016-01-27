import React from 'react';

export default React.createClass({
  getInitialState() {
    return {};
  },
  componentWillMount() {
      this.setState({
        students: [
          {
            id: 1,
            name: 'Student1',
            classifications: 120,
            group: 'Group1'
          },
          {
            id: 2,
            name: 'Student2',
            classifications: 80,
            group: 'Group1'
          },
          {
            id: 3,
            name: 'Student3',
            classifications: 207,
            group: 'Group1'
          },
          {
            id: 4,
            name: 'Student4',
            classifications: 100,
            group: 'Group1'
          },
          {
            id: 5,
            name: 'Student5',
            classifications: 150,
            group: 'Group1'
          },
          {
            id: 6,
            name: 'Student6',
            classifications: 160,
            group: 'Group1'
          }
        ]
     });
  },
  render(){
    let rows = this.state.students.map(function(student, i) {
      return (
        <tr key={i}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.classifications}</td>
          <td>{student.group}</td>
        </tr>
      )
    });
    return(
      <div>
        <h2>Classroom Name</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Classifications</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    );
  }
});



