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
  }
  
  componentWillMount() {
    //Login Check
    let storeState = this.context.store.getState();
    let loginUser = storeState.login.user;
    if (this.props.loginSecured && !loginUser) {
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
    const isActive = (this.props.location.pathname ===  item.to) ? 'active' : null;
    return (
      <li key={item.label} className={isActive}>
        <Link to={item.to}>{item.label}</Link>
      </li>
    );
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
          Placeholder footer, to be replaced. Note the &quot;flex: 0 0 auto&quot;, though.
        </footer>

      </div>
    );
  }
}

Layout.propTypes = {
  navItems: PropTypes.array
}
Layout.contextTypes = {  //Allows Component access to the Redux Store via this.context.*
  store: PropTypes.object
};
export default Layout;  //Connects the Component to the Redux Store
