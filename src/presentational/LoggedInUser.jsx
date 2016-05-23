import { PropTypes } from 'react';

const LoggedInUser = (props) => {
  const classNames = 'btn btn-default navbar-btn navbar-right';
  const logout = props.logout;
  return (
    <button className={classNames} onClick={logout}>Logout {props.user.login}</button>
  );
}

LoggedInUser.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export { LoggedInUser as default }
