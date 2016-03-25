import React from 'react';
import DialogScreen from './DialogScreen.jsx';

export default class DialogScreen_ViewCamera extends DialogScreen {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        <div className="dialog-box" onClick={this.noAction}>
          ...
        </div>
      </section>
    );
  }
}
