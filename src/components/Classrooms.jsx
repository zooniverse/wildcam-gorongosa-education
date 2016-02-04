import React from 'react';
import fetch from 'isomorphic-fetch';

export default class Classrooms extends React.Component {

  componentDidMount() {
    fetch(this.props.source, {
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
          console.log('DATA: ', json.data)
        });
    }.bind(this));
    console.log('STATE: ', this.state)
  }

  render() {
    //    let listItems = this.state.classrooms.map((classroom, i) =>
    //    <li key={i}>{classroom.attributes.name}</li>);
    //     {listItems}
    return (
      <div>
        <h2>Classrooms</h2>
        <ul>

        </ul>

      </div>
    );
  }

}

