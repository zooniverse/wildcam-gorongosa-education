import { Component } from 'react';

import Layout from '../../common/components/Layout.jsx';

class StudentsContainer extends Component {

  render() {
    let loginSecured = this.props.navItems.reduce((prev, item) => {  //Is this particular sub-page login secured?
      return prev || (item.loginSecured === true && this.props.location.pathname.toLowerCase().startsWith(item.to));
    }, false);

    return (
      <Layout {...this.props} loginSecured={loginSecured} navItems={this.props.navItems}>
        {this.props.children}
      </Layout>
    );
  }

}

StudentsContainer.defaultProps = {
  navItems: [
    {
      label: 'Assignments',
      to: '/students/assignments',
      loginSecured: true,
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
      label: 'Blog',
      to: 'http://blog.wildcamgorongosa.org/'
    },
    {
      label: 'Feedback',
      to: 'https://docs.google.com/a/zooniverse.org/forms/d/1Cx4LDXevyqZZheB_EupVRxd7jCzpoH-m8j494cyNNfc/edit'
    }
  ]
}

export default StudentsContainer;
