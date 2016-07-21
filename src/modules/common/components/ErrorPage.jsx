import { Link } from 'react-router';


const ErrorPage = () => {
  // Original gif at http://giphy.com/gifs/africa-cyclist-antelope-MpBbsW3vbpXlS
  return (
    <article className="error-page">
      <div className="text">
        <h1>Oh no!</h1>
        <p>It looks like something's gone wrong.</p>
        <p>
          <Link to="/">
            Click here to go back home
          </Link>
        </p>
      </div>
    </article>
  );

};

export default ErrorPage;
