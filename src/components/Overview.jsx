import React from 'react';

export default class Overview extends React.Component{
  constructor() {
    super();
    // We'll initialise state in the constructor
    // http://www.newmediacampaigns.com/blog/refactoring-react-components-to-es6-classes - Step 4
  }
  render(){
    return(
      <div>
      <ul>
        <li>Students: 23</li>
        <li>Classifications: 3300</li>
      </ul>
    </div>
    );
  }
}
