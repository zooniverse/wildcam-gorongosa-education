import { Component } from 'react';

import Layout from '../presentational/Layout.jsx'


export default class Students extends Component {

  render() {
    return (
      <Layout {...this.props} navItems={this.props.navItems}>
        {this.props.children}
      </Layout>
    );
  }

}

Students.defaultProps = {
  navItems: [
    {
      label: 'Classrooms',
      to: '/students/classrooms',
    },
    {
      label: 'Data',
      to: '/students/data'
    }
  ]
}
