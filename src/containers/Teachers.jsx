import React from 'react';

import Layout from '../presentational/Layout.jsx'


export default class Teachers extends React.Component {

  render() {
    console.log('props', this.props)
    return (
      <Layout {...this.props} navItems={this.props.navItems}>
        {this.props.children}
      </Layout>
    );
  }

}

Teachers.defaultProps = {
  navItems: [
    {
      label: 'Dashboard',
      to: '/teachers',
    },
    {
      label: 'Data',
      to: '/teachers/data'
    }
  ]
}
