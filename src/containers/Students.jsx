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
    },
    {
      label: 'Tutorial',
      to: '/students/tutorial'
    },
    {
      label: 'Feedback',
      to: 'https://docs.google.com/a/zooniverse.org/forms/d/1Cx4LDXevyqZZheB_EupVRxd7jCzpoH-m8j494cyNNfc/edit'
    }
  ]
}
