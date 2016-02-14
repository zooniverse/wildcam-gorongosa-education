import { Component, PropTypes } from 'react';


export default class LoggedInUser extends Component {

  render() {
    const classNames = 'btn btn-default navbar-btn navbar-right';
    const logout = this.props.logout;
    return (
      <button className={classNames} onClick={logout}>Logout {this.props.user.login}</button>
    );
  }

}

LoggedInUser.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

