import { Component } from 'react';

import Classrooms from '../containers/Classrooms.jsx';



export default class Sidebar extends Component {

  render() {
    return (
      <div className="admin-sidebar">
        <Classrooms />
      </div>
    );
  }

}
