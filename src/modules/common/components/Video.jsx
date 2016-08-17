import { Component } from 'react';

class Video extends Component {
    constructor(props) {
    super(props);
    this.rawVideoHtml = this.rawVideoHtml.bind(this);
  }

  rawVideoHtml() {
    return {
      __html: '<video height="315" src="' + this.props.src + '" width="560"></video>'
    }
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={ this.rawVideoHtml() }></div>
    );
  }
}
export default Video;


