import { Component } from 'react';

import Layout from '../presentational/Layout.jsx'


export default class Teachers extends Component {

  render() {
    return (
      <Layout loginSecured={true} {...this.props} navItems={this.props.navItems}>
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
    },
    {
      label: 'Feedback',
      to: 'https://docs.google.com/a/zooniverse.org/forms/d/1Cx4LDXevyqZZheB_EupVRxd7jCzpoH-m8j494cyNNfc/edit'
    }
  ]
}
