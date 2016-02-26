import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { joinClassroom } from '../actions/classrooms';
import JoinButton from '../presentational/JoinButton.jsx';

class JoinClassroom extends Component {
  constructor(props) {
    super(props);
    console.log('this.PROPS', props)
    this.join = this.join.bind(this);
  }

  join() {
    console.log('Joining ...')
    this.props.dispatch(joinClassroom());
  }

  render() {
    return (
      <JoinButton join={this.join}/>
    );
  }

}

export default connect()(JoinClassroom);
