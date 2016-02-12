import React, { Component, PropTypes } from 'react';

export default class LoginButton extends Component {

  render() {
    const classNames = 'btn btn-default';
    const login = this.props.createClassroom;
    return (
      <button className={classNames} onClick={createClassroom}>New</button>
    );
  }

}

LoginButton.propTypes = {
  createClassroom: PropTypes.func.isRequired
};
