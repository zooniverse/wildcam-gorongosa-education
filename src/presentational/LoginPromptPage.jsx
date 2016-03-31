import { Component} from 'react';
import Panoptes from 'panoptes-client';
import Layout from './Layout.jsx'
import config from '../constants/config';

export default class LoginPromptPage extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <Layout>
        <div className="info-page">
          <section className="info-panel">
            <p>To access our features, you'll need to log in to the Zooniverse</p>
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
    return Panoptes.oauth.signIn(config.panoptesReturnUrl);
  }
}
