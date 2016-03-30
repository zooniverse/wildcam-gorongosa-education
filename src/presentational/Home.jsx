import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Panoptes from 'panoptes-client';

import Layout from './Layout.jsx'


const Home = (props) => {
    return (
      <Layout>
        <div className='home'>
            <div className='jumbotron'>
              <div className='page-header'>
                <h1>Welcome to the WildCam Lab</h1>
              </div>
              <div className='sub-title'>
                <p>Investigate ecological questions by exploring trail camera data using an interactive map. Filter and download data to perform analyses and test hypotheses. If you are an educator, you can set up private classrooms and invite your students to join. Curate data sets or let your students explore on their own. Guided activities and supporting educational resources are also available. If you are not an educator, you can simply explore the data and look for trends.</p>
                <p>Are you an educator or an explorer? Make your selection to get started!</p>
                <Link className='btn btn-primary btn-lg' role='button' to='/teachers'>Educator </Link>
                &nbsp;&nbsp;
                <Link className='btn btn-primary btn-lg' role='button' to='/students'>Explorer</Link>
              </div>
          </div>
        </div>
      </Layout>
    );
  }

export {Home as default}
