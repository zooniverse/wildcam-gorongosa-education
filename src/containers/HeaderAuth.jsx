// A smart component that handles state for the LoginButton and LoggedInUser
// components. Currently stores state on the components, but can be modified
// to store it in Redux.

import { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Panoptes from 'panoptes-client';

import { connect } from 'react-redux';
import { setLoginUser } from '../actions/login';

import LoginButton from '../presentational/LoginButton.jsx';
import LoggedInUser from '../presentational/LoggedInUser.jsx';
import { panoptesAppId, panoptesReturnUrl } from '../constants/config.json';

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
  
  componentWillReceiveProps(nextProps){
  }

  login() {
    console.log('Logging in via HeaderAuth...');
    // For deploy-preview, use the following Wildcam on staging details in config.json
    // const appId = '17bdbeb57f54a3bf6344cf7150047879cfa1c8d5f9fd77d64923e6c81fe6e949';
    // const redirectUri = 'https://preview.zooniverse.org/wge/';
    return Panoptes.oauth.signIn(panoptesReturnUrl);
  }

  logout() {
    Panoptes.oauth.signOut()
      .then(user => {
        this.props.dispatch(setLoginUser(user));
        //browserHistory.push() and this.context.router.push() have an issue:
        //the user will be redirected, but Login/Logout button will not update.
        window.location = panoptesReturnUrl;        
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
HeaderAuth.contextTypes = {  //Allows Component access to the Router and Redux Store via this.context.*
  router: PropTypes.object,
  store: PropTypes.object
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    user: state.login.user
  };
}
export default connect(mapStateToProps)(HeaderAuth);  //Connects the Component to the Redux Store
