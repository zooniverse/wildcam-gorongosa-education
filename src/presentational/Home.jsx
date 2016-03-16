import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Panoptes from 'panoptes-client';

import Layout from './Layout.jsx'


export default class Home extends Component {

  render() {
    return (
      <Layout>
        <div className='home'>
            <div className='jumbotron'>
              <div className='page-header'>
                <h1>Welcome to the WildCam Lab</h1>
              </div>
              <div className='sub-title'>
                <p>Are you a teacher or a student?</p>
                <p>Choose one and get started!</p>
                <Link className='btn btn-primary btn-lg' role='button' to='/teachers'>Teacher </Link>
                &nbsp;&nbsp;
                <Link className='btn btn-primary btn-lg' role='button' to='/students'>Student</Link>
              </div>
          </div>
        </div>
      </Layout>
    );
  }

}
