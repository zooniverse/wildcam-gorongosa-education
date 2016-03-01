import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import JoinClassroom from '../containers/JoinClassroom.jsx';


export default class StudentOverview extends Component {

  // if logged in show basic student details
  // else show Join Classroom

  render() {
    return (
      <div>
        Student Overview
      </div>
    );
  }

}
