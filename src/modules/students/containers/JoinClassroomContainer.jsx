import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchStudentClassrooms, joinClassroom } from '../actions';
import JoinButton from '../components/JoinButton.jsx';


class JoinClassroomContainer extends Component {
  constructor() {
    super();
    this.join = this.join.bind(this);
  }

  join() {
    const { id, token } = this.props.location.query;
    this.props.dispatch(joinClassroom(id, token));
  }

  render() {
    return (
      <div>
        <JoinButton join={this.join}/>
      </div>
    );
  }
}

export default connect()(JoinClassroomContainer);
