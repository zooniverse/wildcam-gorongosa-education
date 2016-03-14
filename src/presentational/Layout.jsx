import { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import HeaderAuth from '../containers/HeaderAuth.jsx';
import { routes } from '../constants/config.json';


class Layout extends Component {

  constructor() {
    super();
    this.renderNav = this.renderNav.bind(this);
    this.renderNavItem = this.renderNavItem.bind(this);
    this.verifyLogin = this.verifyLogin.bind(this);
  }

  componentWillMount() {
    this.verifyLogin(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.verifyLogin(nextProps);
  }

  verifyLogin(props) {
    if (props.loginSecured && !(props.user)) {
      browserHistory.push(routes.loginPrompt);
    }
  }

  renderNav() {
    let nav = null;
    if (this.props.navItems) {
      nav = (
        <ul className="navbar-nav nav">
          {this.props.navItems.map(this.renderNavItem)}
        </ul>
      );
    }
    return nav;
  }

  renderNavItem(item) {
    if (item.to.match(/^https?:/ig)) {  //Is it an external link?
      return (
        <li key={item.label}>
          <a href={item.to} target="_blank">{item.label}</a>
        </li>
      );
    } else {  //Is it an internal link?
      const isActive = (this.props.location.pathname ===  item.to) ? 'active' : null;
      return (
        <li key={item.label} className={isActive}>
          <Link to={item.to}>{item.label}</Link>
        </li>
      );
    }
  }

  render() {
    return (
      <div>

        <header className='site-header'>
          <div className='container-fluid'>
            <Link className='navbar-brand' to='/'>Wildcam Gorongosa Education</Link>
            {this.renderNav()}
            <HeaderAuth />
          </div>
        </header>

        <main className='content-section'>
          {this.props.children}
        </main>

        <footer className='site-footer'>
          <p className='pull-left'><a href="https://www.zooniverse.org/" target="_blanket">Zooniverse.org</a> The universe is too big to explore without you</p>
          <p className='pull-right'>2016</p>
        </footer>

      </div>
    );
  }
}

Layout.propTypes = {
  navItems: PropTypes.array,
  loginSecured: PropTypes.bool,
  user: PropTypes.object
}
HeaderAuth.defaultProps = {
  navItems: [],
  loginSecured: false,
  user: null
};
function mapStateToProps(state, ownProps) {  //Listens for changes in the Redux Store
  return {
    user: state.login.user
  };
}
export default connect(mapStateToProps)(Layout);  //Connects the Component to the Redux Store
