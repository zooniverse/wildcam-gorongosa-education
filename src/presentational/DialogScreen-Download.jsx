import React from 'react';
import DialogScreen from './DialogScreen.jsx';
import {saveAs} from 'browser-filesaver';

export default class DialogScreen_DownloadCSV extends DialogScreen {
  constructor(props) {
    super(props);
    this.closeMe = this.closeMe.bind(this);  //Babel doesn't transpile super() properly in IE10, so we need to explicitly declare this.
    this.downloadCsv = this.downloadCsv.bind(this);
    this.blobbifyCsvData = this.blobbifyCsvData.bind(this);
    this.generateFilename = this.generateFilename.bind(this);
  }

  render() {
    return (
      <section role="dialog" className={(this.props.status === DialogScreen.DIALOG_IDLE) ? 'dialog-screen' : 'dialog-screen enabled' } onClick={this.closeMe}>
        
        <div className="dialog-box" onClick={this.noAction}>
          <button className="btn close-button fa fa-times" onClick={this.closeMe}></button>
          
          {(this.props.message && this.props.message.length > 0)
          ? <div className="info">{this.props.message}</div>
          : null}
          
          {(this.props.data)
          ? <div><a className="btn" href={window.URL.createObjectURL(this.blobbifyCsvData())} download={this.generateFilename()} onClick={this.downloadCsv}>Download</a></div>
          : null}
          
          {(this.props.data)
          ? <div className="note">(Depending on your computer setup, you may need to right-click on the link above and choose "Save As", then open the downloaded file in Excel. At the moment, the download is limited to 10000 items per file.)</div>
          : null}
          
        </div>
        
      </section>
    );
  }

  //NOTE: The onClick=downloadCsv() feature is required because, by default,
  //React 'eats' the click event of <a download>s which would otherwise trigger
  //a native browser download event.
  downloadCsv(e) {
    if (this.props.data) {
      let dataBlob = this.blobbifyCsvData();
      let filename = this.generateFilename();
      saveAs(dataBlob, filename);
      this.closeMe();
    } else {
      console.error('Download CSV Error: no CSV');
    }
  }
  
  blobbifyCsvData() {
    if (this.props.data) {
      let dataBlob = new Blob([this.props.data], {type: 'text/csv'});
      return dataBlob;
    }
    return null;
  }
  
  generateFilename(extension = '.csv') {
    let timeString = new Date();
    timeString =
      timeString.getDate() +
      ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'][timeString.getMonth()] +
      timeString.getFullYear();
    return 'wildcam-' + timeString + extension;
  }
}
