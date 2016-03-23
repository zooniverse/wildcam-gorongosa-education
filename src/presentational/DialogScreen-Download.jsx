import React from 'react';
import DialogScreen from './DialogScreen.jsx';
import {saveAs} from 'browser-filesaver';

export default class DialogScreen_DownloadCSV extends DialogScreen {
  constructor(props) {
    super(props);
    this.downloadCsv = this.downloadCsv.bind(this);
  }

  render() {
    return (
      <section className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        
        <div className="dialog-box" onClick={this.noAction}>
          
          {(this.props.message && this.props.message.length > 0)
          ? <div>{this.props.message}</div>
          : null}
          
          {(this.props.data)
          ? <div><a className="btn" onClick={this.downloadCsv}>Download</a></div>
          : null}
          
        </div>
        
      </section>
    );
  }

  downloadCsv(e) {
    if (this.props.data) {
      let dataBlob = new Blob([this.props.data], {type: 'text/csv'});
      let timeString = new Date();
      timeString =
        timeString.getDate() +
        ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][timeString.getMonth()] +
        timeString.getFullYear();
      saveAs(dataBlob, 'wildcam-'+timeString+'.csv');
      this.closeMe();
    } else {
      console.error('Download CSV Error: no CSV');
    }
  }
}
