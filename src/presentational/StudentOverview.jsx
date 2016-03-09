import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import JoinClassroom from '../containers/JoinClassroom.jsx';


export default class StudentOverview extends Component {

  // TODO: if logged in show basic student details
  // else show Join Classroom

  render() {
    return (
      <div>
        <h3>Student Overview</h3>
        Start classifying at <a href="https://wildcamgorongosa.org" target="_blank">wildcamgorongosa.org</a>
      </div>
    );
  }

}
