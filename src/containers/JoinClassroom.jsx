import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { joinClassroom } from '../actions/classrooms';
import JoinButton from '../presentational/JoinButton.jsx';

class JoinClassroom extends Component {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
  }

  join() {
    console.log('Joining ... query: ', this.props.location.query)
    this.props.dispatch(joinClassroom(this.props.location.query.id, this.props.location.query.token));
  }

  render() {
    return (
      <div>
        <JoinButton join={this.join}/>
      </div>

    );
  }

}

export default connect()(JoinClassroom);
