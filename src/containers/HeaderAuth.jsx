// A smart component that handles state for the LoginButton and LoggedInUser
// components. Stores state in Redux.

import { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Panoptes from 'panoptes-client';

import { connect } from 'react-redux';
import { setLoginUser } from '../actions/login';

import LoginButton from '../presentational/LoginButton.jsx';
import LoggedInUser from '../presentational/LoggedInUser.jsx';

class HeaderAuth extends Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    Panoptes.auth.checkCurrent()
      .then(user => {
        this.props.dispatch(setLoginUser(user));
      });
  }

  login() {
    return Panoptes.oauth.signIn(window.location.origin);
  }

  logout() {
    Panoptes.oauth.signOut()
      .then(user => {
        this.props.dispatch(setLoginUser(user));
        //browserHistory.push() and this.context.router.push() have an issue:
        //the user will be redirected, but Login/Logout button will not update.
        window.location = window.location.origin;
      });
  }

  render() {
    return (this.props.user)
      ? <LoggedInUser user={this.props.user} logout={this.logout} />
      : <LoginButton login={this.login} />;
  }
}

HeaderAuth.propTypes = {
  user: PropTypes.object
};
HeaderAuth.defaultProps = {
  user: null
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    user: state.login.user
  };
}
export default connect(mapStateToProps)(HeaderAuth);  //Connects the Component to the Redux Store
