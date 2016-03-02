import { Component} from 'react';
import { browserHistory } from 'react-router';
import Layout from './Layout.jsx';

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
    
    //TEMPORARY FIX: REDIRECT EVERYTHING TO THE /WGE "ROOT" FOLDER
    //Why? Because on the Panoptes Preview website, our root is /wge, not /.
    //----------------
    //let currentRoute = (this.props && this.props.location && this.props.location.pathname)
    //  ? this.props.location.pathname
    //  : '';
    //if (currentRoute !== '' && !currentRoute.match(/^\/wge/ig)) {
    //  browserHistory.push('/wge' + currentRoute);
    //}
    //----------------
  }

  render() {
    return (
      <Layout>
        <div className="info-page">
          <section className="info-panel">
            <p>404, Sorry</p>
          </section>
        </div>
      </Layout>
    );
  }
}
