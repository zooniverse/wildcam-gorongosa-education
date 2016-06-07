import { Component, PropTypes } from 'react';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({selected: this.props.value});
  }

  handleChange(e) {
    this.props.onChange(e);
    this.setState({selected: e.target.value});
  }

  render() {
    const options = this.props.options.map(option =>
        <option
          // the disjunctions allow for the case where options are classrooms (right-hand side)
          key={option.value || option.id}
          value={option.label || option.attributes.name}>
            {option.label || option.attributes.name}
        </option>
    )
    return (
      <label><p>{this.props.question}</p>
        <select
          className='form-control'
          name={this.props.name}
          value={this.state.selected}
          onChange={this.handleChange}>
            {options}
        </select>
      </label>
    )
  }
}

Dropdown.defaultProps = {
  question: null,
  name: null,
  onChange: null,
  options: [],
  value: null,
}

Dropdown.propTypes = {
  options: PropTypes.array.isRequired
}
