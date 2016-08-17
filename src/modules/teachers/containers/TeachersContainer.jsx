import { Component } from 'react';

import Layout from '../../common/components/Layout';


class TeachersContainer extends Component {

  render() {
    return (
      <Layout loginSecured={true} {...this.props} navItems={this.props.navItems}>
        {this.props.children}
      </Layout>
    );
  }

}

TeachersContainer.defaultProps = {
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
      label: 'Resources',
      to: '/teachers/resources'
    },
    {
      label: 'Help',
      to: '/teachers/tutorial'
    },
    {
      label: 'Blog',
      to: 'http://blog.wildcamgorongosa.org/'
    },
    {
      label: 'Ecology',
      to: '/teachers/ecology'
    },
    {
      label: 'Feedback',
      to: 'https://docs.google.com/a/zooniverse.org/forms/d/1Cx4LDXevyqZZheB_EupVRxd7jCzpoH-m8j494cyNNfc/edit'
    }
  ]
}

export default TeachersContainer;
