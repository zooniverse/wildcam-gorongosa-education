import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Layout from './Layout'


const Home = (props) => {
  return (
    <Layout navItems={props.navItems}>
      <div className='home'>
          <div className='jumbotron'>
            <div className='page-header'>
              <h1>Welcome to the WildCam Lab</h1>
            </div>
            <div className='sub-title'>
              <p>Investigate ecological questions by exploring trail camera data using an interactive map. Filter and download data to perform analyses and test hypotheses. If you are an educator, you can set up private classrooms and invite your students to join. Curate data sets or let your students explore on their own. Guided activities and supporting educational resources are also available. If you are a student or you simply want to explore the data, click the Explorer button.</p>
              <p>Are you an educator or a student/explorer? Make your selection to get started!</p>
              <Link className='btn btn-primary btn-lg' role='button' to='/teachers'>Educator </Link>
              &nbsp;&nbsp;
              <Link className='btn btn-primary btn-lg' role='button' to='/students'>Explorer</Link>
            </div>
        </div>
      </div>
    </Layout>
  );
}

Home.defaultProps = {
  navItems: [
    {
      label: 'Feedback',
      to: 'https://docs.google.com/a/zooniverse.org/forms/d/1Cx4LDXevyqZZheB_EupVRxd7jCzpoH-m8j494cyNNfc/edit'
    }
  ]
}

export default Home;
