import { Component, PropTypes } from 'react';

const STORAGE_KEY_PREFIX = 'seenTutorial_';
const STORAGE_VAL_YES = 'yup';

class DialogTutorial extends Component {
  constructor(props) {
    super(props);
    this.openMe = this.openMe.bind(this);
    this.closeMe = this.closeMe.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    
    this.data = this.props.data;
    
    this.state = {
      open: !(localStorage.getItem(STORAGE_KEY_PREFIX + this.props.name) === STORAGE_VAL_YES),
      page: 0,
    };
  }

  render() {
    if (this.state.open) {
      const page = this.data.pages[this.state.page];
      
      return (
        <section role="dialog" className="dialog-ver3 tutorial-dialog" onClick={this.closeMe}>
          <div className="dialog-box" onClick={this.noAction}>
            <button className="btn close-button fa fa-times" onClick={this.closeMe}></button>
            
            {(page)
              ? <div className="page">
                  {(page.image)
                    ? <img className="image" src={page.image} />
                    : null}
                  {(page.title)
                    ? <div className="title">{page.title}</div>
                    : null}
                  {(page.html)
                    ? <div className="text" dangerouslySetInnerHTML={{__html: page.html}}></div>
                    : <div className="text">{page.text}</div>}
                </div>
              : null}
            
            <nav className="paging">
              <button className="btn btn-default" onClick={this.prevPage}>&laquo;</button>
              {this.data.pages.map((page, index) => {
                const className = (this.state.page === index)
                  ? 'btn btn-default selected'
                  : 'btn btn-default';
                return (
                  <button className={className} key={index} value={index} onClick={this.goToPage}>{index+1}</button>
                );
              })}
              <button className="btn btn-default" onClick={this.nextPage}>&raquo;</button>
            </nav>

          </div>
        </section>
      );
    } else {
      return (
        <button className="btn btn-default fa fa-question-circle" onClick={this.openMe}></button>
      );
    }
  }
  
  openMe(e) {
    this.setState({ page: 0, open: true });
  }
  
  closeMe(e) {
    localStorage.setItem(STORAGE_KEY_PREFIX + this.props.name, STORAGE_VAL_YES);
    this.setState({ open: false });
  }
  
  goToPage(e) {
    const target = parseInt(e.target.value);
    this.setState({ page: target });
  }
  
  nextPage() {
    const target = parseInt(this.state.page) + 1;
    if (target >= this.data.pages.length) this.closeMe();
    this.setState({ page: target });
  }
  
  prevPage() {
    const target = Math.max(parseInt(this.state.page) - 1, 0);
    this.setState({ page: target });
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
}

DialogTutorial.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object.isRequired
};
DialogTutorial.defaultProps = {
  name: 'tutorial',
  data: {
    pages: []
  }
};
export default DialogTutorial;
