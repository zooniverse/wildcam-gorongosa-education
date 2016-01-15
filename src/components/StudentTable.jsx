import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

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
      name: "Student",
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
    var selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)"
  };
    return(
      <div>
        <h2>Classroom Name</h2>
        <BootstrapTable data={students} hover={true} deleteRow={true} selectRow={selectRowProp}>
          <TableHeaderColumn isKey={true} dataField="id">ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="classifications">Classifications</TableHeaderColumn>
          <TableHeaderColumn dataField="group">Group</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );

  }

});
