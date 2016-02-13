import { Component, PropTypes } from 'react';
import Panoptes from 'panoptes-client';


export default class LoginHandler extends Component {
  constructor(props) {
    super(props);
    this._parseAuthString = this._parseAuthString.bind(this);
    this.completeLogin = this.completeLogin.bind(this);
  }

  // Deserializes the OAuth string returned by Panoptes
  _parseAuthString(string) {
    const authObject = string
      .substr(1)    // remove leading slash
      .split('&')   // split into 'key=value' strings
      .reduce((previous, pairString) => {
        const keyValueArray = pairString.split('=');
        const result = Object.assign({}, previous);
        result[keyValueArray[0]] = keyValueArray[1];
        return result;
      }, {});

    return authObject;
  }

  completeLogin() {
    // This sounds slightly mad, but we're going to deserialize the crappy
    // query params from Doorkeeper, then serialize them back to a structure
    // that Panoptes.auth._handleBearerToken can understand, which resembles a
    // response from superagent.
    //
    // Why? Because we need login sooner rather than later, and the OAuth PR
    // currently in panoptes-javascript-client may not get resolved quickly.
    // But as we're using a private (underscore-prefixed) method, this could
    // break if the library changes.
    const loginParams = this._parseAuthString(this.props.location.pathname);
    const fakeResponse = {
      text: JSON.stringify(loginParams)
    }
    Panoptes.auth._handleNewBearerToken(fakeResponse);
    this.props.history.pushState(null, '/');
  }

  componentDidMount() {
    this.completeLogin();
  }

  render() {
    return null;
  }
}

LoginHandler.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
