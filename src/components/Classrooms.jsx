import React from 'react';
import fetch from 'isomorphic-fetch';

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
          'Authorization': 'Bearer ' + '64aa60e488a555e2ef8b7f9d1621ec7e430dcb8b8baa0d00b8460eca5660d188',
          'Content-Type': 'application/json'
      })
    })
    .then(function(res) {
      return res.json()
        .then(function(json) {
          console.log('componentDidMountSTATE: ', this.state)
          //setState triggers render()
          this.setState({data: json.data})
          console.log('componentDidMountSTATE: ', this.state)
        }.bind(this));
    }.bind(this));

  }

  // Cancel any outstanding requests before the component is unmounted.
  componentWillUnmount() {
    this.fetchClassrooms.abort();
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

