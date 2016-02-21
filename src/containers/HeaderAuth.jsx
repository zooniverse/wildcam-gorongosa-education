// A smart component that handles state for the LoginButton and LoggedInUser
// components. Currently stores state on the components, but can be modified
// to store it in Redux.

import { Component } from 'react';
import Panoptes from 'panoptes-client';

import LoginButton from '../presentational/LoginButton.jsx';
import LoggedInUser from '../presentational/LoggedInUser.jsx';
import { panoptesAppId } from '../constants/config.json';

export default class HeaderAuth extends Component {

  constructor() {
    super();
    this.state = { user: null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    return Panoptes.oauth.checkCurrent()
      .then(user => this.setState({ user }));
  }

  login() {
    return Panoptes.oauth.signIn('http://localhost:3000/?env=staging#/');
  }

  logout() {
    Panoptes.oauth.signOut()
      .then(user => this.setState({ user }));
  }

  render() {
    return (this.state.user)
      ? <LoggedInUser user={this.state.user} logout={this.logout} />
      : <LoginButton login={this.login} />;
  }

}
