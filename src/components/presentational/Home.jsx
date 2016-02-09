import React from 'react';
import {Link} from 'react-router';

import Layout from './Layout.jsx'


export default class Home extends React.Component {

  render() {
    return (
      <Layout>
        <div className="home-buttons container-fluid">
          <h1>I am a...</h1>
          <Link className='btn btn-info' role='button' to='/students'>Student</Link>
          <Link className='btn btn-info' role='button' to='/teachers'>Teacher</Link>
        </div>
      </Layout>
    );
  }

}
