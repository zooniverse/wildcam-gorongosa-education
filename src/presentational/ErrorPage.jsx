import { Component} from 'react';
import Layout from './Layout.jsx';

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
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
