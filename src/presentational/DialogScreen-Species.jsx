import React from 'react';
import DialogScreen from './DialogScreen.jsx';
const config = require('../constants/mapExplorer.config.json');

export default class DialogScreen_Species extends DialogScreen {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        <div className="dialog-box" onClick={this.noAction}>
          <h1>TODO: SPECIES</h1>
        </div>
      </section>
    );
  }
}
