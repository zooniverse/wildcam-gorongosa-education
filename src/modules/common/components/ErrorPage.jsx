import Layout from './Layout';


const ErrorPage = (props) => (
  <Layout>
    <div className="info-page">
      <section className="info-panel">
        <p>Not found, sorry.</p>
        <p><a href="/">Start over</a> :)</p>
      </section>
    </div>
  </Layout>
)

export default ErrorPage;
