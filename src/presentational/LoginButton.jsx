// A dumb component that provides a login button. Requires a login function to
// be passed as a prop.

import React, { Component, PropTypes } from 'react';

export default class LoginButton extends Component {

  render() {
    const classNames = 'btn btn-default navbar-btn navbar-right';
    const login = this.props.login;
    return (
      <button className={classNames} onClick={login}>Login</button>
    );
  }

}

LoginButton.propTypes = {
  login: PropTypes.func.isRequired
};
