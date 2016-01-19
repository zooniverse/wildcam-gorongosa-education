import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

export default class StudentTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      students: [
        {
          "id": "1",
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
      ]
    };
  }
  render() {

    return(
        <Table
        rowsCount={this.state.students.length}
        rowHeight={50}
        headerHeight={50}
        width={800}
        height={500}>
        <Column
          header={<Cell>Name</Cell>}
          cell={props => (
            <Cell {...props}>
              {this.state.students[props.rowIndex].name}
            </Cell>
          )}
          width={200}
        />
      </Table>
    );
  }
};
