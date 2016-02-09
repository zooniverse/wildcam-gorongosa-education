// A smart component that handles state for the LoginButton and LoggedInUser
// components. Currently stores state on the components, but can be modified
// to store it in Redux.

import React from 'react';
import Panoptes from 'panoptes-client';

import LoginButton from '../presentational/LoginButton.jsx';
import LoggedInUser from '../presentational/LoggedInUser.jsx';


export default class HeaderAuth extends React.Component {

  constructor() {
    super();
    this.state = { user: null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    Panoptes.auth.checkCurrent()
      .then(user => this.setState({user: user}));
  }

  login() {
    console.log('Logging in');
    // From the Rog Testing app on staging
    const appId = '24ad5676d5d25c6aa850dc5d5f63ec8c03dbc7ae113b6442b8571fce6c5b974c';
    const redirectUri = 'http://localhost:3000';
    const url = [
      Panoptes._config.host,
      '/oauth/authorize',
      '?response_type=token',
      '&client_id=',
      appId,
      '&redirect_uri=',
      redirectUri
    ].join('');
    location.assign(url);
  }

  logout() {
    console.log('Logging out');
    Panoptes.auth.signOut()
      .then(user => this.setState({user: user}));
  }

  render() {
    return (this.state.user)
      ? <LoggedInUser user={this.state.user} logout={this.logout} />
      : <LoginButton login={this.login} />;
  }

}
