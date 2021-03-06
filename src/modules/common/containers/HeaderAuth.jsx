//A smart component that handles state for the LoginButton and LoggedInUser
//components. Stores state in Redux.

import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { checkLoginUser, setLoginUser, loginToPanoptes, logoutFromPanoptes } from '../actions/login';
import LoginButton from '../components/LoginButton.jsx';
import LoggedInUser from '../components/LoggedInUser.jsx';

class HeaderAuth extends Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!this.props.initialised) {
      this.props.dispatch(checkLoginUser());
    }
  }

  login() {
    return this.props.dispatch(loginToPanoptes());
  }

  logout() {
    this.props.dispatch(logoutFromPanoptes());
  }

  render() {
    return (this.props.user)
      ? <LoggedInUser user={this.props.user} logout={this.logout} />
      : <LoginButton login={this.login} />;
  }
}

HeaderAuth.propTypes = {
  user: PropTypes.object,
  initialised: PropTypes.bool
};

HeaderAuth.defaultProps = {
  user: null,
  initialised: false
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    initialised: state.login.initialised
  };
}
export default connect(mapStateToProps)(HeaderAuth);
