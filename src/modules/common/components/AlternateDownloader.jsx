/*
Alternate Downloader
--------------------

Certain browsers (ahem, Safari 9,ahem) have poor HTML5 support for downloads, so
the SaveAs won't work nor the 'download' attr in <a href="file.csv" download>.

This component creates a hidden <form> that submits the data you want Safari to
download to EduAPI's download service, which echoes the content back as a HTTP
response with 'content-disposition' headers to force a download dialog.
 */

import { Component, PropTypes } from 'react';
import config from '../../../constants/config';

class AlternateDownloader extends Component {
  constructor(props) {
    super(props);
    this.download = this.download.bind(this);
  }

  render() {
    return (
      <form className="hidden" action={config.eduAPI.root + 'downloads/'} method="POST" ref={ele => this.form = ele}>
        <textarea name="data" ref={ele => this.formData = ele} />
        <input name="content_type" value={this.props.contentType} />
        <input name="filename" value={this.props.filename} />
      </form>
    );
  }
  
  download(data) {
    console.log('Downloading CSV, Safari workaround active');
    this.formData.value = data;
    this.form.submit();
  }
  
  binToStr(binarray){
    return binarray.reduce((str, val, index, arr) => {
        return str + (String.fromCharCode(val));
      }, '');
  }
}

AlternateDownloader.propTypes = {
  contentType: PropTypes.string,
  filename: PropTypes.string,
};
AlternateDownloader.defaultProps = {
  contentType: 'text/csv',
  filename: 'wildcam.csv',
};
export default AlternateDownloader;
