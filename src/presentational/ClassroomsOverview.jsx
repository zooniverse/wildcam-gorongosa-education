import { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class ClassroomsOverview extends Component {

  render() {
    return (
      <div>
      ClassroomsOverview. There are {this.context.classrooms.data.length} classrooms.
      </div>
    );
  }

}

ClassroomsOverview.contextTypes = {
  classrooms: PropTypes.object
}
