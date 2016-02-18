import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Panoptes from 'panoptes-client';

import Layout from './Layout.jsx'


export default class Home extends Component {

  constructor() {
    super();
    this.iframe = this.iframe.bind(this);
  }

  iframe() {
    Panoptes.oauth.checkCurrent();
  }

  render() {
    return (
      <Layout>
        <div className="home-buttons container-fluid">
          <h1>I am a...</h1>
          <Link className='btn btn-info' role='button' to='/students'>Student</Link>
          <Link className='btn btn-info' role='button' to='/teachers'>Teacher</Link>
          <a className='btn btn-info' role='button' onClick={this.iframe}>iFrame</a>
        </div>
      </Layout>
    );
  }

}
