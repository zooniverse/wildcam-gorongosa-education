import React from 'react';
import DialogScreen from './DialogScreen.jsx';

export default class DialogScreen_Species extends DialogScreen {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        
        {(this.props.status === DialogScreen.DIALOG_MESSAGE)
        ? <div className="dialog-box" onClick={this.noAction}>{this.props.message}</div>
        : null}
        
        {(this.props.status === DialogScreen.DIALOG_SELECT_SPECIES)
        ? <div className="dialog-box" onClick={this.noAction}>
            <h1>TODO: SPECIES</h1>
          </div>
        : null}
        
      </section>
    );
  }
}
