import React from 'react';
import fetch from 'isomorphic-fetch';
import { eduApi } from '../constants/app.config.js';

export default class Classrooms extends React.Component {

  constructor() {
    super();
    this.state = {
      data: [{
        attributes: { },
        id: '',
        relationship: { },
        type: ''
      }]
    };
  }
  // Fetch classrooms from education-api and update state
  componentDidMount() {
    this.fetchClassrooms = fetch(this.props.source, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
          'Authorization': 'Bearer ' + eduApi.authToken,
          'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(json => this.setState({data: json.data}))
  }

  // Cancel any outstanding requests before the component is unmounted.
  componentWillUnmount() {
    // fetch API doesn't currently support a way of cancelling requests
    // https://github.com/whatwg/fetch/issues/27
    // so we can't do as in AJAX this.fetchClassrooms.abort();
  }

  render() {
    let listItems = this.state.data.map((classroom, i) =>
    <li key={i}>{classroom.attributes.name}</li>);
    return (
      <div>
        <h2>Classrooms</h2>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }

}

