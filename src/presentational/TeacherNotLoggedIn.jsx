import { Component} from 'react';
import { Link } from 'react-router';
import Panoptes from 'panoptes-client';
import Layout from './Layout.jsx'
import LoginButton from '../presentational/LoginButton.jsx';
import { panoptesReturnUrl } from '../constants/config.json';

export default class TeacherNotLoggedIn extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <Layout>
        <div className="info-page">
          <section className="info-panel">
            <p>To access our features as a Teacher, you'll need to log in to the Zooniverse</p>
            <div className="action-subpanel">
              <button className="btn btn-info" onClick={this.login}>Login to the Zooniverse</button>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
  
  login() {
    console.log('Logging in');
    return Panoptes.oauth.signIn(panoptesReturnUrl);
  }
}
