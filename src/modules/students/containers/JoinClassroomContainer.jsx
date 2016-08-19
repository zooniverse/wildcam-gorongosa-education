import { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { fetchStudentClassrooms, joinClassroom } from '../actions';
import JoinButton from '../components/JoinButton.jsx';
import config from '../../../constants/config';


class JoinClassroomContainer extends Component {
  constructor() {
    super();
    this.join = this.join.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  componentWillMount() {
    this.verifyLogin(this.props);
  }

   componentWillReceiveProps(nextProps) {
    this.verifyLogin(nextProps);
  }

  join() {
    const { id, token } = this.props.location.query;
    this.props.dispatch(joinClassroom(id, token));
  }

  verifyLogin(props) {
    if (props.loginInitialised && !props.loginUser) {
      browserHistory.push(config.routes.loginPrompt);
    }
  }

  render() {
    return (
      <JoinButton join={this.join}/>
    );
  }
}


function mapStateToProps(state) {  //Listens for changes in the Redux Store
  return {
    loginUser: state.login.user,
    loginInitialised: state.login.initialised
  };
}

export default connect(mapStateToProps)(JoinClassroomContainer);
