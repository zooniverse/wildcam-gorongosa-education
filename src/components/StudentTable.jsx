import React from 'react';
import Griddle from 'griddle-react';

export default React.createClass({

  render(){
    var students = [
    {
      id: 1,
      name: "Student1",
      classifications: 120,
      group: "Group1"
    },
    {
      id: 2,
      name: "Student2",
      classifications: 80,
      group: "Group1"
    },
    {
      id: 3,
      name: "Student3",
      classifications: 207,
      group: "Group1"
    },
    {
      id: 4,
      name: "Student4",
      classifications: 100,
      group: "Group1"
    },
    {
      id: 5,
      name: "Student5",
      classifications: 150,
      group: "Group1"
    },
    {
      id: 6,
      name: "Student6",
      classifications: 160,
      group: "Group1"
    }
  ];
    return(
      <div>
        <h2>Classroom Name</h2>
        <Griddle results={students} showFilter={true} showSettings={true}/>
      </div>
    );

  }

});




