import React from 'react';

const DIALOG_IDLE = 'idle';
const DIALOG_MESSAGE = 'message';
const DIALOG_DOWNLOAD_CSV = 'download-csv';

export default class DialogScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.closeMe = this.closeMe.bind(this);
    this.downloadCsv = this.downloadCsv.bind(this);
  }

  render() {
    console.log('-'.repeat(40));
    console.log(this.props);
    
    return (
      <section className={(this.props.status === DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        
        {(this.props.status === DIALOG_MESSAGE)
        ? <div className="dialog-box" onClick={this.noAction}>{this.props.message}</div>
        : null}
        
        {(this.props.status === DIALOG_DOWNLOAD_CSV)
        ? <div className="dialog-box" onClick={this.noAction}>
            <div>{this.props.message}</div>
            <div><a download="WildcamGorongosa.csv" className="btn" onClick={this.downloadCsv}>Download</a></div>
          </div>
        : null}
        
      </section>
    );
  }
  
  closeMe(e) {
    this.props.closeMeHandler && this.props.closeMeHandler();
  }
  
  //'Eats up' events to prevent them from bubbling to a parent element.
  noAction(e) {
    if (e) {
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      e.returnValue = false;
      e.cancelBubble = true;
    }
    return false;
  }
  
  downloadCsv(e) {
    if (this.props.data) {
      let dataBlob = new Blob([this.props.data], {type: 'text/csv'});
      let dataAsAFile = window.URL.createObjectURL(dataBlob);
      window.open(dataAsAFile);
      window.URL.revokeObjectURL(dataAsAFile);
      this.props.closeMeHandler && this.props.closeMeHandler();
    } else {
      console.error('Download CSV Error: no CSV');
    }
  }
  
  static get DIALOG_IDLE() { return DIALOG_IDLE; }
  static get DIALOG_MESSAGE() { return DIALOG_MESSAGE; }
  static get DIALOG_DOWNLOAD_CSV() { return DIALOG_DOWNLOAD_CSV; }
}
