import React from 'react';

export var SelectorPanel = React.createClass({
  render() {
    
    //Render!
    return (
      <div className="selector-panel" ref="selectorPanel">
        <div className="input-row">
          <label>Marker Colour:</label>
          <input type="text" ref="colour" onChange={this.refreshUI} />
        </div>
        <button onClick={this.updateMe}>(Update)</button>
        <button onClick={this.deleteMe}>(Delete)</button>
      </div>
    );
  },
  
  componentDidMount() {
    //Set <input> values based on the selector data.
    //WARNING: Do not set values DURING render(), because these will cause the
    //<input> elements to become strictly 'controlled' React elements.
    
    this.refs.colour.value = this.props.selectorData.colour;
    
    //Once mounted, be sure to inform the parent.
    this.updateMe(null);
  },
  
  //Tells the parent that this Selector has updated its values.
  updateMe(e) {
    //Create a copy of the current Selector Data, which we will then modify and
    //pass to the parent.
    var data = new SelectorData();
    data.id = this.props.selectorData.id;
    
    //Commit the changes.
    this.props.updateMeHandler(data);
  },
  
  //Tells the parent that this Selector wants to be deleted.
  deleteMe(e) {
    this.props.deleteMeHandler(this.props.selectorData.id);
  },
  
  //Update the UI based on user actions.
  refreshUI(e) {
    
  }
});

export class SelectorData {
  constructor () {
    this.id = //Random ID.
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)];
    this.colour = '#' +  //Colour of markers.
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)];
  }
}
