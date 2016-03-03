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
    this.state = { user: null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    console.log('HEADERAUTH()\n'+'^+'.repeat(20));
    console.log(this);
  }

  componentDidMount() {
    /*  TEST
    Panoptes.auth.checkCurrent()
      .then(user => {
        console.log('HEADERAUTH.COMPONENTDIDMOUNT()\n'+'^-'.repeat(20));
        console.log(this);
        this.props.dispatch(setLoginUser(user));
        //this.setState({user})
      });
    */
  }
  
  componentWillReceiveProps(nextProps){
    console.log('HEADERAUTH.COMPONENTWILLRECEIVEPROPS()\n'+'^='.repeat(20));
    console.log(nextProps);
    this.setState({
      user: nextProps.user
    });
  }

  login() {
    /*  TEST
    console.log('Logging in ...');
    // For deploy-preview, use the following Wildcam on staging details in config.json
    // const appId = '17bdbeb57f54a3bf6344cf7150047879cfa1c8d5f9fd77d64923e6c81fe6e949';
    // const redirectUri = 'https://preview.zooniverse.org/wge/';
    return Panoptes.oauth.signIn(panoptesReturnUrl);
    */
    
    //TEST
    this.props.dispatch(setLoginUser({ login: 'HELLO WORLD' }));
    this.setState(this.state);
  }

  logout() {
    /*  TEST
    Panoptes.oauth.signOut()
      .then(user => {
        //this.setState({ user });
        this.props.dispatch(setLoginUser(user));
        browserHistory.push(panoptesReturnUrl);
      });
    */
    
    //TEST
    this.props.dispatch(setLoginUser(null));
    this.setState(this.state);
  }

  render() {
    console.log('HEADERAUTH.RENDER()\n'+'^'.repeat(40));
    console.log(this);
    
    //return (this.state.user)
    return (this.props.user)
      ? <LoggedInUser user={this.state.user} logout={this.logout} />
      : <LoginButton login={this.login} />;
  }

}

HeaderAuth.propTypes = {
  user: PropTypes.object
};
HeaderAuth.defaultProps = {
  user: null
};
HeaderAuth.contextTypes = {  //Allows Component access to the Redux Store via this.context.store
  store: PropTypes.object
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  console.log('HEADERAUTH.mapStateToProps()\n'+'^.'.repeat(20));
  console.log(state);
  console.log(ownProps);
  return {
    user: state.login.user
  };
}
export default connect(mapStateToProps)(HeaderAuth);  //Connects the Component to the Redux Store
