import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import HeaderAuth from '../containers/HeaderAuth.jsx';


export default class Layout extends Component {

  constructor() {
    super();
    this.renderNav = this.renderNav.bind(this);
    this.renderNavItem = this.renderNavItem.bind(this);
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
