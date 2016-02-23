import { Component } from 'react';

import Layout from '../presentational/Layout.jsx'


export default class Teachers extends Component {

  render() {
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
      label: 'Classrooms',
      to: '/teachers/classrooms',
    },
    {
      label: 'Data',
      to: '/teachers/data'
    }
  ]
}
