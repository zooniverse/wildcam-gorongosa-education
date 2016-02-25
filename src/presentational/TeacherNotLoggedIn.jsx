import { Component} from 'react';
import { Link } from 'react-router';
import Panoptes from 'panoptes-client';
import LoginButton from '../presentational/LoginButton.jsx';
import Layout from './Layout.jsx'
import { panoptesReturnUrl } from '../constants/config.json';

export default class TeacherNotLoggedIn extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <Layout>
        <div className="home-buttons container-fluid">
          <h1>To access our features as a Teacher, you'll need to log in to the Zooniverse</h1>
          <LoginButton login={this.login} />
        </div>
      </Layout>
    );
  }
  
  login() {
    console.log('Logging in');
    return Panoptes.oauth.signIn(panoptesReturnUrl);
  }
}
