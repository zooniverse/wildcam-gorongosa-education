import React from 'react';
import DialogScreen from './DialogScreen.jsx';

export default class DialogScreen_CameraView extends DialogScreen {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        
        <div className="dialog-box" onClick={this.noAction}>
          <h1>TODO: CAMERA VIEW</h1>
        </div>
        
      </section>
    );
  }
}
